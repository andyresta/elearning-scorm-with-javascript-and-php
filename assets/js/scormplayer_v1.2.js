(function(){

	this._VERSION = "2.2.20130225";
	/*
	 * SimpleAPI for SCORM 1.2
	 * --------------------------------------------------

		Description:
			A Simple SCO Test Environment in One File
			(For use with SCORM1.2-conformant content)

		Developed By:
			Sean K. Friese
      http://sean.friese.me

		Usage:
			-	Update the settings below following the instruction
				within the comments.

		Terms:
			SimpleAPI - Copyright 2011 Sean K. Friese

			Permission is hereby granted, free of charge, to any person obtaining a copy
			of this software and associated documentation files (the "Software"), to deal
			in the Software without restriction, including without limitation the rights
			to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
			copies of the Software, and to permit persons to whom the Software is
			furnished to do so, subject to the following conditions:

			The above copyright notice and this permission notice shall be included in
			all copies or substantial portions of the Software.

			THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
			IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
			FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
			AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
			LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
			OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

		Portions (As noted in full below):
			Cookie Functions
			Copyright (C) 1999 Dan Steinman
			Distributed under the terms of the GNU Library General Public License
			Available at http://www.dansteinman.com/dynapi/

			json.js
    		2006-11-09
    		Douglas Crockford
			douglas@crockford.com

			RELOAD TOOLS
			Copyright (c) 2003 Oleg Liber, Bill Olivier, Phillip Beauvoir, Paul Sharples

	 * Option Defaults
	 * --------------------------------------------------
	 */

	// Should we skip the automatic manifest check?
	this.skipManifestCheck = false;

	// The SCO's *default* launch file
	this.launchFile = 'default.htm';

	// The *default* name of the cookie to be used within this session
	this.cookieName = 'SimpleAPI_Data_'+_VERSION;

	// Should the *default* cookie name use the name of the parent folder instead?
	this.useParentFolderAsCookieName = true;

	// Shall we close SCO on LMSFinish?
	this.closeOnFinish = true;

	// The width of the SCO window when launched
	this.wWidth = 1024;

	// The height of the SCO window when launched
	this.wHeight = 768;
	// SCO window default features
	this.wToolbar = false;
	this.wTitlebar = false;
	this.wLocation = true;
	this.wStatus = true;
	this.wScrollbars = true;
	this.wResizable = true;
	this.wMenubar = false;

	// Default value for the search string option
	this.defaultSearchString = '?embedded=true';

	// Default values for the custom API key/value pair injection option
	this.defaultCustomApiKey = 'SomeCustomKey';
	this.defaultCustomApiValue = 'SomeCustomValue';

	// Default state of the SCORM API if one cannot be pulled from the
	// data cookie.  Change values below if you wish to test a SCO
	// being launched in a specific state.  Ensure you reset it back
	// to the defaults already present below when finished testing
	// to avoid the appearance of unexpected behaviors within the SCO
	// in subsequent tests...
	this.initialState = {
		'cmi.core._children':'student_id,student_name,lesson_status,lesson_location,lesson_mode,score,credit,entry,exit,session_time,total_time',
		'cmi.core.score._children':'raw',
		'cmi.core.student_id':''+$('studentid').value,
		'cmi.core.student_name':''+$('studentname').value,
		'cmi.core.lesson_status':'not attempted',
		'cmi.core.score.raw':'',
		'cmi.core.lesson_location':'',
		'cmi.suspend_data':'',
		'cmi.core.session_time':'0000:00:00.00',
		'cmi.core.credit':'credit', /* "credit" or "no-credit" */
		'cmi.core.entry':'ab-initio', /* "resume" or "ab-initio" */
		'cmi.core.lesson_mode':'normal', /* "browse",  "normal" or "review" */
		'cmi.core.exit':'' /* "time-out", "suspend" or "logout" */
	};

	/*
	 * Do not touch anything below
	 * --------------------------------------------------
	 */
	this.scoWin;
	this.API;
	this.hasTerminated = false;
	this.hasInitialized = false;
	this.optionsOpen = true;
	this.initTimeoutMax = 20000;
	this.initTimeout = 0;
	//modify
	this.fullPath = ''+document.getElementById('scormlaunchdir').value;
	this.parentFolder = fullPath.substr(fullPath.lastIndexOf('/')+1,fullPath.length);
	this.timeoutErrorDisplayed = false;
	this.launchWithEmbeddedParam = false;
	this.launchWithCustomApiProperty = false;
    this.storageObject;

	this.SimpleAPI = function(cookiename,api,initData)
	{
		this.api = api;
		this.initData = initData;
		this.__data = null;
		this.cookiename = cookiename;
		this.initialized = false;
		this.terminated = false;
		this.lastError = "0";
		this.lastCmd = '';

		this.logCommand=function()
		{
			Utils.log(this.lastCmd,'entry');
			var lasterr = this.api.LMSGetLastError();
			if (lasterr != '0')
			{
				var errorstr = this.api.LMSGetErrorString(lasterr);
				var diag = this.api.LMSGetDiagnostic(lasterr);
				var msg = "Error Calling: " + this.lastCmd + "<br>";
				msg += "LMSGetLastError() = " + lasterr + "<br>";
				msg += "LMSGetErrorString('" + lasterr + "') = " + errorstr + "<br>";
				msg += "LMSGetDiagnostic('" + lasterr + "') = " + diag;
				Utils.log(msg,'error');
			}
		};

		// LMSInitialize
		this.LMSInitialize=function(arg)
		{
			var success = this.api.LMSInitialize(arg);
			this.lastCmd = "LMSInitialize('" + arg + "') = " + success;
			this.logCommand();
			this.initialized = (success === 'true') ? true : false;
			if(this.initialized)
			{
				this.terminated = false;
				hasInitialized = true;
				for(var o in this.api)
				{
					if(typeof this.api[o] != 'function')
					{
						this[o] = this.api[o];
					}
				}

				this.__data = Utils.getInitAPIData(this.initData);
				for(var el in this.__data)
				{
					loadDataIntoModel(el,this.__data[el]);
				}
			}
			return success;
		};

		// LMSFinish
		this.LMSFinish=function(arg)
		{
			var success = this.api.LMSFinish(arg);
			this.lastCmd = "LMSFinish('" + arg + "') = " + success;
			this.logCommand();
			if(success === 'true')
			{
				this.initialized = false;
				this.terminated = true;
				hasTerminated = true;
				if(this.__data['cmi.core.session_time'] && (this.__data['cmi.core.session_time'].length > 0))
				{
					if(this.__data['cmi.core.total_time'] == null || this.__data['cmi.core.total_time'] == '')
					{
						this.__data['cmi.core.total_time'] = '0000:00:00.00';
					}
					var totalTime = Utils.addTime(this.__data['cmi.core.total_time'], this.__data['cmi.core.session_time']);
					this.__data['cmi.core.total_time'] = totalTime;

					var cdata = this.__data.toJSONString();
                    storageObject.persist(this.cookiename,cdata,365);

					Utils.log('Total Time (cmi.core.total_time): '+totalTime,'info');
				}

				if(closeOnFinish)
				{
					if(scoWin && !scoWin.closed)
					{
						Utils.closeSCO();
					}
				}
			}
			return success;
		};

		// LMSGetValue
		this.LMSGetValue=function(name)
		{
			var value = unescape(this.api.LMSGetValue(name));
			this.lastCmd = "LMSGetValue('" + name + "') = " + value;
			this.logCommand();
			return value;
		};

		// LMSSetValue
		this.LMSSetValue=function(name, value)
		{
			var success = this.api.LMSSetValue(name, escape(value));
			this.lastCmd = "LMSSetValue('" + name + "','" + value + "') = " + success;
			this.logCommand();

			if(success === 'true')
			{
				this.__data[name] = value;
			}

			return success;
		};

		// LMSCommit
		this.LMSCommit=function(arg)
		{
			var success = this.api.LMSCommit(arg);
			this.lastCmd = "LMSCommit('" + arg + "') = " + success;
			this.logCommand();

			if(success === 'true')
			{
				var cdata = this.__data.toJSONString();
                storageObject.persist(this.cookiename,cdata,365);
			}

			return success;
		};

		// LMSGetErrorString
		this.LMSGetErrorString=function(arg)
		{
			var errorstr = this.api.LMSGetErrorString(arg);
			Utils.log("LMSGetErrorString('" + arg + "') = " + errorstr,'entry');
			return errorstr;
		};

		// LMSGetLastError
		this.LMSGetLastError=function()
		{
			var lasterr = this.api.LMSGetLastError();
			Utils.log("LMSGetLastError() = " + lasterr,'entry');
			return lasterr;
		};

		// LMSGetDiagnostic
		this.LMSGetDiagnostic=function(arg)
		{
			var diag = this.api.LMSGetDiagnostic(arg);
			Utils.log("LMSGetDiagnostic('" + arg + "') = " + diag,'entry');
			return diag;
		};
	};

	// Utilities
	// ----------------------------------------------------------------------------
	this.Utils = {
		getInitAPIData:function(initData)
		{
			if(storageObject.retrieve(API.cookiename) !== null && storageObject.retrieve(API.cookiename) !== undefined)
			{
				return storageObject.retrieve(API.cookiename).parseJSON();
			}
			else
			{
				return initData;
			}
		},
		dumpAPI:function()
		{
			if(API.__data)
			{
				Utils.log('<b>Dumping API object:</b> <blockquote> ' + this.formatAPIData(API.__data.toJSONString()) + '</blockquote>','info');
			}
			else
			{
				Utils.log('ERROR: API object contains no data.','error');
			}
		},

		dumpExistingAPIData:function()
		{
			if(storageObject.retrieve(cookieName) !== undefined && storageObject.retrieve(cookieName) !== null)
			{
				var existingData = storageObject.retrieve(cookieName);
				Utils.log('<b>Existing API Data (from '+storageObject.toString()+' &quot;'+cookieName+'&quot; - To be used in API during initialization):</b> <blockquote> ' + this.formatAPIData(existingData) + '</blockquote>','info');
			}
			else
			{
				Utils.log('No Existing API data found in &quot;'+cookieName+'&quot;. Will use default init data.','info');
			}
		},

		formatAPIData:function(str)
		{
			var html;
			html = this.replaceAll(str, '{"', '{<br>"');
			html = this.replaceAll(html, '"}', '"<br>}');
			html = this.replaceAll(html, '","', '",<br>"');

			return html;
		},

		replaceAll:function(text, strA, strB)
		{
			return text.replace( new RegExp(strA,"g"), strB );
		},

		addTime:function(first, second)
		{
			var sFirst = first.split(":");
			var sSecond = second.split(":");
			var cFirst = sFirst[2].split(".");
			var cSecond = sSecond[2].split(".");
			var change = 0;

			FirstCents = 0;  //Cents
			if (cFirst.length > 1) {
				FirstCents = parseInt(cFirst[1],10);
			}
			SecondCents = 0;
			if (cSecond.length > 1) {
				SecondCents = parseInt(cSecond[1],10);
			}
			var cents = FirstCents + SecondCents;
			change = Math.floor(cents / 100);
			cents = cents - (change * 100);
			if (Math.floor(cents) < 10) {
				cents = "0" + cents.toString();
			}

			var secs = parseInt(cFirst[0],10)+parseInt(cSecond[0],10)+change;  //Seconds
			change = Math.floor(secs / 60);
			secs = secs - (change * 60);
			if (Math.floor(secs) < 10) {
				secs = "0" + secs.toString();
			}

			mins = parseInt(sFirst[1],10)+parseInt(sSecond[1],10)+change;   //Minutes
			change = Math.floor(mins / 60);
			mins = mins - (change * 60);
			if (mins < 10) {
				mins = "0" + mins.toString();
			}

			hours = parseInt(sFirst[0],10)+parseInt(sSecond[0],10)+change;  //Hours
			if (hours < 10) {
				hours = "0" + hours.toString();
			}

			if (cents != '0') {
				return hours + ":" + mins + ":" + secs + '.' + cents;
			} else {
				return hours + ":" + mins + ":" + secs;
			}
		},
		openWindow:function(winURL,winName,winW,winH,winOpts)
		{
			winOptions = winOpts+",width=" + winW + ",height=" + winH;
			newWin = window.open(winURL,winName,winOptions);
			newWin.moveTo(0,0);
			newWin.focus();
			return newWin;
		},
		log:function(status,style)
		{
			var timeFix=function(time)
			{
				return (time<10) ? '0'+time : time;
			};
			var d = new Date();
			var hrs = timeFix(d.getHours());
			var min = timeFix(d.getMinutes());
			var sec = timeFix(d.getSeconds());
			var tmp = (style) ? '<div class="'+style+'">' : '<div class="entry">';
			tmp += '&gt; '+hrs+':'+min+':'+sec+' ';
			tmp += status;
			tmp += '</div>';

			$('debug').innerHTML += tmp;
			$('debug').scrollTop = $('debug').scrollHeight;
		},
		clearCookieData:function()
		{
			var cookieNameAltVal = "cookie"+$('studentid').value;

			if(cookieNameAltVal.length > 0)
			{
				if(storageObject.retrieve(cookieNameAltVal))
				{
					storageObject.remove(cookieNameAltVal);
					Utils.log(storageObject.toString()+'"cookie'+$('studentid').value+'" Cleared','info');
				}
				else
				{
					Utils.log(storageObject.toString()+'"cookie'+$('studentid').value+'" Not Found','error');
				}
			}
			else
			{
				if(storageObject.retrieve(cookieName))
				{
					storageObject.remove(cookieName);
					Utils.log(storageObject.toString()+'"'+cookieName+'" Cleared','info');
				}
				else
				{
					Utils.log(storageObject.toString()+'"'+cookieName+'" Not Found','error');
				}
			}
		},
		genNewSessionName:function()
		{
			var d = new Date();
			var hrs = d.getHours();
			var min = d.getMinutes();
			var sec = d.getSeconds();

			if(useParentFolderAsCookieName)
			{
				var tmp = parentFolder+'_';
			}
			else
			{
				var tmp = 'SimpleAPI_Data_';
			}

			tmp += hrs+'.'+min+'.'+sec;
			//$('cookielaunchfile').value = tmp;
		},
		watchWin:function()
		{
			if(scoWin && !scoWin.closed)
			{
				initTimeout += 1000;
				if(initTimeout >= initTimeoutMax)
				{
					if(!API.initialized && !timeoutErrorDisplayed)
					{
						this.log('ERROR: LMSInitialize not called within 20 seconds from launching.', 'error');
						timeoutErrorDisplayed = true;
					}
				}

				setTimeout(function(){Utils.watchWin()},1000);
			}
			else
			{
				this.log('SCO Closed','info');
				//modify
				var xhttp = new XMLHttpRequest();
			  xhttp.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
						document.getElementById('server_response').innerHTML=this.responseText;
					}
			  };
			  xhttp.open("POST", ""+document.getElementById('server').value, true);
			  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			  xhttp.send("studentid="+$('studentid').value+"&data_index="+cookieName+"&data_value="+storageObject.retrieve(API.cookiename));
				if(!hasInitialized)
				{
					this.log('ERROR: LMSInitialize was never called.', 'error');
				}
				if(!hasTerminated)
				{
					this.log('ERROR: LMSFinish was never called.', 'error');
				}
			}
		},
		launchSCO:function()
		{
			//modify
			if($('scormlaunchfile').value==""){alert("Pilih Modul Terlebih Dahulu");return false;}
			// Reset the SimpleAPI
			hasTerminated = false;
			hasInitialized = false;
			API.terminated = false;
			API.initialized = false;
			initTimeout = 0;
			timeoutErrorDisplayed = false;

			var launchFileAltVal = $('scormlaunchfile').value;
			var cookieNameAltVal = "cookie"+$('studentid').value;

			if(launchFileAltVal.length > 0)
			{
				launchFile = launchFileAltVal;
				if(launchFileAltVal.indexOf(":") == 1)
				{
					launchFile = "file:///"+launchFile;
				}
			}

			if(cookieNameAltVal.length > 0)
			{
				API.cookiename = cookieName = cookieNameAltVal;
			}

			if(launchWithCustomApiProperty)
			{
				try
				{
					var key = $('customApiKey').value;
					var val = $('customApiValue').value;
					if(key && val)
					{
						API[key] = val;
					}
					Utils.log('Injected custom key/value into API object: '+key+'='+val,'info');
				}
				catch(e)
				{
					Utils.log('ERROR: Cannot inject custom key/value into API object: '+key+'='+val+ '('+e+')','error');
				}
			}

			try
			{
				var w =  wWidth;
				var h =  wHeight;
				var embedParam = '';
				if(launchWithEmbeddedParam)
				{
					try
					{
						embedParam = $('searchString').value;
						Utils.log('Appending search string to launch file: '+$('searchString').value,'info');
					}
					catch(e)
					{
						embedParam = '';
					}
				}
				else
				{
					embedParam = '';
				}

				var opts = '';
				opts += (wToolbar) ? 'toolbar=yes,' : '';
				opts += (wTitlebar) ? 'titlebar=yes,' : '';
				opts += (wLocation) ? 'location=yes,' : '';
				opts += (wStatus) ? 'status=yes,' : '';
				opts += (wScrollbars) ? 'scrollbars=yes,' : '';
				opts += (wResizable) ? 'resizable=yes,' : '';
				opts += (wMenubar) ? 'menubar=yes,' : '';
				opts = opts.substring(0, opts.length-1)

				Utils.log("Launching SCO win with options: "+opts)

				scoWin = this.openWindow(launchFile+embedParam,"SCOwindow",w,h,opts);
			}
			catch (e)
			{
				Utils.log('ERROR: '+e.description, 'error');
			}

			if(scoWin !== null)
			{
				try
				{
					Utils.log('SCO Launched','info');
					scoWin.focus();
					this.watchWin();
				}
				catch (e)
				{
					Utils.log('ERROR: '+err.description,'error');
				}
			}
			else
			{
				Utils.log('ERROR: SCO windows unable to open.  Please disable any popup blockers you might have enabled and ensure the launch file path is correct.', 'error');
			}
		},
		closeSCO:function()
		{
			try
			{
				if(scoWin && !scoWin.closed)
				{
					Utils.log('Attempting to close SCO window...','info');
					scoWin.close();
				}
			}
			catch(e)
			{
				Utils.log('ERROR: Unable to close SCO window ('+e.description+')','error');
			}
		},
		toggleDisplay:function(elm)
		{
			$(elm).style.display = ($(elm).style.display == 'block') ? 'none' : 'block';
		},
		toggleCloseOnFinishOption:function(chkd)
		{
			closeOnFinish = chkd;
		},
		toggleEmbeddedParam:function(chkd)
		{
			launchWithEmbeddedParam = chkd;
			$('searchString').disabled = !chkd;

		},
		toggleCustomKeyValueOption:function(chkd)
		{
			launchWithCustomApiProperty = chkd;
			$('customApiKey').disabled = !chkd;
			$('customApiValue').disabled = !chkd;
		},
		toggleWindowOption:function(prop,el)
		{
			window[prop] = el.checked;
		},
		enableAllWindowOptions:function()
		{
			wToolbar = true;
			wTitlebar = true;
			wLocation = true;
			wStatus = true;
			wScrollbars = true;
			wResizable = true;
			wMenubar = true;
			$('wToolbarOption').checked = true;
			$('wTitlebarOption').checked = true;
			$('wLocationOption').checked = true;
			$('wStatusOption').checked = true;
			$('wScrollbarsOption').checked = true;
			$('wResizableOption').checked = true;
			$('wMenubarOption').checked = true;
		},
		disableAllWindowOptions:function()
		{
			wToolbar = false;
			wTitlebar = false;
			wLocation = false;
			wStatus = false;
			wScrollbars = false;
			wResizable = false;
			wMenubar = false;
			$('wToolbarOption').checked = false;
			$('wTitlebarOption').checked = false;
			$('wLocationOption').checked = false;
			$('wStatusOption').checked = false;
			$('wScrollbarsOption').checked = false;
			$('wResizableOption').checked = false;
			$('wMenubarOption').checked = false;
		},
		loadManifest:function()
		{
			var xmlDoc = null;
			var file = fullPath+"/imsmanifest.xml";
			var useManifest=function()
			{
				try
				{
					var m = xmlDoc.getElementsByTagName("manifest")[0];

					var orgs = xmlDoc.getElementsByTagName("organizations")[0];
					var org = orgs.getElementsByTagName("organization")[0];
					var orgTitle = org.getElementsByTagName("title")[0].firstChild.nodeValue;

					var items = org.getElementsByTagName("item");
					var item = items[0];
					var itemTitle = item.getElementsByTagName("title")[0].firstChild.nodeValue;
					var itemMasteryScore = item.getElementsByTagName("adlcp:masteryscore")[0].firstChild.nodeValue;
					var itemIdentifier = item.getAttribute("identifier");
					var itemIdentifierRef = item.getAttribute("identifierref");

					var resources = xmlDoc.getElementsByTagName("resources")[0];
					var resource = resources.getElementsByTagName("resource");
					var itemResource = null;
					for(var i=0;i<resource.length;i++)
					{
						var id = resource[i].getAttribute("identifier");
						var scormtype = resource[i].getAttribute("adlcp:scormtype");
						if(id == itemIdentifierRef && scormtype.toLowerCase() == "sco")
						{
							itemResource = resource[i];
						}
					}
					var itemResourceHref = itemResource.getAttribute("href");

					Utils.log('IMS Manifest: Organization Title = &quot;'+orgTitle+'&quot;','entry');
					if(items.length > 1)
					{
						Utils.log('IMS Manifest: SimpleAPI detected multiple SCO references - Only the first will be launched.','entry');
					}
					Utils.log('IMS Manifest: First SCO Item = &quot;'+itemTitle+'&quot; (Mastery Score: '+itemMasteryScore+' / Identifier: &quot;'+itemIdentifier+'&quot;)','entry');
					Utils.log('IMS Manifest: Resource &quot;'+itemIdentifierRef+'&quot; HREF for Item &quot;'+itemIdentifier+'&quot; = &quot;'+itemResourceHref+'&quot;');

					var obj = {};
					obj.id = m.getAttribute("identifier");
					obj.orgTitle = orgTitle;
					obj.itemTitle = itemTitle;
					obj.itemMasteryScore = itemMasteryScore;
					obj.itemResourceHref = itemResourceHref;

					$('scormlaunchfile').value = itemResourceHref;

					return obj;
				}
				catch(e)
				{
					error=e.message;
					Utils.log('IMS Manifest: Cannot locate or parse manifest - '+error,'error');
					return false;
				}
			};

			/* - For Webkit - Not now though...
			// Check for the various File API support.
			if (window.File && window.FileReader) {
			  alert('Great success! All the File APIs are supported.');
			} else {
			  alert('The File APIs are not fully supported in this browser.');
			}
			*/


			try //Internet Explorer
			{
				xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
				xmlDoc.async=false;
				xmlDoc.onreadystatechange = function()
				{
					if(xmlDoc.readyState == 4)
					{
						useManifest();
					}
				}
				var success = xmlDoc.load(file);
			}
			catch(e)
			{
				try //Firefox, Mozilla, Opera, etc.
				{
					xmlDoc=document.implementation.createDocument("","",null);
					xmlDoc.async=false;
					xmlDoc.onload = function()
					{
						useManifest();
					};
					var success = xmlDoc.load(file);
				}
				catch(e)
				{
					try //Google Chrome
					{
						var xmlhttp = new window.XMLHttpRequest();
						xmlhttp.open("GET",file,false);
						xmlhttp.send(null);
						xmlDoc = xmlhttp.responseXML.documentElement;
						//alert(success);
					}
					catch(e)
					{
						error=e.message;
						Utils.log('IMS Manifest: Cannot locate or parse manifest - '+error,'error');

						return false;
					}
				}
			}
		}
	};

	// General/Global
	// ----------------------------------------------------------------------------
	this.init=function()
	{
		scoWin = null;
		var manifestObj = null;

		if(!skipManifestCheck)
		{
			var manifestObj = Utils.loadManifest();
		}

		if(!manifestObj)
		{
			if(useParentFolderAsCookieName)
			{
				cookieName = parentFolder;
			}
		}
		else
		{
			if(manifestObj.id)
			{
				cookieName = manifestObj.id;
			}

			if(manifestObj.itemResourceHref)
			{
				$('scormlaunchfile').value = manifestObj.itemResourceHref;
			}
		}

		var api = new GenericAPIAdaptor();
		API = new SimpleAPI(cookieName,api,initialState);

        // test for localStorage
        if(typeof(Storage) !== "undefined")
        {
            try {
              if (('localStorage' in window) && window['localStorage'] && window.localStorage !== null)
              {
                storageObject = localStorageObject;
              }
              else
              {
                storageObject = cookieStorageObject;
              }
            } catch(e) {
              storageObject = cookieStorageObject;
            }
        }
        else
        {
            storageObject = cookieStorageObject;
        }

		//$('cookielaunchfile').value = 'cookie'+$('scormlaunchfile').value;

		// $('winW').value = wWidth;
		// $('winH').value = wHeight;
		//
		// $('wToolbarOption').checked = wToolbar;
		// $('wTitlebarOption').checked = wTitlebar;
		// $('wLocationOption').checked = wLocation;
		// $('wStatusOption').checked = wStatus;
		// $('wScrollbarsOption').checked = wScrollbars;
		// $('wResizableOption').checked = wResizable;
		// $('wMenubarOption').checked = wMenubar;

		//Utils.toggleDisplay('optionSet');
		Utils.toggleDisplay('debug');

		if(closeOnFinish)
		{
			//$('closeOnFinishOption').checked = true;
		}

		// launchWithEmbeddedParam = $('toggleEmbeddedOption').checked;
		// launchWithCustomApiProperty = $('toggleCustomKeyValueOption').checked;

		// $('searchString').disabled = !launchWithEmbeddedParam;
		// $('customApiKey').disabled = !launchWithCustomApiProperty;
		// $('customApiValue').disabled = !launchWithCustomApiProperty;
		//
		//
		// $('searchString').value = defaultSearchString;
		// $('customApiKey').value = defaultCustomApiKey;
		// $('customApiValue').value = defaultCustomApiValue;

        Utils.log('Storage type will be: '+storageObject.toString(),'info');

		Utils.dumpExistingAPIData();
	};

	this.sendSimApi=function(simAPI,title,totalToInclude,totalIncorrect,incStepNumberList)
	{
		Utils.log('Sim API Object: '+simAPI,'info');
		Utils.log('Sim Title: '+title,'info');
	};

	this.$=function(id)
	{
		var el = document.getElementById(id);
		return el;
	};

    // Cookie Object interface
    this.cookieStorageObject={
        persist:function(name,data,lifetime)
        {
            saveCookie(name,data,lifetime)
        },
        retrieve:function(name)
        {
            return readCookie(name);
        },
        remove:function(name)
        {
            deleteCookie(name);
        },
        toString:function()
        {
            return "Cookie";
        }
    };

    // LocalStorage Interface
    this.localStorageObject={
        persist: function(name,data,lifetime)
        {
            localStorage[name] = data;
        },
        retrieve:function(name)
        {
            return localStorage[name];
        },
        remove:function(name)
        {
            delete localStorage[name];
        },
        toString:function()
        {
            return "LocalStorage";
        }
    };

	window.onload=function()
	{
		this.init();
	};
})();


// Cookie Functions
// ----------------------------------------------------------------------------
// save/read/delete cookie functions for storing small chunks of data in the browser
// 19990326

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

// thanks to: Jesee Chisholm <JCHISHOLM@SENSORMATIC-VPD.com>

function saveCookie(name,value,days)
{
	if(days)
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else
	{
		expires = "";
	}
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i<ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function deleteCookie(name)
{
	saveCookie(name,"",-1);
}

// JSON
// ----------------------------------------------------------------------------
/*
    json.js
    2006-11-09

    This file adds these methods to JavaScript:

        array.toJSONString()
        boolean.toJSONString()
        date.toJSONString()
        number.toJSONString()
        object.toJSONString()
        string.toJSONString()
            These method produces a JSON text from a JavaScript value.
            It must not contain any cyclical references. Illegal values
            will be excluded.

            The default conversion for dates is to an ISO string. You can
            add a toJSONString method to any date object to get a different
            representation.

        string.parseJSON()
            This method parses a JSON text to produce an object or
            array. It can throw a SyntaxError exception.

    It is expected that these methods will formally become part of the
    JavaScript Programming Language in the Fourth Edition of the
    ECMAScript standard in 2007.
*/

Array.prototype.toJSONString = function () {
    var a = ['['], b, i, l = this.length, v;

    function p(s) {
        if (b) {
            a.push(',');
        }
        a.push(s);
        b = true;
    }

    for (i = 0; i < l; i += 1) {
        v = this[i];
        switch (typeof v) {
        case 'undefined':
        case 'function':
        case 'unknown':
            break;
        case 'object':
            if (v) {
                if (typeof v.toJSONString === 'function') {
                    p(v.toJSONString());
                }
            } else {
                p("null");
            }
            break;
        default:
            p(v.toJSONString());
        }
    }
    a.push(']');
    return a.join('');
};
Boolean.prototype.toJSONString = function () {
    return String(this);
};
Date.prototype.toJSONString = function () {

    function f(n) {
        return n < 10 ? '0' + n : n;
    }

    return '"' + this.getFullYear() + '-' +
            f(this.getMonth() + 1) + '-' +
            f(this.getDate()) + 'T' +
            f(this.getHours()) + ':' +
            f(this.getMinutes()) + ':' +
            f(this.getSeconds()) + '"';
};
Number.prototype.toJSONString = function () {
    return isFinite(this) ? String(this) : "null";
};
Object.prototype.toJSONString = function () {
    var a = ['{'], b, i, v;

    function p(s) {
        if (b) {
            a.push(',');
        }
        a.push(i.toJSONString(), ':', s);
        b = true;
    }

    for (i in this) {
        if (this.hasOwnProperty(i)) {
            v = this[i];
            switch (typeof v) {
            case 'undefined':
            case 'function':
            case 'unknown':
                break;
            case 'object':
                if (v) {
                    if (typeof v.toJSONString === 'function') {
                        p(v.toJSONString());
                    }
                } else {
                    p("null");
                }
                break;
            default:
                p(v.toJSONString());
            }
        }
    }
    a.push('}');
    return a.join('');
};
(function (s){
    var m = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"' : '\\"',
        '\\': '\\\\'
    };
    s.parseJSON = function () {
        try {
            if (/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.
                    test(this)) {
                return eval('(' + this + ')');
            }
        } catch (e) {
        }
        throw new SyntaxError("parseJSON");
    };
    s.toJSONString = function () {
        if (/["\\\x00-\x1f]/.test(this)) {
            return '"' + this.replace(/([\x00-\x1f\\"])/g, function(a, b) {
                var c = m[b];
                if (c) {
                    return c;
                }
                c = b.charCodeAt();
                return '\\u00' +
                    Math.floor(c / 16).toString(16) +
                    (c % 16).toString(16);
            }) + '"';
        }
        return '"' + this + '"';
    };
})(String.prototype);

/**
 *  RELOAD TOOLS
 *
 *  Copyright (c) 2003 Oleg Liber, Bill Olivier, Phillip Beauvoir, Paul Sharples
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  Project Management Contact:
 *
 *  Oleg Liber
 *  Bolton Institute of Higher Education
 *  Deane Road
 *  Bolton BL3 5AB
 *  UK
 *
 *  e-mail:   o.liber@bolton.ac.uk
 *
 *
 *  Technical Contact:
 *
 *  Phillip Beauvoir
 *  e-mail:   p.beauvoir@bolton.ac.uk
 *
 *  Paul Sharples
 *  e-mail:   p.sharples@bolton.ac.uk
 *
 *  Web:      http://www.reload.ac.uk
 *
 * @author Paul Sharples
 * @version $Id: ReloadAPIAdaptor.js,v 1.3 2004/07/25 13:04:59 ps3com Exp $
 *
 */
/*
* -----------------------------------------------------------------------------------------------
*  Convenience Methods needed for SCO communication
* -----------------------------------------------------------------------------------------------
*/

var looseChecking ="false";

/*
* Function to initially load the server model CMI elements into the javascript
* model, when this page first loads.
*/
function loadDataIntoModel(element, value){
  if (element != "cmi.interactions._count" && element != "cmi.interactions._count"){
        if (element.indexOf("cmi.objectives") != -1){
             dealWithSettingObjectives(element, value);
        }
        else if (element.indexOf("cmi.interactions") != -1){
             dealWithSettingInteractions(element, value);
        }
        else{
           var result = eval ("API."+element);
           if (result != null){
                result.cmivalue = value;
           }
        }
  }
}

/*
*  Object ServerScoSettings()
*  Used to store server specific settings and error codes etc..
*  Is accessed as an object inside this implementation of the API object.
*/
function ServerScoSettings(){
	this.isInitialized = "false";
	this.lastError = "0";
	this.checkDataTypeAndVocab = scoCheckDataTypeAndVocab;
}

/*
* A CMIComponent holds properties for each CMI element in the model.
* Here we keep the element name, it current value, its read/write status
* and finally it CMI datatype
*/
function CMIComponent(thename, thevalue, readstatus, datatype){
	this.cminame=thename;
	this.cmivalue=thevalue;
	this.cmireadStatus=readstatus;
	this.cmidatatype=datatype;
}

/*
* Top level object to hold complete CMI data model and API methods
*/
function GenericAPIAdaptor(){
	this.cmi = new CMIModel;
	this.LMSInitialize = LMSInitializeMethod;
	this.LMSGetValue = LMSGetValueMethod;
	this.LMSSetValue = LMSSetValueMethod;
	this.LMSCommit = LMSCommitMethod;
	this.LMSFinish = LMSFinishMethod;
	this.LMSGetLastError = LMSGetLastErrorMethod;
	this.LMSGetErrorString = LMSGetErrorStringMethod;
	this.LMSGetDiagnostic = LMSGetDiagnosticMethod;
	this.ServerSco = new ServerScoSettings;
}

/*
* ---------------------------------------------------------------------------------------------
*	API Javascript Functions
* ---------------------------------------------------------------------------------------------
*/

/*
* LMSInitialize. Initialize this sco (if it is one)
*/
function LMSInitializeMethod(parameter){
    // check that this has been called with an empty string...
	if (parameter != ""){
		this.ServerSco.lastError = "201"
		return "false";
	}
    // check that we are not already initialized...
    if(this.ServerSco.isInitialized == "false"){
		this.ServerSco.isInitialized = "true";
		this.ServerSco.lastError = "0"
		return "true";
	}
	else{
		this.ServerSco.lastError = "101"
		//modify return "false";
		return "true";
	}
}

/*
* LMSFinish. Finish this sco session.
*/
function LMSFinishMethod(parameter){
    // check that this has been called with an empty string...
	if (parameter != ""){
		this.ServerSco.lastError = "201";
		return "false";
	}
    // make sure that the server is initialized...
	if (this.ServerSco.isInitialized=="true"){
     		this.ServerSco.isInitialized = "false";
			this.ServerSco.lastError = "0";
			return "true";
	}
    else{
		// not initialized
		this.ServerSco.lastError = "301";
		return "false";
	}
}



/*
* LMSCommit.  Method to update/persist any changed items in the CMI datamodel
*/
function LMSCommitMethod(parameter){
    // check that this has been called with an empty string...
	if (parameter!=""){
		this.ServerSco.lastError = "201"
		return "false";
	}
	if (this.ServerSco.isInitialized == "true"){
			this.ServerSco.lastError = "0";
			return "true";
	}
	else{
		// not initialized
		this.ServerSco.lastError = "301";
		return "false";
	}
}

function dealWithGettingObjectives(element){
	// RETURN _CHILDREN
	if (element == "cmi.objectives._children"){
		API.ServerSco.lastError = "0";
		return API.cmi.objectives._children.cmivalue;
	}

	// RETURN _COUNT
	if (element == "cmi.objectives._count"){
		API.ServerSco.lastError = "0";
		return API.cmi.objectives._count.cmivalue;
	}

	// ELSE CHECK THAT THE ELEMENT IS VALID AND HAS AT LEAST 3 PARAMS
	var cmiArray = element.split(".");
	if (cmiArray.length < 3){
		API.ServerSco.lastError = "201";
		return "";
	}

	var theCount = API.cmi.objectives._count.cmivalue;

	// IF 3RD ARG IS NOT A NUMBER THEN THROW ERROR
	// need to check cmiArray[2] to see if its a number
	if (isNaN(cmiArray[2])){
		API.ServerSco.lastError = "401";
		return "";
	}

	// IF ITS A NUMBER MAKE SURE ITS IN THE ARRAY BOUNDS
	if(cmiArray[2] >= theCount){
		// call to array is out of bounds
		API.ServerSco.lastError = "201";
		return "";
	}
	else{	// WEVE GOT TO THE POINT OF VALIDATING cmi.objective.n
		// does this element exist in the objectives array? - sanity check...
		var mystr = "API."+cmiArray[0] + "." + cmiArray[1] + ".objArray(" + cmiArray[2] + ");";
		ans = eval(mystr);
		//if it doesn't exist
		if (ans == null){
			API.ServerSco.lastError = "201";
			return "";
		}
		else{
			// we need to see if the call is asking for a valid element under cmi.objectives.n
			// we can trust the element parameter now to call the following...
			subelementstr = "ans";
			for (i=3;i<cmiArray.length;i++){
				subelementstr = subelementstr + "." + cmiArray[i];
			}

			var objTest = eval(subelementstr);
			if (objTest == null){
				API.ServerSco.lastError = "201";
				return "false";
			}

			subelementstr = subelementstr + ".cmivalue;";
			res = eval(subelementstr);
			if (res == null){
				API.ServerSco.lastError = "201";
				return "";
			}
			else{
				API.ServerSco.lastError = "0";
				return res;
			}
		}
	}
}

function dealWithGettingInteractions(element){
	// RETURN _CHILDREN
	if (element == "cmi.interactions._children"){
		API.ServerSco.lastError = "0";
		return API.cmi.interactions._children.cmivalue;
	}

	// RETURN _COUNT
	if (element == "cmi.interactions._count"){
		API.ServerSco.lastError = "0";
		return API.cmi.interactions._count.cmivalue;
	}

	// ELSE CHECK THAT THE ELEMENT IS VALID AND HAS AT LEAST 3 PARAMS, DOESNT HAVE
	// MORE THAN 6 PARAMS  - IF SO, ITS ILLEGAL
	var cmiArray = element.split(".");
	if (cmiArray.length < 3 || cmiArray.length > 6){
		API.ServerSco.lastError = "201";
		return "";
	}

	var theCount = API.cmi.interactions._count.cmivalue;

	// IF 3RD ARG IS NOT A NUMBER THEN THROW ERROR
	// need to check cmiArray[2] to see if its a number
	if (isNaN(cmiArray[2])){
		API.ServerSco.lastError = "401";
		return "";
	}

	// IF ITS A NUMBER MAKE SURE ITS IN THE ARRAY BOUNDS
	if(cmiArray[2] >= theCount){
		// call to array is out of bounds
		API.ServerSco.lastError = "201";
		return "";
	}
	else{	// WEVE GOT TO THE POINT OF VALIDATING cmi.interactions.n
		// does this element exist in the interactions array? - sanity check...
		//
		// We are checking that 'cmi.interactions.n' exists
		var mystr = "API."+cmiArray[0] + "." + cmiArray[1] + ".intArray(" + cmiArray[2] + ")";
		ans = eval(mystr);
		//if it doesn't exist
		if (ans==null){
			API.ServerSco.lastError = "201";
			return "";
		}
		else{
			// if theres 4 bits to the element path then try to see if object exists
			if (cmiArray.length == 4){
				strleaf = "ans."+ cmiArray[3] + ";";
				var doesLeafExist = eval (strleaf);
				if (doesLeafExist == null){
					API.ServerSco.lastError = "201";
					return "";
				}
				else{
					// NEXT CHECK THAT THIS ELEMENT IS NOT WRITEONLY
					strleafstatus = mystr + "."+ cmiArray[3] + ".cmireadStatus;";
					var leafstatus = eval(strleafstatus);
					if (leafstatus == "writeonly"){
						API.ServerSco.lastError = "404";
						return "";
					}

					// WE CAN NOW TRY TO GET THE FULL OBJECT REFERENCE
					var strleafval = mystr + "."+ cmiArray[3] + ".cmivalue;";
					var leafVal = eval(strleafval);
					if (leafVal == null){
						// IT FAILED AT THE FINAL HURDLE...
						API.ServerSco.lastError = "201";
						return "";
					}
					else{
						API.ServerSco.lastError = "0";
						return leafVal;
					}

				}
			}
			// if theres 5 bits to the element path then try to see if object exists
			if (cmiArray.length == 5){
				// check object exists
				strbranch = "ans."+ cmiArray[3] + ";";
				var doesLeafExist = eval (strbranch);
				if (doesLeafExist == null){
					API.ServerSco.lastError = "201";
					return "";
				}

				// check final object exists in the array list...
				nextstrbranch = "ans."+ cmiArray[3] + "." + cmiArray[4] + ";";
				var doesLeafExist = eval (nextstrbranch);
				if (doesLeafExist == null){
					API.ServerSco.lastError = "201";
					return "";
				}

				// check for write only
				strread = "ans."+ cmiArray[3] + "." + cmiArray[4] + ".cmireadStatus;";
				var isWriteOnly = eval (strread);
				if (isWriteOnly == "writeonly"){
					API.ServerSco.lastError = "404";
					return "";
				}

				// see if value exists
				strleaf = "ans."+ cmiArray[3] + "." + cmiArray[4] + ".cmivalue;";
				var doesLeafExist = eval (strleaf);
				if (doesLeafExist == null){
					API.ServerSco.lastError = "201";
					return "";
				}
				else{
					API.ServerSco.lastError = "0";
					return doesLeafExist;
				}

			}
			// if theres 6 bits to the element path then try to see if object exists
			if (cmiArray.length == 6){
				// check object exists
				strbranch = "ans."+ cmiArray[3];
				var doesBranchExist = eval (strbranch);
				if (doesBranchExist == null){
					API.ServerSco.lastError = "201";
					return "";
				}
				// The fifth argument should be an array reference, so do some checking...

				// IF 5TH ARG IS NOT A NUMBER THEN THROW ERROR
				// need to check cmiArray[4] to see if its a number
				if (isNaN(cmiArray[4])){
					API.ServerSco.lastError = "401";
					return "";
				}

				// check to see if this element has a _count
				// If it hasn't we'll have to throw an error here
				// because we need the correct array index for array #2...
				var theCount = "ans." + cmiArray[3] + "._count.cmivalue;";
				var hasCount = eval(theCount);
				// CANT FIND _COUNT FOR THIS ELEMENT, SO THROW AN ERROR...
				if (hasCount == null){
					API.ServerSco.lastError = "201";
					return "";
				}
				// next need to check to see if array ref is in array bounds
				if(cmiArray[4] >= hasCount || cmiArray[4] < 0){
					// call to array is out of bounds
					API.ServerSco.lastError = "201";
					return "";
				}
				// make sure that array index 4 is either 'objectives' or 'correct_responses'
				if (cmiArray[3] == "objectives"){
					// next check that there is an object here at this array index...
					var arrayIndex2Check = eval("ans." + cmiArray[3] + ".objectivesInteractionArray(" + cmiArray[4] + ")");
					// check for null
					if (arrayIndex2Check == null){
						API.ServerSco.lastError = "201";
						return "";
					}
					else{
						// next check that the last element is valid...
						finalObjectCheck = eval ("arrayIndex2Check." + cmiArray[5]);
						if (finalObjectCheck == null){
							API.ServerSco.lastError = "201";
							return "";
						}
						else{
							// call must be to a valid element in the model so...
							// check it for writeonly...
							isWriteonly = eval ("finalObjectCheck.cmireadStatus");
							if (isWriteonly == "writeonly"){
								API.ServerSco.lastError = "404";
								return "";
							}
							else{
								API.ServerSco.lastError = "0";
								return eval ("finalObjectCheck.cmivalue");
							}
						}
					}
				}
				else if (cmiArray[3] == "correct_responses"){
					// next check that there is an object here at this array index...
					var arrayIndex2Check = eval("ans." + cmiArray[3] + ".correctResponsesInteractionArray(" + cmiArray[4] + ")");
					// check for null
					if (arrayIndex2Check == null){
						API.ServerSco.lastError = "201";
						return "";
					}
					else{
						// next check that the last element is valid...
						finalObjectCheck = eval ("arrayIndex2Check." + cmiArray[5]);
						if (finalObjectCheck == null){
							API.ServerSco.lastError = "201";
							return "";
						}
						else{
							// call must be to a valid element in the model so...
							// check it for writeonly...
							isWriteonly = eval ("finalObjectCheck.cmireadStatus");
							if (isWriteonly == "writeonly"){
								API.ServerSco.lastError = "404";
								return "";
							}
							else{
								API.ServerSco.lastError = "0";
								return eval ("finalObjectCheck.cmivalue");
							}
						}
					}
				}
				else {
					// throw an error becuase 4th arg was not either
					// objectives or correct_responses
					API.ServerSco.lastError = "201";
					return "";
				}
			}
		}
	}
}

function dealWithSettingObjectives(element, value){
	//  _CHILDREN ARE READONLY
	if (element == "cmi.objectives._children"){
		API.ServerSco.lastError = "402";
		return "false";
	}

	//  _COUNT IS READ ONLY
	if (element == "cmi.objectives._count"){
		API.ServerSco.lastError = "402";
		return "false";
	}

	// ELSE CHECK THAT THE ELEMENT IS VALID AND HAS AT LEAST 3 PARAMS
	var cmiArray = element.split(".");
	if (cmiArray.length < 3){
		API.ServerSco.lastError = "201";
		return "false";
	}

	// IF 3RD ARG IS NOT A NUMBER THEN THROW ERROR
	// need to check cmiArray[2] to see if its a number
	if (isNaN(cmiArray[2])){
		API.ServerSco.lastError = "401";
		return "false";
	}


	var theCount = API.cmi.objectives._count.cmivalue;

	// IF ITS A NUMBER MAKE SURE ITS IN THE ARRAY BOUNDS
	if(cmiArray[2] > theCount || cmiArray[2] < 0){
		// call to array is out of bounds
		API.ServerSco.lastError = "201";
		return "false";
	}
	else if(cmiArray[2] == theCount || cmiArray[2]  < theCount){

		//create a new one
		var existingObjectiveHandle = API.cmi.objectives.objArray(cmiArray[2]);
		if (existingObjectiveHandle == null){
			API.ServerSco.lastError = "101";
			return "false";
		}
		else{
			// we need to see if the call is asking for a valid element under cmi.objectives.n
			// we can trust the element parameter now to call the following...
			subelementstr = "existingObjectiveHandle";
			for (i=3;i<cmiArray.length;i++){
				subelementstr = subelementstr + "." + cmiArray[i];
			}

			var objTest = eval(subelementstr);
			if (objTest == null){
				API.ServerSco.lastError = "201";
				return "false";

			}

			var subelementstrWithoutLeaf = subelementstr;
			subelementstr = subelementstr + ".cmireadStatus;";
			res = eval(subelementstr);
			if (res == null){
				API.ServerSco.lastError = "101";
				return "false";
			}
			else{
				if (res == "readonly"){
					API.ServerSco.lastError = "403";
					return "false";
				}
				else{

                    // check the datatype and vocabulary...
                    var datatype = objTest.cmidatatype;
                    res = API.ServerSco.checkDataTypeAndVocab(element, value, datatype);

                    if (res == "true"){
                        // correct datatype...
  			            // WE CAN NOW TRY TO SET THE FULL OBJECT REFERENCE
					    var strleafval = "objTest.cmivalue =\"" + value + "\";";
					    var leafVal = eval(strleafval);
					    if (leafVal == null){
						    // IT FAILED AT THE FINAL HURDLE...
						    API.ServerSco.lastError = "201";
						    return "false";
					   }
					   else{
						    API.ServerSco.lastError = "0";
						    return "true";
					   }
                   }
                   else{
                       // incorrect data type...
			           API.ServerSco.lastError = "405";
                       return "false";
                   }

				}
			}
		}
	}
}

function dealWithSettingInteractions(element, value){
	//  _CHILDREN ARE READONLY
	if (element == "cmi.interactions._children"){
		API.ServerSco.lastError = "402";
		return "false";
	}

	//  _COUNT IS READ ONLY
	if (element == "cmi.interactions._count"){
		API.ServerSco.lastError = "402";
		return "false";
	}

	// ELSE CHECK THAT THE ELEMENT IS VALID AND HAS AT LEAST 3 PARAMS, DOESNT HAVE
	// MORE THAN 6 PARAMS  - ALL ILLEGAL
	var cmiArray = element.split(".");
	if (cmiArray.length < 3 || cmiArray.length > 6){
		API.ServerSco.lastError = "201";
		return "false";
	}

	var theCount = API.cmi.interactions._count.cmivalue;

	// IF 3RD ARG IS NOT A NUMBER THEN THROW ERROR
	// need to check cmiArray[2] to see if its a number
	if (isNaN(cmiArray[2])){
		API.ServerSco.lastError = "401";
		return "false";
	}

	var theCount = API.cmi.interactions._count.cmivalue;

	// IF ITS A NUMBER MAKE SURE ITS IN THE ARRAY BOUNDS
	if(cmiArray[2] > theCount || cmiArray[2] < 0){
		// call to array is out of bounds
		API.ServerSco.lastError = "201";
		return "false";
	}
	else if(cmiArray[2] <= theCount){

		//create a new one or get existing object
		var existingObjectiveHandle = API.cmi.interactions.intArray(cmiArray[2]);
		if (existingObjectiveHandle == null){
			API.ServerSco.lastError = "101";
			return "false";
		}
		else{
			// we now have a reference to cmi.interactions.n
			// if theres 4 bits to the element path then try to see if object exists

			if (cmiArray.length == 4){
				strleaf = "existingObjectiveHandle." + cmiArray[3];
				var doesLeafExist = eval (strleaf);
				if (doesLeafExist == null){
					API.ServerSco.lastError = "201";
					return "false";
				}
				else{

					// NEXT CHECK THAT THIS ELEMENT IS NOT READONLY
					strleafstatus = "doesLeafExist.cmireadStatus";
					var leafstatus = eval(strleafstatus);
					if (leafstatus == "readonly"){
						API.ServerSco.lastError = "403";
						return "false";
					}

                    // check the datatype and vocabulary...
                    var datatype = doesLeafExist.cmidatatype;
                    res = API.ServerSco.checkDataTypeAndVocab(element, value, datatype);
                    if (res == "true"){
                        // correct datatype...
  			            // WE CAN NOW TRY TO SET THE FULL OBJECT REFERENCE
					    var strleafval = "doesLeafExist.cmivalue =\"" + value + "\";";
					    var leafVal = eval(strleafval);
					    if (leafVal == null){
						    // IT FAILED AT THE FINAL HURDLE...
						    API.ServerSco.lastError = "201";
						    return "false";
					   }
					   else{
						    API.ServerSco.lastError = "0";
						    return "true";
					   }
                   }
                   else{
                       // incorrect data type...
			           API.ServerSco.lastError = "405";
                       return "false";
                   }
				}
			}
			if (cmiArray.length == 5){
				// check object exists
				strbranch = "existingObjectiveHandle."+ cmiArray[3] + ";";
				var doesLeafExist = eval (strbranch);
				if (doesLeafExist == null){
					API.ServerSco.lastError = "201";
					return "false";
				}

				// check final object exists in the array list...
				nextstrbranch = "existingObjectiveHandle."+ cmiArray[3] + "." + cmiArray[4] + ";";
				var doesLeafExist = eval (nextstrbranch);
				if (doesLeafExist == null){
					API.ServerSco.lastError = "201";
					return "false";
				}

				// check for write only
				strread = "existingObjectiveHandle."+ cmiArray[3] + "." + cmiArray[4] + ".cmireadStatus;";
				var isWriteOnly = eval (strread);
				if (isWriteOnly == "readonly"){
					API.ServerSco.lastError = "403";
					return "false";
				}

				// see if value exists
				strleaf = "existingObjectiveHandle."+ cmiArray[3] + "." + cmiArray[4] + ".cmivalue;";
				var doesLeafExist = eval (strleaf);
				if (doesLeafExist == null){
					API.ServerSco.lastError = "201";
					return "false";
				}
				else{
                    // check the datatype and vocabulary...
                    var datatype = doesLeafExist.cmidatatype;
                    res = API.ServerSco.checkDataTypeAndVocab(element, value, datatype);
                    if (res == "true"){
                        // correct datatype...
  			            // WE CAN NOW TRY TO SET THE FULL OBJECT REFERENCE
					    var strleafval = "doesLeafExist.cmivalue =\"" + value + "\";";
					    var leafVal = eval(strleafval);
					    if (leafVal == null){
						    // IT FAILED AT THE FINAL HURDLE...
						    API.ServerSco.lastError = "201";
						    return "false";
					    }
					    else{
						    API.ServerSco.lastError = "0";
						    return "true";
					    }
                    }
                    else{
                       // incorrect data type...
			           API.ServerSco.lastError = "405";
                       return "false";
                    }
				}
			}
			if (cmiArray.length == 6){
				// check object exists
				strbranch = "existingObjectiveHandle."+ cmiArray[3];
				var doesBranchExist = eval (strbranch);
				if (doesBranchExist == null){
					API.ServerSco.lastError = "201";
					return "false";
				}
				// The fifth argument should be an array reference, so do some checking...

				// IF 5TH ARG IS NOT A NUMBER THEN THROW ERROR
				// need to check cmiArray[4] to see if its a number
				if (isNaN(cmiArray[4])){
					API.ServerSco.lastError = "401";
					return "false";
				}

				// check to see if this element has a _count
				// If it hasn't we'll have to throw an error here
				// because we need the correct array index for array #2...
				var theCount = "existingObjectiveHandle." + cmiArray[3] + "._count.cmivalue;";
				var hasCount = eval(theCount);
				// CANT FIND _COUNT FOR THIS ELEMENT, SO THROW AN ERROR...
				if (hasCount == null){
					API.ServerSco.lastError = "201";
					return "false";
				}
				// next need to check to see if array ref is in array bounds
				if(cmiArray[4] > hasCount || cmiArray[4] < 0){
					// call to array is out of bounds
					API.ServerSco.lastError = "201";
					return "false";
				}

				// make sure that array index 4 is either 'objectives' or 'correct_responses'
				if (cmiArray[3] == "objectives"){
					// next check that there is an object here at this array index...
					var arrayIndex2Check = eval("existingObjectiveHandle." + cmiArray[3] + ".objectivesInteractionArray(" + cmiArray[4] + ")");
					// check for null
					if (arrayIndex2Check == null){
						API.ServerSco.lastError = "201";
						return "false";
					}
					else{
						// next check that the last element is valid...
						finalObjectCheck = eval ("arrayIndex2Check." + cmiArray[5]);
						if (finalObjectCheck == null){
							API.ServerSco.lastError = "201";
							return "false";
						}
						else{
							// call must be to a valid element in the model so...
							// check it for readonly...
							isWriteonly = eval ("finalObjectCheck.cmireadStatus");
							if (isWriteonly == "readonly"){
								API.ServerSco.lastError = "403";
								return "false";
							}
							else{

                                // check the datatype and vocabulary...
                                var datatype = finalObjectCheck.cmidatatype;
                                res = API.ServerSco.checkDataTypeAndVocab(element, value, datatype);
                                if (res == "true"){
                                    // correct datatype...
  			                        // WE CAN NOW TRY TO SET THE FULL OBJECT REFERENCE
                                    var strleafval = "finalObjectCheck.cmivalue =\"" + value + "\";";
					                var leafVal = eval(strleafval);
					                if (leafVal == null){
						                // IT FAILED AT THE FINAL HURDLE...
						                API.ServerSco.lastError = "201";
						                return "false";
                                    }
					                else{
						               API.ServerSco.lastError = "0";
						               return "true";
					                }
                               }
                               else{
                                   // incorrect data type...
			                       API.ServerSco.lastError = "405";
                                   return "false";
                               }
							}
						}
					}
				}
				else if (cmiArray[3] == "correct_responses"){
					// next check that there is an object here at this array index...
					var arrayIndex2Check = eval("existingObjectiveHandle." + cmiArray[3] + ".correctResponsesInteractionArray(" + cmiArray[4] + ")");
					// check for null
					if (arrayIndex2Check == null){
						API.ServerSco.lastError = "201";
						return "false";
					}
					else{
						// next check that the last element is valid...
						finalObjectCheck = eval ("arrayIndex2Check." + cmiArray[5]);
						if (finalObjectCheck == null){
							API.ServerSco.lastError = "201";
							return "false";
						}
						else{
							// call must be to a valid element in the model so...
							// check it for readonly...
							isWriteonly = eval ("finalObjectCheck.cmireadStatus");
							if (isWriteonly == "readonly"){
								API.ServerSco.lastError = "403";
								return "false";
							}
							else{
                                                               // check the datatype and vocabulary...
                                                               var datatype = finalObjectCheck.cmidatatype;
                                                               res = API.ServerSco.checkDataTypeAndVocab(element, value, datatype);
                                                               if (res == "true"){
                                                                   // correct datatype...
  			                                           // WE CAN NOW TRY TO SET THE FULL OBJECT REFERENCE
                                                                   var strleafval = "finalObjectCheck.cmivalue =\"" + value + "\";";
					                           var leafVal = eval(strleafval);
					                           if (leafVal == null){
						                       // IT FAILED AT THE FINAL HURDLE...
						                       API.ServerSco.lastError = "201";
						                       return "false";
                                                                   }
					                           else{
						                       API.ServerSco.lastError = "0";
                                                                       return "true";
					                           }
                                                               }
                                                               else{
                                                                       // incorrect data type...
			                                               API.ServerSco.lastError = "405";
                                                                       return "false";
                                                               }

							}
						}
					}
				}
				else {
					// throw an error because 4th arg was not either
					// objectives or correct_responses
					API.ServerSco.lastError = "201";
					return "false";
				}

			}

		}
	}

}

/*
* LMSGetValue.  Method to allow sco to read/access CMI datamodel elements
*/
function LMSGetValueMethod(element){
	if(this.ServerSco.isInitialized=="true"){
		var invalid = "false";
		var cannotHaveChildren = "false";
		var isNotAnArray = "false";

		// this checks to make sure there is at least one dot in the value
		if (element.indexOf(".")== -1){
			invalid = "true";
		}

		// dont bother doing this if we have already found an error...
		if (invalid != "true"){
			// we then loop around the children, making sure they exist one, by one...
			var cmiArray = element.split(".");
			var teststring = "this";
			for(i=0;i<cmiArray.length;i++){
				doesExist = eval(teststring + "." + cmiArray[i]+ ";");
				if(doesExist == null){
					invalid="true";
					// check for invalid _children call
					if (cmiArray[i]=="_children"){
						cannotHaveChildren = "true";
					}
					// check for invalid _count call
					if (cmiArray[i]=="_count"){
						isNotAnArray = "true";
					}
					break;
				}
				else{
					teststring = teststring + "." + cmiArray[i];
					// WE NEED TO TRAP THE OBJECTIVES...
					if (teststring=="this.cmi.objectives"){
						return dealWithGettingObjectives(element);
					}
					// WE NEED TO TRAP THE INTERACTIONS...
					if (teststring=="this.cmi.interactions"){
						return dealWithGettingInteractions(element);
					}
				}
			}
        }

		// user tried to call _count on a non-array value
		if (isNotAnArray=="true"){
			this.ServerSco.lastError = "203";
			return "";
		}

		// user tried to call _children on an element that didnt support it
		if (cannotHaveChildren=="true"){
			this.ServerSco.lastError = "202";
			return "";
		}

		// if there was some kind of error found above, then...
		if (invalid == "true"){
			this.ServerSco.lastError = "401";
			return "";
		}
		else{
			// otherwise its a valid model reference...
			elementObj = eval ("this."+element);
		}

   		// next we will check to make sure this element is not writeonly..
		if (elementObj.cmireadStatus == "writeonly"){
			this.ServerSco.lastError = "404";
			return "";
		}
		else{
			// its okay and user can read it...
			this.ServerSco.lastError = "0";
			return elementObj.cmivalue;
		}
	}
	else{
		// not initialized...
		this.ServerSco.lastError = "301";
		return "";
	}
}



/*
* LMSSetValue.  Method to allow sco to write data to CMI datamodel
*/
function LMSSetValueMethod(element, value){
	 value = unescape(value)  ;
     if (this.ServerSco.isInitialized == "true"){
		var invalid = "false";
		var cannotHaveChildren = "false";
		var isNotAnArray = "false";

                // check for sco trying to set _children & _count
                //element is a keyword, cannot set...
                if (element.indexOf("._children") != -1 || element.indexOf("._count") != -1){
                        this.ServerSco.lastError = "402";
                        return "false";
                }

		// this checks to make sure there is at least one dot in the value
                // if it doesnt, then it cant be a valid CMI model reference
		if (element.indexOf(".")== -1){
			invalid = "true";
		}

		// dont bother doing this if we have already found an error...
		if (invalid != "true"){
			// we then loop around the children, making sure they exist one, by one...
			var cmiArray = element.split(".");
			var teststring = "this";
			for(i=0;i<cmiArray.length;i++){
				doesExist = eval(teststring + "." + cmiArray[i]+ ";");
				if(doesExist == null){
					invalid="true";
					// check for invalid _children call
					if (cmiArray[i]=="_children"){
						cannotHaveChildren = "true";
					}
					// check for invalid _count call
					if (cmiArray[i]=="_count"){
						isNotAnArray = "true";
					}
					break;
				}
				else{
					teststring = teststring + "." + cmiArray[i];
					// WE NEED TO TRAP THE OBJECTIVES...
					if (teststring=="this.cmi.objectives"){
						return dealWithSettingObjectives(element, value);
					}
					// WE NEED TO TRAP THE INTERACTIONS...
					if (teststring=="this.cmi.interactions"){
						return dealWithSettingInteractions(element, value);
					}
				}
			}
		}

		// user tried to call _count on a non-array value
		if (isNotAnArray=="true"){
			this.ServerSco.lastError = "203";
			return "false";
		}

		// user tried to call _children on an element that didnt support it
		if (cannotHaveChildren=="true"){
			this.ServerSco.lastError = "202";
			return "false";
		}

		// if there was some kind of error found above, then...
		if (invalid=="true"){
			this.ServerSco.lastError = "401";
			return "false";
		}
		else{
			// otherwise its a valid model reference...
			elementObj = eval ("this."+element);
		}

		// check that its writeable...
		if (elementObj.cmireadStatus == "readonly"){
			this.ServerSco.lastError = "403";
			return "false";
		}
		else{
			// check the datatype and vocabulary...
			var datatype = elementObj.cmidatatype;
			res = this.ServerSco.checkDataTypeAndVocab(element, value, datatype);
				if (res == "true"){
					// correct datatype...
					// cmi.comments need to be appended...
					if (element == "cmi.comments"){
						pre = this.LMSGetValue("cmi.comments");
						setString = "this." + element + ".cmivalue =\"" + pre + value + "\";";
					}
					else{
						setString = "this." + element + ".cmivalue =\"" + value + "\";";
					}
					var result = eval(setString);
					this.ServerSco.lastError = "0";
					return "true";
				}
				else{
					// incorrect data type...
					this.ServerSco.lastError = "405";
					return "false";
			   }
		}
	}
	else{
		// not initialized...
		this.ServerSco.lastError = "301";
		return "false";
	}
}

function LMSGetErrorStringMethod(errorCode){
	switch (errorCode)
 	{
 		case "0":   { return "No error"; break }
        case "101": { return "General exception"; break  }
        case "201": { return "Invalid argument error"; break }
        case "202": { return "Element cannot have children"; break  }
		case "203": { return "Element not an array - Cannot have count"; break  }
		case "301": { return "Not initialized"; break  }
		case "401": { return "Not implemented error"; break  }
		case "402": { return "Invalid set value, element is a keyword"; break  }
		case "403": { return "Element is read only"; break  }
		case "404": { return "Element is write only"; break  }
		case "405": { return "Incorrect Data Type"; break  }
		default:    { return ""; break }
	}
	// just to be safe...
	return;
}

function LMSGetLastErrorMethod(){
	return this.ServerSco.lastError;
}

function LMSGetDiagnosticMethod(errorCode){
	if (errorCode==""){
		errorCode=this.ServerSco.lastError;
	}
	switch (errorCode)
	{
		case "0":   { return "No error. No errors were encountered. Successful API call."; break }
        case "101": { return "General exception. An unexpected error was encountered."; break  }
		case "201": { return "Invalid argument error. A call was made to a DataModel element that does not exist."; break }
		case "202": { return "Element cannot have children. A call was made to an Element that does not support _children"; break  }
		case "203": { return "Element is not an array.  Cannot have count. A call was made to an Element that does not support _count."; break  }
		case "301": { return "Not initialized. The SCO has not yet been initialized.  It needs to call LMSInitialize() first."; break  }
		case "401": { return "Not implemented error.  A call was made to a DataModel element that is not supported."; break  }
		case "402": { return "Invalid set value, element is a keyword.  Keyword values cannot be changed"; break  }
		case "403": { return "Element is read only.  A call was made to set the value of a read-only element."; break  }
		case "404": { return "Element is write only.  A call was made to get the value of a write-only element."; break  }
		case "405": { return "Incorrect Data Type.  The syntax of a call to change an element was incorrect."; break  }
		default:    { return ""; break }
	}
}

/*
* --------------------------------------------------------------------------------------------------
*	Datatype and vocabulary checking
* --------------------------------------------------------------------------------------------------
*/

/*
* Method to check the datatype and vocabulary of an element
* returns true or false...
*/
function scoCheckDataTypeAndVocab (element, value, datatype){
    switch (datatype)
 	{
        case "CMIBlank":   { return checkCMIBlank(value); break }
        case "CMIBoolean": { return checkCMIBoolean(value); break  }
        case "CMIDecimal": { return checkCMIDecimal(value); break }
        case "CMIFeedback": { return  checkCMIFeedback(element, value); break  }
	    case "CMIIdentifier": { return  checkCMIIdentifier(value); break  }
	    case "CMIInteger": { return checkCMIInteger(value); break  }
	    case "CMISInteger": { return checkCMISInteger(element, value); break  }
	    case "CMIString255": { return checkCMIString255(value); break  }
	    case "CMIString4096": { return checkCMIString4096(value); break  }
	    case "CMITime": { return checkCMITime(value); break  }
	    case "CMITimespan": { return checkCMITimespan(value); break  }
	    case "CMIVocabularyCredit": { return checkCMIVocabularyCredit(value); break  }
	    case "CMIVocabularyStatus": { return checkCMIVocabularyStatus(element, value); break  }
	    case "CMIVocabularyEntry": { return checkCMIVocabularyEntry(value); break  }
	    case "CMIVocabularyMode": { return checkCMIVocabularyMode(value); break  }
	    case "CMIVocabularyExit": { return checkCMIVocabularyExit(value); break  }
	    case "CMIVocabularyTimeLimitAction": { return checkCMIVocabularyTimeLimitAction(value); break  }
	    case "CMIVocabularyInteraction": { return checkCMIVocabularyInteraction(value); break  }
	    case "CMIVocabularyResult": { return checkCMIVocabularyResult(value); break  }
        case "CMIDecimalOrCMIBlank": { return checkCMIDecimalOrCMIBlank(value); break  }
	    default:    { return "true"; break }
	}
}

function checkCMIDecimalOrCMIBlank(value){

    var isBlank = checkCMIBlank(value);
    var isCMIDecimal = checkCMIDecimal(value);
    if (isBlank == "true" || isCMIDecimal == "true"){
        if (value > 100 || value < 0){
            return "false";
        }
        else{
            return "true";
        }
    }else{
        return "false";
    }
}

function checkCMIVocabularyResult(value){
    var ans = checkCMIDecimal(value);
    if (ans == "true"){
        return "true";
    }
    if (value == "correct" || value == "wrong" ||
        value == "unanticipated" || value == "neutral"){
        return "true";
    }
    else{
        return "false";
    }
}


function checkCMIVocabularyInteraction(value){
    if (value == "true-false" || value == "choice" ||
        value == "fill-in" || value == "matching" ||
        value == "performance" || value == "likert" ||
        value == "sequencing" || value == "numeric"){
        return "true";
    }
    else{
        return "false";
    }
}

function checkCMIVocabularyTimeLimitAction(value){
    if (value == "exit,message" || value == "exit,no message" ||
        value == "continue,message" || value == "continue,no message"){
        return "true";
    }
    else{
        return "false";
    }
}

function checkCMIVocabularyExit(value){
    if (value == "time-out" || value == "suspend" ||
        value == "logout" || value == ""){
        return "true";
    }
    else{
        return "false";
    }
}

function checkCMIVocabularyMode(value){
    if (value == "normal" || value == "review" || value == "browse"){
        return "true";
    }
    else{
        return "false";
    }
}

function checkCMIVocabularyEntry(value){
    if (value == "ab-initio" || value == "resume" || value == ""){
        return "true";
    }
    else{
        return "false";
    }
}

function checkCMIVocabularyStatus(element, value){
    // sco cannot set lesson_status to not attempted
    if (element == "cmi.core.lesson_status" && value == "not attempted"){
        return false;
    }
    if (value == "passed" || value == "completed" ||
        value == "failed" || value == "incomplete" ||
        value == "browsed" || value == "not attempted"){
        return "true";
    }
    else{
        return "false";
    }
}

function checkCMIVocabularyCredit(value){
    if (value == "credit" || value == "no-credit"){
        return "true";
    }
    else{
        return "false";
    }
}


function checkCMITimespan(value){
   // must have some colons...
   if (value.indexOf(":") == -1){
       return "false";
   }
   // must contain at least 2 colons, giving 3 array elements...
   var cmiArray = value.split(":");
   if (cmiArray.length < 3){
      return "false";
   }
   // hours must be 4,3 or 2 digits...
   if (cmiArray[0].length < 2 || cmiArray[0].length > 4  ){
      return "false";
   }
   // minutes must be 2 digits...
   if (cmiArray[1].length != 2){
      return "false";
   }
   // must be numbers...
   if (isNaN(cmiArray[0]) || isNaN(cmiArray[1]) || isNaN(cmiArray[2])){
      return "false";
   }
   // 24hr clock for hours...
   if (parseInt(cmiArray[0]) < 0){
      return "false";
   }
   // parse minutes
   // NOTE: Seems illegal to have 99 minutes, but ADL 1.2
   // SCORM Conformance Test Suite does this? I'll do the same...
   // if (parseInt(cmiArray[1]) < 0 || parseInt(cmiArray[1]) > 59){
   if (parseInt(cmiArray[1]) < 0){
      return "false";
   }
   // check for decimal place...
   if (cmiArray[2].indexOf(".") != -1){
       var cmiDecArray = cmiArray[2].split(".");
       // can only be 2 values here...
       if (cmiDecArray.length != 2){
           return "false";
       }
       // again they must be numbers...
       if (isNaN(cmiDecArray[0]) || isNaN(cmiDecArray[1])){
           return "false";
       }
       // only two digits allowed for seconds...
       if (cmiDecArray[0].length != 2){
           return "false";
       }
       // make sure there is less than 60 seconds here...
       if (parseInt(cmiDecArray[0]) > 59 ){
          return "false";
       }
       // only one or two digits allowed for milliseconds...
       if (cmiDecArray[1].length > 2){
           return "false";
       }
   }
   else{
       // no dots, so must be no milliseconds...
       // make sure length is 2
       if (cmiArray[2].length != 2){
           return "false";
       }
       // make sure there is less than 60 seconds here...
       if (parseInt(cmiArray[2]) > 59 ){
          return "false";
       }
   }
   // got up to here, then value okay...
   return "true";
}

function checkCMITime(value){

   // must have some colons...
   if (value.indexOf(":") == -1){
       return "false";
   }
   // must contain at least 2 colons, giving 3 array elements...
   var cmiArray = value.split(":");
   if (cmiArray.length < 3){
      return "false";
   }
   // hours & minutes must be 2 digits...
   if (cmiArray[0].length != 2 || cmiArray[1].length != 2){
      return "false";
   }
   // must be numbers...
   if (isNaN(cmiArray[0]) || isNaN(cmiArray[1]) || isNaN(cmiArray[2])){
      return "false";
   }
   // 24hr clock for hours...
   if (parseInt(cmiArray[0]) < 0 || parseInt(cmiArray[0]) > 23){
      return "false";
   }
   // parse minutes
   if (parseInt(cmiArray[1]) < 0 || parseInt(cmiArray[1]) > 59){
      return "false";
   }
   // check for decimal place...
   if (cmiArray[2].indexOf(".") != -1){
       var cmiDecArray = cmiArray[2].split(".");
       // can only be 2 values here...
       if (cmiDecArray.length != 2){
           return "false";
       }
       // again they must be numbers...
       if (isNaN(cmiDecArray[0]) || isNaN(cmiDecArray[1])){
           return "false";
       }
       // only two digits allowed for seconds...
       if (cmiDecArray[0].length != 2){
           return "false";
       }
       // make sure there is less than 60 seconds here...
       if (parseInt(cmiDecArray[0]) > 59 ){
          return "false";
       }
       // only one or two digits allowed for milliseconds...
       if (cmiDecArray[1].length > 2){
           return "false";
       }
   }
   else{
       // no dots, so must be no milliseconds...
       // make sure length is 2
       if (cmiArray[2].length != 2){
           return "false";
       }
       // make sure there is less than 60 seconds here...
       if (parseInt(cmiArray[2]) > 59 ){
          return "false";
       }
   }
   // got up to here, then value okay...
   return "true";
}


function checkCMIString4096(value){
    if (value.length <= 4096){
       return "true";
    }
    else{
       return "false";
    }
}

function checkCMIString255(value){
    if (value.length <= 255){
       return "true";
    }
    else{
       return "false";
    }
}

function checkCMISInteger(element, value){
    if(isNaN(value)){
        return "false";
    }
    else{
        var num = parseInt(value);
        if (num >= -32768 && num <= 32768){
            if (element == "cmi.student_preference.audio"){
                if (num < -1 || num > 100){
                    return "false";
                }
                else{
                    return "true";
                }
            }
            else if (element == "cmi.student_preference.speed"){
                if (num < -100 || num > 100){
                    return "false";
                }
                else{
                    return "true";
                }
            }
            else if (element == "cmi.student_preference.text"){
                if (num < -1 || num > 1){
                    return "false";
                }
                else{
                    return "true";
                }
            }
            else{
                return "true";
            }
        }
        else{
            return "false";
        }
    }
}

function checkCMIInteger(value){
    if(isNaN(value)){
        return "false";
    }
    else{
        var num = parseInt(value);
        if (num >= 0 && num <= 65536){
            return "true";
        }
        else{
            return "false";
        }
    }
}

function checkCMIIdentifier(value){
    var SPACE = ' ';
    var TAB = '\t';
    var CRETURN = '\r';
    var LINEFEED = '\n';
    if (value.indexOf(SPACE) == -1 && value.indexOf(TAB) == -1
     && value.indexOf(CRETURN) == -1 && value.indexOf(LINEFEED) == -1){
        if (value.length > 0 && value.length < 256){
            return "true";
        }
        else{
            return "false";
        }
    }
    else{
        return "false";
    }
}



function checkCMIFeedback(element, value){
    // allow user to edit var at top of page to disable this checking...
    if (looseChecking == "false"){
        // need to find the type (if its set)
        var cmiArray = element.split(".");
	    // need to check cmiArray[2] to see if its a number
	    if (isNaN(cmiArray[2])){
            // this should be a number. However, Err on the side of caution...
            return "false";
	    }
        // make sure that this interaction already exists...
        var res = API.LMSGetValue("cmi.interactions._count");
        if (parseInt(cmiArray[2]) >= parseInt(res)){
            // then this interaction does not exist.. However, Err on the side of caution...
            return "false";
        }
        // Up to here? - then get the type
        var theType = "cmi.interactions.intArray("+cmiArray[2]+").type";
        elementObj = eval("API."+theType+";");
        if (elementObj == null){
            return "false";
        }
        datatype = elementObj.cmivalue;

        if (datatype == null){
            return "false";
        }
        // its not null, so it equals something, so...
        switch (datatype)
        {
            case "true-false":   { return checkTrueFalse(value); break }
            case "choice":   { return checkChoice(value); break }
            case "fill-in":   { return checkFillIn(value); break }
            case "numeric":   { return checkCMIDecimal(value); break }
            case "likert":   { return checkLikert(value); break }
            case "matching":   { return checkMatching(value); break }
            case "performance":   { return checkCMIString255(value); break }
            case "sequencing":   { return checkSequencing(value); break }
            // if its not been set then we should return false.  That would mean
            // that a cmi.interaction.n.type MUST have a value and cannot be empty
            default:   { return "false"; break }
        }
    }
    else{
        return "true";
    }

}

function checkMatching(value){
  // check for n.n
  var TEST_VAL = /^[a-z,A-Z,0-9]{1}.{1}[a-z,A-Z,0-9]{1}$/;
  // check for n.n,n.n,n.n etc
  var TEST_VAL2 = /^[a-z,A-Z,0-9]{1}.{1}[a-z,A-Z,0-9]{1},{1}([a-z,A-Z,0-9]{1}.{1}[a-z,A-Z,0-9]{1},{1})*[a-z,A-Z,0-9]{1}.{1}[a-z,A-Z,0-9]{1}$/;
  // check for {n.n,n.n,n.n etc }
  // Bugfix Mozilla firebird didnt like this line below
  // var TEST_VAL3 = /^{[a-z,A-Z,0-9]{1}.{1}[a-z,A-Z,0-9]{1},{1}([a-z,A-Z,0-9]{1}.{1}[a-z,A-Z,0-9]{1},{1})*[a-z,A-Z,0-9]{1}.{1}[a-z,A-Z,0-9]{1}}$/;
  var TEST_VAL3 = /^[a-z,A-Z,0-9]{1}.{1}[a-z,A-Z,0-9]{1},{1}([a-z,A-Z,0-9]{1}.{1}[a-z,A-Z,0-9]{1},{1})*[a-z,A-Z,0-9]{1}.{1}[a-z,A-Z,0-9]{1}$/;
  if (TEST_VAL.test(value)) {
      return "true";
  }
  else if (TEST_VAL2.test(value)) {
      return "true";
  }
  else if (TEST_VAL3.test(value)) {
      return "true";
  }
  else{
      return "false";
  }
}


function checkSequencing(value){

  // test for single a-z 0-9
  var TEST_VAL = /^[a-z,A-Z,0-9]{1}$/;

  // test for format 1,2,3,a,b,c
  var TEST_VAL2 = /^[a-z,A-Z,0-9]{1},{1}([a-z,A-Z,0-9],)*[a-z,A-Z,0-9]{1}$/;

  if (TEST_VAL.test(value)) {
      return "true";
  }
  else if (TEST_VAL2.test(value)) {
      return "true";
  }
  else{
      return "false";
  }
}

function checkChoice(value){
  // test for single a-z 0-9
  var TEST_VAL = /^[a-z,A-Z,0-9]{1}$/;

  // test for format 1,2,3,a,b,c
  var TEST_VAL2 = /^[a-z,A-Z,0-9]{1},{1}([a-z,A-Z,0-9],)*[a-z,A-Z,0-9]{1}$/;

  // test for format {1,2,3,a,b,c}
  // Bugfix Mozilla firebird didnt like this line below
  //var TEST_VAL3 = /^{[a-z,A-Z,0-9]{1},{1}([a-z,A-Z,0-9],)*[a-z,A-Z,0-9]{1}}$/;
  var TEST_VAL3 = /^[a-z,A-Z,0-9]{1},{1}([a-z,A-Z,0-9],)*[a-z,A-Z,0-9]{1}$/;

  if (TEST_VAL.test(value)) {
      return "true";
  }
  else if (TEST_VAL2.test(value)) {
      return "true";
  }
  else if (TEST_VAL3.test(value)) {
      return "true";
  }
  else{
      return "false";
  }
}


function checkFillIn(value){
    return checkCMIString255(value);
}


function checkTrueFalse(value){
    if (value == "0" || value == "1" || value == "t" || value == "f" || value == "T" || value == "F"){
        return "true";
    }
    else{
        return "false";
    }
}


function checkLikert(value){
  if (value.length == 0){
      return "true";
  }
  if (value.length > 1){
      return "false";
  }
  var TEST_VAL = /^[a-z,A-Z,0-9]{1}$/;
  if (TEST_VAL.test(value)) {
      return "true";
  }
  else{
      return "false";
  }
}


function checkCMIDecimal(value){
   if (isNaN(value)){
        return "false";
   }
   else{
        return "true";
   }
}

function checkCMIBoolean(value){
   if (value == "true" || value == "false"){
        return "true";
   }
   else{
        return "false";
   }
}

function checkCMIBlank(value){
   if (value != ""){
       return "false";
   }
   else{
       return "true";
   }
}


/*
* ----------------------------------------------------------------------------------------------------
*
*	The CMI Client side data models
*
* ----------------------------------------------------------------------------------------------------
*/



function CMIModel (){
	this._version = new CMIComponent("_version", "3.4", "readonly", "");
	this.core = new CMICoreModel;
	this.suspend_data = new CMIComponent("suspend_data", "", "both", "CMIString4096");
	this.launch_data = new CMIComponent("launch_data","","readonly", "CMIString4096");
	this.comments = new CMIComponent("comments","","both", "CMIString4096");
	this.comments_from_lms = new CMIComponent("comments_from_lms","","readonly", "CMIString4096");
	this.objectives = new ObjectivesModel;
	this.student_data = new StudentDataModel;
	this.student_preference = new StudentPreferenceModel;
	this.interactions = new InteractionsModel;
}


function CMICoreModel(){
	this._children = new CMIComponent("_children", "student_id,student_name,lesson_location,credit,lesson_status,entry,score,total_time,lesson_mode,exit,session_time", "readonly", "CMIString255");
	this.student_id = new CMIComponent("student_id", "", "readonly", "CMIIdentifier");
	this.student_name = new CMIComponent("student_name", "", "readonly", "CMIString255");
	this.lesson_location = new CMIComponent("lesson_location", "", "both", "CMIString255");
	this.credit = new CMIComponent("credit", "", "readonly", "CMIVocabularyCredit");
	this.lesson_status = new CMIComponent("lesson_status", "", "both", "CMIVocabularyStatus");
	this.entry = new CMIComponent("entry","","readonly", "CMIVocabularyEntry");
	this.score = new CMIScore;
	this.total_time = new CMIComponent("total_time", "", "readonly", "CMITimespan");
	this.lesson_mode = new CMIComponent("lesson_mode", "", "readonly", "CMIVocabularyMode");
	this.exit = new CMIComponent("exit", "", "writeonly", "CMIVocabularyExit");
	this.session_time = new CMIComponent("session_time", "", "writeonly", "CMITimespan");
}


function CMIScore(){
	this._children = new  CMIComponent("_children", "raw,min,max", "readonly", "CMIString255");
	this.raw = new CMIComponent("raw", "", "both", "CMIDecimalOrCMIBlank");
	this.max = new CMIComponent("max", "", "both", "CMIDecimalOrCMIBlank");
	this.min = new CMIComponent("min", "", "both", "CMIDecimalOrCMIBlank");
}


function StudentPreferenceModel(){
	this._children = new CMIComponent("_children", "audio,language,speed,text", "readonly", "CMIString255");
	this.audio = new CMIComponent("audio", "0", "both", "CMISInteger");
	this.language = new CMIComponent("language", "", "both", "CMIString255");
	this.speed = new CMIComponent("speed", "0", "both", "CMISInteger");
	this.text = new CMIComponent("text", "0", "both", "CMISInteger");
}


function StudentDataModel(){
	this._children = new CMIComponent("_count", "mastery_score,max_time_allowed,time_limit_action", "readonly", "CMIString255");
	this.mastery_score = new CMIComponent("mastery_score", "", "readonly", "CMIDecimal");
	this.max_time_allowed = new CMIComponent("max_time_allowed", "", "readonly", "CMITimespan");
	this.time_limit_action = new CMIComponent("time_limit_action", "", "readonly", "CMIVocabularyTimeLimitAction");
}



/*
*  The CMI objectives model
*/

function ObjectivesModel(){
	this._children = new CMIComponent("_children", "id,score,status", "readonly", "CMIString255");
	this._count = new CMIComponent("_count", 0, "readonly", "CMIInteger");
	this.objArray = ObjectiveArrayModel;
	this.objArr = new Array();
}

function ObjectiveArrayModel(index){
	if(index>this._count.cmivalue-1){
		if (index == this._count.cmivalue){
			// then create new one...
			this.objArr[index] = new singleObjectiveModel();
			this._count.cmivalue = this._count.cmivalue + 1;
			return this.objArr[index];
		}
		else{
			return "false";
		}
	}
	else{
		// we must be talking about this one so return object..
		return this.objArr[index];
	}
}


function singleObjectiveModel(){
	this.id = new CMIComponent("id", "", "both", "CMIIdentifier");
	this.score = new objectiveScoreModel;
	this.status = new CMIComponent("status", "", "both", "CMIVocabularyStatus");
}

function objectiveScoreModel(){
	this._children = new CMIComponent("_children", "raw,min,max", "readonly", "CMIString255");
	this.raw = new CMIComponent("raw", "", "both", "CMIDecimalOrCMIBlank");
	this.min = new CMIComponent("min", "", "both", "CMIDecimalOrCMIBlank");
	this.max = new CMIComponent("max", "", "both", "CMIDecimalOrCMIBlank");
}



/*
*  The CMI interactions model
*/

function InteractionsModel(){
	this._children = new CMIComponent("_children", "id,objectives,time,type,correct_responses,weighting,student_response,result,latency", "readonly", "CMIString255");
	this._count = new CMIComponent("_count", 0, "readonly", "CMIInteger");
	this.intArray = InteractionsArrayModel;
	this.intArr = new Array();
}


function InteractionsArrayModel(index){

	if(index>this._count.cmivalue-1){
		if (index == this._count.cmivalue){
			// then create new one...
			this.intArr[index] = new singleInteractionModel();
			this._count.cmivalue = this._count.cmivalue + 1;
			return this.intArr[index];
		}
		else{
			return "false";
		}
	}
	else{
		// we must be talking about this one so return object..
		return this.intArr[index];
	}
}


function singleInteractionModel(){
	this.id = new CMIComponent("id", "", "writeonly", "CMIIdentifier");
	this.objectives = new ObjectivesInteractionModel;
	this.time = new CMIComponent("time", "", "writeonly", "CMITime");
	this.type = new CMIComponent("type", "", "writeonly", "CMIVocabularyInteraction");
	this.correct_responses = new CorrectResponsesInteractionModel;
	this.weighting = new CMIComponent("weighting", "", "writeonly", "CMIDecimal");
	this.student_response = new CMIComponent("student_response", "", "writeonly", "CMIFeedback");
	this.result = new CMIComponent("result", "", "writeonly", "CMIVocabularyResult");
	this.latency = new CMIComponent("latency", "", "writeonly", "CMITimespan");
}


function ObjectivesInteractionModel(){
	this._count = new CMIComponent("_count", 0, "readonly", "CMIInteger");
	this.objectivesInteractionArray = SingleObjectivesInteractionModel;
	this.objectivesInteractionArr = new Array();
}


function SingleObjectivesInteractionModel(index){
	if(index>this._count.cmivalue-1){
		if (index == this._count.cmivalue){
			// then create new one...
			this.objectivesInteractionArr[index] = new SingleItemObjectivesInteractionModel();
			this._count.cmivalue = this._count.cmivalue + 1;
			return this.objectivesInteractionArr[index];
		}
		else{
			return "false";
		}
	}
	else{
		// we must be talking about this one so return object..
		return this.objectivesInteractionArr[index];
	}
}


function SingleItemObjectivesInteractionModel(){
	this.id = new CMIComponent("id", "", "writeonly", "CMIIdentifier");
}



function CorrectResponsesInteractionModel(){
	this._count = new CMIComponent("_count", 0, "readonly", "CMIInteger");
	this.correctResponsesInteractionArray = SingleCorrectResponsesInteractionModel;
	this.correctResponsesInteractionArr = new Array();
}


function SingleCorrectResponsesInteractionModel(index){
	if(index>this._count.cmivalue-1){
		if (index == this._count.cmivalue){
			// then create new one...
			this.correctResponsesInteractionArr[index] = new SingleItemCorrectResponsesInteractionModel();
			this._count.cmivalue = this._count.cmivalue + 1;
			return this.correctResponsesInteractionArr[index];
		}
		else{
			return "false";
		}
	}
	else{
		// we must be talking about this one so return object..
		return this.correctResponsesInteractionArr[index];
	}
}


function SingleItemCorrectResponsesInteractionModel(){
	this.pattern = new CMIComponent("pattern", "", "writeonly", "CMIFeedback");
}

/*
*
*
*/
function showCurrentModelState(infoOrForm){

	var divider = "";
	var titles = "";
	if (infoOrForm == "info"){
		divider = "\n";
                equals = "=";
		titles = "Current client CMI Datamodel\n\n";
	}
	else{
                equals = "~r@l@ad~";
		divider = "^r@l@ad^";
		titles = "";
	}

	a = "cmi.core.student_id" + equals + API.cmi.core.student_id.cmivalue + divider;
	b = "cmi.core.student_name" + equals + API.cmi.core.student_name.cmivalue + divider;
	c = "cmi.core.lesson_location" + equals + API.cmi.core.lesson_location.cmivalue + divider;
	d = "cmi.core.credit" + equals + API.cmi.core.credit.cmivalue + divider;
	e = "cmi.core.lesson_status" + equals + API.cmi.core.lesson_status.cmivalue + divider;
	f = "cmi.core.entry" + equals + API.cmi.core.entry.cmivalue + divider;
	g = "cmi.core.score.raw" + equals + API.cmi.core.score.raw.cmivalue + divider;
	h = "cmi.core.score.max" + equals + API.cmi.core.score.max.cmivalue + divider;
	i = "cmi.core.score.min" + equals + API.cmi.core.score.min.cmivalue + divider;
	j = "cmi.core.total_time" + equals + API.cmi.core.total_time.cmivalue + divider;
	k = "cmi.core.lesson_mode" + equals + API.cmi.core.lesson_mode.cmivalue + divider;
	l = "cmi.core.exit" + equals + API.cmi.core.exit.cmivalue + divider;
	m = "cmi.core.session_time" + equals + API.cmi.core.session_time.cmivalue + divider;
	n = "cmi.suspend_data" + equals + API.cmi.suspend_data.cmivalue + divider;
	o = "cmi.launch_data" + equals + API.cmi.launch_data.cmivalue + divider;
	p = "cmi.comments" + equals + API.cmi.comments.cmivalue + divider;
	q = "cmi.comments_from_lms" + equals + API.cmi.comments_from_lms.cmivalue + divider;
	r = "cmi.objectives._count" + equals + API.cmi.objectives._count.cmivalue + divider;

	var s = "";
	var objectivesCount = API.cmi.objectives._count.cmivalue;
	for (count=0; count < objectivesCount; count++){
		objHandle = API.cmi.objectives.objArray(count);
		idval = objHandle.id.cmivalue;
		scoreRaw = objHandle.score.raw.cmivalue;
		scoreMax = objHandle.score.max.cmivalue;
		scoreMin = objHandle.score.min.cmivalue;
                statval = objHandle.status.cmivalue;
		s = s + "cmi.objectives." + count + ".id" + equals + idval + divider;
		s = s + "cmi.objectives." + count + ".score.raw" + equals + scoreRaw + divider;
		s = s + "cmi.objectives." + count + ".score.max" + equals + scoreMax + divider;
		s = s + "cmi.objectives." + count + ".score.min" + equals + scoreMin + divider;
                s = s + "cmi.objectives." + count + ".status" + equals + statval + divider;
	}


    v = "cmi.student_data.mastery_score" + equals + API.cmi.student_data.mastery_score.cmivalue + divider;
    w = "cmi.student_data.max_time_allowed" + equals + API.cmi.student_data.max_time_allowed.cmivalue + divider;
    x = "cmi.student_data.time_limit_action" + equals + API.cmi.student_data.time_limit_action.cmivalue + divider;

    y = "cmi.student_preference.audio" + equals + API.cmi.student_preference.audio.cmivalue + divider;
    z = "cmi.student_preference.language" + equals + API.cmi.student_preference.language.cmivalue + divider;
    zz = "cmi.student_preference.speed" + equals + API.cmi.student_preference.speed.cmivalue + divider;
    zzz = "cmi.student_preference.text" + equals + API.cmi.student_preference.text.cmivalue + divider;

	t = "cmi.interactions._count" + equals + API.cmi.interactions._count.cmivalue + divider;

	var u = "";
	var interactionsCount = API.cmi.interactions._count.cmivalue
	for (intcount=0; intcount < interactionsCount; intcount++){
		intHandle = API.cmi.interactions.intArray(intcount);

		idval = intHandle.id.cmivalue;
		u = u + "cmi.interactions." + intcount + ".id" + equals + idval + divider;

		interObjCount = intHandle.objectives._count.cmivalue;
		u = u + "cmi.interactions." + intcount + ".objectives._count" + equals + interObjCount + divider;

		for (objcount=0; objcount < interObjCount; objcount++){
			 interactionObjectiveHandle = intHandle.objectives.objectivesInteractionArray(objcount);
			 objid = interactionObjectiveHandle.id.cmivalue;
			 u = u + "cmi.interactions." + intcount + ".objectives." + objcount + ".id" + equals + objid + divider;
		}

		srCount = intHandle.correct_responses._count.cmivalue;
		u = u + "cmi.interactions." + intcount + ".correct_responses._count" + equals + srCount + divider;

		for (objcount=0; objcount < srCount; objcount++){
			 interactionSRHandle = intHandle.correct_responses.correctResponsesInteractionArray(objcount);
			 patternid = interactionSRHandle.pattern.cmivalue;
			 u = u + "cmi.interactions." + intcount + ".correct_responses." + objcount + ".pattern" + equals + patternid + divider;
		}


		timeval = intHandle.time.cmivalue;
		u = u + "cmi.interactions." + intcount + ".time" + equals + timeval + divider;

		typeval = intHandle.type.cmivalue;
		u = u + "cmi.interactions." + intcount + ".type" + equals + typeval + divider;

		weightingval = intHandle.weighting.cmivalue;
		u = u + "cmi.interactions." + intcount + ".weighting" + equals + weightingval + divider;

		student_responseval = intHandle.student_response.cmivalue;
		u = u + "cmi.interactions." + intcount + ".student_response" + equals + student_responseval + divider;

		resultval = intHandle.result.cmivalue;
		u = u + "cmi.interactions." + intcount + ".result" + equals + resultval + divider;

		latencyval = intHandle.latency.cmivalue;
		u = u + "cmi.interactions." + intcount + ".latency" + equals + latencyval + divider;
	}

	var alertString = titles+a+b+c+d+e+f+g+h+i+j+k+l+m+n+o+p+q+r+s+v+w+x+y+z+zz+zzz+t+u;
	return alertString;

}

/*
* a function used in debug mode to see the current cmi model
*/
function viewModel(){
	return showCurrentModelState("info");
}
