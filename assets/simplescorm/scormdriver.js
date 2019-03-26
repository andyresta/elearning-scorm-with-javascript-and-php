/* Copyright © 2003-2013 Rustici Software, LLC  All Rights Reserved. www.scorm.com */
var VERSION="6.0.0";var PREFERENCE_DEFAULT=0;var PREFERENCE_OFF=-1;var PREFERENCE_ON=1;var LESSON_STATUS_PASSED=1;var LESSON_STATUS_COMPLETED=2;var LESSON_STATUS_FAILED=3;var LESSON_STATUS_INCOMPLETE=4;var LESSON_STATUS_BROWSED=5;var LESSON_STATUS_NOT_ATTEMPTED=6;var ENTRY_REVIEW=1;var ENTRY_FIRST_TIME=2;var ENTRY_RESUME=3;var MODE_NORMAL=1;var MODE_BROWSE=2;var MODE_REVIEW=3;var MAX_CMI_TIME=36002439990;var NO_ERROR=0;var ERROR_LMS=1;var ERROR_INVALID_PREFERENCE=2;var ERROR_INVALID_NUMBER=3;var ERROR_INVALID_ID=4;var ERROR_INVALID_STATUS=5;var ERROR_INVALID_RESPONSE=6;var ERROR_NOT_LOADED=7;var ERROR_INVALID_INTERACTION_RESPONSE=8;var EXIT_TYPE_SUSPEND="SUSPEND";var EXIT_TYPE_FINISH="FINISH";var EXIT_TYPE_TIMEOUT="TIMEOUT";var EXIT_TYPE_UNLOAD="UNLOAD";var INTERACTION_RESULT_CORRECT="CORRECT";var INTERACTION_RESULT_WRONG="WRONG";var INTERACTION_RESULT_UNANTICIPATED="UNANTICIPATED";var INTERACTION_RESULT_NEUTRAL="NEUTRAL";var INTERACTION_TYPE_TRUE_FALSE="true-false";var INTERACTION_TYPE_CHOICE="choice";var INTERACTION_TYPE_FILL_IN="fill-in";var INTERACTION_TYPE_LONG_FILL_IN="long-fill-in";var INTERACTION_TYPE_MATCHING="matching";var INTERACTION_TYPE_PERFORMANCE="performance";var INTERACTION_TYPE_SEQUENCING="sequencing";var INTERACTION_TYPE_LIKERT="likert";var INTERACTION_TYPE_NUMERIC="numeric";var DATA_CHUNK_PAIR_SEPARATOR='###';var DATA_CHUNK_VALUE_SEPARATOR='$$';var APPID="";var CLOUDURL="__CLOUDURL__";var blnDebug=false;var strLMSStandard='SCORM';var DEFAULT_EXIT_TYPE=EXIT_TYPE_SUSPEND;var AICC_LESSON_ID="1";var EXIT_BEHAVIOR="SCORM_RECOMMENDED";var EXIT_TARGET="goodbye.html";var LMS_SPECIFIED_REDIRECT_EVAL_STATEMENT="";var AICC_COMM_DISABLE_XMLHTTP=false;var AICC_COMM_DISABLE_IFRAME=false;var AICC_COMM_PREPEND_HTTP_IF_MISSING=true;var AICC_REPORT_MIN_MAX_SCORE=true;var SHOW_DEBUG_ON_LAUNCH=false;var DO_NOT_REPORT_INTERACTIONS=false;var SCORE_CAN_ONLY_IMPROVE=false;var REVIEW_MODE_IS_READ_ONLY=false;var AICC_RE_CHECK_LOADED_INTERVAL=250;var AICC_RE_CHECK_ATTEMPTS_BEFORE_TIMEOUT=240;var USE_AICC_KILL_TIME=true;var AICC_ENTRY_FLAG_DEFAULT=ENTRY_REVIEW;var AICC_USE_CUSTOM_COMMS=false;var FORCED_COMMIT_TIME="0";var ALLOW_NONE_STANDARD=true;var USE_2004_SUSPENDALL_NAVREQ=false;var USE_STRICT_SUSPEND_DATA_LIMITS=false;var EXIT_SUSPEND_IF_COMPLETED=false;var EXIT_NORMAL_IF_PASSED=false;var AICC_ENCODE_PARAMETER_VALUES=true;function GetQueryStringValue(strElement,strQueryString){var aryPairs;var foundValue;strQueryString=strQueryString.substring(1);aryPairs=strQueryString.split("&");foundValue=SearchQueryStringPairs(aryPairs,strElement);if(foundValue===null){aryPairs=strQueryString.split(/[\?\&]/);foundValue=SearchQueryStringPairs(aryPairs,strElement);}
if(foundValue===null){WriteToDebug("GetQueryStringValue Element '"+strElement+"' Not Found, Returning: empty string");return"";}
else{WriteToDebug("GetQueryStringValue for '"+strElement+"' Returning: "+foundValue);return foundValue;}}
function SearchQueryStringPairs(aryPairs,strElement){var i;var intEqualPos;var strArg="";var strValue="";strElement=strElement.toLowerCase();for(i=0;i<aryPairs.length;i++){intEqualPos=aryPairs[i].indexOf('=');if(intEqualPos!=-1){strArg=aryPairs[i].substring(0,intEqualPos);if(EqualsIgnoreCase(strArg,strElement)){strValue=aryPairs[i].substring(intEqualPos+1);strValue=new String(strValue)
strValue=strValue.replace(/\+/g,"%20")
strValue=unescape(strValue);return new String(strValue);}}}
return null;}
function ConvertStringToBoolean(str){var intTemp;if(EqualsIgnoreCase(str,"true")||EqualsIgnoreCase(str,"t")||str.toLowerCase().indexOf("t")==0){return true;}
else{intTemp=parseInt(str,10);if(intTemp==1||intTemp==-1){return true;}
else{return false;}}}
function EqualsIgnoreCase(str1,str2){var blnReturn;str1=new String(str1);str2=new String(str2);blnReturn=(str1.toLowerCase()==str2.toLowerCase())
return blnReturn;}
function ValidInteger(intNum){WriteToDebug("In ValidInteger intNum="+intNum);var str=new String(intNum);if(str.indexOf("-",0)==0){str=str.substring(1,str.length-1);}
var regValidChars=new RegExp("[^0-9]");if(str.search(regValidChars)==-1){WriteToDebug("Returning true");return true;}
WriteToDebug("Returning false");return false;}
function ConvertDateToIso8601TimeStamp(dtm){var strTimeStamp;dtm=new Date(dtm);var Year=dtm.getFullYear();var Month=dtm.getMonth()+1;var Day=dtm.getDate();var Hour=dtm.getHours();var Minute=dtm.getMinutes();var Second=dtm.getSeconds();Month=ZeroPad(Month,2);Day=ZeroPad(Day,2);Hour=ZeroPad(Hour,2);Minute=ZeroPad(Minute,2);Second=ZeroPad(Second,2);strTimeStamp=Year+"-"+Month+"-"+Day+"T"+Hour+":"+Minute+":"+Second;var tzoffset=-(dtm.getTimezoneOffset()/60);if(tzoffset!=0){strTimeStamp+='.0';if(tzoffset>0){if((''+tzoffset).indexOf('.')!=-1){var fraction='0'+(''+tzoffset).substr((''+tzoffset).indexOf('.'),(''+tzoffset).length);var base=(''+tzoffset).substr(0,(''+tzoffset).indexOf('.'));fraction=(fraction*60);strTimeStamp+='+'+ZeroPad(base+'.'+fraction,2);}else{strTimeStamp+='+'+ZeroPad(tzoffset,2);}}else{strTimeStamp+=ZeroPad(tzoffset,2);}}
return strTimeStamp;}
function ConvertIso8601TimeStampToDate(strTimeStamp){strTimeStamp=new String(strTimeStamp);var ary=new Array();ary=strTimeStamp.split(/[\:T+-]/);var Year=ary[0];var Month=ary[1]-1;var Day=ary[2];var Hour=ary[3];var Minute=ary[4];var Second=ary[5];return new Date(Year,Month,Day,Hour,Minute,Second,0);}
function ConvertDateToCMIDate(dtmDate){WriteToDebug("In ConvertDateToCMIDate");var strYear;var strMonth;var strDay;var strReturn;dtmDate=new Date(dtmDate);strYear=dtmDate.getFullYear()
strMonth=(dtmDate.getMonth()+1);strDay=dtmDate.getDate();strReturn=ZeroPad(strYear,4)+"/"+ZeroPad(strMonth,2)+"/"+ZeroPad(strDay,2);return strReturn;}
function ConvertDateToCMITime(dtmDate){var strHours;var strMinutes;var strSeconds;var strReturn;dtmDate=new Date(dtmDate);strHours=dtmDate.getHours();strMinutes=dtmDate.getMinutes();strSeconds=dtmDate.getSeconds();strReturn=ZeroPad(strHours,2)+":"+ZeroPad(strMinutes,2)+":"+ZeroPad(strSeconds,2);return strReturn;}
function ConvertCMITimeSpanToMS(strTime){WriteToDebug("In ConvertCMITimeSpanToMS, strTime="+strTime);var aryParts;var intHours;var intMinutes;var intSeconds;var intTotalMilliSeconds;aryParts=strTime.split(":");if(!IsValidCMITimeSpan(strTime)){WriteToDebug("ERROR - Invalid TimeSpan");SetErrorInfo(SCORM_ERROR_GENERAL,"LMS ERROR - Invalid time span passed to ConvertCMITimeSpanToMS, please contact technical support");return 0;}
intHours=aryParts[0];intMinutes=aryParts[1];intSeconds=aryParts[2];WriteToDebug("intHours="+intHours+" intMinutes="+intMinutes+" intSeconds="+intSeconds);intTotalMilliSeconds=(intHours*3600000)+(intMinutes*60000)+(intSeconds*1000);intTotalMilliSeconds=Math.round(intTotalMilliSeconds);WriteToDebug("Returning "+intTotalMilliSeconds);return intTotalMilliSeconds;}
function ConvertScorm2004TimeToMS(strIso8601Time){WriteToDebug("In ConvertScorm2004TimeToMS, strIso8601Time="+strIso8601Time);var intTotalMs=0;var strNumberBuilder;var strCurrentCharacter;var blnInTimeSection;var Seconds=0;var Minutes=0;var Hours=0;var Days=0;var Months=0;var Years=0;var MILLISECONDS_PER_SECOND=1000;var MILLISECONDS_PER_MINUTE=MILLISECONDS_PER_SECOND*60;var MILLISECONDS_PER_HOUR=MILLISECONDS_PER_MINUTE*60;var MILLISECONDS_PER_DAY=MILLISECONDS_PER_HOUR*24;var MILLISECONDS_PER_MONTH=MILLISECONDS_PER_DAY*(((365*4)+1)/48);var MILLISECONDS_PER_YEAR=MILLISECONDS_PER_MONTH*12;strIso8601Time=new String(strIso8601Time);strNumberBuilder="";strCurrentCharacter="";blnInTimeSection=false;for(var i=1;i<strIso8601Time.length;i++){strCurrentCharacter=strIso8601Time.charAt(i);if(IsIso8601SectionDelimiter(strCurrentCharacter)){switch(strCurrentCharacter.toUpperCase()){case"Y":Years=parseInt(strNumberBuilder,10);break;case"M":if(blnInTimeSection){Minutes=parseInt(strNumberBuilder,10);}
else{Months=parseInt(strNumberBuilder,10);}
break;case"D":Days=parseInt(strNumberBuilder,10);break;case"H":Hours=parseInt(strNumberBuilder,10);break;case"S":Seconds=parseFloat(strNumberBuilder);break;case"T":blnInTimeSection=true;break;}
strNumberBuilder="";}
else{strNumberBuilder+=""+strCurrentCharacter;}}
WriteToDebug("Years="+Years+"\n"+"Months="+Months+"\n"+"Days="+Days+"\n"+"Hours="+Hours+"\n"+"Minutes="+Minutes+"\n"+"Seconds="+Seconds+"\n");intTotalMs=(Years*MILLISECONDS_PER_YEAR)+
(Months*MILLISECONDS_PER_MONTH)+
(Days*MILLISECONDS_PER_DAY)+
(Hours*MILLISECONDS_PER_HOUR)+
(Minutes*MILLISECONDS_PER_MINUTE)+
(Seconds*MILLISECONDS_PER_SECOND);intTotalMs=Math.round(intTotalMs);WriteToDebug("returning-"+intTotalMs);return intTotalMs;}
function IsIso8601SectionDelimiter(str){if(str.search(/[PYMDTHS]/)>=0){return true;}
else{return false;}}
function IsValidCMITimeSpan(strValue){WriteToDebug("In IsValidCMITimeSpan strValue="+strValue);var regValid=/^\d?\d?\d?\d:\d?\d:\d?\d(.\d\d?)?$/;if(strValue.search(regValid)>-1){WriteToDebug("Returning True");return true;}
else{WriteToDebug("Returning False");return false;}}
function IsValidIso8601TimeSpan(strValue){WriteToDebug("In IsValidIso8601TimeSpan strValue="+strValue);var regValid=/^P(\d+Y)?(\d+M)?(\d+D)?(T(\d+H)?(\d+M)?(\d+(.\d\d?)?S)?)?$/;if(strValue.search(regValid)>-1){WriteToDebug("Returning True");return true;}
else{WriteToDebug("Returning False");return false;}}
function ConvertMilliSecondsToTCAPITime(intTotalMilliseconds,blnIncludeFraction){var intHours;var intMinutes;var intSeconds;var intMilliseconds;var intHundredths;var strCMITimeSpan;WriteToDebug("In ConvertMilliSecondsToTCAPITime, intTotalMilliseconds = "+intTotalMilliseconds+", blnIncludeFraction = "+blnIncludeFraction);if(blnIncludeFraction==null||blnIncludeFraction==undefined){blnIncludeFraction=true;}
intMilliseconds=intTotalMilliseconds%1000;intSeconds=((intTotalMilliseconds-intMilliseconds)/1000)%60;intMinutes=((intTotalMilliseconds-intMilliseconds-(intSeconds*1000))/60000)%60;intHours=(intTotalMilliseconds-intMilliseconds-(intSeconds*1000)-(intMinutes*60000))/3600000;WriteToDebug("Separated Parts, intHours="+intHours+", intMinutes="+intMinutes+", intSeconds="+intSeconds+", intMilliseconds="+intMilliseconds);if(intHours==10000)
{WriteToDebug("Max intHours detected");intHours=9999;intMinutes=(intTotalMilliseconds-(intHours*3600000))/60000;if(intMinutes==100)
{intMinutes=99;}
intMinutes=Math.floor(intMinutes);intSeconds=(intTotalMilliseconds-(intHours*3600000)-(intMinutes*60000))/1000;if(intSeconds==100)
{intSeconds=99;}
intSeconds=Math.floor(intSeconds);intMilliseconds=(intTotalMilliseconds-(intHours*3600000)-(intMinutes*60000)-(intSeconds*1000));WriteToDebug("Separated Parts, intHours="+intHours+", intMinutes="+intMinutes+", intSeconds="+intSeconds+", intMilliseconds="+intMilliseconds);}
intHundredths=Math.floor(intMilliseconds/10);strCMITimeSpan=ZeroPad(intHours,4)+":"+ZeroPad(intMinutes,2)+":"+ZeroPad(intSeconds,2);if(blnIncludeFraction){strCMITimeSpan+="."+intHundredths;}
WriteToDebug("strCMITimeSpan="+strCMITimeSpan);if(intHours>9999)
{strCMITimeSpan="9999:99:99";if(blnIncludeFraction){strCMITimeSpan+=".99";}}
WriteToDebug("returning "+strCMITimeSpan);return strCMITimeSpan;}
function ConvertMilliSecondsToSCORMTime(intTotalMilliseconds,blnIncludeFraction){var intHours;var intMinutes;var intSeconds;var intMilliseconds;var intHundredths;var strCMITimeSpan;WriteToDebug("In ConvertMilliSecondsToSCORMTime, intTotalMilliseconds = "+intTotalMilliseconds+", blnIncludeFraction = "+blnIncludeFraction);if(blnIncludeFraction==null||blnIncludeFraction==undefined){blnIncludeFraction=true;}
intMilliseconds=intTotalMilliseconds%1000;intSeconds=((intTotalMilliseconds-intMilliseconds)/1000)%60;intMinutes=((intTotalMilliseconds-intMilliseconds-(intSeconds*1000))/60000)%60;intHours=(intTotalMilliseconds-intMilliseconds-(intSeconds*1000)-(intMinutes*60000))/3600000;WriteToDebug("Separated Parts, intHours="+intHours+", intMinutes="+intMinutes+", intSeconds="+intSeconds+", intMilliseconds="+intMilliseconds);if(intHours==10000)
{WriteToDebug("Max intHours detected");intHours=9999;intMinutes=(intTotalMilliseconds-(intHours*3600000))/60000;if(intMinutes==100)
{intMinutes=99;}
intMinutes=Math.floor(intMinutes);intSeconds=(intTotalMilliseconds-(intHours*3600000)-(intMinutes*60000))/1000;if(intSeconds==100)
{intSeconds=99;}
intSeconds=Math.floor(intSeconds);intMilliseconds=(intTotalMilliseconds-(intHours*3600000)-(intMinutes*60000)-(intSeconds*1000));WriteToDebug("Separated Parts, intHours="+intHours+", intMinutes="+intMinutes+", intSeconds="+intSeconds+", intMilliseconds="+intMilliseconds);}
intHundredths=Math.floor(intMilliseconds/10);strCMITimeSpan=ZeroPad(intHours,4)+":"+ZeroPad(intMinutes,2)+":"+ZeroPad(intSeconds,2);if(blnIncludeFraction){strCMITimeSpan+="."+intHundredths;}
WriteToDebug("strCMITimeSpan="+strCMITimeSpan);if(intHours>9999)
{strCMITimeSpan="9999:99:99";if(blnIncludeFraction){strCMITimeSpan+=".99";}}
WriteToDebug("returning "+strCMITimeSpan);return strCMITimeSpan;}
function ConvertMilliSecondsIntoSCORM2004Time(intTotalMilliseconds){WriteToDebug("In ConvertMilliSecondsIntoSCORM2004Time intTotalMilliseconds="+intTotalMilliseconds);var ScormTime="";var HundredthsOfASecond;var Seconds;var Minutes;var Hours;var Days;var Months;var Years;var HUNDREDTHS_PER_SECOND=100;var HUNDREDTHS_PER_MINUTE=HUNDREDTHS_PER_SECOND*60;var HUNDREDTHS_PER_HOUR=HUNDREDTHS_PER_MINUTE*60;var HUNDREDTHS_PER_DAY=HUNDREDTHS_PER_HOUR*24;var HUNDREDTHS_PER_MONTH=HUNDREDTHS_PER_DAY*(((365*4)+1)/48);var HUNDREDTHS_PER_YEAR=HUNDREDTHS_PER_MONTH*12;HundredthsOfASecond=Math.floor(intTotalMilliseconds/10);Years=Math.floor(HundredthsOfASecond/HUNDREDTHS_PER_YEAR);HundredthsOfASecond-=(Years*HUNDREDTHS_PER_YEAR);Months=Math.floor(HundredthsOfASecond/HUNDREDTHS_PER_MONTH);HundredthsOfASecond-=(Months*HUNDREDTHS_PER_MONTH);Days=Math.floor(HundredthsOfASecond/HUNDREDTHS_PER_DAY);HundredthsOfASecond-=(Days*HUNDREDTHS_PER_DAY);Hours=Math.floor(HundredthsOfASecond/HUNDREDTHS_PER_HOUR);HundredthsOfASecond-=(Hours*HUNDREDTHS_PER_HOUR);Minutes=Math.floor(HundredthsOfASecond/HUNDREDTHS_PER_MINUTE);HundredthsOfASecond-=(Minutes*HUNDREDTHS_PER_MINUTE);Seconds=Math.floor(HundredthsOfASecond/HUNDREDTHS_PER_SECOND);HundredthsOfASecond-=(Seconds*HUNDREDTHS_PER_SECOND);if(Years>0){ScormTime+=Years+"Y";}
if(Months>0){ScormTime+=Months+"M";}
if(Days>0){ScormTime+=Days+"D";}
if((HundredthsOfASecond+Seconds+Minutes+Hours)>0){ScormTime+="T";if(Hours>0){ScormTime+=Hours+"H";}
if(Minutes>0){ScormTime+=Minutes+"M";}
if((HundredthsOfASecond+Seconds)>0){ScormTime+=Seconds;if(HundredthsOfASecond>0){ScormTime+="."+HundredthsOfASecond;}
ScormTime+="S";}}
if(ScormTime==""){ScormTime="T0S";}
ScormTime="P"+ScormTime;WriteToDebug("Returning-"+ScormTime);return ScormTime;}
function ZeroPad(intNum,intNumDigits){WriteToDebug("In ZeroPad intNum="+intNum+" intNumDigits="+intNumDigits);var strTemp;var intLen;var decimalToPad;var i;var isNeg=false;strTemp=new String(intNum);if(strTemp.indexOf('-')!=-1){isNeg=true;strTemp=strTemp.substr(1,strTemp.length);}
if(strTemp.indexOf('.')!=-1){strTemp.replace('.','');decimalToPad=strTemp.substr(strTemp.indexOf('.')+1,strTemp.length);strTemp=strTemp.substr(0,strTemp.indexOf('.'));}
intLen=strTemp.length;if(intLen>intNumDigits){WriteToDebug("Length of string is greater than num digits, trimming string");strTemp=strTemp.substr(0,intNumDigits);}
else{for(i=intLen;i<intNumDigits;i++){strTemp="0"+strTemp;}}
if(isNeg==true){strTemp='-'+strTemp;}
if(decimalToPad!=null&&decimalToPad!=''){if(decimalToPad.length==1){strTemp+=':'+decimalToPad+'0';}else{strTemp+=':'+decimalToPad;}}
WriteToDebug("Returning - "+strTemp);return strTemp;}
function IsValidDecimal(strValue){WriteToDebug("In IsValidDecimal, strValue="+strValue);strValue=new String(strValue);if(strValue.search(/[^.\d-]/)>-1){WriteToDebug("Returning False - character other than a digit, dash or period found");return false;}
if(strValue.search("-")>-1){if(strValue.indexOf("-",1)>-1){WriteToDebug("Returning False - dash found in the middle of the string");return false;}}
if(strValue.indexOf(".")!=strValue.lastIndexOf(".")){WriteToDebug("Returning False - more than one decimal point found");return false;}
if(strValue.search(/\d/)<0){WriteToDebug("Returning False - no digits found");return false;}
WriteToDebug("Returning True");return true;}
function IsAlphaNumeric(strValue){WriteToDebug("In IsAlphaNumeric");if(strValue.search(/\w/)<0){WriteToDebug("Returning false");return false;}
else{WriteToDebug("Returning true");return true;}}
function ReverseNameSequence(strName)
{var strFirstName;var strLastName;var intCommaLoc;if(strName=="")strName="Not Found, Learner Name";intCommaLoc=strName.indexOf(",");strFirstName=strName.slice(intCommaLoc+1);strLastName=strName.slice(0,intCommaLoc);strFirstName=Trim(strFirstName);strLastName=Trim(strLastName);return strFirstName+' '+strLastName;}
function LTrim(str){str=new String(str);return(str.replace(/^\s+/,''));}
function RTrim(str){str=new String(str);return(str.replace(/\s+$/,''));}
function Trim(strToTrim){var str=LTrim(RTrim(strToTrim));return(str.replace(/\s{2,}/g," "));}
function GetValueFromDataChunk(strID)
{var strChunk=new String(GetDataChunk());var aryPairs=new Array();var aryValues=new Array();var i;aryPairs=strChunk.split(parent.DATA_CHUNK_PAIR_SEPARATOR);for(i=0;i<aryPairs.length;i++)
{aryValues=aryPairs[i].split(parent.DATA_CHUNK_VALUE_SEPARATOR);if(aryValues[0]==strID)return aryValues[1];}
return'';}
function SetDataChunkValue(strID,strValue)
{var strChunk=new String(GetDataChunk());var aryPairs=new Array();var aryValues=new Array();var i;var blnFound=new Boolean(false);aryPairs=strChunk.split(parent.DATA_CHUNK_PAIR_SEPARATOR);for(i=0;i<aryPairs.length;i++)
{aryValues=aryPairs[i].split(parent.DATA_CHUNK_VALUE_SEPARATOR);if(aryValues[0]==strID)
{aryValues[1]=strValue;blnFound=true;aryPairs[i]=aryValues[0]+parent.DATA_CHUNK_VALUE_SEPARATOR+aryValues[1];}}
if(blnFound==true)
{strChunk=aryPairs.join(parent.DATA_CHUNK_PAIR_SEPARATOR);}
else
{if(strChunk=='')
{strChunk=strID+parent.DATA_CHUNK_VALUE_SEPARATOR+strValue;}
else
{strChunk+=parent.DATA_CHUNK_PAIR_SEPARATOR+strID+parent.DATA_CHUNK_VALUE_SEPARATOR+strValue;}}
SetDataChunk(strChunk);return true;}
function GetLastDirAndPageName(str)
{var page=new String(str);var LastSlashLocation=page.lastIndexOf("/");var SecondLastSlashLocation=page.lastIndexOf("/",LastSlashLocation-1);return page.substr(SecondLastSlashLocation+1);}
function RoundToPrecision(number,significantDigits){number=parseFloat(number);return(Math.round(number*Math.pow(10,significantDigits))/Math.pow(10,significantDigits))}
function IsAbsoluteUrl(urlStr){return urlStr!=null&&(urlStr.indexOf("http://")==0||urlStr.indexOf("https://")==0)}
function TouchCloud(){if(APPID!=null&&APPID!=""&&APPID!="__APPID__"&&CLOUDURL!==null&&CLOUDURL.indexOf("http")===0){var cloudForm=document.createElement("form");cloudForm.name="cloudform";cloudForm.id="cloudform";cloudForm.style="display:none;";document.body.appendChild(cloudForm);var elAppId=document.createElement("input");elAppId.name="appId";elAppId.value=APPID;elAppId.type="hidden";cloudForm.appendChild(elAppId);var elUrl=document.createElement("input");elUrl.name="servingUrl";elUrl.type="hidden";elUrl.value=document.location.href;cloudForm.appendChild(elUrl);var elVersion=document.createElement("input");elVersion.name="version";elVersion.type="hidden";elVersion.value=VERSION;cloudForm.appendChild(elVersion);cloudForm.target="rusticisoftware_aicc_results";cloudForm.action=CLOUDURL;document.getElementById('cloudform').submit();return true;}else{return false;}}
function IsNumeric(n){return!isNaN(parseFloat(n))&&isFinite(n);}
function loadScript(url,callback){var head=document.getElementsByTagName('head')[0],script=document.createElement('script');script.type='text/javascript';script.src=url;if(!script.addEventListener||(document.documentMode&&document.documentMode<9)){script.onreadystatechange=function(){if(/loaded|complete/.test(script.readyState)){script.onreadystatechange=null;callback();}};}
else{script.addEventListener("load",callback,false);}
head.appendChild(script);}
var STANDARD='SCORM2004';var SCORM2004_LOGOUT="logout";var SCORM2004_SUSPEND="suspend";var SCORM2004_NORMAL_EXIT="normal";var SCORM2004_TIMEOUT="time-out";var SCORM2004_PASSED="passed";var SCORM2004_FAILED="failed";var SCORM2004_UNKNOWN="unknown";var SCORM2004_COMPLETED="completed";var SCORM2004_INCOMPLETE="incomplete";var SCORM2004_NOT_ATTEMPTED="not attempted";var SCORM2004_CREDIT="credit";var SCORM2004_NO_CREDIT="no-credit";var SCORM2004_BROWSE="browse";var SCORM2004_NORMAL="normal";var SCORM2004_REVIEW="review";var SCORM2004_ENTRY_ABINITIO="ab-initio";var SCORM2004_ENTRY_RESUME="resume";var SCORM2004_ENTRY_NORMAL="";var SCORM2004_TLA_EXIT_MESSAGE="exit,message";var SCORM2004_TLA_EXIT_NO_MESSAGE="exit,no message";var SCORM2004_TLA_CONTINUE_MESSAGE="continue,message";var SCORM2004_TLA_CONTINUE_NO_MESSAGE="continue,no message";var SCORM2004_RESULT_CORRECT="correct";var SCORM2004_RESULT_WRONG="incorrect";var SCORM2004_RESULT_UNANTICIPATED="unanticipated";var SCORM2004_RESULT_NEUTRAL="neutral";var SCORM2004_INTERACTION_TYPE_TRUE_FALSE="true-false";var SCORM2004_INTERACTION_TYPE_CHOICE="choice";var SCORM2004_INTERACTION_TYPE_FILL_IN="fill-in";var SCORM2004_INTERACTION_TYPE_LONG_FILL_IN="long-fill-in";var SCORM2004_INTERACTION_TYPE_MATCHING="matching";var SCORM2004_INTERACTION_TYPE_PERFORMANCE="performance";var SCORM2004_INTERACTION_TYPE_SEQUENCING="sequencing";var SCORM2004_INTERACTION_TYPE_LIKERT="likert";var SCORM2004_INTERACTION_TYPE_NUMERIC="numeric";var SCORM2004_NO_ERROR="0";var SCORM2004_ERROR_INVALID_PREFERENCE="-1";var SCORM2004_ERROR_INVALID_STATUS="-2";var SCORM2004_ERROR_INVALID_SPEED="-3";var SCORM2004_ERROR_INVALID_TIMESPAN="-4";var SCORM2004_ERROR_INVALID_TIME_LIMIT_ACTION="-5";var SCORM2004_ERROR_INVALID_DECIMAL="-6";var SCORM2004_ERROR_INVALID_CREDIT="-7";var SCORM2004_ERROR_INVALID_LESSON_MODE="-8";var SCORM2004_ERROR_INVALID_ENTRY="-9";var SCORM2004_TRUE="true";var SCORM2004_FALSE="false";var SCORM2004_EARLIEST_DATE=new Date("1/1/1900");var intSCORM2004Error=SCORM2004_NO_ERROR;var strSCORM2004ErrorString="";var strSCORM2004ErrorDiagnostic="";var SCORM2004_objAPI=null;var blnReviewModeSoReadOnly=false;var blnSCORM2004_SSP_Is_Supported=null;function SCORM2004_Initialize(){WriteToDebug("In SCORM2004_Initialize");var blnResult=true;SCORM2004_ClearErrorInfo();WriteToDebug("Grabbing API");try{SCORM2004_objAPI=SCORM2004_GrabAPI();}
catch(e){WriteToDebug("Error grabbing 1.2 API-"+e.name+":"+e.message);}
if(typeof(SCORM2004_objAPI)=="undefined"||SCORM2004_objAPI==null){WriteToDebug("Unable to acquire SCORM API:")
WriteToDebug("SCORM2004_objAPI="+typeof(SCORM2004_objAPI));InitializeExecuted(false,"Error - unable to acquire LMS API, content may not play properly and results may not be recorded.  Please contact technical support.");return false;}
WriteToDebug("Calling LMSInit");blnResult=SCORM2004_CallInitialize();if(!blnResult){WriteToDebug("ERROR Initializing LMS");InitializeExecuted(false,"Error initializing communications with LMS");return false;}
if(SCORM2004_GetStatus()==LESSON_STATUS_NOT_ATTEMPTED){WriteToDebug("Setting Status to Incomplete");blnResult=SCORM2004_CallSetValue("cmi.completion_status",SCORM2004_INCOMPLETE);}
blnResult=SCORM2004_CallSetValue("cmi.exit",SCORM2004_TranslateExitTypeToSCORM(DEFAULT_EXIT_TYPE))&&blnResult;if(SCORM2004_GetLessonMode()==MODE_REVIEW){if(!(typeof(REVIEW_MODE_IS_READ_ONLY)=="undefined")&&REVIEW_MODE_IS_READ_ONLY===true){blnReviewModeSoReadOnly=true;}}
WriteToDebug("Calling InitializeExecuted with parameter-"+blnResult);InitializeExecuted(blnResult,"");return;}
function SCORM2004_Finish(strExitType,blnStatusWasSet){WriteToDebug("In SCORM2004_Finish strExitType="+strExitType+", blnStatusWasSet="+blnStatusWasSet);var strStatusAfterCompletion;var blnResult=true;SCORM2004_ClearErrorInfo();if((strExitType==EXIT_TYPE_FINISH)&&!blnStatusWasSet){WriteToDebug("Getting completion status");strStatusAfterCompletion=SCORM2004_GetCompletionStatus();WriteToDebug("Setting completion status to "+strStatusAfterCompletion);blnResult=SCORM2004_CallSetValue("cmi.completion_status",strStatusAfterCompletion)&&blnResult;}
if(strExitType==EXIT_TYPE_SUSPEND&&USE_2004_SUSPENDALL_NAVREQ){WriteToDebug("Setting adl.nav.request to suspendAll");blnResult=SCORM2004_CallSetValue("adl.nav.request","suspendAll");}
WriteToDebug("Setting Exit");blnResult=SCORM2004_CallSetValue("cmi.exit",SCORM2004_TranslateExitTypeToSCORM(strExitType))&&blnResult;WriteToDebug("Calling Commit");blnResult=SCORM2004_CallCommit()&&blnResult;WriteToDebug("Calling Finish");blnResult=SCORM2004_CallTerminate()&&blnResult;WriteToDebug("Returning "+blnResult);return blnResult;}
function SCORM2004_CommitData(){WriteToDebug("In SCORM2004_CommitData");SCORM2004_ClearErrorInfo();return SCORM2004_CallCommit();}
function SCORM2004_GetStudentID(){WriteToDebug("In SCORM2004_GetStudentID");SCORM2004_ClearErrorInfo();return SCORM2004_CallGetValue("cmi.learner_id");}
function SCORM2004_GetStudentName(){WriteToDebug("In SCORM2004_GetStudentName");SCORM2004_ClearErrorInfo();return SCORM2004_CallGetValue("cmi.learner_name");}
function SCORM2004_GetBookmark(){WriteToDebug("In SCORM2004_GetBookmark");SCORM2004_ClearErrorInfo();return SCORM2004_CallGetValue("cmi.location");}
function SCORM2004_SetBookmark(strBookmark){WriteToDebug("In SCORM2004_SetBookmark strBookmark="+strBookmark);SCORM2004_ClearErrorInfo();return SCORM2004_CallSetValue("cmi.location",strBookmark);}
function SCORM2004_GetDataChunk(){WriteToDebug("In SCORM2004_GetDataChunk");SCORM2004_ClearErrorInfo();return SCORM2004_CallGetValue("cmi.suspend_data");}
function SCORM2004_SetDataChunk(strData){WriteToDebug("In SCORM2004_SetDataChunk");SCORM2004_ClearErrorInfo();if(USE_STRICT_SUSPEND_DATA_LIMITS==true){if(strData.length>4000){WriteToDebug("SCORM2004_SetDataChunk - suspend_data too large for SCORM 2004 2nd ed (4000 character limit) but will try to persist anyway.");if(strData.length>64000){WriteToDebug("SCORM2004_SetDataChunk - suspend_data too large for SCORM 2004 3rd & 4th ed (64000 character limit) so failing to persist.");return false;}else{return SCORM2004_CallSetValue("cmi.suspend_data",strData);}}else{return SCORM2004_CallSetValue("cmi.suspend_data",strData);}}else{return SCORM2004_CallSetValue("cmi.suspend_data",strData);}}
function SCORM2004_GetLaunchData(){WriteToDebug("In SCORM2004_GetLaunchData");SCORM2004_ClearErrorInfo();return SCORM2004_CallGetValue("cmi.launch_data");}
function SCORM2004_GetComments(){WriteToDebug("In SCORM2004_GetComments");SCORM2004_ClearErrorInfo();var intCommentCount;var strComments="";intCommentCount=SCORM2004_CallGetValue("cmi.comments_from_learner._count");for(var i=0;i<intCommentCount;i++){if(strComments.length>0){strComments+=" | ";}
strComments+=SCORM2004_CallGetValue("cmi.comments_from_learner."+i+".comment");}
return strComments;}
function SCORM2004_WriteComment(strComment){WriteToDebug("In SCORM2004_WriteComment strComment="+strComment);var intCurrentIndex;var blnResult;SCORM2004_ClearErrorInfo();if(strComment.search(/ \| /)==0){strComment=strComment.substr(3);}
strComment.replace(/\|\|/g,"|")
intCurrentIndex=SCORM2004_CallGetValue("cmi.comments_from_learner._count");blnResult=SCORM2004_CallSetValue("cmi.comments_from_learner."+intCurrentIndex+".comment",strComment);blnResult=SCORM2004_CallSetValue("cmi.comments_from_learner."+intCurrentIndex+".timestamp",ConvertDateToIso8601TimeStamp(new Date()))&&blnResult;return blnResult;}
function SCORM2004_GetLMSComments(){WriteToDebug("In SCORM2004_GetLMSComments");SCORM2004_ClearErrorInfo();var intCommentCount;var strComments="";intCommentCount=SCORM2004_CallGetValue("cmi.comments_from_lms._count");for(var i=0;i<intCommentCount;i++){if(strComments.length>0){strComments+=" \r\n";}
strComments+=SCORM2004_CallGetValue("cmi.comments_from_lms."+i+".comment");}
return strComments;}
function SCORM2004_GetAudioPlayPreference(){var intTempPreference;WriteToDebug("In SCORM2004_GetAudioPlayPreference");SCORM2004_ClearErrorInfo();intTempPreference=SCORM2004_CallGetValue("cmi.learner_preference.audio_level");if(intTempPreference==""){intTempPreference=0;}
intTempPreference=parseInt(intTempPreference,10);WriteToDebug("intTempPreference="+intTempPreference);if(intTempPreference>0){WriteToDebug("Returning On");return PREFERENCE_ON;}
else if(intTempPreference<=0){WriteToDebug("Returning Off");return PREFERENCE_OFF;}
else{WriteToDebug("Error: Invalid preference");SCORM2004_SetErrorInfoManually(SCORM2004_ERROR_INVALID_PREFERENCE,"Invalid audio preference received from LMS","intTempPreference="+intTempPreference);return null;}}
function SCORM2004_GetAudioVolumePreference(){var intTempPreference;WriteToDebug("In SCORM2004_GetAudioVollumePreference");SCORM2004_ClearErrorInfo();intTempPreference=SCORM2004_CallGetValue("cmi.learner_preference.audio_level");WriteToDebug("intTempPreference="+intTempPreference);if(intTempPreference==""){intTempPreference=100;}
intTempPreference=parseInt(intTempPreference,10);if(intTempPreference<=0){WriteToDebug("Setting to 100");intTempPreference=100;}
if(!(intTempPreference>0&&intTempPreference<=100)){WriteToDebug("ERROR: invalid preference");SCORM2004_SetErrorInfoManually(SCORM2004_ERROR_INVALID_PREFERENCE,"Invalid audio preference received from LMS","intTempPreference="+intTempPreference);return null;}
WriteToDebug("Returning "+intTempPreference);return intTempPreference;}
function SCORM2004_SetAudioPreference(PlayPreference,intPercentOfMaxVolume){WriteToDebug("In SCORM2004_SetAudioPreference PlayPreference="+PlayPreference+", intPercentOfMaxVolume="+intPercentOfMaxVolume);SCORM2004_ClearErrorInfo();if(PlayPreference==PREFERENCE_OFF){WriteToDebug("Setting percent to 0");intPercentOfMaxVolume=0;}
return SCORM2004_CallSetValue("cmi.learner_preference.audio_level",intPercentOfMaxVolume);}
function SCORM2004_SetLanguagePreference(strLanguage){WriteToDebug("In SCORM2004_SetLanguagePreference strLanguage="+strLanguage);SCORM2004_ClearErrorInfo();return SCORM2004_CallSetValue("cmi.learner_preference.language",strLanguage);}
function SCORM2004_GetLanguagePreference(){WriteToDebug("In SCORM2004_GetLanguagePreference");SCORM2004_ClearErrorInfo();return SCORM2004_CallGetValue("cmi.learner_preference.language");}
function SCORM2004_SetSpeedPreference(intPercentOfMax){WriteToDebug("In SCORM2004_SetSpeedPreference intPercentOfMax="+intPercentOfMax);SCORM2004_ClearErrorInfo();return SCORM2004_CallSetValue("cmi.learner_preference.delivery_speed",intPercentOfMax);}
function SCORM2004_GetSpeedPreference(){var intSCORMSpeed;var intPercentOfMax;WriteToDebug("In SCORM2004_GetSpeedPreference");SCORM2004_ClearErrorInfo();intSCORMSpeed=SCORM2004_CallGetValue("cmi.learner_preference.delivery_speed");WriteToDebug("intSCORMSpeed="+intSCORMSpeed);if(intSCORMSpeed==""){WriteToDebug("Detected empty string, defaulting to 100");intSCORMSpeed=100;}
intSCORMSpeed=parseInt(intSCORMSpeed,10);if(intSCORMSpeed<0){WriteToDebug("ERROR - out of range");SCORM2004_SetErrorInfoManually(SCORM2004_ERROR_INVALID_SPEED,"Invalid speed preference received from LMS - out of range","intSCORMSpeed="+intSCORMSpeed);return null;}
WriteToDebug("intSCORMSpeed "+intSCORMSpeed);return intSCORMSpeed;}
function SCORM2004_SetTextPreference(intPreference){WriteToDebug("In SCORM2004_SetTextPreference intPreference="+intPreference);SCORM2004_ClearErrorInfo();return SCORM2004_CallSetValue("cmi.learner_preference.audio_captioning",intPreference);}
function SCORM2004_GetTextPreference(){var intTempPreference;WriteToDebug("In SCORM2004_GetTextPreference");SCORM2004_ClearErrorInfo();intTempPreference=SCORM2004_CallGetValue("cmi.learner_preference.audio_captioning");intTempPreference=parseInt(intTempPreference,10);WriteToDebug("intTempPreference="+intTempPreference);if(intTempPreference>0){WriteToDebug("Returning On");return PREFERENCE_ON;}
else if(intTempPreference==0||intTempPreference==""){WriteToDebug("Returning Default");return PREFERENCE_DEFAULT;}
else if(intTempPreference<0){WriteToDebug("Returning Off");return PREFERENCE_OFF;}
else{WriteToDebug("Error: Invalid preference");SCORM2004_SetErrorInfoManually(SCORM2004_ERROR_INVALID_PREFERENCE,"Invalid text preference received from LMS","intTempPreference="+intTempPreference);return null;}}
function SCORM2004_GetPreviouslyAccumulatedTime(){var strIso8601Time;var intMilliseconds;WriteToDebug("In SCORM2004_GetPreviouslyAccumulatedTime");SCORM2004_ClearErrorInfo();strIso8601Time=SCORM2004_CallGetValue("cmi.total_time")
WriteToDebug("strIso8601Time="+strIso8601Time);if(!IsValidIso8601TimeSpan(strIso8601Time)){WriteToDebug("ERROR - Invalid Iso8601Time");SCORM2004_SetErrorInfoManually(SCORM2004_ERROR_INVALID_TIMESPAN,"Invalid timespan received from LMS","strTime="+strIso8601Time);return null;}
intMilliseconds=ConvertScorm2004TimeToMS(strIso8601Time);WriteToDebug("Returning "+intMilliseconds);return intMilliseconds;}
function SCORM2004_SaveTime(intMilliSeconds){var strISO8601Time;WriteToDebug("In SCORM2004_SaveTime intMilliSeconds="+intMilliSeconds);SCORM2004_ClearErrorInfo();strISO8601Time=ConvertMilliSecondsIntoSCORM2004Time(intMilliSeconds);WriteToDebug("strISO8601Time="+strISO8601Time);return SCORM2004_CallSetValue("cmi.session_time",strISO8601Time);}
function SCORM2004_GetMaxTimeAllowed(){var strIso8601Time;var intMilliseconds;WriteToDebug("In SCORM2004_GetMaxTimeAllowed");SCORM2004_ClearErrorInfo();strIso8601Time=SCORM2004_CallGetValue("cmi.max_time_allowed")
WriteToDebug("strIso8601Time="+strIso8601Time);if(strIso8601Time==""){strIso8601Time="20Y";}
if(!IsValidIso8601TimeSpan(strIso8601Time)){WriteToDebug("ERROR - Invalid Iso8601Time");SCORM2004_SetErrorInfoManually(SCORM_ERROR_INVALID_TIMESPAN,"Invalid timespan received from LMS","strIso8601Time="+strIso8601Time);return null;}
intMilliseconds=ConvertScorm2004TimeToMS(ConvertScorm2004TimeToMS);WriteToDebug("intMilliseconds="+intMilliseconds);return intMilliseconds;}
function SCORM2004_DisplayMessageOnTimeout(){var strTLA;WriteToDebug("In SCORM2004_DisplayMessageOnTimeout");SCORM2004_ClearErrorInfo();strTLA=SCORM2004_CallGetValue("cmi.time_limit_action");WriteToDebug("strTLA="+strTLA);if(strTLA==SCORM2004_TLA_EXIT_MESSAGE||strTLA==SCORM2004_TLA_CONTINUE_MESSAGE){WriteToDebug("returning true");return true;}
else if(strTLA==SCORM2004_TLA_EXIT_NO_MESSAGE||strTLA==SCORM2004_TLA_CONTINUE_NO_MESSAGE||strTLA==""){WriteToDebug("returning false");return false;}
else{WriteToDebug("Error invalid TLA");SCORM2004_SetErrorInfoManually(SCORM2004_ERROR_INVALID_TIME_LIMIT_ACTION,"Invalid time limit action received from LMS","strTLA="+strTLA);return null;}}
function SCORM2004_ExitOnTimeout(){var strTLA;WriteToDebug("In SCORM2004_ExitOnTimeout");SCORM2004_ClearErrorInfo();strTLA=SCORM2004_CallGetValue("cmi.time_limit_action");WriteToDebug("strTLA="+strTLA);if(strTLA==SCORM2004_TLA_EXIT_MESSAGE||strTLA==SCORM2004_TLA_EXIT_NO_MESSAGE){WriteToDebug("returning true");return true;}
else if(strTLA==SCORM2004_TLA_CONTINUE_MESSAGE||strTLA==SCORM2004_TLA_CONTINUE_NO_MESSAGE||strTLA==""){WriteToDebug("returning false");return false;}
else{WriteToDebug("ERROR invalid TLA");SCORM2004_SetErrorInfoManually(SCORM2004_ERROR_INVALID_TIME_LIMIT_ACTION,"Invalid time limit action received from LMS","strTLA="+strTLA);return null;}}
function SCORM2004_GetPassingScore(){var fltScore;WriteToDebug("In SCORM2004_GetPassingScore");SCORM2004_ClearErrorInfo();fltScore=SCORM2004_CallGetValue("cmi.scaled_passing_score")
WriteToDebug("fltScore="+fltScore);if(fltScore==""){fltScore=0;}
if(!IsValidDecimal(fltScore)){WriteToDebug("Error - score is not a valid decimal");SCORM2004_SetErrorInfoManually(SCORM2004_ERROR_INVALID_DECIMAL,"Invalid mastery score received from LMS","fltScore="+fltScore);return null;}
fltScore=parseFloat(fltScore);fltScore=fltScore*100;WriteToDebug("returning fltScore-"+fltScore);return fltScore;}
function SCORM2004_SetScore(intScore,intMaxScore,intMinScore){var blnResult;var fltNormalizedScore;intScore=RoundToPrecision(intScore,7);intMaxScore=RoundToPrecision(intMaxScore,7);intMinScore=RoundToPrecision(intMinScore,7);WriteToDebug("In SCORM2004_SetScore intScore="+intScore+", intMaxScore="+intMaxScore+", intMinScore="+intMinScore);SCORM2004_ClearErrorInfo();fltNormalizedScore=RoundToPrecision(intScore/100,7);blnResult=SCORM2004_CallSetValue("cmi.score.raw",intScore);blnResult=SCORM2004_CallSetValue("cmi.score.max",intMaxScore)&&blnResult;blnResult=SCORM2004_CallSetValue("cmi.score.min",intMinScore)&&blnResult;blnResult=SCORM2004_CallSetValue("cmi.score.scaled",fltNormalizedScore)&&blnResult;WriteToDebug("Returning "+blnResult);return blnResult;}
function SCORM2004_GetScore(){WriteToDebug("In SCORM2004_GetScore");SCORM2004_ClearErrorInfo();return SCORM2004_CallGetValue("cmi.score.raw");}
function SCORM2004_GetScaledScore(){WriteToDebug("In SCORM2004_GetScaledScore");SCORM2004_ClearErrorInfo();return SCORM2004_CallGetValue("cmi.score.scaled");}
function SCORM2004_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,SCORM2004InteractionType){var blnResult;var intInteractionIndex;var strResult;if(!IsNumeric(blnCorrect)){blnCorrect=new String(blnCorrect);}
SCORM2004_ClearErrorInfo();intInteractionIndex=SCORM2004_CallGetValue("cmi.interactions._count");WriteToDebug("intInteractionIndex="+intInteractionIndex);if(intInteractionIndex==""){WriteToDebug("Setting Interaction Index to 0");intInteractionIndex=0;}
if(blnCorrect==true||blnCorrect=="true"||blnCorrect==INTERACTION_RESULT_CORRECT){strResult=SCORM2004_RESULT_CORRECT;}
else if(String(blnCorrect)=="false"||blnCorrect==INTERACTION_RESULT_WRONG){strResult=SCORM2004_RESULT_WRONG;}
else if(blnCorrect==INTERACTION_RESULT_UNANTICIPATED){strResult=SCORM2004_RESULT_UNANTICIPATED;}
else if(blnCorrect==INTERACTION_RESULT_NEUTRAL){strResult=SCORM2004_RESULT_NEUTRAL;}
else if(IsNumeric(blnCorrect)){strResult=blnCorrect;}
else{strResult="";}
WriteToDebug("strResult="+strResult);strID=CreateValidIdentifier(strID);blnResult=SCORM2004_CallSetValue("cmi.interactions."+intInteractionIndex+".id",strID);blnResult=SCORM2004_CallSetValue("cmi.interactions."+intInteractionIndex+".type",SCORM2004InteractionType)&&blnResult;blnResult=SCORM2004_CallSetValue("cmi.interactions."+intInteractionIndex+".learner_response",strResponse)&&blnResult;if(strResult!=undefined&&strResult!=null&&strResult!=""){blnResult=SCORM2004_CallSetValue("cmi.interactions."+intInteractionIndex+".result",strResult)&&blnResult;}
if(strCorrectResponse!=undefined&&strCorrectResponse!=null&&strCorrectResponse!=""){blnResult=SCORM2004_CallSetValue("cmi.interactions."+intInteractionIndex+".correct_responses.0.pattern",strCorrectResponse)&&blnResult;}
if(strDescription!=undefined&&strDescription!=null&&strDescription!=""){blnResult=SCORM2004_CallSetValue("cmi.interactions."+intInteractionIndex+".description",strDescription)&&blnResult;}
if(intWeighting!=undefined&&intWeighting!=null&&intWeighting!=""){blnResult=SCORM2004_CallSetValue("cmi.interactions."+intInteractionIndex+".weighting",intWeighting)&&blnResult;}
if(intLatency!=undefined&&intLatency!=null&&intLatency!=""){blnResult=SCORM2004_CallSetValue("cmi.interactions."+intInteractionIndex+".latency",ConvertMilliSecondsIntoSCORM2004Time(intLatency))&&blnResult;}
if(strLearningObjectiveID!=undefined&&strLearningObjectiveID!=null&&strLearningObjectiveID!=""){blnResult=SCORM2004_CallSetValue("cmi.interactions."+intInteractionIndex+".objectives.0.id",strLearningObjectiveID)&&blnResult;}
blnResult=SCORM2004_CallSetValue("cmi.interactions."+intInteractionIndex+".timestamp",ConvertDateToIso8601TimeStamp(dtmTime))&&blnResult;WriteToDebug("Returning "+blnResult);return blnResult;}
function SCORM2004_RecordTrueFalseInteraction(strID,blnResponse,blnCorrect,blnCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In SCORM2004_RecordTrueFalseInteraction strID="+strID+", strResponse="+strResponse+", blnCorrect="+blnCorrect+", strCorrectResponse="+strCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var strResponse="";var strCorrectResponse=null;if(blnResponse){strResponse="true";}
else{strResponse="false";}
if(blnCorrectResponse==true){strCorrectResponse="true";}
else if(blnCorrectResponse==false){strCorrectResponse="false";}
return SCORM2004_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,SCORM2004_INTERACTION_TYPE_TRUE_FALSE);}
function SCORM2004_RecordMultipleChoiceInteraction(strID,aryResponse,blnCorrect,aryCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In SCORM2004_RecordMultipleChoiceInteraction strID="+strID+", aryResponse="+aryResponse+", blnCorrect="+blnCorrect+", aryCorrectResponse="+aryCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var strResponse="";var strCorrectResponse="";for(var i=0;i<aryResponse.length;i++){if(strResponse.length>0){strResponse+="[,]";}
strResponse+=aryResponse[i].Long;}
for(var i=0;i<aryCorrectResponse.length;i++){if(strCorrectResponse.length>0){strCorrectResponse+="[,]";}
strCorrectResponse+=aryCorrectResponse[i].Long;}
return SCORM2004_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,SCORM2004_INTERACTION_TYPE_CHOICE);}
function SCORM2004_RecordFillInInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In SCORM2004_RecordFillInInteraction strID="+strID+", strResponse="+strResponse+", blnCorrect="+blnCorrect+", strCorrectResponse="+strCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var interactionType;if(strCorrectResponse==null){strCorrectResponse="";}
strCorrectResponse=new String(strCorrectResponse);if(strCorrectResponse.length>250||strResponse.length>250){interactionType=SCORM2004_INTERACTION_TYPE_LONG_FILL_IN;}
else{interactionType=SCORM2004_INTERACTION_TYPE_FILL_IN;}
if(strCorrectResponse.length>4000){strCorrectResponse=strCorrectResponse.substr(0,4000);}
return SCORM2004_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,interactionType);}
function SCORM2004_RecordMatchingInteraction(strID,aryResponse,blnCorrect,aryCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In SCORM2004_RecordMatchingInteraction strID="+strID+", aryResponse="+aryResponse+", blnCorrect="+blnCorrect+", aryCorrectResponse="+aryCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var strResponse="";var strCorrectResponse="";for(var i=0;i<aryResponse.length;i++){if(strResponse.length>0){strResponse+="[,]";}
strResponse+=aryResponse[i].Source.Long+"[.]"+aryResponse[i].Target.Long;}
for(var i=0;i<aryCorrectResponse.length;i++){if(strCorrectResponse.length>0){strCorrectResponse+="[,]";}
strCorrectResponse+=aryCorrectResponse[i].Source.Long+"[.]"+aryCorrectResponse[i].Target.Long;}
return SCORM2004_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,SCORM2004_INTERACTION_TYPE_MATCHING);}
function SCORM2004_RecordPerformanceInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In SCORM2004_RecordPerformanceInteraction strID="+strID+", strResponse="+strResponse+", blnCorrect="+blnCorrect+", strCorrectResponse="+strCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);strResponse=new String(strResponse);if(strResponse.length>250){strResponse=strResponse.substr(0,250);}
if(strCorrectResponse==null){strCorrectResponse="";}
strCorrectResponse=new String(strCorrectResponse);if(strCorrectResponse.length>250){strCorrectResponse=strCorrectResponse.substr(0,250);}
strResponse="[.]"+strResponse;strCorrectResponse="[.]"+strCorrectResponse;return SCORM2004_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,SCORM2004_INTERACTION_TYPE_PERFORMANCE);}
function SCORM2004_RecordSequencingInteraction(strID,aryResponse,blnCorrect,aryCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In SCORM2004_RecordSequencingInteraction strID="+strID+", aryResponse="+aryResponse+", blnCorrect="+blnCorrect+", aryCorrectResponse="+aryCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var strResponse="";var strCorrectResponse="";for(var i=0;i<aryResponse.length;i++){if(strResponse.length>0){strResponse+="[,]";}
strResponse+=aryResponse[i].Long;}
for(var i=0;i<aryCorrectResponse.length;i++){if(strCorrectResponse.length>0){strCorrectResponse+="[,]";}
strCorrectResponse+=aryCorrectResponse[i].Long;}
return SCORM2004_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,SCORM2004_INTERACTION_TYPE_SEQUENCING);}
function SCORM2004_RecordLikertInteraction(strID,response,blnCorrect,correctResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In RecordLikertInteraction strID="+strID+", response="+response+", blnCorrect="+blnCorrect+", correctResponse="+correctResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var strResponse=response.Long;var strCorrectResponse="";if(correctResponse!=null){strCorrectResponse=correctResponse.Long;}
return SCORM2004_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,SCORM2004_INTERACTION_TYPE_LIKERT);}
function SCORM2004_RecordNumericInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In SCORM2004_RecordNumericInteraction strID="+strID+", strResponse="+strResponse+", blnCorrect="+blnCorrect+", strCorrectResponse="+strCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);if(strCorrectResponse!=undefined&&strCorrectResponse!=null&&strCorrectResponse!=""){strCorrectResponse=strCorrectResponse+"[:]"+strCorrectResponse;}
return SCORM2004_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,SCORM2004_INTERACTION_TYPE_NUMERIC);}
function SCORM2004_GetEntryMode(){var strEntry;WriteToDebug("In SCORM2004_GetEntryMode");SCORM2004_ClearErrorInfo();strEntry=SCORM2004_CallGetValue("cmi.entry");WriteToDebug("strEntry="+strEntry);if(strEntry==SCORM2004_ENTRY_ABINITIO){WriteToDebug("Returning first time");return ENTRY_FIRST_TIME;}
else if(strEntry==SCORM2004_ENTRY_RESUME){WriteToDebug("Returning resume");return ENTRY_RESUME;}
else if(strEntry==SCORM2004_ENTRY_NORMAL){WriteToDebug("returning normal");return ENTRY_REVIEW;}
else{WriteToDebug("ERROR - invalid entry mode");SCORM2004_SetErrorInfoManually(SCORM2004_ERROR_INVALID_ENTRY,"Invalid entry vocab received from LMS","strEntry="+strEntry);return null;}}
function SCORM2004_GetLessonMode(){var strLessonMode;WriteToDebug("In SCORM2004_GetLessonMode");SCORM2004_ClearErrorInfo();strLessonMode=SCORM2004_CallGetValue("cmi.mode");WriteToDebug("strLessonMode="+strLessonMode);if(strLessonMode==SCORM2004_BROWSE){WriteToDebug("Returning browse");return MODE_BROWSE;}
else if(strLessonMode==SCORM2004_NORMAL){WriteToDebug("returning normal");return MODE_NORMAL;}
else if(strLessonMode==SCORM2004_REVIEW){WriteToDebug("Returning Review");return MODE_REVIEW;}
else{WriteToDebug("ERROR - invalid lesson mode");SCORM2004_SetErrorInfoManually(SCORM2004_ERROR_INVALID_LESSON_MODE,"Invalid lesson_mode vocab received from LMS","strLessonMode="+strLessonMode);return null;}}
function SCORM2004_GetTakingForCredit(){var strCredit;WriteToDebug("In SCORM2004_GetTakingForCredit");SCORM2004_ClearErrorInfo();strCredit=SCORM2004_CallGetValue("cmi.credit");WriteToDebug("strCredit="+strCredit);if(strCredit=="credit"){WriteToDebug("Returning true");return true;}
else if(strCredit=="no-credit"){WriteToDebug("Returning false");return false;}
else{WriteToDebug("ERROR - invalid credit");SCORM2004_SetErrorInfoManually(SCORM2004_ERROR_INVALID_CREDIT,"Invalid credit vocab received from LMS","strCredit="+strCredit);return null;}}
function SCORM2004_SetObjectiveScore(strObjectiveID,intScore,intMaxScore,intMinScore){var intObjectiveIndex;var blnResult;var fltNormalizedScore;intScore=RoundToPrecision(intScore,7);intMaxScore=RoundToPrecision(intMaxScore,7);intMinScore=RoundToPrecision(intMinScore,7);WriteToDebug("In SCORM2004_SetObjectiveScore, strObejctiveID="+strObjectiveID+", intScore="+intScore+", intMaxScore="+intMaxScore+", intMinScore="+intMinScore);SCORM2004_ClearErrorInfo();intObjectiveIndex=SCORM2004_FindObjectiveIndexFromID(strObjectiveID);WriteToDebug("intObjectiveIndex="+intObjectiveIndex);fltNormalizedScore=RoundToPrecision(intScore/100,7);blnResult=SCORM2004_CallSetValue("cmi.objectives."+intObjectiveIndex+".id",strObjectiveID);blnResult=SCORM2004_CallSetValue("cmi.objectives."+intObjectiveIndex+".score.raw",intScore)&&blnResult;blnResult=SCORM2004_CallSetValue("cmi.objectives."+intObjectiveIndex+".score.max",intMaxScore)&&blnResult;blnResult=SCORM2004_CallSetValue("cmi.objectives."+intObjectiveIndex+".score.min",intMinScore)&&blnResult;blnResult=SCORM2004_CallSetValue("cmi.objectives."+intObjectiveIndex+".score.scaled",fltNormalizedScore)&&blnResult;WriteToDebug("Returning "+blnResult);return blnResult;}
function SCORM2004_SetObjectiveStatus(strObjectiveID,Lesson_Status){var intObjectiveIndex;var blnResult;var strSCORMSuccessStatus="";var strSCORMCompletionStatus="";WriteToDebug("In SCORM2004_SetObjectiveStatus strObjectiveID="+strObjectiveID+", Lesson_Status="+Lesson_Status);SCORM2004_ClearErrorInfo();intObjectiveIndex=SCORM2004_FindObjectiveIndexFromID(strObjectiveID);WriteToDebug("intObjectiveIndex="+intObjectiveIndex);if(Lesson_Status==LESSON_STATUS_PASSED){strSCORMSuccessStatus=SCORM2004_PASSED;strSCORMCompletionStatus=SCORM2004_COMPLETED;}
else if(Lesson_Status==LESSON_STATUS_FAILED){strSCORMSuccessStatus=SCORM2004_FAILED;strSCORMCompletionStatus=SCORM2004_COMPLETED;}
else if(Lesson_Status==LESSON_STATUS_COMPLETED){strSCORMSuccessStatus=SCORM2004_UNKNOWN;strSCORMCompletionStatus=SCORM2004_COMPLETED;}
else if(Lesson_Status==LESSON_STATUS_BROWSED){strSCORMSuccessStatus=SCORM2004_UNKNOWN;strSCORMCompletionStatus=SCORM2004_COMPLETED;}
else if(Lesson_Status==LESSON_STATUS_INCOMPLETE){strSCORMSuccessStatus=SCORM2004_UNKNOWN;strSCORMCompletionStatus=SCORM2004_INCOMPLETE;}
else if(Lesson_Status==LESSON_STATUS_NOT_ATTEMPTED){strSCORMSuccessStatus=SCORM2004_UNKNOWN;strSCORMCompletionStatus=SCORM2004_NOT_ATTEMPTED;}
WriteToDebug("strSCORMSuccessStatus="+strSCORMSuccessStatus);WriteToDebug("strSCORMCompletionStatus="+strSCORMCompletionStatus);blnResult=SCORM2004_CallSetValue("cmi.objectives."+intObjectiveIndex+".id",strObjectiveID);blnResult=SCORM2004_CallSetValue("cmi.objectives."+intObjectiveIndex+".success_status",strSCORMSuccessStatus)&&blnResult;blnResult=SCORM2004_CallSetValue("cmi.objectives."+intObjectiveIndex+".completion_status",strSCORMCompletionStatus)&&blnResult;WriteToDebug("Returning "+blnResult);return blnResult;}
function SCORM2004_SetObjectiveDescription(strObjectiveID,strObjectiveDescription){var intObjectiveIndex;WriteToDebug("In SCORM2004_SetObjectiveDescription strObjectiveID="+strObjectiveID+", strObjectiveDescription="+strObjectiveDescription);SCORM2004_ClearErrorInfo();intObjectiveIndex=SCORM2004_FindObjectiveIndexFromID(strObjectiveID);WriteToDebug("intObjectiveIndex="+intObjectiveIndex);blnResult=SCORM2004_CallSetValue("cmi.objectives."+intObjectiveIndex+".id",strObjectiveID);blnResult=SCORM2004_CallSetValue("cmi.objectives."+intObjectiveIndex+".description",strObjectiveDescription)&&blnResult;WriteToDebug("Returning "+blnResult);return blnResult;}
function SCORM2004_GetObjectiveScore(strObjectiveID){var intObjectiveIndex;WriteToDebug("In SCORM2004_GetObjectiveScore, strObejctiveID="+strObjectiveID);SCORM2004_ClearErrorInfo();intObjectiveIndex=SCORM2004_FindObjectiveIndexFromID(strObjectiveID);WriteToDebug("intObjectiveIndex="+intObjectiveIndex);return SCORM2004_CallGetValue("cmi.objectives."+intObjectiveIndex+".score.raw");}
function SCORM2004_GetObjectiveStatus(strObjectiveID){var intObjectiveIndex;var strSuccessStatus;var strCompletionStatus;WriteToDebug("In SCORM2004_GetObjectiveStatus, strObejctiveID="+strObjectiveID);SCORM2004_ClearErrorInfo();intObjectiveIndex=SCORM2004_FindObjectiveIndexFromID(strObjectiveID);WriteToDebug("intObjectiveIndex="+intObjectiveIndex);strSuccessStatus=SCORM2004_CallGetValue("cmi.objectives."+intObjectiveIndex+".success_status");strCompletionStatus=SCORM2004_CallGetValue("cmi.objectives."+intObjectiveIndex+".completion_status");if(strSuccessStatus==SCORM2004_PASSED){WriteToDebug("returning Passed");return LESSON_STATUS_PASSED;}
else if(strSuccessStatus==SCORM2004_FAILED){WriteToDebug("Returning Failed");return LESSON_STATUS_FAILED;}
else if(strCompletionStatus==SCORM2004_COMPLETED){WriteToDebug("Returning Completed");return LESSON_STATUS_COMPLETED;}
else if(strCompletionStatus==SCORM2004_INCOMPLETE){WriteToDebug("Returning Incomplete");return LESSON_STATUS_INCOMPLETE;}
else if(strCompletionStatus==SCORM2004_NOT_ATTEMPTED||strCompletionStatus==SCORM2004_UNKNOWN||strCompletionStatus==""){WriteToDebug("Returning Not Attempted");return LESSON_STATUS_NOT_ATTEMPTED;}
else{WriteToDebug("ERROR - status not found");SCORM2004_SetErrorInfoManually(SCORM2004_ERROR_INVALID_STATUS,"Invalid objective status received from LMS or initial status not yet recorded for objective","strCompletionStatus="+strCompletionStatus);return null;}}
function SCORM2004_GetObjectiveProgressMeasure(strObjectiveID){var strProgressMeasure=SCORM2004_CallGetValue("cmi.objectives."+strObjectiveID+".progress_measure");return strProgressMeasure;}
function SCORM2004_GetObjectiveDescription(strObjectiveID){var intObjectiveIndex;var strSuccessStatus;var strCompletionStatus;WriteToDebug("In SCORM2004_GetObjectiveDescription, strObejctiveID="+strObjectiveID);SCORM2004_ClearErrorInfo();intObjectiveIndex=SCORM2004_FindObjectiveIndexFromID(strObjectiveID);WriteToDebug("intObjectiveIndex="+intObjectiveIndex);strDescription=SCORM2004_CallGetValue("cmi.objectives."+intObjectiveIndex+".description");return strDescription;}
function SCORM2004_FindObjectiveIndexFromID(strObjectiveID){var intCount;var i;var strTempID;WriteToDebug("In SCORM2004_FindObjectiveIndexFromID");intCount=SCORM2004_CallGetValue("cmi.objectives._count");if(intCount==""){WriteToDebug("Setting intCount=0");return 0;}
intCount=parseInt(intCount,10);WriteToDebug("intCount="+intCount);for(i=0;i<intCount;i++){WriteToDebug("Checking index "+i);strTempID=SCORM2004_CallGetValue("cmi.objectives."+i+".id");WriteToDebug("ID="+strTempID);if(strTempID==strObjectiveID){WriteToDebug("Found Matching index");return i;}}
WriteToDebug("Did not find match, returning count");return intCount;}
function SCORM2004_SetFailed(){WriteToDebug("In SCORM2004_SetFailed");var blnResult;SCORM2004_ClearErrorInfo();blnResult=SCORM2004_CallSetValue("cmi.success_status",SCORM2004_FAILED);blnResult=SCORM2004_CallSetValue("cmi.completion_status",SCORM2004_COMPLETED)&&blnResult;return blnResult;}
function SCORM2004_SetPassed(){WriteToDebug("In SCORM2004_SetPassed");var blnResult;SCORM2004_ClearErrorInfo();blnResult=SCORM2004_CallSetValue("cmi.success_status",SCORM2004_PASSED);blnResult=SCORM2004_CallSetValue("cmi.completion_status",SCORM2004_COMPLETED)&&blnResult;return blnResult;}
function SCORM2004_SetCompleted(){WriteToDebug("In SCORM2004_SetCompleted");var blnResult;SCORM2004_ClearErrorInfo();blnResult=SCORM2004_CallSetValue("cmi.completion_status",SCORM2004_COMPLETED);return blnResult;}
function SCORM2004_ResetStatus(){WriteToDebug("In SCORM2004_ResetStatus");var blnResult;SCORM2004_ClearErrorInfo();blnResult=SCORM2004_CallSetValue("cmi.success_status",SCORM2004_UNKNOWN);blnResult=SCORM2004_CallSetValue("cmi.completion_status",SCORM2004_INCOMPLETE)&&blnResult;return blnResult;}
function SCORM2004_GetStatus(){var strSuccessStatus;var strCompletionStatus;WriteToDebug("In SCORM2004_GetStatus");SCORM2004_ClearErrorInfo();strSuccessStatus=SCORM2004_CallGetValue("cmi.success_status");strCompletionStatus=SCORM2004_CallGetValue("cmi.completion_status");WriteToDebug("strSuccessStatus="+strSuccessStatus);WriteToDebug("strCompletionStatus="+strCompletionStatus);if(strSuccessStatus==SCORM2004_PASSED){WriteToDebug("returning Passed");return LESSON_STATUS_PASSED;}
else if(strSuccessStatus==SCORM2004_FAILED){WriteToDebug("Returning Failed");return LESSON_STATUS_FAILED;}
else if(strCompletionStatus==SCORM2004_COMPLETED){WriteToDebug("Returning Completed");return LESSON_STATUS_COMPLETED;}
else if(strCompletionStatus==SCORM2004_INCOMPLETE){WriteToDebug("Returning Incomplete");return LESSON_STATUS_INCOMPLETE;}
else if(strCompletionStatus==SCORM2004_NOT_ATTEMPTED||strCompletionStatus==SCORM2004_UNKNOWN){WriteToDebug("Returning Not Attempted");return LESSON_STATUS_NOT_ATTEMPTED;}
else{WriteToDebug("ERROR - status not found");SCORM2004_SetErrorInfoManually(SCORM2004_ERROR_INVALID_STATUS,"Invalid lesson status received from LMS","strCompletionStatus="+strCompletionStatus);return null;}}
function SCORM2004_GetProgressMeasure(){WriteToDebug("In SCORM2004_GetProgressMeasure");var blnResult;SCORM2004_ClearErrorInfo();blnResult=SCORM2004_CallGetValue("cmi.progress_measure");return blnResult;}
function SCORM2004_SetProgressMeasure(numMeasure){WriteToDebug("In SCORM2004_SetProgressMeasure");var blnResult;SCORM2004_ClearErrorInfo();blnResult=SCORM2004_CallSetValue("cmi.progress_measure",numMeasure);return blnResult;}
function SCORM2004_SetObjectiveProgressMeasure(strObjectiveID,numMeasure){WriteToDebug("In SCORM2004_SetObjectiveProgressMeasure");var intObjectiveIndex;var blnResult;WriteToDebug("In SCORM2004_SetObjectiveProgressMeasure, strObejctiveID="+strObjectiveID+", numMeasure="+numMeasure);SCORM2004_ClearErrorInfo();intObjectiveIndex=SCORM2004_FindObjectiveIndexFromID(strObjectiveID);WriteToDebug("intObjectiveIndex="+intObjectiveIndex);SCORM2004_ClearErrorInfo();blnResult=SCORM2004_CallSetValue("cmi.objectives."+intObjectiveIndex+".progress_measure",numMeasure);return blnResult;}
function SCORM2004_IsContentInBrowseMode(){var strLessonMode
WriteToDebug("In SCORM2004_IsContentInBrowseMode");strLessonMode=SCORM2004_CallGetValue("cmi.mode");WriteToDebug("SCORM2004_IsContentInBrowseMode,  strLessonMode="+strLessonMode);if(strLessonMode==SCORM2004_BROWSE){WriteToDebug("Returning true");return true;}
else{WriteToDebug("Returning false");return false;}}
function SCORM2004_TranslateExitTypeToSCORM(strExitType){WriteToDebug("In SCORM2004_TranslatgeExitTypeToSCORM strExitType-"+strExitType);if(strExitType==EXIT_TYPE_SUSPEND){WriteToDebug("Returning suspend");return SCORM2004_SUSPEND;}
else if(strExitType==EXIT_TYPE_UNLOAD){WriteToDebug("Returning Exit");return SCORM2004_NORMAL_EXIT;}
else if(strExitType==EXIT_TYPE_FINISH){WriteToDebug("Returning Logout");return SCORM2004_NORMAL_EXIT;}
else if(strExitType==EXIT_TYPE_TIMEOUT){WriteToDebug("Returning Timout");return SCORM2004_TIMEOUT;}}
function SCORM2004_GetCompletionStatus(){WriteToDebug("In SCORM2004_GetCompletionStatus");return SCORM2004_COMPLETED;}
function SCORM2004_SetPointBasedScore(intScore,intMaxScore,intMinScore){var blnResult;var fltCalculatedScore;WriteToDebug("In SCORM2004_SetPointBasedScore intScore="+intScore+", intMaxScore="+intMaxScore+", intMinScore="+intMinScore);SCORM2004_ClearErrorInfo();if(intScore>=intMinScore)
{fltCalculatedScore=intScore/intMaxScore;}else{WriteToDebug("intScore is lower than intMinScore. Overriding score with minscore for cmi.score.scaled");fltCalculatedScore=intMinScore/intMaxScore;}
fltCalculatedScore=RoundToPrecision(fltCalculatedScore,7);blnResult=SCORM2004_CallSetValue("cmi.score.raw",intScore);blnResult=SCORM2004_CallSetValue("cmi.score.max",intMaxScore)&&blnResult;blnResult=SCORM2004_CallSetValue("cmi.score.min",intMinScore)&&blnResult;blnResult=SCORM2004_CallSetValue("cmi.score.scaled",fltCalculatedScore)&&blnResult;WriteToDebug("Returning "+blnResult);return blnResult;}
function SCORM2004_FindInteractionIndexFromID(strInteractionID){var intCount;var i;var strTempID;var dtmTempDate=new Date();var index;var currentIndexTimestamp=new Date("1/1/1900");WriteToDebug("In SCORM2004_FindInteractionIndexFromID");intCount=SCORM2004_CallGetValue("cmi.interactions._count");if(intCount==""){WriteToDebug("Setting intCount=0");return null;}
intCount=parseInt(intCount,10);WriteToDebug("intCount="+intCount);for(i=0;i<intCount;i++){WriteToDebug("Checking index "+i);strTempID=SCORM2004_CallGetValue("cmi.interactions."+i+".id");WriteToDebug("ID="+strTempID);if(strTempID==strInteractionID){WriteToDebug("Found Matching index: "+i);dtmTempDate=ConvertIso8601TimeStampToDate(SCORM2004_CallGetValue("cmi.interactions."+i+".timestamp"));WriteToDebug("timestamp for "+i+": "+dtmTempDate);if(dtmTempDate>currentIndexTimestamp)
{index=i;currentIndexTimestamp=dtmTempDate;}}}
if(index>=0)return index;WriteToDebug("Did not find match, returning null");return null;}
function SCORM2004_GetInteractionType(strInteractionID)
{var intInteractionIndex;WriteToDebug("In SCORM2004_GetInteractionType, strInteractionID="+strInteractionID);SCORM2004_ClearErrorInfo();intInteractionIndex=SCORM2004_FindInteractionIndexFromID(strInteractionID);if(intInteractionIndex==undefined||intInteractionIndex==null){return null;}
WriteToDebug("intInteractionIndex="+intInteractionIndex);var type=SCORM2004_CallGetValue("cmi.interactions."+intInteractionIndex+".type");switch(type)
{case SCORM2004_INTERACTION_TYPE_FILL_IN:return INTERACTION_TYPE_FILL_IN;case SCORM2004_INTERACTION_TYPE_LONG_FILL_IN:return INTERACTION_TYPE_LONG_FILL_IN;case SCORM2004_INTERACTION_TYPE_CHOICE:return INTERACTION_TYPE_CHOICE;case SCORM2004_INTERACTION_TYPE_LIKERT:return INTERACTION_TYPE_LIKERT;case SCORM2004_INTERACTION_TYPE_MATCHING:return INTERACTION_TYPE_MATCHING;case SCORM2004_INTERACTION_TYPE_NUMERIC:return INTERACTION_TYPE_NUMERIC;case SCORM2004_INTERACTION_TYPE_PERFORMANCE:return INTERACTION_TYPE_PERFORMANCE;case SCORM2004_INTERACTION_TYPE_SEQUENCING:return INTERACTION_TYPE_SEQUENCING;case SCORM2004_INTERACTION_TYPE_TRUE_FALSE:return INTERACTION_TYPE_TRUE_FALSE;default:return"";}}
function SCORM2004_GetInteractionTimestamp(strInteractionID)
{WriteToDebug("In SCORM2004_GetInteractionTimestamp, strInteractionID="+strInteractionID);var intInteractionIndex=SCORM2004_FindInteractionIndexFromID(strInteractionID);WriteToDebug("intInteractionIndex="+intInteractionIndex);SCORM2004_ClearErrorInfo();if(intInteractionIndex==undefined||intInteractionIndex==null){return null;}
return SCORM2004_CallGetValue(ConvertIso8601TimeStampToDate("cmi.interactions."+intInteractionIndex+".timestamp"));}
function SCORM2004_GetInteractionCorrectResponses(strInteractionID)
{WriteToDebug("In SCORM2004_GetInteractionCorrectResponses, strInteractionID="+strInteractionID);var intInteractionIndex=SCORM2004_FindInteractionIndexFromID(strInteractionID);WriteToDebug("intInteractionIndex="+intInteractionIndex);SCORM2004_ClearErrorInfo();if(intInteractionIndex==undefined||intInteractionIndex==null){return null;}
var strType=SCORM2004_CallGetValue("cmi.interactions."+intInteractionIndex+".type");var intCorrectResponseCount=SCORM2004_CallGetValue("cmi.interactions."+intInteractionIndex+".correct_responses._count");if(intCorrectResponseCount==""){WriteToDebug("Setting intCorrectResponseCount=0");return 0;}
intCorrectResponseCount=parseInt(intCorrectResponseCount,10);WriteToDebug("intCorrectResponseCount="+intCorrectResponseCount);if(intCorrectResponseCount==0)return new Array();if(intCorrectResponseCount>1)WriteToDebug("SCORM Driver is not currently implemented to support multiple correct response combinations and will only return the first");var strResponse=new String(SCORM2004_CallGetValue("cmi.interactions."+intInteractionIndex+".correct_responses.0.pattern"));var aryResponse=strResponse.split("[,]");WriteToDebug("aryResponse.length = "+aryResponse.length);aryResponse=SCORM2004_ProcessResponseArray(strType,aryResponse);WriteToDebug("aryResponse.length = "+aryResponse.length);return aryResponse;}
function SCORM2004_GetInteractionWeighting(strInteractionID)
{WriteToDebug("In SCORM2004_GetInteractionWeighting, strInteractionID="+strInteractionID);var intInteractionIndex=SCORM2004_FindInteractionIndexFromID(strInteractionID);WriteToDebug("intInteractionIndex="+intInteractionIndex);SCORM2004_ClearErrorInfo();if(intInteractionIndex==undefined||intInteractionIndex==null){return null;}
return SCORM2004_CallGetValue("cmi.interactions."+intInteractionIndex+".weighting");}
function SCORM2004_GetInteractionLearnerResponses(strInteractionID)
{WriteToDebug("In SCORM2004_GetInteractionLearnerResponses, strInteractionID="+strInteractionID);var intInteractionIndex=SCORM2004_FindInteractionIndexFromID(strInteractionID);WriteToDebug("intInteractionIndex="+intInteractionIndex);SCORM2004_ClearErrorInfo();if(intInteractionIndex==undefined||intInteractionIndex==null){return null;}
var strType=SCORM2004_CallGetValue("cmi.interactions."+intInteractionIndex+".type");var strResponse=new String(SCORM2004_CallGetValue("cmi.interactions."+intInteractionIndex+".learner_response"));var aryResponses=strResponse.split("[,]");WriteToDebug("aryResponses.length = "+aryResponses.length);aryResponses=SCORM2004_ProcessResponseArray(strType,aryResponses);return aryResponses;}
function SCORM2004_ProcessResponseArray(strInteractionType,aryResponses)
{WriteToDebug("Processing Response Array with "+aryResponses.length+" pieces");for(var i=0;i<aryResponses.length;i++)
{if(strInteractionType==SCORM2004_INTERACTION_TYPE_MATCHING)
{WriteToDebug("processing matching type, i="+i);aryResponses[i]=CreateMatchingResponse(aryResponses[i]);}}
return aryResponses;}
function SCORM2004_GetInteractionResult(strInteractionID)
{WriteToDebug("In SCORM2004_GetInteractionResult, strInteractionID="+strInteractionID);var intInteractionIndex=SCORM2004_FindInteractionIndexFromID(strInteractionID);WriteToDebug("intInteractionIndex="+intInteractionIndex);SCORM2004_ClearErrorInfo();if(intInteractionIndex==undefined||intInteractionIndex==null){return null;}
return SCORM2004_CallGetValue("cmi.interactions."+intInteractionIndex+".result");}
function SCORM2004_GetInteractionLatency(strInteractionID)
{WriteToDebug("In SCORM2004_GetInteractionLatency, strInteractionID="+strInteractionID);var intInteractionIndex=SCORM2004_FindInteractionIndexFromID(strInteractionID);WriteToDebug("intInteractionIndex="+intInteractionIndex);SCORM2004_ClearErrorInfo();if(intInteractionIndex==undefined||intInteractionIndex==null){return null;}
var strLatency=SCORM2004_CallGetValue("cmi.interactions."+intInteractionIndex+".latency");WriteToDebug("latency returns: "+strLatency);var intLatency=ConvertScorm2004TimeToMS(strLatency);WriteToDebug("latency in milliseconds: "+intLatency);return intLatency;}
function SCORM2004_GetInteractionDescription(strInteractionID)
{WriteToDebug("In SCORM2004_GetInteractionDescription, strInteractionID="+strInteractionID);var intInteractionIndex=SCORM2004_FindInteractionIndexFromID(strInteractionID);WriteToDebug("intInteractionIndex="+intInteractionIndex);SCORM2004_ClearErrorInfo();if(intInteractionIndex==undefined||intInteractionIndex==null){return null;}
return SCORM2004_CallGetValue("cmi.interactions."+intInteractionIndex+".description");}
function SCORM2004_CreateDataBucket(strBucketId,intMinSize,intMaxSize,strPersistenceType){WriteToDebug("In SCORM2004_CreateDataBucket, strBucketId="+strBucketId+", intMinSize="+intMinSize+", intMaxSize="+intMaxSize+", course="+strPersistenceType);if(SCORM2004_DetectSSPSupport()){if(SCORM2004_DoesBucketExist(strBucketId)==true){WriteToDebug("Bucket already exists and can't be re-allocated.");return false;}
else{return SCORM2004_CallSetValue("ssp.allocate","{bucketID="+strBucketId+"}{requested="+intMaxSize+"}{minimum="+intMinSize+"}{reducible=true}{persistence="+strPersistenceType+"}")}}
else{WriteToDebug("SSP is not supported in this LMS, returning false.");return false;}}
function SCORM2004_GetDataFromBucket(strBucketId){WriteToDebug("In SCORM2004_GetDataFromBucket, strBucketId="+strBucketId);if(SCORM2004_DetectSSPSupport()){var data=SCORM2004_CallGetValue("ssp.data.{bucketID="+strBucketId+"}");return data;}
else{WriteToDebug("SSP is not supported in this LMS, returning empty string.");return"";}}
function SCORM2004_PutDataInBucket(strBucketId,strData,blnAppendToEnd){WriteToDebug("In SCORM2004_PutDataInBucket, strBucketId="+strBucketId+", blnAppendToEnd="+blnAppendToEnd+", strData="+strData);if(SCORM2004_DetectSSPSupport()){if(blnAppendToEnd==true){return SCORM2004_CallSetValue("ssp.appendData","{bucketID="+strBucketId+"}"+strData);}
else{return SCORM2004_CallSetValue("ssp.data","{bucketID="+strBucketId+"}"+strData);}}
else{WriteToDebug("SSP is not supported in this LMS, returning false.");return false;}}
function SCORM2004_DetectSSPSupport(){WriteToDebug("In SCORM2004_DetectSSPSupport");if(blnSCORM2004_SSP_Is_Supported==true){WriteToDebug("Support already detected, returning true");return true;}
else if(blnSCORM2004_SSP_Is_Supported==false){WriteToDebug("Support already determined to me missing, returning false");return false;}
else{var intBucketCount=SCORM2004_CallGetValue("ssp._count");if(SCORM2004_GetLastError()==NO_ERROR){WriteToDebug("SSP data model call succeeded, SSP is supported");blnSCORM2004_SSP_Is_Supported=true;return true;}
else{WriteToDebug("SSP data model call failed, SSP is NOT supported");blnSCORM2004_SSP_Is_Supported=false;return false;}}}
function SCORM2004_GetBucketInfo(strBucketId){WriteToDebug("In SCORM2004_GetBucketInfo, strBucketId="+strBucketId);var intTotalSpace=0;var intUsedSpace=0;var strBucketState=new String(SCORM2004_CallGetValue("ssp.bucket_state.{bucketID="+strBucketId+"}"));if(strBucketState==""||strBucketState==null||strBucketState==undefined){WriteToDebug("Could not retrieve bucket state, returning 0 total size and 0 used size");return new SSPBucketSize(0,0);}
var sectionArray=strBucketState.split("{");for(var section in sectionArray){section=new String(sectionArray[section]);section=section.replace("}","");if(section.indexOf("totalSpace",0)==0){WriteToDebug("Found total space");intTotalSpace=parseInt(section.substr(11),10);WriteToDebug("total space="+intTotalSpace);}
else if(section.indexOf("used",0)==0){WriteToDebug("Found used space");intUsedSpace=parseInt(section.substr(5),10);WriteToDebug("used="+intUsedSpace);}}
var returnValue=new SSPBucketSize(intTotalSpace,intUsedSpace);return returnValue;}
function SCORM2004_DoesBucketExist(strBucketId){WriteToDebug("In SCORM2004_DoesBucketExist, strBucketId="+strBucketId);var intBucketCount=SCORM2004_CallGetValue("ssp._count");intBucketCount=parseInt(intBucketCount,10);for(var i=0;i<intBucketCount;i++){if(strBucketId==SCORM2004_CallGetValue("ssp."+i+".id")){WriteToDebug("Bucket '"+strBucketId+"' Exists");return true;}}
WriteToDebug("Bucket '"+strBucketId+"' DOES NOT Exist");return false;}
function SCORM2004_SetNavigationRequest(strNavRequest){WriteToDebug("In SCORM2004_SetNavigationRequest, strNavRequest="+strNavRequest);SCORM2004_ClearErrorInfo();var regValidChoice=/^\{target=[.A-Za-z0-9_-]+\}choice$/;if(strNavRequest.match(regValidChoice)){SCORM2004_CallSetValue("adl.nav.request",strNavRequest);return true;}else{switch(strNavRequest){case"continue":break;case"previous":break;case"exit":break;case"exitAll":break;case"abandon":break;case"abandonAll":break;case"suspendAll":break;case"_none_":break;default:WriteToDebug("In SCORM2004_SetNavigationRequest, NavRequest is not valid - strNavRequest="+strNavRequest);return false;}
SCORM2004_CallSetValue("adl.nav.request",strNavRequest);return true;}}
function SCORM2004_GetNavigationRequest(){WriteToDebug("In SCORM2004_GetNavigationRequest");SCORM2004_ClearErrorInfo();return SCORM2004_CallGetValue("adl.nav.request");}
function SCORM2004_CallInitialize(){var strResult;WriteToDebug("In SCORM2004_CallInitialize");SCORM2004_objAPI=SCORM2004_GrabAPI();WriteToDebug("Calling Initialize");strResult=SCORM2004_objAPI.Initialize("");strResult=strResult+"";WriteToDebug("strResult="+strResult);if(strResult==SCORM2004_FALSE){WriteToDebug("Detected failed call to initialize");SCORM2004_SetErrorInfo();WriteToDebug("Error calling Initialize:");WriteToDebug("              Error Number="+intSCORM2004Error);WriteToDebug("              Error String="+strSCORM2004ErrorString);WriteToDebug("              Diagnostic="+strSCORM2004ErrorDiagnostic);return false;}
WriteToDebug("Returning true");return true;}
function SCORM2004_CallSetValue(strElement,strValue){var strResult;WriteToDebug("SCORM2004_CallSetValue strElement="+strElement+", strValue="+strValue);if(blnReviewModeSoReadOnly===true){WriteToDebug("Mode is Review and configuration setting dictates this should be read only so exiting.");return true;}
SCORM2004_objAPI=SCORM2004_GrabAPI();WriteToDebug("Calling SetValue");strElement=strElement+"";strValue=strValue+"";strResult=SCORM2004_objAPI.SetValue(strElement,strValue)
strResult=strResult+"";WriteToDebug("strResult="+strResult);if(strResult==SCORM2004_FALSE){WriteToDebug("Detected Failed call to SetValue");SCORM2004_SetErrorInfo();WriteToDebug("Error calling SetValue:");WriteToDebug("              strElement="+strElement);WriteToDebug("              strValue="+strValue);WriteToDebug("              Error Number="+intSCORM2004Error);WriteToDebug("              Error String="+strSCORM2004ErrorString);WriteToDebug("              Diagnostic="+strSCORM2004ErrorDiagnostic);return false;}
WriteToDebug("Returning true");return true;}
function SCORM2004_CallGetValue(strElement){var strResult
WriteToDebug("In SCORM2004_CallGetValue strElement="+strElement);SCORM2004_objAPI=SCORM2004_GrabAPI();WriteToDebug("Call GetValue");strElement=strElement+"";strResult=SCORM2004_objAPI.GetValue(strElement)+""
WriteToDebug("strResult="+strResult);intSCORM2004Error=SCORM2004_objAPI.GetLastError()
intSCORM2004Error=intSCORM2004Error+"";WriteToDebug("intSCORM2004Error="+intSCORM2004Error);if(intSCORM2004Error!=SCORM2004_NO_ERROR){WriteToDebug("Detected failed called to GetValue");SCORM2004_SetErrorInfo();WriteToDebug("Error calling LMSGetValue:");WriteToDebug("              strElement="+strElement);WriteToDebug("              Error Number="+intSCORM2004Error);WriteToDebug("              Error String="+strSCORM2004ErrorString);WriteToDebug("              Diagnostic="+strSCORM2004ErrorDiagnostic);}
WriteToDebug("Returning "+strResult);return strResult;}
function SCORM2004_CallCommit(){var strResult;WriteToDebug("In SCORM2004_CallCommit");SCORM2004_objAPI=SCORM2004_GrabAPI();WriteToDebug("Calling Commit");strResult=SCORM2004_objAPI.Commit("");strResult=strResult+"";WriteToDebug("strResult="+strResult);if(strResult==SCORM2004_FALSE){WriteToDebug("Detected failed call to Commit");SCORM2004_SetErrorInfo();WriteToDebug("Error calling Commit:");WriteToDebug("              Error Number="+intSCORM2004Error);WriteToDebug("              Error String="+strSCORM2004ErrorString);WriteToDebug("              Diagnostic="+strSCORM2004ErrorDiagnostic);return false;}
WriteToDebug("Returning true");return true;}
function SCORM2004_CallTerminate(){var strResult;WriteToDebug("In SCORM2004_CallTerminate");SCORM2004_objAPI=SCORM2004_GrabAPI();WriteToDebug("Calling Terminate");strResult=SCORM2004_objAPI.Terminate("");strResult=strResult+"";WriteToDebug("strResult="+strResult);if(strResult==SCORM2004_FALSE){WriteToDebug("Detected failed call to Terminate");SCORM2004_SetErrorInfo();WriteToDebug("Error calling Terminate:");WriteToDebug("              Error Number="+intSCORM2004Error);WriteToDebug("              Error String="+strSCORM2004ErrorString);WriteToDebug("              Diagnostic="+strSCORM2004ErrorDiagnostic);return false;}
WriteToDebug("Returning True");return true;}
function SCORM2004_ClearErrorInfo(){WriteToDebug("In SCORM2004_ClearErrorInfo");intSCORM2004Error=SCORM2004_NO_ERROR;strSCORM2004ErrorString="";strSCORM2004ErrorDiagnostic="";}
function SCORM2004_SetErrorInfo(){WriteToDebug("In SCORM2004_SetErrorInfo");intSCORM2004Error=SCORM2004_objAPI.GetLastError();strSCORM2004ErrorString=SCORM2004_objAPI.GetErrorString(intSCORM2004Error);strSCORM2004ErrorDiagnostic=SCORM2004_objAPI.GetDiagnostic("");intSCORM2004Error=intSCORM2004Error+"";strSCORM2004ErrorString=strSCORM2004ErrorString+"";strSCORM2004ErrorDiagnostic=strSCORM2004ErrorDiagnostic+"";WriteToDebug("intSCORM2004Error="+intSCORM2004Error);WriteToDebug("strSCORM2004ErrorString="+strSCORM2004ErrorString);WriteToDebug("strSCORM2004ErrorDiagnostic="+strSCORM2004ErrorDiagnostic);}
function SCORM2004_SetErrorInfoManually(intNum,strString,strDiagnostic){WriteToDebug("In SCORM2004_SetErrorInfoManually");WriteToDebug("ERROR-Num="+intNum);WriteToDebug("      String="+strString);WriteToDebug("      Diag="+strDiagnostic);intSCORM2004Error=intNum;strSCORM2004ErrorString=strString;strSCORM2004ErrorDiagnostic=strDiagnostic;}
function SCORM2004_GetLastError(){WriteToDebug("In SCORM2004_GetLastError");if(intSCORM2004Error==SCORM2004_NO_ERROR){WriteToDebug("Returning No Error");return NO_ERROR;}
else{WriteToDebug("Returning "+intSCORMError);return intSCORM2004Error;}}
function SCORM2004_GetLastErrorDesc(){WriteToDebug("In SCORM2004_GetLastErrorDesc, "+strSCORM2004ErrorString+"\n"+strSCORM2004ErrorDiagnostic);return strSCORM2004ErrorString+"\n"+strSCORM2004ErrorDiagnostic;}
function SCORM2004_GrabAPI(){WriteToDebug("In SCORM2004_GrabAPI");if(typeof(SCORM2004_objAPI)=="undefined"||SCORM2004_objAPI==null){WriteToDebug("Searching with Rustici Software algorithm");SCORM2004_objAPI=SCORM2004_GetAPI();}
if(typeof(SCORM2004_objAPI)=="undefined"||SCORM2004_objAPI==null||SCORM2004_objAPI==false){WriteToDebug("Searching with SearchForAPI");SCORM2004_objAPI=SCORM2004_SearchForAPI(window);}
WriteToDebug("Grab API, returning, found API = "+(SCORM2004_objAPI!=null));return SCORM2004_objAPI;}
function SCORM2004_ScanParentsForApi(win)
{var MAX_PARENTS_TO_SEARCH=500;var nParentsSearched=0;while((win.API_1484_11==null||win.API_1484_11==undefined)&&(win.parent!=null)&&(win.parent!=win)&&(nParentsSearched<=MAX_PARENTS_TO_SEARCH))
{nParentsSearched++;win=win.parent;}
return win.API_1484_11;}
function SCORM2004_GetAPI()
{var API=null;if((window.parent!=null)&&(window.parent!=window))
{API=SCORM2004_ScanParentsForApi(window.parent);}
if((API==null)&&(window.top.opener!=null))
{API=SCORM2004_ScanParentsForApi(window.top.opener);}
return API;}
function SCORM2004_SearchForAPI(wndLookIn){WriteToDebug("SCORM2004_SearchForAPI");var objAPITemp=null;var strDebugID="";strDebugID="Name="+wndLookIn.name+", href="+wndLookIn.location.href
objAPITemp=wndLookIn.API_1484_11;if(SCORM2004_APIFound(objAPITemp)){WriteToDebug("Found API in this window - "+strDebugID);return objAPITemp;}
if(SCORM2004_WindowHasParent(wndLookIn)){WriteToDebug("Searching Parent - "+strDebugID);objAPITemp=SCORM2004_SearchForAPI(wndLookIn.parent);}
if(SCORM2004_APIFound(objAPITemp)){WriteToDebug("Found API in a parent - "+strDebugID);return objAPITemp;}
if(SCORM2004_WindowHasOpener(wndLookIn)){WriteToDebug("Searching Opener - "+strDebugID);objAPITemp=SCORM2004_SearchForAPI(wndLookIn.opener);}
if(SCORM2004_APIFound(objAPITemp)){WriteToDebug("Found API in an opener - "+strDebugID);return objAPITemp;}
WriteToDebug("Looking in children - "+strDebugID);objAPITemp=SCORM2004_LookInChildren(wndLookIn);if(SCORM2004_APIFound(objAPITemp)){WriteToDebug("Found API in Children - "+strDebugID);return objAPITemp;}
WriteToDebug("Didn't find API in this window - "+strDebugID);return null;}
function SCORM2004_LookInChildren(wnd){WriteToDebug("SCORM2004_LookInChildren");var objAPITemp=null;var strDebugID="";strDebugID="Name="+wnd.name+", href="+wnd.location.href
for(var i=0;i<wnd.frames.length;i++){WriteToDebug("Looking in child frame "+i);objAPITemp=wnd.frames[i].API_1484_11;if(SCORM2004_APIFound(objAPITemp)){WriteToDebug("Found API in child frame of "+strDebugID);return objAPITemp;}
WriteToDebug("Looking in this child's children "+strDebugID);objAPITemp=SCORM2004_LookInChildren(wnd.frames[i]);if(SCORM2004_APIFound(objAPITemp)){WriteToDebug("API found in this child's children "+strDebugID);return objAPITemp;}}
return null;}
function SCORM2004_WindowHasOpener(wnd){WriteToDebug("In SCORM2004_WindowHasOpener");if((wnd.opener!=null)&&(wnd.opener!=wnd)&&(typeof(wnd.opener)!="undefined")){WriteToDebug("Window Does Have Opener");return true;}
else{WriteToDebug("Window Does Not Have Opener");return false;}}
function SCORM2004_WindowHasParent(wnd){WriteToDebug("In SCORM2004_WindowHasParent");if((wnd.parent!=null)&&(wnd.parent!=wnd)&&(typeof(wnd.parent)!="undefined")){WriteToDebug("Window Does Have Parent");return true;}
else{WriteToDebug("Window Does Not Have Parent");return false;}}
function SCORM2004_APIFound(obj){WriteToDebug("In SCORM2004_APIFound");if(obj==null||typeof(obj)=="undefined"){WriteToDebug("API NOT Found");return false;}
else{WriteToDebug("API Found");return true;}}
var STANDARD='SCORM';var SCORM_LOGOUT="logout";var SCORM_SUSPEND="suspend";var SCORM_NORMAL_EXIT="";var SCORM_TIMEOUT="time-out";var SCORM_PASSED="passed";var SCORM_FAILED="failed";var SCORM_COMPLETED="completed";var SCORM_BROWSED="browsed";var SCORM_INCOMPLETE="incomplete";var SCORM_NOT_ATTEMPTED="not attempted";var SCORM_CREDIT="credit";var SCORM_NO_CREDIT="no-credit";var SCORM_BROWSE="browse";var SCORM_NORMAL="normal";var SCORM_REVIEW="review";var SCORM_ENTRY_ABINITIO="ab-initio";var SCORM_ENTRY_RESUME="resume";var SCORM_ENTRY_NORMAL="";var SCORM_TLA_EXIT_MESSAGE="exit,message";var SCORM_TLA_EXIT_NO_MESSAGE="exit,no message";var SCORM_TLA_CONTINUE_MESSAGE="continue,message";var SCORM_TLA_CONTINUE_NO_MESSAGE="continue,no message";var SCORM_RESULT_CORRECT="correct";var SCORM_RESULT_WRONG="wrong";var SCORM_RESULT_UNANTICIPATED="unanticipated";var SCORM_RESULT_NEUTRAL="neutral";var SCORM_INTERACTION_TYPE_TRUE_FALSE="true-false";var SCORM_INTERACTION_TYPE_CHOICE="choice";var SCORM_INTERACTION_FILL_IN="fill-in";var SCORM_INTERACTION_TYPE_MATCHING="matching";var SCORM_INTERACTION_TYPE_PERFORMANCE="performance";var SCORM_INTERACTION_TYPE_SEQUENCING="sequencing";var SCORM_INTERACTION_TYPE_LIKERT="likert";var SCORM_INTERACTION_TYPE_NUMERIC="numeric";var SCORM_NO_ERROR="0";var SCORM_ERROR_INVALID_PREFERENCE="-1";var SCORM_ERROR_INVALID_STATUS="-2";var SCORM_ERROR_INVALID_SPEED="-3";var SCORM_ERROR_INVALID_TIMESPAN="-4";var SCORM_ERROR_INVALID_TIME_LIMIT_ACTION="-5";var SCORM_ERROR_INVALID_DECIMAL="-6";var SCORM_ERROR_INVALID_CREDIT="-7";var SCORM_ERROR_INVALID_LESSON_MODE="-8";var SCORM_ERROR_INVALID_ENTRY="-9";var SCORM_TRUE="true";var SCORM_FALSE="false";var SCORM_findAPITries=0;var SCORM_objAPI=null;var intSCORMError=SCORM_NO_ERROR;var strSCORMErrorString="";var strSCORMErrorDiagnostic="";var blnReviewModeSoReadOnly=false;function SCORM_Initialize(){var blnResult=true;WriteToDebug("In SCORM_Initialize");SCORM_ClearErrorInfo();WriteToDebug("Grabbing API");try{SCORM_objAPI=SCORM_GrabAPI();}
catch(e){WriteToDebug("Error grabbing 1.2 API-"+e.name+":"+e.message);}
if(typeof(SCORM_objAPI)=="undefined"||SCORM_objAPI==null){WriteToDebug("Unable to acquire SCORM API:")
WriteToDebug("SCORM_objAPI="+typeof(SCORM_objAPI));InitializeExecuted(false,"Error - unable to acquire LMS API, content may not play properly and results may not be recorded.  Please contact technical support.");return false;}
WriteToDebug("Calling LMSInit");blnResult=SCORM_CallLMSInitialize();if(!blnResult){WriteToDebug("ERROR Initializing LMS");InitializeExecuted(false,"Error initializing communications with LMS");return false;}
if(SCORM_GetLessonMode()!=MODE_REVIEW){if(SCORM_IsContentInBrowseMode()){WriteToDebug("Setting Status to Browsed");blnResult=SCORM_CallLMSSetValue("cmi.core.lesson_status",SCORM_BROWSED);}
else{if(SCORM_GetStatus()==LESSON_STATUS_NOT_ATTEMPTED){WriteToDebug("Setting Status to Incomplete");blnResult=SCORM_CallLMSSetValue("cmi.core.lesson_status",SCORM_INCOMPLETE);}}
blnResult=SCORM_CallLMSSetValue("cmi.core.exit",SCORM_TranslateExitTypeToSCORM(DEFAULT_EXIT_TYPE))&&blnResult;}
else{if(!(typeof(REVIEW_MODE_IS_READ_ONLY)=="undefined")&&REVIEW_MODE_IS_READ_ONLY===true){blnReviewModeSoReadOnly=true;}}
WriteToDebug("Calling InitializeExecuted with parameter-"+blnResult);InitializeExecuted(blnResult,"");return;}
function SCORM_Finish(strExitType,blnStatusWasSet){var strStatusAfterCompletion;var blnResult=true;WriteToDebug("In SCORM_Finish strExitType="+strExitType+", blnStatusWasSet="+blnStatusWasSet);SCORM_ClearErrorInfo();if((strExitType==EXIT_TYPE_FINISH)&&!blnStatusWasSet){WriteToDebug("Getting completion status");strStatusAfterCompletion=SCORM_GetCompletionStatus();WriteToDebug("Setting completion status to "+strStatusAfterCompletion);blnResult=SCORM_CallLMSSetValue("cmi.core.lesson_status",strStatusAfterCompletion)&&blnResult;}
WriteToDebug("Setting Exit");blnResult=SCORM_CallLMSSetValue("cmi.core.exit",SCORM_TranslateExitTypeToSCORM(strExitType))&&blnResult;WriteToDebug("Calling Commit");blnResult=SCORM_CallLMSCommit()&&blnResult;WriteToDebug("Calling Finish");blnResult=SCORM_CallLMSFinish()&&blnResult;WriteToDebug("Returning "+blnResult);return blnResult;}
function SCORM_CommitData(){WriteToDebug("In SCORM_CommitData");SCORM_ClearErrorInfo();return SCORM_CallLMSCommit();}
function SCORM_GetStudentID(){WriteToDebug("In SCORM_GetStudentID");SCORM_ClearErrorInfo();return SCORM_CallLMSGetValue("cmi.core.student_id");}
function SCORM_GetStudentName(){WriteToDebug("In SCORM_GetStudentName");SCORM_ClearErrorInfo();return SCORM_CallLMSGetValue("cmi.core.student_name");}
function SCORM_GetBookmark(){WriteToDebug("In SCORM_GetBookmark");SCORM_ClearErrorInfo();return SCORM_CallLMSGetValue("cmi.core.lesson_location");}
function SCORM_SetBookmark(strBookmark){WriteToDebug("In SCORM_SetBookmark strBookmark="+strBookmark);SCORM_ClearErrorInfo();return SCORM_CallLMSSetValue("cmi.core.lesson_location",strBookmark);}
function SCORM_GetDataChunk(){WriteToDebug("In SCORM_GetDataChunk");SCORM_ClearErrorInfo();return SCORM_CallLMSGetValue("cmi.suspend_data");}
function SCORM_SetDataChunk(strData){WriteToDebug("In SCORM_SetDataChunk");SCORM_ClearErrorInfo();if(USE_STRICT_SUSPEND_DATA_LIMITS==true){if(strData.length>4096){WriteToDebug("SCORM_SetDataChunk - suspend_data too large (4096 character limit for SCORM 1.2)");return false;}else{return SCORM_CallLMSSetValue("cmi.suspend_data",strData);}}else{return SCORM_CallLMSSetValue("cmi.suspend_data",strData);}}
function SCORM_GetLaunchData(){WriteToDebug("In SCORM_GetLaunchData");SCORM_ClearErrorInfo();return SCORM_CallLMSGetValue("cmi.launch_data");}
function SCORM_GetComments(){WriteToDebug("In SCORM_GetComments");SCORM_ClearErrorInfo();return SCORM_CallLMSGetValue("cmi.comments");}
function SCORM_WriteComment(strComment){WriteToDebug("In SCORM_WriteComment strComment="+strComment);SCORM_ClearErrorInfo();return SCORM_CallLMSSetValue("cmi.comments",strComment);}
function SCORM_GetLMSComments(){WriteToDebug("In SCORM_GetLMSComments");SCORM_ClearErrorInfo();return SCORM_CallLMSGetValue("cmi.comments_from_lms");}
function SCORM_GetAudioPlayPreference(){var intTempPreference;WriteToDebug("In SCORM_GetAudioPlayPreference");SCORM_ClearErrorInfo();intTempPreference=SCORM_CallLMSGetValue("cmi.student_preference.audio");if(intTempPreference==""){intTempPreference=0;}
intTempPreference=parseInt(intTempPreference,10);WriteToDebug("intTempPreference="+intTempPreference);if(intTempPreference>0){WriteToDebug("Returning On");return PREFERENCE_ON;}
else if(intTempPreference==0){WriteToDebug("Returning Default");return PREFERENCE_DEFAULT;}
else if(intTempPreference<0){WriteToDebug("returning Off");return PREFERENCE_OFF;}
else{WriteToDebug("Error: Invalid preference");SCORM_SetErrorInfoManually(SCORM_ERROR_INVALID_PREFERENCE,"Invalid audio preference received from LMS","intTempPreference="+intTempPreference);return null;}}
function SCORM_GetAudioVolumePreference(){var intTempPreference;WriteToDebug("In SCORM_GetAudioVollumePreference");SCORM_ClearErrorInfo();intTempPreference=SCORM_CallLMSGetValue("cmi.student_preference.audio");WriteToDebug("intTempPreference="+intTempPreference);if(intTempPreference==""){intTempPreference=100;}
intTempPreference=parseInt(intTempPreference,10);if(intTempPreference<=0){WriteToDebug("Setting to 100");intTempPreference=100;}
if(!(intTempPreference>0&&intTempPreference<=100)){WriteToDebug("ERROR: invalid preference");SCORM_SetErrorInfoManually(SCORM_ERROR_INVALID_PREFERENCE,"Invalid audio preference received from LMS","intTempPreference="+intTempPreference);return null;}
WriteToDebug("Returning "+intTempPreference);return intTempPreference;}
function SCORM_SetAudioPreference(PlayPreference,intPercentOfMaxVolume){WriteToDebug("In SCORM_SetAudioPreference PlayPreference="+PlayPreference+", intPercentOfMaxVolume="+intPercentOfMaxVolume);SCORM_ClearErrorInfo();if(PlayPreference==PREFERENCE_OFF){WriteToDebug("Setting percent to -1 - OFF");intPercentOfMaxVolume=-1;}
return SCORM_CallLMSSetValue("cmi.student_preference.audio",intPercentOfMaxVolume);}
function SCORM_SetLanguagePreference(strLanguage){WriteToDebug("In SCORM_SetLanguagePreference strLanguage="+strLanguage);SCORM_ClearErrorInfo();return SCORM_CallLMSSetValue("cmi.student_preference.language",strLanguage);}
function SCORM_GetLanguagePreference(){WriteToDebug("In SCORM_GetLanguagePreference");SCORM_ClearErrorInfo();return SCORM_CallLMSGetValue("cmi.student_preference.language");}
function SCORM_SetSpeedPreference(intPercentOfMax){var intSCORMSpeed;WriteToDebug("In SCORM_SetSpeedPreference intPercentOfMax="+intPercentOfMax);SCORM_ClearErrorInfo();intSCORMSpeed=(intPercentOfMax*2)-100;WriteToDebug("intSCORMSpeed="+intSCORMSpeed);return SCORM_CallLMSSetValue("cmi.student_preference.speed",intSCORMSpeed);}
function SCORM_GetSpeedPreference(){var intSCORMSpeed;var intPercentOfMax;WriteToDebug("In SCORM_GetSpeedPreference");SCORM_ClearErrorInfo();intSCORMSpeed=SCORM_CallLMSGetValue("cmi.student_preference.speed");WriteToDebug("intSCORMSpeed="+intSCORMSpeed);if(intSCORMSpeed==""){WriteToDebug("Detected empty string, defaulting to 100");intSCORMSpeed=100;}
if(!ValidInteger(intSCORMSpeed)){WriteToDebug("ERROR - invalid integer");SCORM_SetErrorInfoManually(SCORM_ERROR_INVALID_SPEED,"Invalid speed preference received from LMS - not an integer","intSCORMSpeed="+intSCORMSpeed);return null;}
intSCORMSpeed=parseInt(intSCORMSpeed,10);if(intSCORMSpeed<-100||intSCORMSpeed>100){WriteToDebug("ERROR - out of range");SCORM_SetErrorInfoManually(SCORM_ERROR_INVALID_SPEED,"Invalid speed preference received from LMS - out of range","intSCORMSpeed="+intSCORMSpeed);return null;}
intPercentOfMax=(intSCORMSpeed+100)/2;intPercentOfMax=parseInt(intPercentOfMax,10);WriteToDebug("Returning "+intPercentOfMax);return intPercentOfMax;}
function SCORM_SetTextPreference(intPreference){WriteToDebug("In SCORM_SetTextPreference intPreference="+intPreference);SCORM_ClearErrorInfo();return SCORM_CallLMSSetValue("cmi.student_preference.text",intPreference);}
function SCORM_GetTextPreference(){var intTempPreference;WriteToDebug("In SCORM_GetTextPreference");SCORM_ClearErrorInfo();intTempPreference=SCORM_CallLMSGetValue("cmi.student_preference.text");intTempPreference=parseInt(intTempPreference,10);WriteToDebug("intTempPreference="+intTempPreference);if(intTempPreference>0){WriteToDebug("Returning On");return PREFERENCE_ON;}
else if(intTempPreference==0||intTempPreference==""){WriteToDebug("Returning Default");return PREFERENCE_DEFAULT;}
else if(intTempPreference<0){WriteToDebug("returning Off");return PREFERENCE_OFF;}
else{WriteToDebug("Error: Invalid preference");SCORM_SetErrorInfoManually(SCORM_ERROR_INVALID_PREFERENCE,"Invalid text preference received from LMS","intTempPreference="+intTempPreference);return null;}}
function SCORM_GetPreviouslyAccumulatedTime(){var strCMITime;var intMilliseconds;WriteToDebug("In SCORM_GetPreviouslyAccumulatedTime");SCORM_ClearErrorInfo();strCMITime=SCORM_CallLMSGetValue("cmi.core.total_time")
WriteToDebug("strCMITime="+strCMITime);if(!IsValidCMITimeSpan(strCMITime)){WriteToDebug("ERROR - Invalid CMITimeSpan");SCORM_SetErrorInfoManually(SCORM_ERROR_INVALID_TIMESPAN,"Invalid timespan received from LMS","strTime="+strCMITime);return null;}
intMilliseconds=ConvertCMITimeSpanToMS(strCMITime);WriteToDebug("Returning "+intMilliseconds);return intMilliseconds;}
function SCORM_SaveTime(intMilliSeconds){var strCMITime;WriteToDebug("In SCORM_SaveTime intMilliSeconds="+intMilliSeconds);SCORM_ClearErrorInfo();strCMITime=ConvertMilliSecondsToSCORMTime(intMilliSeconds,true);WriteToDebug("strCMITime="+strCMITime);return SCORM_CallLMSSetValue("cmi.core.session_time",strCMITime);}
function SCORM_GetMaxTimeAllowed(){var strCMITime;var intMilliseconds;WriteToDebug("In SCORM_GetMaxTimeAllowed");SCORM_ClearErrorInfo();strCMITime=SCORM_CallLMSGetValue("cmi.student_data.max_time_allowed")
WriteToDebug("strCMITime="+strCMITime);if(strCMITime==""){strCMITime="9999:99:99.99";}
if(!IsValidCMITimeSpan(strCMITime)){WriteToDebug("ERROR - Invalid CMITimeSpan");SCORM_SetErrorInfoManually(SCORM_ERROR_INVALID_TIMESPAN,"Invalid timespan received from LMS","strTime="+strCMITime);return null;}
intMilliseconds=ConvertCMITimeSpanToMS(strCMITime);WriteToDebug("intMilliseconds="+intMilliseconds);return intMilliseconds;}
function SCORM_DisplayMessageOnTimeout(){var strTLA;SCORM_ClearErrorInfo();WriteToDebug("In SCORM_DisplayMessageOnTimeout");strTLA=SCORM_CallLMSGetValue("cmi.student_data.time_limit_action");WriteToDebug("strTLA="+strTLA);if(strTLA==SCORM_TLA_EXIT_MESSAGE||strTLA==SCORM_TLA_CONTINUE_MESSAGE){WriteToDebug("returning true");return true;}
else if(strTLA==SCORM_TLA_EXIT_NO_MESSAGE||strTLA==SCORM_TLA_CONTINUE_NO_MESSAGE||strTLA==""){WriteToDebug("returning false");return false;}
else{WriteToDebug("Error invalid TLA");SCORM_SetErrorInfoManually(SCORM_ERROR_INVALID_TIME_LIMIT_ACTION,"Invalid time limit action received from LMS","strTLA="+strTLA);return null;}}
function SCORM_ExitOnTimeout(){var strTLA;WriteToDebug("In SCORM_ExitOnTimeout");SCORM_ClearErrorInfo();strTLA=SCORM_CallLMSGetValue("cmi.student_data.time_limit_action");WriteToDebug("strTLA="+strTLA);if(strTLA==SCORM_TLA_EXIT_MESSAGE||strTLA==SCORM_TLA_EXIT_NO_MESSAGE){WriteToDebug("returning true");return true;}
else if(strTLA==SCORM_TLA_CONTINUE_MESSAGE||strTLA==SCORM_TLA_CONTINUE_NO_MESSAGE||strTLA==""){WriteToDebug("returning false");return false;}
else{WriteToDebug("ERROR invalid TLA");SCORM_SetErrorInfoManually(SCORM_ERROR_INVALID_TIME_LIMIT_ACTION,"Invalid time limit action received from LMS","strTLA="+strTLA);return null;}}
function SCORM_GetPassingScore(){var fltScore;WriteToDebug("In SCORM_GetPassingScore");SCORM_ClearErrorInfo();fltScore=SCORM_CallLMSGetValue("cmi.student_data.mastery_score")
WriteToDebug("fltScore="+fltScore);if(fltScore==""){fltScore=0;}
if(!IsValidDecimal(fltScore)){WriteToDebug("Error - score is not a valid decimal");SCORM_SetErrorInfoManually(SCORM_ERROR_INVALID_DECIMAL,"Invalid mastery score received from LMS","fltScore="+fltScore);return null;}
fltScore=parseFloat(fltScore);WriteToDebug("returning fltScore");return fltScore;}
function SCORM_SetScore(intScore,intMaxScore,intMinScore){var blnResult;intScore=RoundToPrecision(intScore,7);intMaxScore=RoundToPrecision(intMaxScore,7);intMinScore=RoundToPrecision(intMinScore,7);WriteToDebug("In SCORM_SetScore intScore="+intScore+", intMaxScore="+intMaxScore+", intMinScore="+intMinScore);SCORM_ClearErrorInfo();blnResult=SCORM_CallLMSSetValue("cmi.core.score.raw",intScore);blnResult=SCORM_CallLMSSetValue("cmi.core.score.max",intMaxScore)&&blnResult;blnResult=SCORM_CallLMSSetValue("cmi.core.score.min",intMinScore)&&blnResult;WriteToDebug("Returning "+blnResult);return blnResult;}
function SCORM_GetScore(){WriteToDebug("In SCORM_GetScore");SCORM_ClearErrorInfo();return SCORM_CallLMSGetValue("cmi.core.score.raw");}
function SCORM_SetPointBasedScore(intScore,intMaxScore,intMinScore){WriteToDebug("SCORM_SetPointBasedScore - SCORM 1.1 and 1.2 do not support SetPointBasedScore, falling back to SetScore");return SCORM_SetScore(intScore,intMaxScore,intMinScore);}
function SCORM_GetScaledScore(intScore,intMaxScore,intMinScore){WriteToDebug("SCORM_GetScaledScore - SCORM 1.1 and 1.2 do not support GetScaledScore, returning false");return false;}
function SCORM_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,scormInteractionType,strAlternateResponse,strAlternateCorrectResponse){var blnResult;var blnTempResult;var intInteractionIndex;var strResult;SCORM_ClearErrorInfo();intInteractionIndex=SCORM_CallLMSGetValue("cmi.interactions._count");WriteToDebug("intInteractionIndex="+intInteractionIndex);if(intInteractionIndex==""){WriteToDebug("Setting Interaction Index to 0");intInteractionIndex=0;}
if(IsNumeric(blnCorrect)){strResult=blnCorrect;}
else{if(blnCorrect==true||blnCorrect==INTERACTION_RESULT_CORRECT){strResult=SCORM_RESULT_CORRECT;}
else if(blnCorrect==""||blnCorrect=="false"||blnCorrect==INTERACTION_RESULT_WRONG){strResult=SCORM_RESULT_WRONG;}
else if(blnCorrect==INTERACTION_RESULT_UNANTICIPATED){strResult=SCORM_RESULT_UNANTICIPATED;}
else if(blnCorrect==INTERACTION_RESULT_NEUTRAL){strResult=SCORM_RESULT_NEUTRAL;}}
WriteToDebug("strResult="+strResult);blnResult=SCORM_CallLMSSetValue("cmi.interactions."+intInteractionIndex+".id",strID);blnResult=SCORM_CallLMSSetValue("cmi.interactions."+intInteractionIndex+".type",scormInteractionType)&&blnResult;blnTempResult=SCORM_CallLMSSetValue("cmi.interactions."+intInteractionIndex+".student_response",strResponse);if(blnTempResult==false){blnTempResult=SCORM_CallLMSSetValue("cmi.interactions."+intInteractionIndex+".student_response",strAlternateResponse);}
blnResult=blnResult&&blnTempResult;if(strCorrectResponse!=undefined&&strCorrectResponse!=null&&strCorrectResponse!=""){blnTempResult=SCORM_CallLMSSetValue("cmi.interactions."+intInteractionIndex+".correct_responses.0.pattern",strCorrectResponse);if(blnTempResult==false){blnTempResult=SCORM_CallLMSSetValue("cmi.interactions."+intInteractionIndex+".correct_responses.0.pattern",strAlternateCorrectResponse);}
blnResult=blnResult&&blnTempResult;}
if(strResult!=undefined&&strResult!=null&&strResult!=""){blnResult=SCORM_CallLMSSetValue("cmi.interactions."+intInteractionIndex+".result",strResult)&&blnResult;}
if(intWeighting!=undefined&&intWeighting!=null&&intWeighting!=""){blnResult=SCORM_CallLMSSetValue("cmi.interactions."+intInteractionIndex+".weighting",intWeighting)&&blnResult;}
if(intLatency!=undefined&&intLatency!=null&&intLatency!=""){blnResult=SCORM_CallLMSSetValue("cmi.interactions."+intInteractionIndex+".latency",ConvertMilliSecondsToSCORMTime(intLatency,true))&&blnResult;}
if(strLearningObjectiveID!=undefined&&strLearningObjectiveID!=null&&strLearningObjectiveID!=""){blnResult=SCORM_CallLMSSetValue("cmi.interactions."+intInteractionIndex+".objectives.0.id",strLearningObjectiveID)&&blnResult;}
blnResult=SCORM_CallLMSSetValue("cmi.interactions."+intInteractionIndex+".time",ConvertDateToCMITime(dtmTime))&&blnResult;WriteToDebug("Returning "+blnResult);return blnResult;}
function SCORM_RecordTrueFalseInteraction(strID,blnResponse,blnCorrect,blnCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In SCORM_RecordTrueFalseInteraction strID="+strID+", strResponse="+strResponse+", blnCorrect="+blnCorrect+", strCorrectResponse="+strCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var strResponse="";var strCorrectResponse=null;if(blnResponse==true){strResponse="t";}
else{strResponse="f";}
if(blnCorrectResponse==true){strCorrectResponse="t";}
else if(blnCorrectResponse==false){strCorrectResponse="f";}
return SCORM_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,SCORM_INTERACTION_TYPE_TRUE_FALSE,strResponse,strCorrectResponse);}
function SCORM_RecordMultipleChoiceInteraction(strID,aryResponse,blnCorrect,aryCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In SCORM_RecordMultipleChoiceInteraction strID="+strID+", aryResponse="+aryResponse+", blnCorrect="+blnCorrect+", aryCorrectResponse="+aryCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var strResponse="";var strResponseLong="";var strCorrectResponse="";var strCorrectResponseLong="";for(var i=0;i<aryResponse.length;i++){if(strResponse.length>0){strResponse+=",";}
if(strResponseLong.length>0){strResponseLong+=",";}
strResponse+=aryResponse[i].Short;strResponseLong+=aryResponse[i].Long;}
for(var i=0;i<aryCorrectResponse.length;i++){if(strCorrectResponse.length>0){strCorrectResponse+=",";}
if(strCorrectResponseLong.length>0){strCorrectResponseLong+=",";}
strCorrectResponse+=aryCorrectResponse[i].Short;strCorrectResponseLong+=aryCorrectResponse[i].Long;}
var blnSuccessfullySaved;blnSuccessfullySaved=SCORM_RecordInteraction(strID,strResponseLong,blnCorrect,strCorrectResponseLong,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,SCORM_INTERACTION_TYPE_CHOICE,strResponse,strCorrectResponse);return blnSuccessfullySaved;}
function SCORM_RecordFillInInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In SCORM_RecordFillInInteraction strID="+strID+", strResponse="+strResponse+", blnCorrect="+blnCorrect+", strCorrectResponse="+strCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);strResponse=new String(strResponse);if(strResponse.length>255){strResponse=strResponse.substr(0,255);}
if(strCorrectResponse==null){strCorrectResponse="";}
strCorrectResponse=new String(strCorrectResponse);if(strCorrectResponse.length>255){strCorrectResponse=strCorrectResponse.substr(0,255);}
return SCORM_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,SCORM_INTERACTION_FILL_IN,strResponse,strCorrectResponse);}
function SCORM_RecordMatchingInteraction(strID,aryResponse,blnCorrect,aryCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In SCORM_RecordMatchingInteraction strID="+strID+", aryResponse="+aryResponse+", blnCorrect="+blnCorrect+", aryCorrectResponse="+aryCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var strResponse="";var strResponseLong="";var strCorrectResponse="";var strCorrectResponseLong="";for(var i=0;i<aryResponse.length;i++){if(strResponse.length>0){strResponse+=",";}
if(strResponseLong.length>0){strResponseLong+=",";}
strResponse+=aryResponse[i].Source.Short+"."+aryResponse[i].Target.Short;strResponseLong+=aryResponse[i].Source.Long+"."+aryResponse[i].Target.Long;}
for(var i=0;i<aryCorrectResponse.length;i++){if(strCorrectResponse.length>0){strCorrectResponse+=",";}
if(strCorrectResponseLong.length>0){strCorrectResponseLong+=",";}
strCorrectResponse+=aryCorrectResponse[i].Source.Short+"."+aryCorrectResponse[i].Target.Short;strCorrectResponseLong+=aryCorrectResponse[i].Source.Long+"."+aryCorrectResponse[i].Target.Long;}
var blnSuccessfullySaved;blnSuccessfullySaved=SCORM_RecordInteraction(strID,strResponseLong,blnCorrect,strCorrectResponseLong,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,SCORM_INTERACTION_TYPE_MATCHING,strResponse,strCorrectResponse);return blnSuccessfullySaved;}
function SCORM_RecordPerformanceInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In SCORM_RecordPerformanceInteraction strID="+strID+", strResponse="+strResponse+", blnCorrect="+blnCorrect+", strCorrectResponse="+strCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);strResponse=new String(strResponse);if(strResponse.length>255){strResponse=strResponse.substr(0,255);}
if(strCorrectResponse==null){strCorrectResponse="";}
strCorrectResponse=new String(strCorrectResponse);if(strCorrectResponse.length>255){strCorrectResponse=strCorrectResponse.substr(0,255);}
return SCORM_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,SCORM_INTERACTION_TYPE_PERFORMANCE,strResponse,strCorrectResponse);}
function SCORM_RecordSequencingInteraction(strID,aryResponse,blnCorrect,aryCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In SCORM_RecordSequencingInteraction strID="+strID+", aryResponse="+aryResponse+", blnCorrect="+blnCorrect+", aryCorrectResponse="+aryCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var strResponse="";var strResponseLong="";var strCorrectResponse="";var strCorrectResponseLong="";for(var i=0;i<aryResponse.length;i++){if(strResponse.length>0){strResponse+=",";}
if(strResponseLong.length>0){strResponseLong+=",";}
strResponse+=aryResponse[i].Short;strResponseLong+=aryResponse[i].Long;}
for(var i=0;i<aryCorrectResponse.length;i++){if(strCorrectResponse.length>0){strCorrectResponse+=",";}
if(strCorrectResponseLong.length>0){strCorrectResponseLong+=",";}
strCorrectResponse+=aryCorrectResponse[i].Short;strCorrectResponseLong+=aryCorrectResponse[i].Long;}
var blnSuccessfullySaved;blnSuccessfullySaved=SCORM_RecordInteraction(strID,strResponseLong,blnCorrect,strCorrectResponseLong,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,SCORM_INTERACTION_TYPE_SEQUENCING,strResponse,strCorrectResponse);return blnSuccessfullySaved;}
function SCORM_RecordLikertInteraction(strID,response,blnCorrect,correctResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In SCORM_RecordLikertInteraction strID="+strID+", response="+response+", blnCorrect="+blnCorrect+", correctResponse="+correctResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var strResponse;var strResponseLong;var strCorrectResponse="";var strCorrectResponseLong="";strResponse=response.Short;strResponseLong=response.Long;if(correctResponse!=null){strCorrectResponse=correctResponse.Short;strCorrectResponseLong=correctResponse.Long;}
var blnSuccessfullySaved;blnSuccessfullySaved=SCORM_RecordInteraction(strID,strResponseLong,blnCorrect,strCorrectResponseLong,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,SCORM_INTERACTION_TYPE_LIKERT,strResponse,strCorrectResponse);return blnSuccessfullySaved;}
function SCORM_RecordNumericInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In SCORM_RecordNumericInteraction strID="+strID+", strResponse="+strResponse+", blnCorrect="+blnCorrect+", strCorrectResponse="+strCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);return SCORM_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,SCORM_INTERACTION_TYPE_NUMERIC,strResponse,strCorrectResponse);}
function SCORM_GetEntryMode(){var strEntry;WriteToDebug("In SCORM_GetEntryMode");SCORM_ClearErrorInfo();strEntry=SCORM_CallLMSGetValue("cmi.core.entry");WriteToDebug("strEntry="+strEntry);if(strEntry==SCORM_ENTRY_ABINITIO){WriteToDebug("Returning first time");return ENTRY_FIRST_TIME;}
else if(strEntry==SCORM_ENTRY_RESUME){WriteToDebug("Returning resume");return ENTRY_RESUME;}
else if(strEntry==SCORM_ENTRY_NORMAL){WriteToDebug("returning normal");return ENTRY_REVIEW;}
else{WriteToDebug("ERROR - invalide entry mode");SCORM_SetErrorInfoManually(SCORM_ERROR_INVALID_ENTRY,"Invalid entry vocab received from LMS","strEntry="+strEntry);return null;}}
function SCORM_GetLessonMode(){var strLessonMode;WriteToDebug("In SCORM_GetLessonMode");SCORM_ClearErrorInfo();strLessonMode=SCORM_CallLMSGetValue("cmi.core.lesson_mode");WriteToDebug("strLessonMode="+strLessonMode);if(strLessonMode==SCORM_BROWSE){WriteToDebug("Returning browse");return MODE_BROWSE;}
else if(strLessonMode==SCORM_NORMAL){WriteToDebug("returning normal");return MODE_NORMAL;}
else if(strLessonMode==SCORM_REVIEW){WriteToDebug("Returning Review");return MODE_REVIEW;}
else{WriteToDebug("ERROR - invalid lesson mode");SCORM_SetErrorInfoManually(SCORM_ERROR_INVALID_LESSON_MODE,"Invalid lesson_mode vocab received from LMS","strLessonMode="+strLessonMode);return null;}}
function SCORM_GetTakingForCredit(){var strCredit;WriteToDebug("In SCORM_GetTakingForCredit");SCORM_ClearErrorInfo();strCredit=SCORM_CallLMSGetValue("cmi.core.credit");WriteToDebug("strCredit="+strCredit);if(strCredit=="credit"){WriteToDebug("Returning true");return true;}
else if(strCredit=="no-credit"){WriteToDebug("Returning false");return false;}
else{WriteToDebug("ERROR - invalid credit");SCORM_SetErrorInfoManually(SCORM_ERROR_INVALID_CREDIT,"Invalid credit vocab received from LMS","strCredit="+strCredit);return null;}}
function SCORM_SetObjectiveScore(strObjectiveID,intScore,intMaxScore,intMinScore){var intObjectiveIndex;var blnResult;intScore=RoundToPrecision(intScore,7);intMaxScore=RoundToPrecision(intMaxScore,7);intMinScore=RoundToPrecision(intMinScore,7);WriteToDebug("In SCORM_SetObjectiveScore, strObejctiveID="+strObjectiveID+", intScore="+intScore+", intMaxScore="+intMaxScore+", intMinScore="+intMinScore);SCORM_ClearErrorInfo();intObjectiveIndex=SCORM_FindObjectiveIndexFromID(strObjectiveID);WriteToDebug("intObjectiveIndex="+intObjectiveIndex);blnResult=SCORM_CallLMSSetValue("cmi.objectives."+intObjectiveIndex+".id",strObjectiveID);blnResult=SCORM_CallLMSSetValue("cmi.objectives."+intObjectiveIndex+".score.raw",intScore)&&blnResult;blnResult=SCORM_CallLMSSetValue("cmi.objectives."+intObjectiveIndex+".score.max",intMaxScore)&&blnResult;blnResult=SCORM_CallLMSSetValue("cmi.objectives."+intObjectiveIndex+".score.min",intMinScore)&&blnResult;WriteToDebug("Returning "+blnResult);return blnResult;}
function SCORM_SetObjectiveDescription(strObjectiveID,strObjectiveDescription){var intObjectiveIndex;var blnResult;WriteToDebug("In SCORM_SetObjectiveDescription, strObjectiveDescription="+strObjectiveDescription);WriteToDebug("Objective Descriptions are not supported prior to SCORM 2004");SCORM_ClearErrorInfo();blnResult=SCORM_TRUE;WriteToDebug("Returning "+blnResult);return blnResult;}
function SCORM_SetObjectiveStatus(strObjectiveID,Lesson_Status){var intObjectiveIndex;var blnResult;var strSCORMStatus="";WriteToDebug("In SCORM_SetObjectiveStatus strObjectiveID="+strObjectiveID+", Lesson_Status="+Lesson_Status);SCORM_ClearErrorInfo();intObjectiveIndex=SCORM_FindObjectiveIndexFromID(strObjectiveID);WriteToDebug("intObjectiveIndex="+intObjectiveIndex);if(Lesson_Status==LESSON_STATUS_PASSED){strSCORMStatus=SCORM_PASSED;}
else if(Lesson_Status==LESSON_STATUS_FAILED){strSCORMStatus=SCORM_FAILED;}
else if(Lesson_Status==LESSON_STATUS_COMPLETED){strSCORMStatus=SCORM_COMPLETED;}
else if(Lesson_Status==LESSON_STATUS_BROWSED){strSCORMStatus=SCORM_BROWSED;}
else if(Lesson_Status==LESSON_STATUS_INCOMPLETE){strSCORMStatus=SCORM_INCOMPLETE;}
else if(Lesson_Status==LESSON_STATUS_NOT_ATTEMPTED){strSCORMStatus=SCORM_NOT_ATTEMPTED;}
WriteToDebug("strSCORMStatus="+strSCORMStatus);blnResult=SCORM_CallLMSSetValue("cmi.objectives."+intObjectiveIndex+".id",strObjectiveID);blnResult=SCORM_CallLMSSetValue("cmi.objectives."+intObjectiveIndex+".status",strSCORMStatus)&&blnResult;WriteToDebug("Returning "+blnResult);return blnResult;}
function SCORM_GetObjectiveScore(strObjectiveID){var intObjectiveIndex;WriteToDebug("In SCORM_GetObjectiveScore, strObejctiveID="+strObjectiveID);SCORM_ClearErrorInfo();intObjectiveIndex=SCORM_FindObjectiveIndexFromID(strObjectiveID);WriteToDebug("intObjectiveIndex="+intObjectiveIndex);return SCORM_CallLMSGetValue("cmi.objectives."+intObjectiveIndex+".score.raw");}
function SCORM_GetObjectiveDescription(strObjectiveID){WriteToDebug("In SCORM_GetObjectiveDescription, strObejctiveID="+strObjectiveID);WriteToDebug("ObjectiveDescription is not supported prior to SCORM 2004");return"";}
function SCORM_GetObjectiveStatus(strObjectiveID){var intObjectiveIndex;var strStatus;WriteToDebug("In SCORM_GetObjectiveStatus, strObejctiveID="+strObjectiveID);SCORM_ClearErrorInfo();intObjectiveIndex=SCORM_FindObjectiveIndexFromID(strObjectiveID);WriteToDebug("intObjectiveIndex="+intObjectiveIndex);strStatus=SCORM_CallLMSGetValue("cmi.objectives."+intObjectiveIndex+".status");if(strStatus==SCORM_PASSED){WriteToDebug("returning Passed");return LESSON_STATUS_PASSED;}
else if(strStatus==SCORM_FAILED){WriteToDebug("Returning Failed");return LESSON_STATUS_FAILED;}
else if(strStatus==SCORM_COMPLETED){WriteToDebug("Returning Completed");return LESSON_STATUS_COMPLETED;}
else if(strStatus==SCORM_BROWSED){WriteToDebug("Returning Browsed");return LESSON_STATUS_BROWSED;}
else if(strStatus==SCORM_INCOMPLETE){WriteToDebug("Returning Incomplete");return LESSON_STATUS_INCOMPLETE;}
else if(strStatus==SCORM_NOT_ATTEMPTED||strStatus==""){WriteToDebug("Returning Not Attempted");return LESSON_STATUS_NOT_ATTEMPTED;}
else{WriteToDebug("ERROR - status not found");SCORM_SetErrorInfoManually(SCORM_ERROR_INVALID_STATUS,"Invalid objective status received from LMS or initial status not yet recorded for objective","strStatus="+strStatus);return null;}}
function SCORM_FindObjectiveIndexFromID(strObjectiveID){var intCount;var i;var strTempID;WriteToDebug("In SCORM_FindObjectiveIndexFromID");intCount=SCORM_CallLMSGetValue("cmi.objectives._count");if(intCount==""){WriteToDebug("Setting intCount=0");return 0;}
intCount=parseInt(intCount,10);WriteToDebug("intCount="+intCount);for(i=0;i<intCount;i++){WriteToDebug("Checking index "+i);strTempID=SCORM_CallLMSGetValue("cmi.objectives."+i+".id");WriteToDebug("ID="+strTempID);if(strTempID==strObjectiveID){WriteToDebug("Found Matching index");return i;}}
WriteToDebug("Did not find match, returning count");return intCount;}
function SCORM_FindInteractionIndexFromID(strInteractionID){WriteToDebug("SCORM_FindInteractionIndexFromID - SCORM does not support interaction retrieval, returning null");return null;}
function SCORM_GetInteractionType(strInteractionID)
{WriteToDebug("SCORM_GetInteractionType - SCORM does not support interaction retrieval, returning empty string");return'';}
function SCORM_GetInteractionTimestamp(strInteractionID)
{WriteToDebug("SCORM_GetInteractionTimestamp - SCORM does not support interaction retrieval, returning empty string");return'';}
function SCORM_GetInteractionCorrectResponses(strInteractionID)
{WriteToDebug("SCORM_GetInteractionCorrectResponses - SCORM does not support interaction retrieval, returning empty array");return new Array();}
function SCORM_GetInteractionWeighting(strInteractionID)
{WriteToDebug("SCORM_GetInteractionWeighting - SCORM does not support interaction retrieval, returning empty string");return'';}
function SCORM_GetInteractionLearnerResponses(strInteractionID)
{WriteToDebug("SCORM_GetInteractionLearnerResponses - SCORM does not support interaction retrieval, returning empty array");return new Array();}
function SCORM_GetInteractionResult(strInteractionID)
{WriteToDebug("SCORM_GetInteractionResult - SCORM does not support interaction retrieval, returning empty string");return'';}
function SCORM_GetInteractionLatency(strInteractionID)
{WriteToDebug("SCORM_GetInteractionDescription - SCORM does not support interaction retrieval, returning empty string");return'';}
function SCORM_GetInteractionDescription(strInteractionID)
{WriteToDebug("SCORM_GetInteractionDescription - SCORM does not support interaction retrieval, returning empty string");return'';}
function SCORM_CreateDataBucket(strBucketId,intMinSize,intMaxSize){WriteToDebug("SCORM_CreateDataBucket - SCORM 1.1 and 1.2 do not support SSP, returning false");return false;}
function SCORM_GetDataFromBucket(strBucketId){WriteToDebug("SCORM_GetDataFromBucket - SCORM 1.1 and 1.2 do not support SSP, returning empty string");return"";}
function SCORM_PutDataInBucket(strBucketId,strData,blnAppendToEnd){WriteToDebug("SCORM_PutDataInBucket - SCORM 1.1 and 1.2 do not support SSP, returning false");return false;}
function SCORM_DetectSSPSupport(){WriteToDebug("SCORM_DetectSSPSupport - SCORM 1.1 and 1.2 do not support SSP, returning false");return false;}
function SCORM_GetBucketInfo(strBucketId){WriteToDebug("AICC_DetectSSPSupport - SCORM 1.1 and 1.2 do not support SSP, returning empty SSPBucketSize");return new SSPBucketSize(0,0);}
function SCORM_SetFailed(){WriteToDebug("In SCORM_SetFailed");SCORM_ClearErrorInfo();return SCORM_CallLMSSetValue("cmi.core.lesson_status",SCORM_FAILED);}
function SCORM_SetPassed(){WriteToDebug("In SCORM_SetPassed");SCORM_ClearErrorInfo();return SCORM_CallLMSSetValue("cmi.core.lesson_status",SCORM_PASSED);}
function SCORM_SetCompleted(){WriteToDebug("In SCORM_SetCompleted");SCORM_ClearErrorInfo();return SCORM_CallLMSSetValue("cmi.core.lesson_status",SCORM_COMPLETED);}
function SCORM_ResetStatus(){WriteToDebug("In SCORM_ResetStatus");SCORM_ClearErrorInfo();return SCORM_CallLMSSetValue("cmi.core.lesson_status",SCORM_INCOMPLETE);}
function SCORM_GetStatus(){var strStatus;WriteToDebug("In SCORM_GetStatus");SCORM_ClearErrorInfo();strStatus=SCORM_CallLMSGetValue("cmi.core.lesson_status");WriteToDebug("strStatus="+strStatus);if(strStatus==SCORM_PASSED){WriteToDebug("returning Passed");return LESSON_STATUS_PASSED;}
else if(strStatus==SCORM_FAILED){WriteToDebug("Returning Failed");return LESSON_STATUS_FAILED;}
else if(strStatus==SCORM_COMPLETED){WriteToDebug("Returning Completed");return LESSON_STATUS_COMPLETED;}
else if(strStatus==SCORM_BROWSED){WriteToDebug("Returning Browsed");return LESSON_STATUS_BROWSED;}
else if(strStatus==SCORM_INCOMPLETE){WriteToDebug("Returning Incomplete");return LESSON_STATUS_INCOMPLETE;}
else if(strStatus==SCORM_NOT_ATTEMPTED){WriteToDebug("Returning Not Attempted");return LESSON_STATUS_NOT_ATTEMPTED;}
else{WriteToDebug("ERROR - status not found");SCORM_SetErrorInfoManually(SCORM_ERROR_INVALID_STATUS,"Invalid lesson status received from LMS","strStatus="+strStatus);return null;}}
function SCORM_GetProgressMeasure(){WriteToDebug("SCORM_GetProgressMeasure - SCORM 1.1 and 1.2 do not support progress_measure, returning false");return false;}
function SCORM_SetProgressMeasure(){WriteToDebug("SCORM_SetProgressMeasure - SCORM 1.1 and 1.2 do not support progress_measure, returning false");return false;}
function SCORM_GetObjectiveProgressMeasure(){WriteToDebug("SCORM_GetObjectiveProgressMeasure - SCORM 1.1 and 1.2 do not support progress_measure, returning false");return false;}
function SCORM_SetObjectiveProgressMeasure(){WriteToDebug("SCORM_SetObjectiveProgressMeasure - SCORM 1.1 and 1.2 do not support progress_measure, returning false");return false;}
function SCORM_IsContentInBrowseMode(){var strLessonMode
WriteToDebug("In SCORM_IsContentInBrowseMode");strLessonMode=SCORM_CallLMSGetValue("cmi.core.lesson_mode");WriteToDebug("SCORM_IsContentInBrowseMode,  strLessonMode="+strLessonMode);if(strLessonMode==SCORM_BROWSE){WriteToDebug("Returning true");return true;}
else{WriteToDebug("Returning false");return false;}}
function SCORM_TranslateExitTypeToSCORM(strExitType){WriteToDebug("In SCORM_TranslatgeExitTypeToSCORM strExitType-"+strExitType);if(strExitType==EXIT_TYPE_SUSPEND){WriteToDebug("Returning suspend");return SCORM_SUSPEND;}
else if(strExitType==EXIT_TYPE_UNLOAD){WriteToDebug("Returning Exit");return SCORM_NORMAL_EXIT;}
else if(strExitType==EXIT_TYPE_FINISH){WriteToDebug("Returning Logout");return SCORM_NORMAL_EXIT;}
else if(strExitType==EXIT_TYPE_TIMEOUT){WriteToDebug("Returning Timout");return SCORM_TIMEOUT;}}
function SCORM_GetCompletionStatus(){WriteToDebug("In SCORM_GetCompletionStatus");if(SCORM_IsContentInBrowseMode()){WriteToDebug("Returning browsed");return SCORM_BROWSED;}
else{WriteToDebug("Returning Completed");return SCORM_COMPLETED;}}
function SCORM_SetNavigationRequest(strNavRequest){WriteToDebug("SCORM_GetNavigationRequest - SCORM 1.1 and 1.2 do not support navigation requests, returning false");return false;}
function SCORM_GetNavigationRequest(){WriteToDebug("SCORM_GetNavigationRequest - SCORM 1.1 and 1.2 do not support navigation requests, returning false");return false;}
function SCORM_CallLMSInitialize(){var strResult;WriteToDebug("In SCORM_CallLMSInitialize");SCORM_objAPI=SCORM_GrabAPI();WriteToDebug("Calling LMSInitialize");strResult=SCORM_objAPI.LMSInitialize("");strResult=strResult+"";WriteToDebug("strResult="+strResult);if(strResult==SCORM_FALSE){WriteToDebug("Detected failed call to initialize");SCORM_SetErrorInfo();WriteToDebug("Error calling LMSInitialize:");WriteToDebug("              intSCORMError="+intSCORMError);WriteToDebug("              SCORMErrorString="+strSCORMErrorString);WriteToDebug("              Diagnostic="+strSCORMErrorDiagnostic);return false;}
WriteToDebug("Returning true");return true;}
function SCORM_CallLMSSetValue(strElement,strValue){var strResult;WriteToDebug("SCORM_CallLMSSetValue strElement="+strElement+", strValue="+strValue);if(blnReviewModeSoReadOnly===true){WriteToDebug("Mode is Review and configuration setting dictates this should be read only so exiting.");return true;}
SCORM_objAPI=SCORM_GrabAPI();WriteToDebug("Calling LMSSetValue");strElement=strElement+"";strValue=strValue+"";strResult=SCORM_objAPI.LMSSetValue(strElement,strValue)
strResult=strResult+"";WriteToDebug("strResult="+strResult);if(strResult==SCORM_FALSE){WriteToDebug("Detected Failed call to LMSSetvalue");SCORM_SetErrorInfo();WriteToDebug("Error calling LMSSetValue:");WriteToDebug("              strElement="+strElement);WriteToDebug("              strValue="+strValue);WriteToDebug("              intSCORMError="+intSCORMError);WriteToDebug("              SCORMErrorString="+strSCORMErrorString);WriteToDebug("              Diagnostic="+strSCORMErrorDiagnostic);return false;}
WriteToDebug("Returning true");return true;}
function SCORM_CallLMSGetValue(strElement){var strResult
WriteToDebug("In SCORM_CallLMSGetValue strElement="+strElement);SCORM_objAPI=SCORM_GrabAPI();WriteToDebug("Call LMSGetValue");strElement=strElement+"";strResult=SCORM_objAPI.LMSGetValue(strElement)+""
WriteToDebug("strResult="+strResult);intSCORMError=SCORM_objAPI.LMSGetLastError()
intSCORMError=intSCORMError+"";WriteToDebug("intSCORMError="+intSCORMError);if(intSCORMError!=SCORM_NO_ERROR){WriteToDebug("Detected failed called to LMSGetValue");SCORM_SetErrorInfo();WriteToDebug("Error calling LMSGetValue:");WriteToDebug("              strElement="+strElement);WriteToDebug("              intSCORMError="+intSCORMError);WriteToDebug("              SCORMErrorString="+strSCORMErrorString);WriteToDebug("              Diagnostic="+strSCORMErrorDiagnostic);}
WriteToDebug("Returning "+strResult);return strResult;}
function SCORM_CallLMSCommit(){var strResult;WriteToDebug("In SCORM_CallLMSCommit");SCORM_objAPI=SCORM_GrabAPI();WriteToDebug("Calling LMSCommit");strResult=SCORM_objAPI.LMSCommit("");strResult=strResult+"";WriteToDebug("strResult="+strResult);if(strResult==SCORM_FALSE){WriteToDebug("Detected failed call to LMSCommit");SCORM_SetErrorInfo();WriteToDebug("Error calling LMSCommit:");WriteToDebug("              intSCORMError="+intSCORMError);WriteToDebug("              SCORMErrorString="+strSCORMErrorString);WriteToDebug("              Diagnostic="+strSCORMErrorDiagnostic);return false;}
WriteToDebug("Returning true");return true;}
function SCORM_CallLMSFinish(){var strResult;WriteToDebug("In SCORM_CallLMSFinish");SCORM_objAPI=SCORM_GrabAPI();WriteToDebug("Calling LMS Finish");strResult=SCORM_objAPI.LMSFinish("");strResult=strResult+"";WriteToDebug("strResult="+strResult);if(strResult==SCORM_FALSE){WriteToDebug("Detected failed call to LMSFinish");SCORM_SetErrorInfo();WriteToDebug("Error calling LMSFinish:");WriteToDebug("              intSCORMError="+intSCORMError);WriteToDebug("              SCORMErrorString="+strSCORMErrorString);WriteToDebug("              Diagnostic="+strSCORMErrorDiagnostic);return false;}
WriteToDebug("Returning True");return true;}
function SCORM_ClearErrorInfo(){WriteToDebug("In SCORM_ClearErrorInfo");intSCORMError=SCORM_NO_ERROR;strSCORMErrorString="";strSCORMErrorDiagnostic="";}
function SCORM_SetErrorInfo(){WriteToDebug("In SCORM_SetErrorInfo");intSCORMError=SCORM_objAPI.LMSGetLastError();strSCORMErrorString=SCORM_objAPI.LMSGetErrorString(intSCORMError);strSCORMErrorDiagnostic=SCORM_objAPI.LMSGetDiagnostic("");intSCORMError=intSCORMError+"";strSCORMErrorString=strSCORMErrorString+"";strSCORMErrorDiagnostic=strSCORMErrorDiagnostic+"";WriteToDebug("intSCORMError="+intSCORMError);WriteToDebug("strSCORMErrorString="+strSCORMErrorString);WriteToDebug("strSCORMErrorDiagnostic="+strSCORMErrorDiagnostic);}
function SCORM_SetErrorInfoManually(intNum,strString,strDiagnostic){WriteToDebug("In SCORM_SetErrorInfoManually");WriteToDebug("ERROR-Num="+intNum);WriteToDebug("      String="+strString);WriteToDebug("      Diag="+strDiagnostic);intSCORMError=intNum;strSCORMErrorString=strString;strSCORMErrorDiagnostic=strDiagnostic;}
function SCORM_GetLastError(){WriteToDebug("In SCORM_GetLastError");if(intSCORMError==SCORM_NO_ERROR){WriteToDebug("Returning No Error");return NO_ERROR;}
else{WriteToDebug("Returning "+intSCORMError);return intSCORMError;}}
function SCORM_GetLastErrorDesc(){WriteToDebug("In SCORM_GetLastErrorDesc, "+strSCORMErrorString+"\n"+strSCORMErrorDiagnostic);return strSCORMErrorString+"\n"+strSCORMErrorDiagnostic;}
function SCORM_GrabAPI(){WriteToDebug("In SCORM_GrabAPI");if(typeof(SCORM_objAPI)=="undefined"||SCORM_objAPI==null){WriteToDebug("Searching with improved ADL algorithm");SCORM_objAPI=SCORM_GetAPI();}
if(typeof(SCORM_objAPI)=="undefined"||SCORM_objAPI==null){SCORM_objAPI=SCORM_SearchForAPI(window);}
WriteToDebug("SCORM_GrabAPI, returning");return SCORM_objAPI;}
function SCORM_SearchForAPI(wndLookIn){WriteToDebug("SCORM_SearchForAPI");var objAPITemp=null;var strDebugID="";strDebugID="Name="+wndLookIn.name+", href="+wndLookIn.location.href
objAPITemp=wndLookIn.API;if(SCORM_APIFound(objAPITemp)){WriteToDebug("Found API in this window - "+strDebugID);return objAPITemp;}
if(SCORM_WindowHasParent(wndLookIn)){WriteToDebug("Searching Parent - "+strDebugID);objAPITemp=SCORM_SearchForAPI(wndLookIn.parent);}
if(SCORM_APIFound(objAPITemp)){WriteToDebug("Found API in a parent - "+strDebugID);return objAPITemp;}
if(SCORM_WindowHasOpener(wndLookIn)){WriteToDebug("Searching Opener - "+strDebugID);objAPITemp=SCORM_SearchForAPI(wndLookIn.opener);}
if(SCORM_APIFound(objAPITemp)){WriteToDebug("Found API in an opener - "+strDebugID);return objAPITemp;}
WriteToDebug("Looking in children - "+strDebugID);objAPITemp=SCORM_LookInChildren(wndLookIn);if(SCORM_APIFound(objAPITemp)){WriteToDebug("Found API in Children - "+strDebugID);return objAPITemp;}
WriteToDebug("Didn't find API in this window - "+strDebugID);return null;}
function SCORM_LookInChildren(wnd){WriteToDebug("SCORM_LookInChildren");var objAPITemp=null;var strDebugID="";strDebugID="Name="+wnd.name+", href="+wnd.location.href
for(var i=0;i<wnd.frames.length;i++){WriteToDebug("Looking in child frame "+i);objAPITemp=wnd.frames[i].API;if(SCORM_APIFound(objAPITemp)){WriteToDebug("Found API in child frame of "+strDebugID);return objAPITemp;}
WriteToDebug("Looking in this child's children "+strDebugID);objAPITemp=SCORM_LookInChildren(wnd.frames[i]);if(SCORM_APIFound(objAPITemp)){WriteToDebug("API found in this child's children "+strDebugID);return objAPITemp;}}
return null;}
function SCORM_WindowHasOpener(wnd){WriteToDebug("In SCORM_WindowHasOpener");if((wnd.opener!=null)&&(wnd.opener!=wnd)&&(typeof(wnd.opener)!="undefined")){WriteToDebug("Window Does Have Opener");return true;}
else{WriteToDebug("Window Does Not Have Opener");return false;}}
function SCORM_WindowHasParent(wnd){WriteToDebug("In SCORM_WindowHasParent");if((wnd.parent!=null)&&(wnd.parent!=wnd)&&(typeof(wnd.parent)!="undefined")){WriteToDebug("Window Does Have Parent");return true;}
else{WriteToDebug("Window Does Not Have Parent");return false;}}
function SCORM_APIFound(obj){WriteToDebug("In SCORM_APIFound");if(obj==null||typeof(obj)=="undefined"){WriteToDebug("API NOT Found");return false;}
else{WriteToDebug("API Found");return true;}}
function SCORM_ScanParentsForApi(win)
{WriteToDebug("In SCORM_ScanParentsForApi, win="+win.location);var MAX_PARENTS_TO_SEARCH=500;var nParentsSearched=0;while((win.API==null||win.API===undefined)&&(win.parent!=null)&&(win.parent!=win)&&(nParentsSearched<=MAX_PARENTS_TO_SEARCH))
{nParentsSearched++;win=win.parent;}
return win.API;}
function SCORM_GetAPI()
{WriteToDebug("In SCORM_GetAPI");var API=null;if((window.parent!=null)&&(window.parent!=window))
{WriteToDebug("SCORM_GetAPI, searching parent");API=SCORM_ScanParentsForApi(window.parent);}
if((API==null)&&(window.top.opener!=null))
{WriteToDebug("SCORM_GetAPI, searching opener");API=SCORM_ScanParentsForApi(window.top.opener);}
return API;}
var STANDARD='AICC';var blnDirtyAICCData=false;var blnCommitSavedData=false;var intAICCErrorNum=NO_ERROR;var strAICCErrorDesc="";var aryAICCFoundItems=new Array();var blnUseLongInteractionResultValues=true;var blnReviewModeSoReadOnly=false;var AICC_LMS_Version="";var AICC_Student_ID="";var AICC_Student_Name="";var AICC_Lesson_Location="";var AICC_Score="";var AICC_Credit="";var AICC_Lesson_Status="";var AICC_Time="";var AICC_Mastery_Score="";var AICC_Lesson_Mode="";var AICC_Max_Time_Allowed="";var AICC_Time_Limit_Action="";var AICC_Audio="";var AICC_Speed="";var AICC_Language="";var AICC_Text="";var AICC_Launch_Data="";var AICC_Data_Chunk="";var AICC_Comments="";var AICC_Objectives=null;var AICC_CourseID="";var AICC_fltScoreRaw="";var AICC_fltScoreMax="";var AICC_fltScoreMin="";var AICC_blnCredit=true;var AICC_strLessonMode=MODE_NORMAL;var AICC_intPreviouslyAccumulatedMilliseconds=0;var AICC_intMaxTimeAllowedMilliseconds=MAX_CMI_TIME;var AICC_blnExitOnTimeout=false;var AICC_blnShowMessageOnTimeout=true;var AICC_TextPreference=PREFERENCE_DEFAULT;var AICC_Status=LESSON_STATUS_NOT_ATTEMPTED;var AICC_Entry=AICC_ENTRY_FLAG_DEFAULT;var AICC_AudioPlayPreference=PREFERENCE_DEFAULT;var AICC_intAudioVolume=100;var AICC_intPercentOfMaxSpeed=100;var AICC_intSessionTimeMilliseconds=0;var AICC_aryObjectivesRead=new Array();var AICC_aryObjectivesWrite=new Array();var AICC_aryCommentsFromLearner=new Array();var AICC_aryInteractions=new Array();var AICC_OBJ_ARRAY_ID=0;var AICC_OBJ_ARRAY_SCORE=1;var AICC_OBJ_ARRAY_STATUS=2;var AICC_INTERACTIONS_ID=0;var AICC_INTERACTIONS_RESPONSE=1;var AICC_INTERACTIONS_CORRECT=2;var AICC_INTERACTIONS_CORRECT_RESPONSE=3;var AICC_INTERACTIONS_TIME_STAMP=4;var AICC_INTERACTIONS_TYPE=5;var AICC_INTERACTIONS_WEIGHTING=6;var AICC_INTERACTIONS_LATENCY=7;var AICC_INTERACTIONS_RESPONSE_LONG=8;var AICC_INTERACTIONS_CORRECT_RESPONSE_LONG=9;var AICC_INTERACTION_TYPE_TRUE_FALSE="T";var AICC_INTERACTION_TYPE_CHOICE="C";var AICC_INTERACTION_TYPE_FILL_IN="F";var AICC_INTERACTION_TYPE_MATCHING="M";var AICC_INTERACTION_TYPE_PERFORMANCE="P";var AICC_INTERACTION_TYPE_SEQUENCING="S";var AICC_INTERACTION_TYPE_LIKERT="L";var AICC_INTERACTION_TYPE_NUMERIC="N";var AICC_RESULT_CORRECT="C";var AICC_RESULT_WRONG="W";var AICC_RESULT_UNANTICIPATED="U";var AICC_RESULT_NEUTRAL="N";var AICC_NO_ERROR="0";var AICC_ERROR_INVALID_PREFERENCE="-1";var AICC_ERROR_INVALID_STATUS="-2";var AICC_ERROR_INVALID_SPEED="-3";var AICC_ERROR_INVALID_TIMESPAN="-4";var AICC_ERROR_INVALID_TIME_LIMIT_ACTION="-5";var AICC_ERROR_INVALID_DECIMAL="-6";var AICC_ERROR_INVALID_CREDIT="-7";var AICC_ERROR_INVALID_LESSON_MODE="-8";var AICC_ERROR_INVALID_ENTRY="-9";var blnReviewModeSoReadOnly=false;function AICC_Initialize(){WriteToDebug("In AICC_Initialize");window.AICCComm.MakeGetParamRequest();return;}
function AICC_InitializeExecuted(){WriteToDebug("In AICC_InitializeExecuted");if(AICC_GetLessonMode()!=MODE_REVIEW){if(AICC_GetStatus()==LESSON_STATUS_NOT_ATTEMPTED){WriteToDebug("Setting Status to Incomplete");AICC_Status=LESSON_STATUS_INCOMPLETE;}}
else{if(!(typeof(REVIEW_MODE_IS_READ_ONLY)=="undefined")&&REVIEW_MODE_IS_READ_ONLY===true){blnReviewModeSoReadOnly=true;}}}
function AICC_Finish(strExitType,blnStatusWasSet){WriteToDebug("In AICC_Finish, strExitType="+strExitType+", blnStatusWasSet="+blnStatusWasSet);if(!blnStatusWasSet){if((strExitType==EXIT_TYPE_FINISH)){WriteToDebug("Setting status to complete");AICC_Status=LESSON_STATUS_COMPLETED;}
else{WriteToDebug("Setting status to incomplete");AICC_Status=LESSON_STATUS_INCOMPLETE;}}
AICC_CommitData();if(blnCommitSavedData==true){KillTime();}
window.AICCComm.MakeExitAURequest();return true;}
function AICC_CommitData(){var strAICCData;WriteToDebug("In AICC_CommitData");if(blnReviewModeSoReadOnly===true){WriteToDebug("Mode is Review and configuration setting dictates this should be read only so exiting.");return true;}
blnCommitSavedData=false;if(IsThereDirtyAICCData()){blnCommitSavedData=true;WriteToDebug("Found Dirty Data");strAICCData=FormAICCPostData();window.AICCComm.MakePutParamRequest(strAICCData);if(AICC_aryInteractions.length>0){WriteToDebug("Saving Interactions");KillTime();AICC_SendInteractions();}
ClearDirtyAICCData();}
return true;}
function KillTime(){WriteToDebug("In KillTime");if(USE_AICC_KILL_TIME===false){WriteToDebug("Configuration disallows use of KillTime, exiting");return;}
var start=new Date();if(window.AICCComm.blnCanUseXMLHTTP==false){if(window.AICCComm.blnXMLHTTPIsAvailable==true){var numBlankRequests=3;for(var i=0;i<numBlankRequests;i++){window.AICCComm.GetBlankHtmlPage(i);}}
else{window.NothingFrame.document.open();var numLoops=1000;for(var i=0;i<numLoops;i++){window.NothingFrame.document.write("waiting");}
window.NothingFrame.document.close();}}
var end=new Date();WriteToDebug("Killed "+(end-start)+"milliseconds.");}
function AICC_SendInteractions(){WriteToDebug("In AICC_SendInteractions.");if(blnReviewModeSoReadOnly===true){WriteToDebug("Mode is Review and configuration setting dictates this should be read only so exiting.");return true;}
var strAICCData=FormAICCInteractionsData();window.AICCComm.MakePutInteractionsRequest(strAICCData);AICC_aryInteractions=new Array();}
function AICC_GetStudentID(){WriteToDebug("In AICC_GetStudentID, Returning "+AICC_Student_ID);return AICC_Student_ID;}
function AICC_GetStudentName(){WriteToDebug("In AICC_GetStudentName, Returning "+AICC_Student_Name);return AICC_Student_Name;}
function AICC_GetBookmark(){WriteToDebug("In AICC_GetBookmark, Returning "+AICC_Lesson_Location);return AICC_Lesson_Location;}
function AICC_SetBookmark(strBookmark){WriteToDebug("In AICC_SetBookmark, strBookmark="+strBookmark);SetDirtyAICCData();AICC_Lesson_Location=strBookmark;return true;}
function AICC_GetDataChunk(){WriteToDebug("In AICC_GetDataChunk, Returning "+AICC_Data_Chunk);return AICC_Data_Chunk;}
function AICC_SetDataChunk(strData){WriteToDebug("In AICC_SetDataChunk, strData="+strData);if(USE_STRICT_SUSPEND_DATA_LIMITS==true){if(strData.length>4096){WriteToDebug("SCORM_SetDataChunk - suspend_data too large (4096 character limit for AICC)");return false;}else{SetDirtyAICCData();AICC_Data_Chunk=strData;return true;}}else{SetDirtyAICCData();AICC_Data_Chunk=strData;return true;}}
function AICC_GetLaunchData(){WriteToDebug("In AICC_GetLaunchData, Returning "+AICC_Launch_Data);return AICC_Launch_Data;}
function AICC_GetComments(){WriteToDebug("In AICC_GetComments, Returning "+AICC_aryCommentsFromLearner.join(" | "));return AICC_aryCommentsFromLearner.join(" | ");}
function AICC_WriteComment(strComment){WriteToDebug("In AICC_WriteComment, strComment="+strComment);var intNextIndex;if(strComment.search(/ \| /)==0){strComment=strComment.substr(3);}
strComment.replace(/\|\|/g,"|")
intNextIndex=AICC_aryCommentsFromLearner.length;WriteToDebug("Adding comment to array");AICC_aryCommentsFromLearner[intNextIndex]=strComment;SetDirtyAICCData();return true;}
function AICC_GetLMSComments(){WriteToDebug("In AICC_GetLMSComments, Returning "+AICC_Comments);return AICC_Comments;}
function AICC_GetAudioPlayPreference(){WriteToDebug("In AICC_GetAudioPlayPreference, Returning "+AICC_AudioPlayPreference);return AICC_AudioPlayPreference;}
function AICC_GetAudioVolumePreference(){WriteToDebug("In AICC_GetAudioVolumePreference, Returning "+AICC_intAudioVolume);return AICC_intAudioVolume;}
function AICC_SetAudioPreference(PlayPreference,intPercentOfMaxVolume){WriteToDebug("In AICC_SetAudioPreference, Returning true");AICC_AudioPlayPreference=PlayPreference;AICC_intAudioVolume=intPercentOfMaxVolume;SetDirtyAICCData();return true;}
function AICC_SetLanguagePreference(strLanguage){WriteToDebug("In AICC_SetLanguagePreference, Returning true");SetDirtyAICCData();AICC_Language=strLanguage;return true;}
function AICC_GetLanguagePreference(){WriteToDebug("In AICC_GetLanguagePreference, Returning "+AICC_Language);return AICC_Language;}
function AICC_SetSpeedPreference(intPercentOfMax){WriteToDebug("In AICC_SetSpeedPreference, Returning true");AICC_intPercentOfMaxSpeed=intPercentOfMax;SetDirtyAICCData();return true;}
function AICC_GetSpeedPreference(){WriteToDebug("In AICC_GetSpeedPreference, Returning "+AICC_intPercentOfMaxSpeed);return AICC_intPercentOfMaxSpeed;}
function AICC_SetTextPreference(intPreference){WriteToDebug("In AICC_SetTextPreference, Returning true");AICC_TextPreference=intPreference;SetDirtyAICCData();return true;}
function AICC_GetTextPreference(){WriteToDebug("In AICC_GetTextPreference, Returning "+AICC_TextPreference);return AICC_TextPreference;}
function AICC_GetPreviouslyAccumulatedTime(){WriteToDebug("In AICC_GetPreviouslyAccumulatedTime, Returning "+AICC_intPreviouslyAccumulatedMilliseconds);return AICC_intPreviouslyAccumulatedMilliseconds;}
function AICC_SaveTime(intMilliSeconds){WriteToDebug("In intMilliSeconds, Returning true");AICC_intSessionTimeMilliseconds=intMilliSeconds;SetDirtyAICCData();return true;}
function AICC_GetMaxTimeAllowed(){WriteToDebug("In AICC_GetMaxTimeAllowed, Returning "+AICC_intMaxTimeAllowedMilliseconds);return AICC_intMaxTimeAllowedMilliseconds;}
function AICC_DisplayMessageOnTimeout(){WriteToDebug("In AICC_DisplayMessageOnTimeout, Returning "+AICC_blnShowMessageOnTimeout);return AICC_blnShowMessageOnTimeout;}
function AICC_ExitOnTimeout(){WriteToDebug("In AICC_ExitOnTimeout, Returning "+AICC_blnExitOnTimeout);return AICC_blnExitOnTimeout;}
function AICC_GetPassingScore(){WriteToDebug("In AICC_GetPassingScore, Returning "+AICC_Mastery_Score);return AICC_Mastery_Score;}
function AICC_GetScore(){WriteToDebug("In AICC_GetScore, Returning "+AICC_fltScoreRaw);return AICC_fltScoreRaw;}
function AICC_SetScore(fltScore,fltMaxScore,fltMinScore){WriteToDebug("In AICC_SetScore, fltScore="+fltScore+", fltMaxScore="+fltMaxScore+", fltMinScore="+fltMinScore);AICC_fltScoreRaw=fltScore;AICC_fltScoreMax=fltMaxScore;AICC_fltScoreMin=fltMinScore;SetDirtyAICCData();return true;}
function AICC_RecordTrueFalseInteraction(strID,blnResponse,blnCorrect,blnCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In AICC_RecordTrueFalseInteraction strID="+strID+", blnResponse="+blnResponse+", blnCorrect="+blnCorrect+", blnCorrectResponse="+blnCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var intTotalInteractions;var aryData=new Array(10);intTotalInteractions=AICC_aryInteractions.length;if(intWeighting==null||intWeighting==undefined){intWeighting="";}
if(intLatency==null||intLatency==undefined){intLatency="";}
if(blnCorrect==null||blnCorrect==undefined){blnCorrect="";}
var strResponse="";var strCorrectResponse="";if(blnResponse){strResponse="t";}
else{strResponse="f";}
if(blnCorrectResponse==true){strCorrectResponse="t";}
else if(blnCorrectResponse==false){strCorrectResponse="f";}
aryData[AICC_INTERACTIONS_ID]=strID;aryData[AICC_INTERACTIONS_RESPONSE]=strResponse;aryData[AICC_INTERACTIONS_CORRECT]=blnCorrect;aryData[AICC_INTERACTIONS_CORRECT_RESPONSE]=strCorrectResponse;aryData[AICC_INTERACTIONS_TIME_STAMP]=dtmTime;aryData[AICC_INTERACTIONS_TYPE]=AICC_INTERACTION_TYPE_TRUE_FALSE;aryData[AICC_INTERACTIONS_WEIGHTING]=intWeighting;aryData[AICC_INTERACTIONS_LATENCY]=intLatency;aryData[AICC_INTERACTIONS_RESPONSE_LONG]=strResponse;aryData[AICC_INTERACTIONS_CORRECT_RESPONSE_LONG]=strCorrectResponse;AICC_aryInteractions[intTotalInteractions]=aryData;WriteToDebug("Added to interactions array, index="+intTotalInteractions);SetDirtyAICCData();return true;}
function AICC_RecordMultipleChoiceInteraction(strID,aryResponse,blnCorrect,aryCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In AICC_RecordMultipleChoiceInteraction strID="+strID+", aryResponse="+aryResponse+", blnCorrect="+blnCorrect+", aryCorrectResponse="+aryCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var intTotalInteractions;var aryData=new Array(10);intTotalInteractions=AICC_aryInteractions.length;if(intWeighting==null||intWeighting==undefined){intWeighting="";}
if(intLatency==null||intLatency==undefined){intLatency="";}
if(blnCorrect==null||blnCorrect==undefined){blnCorrect="";}
var strResponse="";var strResponseLong="";var strCorrectResponse="";var strCorrectResponseLong="";for(var i=0;i<aryResponse.length;i++){if(strResponse.length>0){strResponse+=",";}
if(strResponseLong.length>0){strResponseLong+=",";}
strResponse+=aryResponse[i].Short.replace(",","");strResponseLong+=aryResponse[i].Long.replace(",","");}
for(var i=0;i<aryCorrectResponse.length;i++){if(strCorrectResponse.length>0){strCorrectResponse+=",";}
if(strCorrectResponseLong.length>0){strCorrectResponseLong+=",";}
strCorrectResponse+=aryCorrectResponse[i].Short.replace(",","");strCorrectResponseLong+=aryCorrectResponse[i].Long.replace(",","");}
aryData[AICC_INTERACTIONS_ID]=strID;aryData[AICC_INTERACTIONS_RESPONSE]=strResponse;aryData[AICC_INTERACTIONS_CORRECT]=blnCorrect;aryData[AICC_INTERACTIONS_CORRECT_RESPONSE]=strCorrectResponse;aryData[AICC_INTERACTIONS_TIME_STAMP]=dtmTime;aryData[AICC_INTERACTIONS_TYPE]=AICC_INTERACTION_TYPE_CHOICE;aryData[AICC_INTERACTIONS_WEIGHTING]=intWeighting;aryData[AICC_INTERACTIONS_LATENCY]=intLatency;aryData[AICC_INTERACTIONS_RESPONSE_LONG]=strResponseLong;aryData[AICC_INTERACTIONS_CORRECT_RESPONSE_LONG]=strCorrectResponseLong;AICC_aryInteractions[intTotalInteractions]=aryData;WriteToDebug("Added to interactions array, index="+intTotalInteractions);SetDirtyAICCData();return true;}
function AICC_RecordFillInInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In AICC_RecordFillInInteraction strID="+strID+", strResponse="+strResponse+", blnCorrect="+blnCorrect+", strCorrectResponse="+strCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var intTotalInteractions;var aryData=new Array(10);intTotalInteractions=AICC_aryInteractions.length;if(intWeighting==null||intWeighting==undefined){intWeighting="";}
if(intLatency==null||intLatency==undefined){intLatency="";}
if(blnCorrect==null||blnCorrect==undefined){blnCorrect="";}
if(strCorrectResponse==null||strCorrectResponse==undefined){strCorrectResponse="";}
strResponse=new String(strResponse);if(strResponse.length>255){strResponse=strResponse.substr(0,255);}
strCorrectResponse=new String(strCorrectResponse);if(strCorrectResponse.length>255){strCorrectResponse=strCorrectResponse.substr(0,255);}
aryData[AICC_INTERACTIONS_ID]=strID;aryData[AICC_INTERACTIONS_RESPONSE]=strResponse;aryData[AICC_INTERACTIONS_CORRECT]=blnCorrect;aryData[AICC_INTERACTIONS_CORRECT_RESPONSE]=strCorrectResponse;aryData[AICC_INTERACTIONS_TIME_STAMP]=dtmTime;aryData[AICC_INTERACTIONS_TYPE]=AICC_INTERACTION_TYPE_FILL_IN;aryData[AICC_INTERACTIONS_WEIGHTING]=intWeighting;aryData[AICC_INTERACTIONS_LATENCY]=intLatency;aryData[AICC_INTERACTIONS_RESPONSE_LONG]=strResponse;aryData[AICC_INTERACTIONS_CORRECT_RESPONSE_LONG]=strCorrectResponse;AICC_aryInteractions[intTotalInteractions]=aryData;WriteToDebug("Added to interactions array, index="+intTotalInteractions);SetDirtyAICCData();return true;}
function AICC_RecordMatchingInteraction(strID,aryResponse,blnCorrect,aryCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In AICC_RecordMatchingInteraction strID="+strID+", aryResponse="+aryResponse+", blnCorrect="+blnCorrect+", aryCorrectResponse="+aryCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var intTotalInteractions;var aryData=new Array(10);intTotalInteractions=AICC_aryInteractions.length;if(intWeighting==null||intWeighting==undefined){intWeighting="";}
if(intLatency==null||intLatency==undefined){intLatency="";}
if(blnCorrect==null||blnCorrect==undefined){blnCorrect="";}
var strResponse="";var strResponseLong="";var strCorrectResponse="";var strCorrectResponseLong="";for(var i=0;i<aryResponse.length;i++){if(strResponse.length>0){strResponse+=",";}
if(strResponseLong.length>0){strResponseLong+=",";}
strResponse+=aryResponse[i].Source.Short.replace(",","").replace(".","")+"."+aryResponse[i].Target.Short.replace(",","").replace(".","");strResponseLong+=aryResponse[i].Source.Long.replace(",","").replace(".","")+"."+aryResponse[i].Target.Long.replace(",","").replace(".","");}
for(var i=0;i<aryCorrectResponse.length;i++){if(strCorrectResponse.length>0){strCorrectResponse+=",";}
if(strCorrectResponseLong.length>0){strCorrectResponseLong+=",";}
if(aryCorrectResponse[i].Source.Short!=""&&aryCorrectResponse[i].Source.Long!=""){strCorrectResponse+=aryCorrectResponse[i].Source.Short.replace(",","").replace(".","")+"."+aryCorrectResponse[i].Target.Short.replace(",","").replace(".","");strCorrectResponseLong+=aryCorrectResponse[i].Source.Long.replace(",","").replace(".","")+"."+aryCorrectResponse[i].Target.Long.replace(",","").replace(".","");}}
aryData[AICC_INTERACTIONS_ID]=strID;aryData[AICC_INTERACTIONS_RESPONSE]=strResponse;aryData[AICC_INTERACTIONS_CORRECT]=blnCorrect;aryData[AICC_INTERACTIONS_CORRECT_RESPONSE]=strCorrectResponse;aryData[AICC_INTERACTIONS_TIME_STAMP]=dtmTime;aryData[AICC_INTERACTIONS_TYPE]=AICC_INTERACTION_TYPE_MATCHING;aryData[AICC_INTERACTIONS_WEIGHTING]=intWeighting;aryData[AICC_INTERACTIONS_LATENCY]=intLatency;aryData[AICC_INTERACTIONS_RESPONSE_LONG]=strResponseLong;aryData[AICC_INTERACTIONS_CORRECT_RESPONSE_LONG]=strCorrectResponseLong;AICC_aryInteractions[intTotalInteractions]=aryData;WriteToDebug("Added to interactions array, index="+intTotalInteractions);SetDirtyAICCData();return true;}
function AICC_RecordPerformanceInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In AICC_RecordPerformanceInteraction strID="+strID+", strResponse="+strResponse+", blnCorrect="+blnCorrect+", strCorrectResponse="+strCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var intTotalInteractions;var aryData=new Array(10);intTotalInteractions=AICC_aryInteractions.length;if(intWeighting==null||intWeighting==undefined){intWeighting="";}
if(intLatency==null||intLatency==undefined){intLatency="";}
if(blnCorrect==null||blnCorrect==undefined){blnCorrect="";}
if(strCorrectResponse==null||strCorrectResponse==undefined){strCorrectResponse="";}
strResponse=new String(strResponse);if(strResponse.length>255){strResponse=strResponse.substr(0,255);}
strCorrectResponse=new String(strCorrectResponse);if(strCorrectResponse.length>255){strCorrectResponse=strCorrectResponse.substr(0,255);}
aryData[AICC_INTERACTIONS_ID]=strID;aryData[AICC_INTERACTIONS_RESPONSE]=strResponse;aryData[AICC_INTERACTIONS_CORRECT]=blnCorrect;aryData[AICC_INTERACTIONS_CORRECT_RESPONSE]=strCorrectResponse;aryData[AICC_INTERACTIONS_TIME_STAMP]=dtmTime;aryData[AICC_INTERACTIONS_TYPE]=AICC_INTERACTION_TYPE_PERFORMANCE;aryData[AICC_INTERACTIONS_WEIGHTING]=intWeighting;aryData[AICC_INTERACTIONS_LATENCY]=intLatency;aryData[AICC_INTERACTIONS_RESPONSE_LONG]=strResponse;aryData[AICC_INTERACTIONS_CORRECT_RESPONSE_LONG]=strCorrectResponse;AICC_aryInteractions[intTotalInteractions]=aryData;WriteToDebug("Added to interactions array, index="+intTotalInteractions);SetDirtyAICCData();return true;}
function AICC_RecordSequencingInteraction(strID,aryResponse,blnCorrect,aryCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In AICC_RecordSequencingInteraction strID="+strID+", aryResponse="+aryResponse+", blnCorrect="+blnCorrect+", aryCorrectResponse="+aryCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var intTotalInteractions;var aryData=new Array(10);intTotalInteractions=AICC_aryInteractions.length;if(intWeighting==null||intWeighting==undefined){intWeighting="";}
if(intLatency==null||intLatency==undefined){intLatency="";}
if(blnCorrect==null||blnCorrect==undefined){blnCorrect="";}
var strResponse="";var strResponseLong="";var strCorrectResponse="";var strCorrectResponseLong="";for(var i=0;i<aryResponse.length;i++){if(strResponse.length>0){strResponse+=",";}
if(strResponseLong.length>0){strResponseLong+=",";}
strResponse+=aryResponse[i].Short.replace(",","");strResponseLong+=aryResponse[i].Long.replace(",","");}
for(var i=0;i<aryCorrectResponse.length;i++){if(strCorrectResponse.length>0){strCorrectResponse+=",";}
if(strCorrectResponseLong.length>0){strCorrectResponseLong+=",";}
strCorrectResponse+=aryCorrectResponse[i].Short.replace(",","");strCorrectResponseLong+=aryCorrectResponse[i].Long.replace(",","");}
aryData[AICC_INTERACTIONS_ID]=strID;aryData[AICC_INTERACTIONS_RESPONSE]=strResponse;aryData[AICC_INTERACTIONS_CORRECT]=blnCorrect;aryData[AICC_INTERACTIONS_CORRECT_RESPONSE]=strCorrectResponse;aryData[AICC_INTERACTIONS_TIME_STAMP]=dtmTime;aryData[AICC_INTERACTIONS_TYPE]=AICC_INTERACTION_TYPE_SEQUENCING;aryData[AICC_INTERACTIONS_WEIGHTING]=intWeighting;aryData[AICC_INTERACTIONS_LATENCY]=intLatency;aryData[AICC_INTERACTIONS_RESPONSE_LONG]=strResponseLong;aryData[AICC_INTERACTIONS_CORRECT_RESPONSE_LONG]=strCorrectResponseLong;AICC_aryInteractions[intTotalInteractions]=aryData;WriteToDebug("Added to interactions array, index="+intTotalInteractions);SetDirtyAICCData();return true;}
function AICC_RecordLikertInteraction(strID,response,blnCorrect,correctResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In RecordLikertInteraction strID="+strID+", response="+response+", blnCorrect="+blnCorrect+", correctResponse="+correctResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var intTotalInteractions;var aryData=new Array(10);intTotalInteractions=AICC_aryInteractions.length;if(intWeighting==null||intWeighting==undefined){intWeighting="";}
if(intLatency==null||intLatency==undefined){intLatency="";}
if(blnCorrect==null||blnCorrect==undefined){blnCorrect="";}
var strResponse=response.Short;var strResponseLong=response.Long;var strCorrectResponse="";var strCorrectResponseLong="";if(correctResponse!=null){strCorrectResponse=correctResponse.Short;strCorrectResponseLong=correctResponse.Long;}
aryData[AICC_INTERACTIONS_ID]=strID;aryData[AICC_INTERACTIONS_RESPONSE]=strResponse;aryData[AICC_INTERACTIONS_CORRECT]=blnCorrect;aryData[AICC_INTERACTIONS_CORRECT_RESPONSE]=strCorrectResponse;aryData[AICC_INTERACTIONS_TIME_STAMP]=dtmTime;aryData[AICC_INTERACTIONS_TYPE]=AICC_INTERACTION_TYPE_LIKERT;aryData[AICC_INTERACTIONS_WEIGHTING]=intWeighting;aryData[AICC_INTERACTIONS_LATENCY]=intLatency;aryData[AICC_INTERACTIONS_RESPONSE_LONG]=strResponseLong;aryData[AICC_INTERACTIONS_CORRECT_RESPONSE_LONG]=strCorrectResponseLong;AICC_aryInteractions[intTotalInteractions]=aryData;WriteToDebug("Added to interactions array, index="+intTotalInteractions);SetDirtyAICCData();return true;}
function AICC_RecordNumericInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In AICC_RecordNumericInteraction strID="+strID+", strResponse="+strResponse+", blnCorrect="+blnCorrect+", strCorrectResponse="+strCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var intTotalInteractions;var aryData=new Array(10);intTotalInteractions=AICC_aryInteractions.length;if(intWeighting==null||intWeighting==undefined){intWeighting="";}
if(intLatency==null||intLatency==undefined){intLatency="";}
if(blnCorrect==null||blnCorrect==undefined){blnCorrect="";}
if(strCorrectResponse==null||strCorrectResponse==undefined){strCorrectResponse="";}
aryData[AICC_INTERACTIONS_ID]=strID;aryData[AICC_INTERACTIONS_RESPONSE]=strResponse;aryData[AICC_INTERACTIONS_CORRECT]=blnCorrect;aryData[AICC_INTERACTIONS_CORRECT_RESPONSE]=strCorrectResponse;aryData[AICC_INTERACTIONS_TIME_STAMP]=dtmTime;aryData[AICC_INTERACTIONS_TYPE]=AICC_INTERACTION_TYPE_NUMERIC;aryData[AICC_INTERACTIONS_WEIGHTING]=intWeighting;aryData[AICC_INTERACTIONS_LATENCY]=intLatency;aryData[AICC_INTERACTIONS_RESPONSE_LONG]=strResponse;aryData[AICC_INTERACTIONS_CORRECT_RESPONSE_LONG]=strCorrectResponse;AICC_aryInteractions[intTotalInteractions]=aryData;WriteToDebug("Added to interactions array, index="+intTotalInteractions);SetDirtyAICCData();return true;}
function AICC_GetEntryMode(){WriteToDebug("In AICC_GetEntryMode, Returning "+AICC_Entry);return AICC_Entry;}
function AICC_GetLessonMode(){WriteToDebug("In AICC_GetLessonMode, Returning "+AICC_strLessonMode);return AICC_strLessonMode;}
function AICC_GetTakingForCredit(){WriteToDebug("In AICC_GetTakingForCredit, Returning "+AICC_blnCredit);return AICC_blnCredit;}
function AICC_SetObjectiveScore(strObjectiveID,intScore,intMaxScore,intMinScore){WriteToDebug("In AICC_SetObjectiveScore, strObjectiveID="+strObjectiveID+", intScore="+intScore+", intMaxScore="+intMaxScore+", intMinScore="+intMinScore);var intNextID;var intObjIndex;var strAICCScore="";intObjIndex=FindObjectiveById(strObjectiveID,AICC_aryObjectivesRead);if(intObjIndex!=null){WriteToDebug("Found read objective");AICC_aryObjectivesRead[intObjIndex][AICC_OBJ_ARRAY_SCORE]=intScore;}
else{WriteToDebug("Adding new read objective");intNextID=AICC_aryObjectivesRead.length;AICC_aryObjectivesRead[parseInt(intNextID,10)]=new Array(3);AICC_aryObjectivesRead[parseInt(intNextID,10)][AICC_OBJ_ARRAY_ID]=strObjectiveID;AICC_aryObjectivesRead[parseInt(intNextID,10)][AICC_OBJ_ARRAY_SCORE]=intScore;AICC_aryObjectivesRead[parseInt(intNextID,10)][AICC_OBJ_ARRAY_STATUS]="";}
intObjIndex=FindObjectiveById(strObjectiveID,AICC_aryObjectivesWrite);if(intObjIndex!=null){WriteToDebug("Found write objective");AICC_aryObjectivesWrite[intObjIndex][AICC_OBJ_ARRAY_SCORE]=intScore;}
else{WriteToDebug("Adding new write objective");intNextID=AICC_aryObjectivesWrite.length;AICC_aryObjectivesWrite[parseInt(intNextID,10)]=new Array(3);strAICCScore=intScore;if(AICC_LMS_Version<3&&strAICCScore!=""){strAICCScore=parseInt(strAICCScore,10);}
if((AICC_REPORT_MIN_MAX_SCORE===undefined||AICC_REPORT_MIN_MAX_SCORE===null||AICC_REPORT_MIN_MAX_SCORE===true)&&(AICC_LMS_Version>=3)){if((intMaxScore!="")||(intMinScore!="")){WriteToDebug("Appending Max and Min scores");strAICCScore+=","+intMaxScore+","+intMinScore;}}
AICC_aryObjectivesWrite[parseInt(intNextID,10)][AICC_OBJ_ARRAY_ID]=strObjectiveID;AICC_aryObjectivesWrite[parseInt(intNextID,10)][AICC_OBJ_ARRAY_SCORE]=strAICCScore;AICC_aryObjectivesWrite[parseInt(intNextID,10)][AICC_OBJ_ARRAY_STATUS]="";}
SetDirtyAICCData();return true;}
function AICC_SetObjectiveStatus(strObjectiveID,Lesson_Status){WriteToDebug("In AICC_SetObjectiveStatus, strObjectiveID="+strObjectiveID+", Lesson_Status="+Lesson_Status);var intNextID;var intObjIdex;intObjIdex=FindObjectiveById(strObjectiveID,AICC_aryObjectivesRead);if(intObjIdex!=null){WriteToDebug("Found read objective");AICC_aryObjectivesRead[intObjIdex][AICC_OBJ_ARRAY_STATUS]=Lesson_Status;}
else{WriteToDebug("Adding new read objective");intNextID=AICC_aryObjectivesRead.length;AICC_aryObjectivesRead[parseInt(intNextID,10)]=new Array(3);AICC_aryObjectivesRead[parseInt(intNextID,10)][AICC_OBJ_ARRAY_ID]=strObjectiveID;AICC_aryObjectivesRead[parseInt(intNextID,10)][AICC_OBJ_ARRAY_STATUS]=Lesson_Status;AICC_aryObjectivesRead[parseInt(intNextID,10)][AICC_OBJ_ARRAY_SCORE]="";}
intObjIdex=FindObjectiveById(strObjectiveID,AICC_aryObjectivesWrite);if(intObjIdex!=null){WriteToDebug("Found write objective");AICC_aryObjectivesWrite[intObjIdex][AICC_OBJ_ARRAY_STATUS]=Lesson_Status;}
else{WriteToDebug("Adding new write objective");intNextID=AICC_aryObjectivesWrite.length;AICC_aryObjectivesWrite[parseInt(intNextID,10)]=new Array(3);AICC_aryObjectivesWrite[parseInt(intNextID,10)][AICC_OBJ_ARRAY_ID]=strObjectiveID;AICC_aryObjectivesWrite[parseInt(intNextID,10)][AICC_OBJ_ARRAY_STATUS]=Lesson_Status;AICC_aryObjectivesWrite[parseInt(intNextID,10)][AICC_OBJ_ARRAY_SCORE]="";}
SetDirtyAICCData();return true;}
function AICC_SetObjectiveDescription(strObjectiveID,strObjectiveDescription){WriteToDebug("In AICC_SetObjectiveDescription, strObjectiveID="+strObjectiveID+", strObjectiveDescription="+strObjectiveDescription);WriteToDebug("Objective descriptions are not supported prior to SCORM 2004");return true;}
function AICC_GetObjectiveScore(strObjectiveID){WriteToDebug("In AICC_SetObjectiveScore, strObjectiveID="+strObjectiveID);var intObjIndex=FindObjectiveById(strObjectiveID,AICC_aryObjectivesRead)
if(intObjIndex!=null){WriteToDebug("Found objective, returning "+AICC_aryObjectivesRead[intObjIndex][AICC_OBJ_ARRAY_SCORE]);return AICC_aryObjectivesRead[intObjIndex][AICC_OBJ_ARRAY_SCORE];}
else{WriteToDebug("Did not find objective, returning ''");return"";}}
function AICC_GetObjectiveDescription(strObjectiveID){WriteToDebug("In AICC_GetObjectiveDescription, strObjectiveID="+strObjectiveID);WriteToDebug("Objective descriptions are not supported prior to SCORM 2004");return"";}
function AICC_GetObjectiveStatus(strObjectiveID){WriteToDebug("In AICC_SetObjectiveStatus, strObjectiveID="+strObjectiveID);var intObjIndex=FindObjectiveById(strObjectiveID,AICC_aryObjectivesRead)
if(intObjIndex!=null){WriteToDebug("Found objective, returning "+AICC_aryObjectivesRead[intObjIndex][AICC_OBJ_ARRAY_STATUS]);return AICC_aryObjectivesRead[intObjIndex][AICC_OBJ_ARRAY_STATUS];}
else{WriteToDebug("Did not find objective, returning "+LESSON_STATUS_NOT_ATTEMPTED);return LESSON_STATUS_NOT_ATTEMPTED;}}
function AICC_SetFailed(){WriteToDebug("In AICC_SetFailed, Returning true");AICC_Status=LESSON_STATUS_FAILED;SetDirtyAICCData();return true;}
function AICC_SetPassed(){WriteToDebug("In AICC_SetPassed, Returning true");AICC_Status=LESSON_STATUS_PASSED;SetDirtyAICCData();return true;}
function AICC_SetCompleted(){WriteToDebug("In AICC_SetCompleted, Returning true");AICC_Status=LESSON_STATUS_COMPLETED;SetDirtyAICCData();return true;}
function AICC_ResetStatus(){WriteToDebug("In AICC_ResetStatus, Returning true");AICC_Status=LESSON_STATUS_INCOMPLETE;SetDirtyAICCData();return true;}
function AICC_GetStatus(){WriteToDebug("In AICC_GetStatus, Returning "+AICC_Status);return AICC_Status;}
function AICC_GetProgressMeasure(){WriteToDebug("AICC_GetProgressMeasure - AICC does not support progress_measure, returning false");return false;}
function AICC_SetProgressMeasure(){WriteToDebug("AICC_SetProgressMeasure - AICC does not support progress_measure, returning false");return false;}
function AICC_GetObjectiveProgressMeasure(){WriteToDebug("AICC_GetObjectiveProgressMeasure - AICC does not support progress_measure, returning false");return false;}
function AICC_SetObjectiveProgressMeasure(){WriteToDebug("AICC_SetObjectiveProgressMeasure - AICC does not support progress_measure, returning false");return false;}
function AICC_SetPointBasedScore(intScore,intMaxScore,intMinScore){WriteToDebug("AICC_SetPointBasedScore - AICC does not support SetPointBasedScore, falling back to SetScore");return AICC_SetScore(intScore,intMaxScore,intMinScore);}
function AICC_GetScaledScore(intScore,intMaxScore,intMinScore){WriteToDebug("AICC_GetScaledScore - AICC does not support GetScaledScore, returning false");return false;}
function AICC_GetLastError(){WriteToDebug("In AICC_GetLastError, Returning "+intAICCErrorNum);return intAICCErrorNum;}
function AICC_GetLastErrorDesc(){WriteToDebug("In AICC_GetLastErrorDesc, Returning '"+strAICCErrorDesc+"'");return strAICCErrorDesc;}
function AICC_PutParamFailed(){WriteToDebug("ERROR: In AICC_PutParamFailed");SetDirtyAICCData();return;}
function AICC_PutInteractionsFailed(){WriteToDebug("ERROR: In AICC_PutInteractionsFailed");SetDirtyAICCData();if(parent.blnUseLongInteractionResultValues==true){parent.blnUseLongInteractionResultValues=false;parent.AICC_CommitData();}
return;}
function AICC_SetErrorInfo(strErrorNumLine,strErrorDescLine){WriteToDebug("ERROR: In AICC_SetErrorInfo, strErrorNumLine="+strErrorNumLine+", strErrorDescLine="+strErrorDescLine);if(strErrorNumLine.toLowerCase().search(/error\s*=\s*0/)==-1){WriteToDebug("Detected No Error");intAICCErrorNum=NO_ERROR;strAICCErrorDesc="";}
else{WriteToDebug("Setting Error Info");AICC_SetError(GetValueFromAICCLine(strAICCErrorLine),GetValueFromAICCLine(strAICCErrorDesc))}}
function AICC_SetError(intErrorNum,strErrorDesc){WriteToDebug("ERROR: In AICC_SetError, intErrorNum="+intErrorNum+", strErrorDesc="+strErrorDesc);intAICCErrorNum=intErrorNum;strAICCErrorDesc=strAICCErrorDesc;}
function SetDirtyAICCData(){WriteToDebug("In SetDirtyAICCData");blnDirtyAICCData=true;}
function ClearDirtyAICCData(){WriteToDebug("In ClearDirtyAICCData");blnDirtyAICCData=false;}
function IsThereDirtyAICCData(){WriteToDebug("In IsThereDirtyAICCData, returning "+blnDirtyAICCData);return blnDirtyAICCData;}
function GetValueFromAICCLine(strLine){WriteToDebug("In GetValueFromAICCLine, strLine="+strLine);var intPos;var strValue="";var strTemp;strLine=new String(strLine);intPos=strLine.indexOf("=");WriteToDebug("intPos="+intPos);if(intPos>-1&&((intPos+1)<strLine.length)){WriteToDebug("Grabbing value");strTemp=strLine.substring(intPos+1);WriteToDebug("strTemp="+strTemp);strTemp=strTemp.replace(/^\s*/,"");strTemp=strTemp.replace(/\s*$/,"");strValue=strTemp;}
WriteToDebug("returning "+strValue);return strValue;}
function GetNameFromAICCLine(strLine){WriteToDebug("In GetNameFromAICCLine, strLine="+strLine);var intPos;var strTemp;var strName="";strLine=new String(strLine);intPos=strLine.indexOf("=");WriteToDebug("intPos="+intPos);if(intPos>-1&&intPos<strLine.length){WriteToDebug("Grabbing name from name/value pair");strTemp=strLine.substring(0,intPos);WriteToDebug("strTemp="+strTemp);strTemp=strTemp.replace(/^\s*/,"");strTemp=strTemp.replace(/\s*$/,"");strName=strTemp;}
else{WriteToDebug("Grabbing name from group / section heading");intPos=strLine.indexOf("[");WriteToDebug("intPos="+intPos);if(intPos>-1){WriteToDebug("Replacing []");strTemp=strLine.replace(/[\[|\]]/g,"");WriteToDebug("strTemp="+strTemp);strTemp=strTemp.replace(/^\s*/,"");strTemp=strTemp.replace(/\s*$/,"");strName=strTemp;}}
WriteToDebug("returning "+strName);return strName;}
function GetIndexFromAICCName(strLineName){WriteToDebug("In GetIndexFromAICCName, strLineName="+strLineName);var intPos;var strIndex="";var strTemp="";strLine=new String(strLineName);intPos=strLine.indexOf(".");WriteToDebug("intPos="+intPos);if(intPos>-1&&(intPos+1)<strLine.length){WriteToDebug("Grabbing index");strTemp=strLine.substring(intPos+1);WriteToDebug("strTemp="+strTemp);WriteToDebug("Checking for equal sign");intPos=strTemp.indexOf("=");if(intPos>-1&&intPos<strTemp.length){WriteToDebug("Found and removing equal sign");strTemp=strLine.substring(0,intPos);}
WriteToDebug("Removing white space");strTemp=strTemp.replace(/^\s*/,"");strTemp=strTemp.replace(/\s*$/,"");strIndex=strTemp;}
WriteToDebug("returning "+strIndex);return strIndex;}
function ParseGetParamData(strLMSResult){WriteToDebug("In ParseGetParamData");var aryAICCResponseLines;var strLine;var strLineName;var strLineValue;var i,j;strLMSResult=new String(strLMSResult);aryAICCResponseLines=strLMSResult.split("\n");WriteToDebug("Split String");for(i=0;i<aryAICCResponseLines.length;i++){WriteToDebug("Processing Line #"+i+": "+aryAICCResponseLines[i]);strLine=aryAICCResponseLines[i];strLineName="";strLineValue="";if(strLine.length>0){WriteToDebug("Found non-zero length string");if(strLine.charAt(0)=="\r"){WriteToDebug("Detected leading \\r");strLine=strLine.substr(1);}
if(strLine.charAt(strLine.length-1)=="\r"){WriteToDebug("Detected trailing \\r");strLine=strLine.substr(0,strLine.length-1);}
if(strLine.charAt(0)!=";"){WriteToDebug("Found non-comment line");strLineName=GetNameFromAICCLine(strLine);strLineValue=GetValueFromAICCLine(strLine);WriteToDebug("strLineName="+strLineName+", strLineValue="+strLineValue);}}
strLineName=strLineName.toLowerCase();if(!AICC_HasItemBeenFound(strLineName)){WriteToDebug("Detected an un-found item");AICC_FoundItem(strLineName);switch(strLineName){case"version":WriteToDebug("Item is version");var tempVersion=parseFloat(strLineValue);if(isNaN(tempVersion)){tempVersion=0;}
AICC_LMS_Version=tempVersion;break;case"student_id":WriteToDebug("Item is student_id");AICC_Student_ID=strLineValue;break;case"student_name":WriteToDebug("Item is student_name");AICC_Student_Name=strLineValue;break;case"lesson_location":WriteToDebug("Item is lesson_location");AICC_Lesson_Location=strLineValue;break;case"score":WriteToDebug("Item is score");AICC_Score=strLineValue;AICC_SeperateScoreValues(AICC_Score);break;case"credit":WriteToDebug("Item is credit");AICC_Credit=strLineValue;AICC_TranslateCredit(AICC_Credit);break;case"lesson_status":WriteToDebug("Item is lesson_status");AICC_Lesson_Status=strLineValue;AICC_TranslateLessonStatus(AICC_Lesson_Status);break;case"time":WriteToDebug("Item is time");AICC_Time=strLineValue;AICC_TranslateTimeToMilliseconds(AICC_Time);break;case"mastery_score":WriteToDebug("Item is mastery_score");AICC_Mastery_Score=strLineValue;AICC_ValidateMasteryScore(AICC_Mastery_Score);break;case"lesson_mode":WriteToDebug("Item is lesson_mode");AICC_Lesson_Mode=strLineValue;AICC_TranslateLessonMode(AICC_Lesson_Mode);break;case"max_time_allowed":WriteToDebug("Item is max_time_allowed");AICC_Max_Time_Allowed=strLineValue;AICC_TranslateMaxTimeToMilliseconds(AICC_Max_Time_Allowed);break;case"time_limit_action":WriteToDebug("Item is time_limit_action");AICC_Time_Limit_Action=strLineValue;AICC_TranslateTimeLimitAction(AICC_Time_Limit_Action);break;case"audio":WriteToDebug("Item is audio");AICC_Audio=strLineValue;AICC_TranslateAudio(AICC_Audio);break;case"speed":WriteToDebug("Item is speed");AICC_Speed=strLineValue;AICC_TranslateSpeed(AICC_Speed);break;case"language":WriteToDebug("Item is language");AICC_Language=strLineValue;break;case"text":WriteToDebug("Item is text");AICC_Text=strLineValue;AICC_TranslateTextPreference(AICC_Text);break;case"course_id":WriteToDebug("Item is course id");AICC_CourseID=strLineValue;break;case"core_vendor":WriteToDebug("Item is core_vendor");AICC_Launch_Data="";strLine="";j=1;if((i+j)<aryAICCResponseLines.length){strLine=aryAICCResponseLines[i+j];}
while(((i+j)<aryAICCResponseLines.length)&&(!IsGroupIdentifier(strLine))){if(strLine.charAt(0)!=";"){AICC_Launch_Data+=strLine+"\n";}
j=j+1;if((i+j)<aryAICCResponseLines.length){strLine=aryAICCResponseLines[i+j];}}
i=i+j-1
AICC_Launch_Data=AICC_Launch_Data.replace(/\s*$/,"");break;case"core_lesson":WriteToDebug("Item is core_lesson");AICC_Data_Chunk="";strLine="";j=1;if((i+j)<aryAICCResponseLines.length){strLine=aryAICCResponseLines[i+j];}
while(((i+j)<aryAICCResponseLines.length)&&(!IsGroupIdentifier(strLine))){if(strLine.charAt(0)!=";"){AICC_Data_Chunk+=strLine+"\n";}
j=j+1;if((i+j)<aryAICCResponseLines.length){strLine=aryAICCResponseLines[i+j];}}
i=i+j-1
AICC_Data_Chunk=AICC_Data_Chunk.replace(/\s*$/,"");break;case"comments":WriteToDebug("Item is comments");AICC_Comments="";strLine="";j=1;if((i+j)<aryAICCResponseLines.length){strLine=aryAICCResponseLines[i+j];}
while(((i+j)<aryAICCResponseLines.length)&&(!IsGroupIdentifier(strLine))){if(strLine.charAt(0)!=";"){AICC_Comments+=strLine+"\n";}
j=j+1;if((i+j)<aryAICCResponseLines.length){strLine=aryAICCResponseLines[i+j];}}
i=i+j-1
AICC_Comments=AICC_Comments.replace(/\s*$/,"");break;case"objectives_status":WriteToDebug("Item is objectives_status");AICC_Objectives="";strLine="";j=1;if((i+j)<aryAICCResponseLines.length){strLine=aryAICCResponseLines[i+j];}
while(((i+j)<aryAICCResponseLines.length)&&(!IsGroupIdentifier(strLine))){if(strLine.charAt(0)!=";"){AICC_Objectives+=strLine+"\n";}
j=j+1;if((i+j)<aryAICCResponseLines.length){strLine=aryAICCResponseLines[i+j];}}
i=i+j-1
AICC_Objectives=AICC_Objectives.replace(/\s*$/,"");AICC_FormatObjectives(AICC_Objectives);break;default:WriteToDebug("Unknown Item Found");break;}}}
return true;}
function IsGroupIdentifier(strLine){WriteToDebug("In IsGroupIdentifier, strLine="+strLine);var intPos;strLine=strLine.replace(/^\s*/,"");intPos=strLine.search(/\[[\w]+\]/);WriteToDebug("intPos="+intPos);if(intPos==0){WriteToDebug("Returning True");return true;}
else{WriteToDebug("Returning False");return false;}}
function AICC_FoundItem(strItem){WriteToDebug("In AICC_FoundItem, strItem="+strItem);aryAICCFoundItems[strItem]=true;}
function AICC_HasItemBeenFound(strItem){WriteToDebug("In AICC_HasItemBeenFound, strItem="+strItem);if(aryAICCFoundItems[strItem]==true){WriteToDebug("Returning True");return true;}
else{WriteToDebug("Returning False");return false;}}
function AICC_SeperateScoreValues(AICC_Score){WriteToDebug("In AICC_SeperateScoreValues, AICC_Score="+AICC_Score);var aryScores;aryScore=AICC_Score.split(",");AICC_fltScoreRaw=aryScore[0];if(IsValidDecimal(AICC_fltScoreRaw)){WriteToDebug("Found a valid decimal");AICC_fltScoreRaw=parseFloat(AICC_fltScoreRaw);}
else{WriteToDebug("ERROR - score from LMS is not a valid decimal");AICC_SetError(AICC_ERROR_INVALID_DECIMAL,"score is not a valid decimal")}
if(aryScore.length>1){WriteToDebug("Max score found");AICC_fltScoreMax=aryScore[1];if(IsValidDecimal(AICC_fltScoreMax)){WriteToDebug("Found a valid decimal");AICC_fltScoreMax=parseFloat(AICC_fltScoreMax);}
else{WriteToDebug("ERROR - max score from LMS is not a valid decimal");AICC_SetError(AICC_ERROR_INVALID_DECIMAL,"max score is not a valid decimal")}}
if(aryScore.length>2){WriteToDebug("Max score found");AICC_fltScoreMin=aryScore[2];if(IsValidDecimal(AICC_fltScoreMin)){WriteToDebug("Found a valid decimal");AICC_fltScoreMin=parseFloat(AICC_fltScoreMin);}
else{WriteToDebug("ERROR - min score from LMS is not a valid decimal");AICC_SetError(AICC_ERROR_INVALID_DECIMAL,"min score is not a valid decimal")}}}
function AICC_ValidateMasteryScore(strScore){WriteToDebug("In AICC_ValidateMasteryScore, strScore="+strScore);if(IsValidDecimal(strScore)){AICC_Mastery_Score=parseFloat(strScore);}
else{WriteToDebug("ERROR - mastery score from LMS is not a valid decimal");AICC_SetError(AICC_ERROR_INVALID_DECIMAL,"mastery score is not a valid decimal")}}
function AICC_TranslateCredit(strCredit){WriteToDebug("In AICC_TranslateCredit, strCredit="+strCredit);var strFirstChar;strFirstChar=strCredit.toLowerCase().charAt(0);if(strFirstChar=="c"){WriteToDebug("Credit = true");AICC_blnCredit=true;}
else if(strFirstChar=="n"){WriteToDebug("Credit = false");AICC_blnCredit=false}
else{WriteToDebug("ERROR - credit value from LMS is not a valid");AICC_SetError(AICC_ERROR_INVALID_CREDIT,"credit value from LMS is not a valid")}}
function AICC_TranslateLessonMode(strMode){WriteToDebug("In AICC_TranslateLessonMode, strMode="+strMode);var strFirstChar;strFirstChar=strMode.toLowerCase().charAt(0);if(strFirstChar=="b"){WriteToDebug("Lesson Mode = Browse");AICC_strLessonMode=MODE_BROWSE;}
else if(strFirstChar=="n"){WriteToDebug("Lesson Mode = normal");AICC_strLessonMode=MODE_NORMAL;}
else if(strFirstChar=="r"){WriteToDebug("Lesson Mode = review");AICC_strLessonMode=MODE_REVIEW;if(!(typeof(REVIEW_MODE_IS_READ_ONLY)=="undefined")&&REVIEW_MODE_IS_READ_ONLY===true){blnReviewModeSoReadOnly=true;}}
else{WriteToDebug("ERROR - lesson_mode value from LMS is not a valid");AICC_SetError(AICC_ERROR_INVALID_LESSON_MODE,"lesson_mode value from LMS is not a valid")}}
function AICC_TranslateTimeToMilliseconds(strCMITime){WriteToDebug("In AICC_TranslateTimeToMilliseconds, strCMITime="+strCMITime);if(IsValidCMITimeSpan(strCMITime)){AICC_intPreviouslyAccumulatedMilliseconds=ConvertCMITimeSpanToMS(strCMITime);}
else{WriteToDebug("ERROR - Invalid CMITimeSpan");AICC_SetError(AICC_ERROR_INVALID_TIMESPAN,"Invalid timespan (previously accumulated time) received from LMS");}}
function AICC_TranslateMaxTimeToMilliseconds(strCMITime){WriteToDebug("In AICC_TranslateMaxTimeToMilliseconds, strCMITime="+strCMITime);if(IsValidCMITimeSpan(strCMITime)){AICC_intMaxTimeAllowedMilliseconds=ConvertCMITimeSpanToMS(strCMITime);}
else{WriteToDebug("ERROR - Invalid CMITimeSpan");AICC_SetError(AICC_ERROR_INVALID_TIMESPAN,"Invalid timespan (max time allowed) received from LMS");}}
function AICC_TranslateTimeLimitAction(strTimeLimitAction){WriteToDebug("In AICC_TranslateTimeLimitAction, strTimeLimitAction="+strTimeLimitAction);var arySplit;var blnError=false;var strChar1="";var strChar2="";arySplit=strTimeLimitAction.split(",");if(arySplit.length==2){WriteToDebug("Found 2 elements");strChar1=arySplit[0].charAt(0).toLowerCase();strChar2=arySplit[1].charAt(0).toLowerCase();WriteToDebug("Got characters, strChar1="+strChar1+", strChar2="+strChar2);if((strChar1!="e"&&strChar1!="c"&&strChar1!="m"&&strChar1!="n")||(strChar2!="e"&&strChar2!="c"&&strChar2!="m"&&strChar2!="n")||(strChar1==strChar2)){blnError=true
WriteToDebug("Found an invalid character, or 2 identical characters");}
if(strChar1=="e"||strChar2=="e"){AICC_blnExitOnTimeout=true;}
if(strChar1=="c"||strChar2=="c"){AICC_blnExitOnTimeout=false;}
if(strChar1=="n"||strChar2=="n"){AICC_blnShowMessageOnTimeout=false;}
if(strChar1=="m"||strChar2=="m"){AICC_blnShowMessageOnTimeout=true;}
WriteToDebug("AICC_blnExitOnTimeout="+AICC_blnExitOnTimeout+", AICC_blnShowMessageOnTimeout"+AICC_blnShowMessageOnTimeout);}
else{WriteToDebug("Line does not contain two comma-delimited elements");blnError=true;}
if(blnError){WriteToDebug("ERROR - Invalid Time Limit Action");AICC_SetError(AICC_ERROR_INVALID_TIME_LIMIT_ACTION,"Invalid time limit action received from LMS");}}
function AICC_TranslateTextPreference(strPreference){WriteToDebug("In AICC_TranslateTextPreference, strPreference="+strPreference);if(strPreference==-1){WriteToDebug("Text Preference = off");AICC_TextPreference=PREFERENCE_OFF;}
else if(strPreference==0){WriteToDebug("Text Preference = default");AICC_TextPreference=PREFERENCE_DEFAULT;}
else if(strPreference==1){WriteToDebug("Text Preference = on");AICC_TextPreference=PREFERENCE_ON;}
else{WriteToDebug("ERROR - Invalid Text Preference");AICC_SetError(AICC_ERROR_INVALID_PREFERENCE,"Invalid Text Preference received from LMS");}}
function AICC_TranslateLessonStatus(strStatus){WriteToDebug("In AICC_TranslateLessonStatus, strStatus="+strStatus);var strFirstChar;var intPos;var strEntry;strFirstChar=strStatus.charAt(0).toLowerCase();AICC_Status=AICC_ConvertAICCStatusIntoLocalStatus(strFirstChar);WriteToDebug("AICC_Status="+AICC_Status);intPos=strStatus.indexOf(",");if(intPos>0){strEntry=strStatus.substr(intPos);strEntry=strEntry.replace(/,/,"");strFirstChar=strEntry.charAt(0).toLowerCase();if(strFirstChar=="a"){WriteToDebug("Entry is Ab initio");AICC_Entry=ENTRY_FIRST_TIME;}
else if(strFirstChar=="r"){WriteToDebug("Entry is Resume");AICC_Entry=ENTRY_RESUME;}
else{WriteToDebug("ERROR - entry not found");AICC_SetError(AICC_ERROR_INVALID_ENTRY,"Invalid lesson status received from LMS");}}}
function AICC_ConvertAICCStatusIntoLocalStatus(strFirstCharOfAICCStatus){WriteToDebug("In AICC_ConvertAICCStatusIntoLocalStatus, strFirstCharOfAICCStatus="+strFirstCharOfAICCStatus);if(strFirstCharOfAICCStatus=="p"){WriteToDebug("Status is Passed");return LESSON_STATUS_PASSED;}
else if(strFirstCharOfAICCStatus=="f"){WriteToDebug("Status is Failed");return LESSON_STATUS_FAILED;}
else if(strFirstCharOfAICCStatus=="c"){WriteToDebug("Status is Completed");return LESSON_STATUS_COMPLETED;}
else if(strFirstCharOfAICCStatus=="b"){WriteToDebug("Status is Browsed");return LESSON_STATUS_BROWSED;}
else if(strFirstCharOfAICCStatus=="i"){WriteToDebug("Status is Incomplete");return LESSON_STATUS_INCOMPLETE;}
else if(strFirstCharOfAICCStatus=="n"){WriteToDebug("Status is Not Attempted");return LESSON_STATUS_NOT_ATTEMPTED;}
else{WriteToDebug("ERROR - status not found");AICC_SetError(SCORM_ERROR_INVALID_STATUS,"Invalid status");return LESSON_STATUS_NOT_ATTEMPTED;}}
function AICC_TranslateAudio(strAudio){WriteToDebug("In AICC_TranslateAudio, strAudio="+strAudio);var intTempPreference=parseInt(strAudio,10);WriteToDebug("intTempPreference="+intTempPreference);if(intTempPreference>0&&intTempPreference<=100){WriteToDebug("Returning On");AICC_AudioPlayPreference=PREFERENCE_ON;AICC_intAudioVolume=intTempPreference;}
else if(intTempPreference==0){WriteToDebug("Returning Default");AICC_AudioPlayPreference=PREFERENCE_DEFAULT;}
else if(intTempPreference<0){WriteToDebug("returning Off");AICC_AudioPlayPreference=PREFERENCE_OFF;}
else{WriteToDebug("Error: Invalid preference");AICC_SetError(AICC_ERROR_INVALID_PREFERENCE,"Invalid audio preference received from LMS");}}
function AICC_TranslateSpeed(intAICCSpeed){WriteToDebug("In AICC_TranslateSpeed, intAICCSpeed="+intAICCSpeed);var intPercentOfMax;if(!ValidInteger(intAICCSpeed)){WriteToDebug("ERROR - invalid integer");AICC_SetError(AICC_ERROR_INVALID_SPEED,"Invalid speed preference received from LMS - not an integer");return;}
intAICCSpeed=parseInt(intAICCSpeed,10)
if(intAICCSpeed<-100||intAICCSpeed>100){WriteToDebug("ERROR - out of range");AICC_SetError(AICC_ERROR_INVALID_SPEED,"Invalid speed preference received from LMS - out of range");return;}
AICC_Speed=intAICCSpeed;intPercentOfMax=(intAICCSpeed+100)/2;intPercentOfMax=parseInt(intPercentOfMax,10);WriteToDebug("Returning "+intPercentOfMax);AICC_intPercentOfMaxSpeed=intPercentOfMax;}
function AICC_FormatObjectives(strObjectivesFromLMS){WriteToDebug("In AICC_FormatObjectives, strObjectivesFromLMS="+strObjectivesFromLMS);var aryLines;var i;var strLineName;var strLineValue;var strLineType;var strIndex;aryLines=strObjectivesFromLMS.split("\n");for(i=0;i<aryLines.length;i++){WriteToDebug("Extracting Index From Line: "+aryLines[i]);strLineName=GetNameFromAICCLine(aryLines[i]);strIndex=GetIndexFromAICCName(strLineName);strIndex=parseInt(strIndex,10);WriteToDebug("strIndex: "+strIndex);AICC_aryObjectivesRead[parseInt(strIndex,10)]=new Array(3);}
for(i=0;i<aryLines.length;i++){WriteToDebug("Populating Line "+aryLines[i]);strLineName=GetNameFromAICCLine(aryLines[i]);strLineValue=GetValueFromAICCLine(aryLines[i]);strIndex=GetIndexFromAICCName(strLineName);strIndex=strIndex;WriteToDebug("strLineName: "+strLineName);WriteToDebug("strLineValue: "+strLineValue);WriteToDebug("strIndex: "+strIndex);strLineType=strLineName.substr(0,4).toLowerCase();if(strLineType=="j_id"){WriteToDebug("Found ID");AICC_aryObjectivesRead[parseInt(strIndex,10)][AICC_OBJ_ARRAY_ID]=strLineValue;}
else if(strLineType=="j_st"){WriteToDebug("Found Status");AICC_aryObjectivesRead[parseInt(strIndex,10)][AICC_OBJ_ARRAY_STATUS]=AICC_ConvertAICCStatusIntoLocalStatus(strLineValue.charAt(0).toLowerCase());}
else if(strLineType=="j_sc"){WriteToDebug("Found Score");AICC_aryObjectivesRead[parseInt(strIndex,10)][AICC_OBJ_ARRAY_SCORE]=AICC_ExtractSingleScoreFromObjective(strLineValue);}
else{WriteToDebug("WARNING - unidentified objective data found - "+aryLines[i]);}}}
function AICC_ExtractSingleScoreFromObjective(strLineValue){WriteToDebug("In AICC_ExtractSingleScoreFromObjective, strLineValue="+strLineValue);var aryParts;aryParts=strLineValue.split(";");aryParts=aryParts[0].split(",");WriteToDebug("returning "+aryParts[0]);return aryParts[0];}
function FindObjectiveById(strID,aryObjectives){WriteToDebug("In FindObjectiveById, strID="+strID);for(var i=0;i<=aryObjectives.length;i++){WriteToDebug("Searching element "+i);if(aryObjectives[i]){WriteToDebug("Element Exists");if(aryObjectives[i][AICC_OBJ_ARRAY_ID].toString()==strID.toString()){WriteToDebug("Element matches");return i;}}}
return null;}
function AICC_FindInteractionIndexFromID(strInteractionID){WriteToDebug("AICC_FindInteractionIndexFromID - AICC does not support interaction retrieval, returning null");return null;}
function AICC_GetInteractionType(strInteractionID)
{WriteToDebug("AICC_GetInteractionType - AICC does not support interaction retrieval, returning empty string");return'';}
function AICC_GetInteractionTimestamp(strInteractionID)
{WriteToDebug("AICC_GetInteractionTimestamp - AICC does not support interaction retrieval, returning empty string");return'';}
function AICC_GetInteractionCorrectResponses(strInteractionID)
{WriteToDebug("AICC_GetInteractionCorrectResponses - AICC does not support interaction retrieval, returning empty array");return new Array();}
function AICC_GetInteractionWeighting(strInteractionID)
{WriteToDebug("AICC_GetInteractionWeighting - AICC does not support interaction retrieval, returning empty string");return'';}
function AICC_GetInteractionLearnerResponses(strInteractionID)
{WriteToDebug("AICC_GetInteractionLearnerResponses - AICC does not support interaction retrieval, returning empty array");return new Array();}
function AICC_GetInteractionResult(strInteractionID)
{WriteToDebug("AICC_GetInteractionResult - AICC does not support interaction retrieval, returning empty string");return'';}
function AICC_GetInteractionLatency(strInteractionID)
{WriteToDebug("AICC_GetInteractionDescription - AICC does not support interaction retrieval, returning empty string");return'';}
function AICC_GetInteractionDescription(strInteractionID)
{WriteToDebug("AICC_GetInteractionDescription - AICC does not support interaction retrieval, returning empty string");return'';}
function AICC_CreateDataBucket(strBucketId,intMinSize,intMaxSize){WriteToDebug("AICC_CreateDataBucket - AICC does not support SSP, returning false");return false;}
function AICC_GetDataFromBucket(strBucketId){WriteToDebug("AICC_GetDataFromBucket - AICC does not support SSP, returning empty string");return"";}
function AICC_PutDataInBucket(strBucketId,strData,blnAppendToEnd){WriteToDebug("AICC_PutDataInBucket - AICC does not support SSP, returning false");return false;}
function AICC_DetectSSPSupport(){WriteToDebug("AICC_DetectSSPSupport - AICC does not support SSP, returning false");return false;}
function AICC_GetBucketInfo(strBucketId){WriteToDebug("AICC_DetectSSPSupport - AICC does not support SSP, returning empty SSPBucketSize");return new SSPBucketSize(0,0);}
function AICC_SetNavigationRequest(strNavRequest){WriteToDebug("AICC_SetNavigationRequest - AICC does not support navigation requests, returning false");return false;}
function AICC_GetNavigationRequest(){WriteToDebug("AICC_SetNavigationRequest - AICC does not support navigation requests, returning false");return false;}
function FormAICCPostData(){WriteToDebug("In FormAICCPostData");var strAICCData="";strAICCData+="[Core]\r\n";strAICCData+="Lesson_Location="+AICC_Lesson_Location+"\r\n";strAICCData+="Lesson_Status="+AICC_TranslateLessonStatusToAICC(AICC_Status)+"\r\n";strAICCData+="Score="+AICC_TranslateScoreToAICC()+"\r\n";strAICCData+="Time="+AICC_TranslateTimeToAICC()+"\r\n";strAICCData+="[Comments]\r\n"+AICC_TranslateCommentsToAICC()+"\r\n";strAICCData+="[Objectives_Status]\r\n"+AICC_TranslateObjectivesToAICC()+"\r\n";strAICCData+="[Student_Preferences]\r\n";strAICCData+="Audio="+AICC_TranslateAudioToAICC()+"\r\n";strAICCData+="Language="+AICC_Language+"\r\n";strAICCData+="Speed="+AICC_TranslateSpeedToAICC()+"\r\n";strAICCData+="Text="+AICC_TranslateTextToAICC()+"\r\n";strAICCData+="[Core_Lesson]\r\n";strAICCData+=AICC_Data_Chunk;WriteToDebug("FormAICCPostData returning: "+strAICCData);return strAICCData;}
function AICC_TranslateLessonStatusToAICC(intStatus){WriteToDebug("In AICC_TranslateLessonStatusToAICC");switch(intStatus){case LESSON_STATUS_PASSED:WriteToDebug("Status is passed");AICC_Lesson_Status="P";break;case LESSON_STATUS_COMPLETED:WriteToDebug("Status is completed");AICC_Lesson_Status="C";break;case LESSON_STATUS_FAILED:WriteToDebug("Status is failed");AICC_Lesson_Status="F";break;case LESSON_STATUS_INCOMPLETE:WriteToDebug("Status is incomplete");AICC_Lesson_Status="I";break;case LESSON_STATUS_BROWSED:WriteToDebug("Status is browsed");AICC_Lesson_Status="B";break;case LESSON_STATUS_NOT_ATTEMPTED:WriteToDebug("Status is not attempted");AICC_Lesson_Status="N";break;}
return AICC_Lesson_Status;}
function AICC_TranslateScoreToAICC(){WriteToDebug("In AICC_TranslateScoreToAICC");AICC_Score=AICC_fltScoreRaw;if(AICC_LMS_Version<3&&AICC_fltScoreRaw!=""){AICC_Score=parseInt(AICC_Score,10);}
if((AICC_REPORT_MIN_MAX_SCORE===undefined||AICC_REPORT_MIN_MAX_SCORE===null||AICC_REPORT_MIN_MAX_SCORE===true)&&(AICC_LMS_Version>=3)){WriteToDebug("Using max and min values if available.");if((AICC_fltScoreMax!="")||(AICC_fltScoreMin!="")){WriteToDebug("Appending Max and Min scores");AICC_Score+=","+AICC_fltScoreMax+","+AICC_fltScoreMin;}}
WriteToDebug("AICC_Score="+AICC_Score);return AICC_Score;}
function AICC_TranslateTimeToAICC(){WriteToDebug("In AICC_TranslateTimeToAICC");var strTime;strTime=ConvertMilliSecondsToSCORMTime(AICC_intSessionTimeMilliseconds,false);return strTime;}
function AICC_TranslateCommentsToAICC(){WriteToDebug("In AICC_TranslateCommentsToAICC");var strComments="";for(var i=0;i<AICC_aryCommentsFromLearner.length;i++){strComments+="<"+(i+1)+">"+AICC_aryCommentsFromLearner[i]+"<e."+(i+1)+">";}
return strComments;}
function AICC_TranslateObjectivesToAICC(){WriteToDebug("In AICC_TranslateObjectivesToAICC");var strObjectives="";for(var i=0;i<AICC_aryObjectivesWrite.length;i++){WriteToDebug("Looking at index: "+i);if(AICC_aryObjectivesWrite[i]){WriteToDebug("Element "+i+" exists, id="+AICC_aryObjectivesWrite[i][AICC_OBJ_ARRAY_ID]+", score="+AICC_aryObjectivesWrite[i][AICC_OBJ_ARRAY_SCORE]+", status="+AICC_aryObjectivesWrite[i][AICC_OBJ_ARRAY_STATUS]);strObjectives+="J_ID."+(i+1)+"="+AICC_aryObjectivesWrite[i][AICC_OBJ_ARRAY_ID]+"\r\n";if(AICC_aryObjectivesWrite[i][AICC_OBJ_ARRAY_SCORE]!=""){strObjectives+="J_Score."+(i+1)+"="+AICC_aryObjectivesWrite[i][AICC_OBJ_ARRAY_SCORE]+"\r\n";}
if(AICC_aryObjectivesWrite[i][AICC_OBJ_ARRAY_STATUS]!=""){strObjectives+="J_Status."+(i+1)+"="+AICC_TranslateLessonStatusToAICC(AICC_aryObjectivesWrite[i][AICC_OBJ_ARRAY_STATUS])+"\r\n";}}}
return strObjectives;}
function AICC_TranslateAudioToAICC(){WriteToDebug("In AICC_TranslateAudioToAICC");var strReturn;switch(AICC_AudioPlayPreference){case PREFERENCE_ON:WriteToDebug("Preference is ON");strReturn=AICC_intAudioVolume;break;case PREFERENCE_DEFAULT:WriteToDebug("Preference is DEFAULT");strReturn=0;break;case PREFERENCE_OFF:WriteToDebug("Preference is OFF");strReturn=-1;break;}
return strReturn;}
function AICC_TranslateSpeedToAICC(){WriteToDebug("In AICC_TranslateSpeedToAICC");var intAICCSpeed;intAICCSpeed=(AICC_intPercentOfMaxSpeed*2)-100;return intAICCSpeed;}
function AICC_TranslateTextToAICC(){WriteToDebug("In AICC_TranslateTextToAICC");var strPreference=0;if(AICC_TextPreference==PREFERENCE_OFF){strPreference=-1;}
else if(AICC_TextPreference==PREFERENCE_DEFAULT){strPreference=0;}
else if(AICC_TextPreference==PREFERENCE_ON){strPreference=1;}
return strPreference;}
function FormAICCInteractionsData(){WriteToDebug("In FormAICCInteractionsData");var strInteractions;var strDate;var strTime;var strResult="";strInteractions='"course_id","student_id","lesson_id","date","time","interaction_id",'+'"objective_id","type_interaction","correct_response","student_response",'+'"result","weighting","latency"\r\n';var blnCorrect="";var strResponse="";var strCorrectResponse="";var strLatency="";for(var i=0;i<AICC_aryInteractions.length;i++){blnCorrect=AICC_aryInteractions[i][AICC_INTERACTIONS_CORRECT];strResult="";if(blnCorrect==true||blnCorrect==INTERACTION_RESULT_CORRECT){strResult=AICC_RESULT_CORRECT;}
else if(blnCorrect=="false"||blnCorrect==INTERACTION_RESULT_WRONG){strResult=AICC_RESULT_WRONG;}
else if(blnCorrect==INTERACTION_RESULT_UNANTICIPATED){strResult=AICC_RESULT_UNANTICIPATED;}
else if(blnCorrect==INTERACTION_RESULT_NEUTRAL){strResult=AICC_RESULT_NEUTRAL;}
strDate=ConvertDateToCMIDate(AICC_aryInteractions[i][AICC_INTERACTIONS_TIME_STAMP]);strTime=ConvertDateToCMITime(AICC_aryInteractions[i][AICC_INTERACTIONS_TIME_STAMP]);if(blnUseLongInteractionResultValues==true){strResponse=AICC_aryInteractions[i][AICC_INTERACTIONS_RESPONSE_LONG];strCorrectResponse=AICC_aryInteractions[i][AICC_INTERACTIONS_CORRECT_RESPONSE_LONG];}
else{strResponse=AICC_aryInteractions[i][AICC_INTERACTIONS_RESPONSE];strCorrectResponse=AICC_aryInteractions[i][AICC_INTERACTIONS_CORRECT_RESPONSE];}
strResponse=new String(strResponse);strCorrectResponse=new String(strCorrectResponse);var tempLatency=AICC_aryInteractions[i][AICC_INTERACTIONS_LATENCY];if(tempLatency!==null&&tempLatency!==undefined&&tempLatency!=""){strLatency=ConvertMilliSecondsToSCORMTime(tempLatency,false);}
strInteractions+='"'+AICC_CourseID.replace("\"","")+'","'+AICC_Student_ID.replace("\"","")+'","'+AICC_LESSON_ID.replace("\"","")+'","'+
strDate+'","'+strTime+'","'+AICC_aryInteractions[i][AICC_INTERACTIONS_ID].replace("\"","")+'",'+'""'+',"'+AICC_aryInteractions[i][AICC_INTERACTIONS_TYPE]+'","'+strCorrectResponse.replace("\"","")+'","'+
strResponse.replace("\"","")+'","'+strResult+'","'+
AICC_aryInteractions[i][AICC_INTERACTIONS_WEIGHTING]+'","'+strLatency+'"\r\n';}
return strInteractions;}
function DisplayAICCVariables(){var strAlert="";strAlert+="AICC_Student_ID = "+AICC_Student_ID+"\n";strAlert+="AICC_Student_Name = "+AICC_Student_Name+"\n";strAlert+="AICC_Lesson_Location = "+AICC_Lesson_Location+"\n";strAlert+="AICC_Score = "+AICC_Score+"\n";strAlert+="AICC_Credit = "+AICC_Credit+"\n";strAlert+="AICC_Lesson_Status = "+AICC_Lesson_Status+"\n";strAlert+="AICC_Time = "+AICC_Time+"\n";strAlert+="AICC_Mastery_Score = "+AICC_Mastery_Score+"\n";strAlert+="AICC_Lesson_Mode = "+AICC_Lesson_Mode+"\n";strAlert+="AICC_Max_Time_Allowed = "+AICC_Max_Time_Allowed+"\n";strAlert+="AICC_Time_Limit_Action = "+AICC_Time_Limit_Action+"\n";strAlert+="AICC_Audio = "+AICC_Audio+"\n";strAlert+="AICC_Speed = "+AICC_Speed+"\n";strAlert+="AICC_Language = "+AICC_Language+"\n";strAlert+="AICC_Text = "+AICC_Text+"\n";strAlert+="AICC_Launch_Data = "+AICC_Launch_Data+"\n";strAlert+="AICC_Data_Chunk = "+AICC_Data_Chunk+"\n";strAlert+="AICC_Comments = "+AICC_Comments+"\n";strAlert+="AICC_Objectives = "+AICC_Objectives+"\n";alert(strAlert)}
function NONE_Initialize(){WriteToDebug("In NONE_Initialize, Returning true");InitializeExecuted(true,"");return true;}
function NONE_Finish(strExitType,blnStatusWasSet){WriteToDebug("In NONE_Finish, Returning true");return true;}
function NONE_CommitData(){WriteToDebug("In NONE_CommitData, Returning true");return true;}
function NONE_GetStudentID(){WriteToDebug("In NONE_GetStudentID, Returning ''");return"";}
function NONE_GetStudentName(){WriteToDebug("In NONE_GetStudentName, Returning ''");return"";}
function NONE_GetBookmark(){WriteToDebug("In NONE_GetBookmark, Returning ''");return"";}
function NONE_SetBookmark(strBookmark){WriteToDebug("In NONE_SetBookmark, Returning true");return true;}
function NONE_GetDataChunk(){WriteToDebug("In NONE_GetDataChunk, Returning ''");return"";}
function NONE_SetDataChunk(strData){WriteToDebug("In NONE_SetDataChunk, Returning true");return true;}
function NONE_GetLaunchData(){WriteToDebug("In NONE_GetLaunchData, Returning ''");return"";}
function NONE_GetComments(){WriteToDebug("In NONE_GetComments, Returning ''");return"";}
function NONE_WriteComment(strComment){WriteToDebug("In NONE_WriteComment, Returning true");return true;}
function NONE_GetLMSComments(){WriteToDebug("In NONE_GetLMSComments, Returning ''");return"";}
function NONE_GetAudioPlayPreference(){WriteToDebug("In NONE_GetAudioPlayPreference, Returning "+PREFERENCE_DEFAULT);return PREFERENCE_DEFAULT;}
function NONE_GetAudioVolumePreference(){WriteToDebug("In NONE_GetAudioVolumePreference, Returning 100");return 100;}
function NONE_SetAudioPreference(PlayPreference,intPercentOfMaxSpeed){WriteToDebug("In NONE_SetAudioPreference, Returning true");return true;}
function NONE_SetLanguagePreference(strLanguage){WriteToDebug("In NONE_SetLanguagePreference, Returning true");return true;}
function NONE_GetLanguagePreference(){WriteToDebug("In NONE_GetLanguagePreference, Returning ''");return"";}
function NONE_SetSpeedPreference(intPercentOfMax){WriteToDebug("In NONE_SetSpeedPreference, Returning true");return true;}
function NONE_GetSpeedPreference(){WriteToDebug("In NONE_GetSpeedPreference, Returning 100");return 100;}
function NONE_SetTextPreference(intPreference){WriteToDebug("In NONE_SetTextPreference, Returning true");return true;}
function NONE_GetTextPreference(){WriteToDebug("In NONE_GetTextPreference, Returning "+PREFERENCE_DEFAULT);return PREFERENCE_DEFAULT;}
function NONE_GetPreviouslyAccumulatedTime(){WriteToDebug("In NONE_GetPreviouslyAccumulatedTime, Returning 0");return 0;}
function NONE_SaveTime(intMilliSeconds){WriteToDebug("In intMilliSeconds, Returning true");return true;}
function NONE_GetMaxTimeAllowed(){WriteToDebug("In NONE_GetMaxTimeAllowed, Returning 36002439999");return MAX_CMI_TIME;}
function NONE_DisplayMessageOnTimeout(){WriteToDebug("In NONE_DisplayMessageOnTimeout, Returning false");return false;}
function NONE_ExitOnTimeout(){WriteToDebug("In NONE_ExitOnTimeout, Returning false");return false;}
function NONE_GetPassingScore(){WriteToDebug("In NONE_GetPassingScore, Returning ''");return'';}
function NONE_GetScore(){WriteToDebug("In NONE_GetScore, Returning 0");return 0;}
function NONE_SetScore(intScore,intMaxScore,intMinScore){WriteToDebug("In NONE_SetScore, Returning true");return true;}
function NONE_RecordTrueFalseInteraction(){WriteToDebug("In NONE_RecordTrueFalseInteraction, Returning true");return true;}
function NONE_RecordMultipleChoiceInteraction(strID,strResponse,blnCorrect,strCorrectResponse){WriteToDebug("In NONE_RecordMultipleChoiceInteraction, Returning true");return true;}
function NONE_RecordFillInInteraction(){WriteToDebug("In NONE_RecordFillInInteraction, Returning true");return true;}
function NONE_RecordMatchingInteraction(){WriteToDebug("In NONE_RecordMatchingInteraction, Returning true");return true;}
function NONE_RecordPerformanceInteraction(){WriteToDebug("In NONE_RecordPerformanceInteraction, Returning true");return true;}
function NONE_RecordSequencingInteraction(){WriteToDebug("In NONE_RecordSequencingInteraction, Returning true");return true;}
function NONE_RecordLikertInteraction(){WriteToDebug("In RecordLikertInteraction, Returning true");return true;}
function NONE_RecordNumericInteraction(){WriteToDebug("In NONE_RecordNumericInteraction, Returning true");return true;}
function NONE_GetEntryMode(){WriteToDebug("In NONE_GetEntryMode, Returning "+ENTRY_FIRST_TIME);return ENTRY_FIRST_TIME;}
function NONE_GetLessonMode(){WriteToDebug("In NONE_GetLessonMode, Returning "+MODE_NORMAL);return MODE_NORMAL;}
function NONE_GetTakingForCredit(){WriteToDebug("In NONE_GetTakingForCredit, Returning true");return true;}
function NONE_SetObjectiveScore(strObjectiveID,intScore,intMaxScore,intMinScore){WriteToDebug("In NONE_SetObjectiveScore, Returning true");return true;}
function NONE_SetObjectiveStatus(strObjectiveID,Lesson_Status){WriteToDebug("In NONE_SetObjectiveStatus, Returning true");return true;}
function NONE_SetObjectiveDescription(strObjectiveID,strObjectiveDescription){WriteToDebug("In NONE_SetObjectiveDescription, Returning true");return true;}
function NONE_GetObjectiveScore(strObjectiveID){WriteToDebug("In NONE_SetObjectiveScore, Returning ''");return'';}
function NONE_GetObjectiveStatus(strObjectiveID){WriteToDebug("In NONE_SetObjectiveStatus, Returning Not Attempted");return LESSON_STATUS_NOT_ATTEMPTED;}
function NONE_GetObjectiveDescription(strObjectiveID){WriteToDebug("In NONE_GetObjectiveDescription, ''");return"";}
function NONE_FindInteractionIndexFromID(strInteractionID){WriteToDebug("NONE_FindInteractionIndexFromID - NONE does not support interaction retrieval, returning null");return null;}
function NONE_GetInteractionType(strInteractionID)
{WriteToDebug("NONE_GetInteractionType - NONE does not support interaction retrieval, returning empty string");return'';}
function NONE_GetInteractionTimestamp(strInteractionID)
{WriteToDebug("NONE_GetInteractionTimestamp - NONE does not support interaction retrieval, returning empty string");return'';}
function NONE_GetInteractionCorrectResponses(strInteractionID)
{WriteToDebug("NONE_GetInteractionCorrectResponses - NONE does not support interaction retrieval, returning empty array");return new Array();}
function NONE_GetInteractionWeighting(strInteractionID)
{WriteToDebug("NONE_GetInteractionWeighting - NONE does not support interaction retrieval, returning empty string");return'';}
function NONE_GetInteractionLearnerResponses(strInteractionID)
{WriteToDebug("NONE_GetInteractionLearnerResponses - NONE does not support interaction retrieval, returning empty array");return new Array();}
function NONE_GetInteractionResult(strInteractionID)
{WriteToDebug("NONE_GetInteractionResult - NONE does not support interaction retrieval, returning empty string");return'';}
function NONE_GetInteractionLatency(strInteractionID)
{WriteToDebug("NONE_GetInteractionDescription - NONE does not support interaction retrieval, returning empty string");return'';}
function NONE_GetInteractionDescription(strInteractionID)
{WriteToDebug("NONE_GetInteractionDescription - NONE does not support interaction retrieval, returning empty string");return'';}
function NONE_CreateDataBucket(strBucketId,intMinSize,intMaxSize){WriteToDebug("NONE_CreateDataBucket - NONE does not support SSP, returning false");return false;}
function NONE_GetDataFromBucket(strBucketId){WriteToDebug("NONE_GetDataFromBucket - NONE does not support SSP, returning empty string");return"";}
function NONE_PutDataInBucket(strBucketId,strData,blnAppendToEnd){WriteToDebug("NONE_PutDataInBucket - NONE does not support SSP, returning false");return false;}
function NONE_DetectSSPSupport(){WriteToDebug("NONE_DetectSSPSupport - NONE does not support SSP, returning false");return false;}
function NONE_GetBucketInfo(strBucketId){WriteToDebug("NONE_DetectSSPSupport - NONE does not support SSP, returning empty SSPBucketSize");return new SSPBucketSize(0,0);}
function NONE_SetNavigationRequest(strNavRequest){WriteToDebug("NONE_SetNavigationRequest - NONE does not support navigation requests, returning false");return false;}
function NONE_GetNavigationRequest(){WriteToDebug("NONE_GetNavigationRequest - NONE does not support navigation requests, returning false");return false;}
function NONE_SetFailed(){WriteToDebug("In NONE_SetFailed, Returning true");return true;}
function NONE_SetPassed(){WriteToDebug("In NONE_SetPassed, Returning true");return true;}
function NONE_SetCompleted(){WriteToDebug("In NONE_SetCompleted, Returning true");return true;}
function NONE_ResetStatus(){WriteToDebug("In NONE_ResetStatus, Returning true");return true;}
function NONE_GetStatus(){WriteToDebug("In NONE_GetStatus, Returning "+LESSON_STATUS_INCOMPLETE);return LESSON_STATUS_INCOMPLETE;}
function NONE_GetProgressMeasure(){WriteToDebug("NONE_GetProgressMeasure - NONE does not support progress_measure, returning false");return false;}
function NONE_SetProgressMeasure(){WriteToDebug("NONE_SetProgressMeasure - NONE does not support progress_measure, returning false");return false;}
function NONE_GetObjectiveProgressMeasure(){WriteToDebug("NONE_GetObjectiveProgressMeasure - NONE does not support progress_measure, returning false");return false;}
function NONE_SetObjectiveProgressMeasure(){WriteToDebug("NONE_SetObjectiveProgressMeasure - NONE does not support progress_measure, returning false");return false;}
function NONE_SetPointBasedScore(intScore,intMaxScore,intMinScore){WriteToDebug("NONE_SetPointBasedScore - NONE does not support SetPointBasedScore, returning false");return false;}
function NONE_GetScaledScore(intScore,intMaxScore,intMinScore){WriteToDebug("NONE_GetScaledScore - NONE does not support GetScaledScore, returning false");return false;}
function NONE_GetLastError(){WriteToDebug("In NONE_GetLastError, Returning "+NO_ERROR);return NO_ERROR;}
function NONE_GetLastErrorDesc(){WriteToDebug("In NONE_GetLastErrorDesc, Returning ''");return"";}"0.31.0";var CryptoJS=CryptoJS||function(i,m){var p={},h=p.lib={},n=h.Base=function(){function a(){}return{extend:function(b){a.prototype=this;var c=new a;b&&c.mixIn(b);c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.$super.extend(this)}}}(),o=h.WordArray=n.extend({init:function(a,b){a=this.words=a||[];this.sigBytes=b!=m?b:4*a.length},toString:function(a){return(a||e).stringify(this)},concat:function(a){var b=this.words,c=a.words,d=this.sigBytes,a=a.sigBytes;this.clamp();if(d%4)for(var f=0;f<a;f++)b[d+f>>>2]|=(c[f>>>2]>>>24-8*(f%4)&255)<<24-8*((d+f)%4);else if(65535<c.length)for(f=0;f<a;f+=4)b[d+f>>>2]=c[f>>>2];else b.push.apply(b,c);this.sigBytes+=a;return this},clamp:function(){var a=this.words,b=this.sigBytes;a[b>>>2]&=4294967295<<32-8*(b%4);a.length=i.ceil(b/4)},clone:function(){var a=n.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var b=[],c=0;c<a;c+=4)b.push(4294967296*i.random()|0);return o.create(b,a)}}),q=p.enc={},e=q.Hex={stringify:function(a){for(var b=a.words,a=a.sigBytes,c=[],d=0;d<a;d++){var f=b[d>>>2]>>>24-8*(d%4)&255;c.push((f>>>4).toString(16));c.push((f&15).toString(16))}return c.join("")},parse:function(a){for(var b=a.length,c=[],d=0;d<b;d+=2)c[d>>>3]|=parseInt(a.substr(d,2),16)<<24-4*(d%8);return o.create(c,b/2)}},g=q.Latin1={stringify:function(a){for(var b=a.words,a=a.sigBytes,c=[],d=0;d<a;d++)c.push(String.fromCharCode(b[d>>>2]>>>24-8*(d%4)&255));return c.join("")},parse:function(a){for(var b=a.length,c=[],d=0;d<b;d++)c[d>>>2]|=(a.charCodeAt(d)&255)<<24-8*(d%4);return o.create(c,b)}},j=q.Utf8={stringify:function(a){try{return decodeURIComponent(escape(g.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data");}},parse:function(a){return g.parse(unescape(encodeURIComponent(a)))}},k=h.BufferedBlockAlgorithm=n.extend({reset:function(){this._data=o.create();this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=j.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var b=this._data,c=b.words,d=b.sigBytes,f=this.blockSize,e=d/(4*f),e=a?i.ceil(e):i.max((e|0)-this._minBufferSize,0),a=e*f,d=i.min(4*a,d);if(a){for(var g=0;g<a;g+=f)this._doProcessBlock(c,g);g=c.splice(0,a);b.sigBytes-=d}return o.create(g,d)},clone:function(){var a=n.clone.call(this);a._data=this._data.clone();return a},_minBufferSize:0});h.Hasher=k.extend({init:function(){this.reset()},reset:function(){k.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);this._doFinalize();return this._hash},clone:function(){var a=k.clone.call(this);a._hash=this._hash.clone();return a},blockSize:16,_createHelper:function(a){return function(b,c){return a.create(c).finalize(b)}},_createHmacHelper:function(a){return function(b,c){return l.HMAC.create(a,c).finalize(b)}}});var l=p.algo={};return p}(Math);(function(){var i=CryptoJS,m=i.lib,p=m.WordArray,m=m.Hasher,h=[],n=i.algo.SHA1=m.extend({_doReset:function(){this._hash=p.create([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(o,i){for(var e=this._hash.words,g=e[0],j=e[1],k=e[2],l=e[3],a=e[4],b=0;80>b;b++){if(16>b)h[b]=o[i+b]|0;else{var c=h[b-3]^h[b-8]^h[b-14]^h[b-16];h[b]=c<<1|c>>>31}c=(g<<5|g>>>27)+a+h[b];c=20>b?c+((j&k|~j&l)+1518500249):40>b?c+((j^k^l)+1859775393):60>b?c+((j&k|j&l|k&l)-1894007588):c+((j^k^l)-
899497514);a=l;l=k;k=j<<30|j>>>2;j=g;g=c}e[0]=e[0]+g|0;e[1]=e[1]+j|0;e[2]=e[2]+k|0;e[3]=e[3]+l|0;e[4]=e[4]+a|0},_doFinalize:function(){var i=this._data,h=i.words,e=8*this._nDataBytes,g=8*i.sigBytes;h[g>>>5]|=128<<24-g%32;h[(g+64>>>9<<4)+15]=e;i.sigBytes=4*h.length;this._process()}});i.SHA1=m._createHelper(n);i.HmacSHA1=m._createHmacHelper(n)})();(function(){var C=CryptoJS;var C_lib=C.lib;var WordArray=C_lib.WordArray;var C_enc=C.enc;var Base64=C_enc.Base64={stringify:function(wordArray){var words=wordArray.words;var sigBytes=wordArray.sigBytes;var map=this._map;wordArray.clamp();var base64Chars=[];for(var i=0;i<sigBytes;i+=3){var byte1=(words[i>>>2]>>>(24-(i%4)*8))&0xff;var byte2=(words[(i+1)>>>2]>>>(24-((i+1)%4)*8))&0xff;var byte3=(words[(i+2)>>>2]>>>(24-((i+2)%4)*8))&0xff;var triplet=(byte1<<16)|(byte2<<8)|byte3;for(var j=0;(j<4)&&(i+j*0.75<sigBytes);j++){base64Chars.push(map.charAt((triplet>>>(6*(3-j)))&0x3f));}}
var paddingChar=map.charAt(64);if(paddingChar){while(base64Chars.length%4){base64Chars.push(paddingChar);}}
return base64Chars.join('');},parse:function(base64Str){base64Str=base64Str.replace(/\s/g,'');var base64StrLength=base64Str.length;var map=this._map;var paddingChar=map.charAt(64);if(paddingChar){var paddingIndex=base64Str.indexOf(paddingChar);if(paddingIndex!=-1){base64StrLength=paddingIndex;}}
var words=[];var nBytes=0;for(var i=0;i<base64StrLength;i++){if(i%4){var bitsHigh=map.indexOf(base64Str.charAt(i-1))<<((i%4)*2);var bitsLow=map.indexOf(base64Str.charAt(i))>>>(6-(i%4)*2);words[nBytes>>>2]|=(bitsHigh|bitsLow)<<(24-(nBytes%4)*8);nBytes++;}}
return WordArray.create(words,nBytes);},_map:'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='};}());var TinCan;(function(){"use strict";var _reservedQSParams={statementId:true,voidedStatementId:true,verb:true,object:true,registration:true,context:true,actor:true,since:true,until:true,limit:true,authoritative:true,sparse:true,instructor:true,ascending:true,continueToken:true,agent:true,activityId:true,stateId:true,profileId:true,activity_platform:true,grouping:true,"Accept-Language":true};TinCan=function(cfg){this.log("constructor");this.recordStores=[];this.actor=null;this.activity=null;this.registration=null;this.context=null;this.init(cfg);};TinCan.prototype={LOG_SRC:"TinCan",log:function(msg,src){if(TinCan.DEBUG&&typeof console!=="undefined"&&console.log){src=src||this.LOG_SRC||"TinCan";console.log("TinCan."+src+": "+msg);}},init:function(cfg){this.log("init");var i;cfg=cfg||{};if(cfg.hasOwnProperty("url")&&cfg.url!==""){this._initFromQueryString(cfg.url);}
if(cfg.hasOwnProperty("recordStores")&&cfg.recordStores!==undefined){for(i=0;i<cfg.recordStores.length;i+=1){this.addRecordStore(cfg.recordStores[i]);}}
if(cfg.hasOwnProperty("activity")){if(cfg.activity instanceof TinCan.Activity){this.activity=cfg.activity;}
else{this.activity=new TinCan.Activity(cfg.activity);}}
if(cfg.hasOwnProperty("actor")){if(cfg.actor instanceof TinCan.Agent){this.actor=cfg.actor;}
else{this.actor=new TinCan.Agent(cfg.actor);}}
if(cfg.hasOwnProperty("context")){if(cfg.context instanceof TinCan.Context){this.context=cfg.context;}
else{this.context=new TinCan.Context(cfg.context);}}
if(cfg.hasOwnProperty("registration")){this.registration=cfg.registration;}},_initFromQueryString:function(url){this.log("_initFromQueryString");var i,prop,qsParams=TinCan.Utils.parseURL(url).params,lrsProps=["endpoint","auth"],lrsCfg={},contextCfg,extended=null;if(qsParams.hasOwnProperty("actor")){this.log("_initFromQueryString - found actor: "+qsParams.actor);try{this.actor=TinCan.Agent.fromJSON(qsParams.actor);delete qsParams.actor;}
catch(ex){this.log("_initFromQueryString - failed to set actor: "+ex);}}
if(qsParams.hasOwnProperty("activity_id")){this.activity=new TinCan.Activity({id:qsParams.activity_id});delete qsParams.activity_id;}
if(qsParams.hasOwnProperty("activity_platform")||qsParams.hasOwnProperty("registration")||qsParams.hasOwnProperty("grouping")){contextCfg={};if(qsParams.hasOwnProperty("activity_platform")){contextCfg.platform=qsParams.activity_platform;delete qsParams.activity_platform;}
if(qsParams.hasOwnProperty("registration")){contextCfg.registration=this.registration=qsParams.registration;delete qsParams.registration;}
if(qsParams.hasOwnProperty("grouping")){contextCfg.contextActivities={};contextCfg.contextActivities.grouping=qsParams.grouping;delete qsParams.grouping;}
this.context=new TinCan.Context(contextCfg);}
if(qsParams.hasOwnProperty("endpoint")){for(i=0;i<lrsProps.length;i+=1){prop=lrsProps[i];if(qsParams.hasOwnProperty(prop)){lrsCfg[prop]=qsParams[prop];delete qsParams[prop];}}
for(i in qsParams){if(qsParams.hasOwnProperty(i)){if(_reservedQSParams.hasOwnProperty(i)){delete qsParams[i];}else{extended=extended||{};extended[i]=qsParams[i];}}}
if(extended!==null){lrsCfg.extended=extended;}
lrsCfg.allowFail=false;this.addRecordStore(lrsCfg);}},addRecordStore:function(cfg){this.log("addRecordStore");var lrs;if(cfg instanceof TinCan.LRS){lrs=cfg;}
else{lrs=new TinCan.LRS(cfg);}
this.recordStores.push(lrs);},prepareStatement:function(stmt){this.log("prepareStatement");if(!(stmt instanceof TinCan.Statement)){stmt=new TinCan.Statement(stmt);}
if(stmt.actor===null&&this.actor!==null){stmt.actor=this.actor;}
if(stmt.target===null&&this.activity!==null){stmt.target=this.activity;}
if(this.context!==null){if(stmt.context===null){stmt.context=this.context;}
else{if(stmt.context.registration===null){stmt.context.registration=this.context.registration;}
if(stmt.context.platform===null){stmt.context.platform=this.context.platform;}
if(this.context.contextActivities!==null){if(stmt.context.contextActivities===null){stmt.context.contextActivities=this.context.contextActivities;}
else{if(this.context.contextActivities.grouping!==null&&stmt.context.contextActivities.grouping===null){stmt.context.contextActivities.grouping=this.context.contextActivities.grouping;}
if(this.context.contextActivities.parent!==null&&stmt.context.contextActivities.parent===null){stmt.context.contextActivities.parent=this.context.contextActivities.parent;}
if(this.context.contextActivities.other!==null&&stmt.context.contextActivities.other===null){stmt.context.contextActivities.other=this.context.contextActivities.other;}}}}}
return stmt;},sendStatement:function(stmt,callback){this.log("sendStatement");var self=this,lrs,statement=this.prepareStatement(stmt),rsCount=this.recordStores.length,i,results=[],callbackWrapper,callbackResults=[];if(rsCount>0){if(typeof callback==="function"){callbackWrapper=function(err,xhr){var args;self.log("sendStatement - callbackWrapper: "+rsCount);if(rsCount>1){rsCount-=1;callbackResults.push({err:err,xhr:xhr});}
else if(rsCount===1){callbackResults.push({err:err,xhr:xhr});args=[callbackResults,statement];callback.apply(this,args);}
else{self.log("sendStatement - unexpected record store count: "+rsCount);}};}
for(i=0;i<rsCount;i+=1){lrs=this.recordStores[i];results.push(lrs.saveStatement(statement,{callback:callbackWrapper}));}}
else{this.log("[warning] sendStatement: No LRSs added yet (statement not sent)");if(typeof callback==="function"){callback.apply(this,[null,statement]);}}
return{statement:statement,results:results};},getStatement:function(stmtId,callback){this.log("getStatement");var lrs;if(this.recordStores.length>0){lrs=this.recordStores[0];return lrs.retrieveStatement(stmtId,{callback:callback});}
this.log("[warning] getStatement: No LRSs added yet (statement not retrieved)");},voidStatement:function(stmt,callback,options){this.log("voidStatement");var self=this,lrs,actor,voidingStatement,rsCount=this.recordStores.length,i,results=[],callbackWrapper,callbackResults=[];if(stmt instanceof TinCan.Statement){stmt=stmt.id;}
if(typeof options.actor!=="undefined"){actor=options.actor;}
else if(this.actor!==null){actor=this.actor;}
voidingStatement=new TinCan.Statement({actor:actor,verb:{id:"http://adlnet.gov/expapi/verbs/voided"},target:{objectType:"StatementRef",id:stmt}});if(rsCount>0){if(typeof callback==="function"){callbackWrapper=function(err,xhr){var args;self.log("voidStatement - callbackWrapper: "+rsCount);if(rsCount>1){rsCount-=1;callbackResults.push({err:err,xhr:xhr});}
else if(rsCount===1){callbackResults.push({err:err,xhr:xhr});args=[callbackResults,voidingStatement];callback.apply(this,args);}
else{self.log("voidStatement - unexpected record store count: "+rsCount);}};}
for(i=0;i<rsCount;i+=1){lrs=this.recordStores[i];results.push(lrs.saveStatement(voidingStatement,{callback:callbackWrapper}));}}
else{this.log("[warning] voidStatement: No LRSs added yet (statement not sent)");if(typeof callback==="function"){callback.apply(this,[null,voidingStatement]);}}
return{statement:voidingStatement,results:results};},getVoidedStatement:function(stmtId,callback){this.log("getVoidedStatement");var lrs;if(this.recordStores.length>0){lrs=this.recordStores[0];return lrs.retrieveVoidedStatement(stmtId,{callback:callback});}
this.log("[warning] getVoidedStatement: No LRSs added yet (statement not retrieved)");},sendStatements:function(stmts,callback){this.log("sendStatements");var self=this,lrs,statements=[],rsCount=this.recordStores.length,i,results=[],callbackWrapper,callbackResults=[];if(stmts.length===0){if(typeof callback==="function"){callback.apply(this,[null,statements]);}}
else{for(i=0;i<stmts.length;i+=1){statements.push(this.prepareStatement(stmts[i]));}
if(rsCount>0){if(typeof callback==="function"){callbackWrapper=function(err,xhr){var args;self.log("sendStatements - callbackWrapper: "+rsCount);if(rsCount>1){rsCount-=1;callbackResults.push({err:err,xhr:xhr});}
else if(rsCount===1){callbackResults.push({err:err,xhr:xhr});args=[callbackResults,statements];callback.apply(this,args);}
else{self.log("sendStatements - unexpected record store count: "+rsCount);}};}
for(i=0;i<rsCount;i+=1){lrs=this.recordStores[i];results.push(lrs.saveStatements(statements,{callback:callbackWrapper}));}}
else{this.log("[warning] sendStatements: No LRSs added yet (statements not sent)");if(typeof callback==="function"){callback.apply(this,[null,statements]);}}}
return{statements:statements,results:results};},getStatements:function(cfg){this.log("getStatements");var queryCfg={},lrs,params;if(this.recordStores.length>0){lrs=this.recordStores[0];cfg=cfg||{};params=cfg.params||{};if(cfg.sendActor&&this.actor!==null){if(lrs.version==="0.9"||lrs.version==="0.95"){params.actor=this.actor;}
else{params.agent=this.actor;}}
if(cfg.sendActivity&&this.activity!==null){if(lrs.version==="0.9"||lrs.version==="0.95"){params.target=this.activity;}
else{params.activity=this.activity;}}
if(typeof params.registration==="undefined"&&this.registration!==null){params.registration=this.registration;}
queryCfg={params:params};if(typeof cfg.callback!=="undefined"){queryCfg.callback=cfg.callback;}
return lrs.queryStatements(queryCfg);}
this.log("[warning] getStatements: No LRSs added yet (statements not read)");},getState:function(key,cfg){this.log("getState");var queryCfg,lrs;if(this.recordStores.length>0){lrs=this.recordStores[0];cfg=cfg||{};queryCfg={agent:(typeof cfg.agent!=="undefined"?cfg.agent:this.actor),activity:(typeof cfg.activity!=="undefined"?cfg.activity:this.activity)};if(typeof cfg.registration!=="undefined"){queryCfg.registration=cfg.registration;}
else if(this.registration!==null){queryCfg.registration=this.registration;}
if(typeof cfg.callback!=="undefined"){queryCfg.callback=cfg.callback;}
return lrs.retrieveState(key,queryCfg);}
this.log("[warning] getState: No LRSs added yet (state not retrieved)");},setState:function(key,val,cfg){this.log("setState");var queryCfg,lrs;if(this.recordStores.length>0){lrs=this.recordStores[0];cfg=cfg||{};queryCfg={agent:(typeof cfg.agent!=="undefined"?cfg.agent:this.actor),activity:(typeof cfg.activity!=="undefined"?cfg.activity:this.activity)};if(typeof cfg.registration!=="undefined"){queryCfg.registration=cfg.registration;}
else if(this.registration!==null){queryCfg.registration=this.registration;}
if(typeof cfg.lastSHA1!=="undefined"){queryCfg.lastSHA1=cfg.lastSHA1;}
if(typeof cfg.contentType!=="undefined"){queryCfg.contentType=cfg.contentType;}
if(typeof cfg.callback!=="undefined"){queryCfg.callback=cfg.callback;}
return lrs.saveState(key,val,queryCfg);}
this.log("[warning] setState: No LRSs added yet (state not saved)");},deleteState:function(key,cfg){this.log("deleteState");var queryCfg,lrs;if(this.recordStores.length>0){lrs=this.recordStores[0];cfg=cfg||{};queryCfg={agent:(typeof cfg.agent!=="undefined"?cfg.agent:this.actor),activity:(typeof cfg.activity!=="undefined"?cfg.activity:this.activity)};if(typeof cfg.registration!=="undefined"){queryCfg.registration=cfg.registration;}
else if(this.registration!==null){queryCfg.registration=this.registration;}
if(typeof cfg.callback!=="undefined"){queryCfg.callback=cfg.callback;}
return lrs.dropState(key,queryCfg);}
this.log("[warning] deleteState: No LRSs added yet (state not deleted)");},getActivityProfile:function(key,cfg){this.log("getActivityProfile");var queryCfg,lrs;if(this.recordStores.length>0){lrs=this.recordStores[0];cfg=cfg||{};queryCfg={activity:(typeof cfg.activity!=="undefined"?cfg.activity:this.activity)};if(typeof cfg.callback!=="undefined"){queryCfg.callback=cfg.callback;}
return lrs.retrieveActivityProfile(key,queryCfg);}
this.log("[warning] getActivityProfile: No LRSs added yet (activity profile not retrieved)");},setActivityProfile:function(key,val,cfg){this.log("setActivityProfile");var queryCfg,lrs;if(this.recordStores.length>0){lrs=this.recordStores[0];cfg=cfg||{};queryCfg={activity:(typeof cfg.activity!=="undefined"?cfg.activity:this.activity)};if(typeof cfg.callback!=="undefined"){queryCfg.callback=cfg.callback;}
if(typeof cfg.lastSHA1!=="undefined"){queryCfg.lastSHA1=cfg.lastSHA1;}
if(typeof cfg.contentType!=="undefined"){queryCfg.contentType=cfg.contentType;}
return lrs.saveActivityProfile(key,val,queryCfg);}
this.log("[warning] setActivityProfile: No LRSs added yet (activity profile not saved)");},deleteActivityProfile:function(key,cfg){this.log("deleteActivityProfile");var queryCfg,lrs;if(this.recordStores.length>0){lrs=this.recordStores[0];cfg=cfg||{};queryCfg={activity:(typeof cfg.activity!=="undefined"?cfg.activity:this.activity)};if(typeof cfg.callback!=="undefined"){queryCfg.callback=cfg.callback;}
return lrs.dropActivityProfile(key,queryCfg);}
this.log("[warning] deleteActivityProfile: No LRSs added yet (activity profile not deleted)");},getAgentProfile:function(key,cfg){this.log("getAgentProfile");var queryCfg,lrs;if(this.recordStores.length>0){lrs=this.recordStores[0];cfg=cfg||{};queryCfg={agent:(typeof cfg.agent!=="undefined"?cfg.agent:this.actor)};if(typeof cfg.callback!=="undefined"){queryCfg.callback=cfg.callback;}
return lrs.retrieveAgentProfile(key,queryCfg);}
this.log("[warning] getAgentProfile: No LRSs added yet (agent profile not retrieved)");},setAgentProfile:function(key,val,cfg){this.log("setAgentProfile");var queryCfg,lrs;if(this.recordStores.length>0){lrs=this.recordStores[0];cfg=cfg||{};queryCfg={agent:(typeof cfg.agent!=="undefined"?cfg.agent:this.actor)};if(typeof cfg.callback!=="undefined"){queryCfg.callback=cfg.callback;}
if(typeof cfg.lastSHA1!=="undefined"){queryCfg.lastSHA1=cfg.lastSHA1;}
if(typeof cfg.contentType!=="undefined"){queryCfg.contentType=cfg.contentType;}
return lrs.saveAgentProfile(key,val,queryCfg);}
this.log("[warning] setAgentProfile: No LRSs added yet (agent profile not saved)");},deleteAgentProfile:function(key,cfg){this.log("deleteAgentProfile");var queryCfg,lrs;if(this.recordStores.length>0){lrs=this.recordStores[0];cfg=cfg||{};queryCfg={agent:(typeof cfg.agent!=="undefined"?cfg.agent:this.actor)};if(typeof cfg.callback!=="undefined"){queryCfg.callback=cfg.callback;}
return lrs.dropAgentProfile(key,queryCfg);}
this.log("[warning] deleteAgentProfile: No LRSs added yet (agent profile not deleted)");}};TinCan.DEBUG=false;TinCan.enableDebug=function(){TinCan.DEBUG=true;};TinCan.disableDebug=function(){TinCan.DEBUG=false;};TinCan.versions=function(){return["1.0.1","1.0.0","0.95","0.9"];};if(typeof module==="object"){module.exports=TinCan;}}());(function(){"use strict";TinCan.Utils={getUUID:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(c){var r=Math.random()*16|0,v=c=="x"?r:(r&0x3|0x8);return v.toString(16);});},getISODateString:function(d){function pad(val,n){var padder,tempVal;if(typeof val==="undefined"||val===null){val=0;}
if(typeof n==="undefined"||n===null){n=2;}
padder=Math.pow(10,n-1);tempVal=val.toString();while(val<padder&&padder>1){tempVal="0"+tempVal;padder=padder/10;}
return tempVal;}
return d.getUTCFullYear()+"-"+
pad(d.getUTCMonth()+1)+"-"+
pad(d.getUTCDate())+"T"+
pad(d.getUTCHours())+":"+
pad(d.getUTCMinutes())+":"+
pad(d.getUTCSeconds())+"."+
pad(d.getUTCMilliseconds(),3)+"Z";},getSHA1String:function(str){return CryptoJS.SHA1(str).toString(CryptoJS.enc.Hex);},getBase64String:function(str){return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Latin1.parse(str));},getLangDictionaryValue:function(prop,lang){var langDict=this[prop],key;if(typeof lang!=="undefined"&&typeof langDict[lang]!=="undefined"){return langDict[lang];}
if(typeof langDict.und!=="undefined"){return langDict.und;}
if(typeof langDict["en-US"]!=="undefined"){return langDict["en-US"];}
for(key in langDict){if(langDict.hasOwnProperty(key)){return langDict[key];}}
return"";},parseURL:function(url){var parts=String(url).split("?"),pairs,pair,i,params={};if(parts.length===2){pairs=parts[1].split("&");for(i=0;i<pairs.length;i+=1){pair=pairs[i].split("=");if(pair.length===2&&pair[0]){params[pair[0]]=decodeURIComponent(pair[1]);}}}
return{path:parts[0],params:params};},getServerRoot:function(absoluteUrl){var urlParts=absoluteUrl.split("/");return urlParts[0]+"//"+urlParts[2];},getContentTypeFromHeader:function(header){return(String(header).split(";"))[0];},isApplicationJSON:function(header){return TinCan.Utils.getContentTypeFromHeader(header).toLowerCase().indexOf("application/json")===0;}};}());(function(){"use strict";var LRS=TinCan.LRS=function(cfg){this.log("constructor");this.endpoint=null;this.version=null;this.auth=null;this.allowFail=true;this.extended=null;this.init(cfg);};LRS.prototype={LOG_SRC:"LRS",log:TinCan.prototype.log,init:function(cfg){this.log("init");var versions=TinCan.versions(),versionMatch=false,i;cfg=cfg||{};if(cfg.hasOwnProperty("alertOnRequestFailure")){this.log("'alertOnRequestFailure' is deprecated (alerts have been removed) no need to set it now");}
if(!cfg.hasOwnProperty("endpoint")||cfg.endpoint===null||cfg.endpoint===""){this.log("[error] LRS invalid: no endpoint");throw{code:3,mesg:"LRS invalid: no endpoint"};}
this.endpoint=String(cfg.endpoint);if(this.endpoint.slice(-1)!=="/"){this.log("adding trailing slash to endpoint");this.endpoint+="/";}
if(cfg.hasOwnProperty("allowFail")){this.allowFail=cfg.allowFail;}
if(cfg.hasOwnProperty("auth")){this.auth=cfg.auth;}
else if(cfg.hasOwnProperty("username")&&cfg.hasOwnProperty("password")){this.auth="Basic "+TinCan.Utils.getBase64String(cfg.username+":"+cfg.password);}
if(cfg.hasOwnProperty("extended")){this.extended=cfg.extended;}
this._initByEnvironment(cfg);if(typeof cfg.version!=="undefined"){this.log("version: "+cfg.version);for(i=0;i<versions.length;i+=1){if(versions[i]===cfg.version){versionMatch=true;break;}}
if(!versionMatch){this.log("[error] LRS invalid: version not supported ("+cfg.version+")");throw{code:5,mesg:"LRS invalid: version not supported ("+cfg.version+")"};}
this.version=cfg.version;}
else{this.version=versions[0];}},_initByEnvironment:function(){this.log("_initByEnvironment not overloaded - no environment loaded?");},_makeRequest:function(){this.log("_makeRequest not overloaded - no environment loaded?");},_IEModeConversion:function(){this.log("_IEModeConversion not overloaded - browser environment not loaded.");},sendRequest:function(cfg){this.log("sendRequest");var fullUrl=this.endpoint+cfg.url,headers={},prop;if(cfg.url.indexOf("http")===0){fullUrl=cfg.url;}
if(this.extended!==null){cfg.params=cfg.params||{};for(prop in this.extended){if(this.extended.hasOwnProperty(prop)){if(!cfg.params.hasOwnProperty(prop)){if(this.extended[prop]!==null){cfg.params[prop]=this.extended[prop];}}}}}
headers.Authorization=this.auth;if(this.version!=="0.9"){headers["X-Experience-API-Version"]=this.version;}
for(prop in cfg.headers){if(cfg.headers.hasOwnProperty(prop)){headers[prop]=cfg.headers[prop];}}
return this._makeRequest(fullUrl,headers,cfg);},about:function(cfg){this.log("about");var requestCfg,requestResult,callbackWrapper;cfg=cfg||{};requestCfg={url:"about",method:"GET",params:{}};if(typeof cfg.callback!=="undefined"){callbackWrapper=function(err,xhr){var result=xhr;if(err===null){result=TinCan.About.fromJSON(xhr.responseText);}
cfg.callback(err,result);};requestCfg.callback=callbackWrapper;}
requestResult=this.sendRequest(requestCfg);if(callbackWrapper){return;}
if(requestResult.err===null){requestResult.xhr=TinCan.About.fromJSON(requestResult.xhr.responseText);}
return requestResult;},saveStatement:function(stmt,cfg){this.log("saveStatement");var requestCfg,versionedStatement;cfg=cfg||{};try{versionedStatement=stmt.asVersion(this.version);}
catch(ex){if(this.allowFail){this.log("[warning] statement could not be serialized in version ("+this.version+"): "+ex);if(typeof cfg.callback!=="undefined"){cfg.callback(null,null);return;}
return{err:null,xhr:null};}
this.log("[error] statement could not be serialized in version ("+this.version+"): "+ex);if(typeof cfg.callback!=="undefined"){cfg.callback(ex,null);return;}
return{err:ex,xhr:null};}
requestCfg={url:"statements",data:JSON.stringify(versionedStatement),headers:{"Content-Type":"application/json"}};if(stmt.id!==null){requestCfg.method="PUT";requestCfg.params={statementId:stmt.id};}
else{requestCfg.method="POST";}
if(typeof cfg.callback!=="undefined"){requestCfg.callback=cfg.callback;}
return this.sendRequest(requestCfg);},retrieveStatement:function(stmtId,cfg){this.log("retrieveStatement");var requestCfg,requestResult,callbackWrapper;cfg=cfg||{};requestCfg={url:"statements",method:"GET",params:{statementId:stmtId}};if(typeof cfg.callback!=="undefined"){callbackWrapper=function(err,xhr){var result=xhr;if(err===null){result=TinCan.Statement.fromJSON(xhr.responseText);}
cfg.callback(err,result);};requestCfg.callback=callbackWrapper;}
requestResult=this.sendRequest(requestCfg);if(!callbackWrapper){requestResult.statement=null;if(requestResult.err===null){requestResult.statement=TinCan.Statement.fromJSON(requestResult.xhr.responseText);}}
return requestResult;},retrieveVoidedStatement:function(stmtId,cfg){this.log("retrieveVoidedStatement");var requestCfg,requestResult,callbackWrapper;cfg=cfg||{};requestCfg={url:"statements",method:"GET",params:{}};if(this.version==="0.9"||this.version==="0.95"){requestCfg.params.statementId=stmtId;}
else{requestCfg.params.voidedStatementId=stmtId;}
if(typeof cfg.callback!=="undefined"){callbackWrapper=function(err,xhr){var result=xhr;if(err===null){result=TinCan.Statement.fromJSON(xhr.responseText);}
cfg.callback(err,result);};requestCfg.callback=callbackWrapper;}
requestResult=this.sendRequest(requestCfg);if(!callbackWrapper){requestResult.statement=null;if(requestResult.err===null){requestResult.statement=TinCan.Statement.fromJSON(requestResult.xhr.responseText);}}
return requestResult;},saveStatements:function(stmts,cfg){this.log("saveStatements");var requestCfg,versionedStatement,versionedStatements=[],i;cfg=cfg||{};if(stmts.length===0){if(typeof cfg.callback!=="undefined"){cfg.callback(new Error("no statements"),null);return;}
return{err:new Error("no statements"),xhr:null};}
for(i=0;i<stmts.length;i+=1){try{versionedStatement=stmts[i].asVersion(this.version);}
catch(ex){if(this.allowFail){this.log("[warning] statement could not be serialized in version ("+this.version+"): "+ex);if(typeof cfg.callback!=="undefined"){cfg.callback(null,null);return;}
return{err:null,xhr:null};}
this.log("[error] statement could not be serialized in version ("+this.version+"): "+ex);if(typeof cfg.callback!=="undefined"){cfg.callback(ex,null);return;}
return{err:ex,xhr:null};}
versionedStatements.push(versionedStatement);}
requestCfg={url:"statements",method:"POST",data:JSON.stringify(versionedStatements),headers:{"Content-Type":"application/json"}};if(typeof cfg.callback!=="undefined"){requestCfg.callback=cfg.callback;}
return this.sendRequest(requestCfg);},queryStatements:function(cfg){this.log("queryStatements");var requestCfg,requestResult,callbackWrapper;cfg=cfg||{};cfg.params=cfg.params||{};try{requestCfg=this._queryStatementsRequestCfg(cfg);}
catch(ex){this.log("[error] Query statements failed - "+ex);if(typeof cfg.callback!=="undefined"){cfg.callback(ex,{});}
return{err:ex,statementsResult:null};}
if(typeof cfg.callback!=="undefined"){callbackWrapper=function(err,xhr){var result=xhr;if(err===null){result=TinCan.StatementsResult.fromJSON(xhr.responseText);}
cfg.callback(err,result);};requestCfg.callback=callbackWrapper;}
requestResult=this.sendRequest(requestCfg);requestResult.config=requestCfg;if(!callbackWrapper){requestResult.statementsResult=null;if(requestResult.err===null){requestResult.statementsResult=TinCan.StatementsResult.fromJSON(requestResult.xhr.responseText);}}
return requestResult;},_queryStatementsRequestCfg:function(cfg){this.log("_queryStatementsRequestCfg");var params={},returnCfg={url:"statements",method:"GET",params:params},jsonProps=["agent","actor","object","instructor"],idProps=["verb","activity"],valProps=["registration","context","since","until","limit","authoritative","sparse","ascending","related_activities","related_agents","format","attachments"],i,prop,universal={verb:true,registration:true,since:true,until:true,limit:true,ascending:true},compatibility={"0.9":{supported:{actor:true,instructor:true,target:true,object:true,context:true,authoritative:true,sparse:true}},"1.0.0":{supported:{agent:true,activity:true,related_activities:true,related_agents:true,format:true,attachments:true}}};compatibility["0.95"]=compatibility["0.9"];compatibility["1.0.1"]=compatibility["1.0.0"];if(cfg.params.hasOwnProperty("target")){cfg.params.object=cfg.params.target;}
for(prop in cfg.params){if(cfg.params.hasOwnProperty(prop)){if(typeof universal[prop]==="undefined"&&typeof compatibility[this.version].supported[prop]==="undefined"){throw"Unrecognized query parameter configured: "+prop;}}}
for(i=0;i<jsonProps.length;i+=1){if(typeof cfg.params[jsonProps[i]]!=="undefined"){params[jsonProps[i]]=JSON.stringify(cfg.params[jsonProps[i]].asVersion(this.version));}}
for(i=0;i<idProps.length;i+=1){if(typeof cfg.params[idProps[i]]!=="undefined"){params[idProps[i]]=cfg.params[idProps[i]].id;}}
for(i=0;i<valProps.length;i+=1){if(typeof cfg.params[valProps[i]]!=="undefined"){params[valProps[i]]=cfg.params[valProps[i]];}}
return returnCfg;},moreStatements:function(cfg){this.log("moreStatements: "+cfg.url);var requestCfg,requestResult,callbackWrapper,parsedURL,serverRoot;cfg=cfg||{};parsedURL=TinCan.Utils.parseURL(cfg.url);serverRoot=TinCan.Utils.getServerRoot(this.endpoint);if(parsedURL.path.indexOf("/statements")===0){parsedURL.path=this.endpoint.replace(serverRoot,"")+parsedURL.path;this.log("converting non-standard more URL to "+parsedURL.path);}
if(parsedURL.path.indexOf("/")!==0){parsedURL.path="/"+parsedURL.path;}
requestCfg={method:"GET",url:serverRoot+parsedURL.path,params:parsedURL.params};if(typeof cfg.callback!=="undefined"){callbackWrapper=function(err,xhr){var result=xhr;if(err===null){result=TinCan.StatementsResult.fromJSON(xhr.responseText);}
cfg.callback(err,result);};requestCfg.callback=callbackWrapper;}
requestResult=this.sendRequest(requestCfg);requestResult.config=requestCfg;if(!callbackWrapper){requestResult.statementsResult=null;if(requestResult.err===null){requestResult.statementsResult=TinCan.StatementsResult.fromJSON(requestResult.xhr.responseText);}}
return requestResult;},retrieveState:function(key,cfg){this.log("retrieveState");var requestParams={},requestCfg={},requestResult,callbackWrapper;requestParams={stateId:key,activityId:cfg.activity.id};if(this.version==="0.9"){requestParams.actor=JSON.stringify(cfg.agent.asVersion(this.version));}
else{requestParams.agent=JSON.stringify(cfg.agent.asVersion(this.version));}
if(typeof cfg.registration!=="undefined"){if(this.version==="0.9"){requestParams.registrationId=cfg.registration;}
else{requestParams.registration=cfg.registration;}}
requestCfg={url:"activities/state",method:"GET",params:requestParams,ignore404:true};if(typeof cfg.callback!=="undefined"){callbackWrapper=function(err,xhr){var result=xhr;if(err===null){if(xhr.status===404){result=null;}
else{result=new TinCan.State({id:key,contents:xhr.responseText});if(typeof xhr.getResponseHeader!=="undefined"&&xhr.getResponseHeader("ETag")!==null&&xhr.getResponseHeader("ETag")!==""){result.etag=xhr.getResponseHeader("ETag");}else{result.etag=TinCan.Utils.getSHA1String(xhr.responseText);}
if(typeof xhr.contentType!=="undefined"){result.contentType=xhr.contentType;}else if(typeof xhr.getResponseHeader!=="undefined"&&xhr.getResponseHeader("Content-Type")!==null&&xhr.getResponseHeader("Content-Type")!==""){result.contentType=xhr.getResponseHeader("Content-Type");}
if(TinCan.Utils.isApplicationJSON(result.contentType)){try{result.contents=JSON.parse(result.contents);}catch(ex){this.log("retrieveState - failed to deserialize JSON: "+ex);}}}}
cfg.callback(err,result);};requestCfg.callback=callbackWrapper;}
requestResult=this.sendRequest(requestCfg);if(!callbackWrapper){requestResult.state=null;if(requestResult.err===null&&requestResult.xhr.status!==404){requestResult.state=new TinCan.State({id:key,contents:requestResult.xhr.responseText});if(typeof requestResult.xhr.getResponseHeader!=="undefined"&&requestResult.xhr.getResponseHeader("ETag")!==null&&requestResult.xhr.getResponseHeader("ETag")!==""){requestResult.state.etag=requestResult.xhr.getResponseHeader("ETag");}else{requestResult.state.etag=TinCan.Utils.getSHA1String(requestResult.xhr.responseText);}
if(typeof requestResult.xhr.contentType!=="undefined"){requestResult.state.contentType=requestResult.xhr.contentType;}else if(typeof requestResult.xhr.getResponseHeader!=="undefined"&&requestResult.xhr.getResponseHeader("Content-Type")!==null&&requestResult.xhr.getResponseHeader("Content-Type")!==""){requestResult.state.contentType=requestResult.xhr.getResponseHeader("Content-Type");}
if(TinCan.Utils.isApplicationJSON(requestResult.state.contentType)){try{requestResult.state.contents=JSON.parse(requestResult.state.contents);}catch(ex){this.log("retrieveState - failed to deserialize JSON: "+ex);}}}}
return requestResult;},saveState:function(key,val,cfg){this.log("saveState");var requestParams,requestCfg;if(typeof cfg.contentType==="undefined"){cfg.contentType="application/octet-stream";}
if(typeof val==="object"&&TinCan.Utils.isApplicationJSON(cfg.contentType)){val=JSON.stringify(val);}
requestParams={stateId:key,activityId:cfg.activity.id};if(this.version==="0.9"){requestParams.actor=JSON.stringify(cfg.agent.asVersion(this.version));}
else{requestParams.agent=JSON.stringify(cfg.agent.asVersion(this.version));}
if(typeof cfg.registration!=="undefined"){if(this.version==="0.9"){requestParams.registrationId=cfg.registration;}
else{requestParams.registration=cfg.registration;}}
requestCfg={url:"activities/state",method:"PUT",params:requestParams,data:val,headers:{"Content-Type":cfg.contentType}};if(typeof cfg.callback!=="undefined"){requestCfg.callback=cfg.callback;}
if(typeof cfg.lastSHA1!=="undefined"&&cfg.lastSHA1!==null){requestCfg.headers["If-Match"]=cfg.lastSHA1;}
return this.sendRequest(requestCfg);},dropState:function(key,cfg){this.log("dropState");var requestParams,requestCfg;requestParams={activityId:cfg.activity.id};if(this.version==="0.9"){requestParams.actor=JSON.stringify(cfg.agent.asVersion(this.version));}
else{requestParams.agent=JSON.stringify(cfg.agent.asVersion(this.version));}
if(key!==null){requestParams.stateId=key;}
if(typeof cfg.registration!=="undefined"){if(this.version==="0.9"){requestParams.registrationId=cfg.registration;}
else{requestParams.registration=cfg.registration;}}
requestCfg={url:"activities/state",method:"DELETE",params:requestParams};if(typeof cfg.callback!=="undefined"){requestCfg.callback=cfg.callback;}
return this.sendRequest(requestCfg);},retrieveActivityProfile:function(key,cfg){this.log("retrieveActivityProfile");var requestCfg={},requestResult,callbackWrapper;requestCfg={url:"activities/profile",method:"GET",params:{profileId:key,activityId:cfg.activity.id},ignore404:true};if(typeof cfg.callback!=="undefined"){callbackWrapper=function(err,xhr){var result=xhr;if(err===null){if(xhr.status===404){result=null;}
else{result=new TinCan.ActivityProfile({id:key,activity:cfg.activity,contents:xhr.responseText});if(typeof xhr.getResponseHeader!=="undefined"&&xhr.getResponseHeader("ETag")!==null&&xhr.getResponseHeader("ETag")!==""){result.etag=xhr.getResponseHeader("ETag");}else{result.etag=TinCan.Utils.getSHA1String(xhr.responseText);}
if(typeof xhr.contentType!=="undefined"){result.contentType=xhr.contentType;}else if(typeof xhr.getResponseHeader!=="undefined"&&xhr.getResponseHeader("Content-Type")!==null&&xhr.getResponseHeader("Content-Type")!==""){result.contentType=xhr.getResponseHeader("Content-Type");}
if(TinCan.Utils.isApplicationJSON(result.contentType)){try{result.contents=JSON.parse(result.contents);}catch(ex){this.log("retrieveActivityProfile - failed to deserialize JSON: "+ex);}}}}
cfg.callback(err,result);};requestCfg.callback=callbackWrapper;}
requestResult=this.sendRequest(requestCfg);if(!callbackWrapper){requestResult.profile=null;if(requestResult.err===null&&requestResult.xhr.status!==404){requestResult.profile=new TinCan.ActivityProfile({id:key,activity:cfg.activity,contents:requestResult.xhr.responseText});if(typeof requestResult.xhr.getResponseHeader!=="undefined"&&requestResult.xhr.getResponseHeader("ETag")!==null&&requestResult.xhr.getResponseHeader("ETag")!==""){requestResult.profile.etag=requestResult.xhr.getResponseHeader("ETag");}else{requestResult.profile.etag=TinCan.Utils.getSHA1String(requestResult.xhr.responseText);}
if(typeof requestResult.xhr.contentType!=="undefined"){requestResult.profile.contentType=requestResult.xhr.contentType;}else if(typeof requestResult.xhr.getResponseHeader!=="undefined"&&requestResult.xhr.getResponseHeader("Content-Type")!==null&&requestResult.xhr.getResponseHeader("Content-Type")!==""){requestResult.profile.contentType=requestResult.xhr.getResponseHeader("Content-Type");}
if(TinCan.Utils.isApplicationJSON(requestResult.profile.contentType)){try{requestResult.profile.contents=JSON.parse(requestResult.profile.contents);}catch(ex){this.log("retrieveActivityProfile - failed to deserialize JSON: "+ex);}}}}
return requestResult;},saveActivityProfile:function(key,val,cfg){this.log("saveActivityProfile");var requestCfg;if(typeof cfg.contentType==="undefined"){cfg.contentType="application/octet-stream";}
if(typeof val==="object"&&TinCan.Utils.isApplicationJSON(cfg.contentType)){val=JSON.stringify(val);}
requestCfg={url:"activities/profile",method:"PUT",params:{profileId:key,activityId:cfg.activity.id},data:val,headers:{"Content-Type":cfg.contentType}};if(typeof cfg.callback!=="undefined"){requestCfg.callback=cfg.callback;}
if(typeof cfg.lastSHA1!=="undefined"&&cfg.lastSHA1!==null){requestCfg.headers["If-Match"]=cfg.lastSHA1;}
else{requestCfg.headers["If-None-Match"]="*";}
return this.sendRequest(requestCfg);},dropActivityProfile:function(key,cfg){this.log("dropActivityProfile");var requestParams,requestCfg;requestParams={profileId:key,activityId:cfg.activity.id};requestCfg={url:"activities/profile",method:"DELETE",params:requestParams};if(typeof cfg.callback!=="undefined"){requestCfg.callback=cfg.callback;}
return this.sendRequest(requestCfg);},retrieveAgentProfile:function(key,cfg){this.log("retrieveAgentProfile");var requestCfg={},requestResult,callbackWrapper;requestCfg={method:"GET",params:{profileId:key},ignore404:true};if(this.version==="0.9"){requestCfg.url="actors/profile";requestCfg.params.actor=JSON.stringify(cfg.agent.asVersion(this.version));}
else{requestCfg.url="agents/profile";requestCfg.params.agent=JSON.stringify(cfg.agent.asVersion(this.version));}
if(typeof cfg.callback!=="undefined"){callbackWrapper=function(err,xhr){var result=xhr;if(err===null){if(xhr.status===404){result=null;}
else{result=new TinCan.AgentProfile({id:key,agent:cfg.agent,contents:xhr.responseText});if(typeof xhr.getResponseHeader!=="undefined"&&xhr.getResponseHeader("ETag")!==null&&xhr.getResponseHeader("ETag")!==""){result.etag=xhr.getResponseHeader("ETag");}else{result.etag=TinCan.Utils.getSHA1String(xhr.responseText);}
if(typeof xhr.contentType!=="undefined"){result.contentType=xhr.contentType;}else if(typeof xhr.getResponseHeader!=="undefined"&&xhr.getResponseHeader("Content-Type")!==null&&xhr.getResponseHeader("Content-Type")!==""){result.contentType=xhr.getResponseHeader("Content-Type");}
if(TinCan.Utils.isApplicationJSON(result.contentType)){try{result.contents=JSON.parse(result.contents);}catch(ex){this.log("retrieveAgentProfile - failed to deserialize JSON: "+ex);}}}}
cfg.callback(err,result);};requestCfg.callback=callbackWrapper;}
requestResult=this.sendRequest(requestCfg);if(!callbackWrapper){requestResult.profile=null;if(requestResult.err===null&&requestResult.xhr.status!==404){requestResult.profile=new TinCan.AgentProfile({id:key,agent:cfg.agent,contents:requestResult.xhr.responseText});if(typeof requestResult.xhr.getResponseHeader!=="undefined"&&requestResult.xhr.getResponseHeader("ETag")!==null&&requestResult.xhr.getResponseHeader("ETag")!==""){requestResult.profile.etag=requestResult.xhr.getResponseHeader("ETag");}else{requestResult.profile.etag=TinCan.Utils.getSHA1String(requestResult.xhr.responseText);}
if(typeof requestResult.xhr.contentType!=="undefined"){requestResult.profile.contentType=requestResult.xhr.contentType;}else if(typeof requestResult.xhr.getResponseHeader!=="undefined"&&requestResult.xhr.getResponseHeader("Content-Type")!==null&&requestResult.xhr.getResponseHeader("Content-Type")!==""){requestResult.profile.contentType=requestResult.xhr.getResponseHeader("Content-Type");}
if(TinCan.Utils.isApplicationJSON(requestResult.profile.contentType)){try{requestResult.profile.contents=JSON.parse(requestResult.profile.contents);}catch(ex){this.log("retrieveAgentProfile - failed to deserialize JSON: "+ex);}}}}
return requestResult;},saveAgentProfile:function(key,val,cfg){this.log("saveAgentProfile");var requestCfg;if(typeof cfg.contentType==="undefined"){cfg.contentType="application/octet-stream";}
if(typeof val==="object"&&TinCan.Utils.isApplicationJSON(cfg.contentType)){val=JSON.stringify(val);}
requestCfg={method:"PUT",params:{profileId:key},data:val,headers:{"Content-Type":cfg.contentType}};if(this.version==="0.9"){requestCfg.url="actors/profile";requestCfg.params.actor=JSON.stringify(cfg.agent.asVersion(this.version));}
else{requestCfg.url="agents/profile";requestCfg.params.agent=JSON.stringify(cfg.agent.asVersion(this.version));}
if(typeof cfg.callback!=="undefined"){requestCfg.callback=cfg.callback;}
if(typeof cfg.lastSHA1!=="undefined"&&cfg.lastSHA1!==null){requestCfg.headers["If-Match"]=cfg.lastSHA1;}
else{requestCfg.headers["If-None-Match"]="*";}
return this.sendRequest(requestCfg);},dropAgentProfile:function(key,cfg){this.log("dropAgentProfile");var requestParams,requestCfg;requestParams={profileId:key};requestCfg={method:"DELETE",params:requestParams};if(this.version==="0.9"){requestCfg.url="actors/profile";requestParams.actor=JSON.stringify(cfg.agent.asVersion(this.version));}
else{requestCfg.url="agents/profile";requestParams.agent=JSON.stringify(cfg.agent.asVersion(this.version));}
if(typeof cfg.callback!=="undefined"){requestCfg.callback=cfg.callback;}
return this.sendRequest(requestCfg);}};LRS.syncEnabled=null;}());(function(){"use strict";var AgentAccount=TinCan.AgentAccount=function(cfg){this.log("constructor");this.homePage=null;this.name=null;this.init(cfg);};AgentAccount.prototype={LOG_SRC:"AgentAccount",log:TinCan.prototype.log,init:function(cfg){this.log("init");var i,directProps=["name","homePage"];cfg=cfg||{};if(typeof cfg.accountServiceHomePage!=="undefined"){cfg.homePage=cfg.accountServiceHomePage;}
if(typeof cfg.accountName!=="undefined"){cfg.name=cfg.accountName;}
for(i=0;i<directProps.length;i+=1){if(cfg.hasOwnProperty(directProps[i])&&cfg[directProps[i]]!==null){this[directProps[i]]=cfg[directProps[i]];}}},toString:function(){this.log("toString");var result="";if(this.name!==null||this.homePage!==null){result+=this.name!==null?this.name:"-";result+=":";result+=this.homePage!==null?this.homePage:"-";}
else{result="AgentAccount: unidentified";}
return result;},asVersion:function(version){this.log("asVersion: "+version);var result={};version=version||TinCan.versions()[0];if(version==="0.9"){result.accountName=this.name;result.accountServiceHomePage=this.homePage;}else{result.name=this.name;result.homePage=this.homePage;}
return result;}};AgentAccount.fromJSON=function(acctJSON){AgentAccount.prototype.log("fromJSON");var _acct=JSON.parse(acctJSON);return new AgentAccount(_acct);};}());(function(){"use strict";var Agent=TinCan.Agent=function(cfg){this.log("constructor");this.name=null;this.mbox=null;this.mbox_sha1sum=null;this.openid=null;this.account=null;this.degraded=false;this.init(cfg);};Agent.prototype={objectType:"Agent",LOG_SRC:"Agent",log:TinCan.prototype.log,init:function(cfg){this.log("init");var i,directProps=["name","mbox","mbox_sha1sum","openid"],val;cfg=cfg||{};if(typeof cfg.lastName!=="undefined"||typeof cfg.firstName!=="undefined"){cfg.name="";if(typeof cfg.firstName!=="undefined"&&cfg.firstName.length>0){cfg.name=cfg.firstName[0];if(cfg.firstName.length>1){this.degraded=true;}}
if(cfg.name!==""){cfg.name+=" ";}
if(typeof cfg.lastName!=="undefined"&&cfg.lastName.length>0){cfg.name+=cfg.lastName[0];if(cfg.lastName.length>1){this.degraded=true;}}}else if(typeof cfg.familyName!=="undefined"||typeof cfg.givenName!=="undefined"){cfg.name="";if(typeof cfg.givenName!=="undefined"&&cfg.givenName.length>0){cfg.name=cfg.givenName[0];if(cfg.givenName.length>1){this.degraded=true;}}
if(cfg.name!==""){cfg.name+=" ";}
if(typeof cfg.familyName!=="undefined"&&cfg.familyName.length>0){cfg.name+=cfg.familyName[0];if(cfg.familyName.length>1){this.degraded=true;}}}
if(typeof cfg.name==="object"&&cfg.name!==null){if(cfg.name.length>1){this.degraded=true;}
cfg.name=cfg.name[0];}
if(typeof cfg.mbox==="object"&&cfg.mbox!==null){if(cfg.mbox.length>1){this.degraded=true;}
cfg.mbox=cfg.mbox[0];}
if(typeof cfg.mbox_sha1sum==="object"&&cfg.mbox_sha1sum!==null){if(cfg.mbox_sha1sum.length>1){this.degraded=true;}
cfg.mbox_sha1sum=cfg.mbox_sha1sum[0];}
if(typeof cfg.openid==="object"&&cfg.openid!==null){if(cfg.openid.length>1){this.degraded=true;}
cfg.openid=cfg.openid[0];}
if(typeof cfg.account==="object"&&cfg.account!==null&&typeof cfg.account.homePage==="undefined"&&typeof cfg.account.name==="undefined"){if(cfg.account.length===0){delete cfg.account;}
else{if(cfg.account.length>1){this.degraded=true;}
cfg.account=cfg.account[0];}}
if(cfg.hasOwnProperty("account")){if(cfg.account instanceof TinCan.AgentAccount){this.account=cfg.account;}
else{this.account=new TinCan.AgentAccount(cfg.account);}}
for(i=0;i<directProps.length;i+=1){if(cfg.hasOwnProperty(directProps[i])&&cfg[directProps[i]]!==null){val=cfg[directProps[i]];if(directProps[i]==="mbox"&&val.indexOf("mailto:")===-1){val="mailto:"+val;}
this[directProps[i]]=val;}}},toString:function(){this.log("toString");if(this.name!==null){return this.name;}
if(this.mbox!==null){return this.mbox.replace("mailto:","");}
if(this.mbox_sha1sum!==null){return this.mbox_sha1sum;}
if(this.openid!==null){return this.openid;}
if(this.account!==null){return this.account.toString();}
return this.objectType+": unidentified";},asVersion:function(version){this.log("asVersion: "+version);var result={objectType:this.objectType};version=version||TinCan.versions()[0];if(version==="0.9"){if(this.mbox!==null){result.mbox=[this.mbox];}
else if(this.mbox_sha1sum!==null){result.mbox_sha1sum=[this.mbox_sha1sum];}
else if(this.openid!==null){result.openid=[this.openid];}
else if(this.account!==null){result.account=[this.account.asVersion(version)];}
if(this.name!==null){result.name=[this.name];}}else{if(this.mbox!==null){result.mbox=this.mbox;}
else if(this.mbox_sha1sum!==null){result.mbox_sha1sum=this.mbox_sha1sum;}
else if(this.openid!==null){result.openid=this.openid;}
else if(this.account!==null){result.account=this.account.asVersion(version);}
if(this.name!==null){result.name=this.name;}}
return result;}};Agent.fromJSON=function(agentJSON){Agent.prototype.log("fromJSON");var _agent=JSON.parse(agentJSON);return new Agent(_agent);};}());(function(){"use strict";var Group=TinCan.Group=function(cfg){this.log("constructor");this.name=null;this.mbox=null;this.mbox_sha1sum=null;this.openid=null;this.account=null;this.member=[];this.init(cfg);};Group.prototype={objectType:"Group",LOG_SRC:"Group",log:TinCan.prototype.log,init:function(cfg){this.log("init");var i;cfg=cfg||{};TinCan.Agent.prototype.init.call(this,cfg);if(typeof cfg.member!=="undefined"){for(i=0;i<cfg.member.length;i+=1){if(cfg.member[i]instanceof TinCan.Agent){this.member.push(cfg.member[i]);}
else{this.member.push(new TinCan.Agent(cfg.member[i]));}}}},toString:function(lang){this.log("toString");var result=TinCan.Agent.prototype.toString.call(this,lang);if(result!==this.objectType+": unidentified"){result=this.objectType+": "+result;}
return result;},asVersion:function(version){this.log("asVersion: "+version);var result,i;version=version||TinCan.versions()[0];result=TinCan.Agent.prototype.asVersion.call(this,version);if(this.member.length>0){result.member=[];for(i=0;i<this.member.length;i+=1){result.member.push(this.member[i].asVersion(version));}}
return result;}};Group.fromJSON=function(groupJSON){Group.prototype.log("fromJSON");var _group=JSON.parse(groupJSON);return new Group(_group);};}());(function(){"use strict";var _downConvertMap={"http://adlnet.gov/expapi/verbs/experienced":"experienced","http://adlnet.gov/expapi/verbs/attended":"attended","http://adlnet.gov/expapi/verbs/attempted":"attempted","http://adlnet.gov/expapi/verbs/completed":"completed","http://adlnet.gov/expapi/verbs/passed":"passed","http://adlnet.gov/expapi/verbs/failed":"failed","http://adlnet.gov/expapi/verbs/answered":"answered","http://adlnet.gov/expapi/verbs/interacted":"interacted","http://adlnet.gov/expapi/verbs/imported":"imported","http://adlnet.gov/expapi/verbs/created":"created","http://adlnet.gov/expapi/verbs/shared":"shared","http://adlnet.gov/expapi/verbs/voided":"voided"},Verb=TinCan.Verb=function(cfg){this.log("constructor");this.id=null;this.display=null;this.init(cfg);};Verb.prototype={LOG_SRC:"Verb",log:TinCan.prototype.log,init:function(cfg){this.log("init");var i,directProps=["id","display"],prop;if(typeof cfg==="string"){this.id=cfg;this.display={und:this.id};for(prop in _downConvertMap){if(_downConvertMap.hasOwnProperty(prop)&&_downConvertMap[prop]===cfg){this.id=prop;break;}}}
else{cfg=cfg||{};for(i=0;i<directProps.length;i+=1){if(cfg.hasOwnProperty(directProps[i])&&cfg[directProps[i]]!==null){this[directProps[i]]=cfg[directProps[i]];}}
if(this.display===null&&typeof _downConvertMap[this.id]!=="undefined"){this.display={"und":_downConvertMap[this.id]};}}},toString:function(lang){this.log("toString");if(this.display!==null){return this.getLangDictionaryValue("display",lang);}
return this.id;},asVersion:function(version){this.log("asVersion");var result;version=version||TinCan.versions()[0];if(version==="0.9"){result=_downConvertMap[this.id];}
else{result={id:this.id};if(this.display!==null){result.display=this.display;}}
return result;},getLangDictionaryValue:TinCan.Utils.getLangDictionaryValue};Verb.fromJSON=function(verbJSON){Verb.prototype.log("fromJSON");var _verb=JSON.parse(verbJSON);return new Verb(_verb);};}());(function(){"use strict";var Result=TinCan.Result=function(cfg){this.log("constructor");this.score=null;this.success=null;this.completion=null;this.duration=null;this.response=null;this.extensions=null;this.init(cfg);};Result.prototype={LOG_SRC:"Result",log:TinCan.prototype.log,init:function(cfg){this.log("init");var i,directProps=["completion","duration","extensions","response","success"];cfg=cfg||{};if(cfg.hasOwnProperty("score")&&cfg.score!==null){if(cfg.score instanceof TinCan.Score){this.score=cfg.score;}
else{this.score=new TinCan.Score(cfg.score);}}
for(i=0;i<directProps.length;i+=1){if(cfg.hasOwnProperty(directProps[i])&&cfg[directProps[i]]!==null){this[directProps[i]]=cfg[directProps[i]];}}
if(this.completion==="Completed"){this.completion=true;}},asVersion:function(version){this.log("asVersion");var result={},optionalDirectProps=["success","duration","response","extensions"],optionalObjProps=["score"],i;version=version||TinCan.versions()[0];for(i=0;i<optionalDirectProps.length;i+=1){if(this[optionalDirectProps[i]]!==null){result[optionalDirectProps[i]]=this[optionalDirectProps[i]];}}
for(i=0;i<optionalObjProps.length;i+=1){if(this[optionalObjProps[i]]!==null){result[optionalObjProps[i]]=this[optionalObjProps[i]].asVersion(version);}}
if(this.completion!==null){if(version==="0.9"){if(this.completion){result.completion="Completed";}}
else{result.completion=this.completion;}}
return result;}};Result.fromJSON=function(resultJSON){Result.prototype.log("fromJSON");var _result=JSON.parse(resultJSON);return new Result(_result);};}());(function(){"use strict";var Score=TinCan.Score=function(cfg){this.log("constructor");this.scaled=null;this.raw=null;this.min=null;this.max=null;this.init(cfg);};Score.prototype={LOG_SRC:"Score",log:TinCan.prototype.log,init:function(cfg){this.log("init");var i,directProps=["scaled","raw","min","max"];cfg=cfg||{};for(i=0;i<directProps.length;i+=1){if(cfg.hasOwnProperty(directProps[i])&&cfg[directProps[i]]!==null){this[directProps[i]]=cfg[directProps[i]];}}},asVersion:function(version){this.log("asVersion");var result={},optionalDirectProps=["scaled","raw","min","max"],i;version=version||TinCan.versions()[0];for(i=0;i<optionalDirectProps.length;i+=1){if(this[optionalDirectProps[i]]!==null){result[optionalDirectProps[i]]=this[optionalDirectProps[i]];}}
return result;}};Score.fromJSON=function(scoreJSON){Score.prototype.log("fromJSON");var _score=JSON.parse(scoreJSON);return new Score(_score);};}());(function(){"use strict";var InteractionComponent=TinCan.InteractionComponent=function(cfg){this.log("constructor");this.id=null;this.description=null;this.init(cfg);};InteractionComponent.prototype={LOG_SRC:"InteractionComponent",log:TinCan.prototype.log,init:function(cfg){this.log("init");var i,directProps=["id","description"];cfg=cfg||{};for(i=0;i<directProps.length;i+=1){if(cfg.hasOwnProperty(directProps[i])&&cfg[directProps[i]]!==null){this[directProps[i]]=cfg[directProps[i]];}}},asVersion:function(version){this.log("asVersion");var result={id:this.id},optionalDirectProps=["description"],i,prop;version=version||TinCan.versions()[0];for(i=0;i<optionalDirectProps.length;i+=1){prop=optionalDirectProps[i];if(this[prop]!==null){result[prop]=this[prop];}}
return result;},getLangDictionaryValue:TinCan.Utils.getLangDictionaryValue};InteractionComponent.fromJSON=function(icJSON){InteractionComponent.prototype.log("fromJSON");var _ic=JSON.parse(icJSON);return new InteractionComponent(_ic);};}());(function(){"use strict";var _downConvertMap={"http://adlnet.gov/expapi/activities/course":"course","http://adlnet.gov/expapi/activities/module":"module","http://adlnet.gov/expapi/activities/meeting":"meeting","http://adlnet.gov/expapi/activities/media":"media","http://adlnet.gov/expapi/activities/performance":"performance","http://adlnet.gov/expapi/activities/simulation":"simulation","http://adlnet.gov/expapi/activities/assessment":"assessment","http://adlnet.gov/expapi/activities/interaction":"interaction","http://adlnet.gov/expapi/activities/cmi.interaction":"cmi.interaction","http://adlnet.gov/expapi/activities/question":"question","http://adlnet.gov/expapi/activities/objective":"objective","http://adlnet.gov/expapi/activities/link":"link"},ActivityDefinition=TinCan.ActivityDefinition=function(cfg){this.log("constructor");this.name=null;this.description=null;this.type=null;this.moreInfo=null;this.extensions=null;this.interactionType=null;this.correctResponsesPattern=null;this.choices=null;this.scale=null;this.source=null;this.target=null;this.steps=null;this.init(cfg);};ActivityDefinition.prototype={LOG_SRC:"ActivityDefinition",log:TinCan.prototype.log,init:function(cfg){this.log("init");var i,j,prop,directProps=["name","description","moreInfo","extensions","correctResponsesPattern"],interactionComponentProps=[];cfg=cfg||{};if(cfg.hasOwnProperty("type")&&cfg.type!==null){for(prop in _downConvertMap){if(_downConvertMap.hasOwnProperty(prop)&&_downConvertMap[prop]===cfg.type){cfg.type=_downConvertMap[prop];}}
this.type=cfg.type;}
if(cfg.hasOwnProperty("interactionType")&&cfg.interactionType!==null){this.interactionType=cfg.interactionType;if(cfg.interactionType==="choice"||cfg.interactionType==="sequencing"){interactionComponentProps.push("choices");}
else if(cfg.interactionType==="likert"){interactionComponentProps.push("scale");}
else if(cfg.interactionType==="matching"){interactionComponentProps.push("source");interactionComponentProps.push("target");}
else if(cfg.interactionType==="performance"){interactionComponentProps.push("steps");}
if(interactionComponentProps.length>0){for(i=0;i<interactionComponentProps.length;i+=1){prop=interactionComponentProps[i];if(cfg.hasOwnProperty(prop)&&cfg[prop]!==null){this[prop]=[];for(j=0;j<cfg[prop].length;j+=1){if(cfg[prop][j]instanceof TinCan.InteractionComponent){this[prop].push(cfg[prop][j]);}else{this[prop].push(new TinCan.InteractionComponent(cfg[prop][j]));}}}}}}
for(i=0;i<directProps.length;i+=1){if(cfg.hasOwnProperty(directProps[i])&&cfg[directProps[i]]!==null){this[directProps[i]]=cfg[directProps[i]];}}},toString:function(lang){this.log("toString");if(this.name!==null){return this.getLangDictionaryValue("name",lang);}
if(this.description!==null){return this.getLangDictionaryValue("description",lang);}
return"";},asVersion:function(version){this.log("asVersion");var result={},directProps=["name","description","interactionType","correctResponsesPattern","extensions"],interactionComponentProps=["choices","scale","source","target","steps"],i,j,prop;version=version||TinCan.versions()[0];if(this.type!==null){if(version==="0.9"){result.type=_downConvertMap[this.type];}
else{result.type=this.type;}}
for(i=0;i<directProps.length;i+=1){prop=directProps[i];if(this[prop]!==null){result[prop]=this[prop];}}
for(i=0;i<interactionComponentProps.length;i+=1){prop=interactionComponentProps[i];if(this[prop]!==null){result[prop]=[];for(j=0;j<this[prop].length;j+=1){result[prop].push(this[prop][j].asVersion(version));}}}
if(version.indexOf("0.9")!==0){if(this.moreInfo!==null){result.moreInfo=this.moreInfo;}}
return result;},getLangDictionaryValue:TinCan.Utils.getLangDictionaryValue};ActivityDefinition.fromJSON=function(definitionJSON){ActivityDefinition.prototype.log("fromJSON");var _definition=JSON.parse(definitionJSON);return new ActivityDefinition(_definition);};}());(function(){"use strict";var Activity=TinCan.Activity=function(cfg){this.log("constructor");this.objectType="Activity";this.id=null;this.definition=null;this.init(cfg);};Activity.prototype={LOG_SRC:"Activity",log:TinCan.prototype.log,init:function(cfg){this.log("init");var i,directProps=["id"];cfg=cfg||{};if(cfg.hasOwnProperty("definition")){if(cfg.definition instanceof TinCan.ActivityDefinition){this.definition=cfg.definition;}else{this.definition=new TinCan.ActivityDefinition(cfg.definition);}}
for(i=0;i<directProps.length;i+=1){if(cfg.hasOwnProperty(directProps[i])&&cfg[directProps[i]]!==null){this[directProps[i]]=cfg[directProps[i]];}}},toString:function(lang){this.log("toString");var defString="";if(this.definition!==null){defString=this.definition.toString(lang);if(defString!==""){return defString;}}
if(this.id!==null){return this.id;}
return"Activity: unidentified";},asVersion:function(version){this.log("asVersion");var result={id:this.id,objectType:this.objectType};version=version||TinCan.versions()[0];if(this.definition!==null){result.definition=this.definition.asVersion(version);}
return result;}};Activity.fromJSON=function(activityJSON){Activity.prototype.log("fromJSON");var _activity=JSON.parse(activityJSON);return new Activity(_activity);};}());(function(){"use strict";var ContextActivities=TinCan.ContextActivities=function(cfg){this.log("constructor");this.category=null;this.parent=null;this.grouping=null;this.other=null;this.init(cfg);};ContextActivities.prototype={LOG_SRC:"ContextActivities",log:TinCan.prototype.log,init:function(cfg){this.log("init");var i,j,objProps=["category","parent","grouping","other"],prop,val;cfg=cfg||{};for(i=0;i<objProps.length;i+=1){prop=objProps[i];if(cfg.hasOwnProperty(prop)&&cfg[prop]!==null){if(Object.prototype.toString.call(cfg[prop])==="[object Array]"){for(j=0;j<cfg[prop].length;j+=1){this.add(prop,cfg[prop][j]);}}
else{val=cfg[prop];this.add(prop,val);}}}},add:function(key,val){if(key!=="category"&&key!=="parent"&&key!=="grouping"&&key!=="other"){return;}
if(this[key]===null){this[key]=[];}
if(!(val instanceof TinCan.Activity)){val=typeof val==="string"?{id:val}:val;val=new TinCan.Activity(val);}
this[key].push(val);return this[key].length-1;},asVersion:function(version){this.log("asVersion");var result={},optionalObjProps=["parent","grouping","other"],i,j;version=version||TinCan.versions()[0];for(i=0;i<optionalObjProps.length;i+=1){if(this[optionalObjProps[i]]!==null&&this[optionalObjProps[i]].length>0){if(version==="0.9"||version==="0.95"){if(this[optionalObjProps[i]].length>1){this.log("[warning] version does not support multiple values in: "+optionalObjProps[i]);}
result[optionalObjProps[i]]=this[optionalObjProps[i]][0].asVersion(version);}
else{result[optionalObjProps[i]]=[];for(j=0;j<this[optionalObjProps[i]].length;j+=1){result[optionalObjProps[i]].push(this[optionalObjProps[i]][j].asVersion(version));}}}}
if(this.category!==null&&this.category.length>0){if(version==="0.9"||version==="0.95"){this.log("[error] version does not support the 'category' property: "+version);throw new Error(version+" does not support the 'category' property");}
else{result.category=[];for(i=0;i<this.category.length;i+=1){result.category.push(this.category[i].asVersion(version));}}}
return result;}};ContextActivities.fromJSON=function(contextActivitiesJSON){ContextActivities.prototype.log("fromJSON");var _contextActivities=JSON.parse(contextActivitiesJSON);return new ContextActivities(_contextActivities);};}());(function(){"use strict";var Context=TinCan.Context=function(cfg){this.log("constructor");this.registration=null;this.instructor=null;this.team=null;this.contextActivities=null;this.revision=null;this.platform=null;this.language=null;this.statement=null;this.extensions=null;this.init(cfg);};Context.prototype={LOG_SRC:"Context",log:TinCan.prototype.log,init:function(cfg){this.log("init");var i,directProps=["registration","revision","platform","language","statement","extensions"],agentGroupProps=["instructor","team"],prop,val;cfg=cfg||{};for(i=0;i<directProps.length;i+=1){prop=directProps[i];if(cfg.hasOwnProperty(prop)&&cfg[prop]!==null){this[prop]=cfg[prop];}}
for(i=0;i<agentGroupProps.length;i+=1){prop=agentGroupProps[i];if(cfg.hasOwnProperty(prop)&&cfg[prop]!==null){val=cfg[prop];if(typeof val.objectType==="undefined"||val.objectType==="Person"){val.objectType="Agent";}
if(val.objectType==="Agent"&&!(val instanceof TinCan.Agent)){val=new TinCan.Agent(val);}else if(val.objectType==="Group"&&!(val instanceof TinCan.Group)){val=new TinCan.Group(val);}
this[prop]=val;}}
if(cfg.hasOwnProperty("contextActivities")&&cfg.contextActivities!==null){if(cfg.contextActivities instanceof TinCan.ContextActivities){this.contextActivities=cfg.contextActivities;}
else{this.contextActivities=new TinCan.ContextActivities(cfg.contextActivities);}}},asVersion:function(version){this.log("asVersion");var result={},optionalDirectProps=["registration","revision","platform","language","extensions"],optionalObjProps=["instructor","team","contextActivities","statement"],i;version=version||TinCan.versions()[0];for(i=0;i<optionalDirectProps.length;i+=1){if(this[optionalDirectProps[i]]!==null){result[optionalDirectProps[i]]=this[optionalDirectProps[i]];}}
for(i=0;i<optionalObjProps.length;i+=1){if(this[optionalObjProps[i]]!==null){result[optionalObjProps[i]]=this[optionalObjProps[i]].asVersion(version);}}
return result;}};Context.fromJSON=function(contextJSON){Context.prototype.log("fromJSON");var _context=JSON.parse(contextJSON);return new Context(_context);};}());(function(){"use strict";var StatementRef=TinCan.StatementRef=function(cfg){this.log("constructor");this.id=null;this.init(cfg);};StatementRef.prototype={objectType:"StatementRef",LOG_SRC:"StatementRef",log:TinCan.prototype.log,init:function(cfg){this.log("init");var i,directProps=["id"];cfg=cfg||{};for(i=0;i<directProps.length;i+=1){if(cfg.hasOwnProperty(directProps[i])&&cfg[directProps[i]]!==null){this[directProps[i]]=cfg[directProps[i]];}}},toString:function(){this.log("toString");return this.id;},asVersion:function(version){this.log("asVersion");var result={objectType:this.objectType,id:this.id};if(version==="0.9"){result.objectType="Statement";}
return result;}};StatementRef.fromJSON=function(stRefJSON){StatementRef.prototype.log("fromJSON");var _stRef=JSON.parse(stRefJSON);return new StatementRef(_stRef);};}());(function(){"use strict";var SubStatement=TinCan.SubStatement=function(cfg){this.log("constructor");this.actor=null;this.verb=null;this.target=null;this.result=null;this.context=null;this.timestamp=null;this.init(cfg);};SubStatement.prototype={objectType:"SubStatement",LOG_SRC:"SubStatement",log:TinCan.prototype.log,init:function(cfg){this.log("init");var i,directProps=["timestamp"];cfg=cfg||{};if(cfg.hasOwnProperty("object")){cfg.target=cfg.object;}
if(cfg.hasOwnProperty("actor")){if(typeof cfg.actor.objectType==="undefined"||cfg.actor.objectType==="Person"){cfg.actor.objectType="Agent";}
if(cfg.actor.objectType==="Agent"){if(cfg.actor instanceof TinCan.Agent){this.actor=cfg.actor;}else{this.actor=new TinCan.Agent(cfg.actor);}}else if(cfg.actor.objectType==="Group"){if(cfg.actor instanceof TinCan.Group){this.actor=cfg.actor;}else{this.actor=new TinCan.Group(cfg.actor);}}}
if(cfg.hasOwnProperty("verb")){if(cfg.verb instanceof TinCan.Verb){this.verb=cfg.verb;}else{this.verb=new TinCan.Verb(cfg.verb);}}
if(cfg.hasOwnProperty("target")){if(cfg.target instanceof TinCan.Activity||cfg.target instanceof TinCan.Agent||cfg.target instanceof TinCan.Group||cfg.target instanceof TinCan.SubStatement||cfg.target instanceof TinCan.StatementRef){this.target=cfg.target;}else{if(typeof cfg.target.objectType==="undefined"){cfg.target.objectType="Activity";}
if(cfg.target.objectType==="Activity"){this.target=new TinCan.Activity(cfg.target);}else if(cfg.target.objectType==="Agent"){this.target=new TinCan.Agent(cfg.target);}else if(cfg.target.objectType==="Group"){this.target=new TinCan.Group(cfg.target);}else if(cfg.target.objectType==="SubStatement"){this.target=new TinCan.SubStatement(cfg.target);}else if(cfg.target.objectType==="StatementRef"){this.target=new TinCan.StatementRef(cfg.target);}else{this.log("Unrecognized target type: "+cfg.target.objectType);}}}
if(cfg.hasOwnProperty("result")){if(cfg.result instanceof TinCan.Result){this.result=cfg.result;}else{this.result=new TinCan.Result(cfg.result);}}
if(cfg.hasOwnProperty("context")){if(cfg.context instanceof TinCan.Context){this.context=cfg.context;}else{this.context=new TinCan.Context(cfg.context);}}
for(i=0;i<directProps.length;i+=1){if(cfg.hasOwnProperty(directProps[i])&&cfg[directProps[i]]!==null){this[directProps[i]]=cfg[directProps[i]];}}},toString:function(lang){this.log("toString");return(this.actor!==null?this.actor.toString(lang):"")+" "+
(this.verb!==null?this.verb.toString(lang):"")+" "+
(this.target!==null?this.target.toString(lang):"");},asVersion:function(version){this.log("asVersion");var result,optionalDirectProps=["timestamp"],optionalObjProps=["actor","verb","result","context"],i;result={objectType:this.objectType};version=version||TinCan.versions()[0];for(i=0;i<optionalDirectProps.length;i+=1){if(this[optionalDirectProps[i]]!==null){result[optionalDirectProps[i]]=this[optionalDirectProps[i]];}}
for(i=0;i<optionalObjProps.length;i+=1){if(this[optionalObjProps[i]]!==null){result[optionalObjProps[i]]=this[optionalObjProps[i]].asVersion(version);}}
if(this.target!==null){result.object=this.target.asVersion(version);}
return result;}};SubStatement.fromJSON=function(subStJSON){SubStatement.prototype.log("fromJSON");var _subSt=JSON.parse(subStJSON);return new SubStatement(_subSt);};}());(function(){"use strict";var Statement=TinCan.Statement=function(cfg,initCfg){this.log("constructor");if(typeof initCfg==="number"){initCfg={storeOriginal:initCfg};}else{initCfg=initCfg||{};}
if(typeof initCfg.storeOriginal==="undefined"){initCfg.storeOriginal=null;}
if(typeof initCfg.doStamp==="undefined"){initCfg.doStamp=true;}
this.id=null;this.actor=null;this.verb=null;this.target=null;this.result=null;this.context=null;this.timestamp=null;this.stored=null;this.authority=null;this.version=null;this.degraded=false;this.voided=null;this.inProgress=null;this.originalJSON=null;this.init(cfg,initCfg);};Statement.prototype={LOG_SRC:"Statement",log:TinCan.prototype.log,init:function(cfg,initCfg){this.log("init");var i,directProps=["id","stored","timestamp","version","inProgress","voided"];cfg=cfg||{};if(initCfg.storeOriginal){this.originalJSON=JSON.stringify(cfg,null,initCfg.storeOriginal);}
if(cfg.hasOwnProperty("object")){cfg.target=cfg.object;}
if(cfg.hasOwnProperty("actor")){if(typeof cfg.actor.objectType==="undefined"||cfg.actor.objectType==="Person"){cfg.actor.objectType="Agent";}
if(cfg.actor.objectType==="Agent"){if(cfg.actor instanceof TinCan.Agent){this.actor=cfg.actor;}else{this.actor=new TinCan.Agent(cfg.actor);}}else if(cfg.actor.objectType==="Group"){if(cfg.actor instanceof TinCan.Group){this.actor=cfg.actor;}else{this.actor=new TinCan.Group(cfg.actor);}}}
if(cfg.hasOwnProperty("authority")){if(typeof cfg.authority.objectType==="undefined"||cfg.authority.objectType==="Person"){cfg.authority.objectType="Agent";}
if(cfg.authority.objectType==="Agent"){if(cfg.authority instanceof TinCan.Agent){this.authority=cfg.authority;}else{this.authority=new TinCan.Agent(cfg.authority);}}else if(cfg.authority.objectType==="Group"){if(cfg.actor instanceof TinCan.Group){this.authority=cfg.authority;}else{this.authority=new TinCan.Group(cfg.authority);}}}
if(cfg.hasOwnProperty("verb")){if(cfg.verb instanceof TinCan.Verb){this.verb=cfg.verb;}else{this.verb=new TinCan.Verb(cfg.verb);}}
if(cfg.hasOwnProperty("target")){if(cfg.target instanceof TinCan.Activity||cfg.target instanceof TinCan.Agent||cfg.target instanceof TinCan.Group||cfg.target instanceof TinCan.SubStatement||cfg.target instanceof TinCan.StatementRef){this.target=cfg.target;}else{if(typeof cfg.target.objectType==="undefined"){cfg.target.objectType="Activity";}
if(cfg.target.objectType==="Activity"){this.target=new TinCan.Activity(cfg.target);}else if(cfg.target.objectType==="Agent"){this.target=new TinCan.Agent(cfg.target);}else if(cfg.target.objectType==="Group"){this.target=new TinCan.Group(cfg.target);}else if(cfg.target.objectType==="SubStatement"){this.target=new TinCan.SubStatement(cfg.target);}else if(cfg.target.objectType==="StatementRef"){this.target=new TinCan.StatementRef(cfg.target);}else{this.log("Unrecognized target type: "+cfg.target.objectType);}}}
if(cfg.hasOwnProperty("result")){if(cfg.result instanceof TinCan.Result){this.result=cfg.result;}else{this.result=new TinCan.Result(cfg.result);}}
if(cfg.hasOwnProperty("context")){if(cfg.context instanceof TinCan.Context){this.context=cfg.context;}else{this.context=new TinCan.Context(cfg.context);}}
for(i=0;i<directProps.length;i+=1){if(cfg.hasOwnProperty(directProps[i])&&cfg[directProps[i]]!==null){this[directProps[i]]=cfg[directProps[i]];}}
if(initCfg.doStamp){this.stamp();}},toString:function(lang){this.log("toString");return(this.actor!==null?this.actor.toString(lang):"")+" "+
(this.verb!==null?this.verb.toString(lang):"")+" "+
(this.target!==null?this.target.toString(lang):"");},asVersion:function(version){this.log("asVersion");var result={},optionalDirectProps=["id","timestamp"],optionalObjProps=["actor","verb","result","context","authority"],i;version=version||TinCan.versions()[0];for(i=0;i<optionalDirectProps.length;i+=1){if(this[optionalDirectProps[i]]!==null){result[optionalDirectProps[i]]=this[optionalDirectProps[i]];}}
for(i=0;i<optionalObjProps.length;i+=1){if(this[optionalObjProps[i]]!==null){result[optionalObjProps[i]]=this[optionalObjProps[i]].asVersion(version);}}
if(this.target!==null){result.object=this.target.asVersion(version);}
if(version==="0.9"||version==="0.95"){if(this.voided!==null){result.voided=this.voided;}}
if(version==="0.9"&&this.inProgress!==null){result.inProgress=this.inProgress;}
return result;},stamp:function(){this.log("stamp");if(this.id===null){this.id=TinCan.Utils.getUUID();}
if(this.timestamp===null){this.timestamp=TinCan.Utils.getISODateString(new Date());}}};Statement.fromJSON=function(stJSON){Statement.prototype.log("fromJSON");var _st=JSON.parse(stJSON);return new Statement(_st);};}());(function(){"use strict";var StatementsResult=TinCan.StatementsResult=function(cfg){this.log("constructor");this.statements=null;this.more=null;this.init(cfg);};StatementsResult.prototype={LOG_SRC:"StatementsResult",log:TinCan.prototype.log,init:function(cfg){this.log("init");cfg=cfg||{};if(cfg.hasOwnProperty("statements")){this.statements=cfg.statements;}
if(cfg.hasOwnProperty("more")){this.more=cfg.more;}}};StatementsResult.fromJSON=function(resultJSON){StatementsResult.prototype.log("fromJSON");var _result,stmts=[],stmt,i;try{_result=JSON.parse(resultJSON);}catch(parseError){StatementsResult.prototype.log("fromJSON - JSON.parse error: "+parseError);}
if(_result){for(i=0;i<_result.statements.length;i+=1){try{stmt=new TinCan.Statement(_result.statements[i],4);}catch(error){StatementsResult.prototype.log("fromJSON - statement instantiation failed: "+error+" ("+JSON.stringify(_result.statements[i])+")");stmt=new TinCan.Statement({id:_result.statements[i].id},4);}
stmts.push(stmt);}
_result.statements=stmts;}
return new StatementsResult(_result);};}());(function(){"use strict";var State=TinCan.State=function(cfg){this.log("constructor");this.id=null;this.updated=null;this.contents=null;this.etag=null;this.contentType=null;this.init(cfg);};State.prototype={LOG_SRC:"State",log:TinCan.prototype.log,init:function(cfg){this.log("init");var i,directProps=["id","contents","etag","contentType"];cfg=cfg||{};for(i=0;i<directProps.length;i+=1){if(cfg.hasOwnProperty(directProps[i])&&cfg[directProps[i]]!==null){this[directProps[i]]=cfg[directProps[i]];}}
this.updated=false;}};State.fromJSON=function(stateJSON){State.prototype.log("fromJSON");var _state=JSON.parse(stateJSON);return new State(_state);};}());(function(){"use strict";var ActivityProfile=TinCan.ActivityProfile=function(cfg){this.log("constructor");this.id=null;this.activity=null;this.updated=null;this.contents=null;this.etag=null;this.contentType=null;this.init(cfg);};ActivityProfile.prototype={LOG_SRC:"ActivityProfile",log:TinCan.prototype.log,init:function(cfg){this.log("init");var i,directProps=["id","contents","etag","contentType"];cfg=cfg||{};if(cfg.hasOwnProperty("activity")){if(cfg.activity instanceof TinCan.Activity){this.activity=cfg.activity;}
else{this.activity=new TinCan.Activity(cfg.activity);}}
for(i=0;i<directProps.length;i+=1){if(cfg.hasOwnProperty(directProps[i])&&cfg[directProps[i]]!==null){this[directProps[i]]=cfg[directProps[i]];}}
this.updated=false;}};ActivityProfile.fromJSON=function(stateJSON){ActivityProfile.prototype.log("fromJSON");var _state=JSON.parse(stateJSON);return new ActivityProfile(_state);};}());(function(){"use strict";var AgentProfile=TinCan.AgentProfile=function(cfg){this.log("constructor");this.id=null;this.agent=null;this.updated=null;this.contents=null;this.etag=null;this.contentType=null;this.init(cfg);};AgentProfile.prototype={LOG_SRC:"AgentProfile",log:TinCan.prototype.log,init:function(cfg){this.log("init");var i,directProps=["id","contents","etag","contentType"];cfg=cfg||{};if(cfg.hasOwnProperty("agent")){if(cfg.agent instanceof TinCan.Agent){this.agent=cfg.agent;}
else{this.agent=new TinCan.Agent(cfg.agent);}}
for(i=0;i<directProps.length;i+=1){if(cfg.hasOwnProperty(directProps[i])&&cfg[directProps[i]]!==null){this[directProps[i]]=cfg[directProps[i]];}}
this.updated=false;}};AgentProfile.fromJSON=function(stateJSON){AgentProfile.prototype.log("fromJSON");var _state=JSON.parse(stateJSON);return new AgentProfile(_state);};}());(function(){"use strict";var About=TinCan.About=function(cfg){this.log("constructor");this.version=null;this.init(cfg);};About.prototype={LOG_SRC:"About",log:TinCan.prototype.log,init:function(cfg){this.log("init");var i,directProps=["version"];cfg=cfg||{};for(i=0;i<directProps.length;i+=1){if(cfg.hasOwnProperty(directProps[i])&&cfg[directProps[i]]!==null){this[directProps[i]]=cfg[directProps[i]];}}}};About.fromJSON=function(aboutJSON){About.prototype.log("fromJSON");var _about=JSON.parse(aboutJSON);return new About(_about);};}());(function(){"use strict";var LOG_SRC="Environment.Browser",nativeRequest,xdrRequest,requestComplete,__delay,__IEModeConversion,env={},log=TinCan.prototype.log;if(typeof window==="undefined"){log("'window' not defined",LOG_SRC);return;}
if(!window.JSON){window.JSON={parse:function(sJSON){return eval("("+sJSON+")");},stringify:function(vContent){var sOutput="",nId,sProp;if(vContent instanceof Object){if(vContent.constructor===Array){for(nId=0;nId<vContent.length;nId+=1){sOutput+=this.stringify(vContent[nId])+",";}
return"["+sOutput.substr(0,sOutput.length-1)+"]";}
if(vContent.toString!==Object.prototype.toString){return"\""+vContent.toString().replace(/"/g,"\\$&")+"\"";}
for(sProp in vContent){if(vContent.hasOwnProperty(sProp)){sOutput+="\""+sProp.replace(/"/g,"\\$&")+"\":"+this.stringify(vContent[sProp])+",";}}
return"{"+sOutput.substr(0,sOutput.length-1)+"}";}
return typeof vContent==="string"?"\""+vContent.replace(/"/g,"\\$&")+"\"":String(vContent);}};}
if(!Date.now){Date.now=function(){return+(new Date());};}
env.hasCORS=false;env.useXDR=false;if(typeof XMLHttpRequest!=="undefined"&&typeof(new XMLHttpRequest()).withCredentials!=="undefined"){env.hasCORS=true;}
else if(typeof XDomainRequest!=="undefined"){env.hasCORS=true;env.useXDR=true;}
requestComplete=function(xhr,cfg,control){log("requestComplete: "+control.finished+", xhr.status: "+xhr.status,LOG_SRC);var requestCompleteResult,notFoundOk,httpStatus;if(typeof xhr.status==="undefined"){httpStatus=control.fakeStatus;}
else{httpStatus=(xhr.status===1223)?204:xhr.status;}
if(!control.finished){control.finished=true;notFoundOk=(cfg.ignore404&&httpStatus===404);if((httpStatus>=200&&httpStatus<400)||notFoundOk){if(cfg.callback){cfg.callback(null,xhr);}
else{requestCompleteResult={err:null,xhr:xhr};return requestCompleteResult;}}
else{requestCompleteResult={err:httpStatus,xhr:xhr};if(httpStatus===0){log("[warning] There was a problem communicating with the Learning Record Store. Aborted, offline, or invalid CORS endpoint ("+httpStatus+")",LOG_SRC);}
else{log("[warning] There was a problem communicating with the Learning Record Store. ("+httpStatus+" | "+xhr.responseText+")",LOG_SRC);}
if(cfg.callback){cfg.callback(httpStatus,xhr);}
return requestCompleteResult;}}
else{return requestCompleteResult;}};__IEModeConversion=function(fullUrl,headers,pairs,cfg){var prop;for(prop in headers){if(headers.hasOwnProperty(prop)){pairs.push(prop+"="+encodeURIComponent(headers[prop]));}}
if(typeof cfg.data!=="undefined"){pairs.push("content="+encodeURIComponent(cfg.data));}
headers["Content-Type"]="application/x-www-form-urlencoded";fullUrl+="?method="+cfg.method;cfg.method="POST";cfg.params={};if(pairs.length>0){cfg.data=pairs.join("&");}
return fullUrl;};nativeRequest=function(fullUrl,headers,cfg){log("sendRequest using XMLHttpRequest",LOG_SRC);var self=this,xhr,prop,pairs=[],data,control={finished:false,fakeStatus:null},async=typeof cfg.callback!=="undefined",fullRequest=fullUrl,err,MAX_REQUEST_LENGTH=2048;log("sendRequest using XMLHttpRequest - async: "+async,LOG_SRC);for(prop in cfg.params){if(cfg.params.hasOwnProperty(prop)){pairs.push(prop+"="+encodeURIComponent(cfg.params[prop]));}}
if(pairs.length>0){fullRequest+="?"+pairs.join("&");}
if(fullRequest.length>=MAX_REQUEST_LENGTH){if(typeof headers["Content-Type"]!=="undefined"&&headers["Content-Type"]!=="application/json"){err=new Error("Unsupported content type for IE Mode request");if(typeof cfg.callback!=="undefined"){cfg.callback(err,null);}
return{err:err,xhr:null};}
if(typeof cfg.method==="undefined"){err=new Error("method must not be undefined for an IE Mode Request conversion");if(typeof cfg.callback!=="undefined"){cfg.callback(err,null);}
return{err:err,xhr:null};}
fullUrl=__IEModeConversion(fullUrl,headers,pairs,cfg);}
else{fullUrl=fullRequest;}
if(typeof XMLHttpRequest!=="undefined"){xhr=new XMLHttpRequest();}
else{xhr=new ActiveXObject("Microsoft.XMLHTTP");}
xhr.open(cfg.method,fullUrl,async);for(prop in headers){if(headers.hasOwnProperty(prop)){xhr.setRequestHeader(prop,headers[prop]);}}
if(typeof cfg.data!=="undefined"){cfg.data+="";}
data=cfg.data;if(async){xhr.onreadystatechange=function(){log("xhr.onreadystatechange - xhr.readyState: "+xhr.readyState,LOG_SRC);if(xhr.readyState===4){requestComplete.call(self,xhr,cfg,control);}};}
try{xhr.send(data);}
catch(ex){log("sendRequest caught send exception: "+ex,LOG_SRC);}
if(async){return xhr;}
return requestComplete.call(this,xhr,cfg,control);};xdrRequest=function(fullUrl,headers,cfg){log("sendRequest using XDomainRequest",LOG_SRC);var self=this,xhr,pairs=[],data,prop,until,control={finished:false,fakeStatus:null},err;if(typeof headers["Content-Type"]!=="undefined"&&headers["Content-Type"]!=="application/json"){err=new Error("Unsupported content type for IE Mode request");if(cfg.callback){cfg.callback(err,null);return null;}
return{err:err,xhr:null};}
fullUrl+="?method="+cfg.method;for(prop in cfg.params){if(cfg.params.hasOwnProperty(prop)){pairs.push(prop+"="+encodeURIComponent(cfg.params[prop]));}}
for(prop in headers){if(headers.hasOwnProperty(prop)){pairs.push(prop+"="+encodeURIComponent(headers[prop]));}}
if(cfg.data!==null){pairs.push("content="+encodeURIComponent(cfg.data));}
data=pairs.join("&");xhr=new XDomainRequest();xhr.open("POST",fullUrl);if(!cfg.callback){xhr.onload=function(){control.fakeStatus=200;};xhr.onerror=function(){control.fakeStatus=400;};xhr.ontimeout=function(){control.fakeStatus=0;};}
else{xhr.onload=function(){control.fakeStatus=200;requestComplete.call(self,xhr,cfg,control);};xhr.onerror=function(){control.fakeStatus=400;requestComplete.call(self,xhr,cfg,control);};xhr.ontimeout=function(){control.fakeStatus=0;requestComplete.call(self,xhr,cfg,control);};}
xhr.onprogress=function(){};xhr.timeout=0;try{xhr.send(data);}
catch(ex){log("sendRequest caught send exception: "+ex,LOG_SRC);}
if(!cfg.callback){until=10000+Date.now();log("sendRequest - until: "+until+", finished: "+control.finished,LOG_SRC);while(Date.now()<until&&control.fakeStatus===null){__delay();}
return requestComplete.call(self,xhr,cfg,control);}
return xhr;};TinCan.LRS.prototype._initByEnvironment=function(cfg){log("_initByEnvironment",LOG_SRC);var urlParts,schemeMatches,locationPort,isXD;cfg=cfg||{};this._makeRequest=nativeRequest;this._IEModeConversion=__IEModeConversion;urlParts=this.endpoint.toLowerCase().match(/([A-Za-z]+:)\/\/([^:\/]+):?(\d+)?(\/.*)?$/);if(urlParts===null){log("[error] LRS invalid: failed to divide URL parts",LOG_SRC);throw{code:4,mesg:"LRS invalid: failed to divide URL parts"};}
locationPort=location.port;schemeMatches=location.protocol.toLowerCase()===urlParts[1];if(locationPort===""){locationPort=(location.protocol.toLowerCase()==="http:"?"80":(location.protocol.toLowerCase()==="https:"?"443":""));}
isXD=(!schemeMatches||location.hostname.toLowerCase()!==urlParts[2]||locationPort!==((urlParts[3]!==null&&typeof urlParts[3]!=="undefined"&&urlParts[3]!=="")?urlParts[3]:(urlParts[1]==="http:"?"80":(urlParts[1]==="https:"?"443":""))));if(isXD){if(env.hasCORS){if(env.useXDR&&schemeMatches){this._makeRequest=xdrRequest;}
else if(env.useXDR&&!schemeMatches){if(cfg.allowFail){log("[warning] LRS invalid: cross domain request for differing scheme in IE with XDR (allowed to fail)",LOG_SRC);}
else{log("[error] LRS invalid: cross domain request for differing scheme in IE with XDR",LOG_SRC);throw{code:2,mesg:"LRS invalid: cross domain request for differing scheme in IE with XDR"};}}}
else{if(cfg.allowFail){log("[warning] LRS invalid: cross domain requests not supported in this browser (allowed to fail)",LOG_SRC);}
else{log("[error] LRS invalid: cross domain requests not supported in this browser",LOG_SRC);throw{code:1,mesg:"LRS invalid: cross domain requests not supported in this browser"};}}}};__delay=function(){var xhr=new XMLHttpRequest(),url=window.location+"?forcenocache="+TinCan.Utils.getUUID();xhr.open("GET",url,false);xhr.send(null);};TinCan.LRS.syncEnabled=true;}());;(function(root){var freeExports=typeof exports=='object'&&exports;var freeModule=typeof module=='object'&&module&&module.exports==freeExports&&module;var freeGlobal=typeof global=='object'&&global;if(freeGlobal.global===freeGlobal||freeGlobal.window===freeGlobal){root=freeGlobal;}
var punycode,maxInt=2147483647,base=36,tMin=1,tMax=26,skew=38,damp=700,initialBias=72,initialN=128,delimiter='-',regexPunycode=/^xn--/,regexNonASCII=/[^ -~]/,regexSeparators=/\x2E|\u3002|\uFF0E|\uFF61/g,errors={'overflow':'Overflow: input needs wider integers to process','not-basic':'Illegal input >= 0x80 (not a basic code point)','invalid-input':'Invalid input'},baseMinusTMin=base-tMin,floor=Math.floor,stringFromCharCode=String.fromCharCode,key;function error(type){throw RangeError(errors[type]);}
function map(array,fn){var length=array.length;while(length--){array[length]=fn(array[length]);}
return array;}
function mapDomain(string,fn){return map(string.split(regexSeparators),fn).join('.');}
function ucs2decode(string){var output=[],counter=0,length=string.length,value,extra;while(counter<length){value=string.charCodeAt(counter++);if(value>=0xD800&&value<=0xDBFF&&counter<length){extra=string.charCodeAt(counter++);if((extra&0xFC00)==0xDC00){output.push(((value&0x3FF)<<10)+(extra&0x3FF)+0x10000);}else{output.push(value);counter--;}}else{output.push(value);}}
return output;}
function ucs2encode(array){return map(array,function(value){var output='';if(value>0xFFFF){value-=0x10000;output+=stringFromCharCode(value>>>10&0x3FF|0xD800);value=0xDC00|value&0x3FF;}
output+=stringFromCharCode(value);return output;}).join('');}
function basicToDigit(codePoint){if(codePoint-48<10){return codePoint-22;}
if(codePoint-65<26){return codePoint-65;}
if(codePoint-97<26){return codePoint-97;}
return base;}
function digitToBasic(digit,flag){return digit+22+75*(digit<26)-((flag!=0)<<5);}
function adapt(delta,numPoints,firstTime){var k=0;delta=firstTime?floor(delta/damp):delta>>1;delta+=floor(delta/numPoints);for(;delta>baseMinusTMin*tMax>>1;k+=base){delta=floor(delta/baseMinusTMin);}
return floor(k+(baseMinusTMin+1)*delta/(delta+skew));}
function decode(input){var output=[],inputLength=input.length,out,i=0,n=initialN,bias=initialBias,basic,j,index,oldi,w,k,digit,t,length,baseMinusT;basic=input.lastIndexOf(delimiter);if(basic<0){basic=0;}
for(j=0;j<basic;++j){if(input.charCodeAt(j)>=0x80){error('not-basic');}
output.push(input.charCodeAt(j));}
for(index=basic>0?basic+1:0;index<inputLength;){for(oldi=i,w=1,k=base;;k+=base){if(index>=inputLength){error('invalid-input');}
digit=basicToDigit(input.charCodeAt(index++));if(digit>=base||digit>floor((maxInt-i)/w)){error('overflow');}
i+=digit*w;t=k<=bias?tMin:(k>=bias+tMax?tMax:k-bias);if(digit<t){break;}
baseMinusT=base-t;if(w>floor(maxInt/baseMinusT)){error('overflow');}
w*=baseMinusT;}
out=output.length+1;bias=adapt(i-oldi,out,oldi==0);if(floor(i/out)>maxInt-n){error('overflow');}
n+=floor(i/out);i%=out;output.splice(i++,0,n);}
return ucs2encode(output);}
function encode(input){var n,delta,handledCPCount,basicLength,bias,j,m,q,k,t,currentValue,output=[],inputLength,handledCPCountPlusOne,baseMinusT,qMinusT;input=ucs2decode(input);inputLength=input.length;n=initialN;delta=0;bias=initialBias;for(j=0;j<inputLength;++j){currentValue=input[j];if(currentValue<0x80){output.push(stringFromCharCode(currentValue));}}
handledCPCount=basicLength=output.length;if(basicLength){output.push(delimiter);}
while(handledCPCount<inputLength){for(m=maxInt,j=0;j<inputLength;++j){currentValue=input[j];if(currentValue>=n&&currentValue<m){m=currentValue;}}
handledCPCountPlusOne=handledCPCount+1;if(m-n>floor((maxInt-delta)/handledCPCountPlusOne)){error('overflow');}
delta+=(m-n)*handledCPCountPlusOne;n=m;for(j=0;j<inputLength;++j){currentValue=input[j];if(currentValue<n&&++delta>maxInt){error('overflow');}
if(currentValue==n){for(q=delta,k=base;;k+=base){t=k<=bias?tMin:(k>=bias+tMax?tMax:k-bias);if(q<t){break;}
qMinusT=q-t;baseMinusT=base-t;output.push(stringFromCharCode(digitToBasic(t+qMinusT%baseMinusT,0)));q=floor(qMinusT/baseMinusT);}
output.push(stringFromCharCode(digitToBasic(q,0)));bias=adapt(delta,handledCPCountPlusOne,handledCPCount==basicLength);delta=0;++handledCPCount;}}
++delta;++n;}
return output.join('');}
function toUnicode(domain){return mapDomain(domain,function(string){return regexPunycode.test(string)?decode(string.slice(4).toLowerCase()):string;});}
function toASCII(domain){return mapDomain(domain,function(string){return regexNonASCII.test(string)?'xn--'+encode(string):string;});}
punycode={'version':'1.2.3','ucs2':{'decode':ucs2decode,'encode':ucs2encode},'decode':decode,'encode':encode,'toASCII':toASCII,'toUnicode':toUnicode};if(typeof define=='function'&&typeof define.amd=='object'&&define.amd){define(function(){return punycode;});}else if(freeExports&&!freeExports.nodeType){if(freeModule){freeModule.exports=punycode;}else{for(key in punycode){punycode.hasOwnProperty(key)&&(freeExports[key]=punycode[key]);}}}else{root.punycode=punycode;}}(this));(function(root,factory){'use strict';if(typeof exports==='object'){module.exports=factory(require('./punycode'),require('./IPv6'),require('./SecondLevelDomains'));}else if(typeof define==='function'&&define.amd){define(['./punycode','./IPv6','./SecondLevelDomains'],factory);}else{root.URI=factory(root.punycode,root.IPv6,root.SecondLevelDomains,root);}}(this,function(punycode,IPv6,SLD,root){'use strict';var _URI=root&&root.URI;function URI(url,base){if(!(this instanceof URI)){return new URI(url,base);}
if(url===undefined){if(arguments.length){throw new TypeError('undefined is not a valid argument for URI');}
if(typeof location!=='undefined'){url=location.href+'';}else{url='';}}
this.href(url);if(base!==undefined){return this.absoluteTo(base);}
return this;}
URI.version='1.14.2';var p=URI.prototype;var hasOwn=Object.prototype.hasOwnProperty;function escapeRegEx(string){return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g,'\\$1');}
function getType(value){if(value===undefined){return'Undefined';}
return String(Object.prototype.toString.call(value)).slice(8,-1);}
function isArray(obj){return getType(obj)==='Array';}
function filterArrayValues(data,value){var lookup={};var i,length;if(isArray(value)){for(i=0,length=value.length;i<length;i++){lookup[value[i]]=true;}}else{lookup[value]=true;}
for(i=0,length=data.length;i<length;i++){if(lookup[data[i]]!==undefined){data.splice(i,1);length--;i--;}}
return data;}
function arrayContains(list,value){var i,length;if(isArray(value)){for(i=0,length=value.length;i<length;i++){if(!arrayContains(list,value[i])){return false;}}
return true;}
var _type=getType(value);for(i=0,length=list.length;i<length;i++){if(_type==='RegExp'){if(typeof list[i]==='string'&&list[i].match(value)){return true;}}else if(list[i]===value){return true;}}
return false;}
function arraysEqual(one,two){if(!isArray(one)||!isArray(two)){return false;}
if(one.length!==two.length){return false;}
one.sort();two.sort();for(var i=0,l=one.length;i<l;i++){if(one[i]!==two[i]){return false;}}
return true;}
URI._parts=function(){return{protocol:null,username:null,password:null,hostname:null,urn:null,port:null,path:null,query:null,fragment:null,duplicateQueryParameters:URI.duplicateQueryParameters,escapeQuerySpace:URI.escapeQuerySpace};};URI.duplicateQueryParameters=false;URI.escapeQuerySpace=true;URI.protocol_expression=/^[a-z][a-z0-9.+-]*$/i;URI.idn_expression=/[^a-z0-9\.-]/i;URI.punycode_expression=/(xn--)/i;URI.ip4_expression=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;URI.ip6_expression=/^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;URI.find_uri_expression=/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;URI.findUri={start:/\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,end:/[\s\r\n]|$/,trim:/[`!()\[\]{};:'".,<>?«»“”„‘’]+$/};URI.defaultPorts={http:'80',https:'443',ftp:'21',gopher:'70',ws:'80',wss:'443'};URI.invalid_hostname_characters=/[^a-zA-Z0-9\.-]/;URI.domAttributes={'a':'href','blockquote':'cite','link':'href','base':'href','script':'src','form':'action','img':'src','area':'href','iframe':'src','embed':'src','source':'src','track':'src','input':'src','audio':'src','video':'src'};URI.getDomAttribute=function(node){if(!node||!node.nodeName){return undefined;}
var nodeName=node.nodeName.toLowerCase();if(nodeName==='input'&&node.type!=='image'){return undefined;}
return URI.domAttributes[nodeName];};function escapeForDumbFirefox36(value){return escape(value);}
function strictEncodeURIComponent(string){return encodeURIComponent(string).replace(/[!'()*]/g,escapeForDumbFirefox36).replace(/\*/g,'%2A');}
function _isIriCodePoint(point){return(point===0x00002d||point===0x0002E||point===0x00005F||point===0x0007E||(point>=0x000030&&point<0x000040)||(point>=0x000041&&point<0x00005B)||(point>=0x000061&&point<0x00007B)||(point>=0x0000A0&&point<0x00D800)||(point>=0x00E000&&point<0x00F8FF)||(point>=0x00F900&&point<0x00FDD0)||(point>=0x00FDF0&&point<0x00FFF0)||(point>=0x010000&&point<0x01FFFE)||(point>=0x020000&&point<0x02FFFE)||(point>=0x030000&&point<0x03FFFE)||(point>=0x040000&&point<0x04FFFE)||(point>=0x050000&&point<0x05FFFE)||(point>=0x060000&&point<0x06FFFE)||(point>=0x070000&&point<0x07FFFE)||(point>=0x080000&&point<0x08FFFE)||(point>=0x090000&&point<0x09FFFE)||(point>=0x0A0000&&point<0x0AFFFE)||(point>=0x0B0000&&point<0x0BFFFE)||(point>=0x0C0000&&point<0x0CFFFE)||(point>=0x0D0000&&point<0x0DFFFE)||(point>=0x0E0000&&point<0x0EFFFE)||(point>=0x0F0000&&point<0x0FFFFE)||(point>=0x100000&&point<0x10FFFE));}
function encodeIRIComponent(string){var inputCodePoints=punycode.ucs2.decode(string);var output='';for(var i=0;i<inputCodePoints.length;i++){var codePoint=inputCodePoints[i];if(_isIriCodePoint(codePoint)){output+=punycode.ucs2.encode([codePoint]);}else{var asString=punycode.ucs2.encode([codePoint]);output+=strictEncodeURIComponent(asString);}}
return output;}
function recodeIRIHostname(string){if(URI.punycode_expression.test(string))
{string=punycode.toUnicode(string);}
return encodeIRIComponent(string);}
URI._defaultRecodeHostname=punycode?punycode.toASCII:function(string){return string;};URI.iso8859=function(){URI.recodeHostname=URI._defaultRecodeHostname;URI.encode=escape;URI.decode=unescape;};URI.unicode=function(){URI.recodeHostname=URI._defaultRecodeHostname;URI.encode=strictEncodeURIComponent;URI.decode=decodeURIComponent;};URI.iri=function(){URI.recodeHostname=recodeIRIHostname;URI.encode=encodeIRIComponent;URI.decode=decodeURIComponent;};URI.unicode();URI.characters={pathname:{encode:{expression:/%(24|26|2B|2C|3B|3D|3A|40)/ig,map:{'%24':'$','%26':'&','%2B':'+','%2C':',','%3B':';','%3D':'=','%3A':':','%40':'@'}},decode:{expression:/[\/\?#]/g,map:{'/':'%2F','?':'%3F','#':'%23'}}},reserved:{encode:{expression:/%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,map:{'%3A':':','%2F':'/','%3F':'?','%23':'#','%5B':'[','%5D':']','%40':'@','%21':'!','%24':'$','%26':'&','%27':'\'','%28':'(','%29':')','%2A':'*','%2B':'+','%2C':',','%3B':';','%3D':'='}}},urnpath:{encode:{expression:/%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/ig,map:{'%21':'!','%24':'$','%27':'\'','%28':'(','%29':')','%2A':'*','%2B':'+','%2C':',','%3B':';','%3D':'=','%40':'@'}},decode:{expression:/[\/\?#:]/g,map:{'/':'%2F','?':'%3F','#':'%23',':':'%3A'}}}};URI.encodeQuery=function(string,escapeQuerySpace){var escaped=URI.encode(string+'');if(escapeQuerySpace===undefined){escapeQuerySpace=URI.escapeQuerySpace;}
return escapeQuerySpace?escaped.replace(/%20/g,'+'):escaped;};URI.decodeQuery=function(string,escapeQuerySpace){string+='';if(escapeQuerySpace===undefined){escapeQuerySpace=URI.escapeQuerySpace;}
try{return URI.decode(escapeQuerySpace?string.replace(/\+/g,'%20'):string);}catch(e){return string;}};var _parts={'encode':'encode','decode':'decode'};var _part;var generateAccessor=function(_group,_part){return function(string){try{return URI[_part](string+'').replace(URI.characters[_group][_part].expression,function(c){return URI.characters[_group][_part].map[c];});}catch(e){return string;}};};for(_part in _parts){URI[_part+'PathSegment']=generateAccessor('pathname',_parts[_part]);URI[_part+'UrnPathSegment']=generateAccessor('urnpath',_parts[_part]);}
var generateSegmentedPathFunction=function(_sep,_codingFuncName,_innerCodingFuncName){return function(string){var actualCodingFunc;if(!_innerCodingFuncName){actualCodingFunc=URI[_codingFuncName];}else{actualCodingFunc=function(string){return URI[_codingFuncName](URI[_innerCodingFuncName](string));};}
var segments=(string+'').split(_sep);for(var i=0,length=segments.length;i<length;i++){segments[i]=actualCodingFunc(segments[i]);}
return segments.join(_sep);};};URI.decodePath=generateSegmentedPathFunction('/','decodePathSegment');URI.decodeUrnPath=generateSegmentedPathFunction(':','decodeUrnPathSegment');URI.recodePath=generateSegmentedPathFunction('/','encodePathSegment','decode');URI.recodeUrnPath=generateSegmentedPathFunction(':','encodeUrnPathSegment','decode');URI.encodeReserved=generateAccessor('reserved','encode');URI.parse=function(string,parts){var pos;if(!parts){parts={};}
pos=string.indexOf('#');if(pos>-1){parts.fragment=string.substring(pos+1)||null;string=string.substring(0,pos);}
pos=string.indexOf('?');if(pos>-1){parts.query=string.substring(pos+1)||null;string=string.substring(0,pos);}
if(string.substring(0,2)==='//'){parts.protocol=null;string=string.substring(2);string=URI.parseAuthority(string,parts);}else{pos=string.indexOf(':');if(pos>-1){parts.protocol=string.substring(0,pos)||null;if(parts.protocol&&!parts.protocol.match(URI.protocol_expression)){parts.protocol=undefined;}else if(string.substring(pos+1,pos+3)==='//'){string=string.substring(pos+3);string=URI.parseAuthority(string,parts);}else{string=string.substring(pos+1);parts.urn=true;}}}
parts.path=string;return parts;};URI.parseHost=function(string,parts){var pos=string.indexOf('/');var bracketPos;var t;if(pos===-1){pos=string.length;}
if(string.charAt(0)==='['){bracketPos=string.indexOf(']');parts.hostname=string.substring(1,bracketPos)||null;parts.port=string.substring(bracketPos+2,pos)||null;if(parts.port==='/'){parts.port=null;}}else{var firstColon=string.indexOf(':');var firstSlash=string.indexOf('/');var nextColon=string.indexOf(':',firstColon+1);if(nextColon!==-1&&(firstSlash===-1||nextColon<firstSlash)){parts.hostname=string.substring(0,pos)||null;parts.port=null;}else{t=string.substring(0,pos).split(':');parts.hostname=t[0]||null;parts.port=t[1]||null;}}
if(parts.hostname&&string.substring(pos).charAt(0)!=='/'){pos++;string='/'+string;}
return string.substring(pos)||'/';};URI.parseAuthority=function(string,parts){string=URI.parseUserinfo(string,parts);return URI.parseHost(string,parts);};URI.parseUserinfo=function(string,parts){var firstSlash=string.indexOf('/');var pos=string.lastIndexOf('@',firstSlash>-1?firstSlash:string.length-1);var t;if(pos>-1&&(firstSlash===-1||pos<firstSlash)){t=string.substring(0,pos).split(':');parts.username=t[0]?URI.decode(t[0]):null;t.shift();parts.password=t[0]?URI.decode(t.join(':')):null;string=string.substring(pos+1);}else{parts.username=null;parts.password=null;}
return string;};URI.parseQuery=function(string,escapeQuerySpace){if(!string){return{};}
string=string.replace(/&+/g,'&').replace(/^\?*&*|&+$/g,'');if(!string){return{};}
var items={};var splits=string.split('&');var length=splits.length;var v,name,value;for(var i=0;i<length;i++){v=splits[i].split('=');name=URI.decodeQuery(v.shift(),escapeQuerySpace);value=v.length?URI.decodeQuery(v.join('='),escapeQuerySpace):null;if(hasOwn.call(items,name)){if(typeof items[name]==='string'){items[name]=[items[name]];}
items[name].push(value);}else{items[name]=value;}}
return items;};URI.build=function(parts){var t='';if(parts.protocol){t+=parts.protocol+':';}
if(!parts.urn&&(t||parts.hostname)){t+='//';}
t+=(URI.buildAuthority(parts)||'');if(typeof parts.path==='string'){if(parts.path.charAt(0)!=='/'&&typeof parts.hostname==='string'){t+='/';}
t+=parts.path;}
if(typeof parts.query==='string'&&parts.query){t+='?'+parts.query;}
if(typeof parts.fragment==='string'&&parts.fragment){t+='#'+parts.fragment;}
return t;};URI.buildHost=function(parts){var t='';if(!parts.hostname){return'';}else if(URI.ip6_expression.test(parts.hostname)){t+='['+parts.hostname+']';}else{t+=parts.hostname;}
if(parts.port){t+=':'+parts.port;}
return t;};URI.buildAuthority=function(parts){return URI.buildUserinfo(parts)+URI.buildHost(parts);};URI.buildUserinfo=function(parts){var t='';if(parts.username){t+=URI.encode(parts.username);if(parts.password){t+=':'+URI.encode(parts.password);}
t+='@';}
return t;};URI.buildQuery=function(data,duplicateQueryParameters,escapeQuerySpace){var t='';var unique,key,i,length;for(key in data){if(hasOwn.call(data,key)&&key){if(isArray(data[key])){unique={};for(i=0,length=data[key].length;i<length;i++){if(data[key][i]!==undefined&&unique[data[key][i]+'']===undefined){t+='&'+URI.buildQueryParameter(key,data[key][i],escapeQuerySpace);if(duplicateQueryParameters!==true){unique[data[key][i]+'']=true;}}}}else if(data[key]!==undefined){t+='&'+URI.buildQueryParameter(key,data[key],escapeQuerySpace);}}}
return t.substring(1);};URI.buildQueryParameter=function(name,value,escapeQuerySpace){return URI.encodeQuery(name,escapeQuerySpace)+(value!==null?'='+URI.encodeQuery(value,escapeQuerySpace):'');};URI.addQuery=function(data,name,value){if(typeof name==='object'){for(var key in name){if(hasOwn.call(name,key)){URI.addQuery(data,key,name[key]);}}}else if(typeof name==='string'){if(data[name]===undefined){data[name]=value;return;}else if(typeof data[name]==='string'){data[name]=[data[name]];}
if(!isArray(value)){value=[value];}
data[name]=(data[name]||[]).concat(value);}else{throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');}};URI.removeQuery=function(data,name,value){var i,length,key;if(isArray(name)){for(i=0,length=name.length;i<length;i++){data[name[i]]=undefined;}}else if(typeof name==='object'){for(key in name){if(hasOwn.call(name,key)){URI.removeQuery(data,key,name[key]);}}}else if(typeof name==='string'){if(value!==undefined){if(data[name]===value){data[name]=undefined;}else if(isArray(data[name])){data[name]=filterArrayValues(data[name],value);}}else{data[name]=undefined;}}else{throw new TypeError('URI.removeQuery() accepts an object, string as the first parameter');}};URI.hasQuery=function(data,name,value,withinArray){if(typeof name==='object'){for(var key in name){if(hasOwn.call(name,key)){if(!URI.hasQuery(data,key,name[key])){return false;}}}
return true;}else if(typeof name!=='string'){throw new TypeError('URI.hasQuery() accepts an object, string as the name parameter');}
switch(getType(value)){case'Undefined':return name in data;case'Boolean':var _booly=Boolean(isArray(data[name])?data[name].length:data[name]);return value===_booly;case'Function':return!!value(data[name],name,data);case'Array':if(!isArray(data[name])){return false;}
var op=withinArray?arrayContains:arraysEqual;return op(data[name],value);case'RegExp':if(!isArray(data[name])){return Boolean(data[name]&&data[name].match(value));}
if(!withinArray){return false;}
return arrayContains(data[name],value);case'Number':value=String(value);case'String':if(!isArray(data[name])){return data[name]===value;}
if(!withinArray){return false;}
return arrayContains(data[name],value);default:throw new TypeError('URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter');}};URI.commonPath=function(one,two){var length=Math.min(one.length,two.length);var pos;for(pos=0;pos<length;pos++){if(one.charAt(pos)!==two.charAt(pos)){pos--;break;}}
if(pos<1){return one.charAt(0)===two.charAt(0)&&one.charAt(0)==='/'?'/':'';}
if(one.charAt(pos)!=='/'||two.charAt(pos)!=='/'){pos=one.substring(0,pos).lastIndexOf('/');}
return one.substring(0,pos+1);};URI.withinString=function(string,callback,options){options||(options={});var _start=options.start||URI.findUri.start;var _end=options.end||URI.findUri.end;var _trim=options.trim||URI.findUri.trim;var _attributeOpen=/[a-z0-9-]=["']?$/i;_start.lastIndex=0;while(true){var match=_start.exec(string);if(!match){break;}
var start=match.index;if(options.ignoreHtml){var attributeOpen=string.slice(Math.max(start-3,0),start);if(attributeOpen&&_attributeOpen.test(attributeOpen)){continue;}}
var end=start+string.slice(start).search(_end);var slice=string.slice(start,end).replace(_trim,'');if(options.ignore&&options.ignore.test(slice)){continue;}
end=start+slice.length;var result=callback(slice,start,end,string);string=string.slice(0,start)+result+string.slice(end);_start.lastIndex=start+result.length;}
_start.lastIndex=0;return string;};URI.ensureValidHostname=function(v){if(v.match(URI.invalid_hostname_characters)){if(!punycode){throw new TypeError('Hostname "'+v+'" contains characters other than [A-Z0-9.-] and Punycode.js is not available');}
if(punycode.toASCII(v).match(URI.invalid_hostname_characters)){throw new TypeError('Hostname "'+v+'" contains characters other than [A-Z0-9.-]');}}};URI.noConflict=function(removeAll){if(removeAll){var unconflicted={URI:this.noConflict()};if(root.URITemplate&&typeof root.URITemplate.noConflict==='function'){unconflicted.URITemplate=root.URITemplate.noConflict();}
if(root.IPv6&&typeof root.IPv6.noConflict==='function'){unconflicted.IPv6=root.IPv6.noConflict();}
if(root.SecondLevelDomains&&typeof root.SecondLevelDomains.noConflict==='function'){unconflicted.SecondLevelDomains=root.SecondLevelDomains.noConflict();}
return unconflicted;}else if(root.URI===this){root.URI=_URI;}
return this;};p.build=function(deferBuild){if(deferBuild===true){this._deferred_build=true;}else if(deferBuild===undefined||this._deferred_build){this._string=URI.build(this._parts);this._deferred_build=false;}
return this;};p.clone=function(){return new URI(this);};p.valueOf=p.toString=function(){return this.build(false)._string;};function generateSimpleAccessor(_part){return function(v,build){if(v===undefined){return this._parts[_part]||'';}else{this._parts[_part]=v||null;this.build(!build);return this;}};}
function generatePrefixAccessor(_part,_key){return function(v,build){if(v===undefined){return this._parts[_part]||'';}else{if(v!==null){v=v+'';if(v.charAt(0)===_key){v=v.substring(1);}}
this._parts[_part]=v;this.build(!build);return this;}};}
p.protocol=generateSimpleAccessor('protocol');p.username=generateSimpleAccessor('username');p.password=generateSimpleAccessor('password');p.hostname=generateSimpleAccessor('hostname');p.port=generateSimpleAccessor('port');p.query=generatePrefixAccessor('query','?');p.fragment=generatePrefixAccessor('fragment','#');p.search=function(v,build){var t=this.query(v,build);return typeof t==='string'&&t.length?('?'+t):t;};p.hash=function(v,build){var t=this.fragment(v,build);return typeof t==='string'&&t.length?('#'+t):t;};p.pathname=function(v,build){if(v===undefined||v===true){var res=this._parts.path||(this._parts.hostname?'/':'');return v?(this._parts.urn?URI.decodeUrnPath:URI.decodePath)(res):res;}else{if(this._parts.urn){this._parts.path=v?URI.recodeUrnPath(v):'';}else{this._parts.path=v?URI.recodePath(v):'/';}
this.build(!build);return this;}};p.path=p.pathname;p.href=function(href,build){var key;if(href===undefined){return this.toString();}
this._string='';this._parts=URI._parts();var _URI=href instanceof URI;var _object=typeof href==='object'&&(href.hostname||href.path||href.pathname);if(href.nodeName){var attribute=URI.getDomAttribute(href);href=href[attribute]||'';_object=false;}
if(!_URI&&_object&&href.pathname!==undefined){href=href.toString();}
if(typeof href==='string'||href instanceof String){this._parts=URI.parse(String(href),this._parts);}else if(_URI||_object){var src=_URI?href._parts:href;for(key in src){if(hasOwn.call(this._parts,key)){this._parts[key]=src[key];}}}else{throw new TypeError('invalid input');}
this.build(!build);return this;};p.is=function(what){var ip=false;var ip4=false;var ip6=false;var name=false;var sld=false;var idn=false;var punycode=false;var relative=!this._parts.urn;if(this._parts.hostname){relative=false;ip4=URI.ip4_expression.test(this._parts.hostname);ip6=URI.ip6_expression.test(this._parts.hostname);ip=ip4||ip6;name=!ip;sld=name&&SLD&&SLD.has(this._parts.hostname);idn=name&&URI.idn_expression.test(this._parts.hostname);punycode=name&&URI.punycode_expression.test(this._parts.hostname);}
switch(what.toLowerCase()){case'relative':return relative;case'absolute':return!relative;case'domain':case'name':return name;case'sld':return sld;case'ip':return ip;case'ip4':case'ipv4':case'inet4':return ip4;case'ip6':case'ipv6':case'inet6':return ip6;case'idn':return idn;case'url':return!this._parts.urn;case'urn':return!!this._parts.urn;case'punycode':return punycode;}
return null;};var _protocol=p.protocol;var _port=p.port;var _hostname=p.hostname;p.protocol=function(v,build){if(v!==undefined){if(v){v=v.replace(/:(\/\/)?$/,'');if(!v.match(URI.protocol_expression)){throw new TypeError('Protocol "'+v+'" contains characters other than [A-Z0-9.+-] or doesn\'t start with [A-Z]');}}}
return _protocol.call(this,v,build);};p.scheme=p.protocol;p.port=function(v,build){if(this._parts.urn){return v===undefined?'':this;}
if(v!==undefined){if(v===0){v=null;}
if(v){v+='';if(v.charAt(0)===':'){v=v.substring(1);}
if(v.match(/[^0-9]/)){throw new TypeError('Port "'+v+'" contains characters other than [0-9]');}}}
return _port.call(this,v,build);};p.hostname=function(v,build){if(this._parts.urn){return v===undefined?'':this;}
if(v!==undefined){var x={};URI.parseHost(v,x);v=x.hostname;}
return _hostname.call(this,v,build);};p.host=function(v,build){if(this._parts.urn){return v===undefined?'':this;}
if(v===undefined){return this._parts.hostname?URI.buildHost(this._parts):'';}else{URI.parseHost(v,this._parts);this.build(!build);return this;}};p.authority=function(v,build){if(this._parts.urn){return v===undefined?'':this;}
if(v===undefined){return this._parts.hostname?URI.buildAuthority(this._parts):'';}else{URI.parseAuthority(v,this._parts);this.build(!build);return this;}};p.userinfo=function(v,build){if(this._parts.urn){return v===undefined?'':this;}
if(v===undefined){if(!this._parts.username){return'';}
var t=URI.buildUserinfo(this._parts);return t.substring(0,t.length-1);}else{if(v[v.length-1]!=='@'){v+='@';}
URI.parseUserinfo(v,this._parts);this.build(!build);return this;}};p.resource=function(v,build){var parts;if(v===undefined){return this.path()+this.search()+this.hash();}
parts=URI.parse(v);this._parts.path=parts.path;this._parts.query=parts.query;this._parts.fragment=parts.fragment;this.build(!build);return this;};p.subdomain=function(v,build){if(this._parts.urn){return v===undefined?'':this;}
if(v===undefined){if(!this._parts.hostname||this.is('IP')){return'';}
var end=this._parts.hostname.length-this.domain().length-1;return this._parts.hostname.substring(0,end)||'';}else{var e=this._parts.hostname.length-this.domain().length;var sub=this._parts.hostname.substring(0,e);var replace=new RegExp('^'+escapeRegEx(sub));if(v&&v.charAt(v.length-1)!=='.'){v+='.';}
if(v){URI.ensureValidHostname(v);}
this._parts.hostname=this._parts.hostname.replace(replace,v);this.build(!build);return this;}};p.domain=function(v,build){if(this._parts.urn){return v===undefined?'':this;}
if(typeof v==='boolean'){build=v;v=undefined;}
if(v===undefined){if(!this._parts.hostname||this.is('IP')){return'';}
var t=this._parts.hostname.match(/\./g);if(t&&t.length<2){return this._parts.hostname;}
var end=this._parts.hostname.length-this.tld(build).length-1;end=this._parts.hostname.lastIndexOf('.',end-1)+1;return this._parts.hostname.substring(end)||'';}else{if(!v){throw new TypeError('cannot set domain empty');}
URI.ensureValidHostname(v);if(!this._parts.hostname||this.is('IP')){this._parts.hostname=v;}else{var replace=new RegExp(escapeRegEx(this.domain())+'$');this._parts.hostname=this._parts.hostname.replace(replace,v);}
this.build(!build);return this;}};p.tld=function(v,build){if(this._parts.urn){return v===undefined?'':this;}
if(typeof v==='boolean'){build=v;v=undefined;}
if(v===undefined){if(!this._parts.hostname||this.is('IP')){return'';}
var pos=this._parts.hostname.lastIndexOf('.');var tld=this._parts.hostname.substring(pos+1);if(build!==true&&SLD&&SLD.list[tld.toLowerCase()]){return SLD.get(this._parts.hostname)||tld;}
return tld;}else{var replace;if(!v){throw new TypeError('cannot set TLD empty');}else if(v.match(/[^a-zA-Z0-9-]/)){if(SLD&&SLD.is(v)){replace=new RegExp(escapeRegEx(this.tld())+'$');this._parts.hostname=this._parts.hostname.replace(replace,v);}else{throw new TypeError('TLD "'+v+'" contains characters other than [A-Z0-9]');}}else if(!this._parts.hostname||this.is('IP')){throw new ReferenceError('cannot set TLD on non-domain host');}else{replace=new RegExp(escapeRegEx(this.tld())+'$');this._parts.hostname=this._parts.hostname.replace(replace,v);}
this.build(!build);return this;}};p.directory=function(v,build){if(this._parts.urn){return v===undefined?'':this;}
if(v===undefined||v===true){if(!this._parts.path&&!this._parts.hostname){return'';}
if(this._parts.path==='/'){return'/';}
var end=this._parts.path.length-this.filename().length-1;var res=this._parts.path.substring(0,end)||(this._parts.hostname?'/':'');return v?URI.decodePath(res):res;}else{var e=this._parts.path.length-this.filename().length;var directory=this._parts.path.substring(0,e);var replace=new RegExp('^'+escapeRegEx(directory));if(!this.is('relative')){if(!v){v='/';}
if(v.charAt(0)!=='/'){v='/'+v;}}
if(v&&v.charAt(v.length-1)!=='/'){v+='/';}
v=URI.recodePath(v);this._parts.path=this._parts.path.replace(replace,v);this.build(!build);return this;}};p.filename=function(v,build){if(this._parts.urn){return v===undefined?'':this;}
if(v===undefined||v===true){if(!this._parts.path||this._parts.path==='/'){return'';}
var pos=this._parts.path.lastIndexOf('/');var res=this._parts.path.substring(pos+1);return v?URI.decodePathSegment(res):res;}else{var mutatedDirectory=false;if(v.charAt(0)==='/'){v=v.substring(1);}
if(v.match(/\.?\//)){mutatedDirectory=true;}
var replace=new RegExp(escapeRegEx(this.filename())+'$');v=URI.recodePath(v);this._parts.path=this._parts.path.replace(replace,v);if(mutatedDirectory){this.normalizePath(build);}else{this.build(!build);}
return this;}};p.suffix=function(v,build){if(this._parts.urn){return v===undefined?'':this;}
if(v===undefined||v===true){if(!this._parts.path||this._parts.path==='/'){return'';}
var filename=this.filename();var pos=filename.lastIndexOf('.');var s,res;if(pos===-1){return'';}
s=filename.substring(pos+1);res=(/^[a-z0-9%]+$/i).test(s)?s:'';return v?URI.decodePathSegment(res):res;}else{if(v.charAt(0)==='.'){v=v.substring(1);}
var suffix=this.suffix();var replace;if(!suffix){if(!v){return this;}
this._parts.path+='.'+URI.recodePath(v);}else if(!v){replace=new RegExp(escapeRegEx('.'+suffix)+'$');}else{replace=new RegExp(escapeRegEx(suffix)+'$');}
if(replace){v=URI.recodePath(v);this._parts.path=this._parts.path.replace(replace,v);}
this.build(!build);return this;}};p.segment=function(segment,v,build){var separator=this._parts.urn?':':'/';var path=this.path();var absolute=path.substring(0,1)==='/';var segments=path.split(separator);if(segment!==undefined&&typeof segment!=='number'){build=v;v=segment;segment=undefined;}
if(segment!==undefined&&typeof segment!=='number'){throw new Error('Bad segment "'+segment+'", must be 0-based integer');}
if(absolute){segments.shift();}
if(segment<0){segment=Math.max(segments.length+segment,0);}
if(v===undefined){return segment===undefined?segments:segments[segment];}else if(segment===null||segments[segment]===undefined){if(isArray(v)){segments=[];for(var i=0,l=v.length;i<l;i++){if(!v[i].length&&(!segments.length||!segments[segments.length-1].length)){continue;}
if(segments.length&&!segments[segments.length-1].length){segments.pop();}
segments.push(v[i]);}}else if(v||typeof v==='string'){if(segments[segments.length-1]===''){segments[segments.length-1]=v;}else{segments.push(v);}}}else{if(v){segments[segment]=v;}else{segments.splice(segment,1);}}
if(absolute){segments.unshift('');}
return this.path(segments.join(separator),build);};p.segmentCoded=function(segment,v,build){var segments,i,l;if(typeof segment!=='number'){build=v;v=segment;segment=undefined;}
if(v===undefined){segments=this.segment(segment,v,build);if(!isArray(segments)){segments=segments!==undefined?URI.decode(segments):undefined;}else{for(i=0,l=segments.length;i<l;i++){segments[i]=URI.decode(segments[i]);}}
return segments;}
if(!isArray(v)){v=(typeof v==='string'||v instanceof String)?URI.encode(v):v;}else{for(i=0,l=v.length;i<l;i++){v[i]=URI.decode(v[i]);}}
return this.segment(segment,v,build);};var q=p.query;p.query=function(v,build){if(v===true){return URI.parseQuery(this._parts.query,this._parts.escapeQuerySpace);}else if(typeof v==='function'){var data=URI.parseQuery(this._parts.query,this._parts.escapeQuerySpace);var result=v.call(this,data);this._parts.query=URI.buildQuery(result||data,this._parts.duplicateQueryParameters,this._parts.escapeQuerySpace);this.build(!build);return this;}else if(v!==undefined&&typeof v!=='string'){this._parts.query=URI.buildQuery(v,this._parts.duplicateQueryParameters,this._parts.escapeQuerySpace);this.build(!build);return this;}else{return q.call(this,v,build);}};p.setQuery=function(name,value,build){var data=URI.parseQuery(this._parts.query,this._parts.escapeQuerySpace);if(typeof name==='string'||name instanceof String){data[name]=value!==undefined?value:null;}else if(typeof name==='object'){for(var key in name){if(hasOwn.call(name,key)){data[key]=name[key];}}}else{throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');}
this._parts.query=URI.buildQuery(data,this._parts.duplicateQueryParameters,this._parts.escapeQuerySpace);if(typeof name!=='string'){build=value;}
this.build(!build);return this;};p.addQuery=function(name,value,build){var data=URI.parseQuery(this._parts.query,this._parts.escapeQuerySpace);URI.addQuery(data,name,value===undefined?null:value);this._parts.query=URI.buildQuery(data,this._parts.duplicateQueryParameters,this._parts.escapeQuerySpace);if(typeof name!=='string'){build=value;}
this.build(!build);return this;};p.removeQuery=function(name,value,build){var data=URI.parseQuery(this._parts.query,this._parts.escapeQuerySpace);URI.removeQuery(data,name,value);this._parts.query=URI.buildQuery(data,this._parts.duplicateQueryParameters,this._parts.escapeQuerySpace);if(typeof name!=='string'){build=value;}
this.build(!build);return this;};p.hasQuery=function(name,value,withinArray){var data=URI.parseQuery(this._parts.query,this._parts.escapeQuerySpace);return URI.hasQuery(data,name,value,withinArray);};p.setSearch=p.setQuery;p.addSearch=p.addQuery;p.removeSearch=p.removeQuery;p.hasSearch=p.hasQuery;p.normalize=function(){if(this._parts.urn){return this.normalizeProtocol(false).normalizePath(false).normalizeQuery(false).normalizeFragment(false).build();}
return this.normalizeProtocol(false).normalizeHostname(false).normalizePort(false).normalizePath(false).normalizeQuery(false).normalizeFragment(false).build();};p.normalizeProtocol=function(build){if(typeof this._parts.protocol==='string'){this._parts.protocol=this._parts.protocol.toLowerCase();this.build(!build);}
return this;};p.normalizeHostname=function(build){if(this._parts.hostname){if(this.is('IDN')||this.is('punycode')){this._parts.hostname=URI.recodeHostname(this._parts.hostname);}else if(this.is('IPv6')&&IPv6){this._parts.hostname=IPv6.best(this._parts.hostname);}
this._parts.hostname=this._parts.hostname.toLowerCase();this.build(!build);}
return this;};p.normalizePort=function(build){if(typeof this._parts.protocol==='string'&&this._parts.port===URI.defaultPorts[this._parts.protocol]){this._parts.port=null;this.build(!build);}
return this;};p.normalizePath=function(build){var _path=this._parts.path;if(!_path){return this;}
if(this._parts.urn){this._parts.path=URI.recodeUrnPath(this._parts.path);this.build(!build);return this;}
if(this._parts.path==='/'){return this;}
var _was_relative;var _leadingParents='';var _parent,_pos;if(_path.charAt(0)!=='/'){_was_relative=true;_path='/'+_path;}
_path=_path.replace(/(\/(\.\/)+)|(\/\.$)/g,'/').replace(/\/{2,}/g,'/');if(_was_relative){_leadingParents=_path.substring(1).match(/^(\.\.\/)+/)||'';if(_leadingParents){_leadingParents=_leadingParents[0];}}
while(true){_parent=_path.indexOf('/..');if(_parent===-1){break;}else if(_parent===0){_path=_path.substring(3);continue;}
_pos=_path.substring(0,_parent).lastIndexOf('/');if(_pos===-1){_pos=_parent;}
_path=_path.substring(0,_pos)+_path.substring(_parent+3);}
if(_was_relative&&this.is('relative')){_path=_leadingParents+_path.substring(1);}
_path=URI.recodePath(_path);this._parts.path=_path;this.build(!build);return this;};p.normalizePathname=p.normalizePath;p.normalizeQuery=function(build){if(typeof this._parts.query==='string'){if(!this._parts.query.length){this._parts.query=null;}else{this.query(URI.parseQuery(this._parts.query,this._parts.escapeQuerySpace));}
this.build(!build);}
return this;};p.normalizeFragment=function(build){if(!this._parts.fragment){this._parts.fragment=null;this.build(!build);}
return this;};p.normalizeSearch=p.normalizeQuery;p.normalizeHash=p.normalizeFragment;function _generateNormalizer(hostnameRecoder,encoder,decoder){return function(){var r=URI.recodeHostname
var e=URI.encode;var d=URI.decode;URI.encode=encoder;URI.decode=decoder;try{this.normalize();}finally{URI.recodeHostname=r;URI.encode=e;URI.decode=d;}
return this;};}
p.iso8859=_generateNormalizer(URI._defaultRecodeHostname,escape,decodeURIComponent);p.unicode=_generateNormalizer(URI._defaultRecodeHostname,strictEncodeURIComponent,unescape);p.iri=_generateNormalizer(recodeIRIHostname,encodeIRIComponent,decodeURIComponent);p.readable=function(){var uri=this.clone();uri.username('').password('').normalize();var t='';if(uri._parts.protocol){t+=uri._parts.protocol+(uri._parts.urn?':':'://');}
if(uri._parts.hostname){if(uri.is('punycode')&&punycode){t+=punycode.toUnicode(uri._parts.hostname);if(uri._parts.port){t+=':'+uri._parts.port;}}else{t+=uri.host();}}
if(uri._parts.hostname&&uri._parts.path&&uri._parts.path.charAt(0)!=='/'){t+='/';}
t+=uri.path(true);if(uri._parts.query){var q='';for(var i=0,qp=uri._parts.query.split('&'),l=qp.length;i<l;i++){var kv=(qp[i]||'').split('=');q+='&'+URI.decodeQuery(kv[0],this._parts.escapeQuerySpace).replace(/&/g,'%26');if(kv[1]!==undefined){q+='='+URI.decodeQuery(kv[1],this._parts.escapeQuerySpace).replace(/&/g,'%26');}}
t+='?'+q.substring(1);}
t+=URI.decodeQuery(uri.hash(),true);return t;};p.absoluteTo=function(base){var resolved=this.clone();var properties=['protocol','username','password','hostname','port'];var basedir,i,p;if(this._parts.urn){throw new Error('URNs do not have any generally defined hierarchical components');}
if(!(base instanceof URI)){base=new URI(base);}
if(!resolved._parts.protocol){resolved._parts.protocol=base._parts.protocol;}
if(this._parts.hostname){return resolved;}
for(i=0;(p=properties[i]);i++){resolved._parts[p]=base._parts[p];}
if(!resolved._parts.path){resolved._parts.path=base._parts.path;if(!resolved._parts.query){resolved._parts.query=base._parts.query;}}else if(resolved._parts.path.substring(-2)==='..'){resolved._parts.path+='/';}
if(resolved.path().charAt(0)!=='/'){basedir=base.directory();resolved._parts.path=(basedir?(basedir+'/'):'')+resolved._parts.path;resolved.normalizePath();}
resolved.build();return resolved;};p.relativeTo=function(base){var relative=this.clone().normalize();var relativeParts,baseParts,common,relativePath,basePath;if(relative._parts.urn){throw new Error('URNs do not have any generally defined hierarchical components');}
base=new URI(base).normalize();relativeParts=relative._parts;baseParts=base._parts;relativePath=relative.path();basePath=base.path();if(relativePath.charAt(0)!=='/'){throw new Error('URI is already relative');}
if(basePath.charAt(0)!=='/'){throw new Error('Cannot calculate a URI relative to another relative URI');}
if(relativeParts.protocol===baseParts.protocol){relativeParts.protocol=null;}
if(relativeParts.username!==baseParts.username||relativeParts.password!==baseParts.password){return relative.build();}
if(relativeParts.protocol!==null||relativeParts.username!==null||relativeParts.password!==null){return relative.build();}
if(relativeParts.hostname===baseParts.hostname&&relativeParts.port===baseParts.port){relativeParts.hostname=null;relativeParts.port=null;}else{return relative.build();}
if(relativePath===basePath){relativeParts.path='';return relative.build();}
common=URI.commonPath(relative.path(),base.path());if(!common){return relative.build();}
var parents=baseParts.path.substring(common.length).replace(/[^\/]*$/,'').replace(/.*?\//g,'../');relativeParts.path=parents+relativeParts.path.substring(common.length);return relative.build();};p.equals=function(uri){var one=this.clone();var two=new URI(uri);var one_map={};var two_map={};var checked={};var one_query,two_query,key;one.normalize();two.normalize();if(one.toString()===two.toString()){return true;}
one_query=one.query();two_query=two.query();one.query('');two.query('');if(one.toString()!==two.toString()){return false;}
if(one_query.length!==two_query.length){return false;}
one_map=URI.parseQuery(one_query,this._parts.escapeQuerySpace);two_map=URI.parseQuery(two_query,this._parts.escapeQuerySpace);for(key in one_map){if(hasOwn.call(one_map,key)){if(!isArray(one_map[key])){if(one_map[key]!==two_map[key]){return false;}}else if(!arraysEqual(one_map[key],two_map[key])){return false;}
checked[key]=true;}}
for(key in two_map){if(hasOwn.call(two_map,key)){if(!checked[key]){return false;}}}
return true;};p.duplicateQueryParameters=function(v){this._parts.duplicateQueryParameters=!!v;return this;};p.escapeQuerySpace=function(v){this._parts.escapeQuerySpace=!!v;return this;};return URI;}));var TC_COURSE_ID,TC_COURSE_NAME,TC_COURSE_DESC,TC_RECORD_STORES;var TCAPI_STATUS="",TCAPI_STATUS_CHANGED=false,TCAPI_SCORE={},TCAPI_COMPLETION_STATUS="",TCAPI_SATISFACTION_STATUS=null,TCAPI_UPDATES_PENDING=false,TCAPI_IN_PROGRESS=false,TCAPI_NO_ERROR="",TCAPI_VERB_COMPLETED="completed",TCAPI_VERB_EXPERIENCED="experienced",TCAPI_VERB_ATTEMPTED="attempted",TCAPI_VERB_ANSWERED="answered",TCAPI_VERB_PASSED="passed",TCAPI_VERB_FAILED="failed",TCAPI_INIT_VERB=TCAPI_VERB_ATTEMPTED,TCAPI_INTERACTION="http://adlnet.gov/expapi/activities/cmi.interaction",TCAPI_INTERACTION_TYPE_TRUE_FALSE="true-false",TCAPI_INTERACTION_TYPE_CHOICE="choice",TCAPI_INTERACTION_TYPE_FILL_IN="fill-in",TCAPI_INTERACTION_TYPE_MATCHING="matching",TCAPI_INTERACTION_TYPE_PERFORMANCE="performance",TCAPI_INTERACTION_TYPE_SEQUENCING="sequencing",TCAPI_INTERACTION_TYPE_LIKERT="likert",TCAPI_INTERACTION_TYPE_NUMERIC="numeric",TCAPI_STATE_BOOKMARK="bookmark",TCAPI_STATE_TOTAL_TIME="cumulative_time",TCAPI_STATE_SUSPEND_DATA="suspend_data",TCAPI_ERROR_INVALID_PREFERENCE=0,TCAPI_ERROR_INVALID_TIMESPAN=1,TCAPI_FUNC_NOOP=function(){},intTCAPIError,strTCAPIErrorString,strTCAPIErrorDiagnostic;var tincan;var tcapi_cache;function TCAPI_Initialize(){WriteToDebug("In TCAPI_Initialize");tcapi_cache={totalPrevDuration:null,statementQueue:[]};TinCan.prototype.log=TinCan.LRS.prototype.log=function(msg,src){src=src||this.LOG_SRC||"TinCan";WriteToDebug("TinCan."+src+": "+msg);};try{tincan=new TinCan({url:location.href,recordStores:TC_RECORD_STORES,activity:{id:TC_COURSE_ID,definition:{name:TC_COURSE_NAME,description:TC_COURSE_DESC}}});}catch(ex){WriteToDebug("TCAPI_Initialize - TinCan construction failed: "+JSON.stringify(ex));return;}
if(tincan.recordStores.length===0){WriteToDebug("TCAPI_Initialize - resulted in no LRS: DATA CANNOT BE STORED");return;}
WriteToDebug("TCAPI_Initialize - fetching cumulative time from state: "+TCAPI_STATE_TOTAL_TIME);tincan.getState(TCAPI_STATE_TOTAL_TIME,{callback:function(err,state){WriteToDebug("TCAPI_Initialize - getState callback");var contents;if(err!==null){WriteToDebug("TCAPI_Initialize - getState callback: "+err.responseText+" ("+err.status+")");return;}
WriteToDebug("TCAPI_Initialize - getState callback - state: "+state);if(state!==null&&state.contents!==null&&state.contents.match(/^\d+$/)){tcapi_cache.totalPrevDuration=Number(state.contents);}
else{tcapi_cache.totalPrevDuration=0;}}});TCAPI_STATUS=TCAPI_INIT_VERB;TCAPI_IN_PROGRESS=true;WriteToDebug("TCAPI_Initialize - record initial launch statement");tincan.sendStatement({verb:TCAPI_INIT_VERB,inProgress:TCAPI_IN_PROGRESS},function(results,statement){if(results[0].err!==null){WriteToDebug("TCAPI_Initialize - record initial launch statement - err: "+results[0].err.responseText+" ("+results[0].err.status+")");return;}
WriteToDebug("TCAPI_Initialize - record initial launch statement success: "+statement.id);});InitializeExecuted(true,"");return true;}
function _TCAPI_SetStateSafe(key,value){var result;try{result=tincan.setState(key,value);}
catch(ex){WriteToDebug("In _TCAPI_SetStateSafe - caught exception from setState: "+ex.message);}
return result;}
function TCAPI_GetStudentID(){WriteToDebug("In TCAPI_GetStudentID");if(tincan.actor.mbox!==null){return tincan.actor.mbox;}
if(tincan.actor.mbox_sha1sum!==null){return tincan.actor.mbox_sha1sum;}
if(tincan.actor.openid!==null){return tincan.actor.openid;}
if(tincan.actor.account!==null){return tincan.actor.account.name;}
return null;}
function TCAPI_GetStudentName(){WriteToDebug("In TCAPI_GetStudentName");return tincan.actor!==null?tincan.actor.toString():"";}
function TCAPI_GetBookmark(){WriteToDebug("In TCAPI_GetBookmark");var bookmark="",getStateResult=tincan.getState(TCAPI_STATE_BOOKMARK);if(getStateResult.state!==null){bookmark=getStateResult.state.contents;}
return bookmark;}
function TCAPI_SetBookmark(value,name){WriteToDebug("In TCAPI_SetBookmark - value: "+value+", name: "+name);_TCAPI_SetStateSafe(TCAPI_STATE_BOOKMARK,value);WriteToDebug("In TCAPI_SetBookmark - sending statement: "+value);tincan.sendStatement({verb:TCAPI_VERB_EXPERIENCED,object:{id:tincan.activity.id+"/"+value,definition:{name:{"en-US":((name!==undefined&&name!=="")?name:value)}}},context:{contextActivities:{parent:tincan.activity}}},function(results,statement){if(results[0].err!==null){WriteToDebug("TCAPI_SetBookmark - sending statement: "+value+" - err: "+results[0].err.responseText+" ("+results[0].err.status+")");return;}
WriteToDebug("TCAPI_SetBookmark - sending statement success: "+value+" - id: "+statement.id);});return true;}
function TCAPI_GetDataChunk(){WriteToDebug("In TCAPI_GetDataChunk");var data="",getStateResult=tincan.getState(TCAPI_STATE_SUSPEND_DATA);if(getStateResult.state!==null){data=getStateResult.state.contents;}
return data;}
function TCAPI_SetDataChunk(value){WriteToDebug("In TCAPI_SetDataChunk");_TCAPI_SetStateSafe(TCAPI_STATE_SUSPEND_DATA,value);return true;}
function TCAPI_CommitData(){WriteToDebug("In TCAPI_CommitData - TCAPI_STATUS:"+TCAPI_STATUS);WriteToDebug("In TCAPI_CommitData - TCAPI_UPDATES_PENDING: "+TCAPI_UPDATES_PENDING);var stmt;if(TCAPI_UPDATES_PENDING){stmt={verb:TCAPI_STATUS,inProgress:TCAPI_IN_PROGRESS,result:{}};if(TCAPI_COMPLETION_STATUS!==''||!TCAPI_IN_PROGRESS){stmt.result.duration=ConvertMilliSecondsIntoSCORM2004Time(GetSessionAccumulatedTime()+TCAPI_GetPreviouslyAccumulatedTime());}
if(TCAPI_COMPLETION_STATUS!==''){stmt.result.completion=true;}
if(TCAPI_SATISFACTION_STATUS!==null){stmt.result.success=TCAPI_SATISFACTION_STATUS;}
if(typeof TCAPI_SCORE.raw!=="undefined"){stmt.result.score=TCAPI_SCORE;}
tcapi_cache.statementQueue.push(stmt);TCAPI_UPDATES_PENDING=false;}
if(tcapi_cache.statementQueue.length>0){tincan.sendStatements(tcapi_cache.statementQueue);tcapi_cache.statementQueue=[];}
return true;}
function TCAPI_Finish(exitType,statusWasSet){WriteToDebug("In TCAPI_Finish - exitType: "+exitType);if(exitType===EXIT_TYPE_SUSPEND){_TCAPI_SetStateSafe(TCAPI_STATE_TOTAL_TIME,TCAPI_GetPreviouslyAccumulatedTime()+GetSessionAccumulatedTime());TCAPI_SetSuspended();}
TCAPI_CommitData();return true;}
function TCAPI_GetAudioPlayPreference(){WriteToDebug("In TCAPI_GetAudioPlayPreference");var intTempPreference=0,getStateResult;TCAPI_ClearErrorInfo();getStateResult=tincan.getState("cmi.student_preference.audio");if(getStateResult.state!==null){intTempPreference=getStateResult.state.contents;}
intTempPreference=parseInt(intTempPreference,10);WriteToDebug("intTempPreference="+intTempPreference);if(intTempPreference>0){WriteToDebug("Returning On");return PREFERENCE_ON;}
else if(intTempPreference==0){WriteToDebug("Returning Default");return PREFERENCE_DEFAULT;}
else if(intTempPreference<0){WriteToDebug("returning Off");return PREFERENCE_OFF;}
WriteToDebug("Error: Invalid preference");TCAPI_SetErrorInfoManually(TCAPI_ERROR_INVALID_PREFERENCE,"Invalid audio preference received from LMS","intTempPreference="+intTempPreference);return null;}
function TCAPI_GetAudioVolumePreference(){WriteToDebug("In TCAPI_GetAudioVollumePreference");var intTempPreference=100,getStateResult;TCAPI_ClearErrorInfo();getStateResult=tincan.getState("cmi.student_preference.audio");if(getStateResult.state!==null){intTempPreference=getStateResult.state.contents;}
WriteToDebug("intTempPreference="+intTempPreference);intTempPreference=parseInt(intTempPreference,10);if(intTempPreference<=0){WriteToDebug("Setting to 100");intTempPreference=100;}
if(intTempPreference>100){WriteToDebug("ERROR: invalid preference");TCAPI_SetErrorInfoManually(TCAPI_ERROR_INVALID_PREFERENCE,"Invalid audio preference received from LMS","intTempPreference="+intTempPreference);return null;}
WriteToDebug("Returning "+intTempPreference);return intTempPreference;}
function TCAPI_SetAudioPreference(PlayPreference,intPercentOfMaxVolume){WriteToDebug("In TCAPI_SetAudioPreference PlayPreference="+PlayPreference+", intPercentOfMaxVolume="+intPercentOfMaxVolume);TCAPI_ClearErrorInfo();if(PlayPreference==PREFERENCE_OFF){WriteToDebug("Setting percent to -1 - OFF");intPercentOfMaxVolume=-1;}
_TCAPI_SetStateSafe("cmi.student_preference.audio",intPercentOfMaxVolume);}
function TCAPI_SetLanguagePreference(strLanguage){WriteToDebug("In TCAPI_SetLanguagePreference strLanguage="+strLanguage);TCAPI_ClearErrorInfo();_TCAPI_SetStateSafe("cmi.student_preference.language",strLanguage);}
function TCAPI_GetLanguagePreference(){WriteToDebug("In TCAPI_GetLanguagePreference");var pref,getStateResult;TCAPI_ClearErrorInfo();getStateResult=tincan.getState("cmi.student_preference.language");if(getStateResult.state!==null){pref=getStateResult.state.contents;}
return pref;}
function TCAPI_SetSpeedPreference(intPercentOfMax){WriteToDebug("In TCAPI_SetSpeedPreference intPercentOfMax="+intPercentOfMax);var intTCAPISpeed;TCAPI_ClearErrorInfo();intTCAPISpeed=(intPercentOfMax*2)-100;WriteToDebug("intTCAPISpeed="+intTCAPISpeed);_TCAPI_SetStateSafe("cmi.student_preference.speed",intTCAPISpeed);}
function TCAPI_GetSpeedPreference(){WriteToDebug("In TCAPI_GetSpeedPreference");var intTCAPISpeed=100,intPercentOfMax,getStateResult;TCAPI_ClearErrorInfo();getStateResult=tincan.getState("cmi.student_preference.speed");if(getStateResult.state!==null){intTCAPISpeed=getStateResult.state.contents;}
WriteToDebug("intTCAPISpeed="+intTCAPISpeed);if(!ValidInteger(intTCAPISpeed)){WriteToDebug("ERROR - invalid integer");TCAPI_SetErrorInfoManually(TCAPI_ERROR_INVALID_SPEED,"Invalid speed preference received from LMS - not an integer","intTCAPISpeed="+intTCAPISpeed);return null;}
intTCAPISpeed=parseInt(intTCAPISpeed,10);if(intTCAPISpeed<-100||intTCAPISpeed>100){WriteToDebug("ERROR - out of range");TCAPI_SetErrorInfoManually(TCAPI_ERROR_INVALID_SPEED,"Invalid speed preference received from LMS - out of range","intTCAPISpeed="+intTCAPISpeed);return null;}
intPercentOfMax=(intTCAPISpeed+100)/2;intPercentOfMax=parseInt(intPercentOfMax,10);WriteToDebug("Returning "+intPercentOfMax);return intPercentOfMax;}
function TCAPI_SetTextPreference(intPreference){WriteToDebug("In TCAPI_SetTextPreference intPreference="+intPreference);TCAPI_ClearErrorInfo();_TCAPI_SetStateSafe("cmi.student_preference.text",intPreference);}
function TCAPI_GetTextPreference(){WriteToDebug("In TCAPI_GetTextPreference");var intTempPreference=0,getStateResult;TCAPI_ClearErrorInfo();getStateResult=tincan.getState("cmi.student_preference.text");if(getStateResult.state!==null){intTempPreference=getStateResult.state.contents;}
intTempPreference=parseInt(intTempPreference,10);WriteToDebug("intTempPreference="+intTempPreference);if(intTempPreference>0){WriteToDebug("Returning On");return PREFERENCE_ON;}
else if(intTempPreference==0||intTempPreference==""){WriteToDebug("Returning Default");return PREFERENCE_DEFAULT;}
else if(intTempPreference<0){WriteToDebug("returning Off");return PREFERENCE_OFF;}
WriteToDebug("Error: Invalid preference");TCAPI_SetErrorInfoManually(TCAPI_ERROR_INVALID_PREFERENCE,"Invalid text preference received from LMS","intTempPreference="+intTempPreference);return null;}
function TCAPI_GetPreviouslyAccumulatedTime(){WriteToDebug("In TCAPI_GetPreviouslyAccumulatedTime");var data=0,getStateResult;WriteToDebug("In TCAPI_GetPreviouslyAccumulatedTime - cached: "+tcapi_cache.totalPrevDuration);if(tcapi_cache.totalPrevDuration===null){getStateResult=tincan.getState(TCAPI_STATE_TOTAL_TIME);if(getStateResult.state!==null){data=Number(getStateResult.state.contents);}
tcapi_cache.totalPrevDuration=(data===NaN)?0:data;}
return tcapi_cache.totalPrevDuration;}
function TCAPI_SaveTime(intMilliSeconds){WriteToDebug("In TCAPI_SaveTime");return true;}
function TCAPI_GetMaxTimeAllowed(){WriteToDebug("In TCAPI_GetMaxTimeAllowed");return null;}
function TCAPI_SetScore(intScore,intMaxScore,intMinScore){WriteToDebug("In TCAPI_SetScore intScore="+intScore+", intMaxScore="+intMaxScore+", intMinScore="+intMinScore);TCAPI_ClearErrorInfo();TCAPI_SCORE["raw"]=intScore;TCAPI_SCORE["max"]=intMaxScore;TCAPI_SCORE["min"]=intMinScore;WriteToDebug("Returning "+TCAPI_SCORE);TCAPI_UPDATES_PENDING=true;return true;}
function TCAPI_GetScore(){WriteToDebug("In TCAPI_GetScore");TCAPI_ClearErrorInfo();WriteToDebug("Returning "+TCAPI_SCORE['raw']);return TCAPI_SCORE['raw'];}
function TCAPI_SetPointBasedScore(intScore,intMaxScore,intMinScore){WriteToDebug("TCAPI_SetPointBasedScore - TCAPI does not support SetPointBasedScore, falling back to SetScore");return TCAPI_SetScore(intScore,intMaxScore,intMinScore);}
function TCAPI_GetScaledScore(intScore,intMaxScore,intMinScore){WriteToDebug("TCAPI_GetScaledScore - TCAPI does not support GetScaledScore, returning false");return false;}
function TCAPI_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,TCAPIInteractionType,strAlternateResponse,strAlternateCorrectResponse){var blnTempResult,intInteractionIndex,strResult,actObj={},stmt,interactionActivityId=tincan.activity.id+"-"+strID,interactionActivityType=TCAPI_INTERACTION;TCAPI_ClearErrorInfo();switch(TCAPIInteractionType){case"true-false":actObj={id:interactionActivityId,definition:{description:{'en-US':strDescription},type:interactionActivityType,interactionType:"true-false",correctResponsesPattern:[strCorrectResponse]}};break;case"choice":actObj={id:interactionActivityId,definition:{description:{'en-US':strDescription},type:interactionActivityType,interactionType:"choice",correctResponsesPattern:[strCorrectResponse]}};break;case"fill-in":actObj={id:interactionActivityId,definition:{description:{'en-US':strDescription},type:interactionActivityType,interactionType:"fill-in",correctResponsesPattern:[strCorrectResponse]}};break;case"matching":actObj={id:interactionActivityId,definition:{description:{'en-US':strDescription},type:interactionActivityType,interactionType:"matching",correctResponsesPattern:[strCorrectResponse]}};break;case"performance":actObj={id:interactionActivityId,definition:{description:{'en-US':strDescription},type:interactionActivityType,interactionType:"performance",correctResponsesPattern:[strCorrectResponse]}};break;case"sequencing":actObj={id:interactionActivityId,definition:{description:{'en-US':strDescription},type:interactionActivityType,interactionType:"sequencing",correctResponsesPattern:[strCorrectResponse]}};break;case"likert":actObj={id:interactionActivityId,definition:{description:{'en-US':strDescription},type:interactionActivityType,interactionType:"likert",correctResponsesPattern:[strCorrectResponse]}};break;case"numeric":actObj={id:interactionActivityId,definition:{description:{'en-US':strDescription},type:interactionActivityType,interactionType:"numeric",correctResponsesPattern:[strCorrectResponse]}};break;case"other":actObj={id:interactionActivityId,definition:{description:{'en-US':strDescription},type:interactionActivityType,interactionType:"other",correctResponsesPattern:[strCorrectResponse]}};break;default:WriteToDebug("TCAPI_RecordInteraction received an invalid TCPAIInteractionType of "+TCAPIInteractionType);return false;}
if(actObj.id!==null){stmt={verb:TCAPI_VERB_ANSWERED,object:actObj,context:{contextActivities:{parent:tincan.activity,grouping:{id:tincan.activity.id+'-'+strLearningObjectiveID}}}};if(strResponse!==null){stmt.result={response:strResponse,success:blnCorrect};}
tcapi_cache.statementQueue.push(stmt);}
return true;}
function TCAPI_RecordTrueFalseInteraction(strID,blnResponse,blnCorrect,blnCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In TCAPI_RecordTrueFalseInteraction strID="+strID+", strResponse="+strResponse+", blnCorrect="+blnCorrect+", strCorrectResponse="+strCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var strResponse="",strCorrectResponse=null;if(blnResponse===true){strResponse="true";}
else{strResponse="false";}
if(blnCorrectResponse===true){strCorrectResponse="true";}
else if(blnCorrectResponse===false){strCorrectResponse="false";}
return TCAPI_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,TCAPI_INTERACTION_TYPE_TRUE_FALSE,strResponse,strCorrectResponse);}
function TCAPI_RecordMultipleChoiceInteraction(strID,aryResponse,blnCorrect,aryCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In TCAPI_RecordMultipleChoiceInteraction strID="+strID+", aryResponse="+aryResponse+", blnCorrect="+blnCorrect+", aryCorrectResponse="+aryCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var strResponse="",strResponseLong="",strCorrectResponse="",strCorrectResponseLong="";for(var i=0;i<aryResponse.length;i++){if(strResponse.length>0){strResponse+="[,]";}
if(strResponseLong.length>0){strResponseLong+="[,]";}
strResponse+=aryResponse[i].Short;strResponseLong+=aryResponse[i].Long;}
for(var i=0;i<aryCorrectResponse.length;i++){if(strCorrectResponse.length>0){strCorrectResponse+="[,]";}
if(strCorrectResponseLong.length>0){strCorrectResponseLong+="[,]";}
strCorrectResponse+=aryCorrectResponse[i].Short;strCorrectResponseLong+=aryCorrectResponse[i].Long;}
return TCAPI_RecordInteraction(strID,strResponseLong,blnCorrect,strCorrectResponseLong,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,TCAPI_INTERACTION_TYPE_CHOICE,strResponse,strCorrectResponse);}
function TCAPI_RecordFillInInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In TCAPI_RecordFillInInteraction strID="+strID+", strResponse="+strResponse+", blnCorrect="+blnCorrect+", strCorrectResponse="+strCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);strResponse=new String(strResponse);if(strResponse.length>255){strResponse=strResponse.substr(0,255);}
if(strCorrectResponse===null){strCorrectResponse="";}
strCorrectResponse=new String(strCorrectResponse);if(strCorrectResponse.length>255){strCorrectResponse=strCorrectResponse.substr(0,255);}
return TCAPI_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,TCAPI_INTERACTION_TYPE_FILL_IN,strResponse,strCorrectResponse);}
function TCAPI_RecordMatchingInteraction(strID,aryResponse,blnCorrect,aryCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In TCAPI_RecordMatchingInteraction strID="+strID+", aryResponse="+aryResponse+", blnCorrect="+blnCorrect+", aryCorrectResponse="+aryCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var strResponse="";strResponseLong="",strCorrectResponse="",strCorrectResponseLong="";for(var i=0;i<aryResponse.length;i++){if(strResponse.length>0){strResponse+="[,]";}
if(strResponseLong.length>0){strResponseLong+="[,]";}
strResponse+=aryResponse[i].Source.Short+"[.]"+aryResponse[i].Target.Short;strResponseLong+=aryResponse[i].Source.Long+"[.]"+aryResponse[i].Target.Long;}
for(var i=0;i<aryCorrectResponse.length;i++){if(strCorrectResponse.length>0){strCorrectResponse+="[,]";}
if(strCorrectResponseLong.length>0){strCorrectResponseLong+="[,]";}
strCorrectResponse+=aryCorrectResponse[i].Source.Short+"[.]"+aryCorrectResponse[i].Target.Short;strCorrectResponseLong+=aryCorrectResponse[i].Source.Long+"[.]"+aryCorrectResponse[i].Target.Long;}
return TCAPI_RecordInteraction(strID,strResponseLong,blnCorrect,strCorrectResponseLong,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,TCAPI_INTERACTION_TYPE_MATCHING,strResponse,strCorrectResponse);}
function TCAPI_RecordPerformanceInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In TCAPI_RecordPerformanceInteraction strID="+strID+", strResponse="+strResponse+", blnCorrect="+blnCorrect+", strCorrectResponse="+strCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);strResponse=new String(strResponse);if(strResponse.length>255){strResponse=strResponse.substr(0,255);}
if(strCorrectResponse==null){strCorrectResponse="";}
strCorrectResponse=new String(strCorrectResponse);if(strCorrectResponse.length>255){strCorrectResponse=strCorrectResponse.substr(0,255);}
return TCAPI_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,TCAPI_INTERACTION_TYPE_PERFORMANCE,strResponse,strCorrectResponse);}
function TCAPI_RecordSequencingInteraction(strID,aryResponse,blnCorrect,aryCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In TCAPI_RecordSequencingInteraction strID="+strID+", aryResponse="+aryResponse+", blnCorrect="+blnCorrect+", aryCorrectResponse="+aryCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var strResponse="",strResponseLong="",strCorrectResponse="",strCorrectResponseLong="";for(var i=0;i<aryResponse.length;i++){if(strResponse.length>0){strResponse+="[,]";}
if(strResponseLong.length>0){strResponseLong+="[,]";}
strResponse+=aryResponse[i].Short;strResponseLong+=aryResponse[i].Long;}
for(var i=0;i<aryCorrectResponse.length;i++){if(strCorrectResponse.length>0){strCorrectResponse+="[,]";}
if(strCorrectResponseLong.length>0){strCorrectResponseLong+="[,]";}
strCorrectResponse+=aryCorrectResponse[i].Short;strCorrectResponseLong+=aryCorrectResponse[i].Long;}
return TCAPI_RecordInteraction(strID,strResponseLong,blnCorrect,strCorrectResponseLong,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,TCAPI_INTERACTION_TYPE_SEQUENCING,strResponse,strCorrectResponse);}
function TCAPI_RecordLikertInteraction(strID,response,blnCorrect,correctResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In TCAPI_RecordLikertInteraction strID="+strID+", response="+response+", blnCorrect="+blnCorrect+", correctResponse="+correctResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);var strResponse=response.Short,strResponseLong=response.Long,strCorrectResponse="",strCorrectResponseLong="";if(correctResponse!==null){strCorrectResponse=correctResponse.Short;strCorrectResponseLong=correctResponse.Long;}
return TCAPI_RecordInteraction(strID,strResponseLong,blnCorrect,strCorrectResponseLong,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,TCAPI_INTERACTION_TYPE_LIKERT,strResponse,strCorrectResponse);}
function TCAPI_RecordNumericInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime){WriteToDebug("In TCAPI_RecordNumericInteraction strID="+strID+", strResponse="+strResponse+", blnCorrect="+blnCorrect+", strCorrectResponse="+strCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID+", dtmTime="+dtmTime);return TCAPI_RecordInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime,TCAPI_INTERACTION_TYPE_NUMERIC,strResponse,strCorrectResponse);}
function TCAPI_GetEntryMode(){WriteToDebug("In TCAPI_GetEntryMode");return null;}
function TCAPI_GetLessonMode(){WriteToDebug("In TCAPI_GetLessonMode");return null;}
function TCAPI_GetTakingForCredit(){WriteToDebug("In TCAPI_GetTakingForCredit");return null;}
function TCAPI_SetObjectiveScore(strObjectiveID,intScore,intMaxScore,intMinScore){WriteToDebug("In TCAPI_SetObjectiveScore, strObejctiveID="+strObjectiveID+", intScore="+intScore+", intMaxScore="+intMaxScore+", intMinScore="+intMinScore);}
function TCAPI_SetObjectiveDescription(strObjectiveID,strObjectiveDescription){WriteToDebug("In TCAPI_SetObjectiveDescription, strObjectiveDescription="+strObjectiveDescription);TCAPI_ClearErrorInfo();return TCAPI_TRUE;}
function TCAPI_SetObjectiveStatus(strObjectiveID,Lesson_Status){WriteToDebug("In TCAPI_SetObjectiveStatus strObjectiveID="+strObjectiveID+", Lesson_Status="+Lesson_Status);}
function TCAPI_GetObjectiveScore(strObjectiveID){WriteToDebug("In TCAPI_GetObjectiveScore, strObejctiveID="+strObjectiveID);}
function TCAPI_GetObjectiveDescription(strObjectiveID){WriteToDebug("In TCAPI_GetObjectiveDescription, strObejctiveID="+strObjectiveID);return"";}
function TCAPI_GetObjectiveStatus(strObjectiveID){WriteToDebug("In TCAPI_GetObjectiveStatus, strObejctiveID="+strObjectiveID);}
function TCAPI_FindObjectiveIndexFromID(strObjectiveID){WriteToDebug("In TCAPI_FindObjectiveIndexFromID");}
function TCAPI_SetSuspended(){WriteToDebug("In TCAPI_SetSuspended");if(TCAPI_IN_PROGRESS){TCAPI_IN_PROGRESS=false;TCAPI_UPDATES_PENDING=true;}
return true;}
function TCAPI_SetFailed(){WriteToDebug("In TCAPI_SetFailed");TCAPI_STATUS=TCAPI_VERB_FAILED;TCAPI_STATUS_CHANGED=true;TCAPI_SATISFACTION_STATUS=false;TCAPI_IN_PROGRESS=false;TCAPI_UPDATES_PENDING=true;return true;}
function TCAPI_SetPassed(){WriteToDebug("In TCAPI_SetPassed");TCAPI_STATUS=TCAPI_VERB_PASSED;TCAPI_STATUS_CHANGED=true;TCAPI_SATISFACTION_STATUS=true;TCAPI_IN_PROGRESS=false;TCAPI_UPDATES_PENDING=true;return true;}
function TCAPI_SetCompleted(){WriteToDebug("In TCAPI_SetCompleted");TCAPI_ClearErrorInfo();if(TCAPI_STATUS===TCAPI_INIT_VERB){TCAPI_STATUS=TCAPI_VERB_COMPLETED;TCAPI_STATUS_CHANGED=true;}
TCAPI_COMPLETION_STATUS=TCAPI_VERB_COMPLETED;TCAPI_IN_PROGRESS=false;TCAPI_UPDATES_PENDING=true;return true;}
function TCAPI_ResetStatus(){WriteToDebug("In TCAPI_ResetStatus");TCAPI_ClearErrorInfo();TCAPI_STATUS=TCAPI_INIT_VERB;TCAPI_STATUS_CHANGED=true;TCAPI_COMPLETION_STATUS='';TCAPI_SATISFACTION_STATUS=null;TCAPI_IN_PROGRESS=true;TCAPI_UPDATES_PENDING=true;return true;}
function TCAPI_GetStatus(){WriteToDebug("In TCAPI_GetStatus");var strStatus="";TCAPI_ClearErrorInfo();if(TCAPI_STATUS===TCAPI_VERB_COMPLETED){strStatus="completed";}
else if(TCAPI_STATUS===TCAPI_VERB_ATTEMPTED){strStatus="attempted";}
else if(TCAPI_STATUS===TCAPI_VERB_PASSED){strStatus="passed";}
else if(TCAPI_STATUS===TCAPI_VERB_FAILED){strStatus="failed";}
else{strStatus=TCAPI_STATUS;}
WriteToDebug("In TCAPI_GetStatus - strStatus="+strStatus);return strStatus;}
function TCAPI_GetCompletionStatus(){WriteToDebug("In TCAPI_GetCompletionStatus");WriteToDebug("In TCAPI_GetCompletionStatus: returning TCAPI_COMPLETION_STAUS: "+TCAPI_COMPLETION_STATUS);return TCAPI_COMPLETION_STATUS;}
function TCAPI_SetNavigationRequest(strNavRequest){WriteToDebug("TCAPI_GetNavigationRequest - TCAPI does not support navigation requests, returning false");return false;}
function TCAPI_GetNavigationRequest(){WriteToDebug("TCAPI_GetNavigationRequest - TCAPI does not support navigation requests, returning false");return false;}
function TCAPI_CreateDataBucket(strBucketId,intMinSize,intMaxSize){WriteToDebug("TCAPI_CreateDataBucket - TCAPI does not support SSP, returning false");return false;}
function TCAPI_GetDataFromBucket(strBucketId){WriteToDebug("TCAPI_GetDataFromBucket - TCAPI does not support SSP, returning empty string");return"";}
function TCAPI_PutDataInBucket(strBucketId,strData,blnAppendToEnd){WriteToDebug("TCAPI_PutDataInBucket - TCAPI does not support SSP, returning false");return false;}
function TCAPI_DetectSSPSupport(){WriteToDebug("TCAPI_DetectSSPSupport - TCAPI does not support SSP, returning false");return false;}
function TCAPI_GetBucketInfo(strBucketId){WriteToDebug("AICC_DetectSSPSupport - TCAPI does not support SSP, returning empty SSPBucketSize");return new SSPBucketSize(0,0);}
function TCAPI_WriteComment(strComment){WriteToDebug("In TCAPI_WriteComment - TCAPI does not support LMS comments");return false;}
function TCAPI_GetLMSComments(){WriteToDebug("In TCAPI_GetLMSComments - TCAPI does not support LMS comments");return false;}
function TCAPI_GetLaunchData(){WriteToDebug("In TCAPI_GetLaunchData - TCAPI does not support launch data");return false;}
function TCAPI_SetLaunchData(){WriteToDebug("In TCAPI_SetLaunchData - TCAPI does not support launch data");return false;}
function TCAPI_GetComments(){WriteToDebug("In TCAPI_GetComments - TCAPI does not support comments");return false;}
function TCAPI_SetComments(){WriteToDebug("In TCAPI_SetComments - TCAPI does not support comments");return false;}
function TCAPI_DisplayMessageOnTimeout(){TCAPI_ClearErrorInfo();WriteToDebug("In TCAPI_DisplayMessageOnTimeout - TCAPI does not support MessageOnTimeout");return false;}
function TCAPI_ExitOnTimeout(){WriteToDebug("In TCAPI_ExitOnTimeout - TCAPI does not support ExitOnTimeout");return false;}
function TCAPI_GetPassingScore(){WriteToDebug("In TCAPI_GetPassingScore - TCAPI does not support GetPassingScore");return false;}
function TCAPI_GetProgressMeasure(){WriteToDebug("TCAPI_GetProgressMeasure - TCAPI does not support progress_measure, returning false");return false;}
function TCAPI_SetProgressMeasure(){WriteToDebug("TCAPI_SetProgressMeasure - TCAPI does not support progress_measure, returning false");return false;}
function TCAPI_GetObjectiveProgressMeasure(){WriteToDebug("TCAPI_GetObjectiveProgressMeasure - TCAPI does not support progress_measure, returning false");return false;}
function TCAPI_SetObjectiveProgressMeasure(){WriteToDebug("TCAPI_SetObjectiveProgressMeasure - TCAPI does not support progress_measure, returning false");return false;}
function TCAPI_IsContentInBrowseMode(){WriteToDebug("In TCAPI_IsContentInBrowseMode - TCAPI does not support BrowseMode");return false;}
function TCAPI_FindInteractionIndexFromID(strInteractionID){WriteToDebug("TCAPI_FindInteractionIndexFromID - TCAPI does not support interaction retrieval, returning null");return null;}
function TCAPI_GetInteractionType(strInteractionID){WriteToDebug("TCAPI_GetInteractionType - TCAPI does not support interaction retrieval, returning empty string");return'';}
function TCAPI_GetInteractionTimestamp(strInteractionID){WriteToDebug("TCAPI_GetInteractionTimestamp - TCAPI does not support interaction retrieval, returning empty string");return'';}
function TCAPI_GetInteractionCorrectResponses(strInteractionID){WriteToDebug("TCAPI_GetInteractionCorrectResponses - TCAPI does not support interaction retrieval, returning empty array");return[];}
function TCAPI_GetInteractionWeighting(strInteractionID){WriteToDebug("TCAPI_GetInteractionWeighting - TCAPI does not support interaction retrieval, returning empty string");return'';}
function TCAPI_GetInteractionLearnerResponses(strInteractionID){WriteToDebug("TCAPI_GetInteractionLearnerResponses - TCAPI does not support interaction retrieval, returning empty array");return[];}
function TCAPI_GetInteractionResult(strInteractionID){WriteToDebug("TCAPI_GetInteractionResult - TCAPI does not support interaction retrieval, returning empty string");return'';}
function TCAPI_GetInteractionLatency(strInteractionID){WriteToDebug("TCAPI_GetInteractionDescription - TCAPI does not support interaction retrieval, returning empty string");return'';}
function TCAPI_GetInteractionDescription(strInteractionID){WriteToDebug("TCAPI_GetInteractionDescription - TCAPI does not support interaction retrieval, returning empty string");return'';}
function TCAPI_ClearErrorInfo(){WriteToDebug("In TCAPI_ClearErrorInfo");intTCAPIError=TCAPI_NO_ERROR;strTCAPIErrorString="";strTCAPIErrorDiagnostic="";}
function TCAPI_SetErrorInfo(){WriteToDebug("In TCAPI_SetErrorInfo");intTCAPIError=TCAPI_objAPI.LMSGetLastError();strTCAPIErrorString=TCAPI_objAPI.LMSGetErrorString(intTCAPIError);strTCAPIErrorDiagnostic=TCAPI_objAPI.LMSGetDiagnostic("");intTCAPIError=intTCAPIError+"";strTCAPIErrorString=strTCAPIErrorString+"";strTCAPIErrorDiagnostic=strTCAPIErrorDiagnostic+"";WriteToDebug("intTCAPIError="+intTCAPIError);WriteToDebug("strTCAPIErrorString="+strTCAPIErrorString);WriteToDebug("strTCAPIErrorDiagnostic="+strTCAPIErrorDiagnostic);}
function TCAPI_SetErrorInfoManually(intNum,strString,strDiagnostic){WriteToDebug("In TCAPI_SetErrorInfoManually");WriteToDebug("ERROR-Num="+intNum);WriteToDebug("      String="+strString);WriteToDebug("      Diag="+strDiagnostic);intTCAPIError=intNum;strTCAPIErrorString=strString;strTCAPIErrorDiagnostic=strDiagnostic;}
function TCAPI_GetLastError(){WriteToDebug("In TCAPI_GetLastError");if(intTCAPIError===TCAPI_NO_ERROR){WriteToDebug("Returning No Error");return NO_ERROR;}
else{WriteToDebug("Returning "+intTCAPIError);return intTCAPIError;}}
function TCAPI_GetLastErrorDesc(){WriteToDebug("In TCAPI_GetLastErrorDesc, "+strTCAPIErrorString+"\n"+strTCAPIErrorDiagnostic);return strTCAPIErrorString+"\n"+strTCAPIErrorDiagnostic;}
function LMSStandardAPI(strStandard){WriteToDebug("In LMSStandardAPI strStandard="+strStandard);if(strStandard==""){WriteToDebug("No standard specified, using NONE");strStandard="NONE";}
eval("this.Initialize = "+strStandard+"_Initialize");eval("this.Finish = "+strStandard+"_Finish");eval("this.CommitData = "+strStandard+"_CommitData");eval("this.GetStudentID = "+strStandard+"_GetStudentID");eval("this.GetStudentName = "+strStandard+"_GetStudentName");eval("this.GetBookmark = "+strStandard+"_GetBookmark");eval("this.SetBookmark = "+strStandard+"_SetBookmark");eval("this.GetDataChunk = "+strStandard+"_GetDataChunk");eval("this.SetDataChunk = "+strStandard+"_SetDataChunk");eval("this.GetLaunchData = "+strStandard+"_GetLaunchData");eval("this.GetComments = "+strStandard+"_GetComments");eval("this.WriteComment = "+strStandard+"_WriteComment");eval("this.GetLMSComments = "+strStandard+"_GetLMSComments");eval("this.GetAudioPlayPreference = "+strStandard+"_GetAudioPlayPreference");eval("this.GetAudioVolumePreference = "+strStandard+"_GetAudioVolumePreference");eval("this.SetAudioPreference = "+strStandard+"_SetAudioPreference");eval("this.SetLanguagePreference = "+strStandard+"_SetLanguagePreference");eval("this.GetLanguagePreference = "+strStandard+"_GetLanguagePreference");eval("this.SetSpeedPreference = "+strStandard+"_SetSpeedPreference");eval("this.GetSpeedPreference = "+strStandard+"_GetSpeedPreference");eval("this.SetTextPreference = "+strStandard+"_SetTextPreference");eval("this.GetTextPreference = "+strStandard+"_GetTextPreference");eval("this.GetPreviouslyAccumulatedTime = "+strStandard+"_GetPreviouslyAccumulatedTime");eval("this.SaveTime = "+strStandard+"_SaveTime");eval("this.GetMaxTimeAllowed = "+strStandard+"_GetMaxTimeAllowed");eval("this.DisplayMessageOnTimeout = "+strStandard+"_DisplayMessageOnTimeout");eval("this.ExitOnTimeout = "+strStandard+"_ExitOnTimeout");eval("this.GetPassingScore = "+strStandard+"_GetPassingScore");eval("this.SetScore = "+strStandard+"_SetScore");eval("this.GetScore = "+strStandard+"_GetScore");eval("this.GetScaledScore = "+strStandard+"_GetScaledScore");eval("this.RecordTrueFalseInteraction = "+strStandard+"_RecordTrueFalseInteraction");eval("this.RecordMultipleChoiceInteraction = "+strStandard+"_RecordMultipleChoiceInteraction");eval("this.RecordFillInInteraction = "+strStandard+"_RecordFillInInteraction");eval("this.RecordMatchingInteraction = "+strStandard+"_RecordMatchingInteraction");eval("this.RecordPerformanceInteraction = "+strStandard+"_RecordPerformanceInteraction");eval("this.RecordSequencingInteraction = "+strStandard+"_RecordSequencingInteraction");eval("this.RecordLikertInteraction = "+strStandard+"_RecordLikertInteraction");eval("this.RecordNumericInteraction = "+strStandard+"_RecordNumericInteraction");eval("this.GetEntryMode = "+strStandard+"_GetEntryMode");eval("this.GetLessonMode = "+strStandard+"_GetLessonMode");eval("this.GetTakingForCredit = "+strStandard+"_GetTakingForCredit");eval("this.SetObjectiveScore = "+strStandard+"_SetObjectiveScore");eval("this.SetObjectiveStatus = "+strStandard+"_SetObjectiveStatus");eval("this.GetObjectiveScore = "+strStandard+"_GetObjectiveScore");eval("this.GetObjectiveStatus = "+strStandard+"_GetObjectiveStatus");eval("this.SetObjectiveDescription = "+strStandard+"_SetObjectiveDescription");eval("this.GetObjectiveDescription = "+strStandard+"_GetObjectiveDescription");eval("this.SetFailed = "+strStandard+"_SetFailed");eval("this.SetPassed = "+strStandard+"_SetPassed");eval("this.SetCompleted = "+strStandard+"_SetCompleted");eval("this.ResetStatus = "+strStandard+"_ResetStatus");eval("this.GetStatus = "+strStandard+"_GetStatus");eval("this.GetLastError = "+strStandard+"_GetLastError");eval("this.GetLastErrorDesc = "+strStandard+"_GetLastErrorDesc");eval("this.GetInteractionType = "+strStandard+"_GetInteractionType");eval("this.GetInteractionTimestamp = "+strStandard+"_GetInteractionTimestamp");eval("this.GetInteractionCorrectResponses = "+strStandard+"_GetInteractionCorrectResponses");eval("this.GetInteractionWeighting = "+strStandard+"_GetInteractionWeighting");eval("this.GetInteractionLearnerResponses = "+strStandard+"_GetInteractionLearnerResponses");eval("this.GetInteractionResult = "+strStandard+"_GetInteractionResult");eval("this.GetInteractionLatency = "+strStandard+"_GetInteractionLatency");eval("this.GetInteractionDescription = "+strStandard+"_GetInteractionDescription");eval("this.CreateDataBucket = "+strStandard+"_CreateDataBucket");eval("this.GetDataFromBucket = "+strStandard+"_GetDataFromBucket");eval("this.PutDataInBucket = "+strStandard+"_PutDataInBucket");eval("this.DetectSSPSupport = "+strStandard+"_DetectSSPSupport");eval("this.GetBucketInfo = "+strStandard+"_GetBucketInfo");eval("this.GetProgressMeasure = "+strStandard+"_GetProgressMeasure");eval("this.SetProgressMeasure = "+strStandard+"_SetProgressMeasure");eval("this.SetPointBasedScore = "+strStandard+"_SetPointBasedScore");eval("this.SetNavigationRequest = "+strStandard+"_SetNavigationRequest");eval("this.GetNavigationRequest = "+strStandard+"_GetNavigationRequest");eval("this.SetObjectiveProgressMeasure = "+strStandard+"_SetObjectiveProgressMeasure");eval("this.GetObjectiveProgressMeasure = "+strStandard+"_GetObjectiveProgressMeasure");this.Standard=strStandard;}
var blnCalledFinish=false;var blnStandAlone=false;var blnLoaded=false;var blnReachedEnd=false;var blnStatusWasSet=false;var blnLmsPresent=false;var dtmStart=null;var dtmEnd=null;var intAccumulatedMS=0;var blnOverrodeTime=false;var intTimeOverrideMS=null;var aryDebug=new Array();var strDebug="";var winDebug;var intError=NO_ERROR;var strErrorDesc="";var objLMS=null;function Start(){var strStandAlone;var strShowInteractiveDebug;var objTempAPI=null;var strTemp="";WriteToDebug("<h1>SCORM Driver starting up</h1>");WriteToDebug("----------------------------------------");WriteToDebug("----------------------------------------");WriteToDebug("In Start - Version: "+VERSION+"  Last Modified="+window.document.lastModified);WriteToDebug("Browser Info ("+navigator.appName+" "+navigator.appVersion+")");WriteToDebug("URL: "+window.document.location.href);WriteToDebug("----------------------------------------");WriteToDebug("----------------------------------------");ClearErrorInfo();strStandAlone=GetQueryStringValue("StandAlone",window.location.search);strShowInteractiveDebug=GetQueryStringValue("ShowDebug",window.location.search);WriteToDebug("strStandAlone="+strStandAlone+"  strShowInteractiveDebug="+strShowInteractiveDebug);if(ConvertStringToBoolean(strStandAlone)){WriteToDebug("Entering Stand Alone Mode");blnStandAlone=true;}
if(blnStandAlone){WriteToDebug("Using NONE Standard");objLMS=new LMSStandardAPI("NONE");}
else{WriteToDebug("Standard From Configuration File - "+strLMSStandard);if(strLMSStandard.toUpperCase()=="TCAPI"){WriteToDebug("Using TCAPI as set in the configuration");objLMS=new LMSStandardAPI("TCAPI");blnLmsPresent=true;}else if(strLMSStandard.toUpperCase()=="AUTO"){WriteToDebug("Searching for AICC querystring parameters");strTemp=GetQueryStringValue("AICC_URL",document.location.search);if(strTemp!=null&&strTemp!="")
{WriteToDebug("Found AICC querystring parameters, using AICC");objLMS=new LMSStandardAPI("AICC");blnLmsPresent=true;}else{WriteToDebug("Auto-detecting standard - Searching for SCORM 2004 API");try{objTempAPI=SCORM2004_GrabAPI();}
catch(e){WriteToDebug("Error grabbing 2004 API-"+e.name+":"+e.message);}
if(!(typeof(objTempAPI)=="undefined"||objTempAPI==null)){WriteToDebug("Found SCORM 2004 API, using SCORM 2004");objLMS=new LMSStandardAPI("SCORM2004");blnLmsPresent=true;}else{WriteToDebug("Searching for SCORM 1.2 API");try{objTempAPI=SCORM_GrabAPI();}
catch(e){WriteToDebug("Error grabbing 1.2 API-"+e.name+":"+e.message);}
if(!(typeof(objTempAPI)=="undefined"||objTempAPI==null)){WriteToDebug("Found SCORM API, using SCORM");objLMS=new LMSStandardAPI("SCORM");blnLmsPresent=true;}
else{WriteToDebug("Searching for TCAPI endpoint");strTemp=GetQueryStringValue("endpoint",document.location.search);if(strTemp!==null&&strTemp!==""){WriteToDebug("Found TCAPI via 'endpoint' query string param, using TCAPI");objLMS=new LMSStandardAPI("TCAPI");blnLmsPresent=true;strLMSStandard="TCAPI";}
else{if(ALLOW_NONE_STANDARD===true){WriteToDebug("Could not determine standard, defaulting to Stand Alone");objLMS=new LMSStandardAPI("NONE");}
else{WriteToDebug("Could not determine standard, Stand Alone is disabled in configuration");DisplayError("Could not determine standard. Neither SCORM nor AICC APIs could be found");return;}}}}}}else{WriteToDebug("Using Standard From Configuration File - "+strLMSStandard);objLMS=new LMSStandardAPI(strLMSStandard);blnLmsPresent=true;}}
if(ConvertStringToBoolean(strShowInteractiveDebug)||(!(typeof(SHOW_DEBUG_ON_LAUNCH)=="undefined")&&SHOW_DEBUG_ON_LAUNCH===true)){WriteToDebug("Showing Interactive Debug Windows");ShowDebugWindow();}
WriteToDebug("Calling Standard Initialize");if(strLMSStandard.toUpperCase()=="TCAPI"){loadScript("../tc-config.js",objLMS.Initialize);}else{objLMS.Initialize();}
TouchCloud();return;}
function InitializeExecuted(blnSuccess,strErrorMessage){WriteToDebug("In InitializeExecuted, blnSuccess="+blnSuccess+", strErrorMessage="+strErrorMessage);if(!blnSuccess){WriteToDebug("ERROR - LMS Initialize Failed");if(strErrorMessage==""){strErrorMessage="An Error Has Occurred";}
blnLmsPresent=false;DisplayError(strErrorMessage);return;}
if(objLMS.Standard=='AICC'){AICC_InitializeExecuted();}
blnLoaded=true;dtmStart=new Date();LoadContent();return;}
function ExecFinish(ExitType){WriteToDebug("In ExecFinish, ExiType="+ExitType);ClearErrorInfo();if(blnLoaded&&!blnCalledFinish){WriteToDebug("Haven't called finish before, finishing");blnCalledFinish=true;if(blnReachedEnd&&(!EXIT_SUSPEND_IF_COMPLETED)){WriteToDebug("Reached End, overiding exit type to FINISH");ExitType=EXIT_TYPE_FINISH;}
if(objLMS.GetStatus()==LESSON_STATUS_PASSED&&EXIT_NORMAL_IF_PASSED==true){WriteToDebug("Passed status and config value set, overiding exit type to FINISH");ExitType=EXIT_TYPE_FINISH;}
if(!blnOverrodeTime){WriteToDebug("Did not override time");dtmEnd=new Date();AccumulateTime();objLMS.SaveTime(intAccumulatedMS);}
blnLoaded=false;WriteToDebug("Calling LMS Finish");return objLMS.Finish(ExitType,blnStatusWasSet);}
return true;}
function IsLoaded(){WriteToDebug("In IsLoaded, returning -"+blnLoaded);return blnLoaded;}
function WriteToDebug(strInfo){if(blnDebug){
var dtm=new Date();var strLine;strLine=aryDebug.length+":"+dtm.toString()+" - "+strInfo;aryDebug[aryDebug.length]=strLine;if(winDebug&&!winDebug.closed){if(!window.firstMsg){window.firstMsg=true;}else{winDebug.document.write("<div class='debugLog' style='background-color:"+getBackgroundColorForLogs()+";padding-bottom: 10px;font-family:monospace;word-wrap: break-word;'>"+strLine+"</div>\n");}}
return;}}
function ShowDebugWindow(lmsPreview){if(!lmsPreview){if(winDebug&&!winDebug.closed){winDebug.close();}
winDebug=window.parent.window.open("","Debug","width=600,height=300,resizable,scrollbars");}
else{if(window.parent){var  debugIframe=getDebugLogsIFrame(); 
if(debugIframe && debugIframe.contentWindow)winDebug = debugIframe.contentWindow; else console.log("no debugIframe");}
else {console.log('no parent window');}}
if(winDebug){
winDebug.document.write(aryDebug.join("<br>\n"));winDebug.document.close();winDebug.focus();}return;}
function DisplayError(strMessage){var blnShowDebug;WriteToDebug("In DisplayError, strMessage="+strMessage);blnShowDebug=confirm("An error has occurred:\n\n"+strMessage+"\n\nPress 'OK' to view debug information to send to technical support.");if(blnShowDebug){ShowDebugWindow();}}
function GetLastError(){WriteToDebug("In GetLastError, intError="+intError);if(intError!=NO_ERROR){WriteToDebug("Returning API Error");return intError;}
else if(IsLoaded()&&objLMS.GetLastError()!=NO_ERROR){WriteToDebug("Returning LMS Error");return ERROR_LMS;}
WriteToDebug("Returning No Error");return NO_ERROR;}
function GetLastLMSErrorCode(){WriteToDebug("In GetLastLMSErrorCode, intError="+intError);var LMSError=objLMS.GetLastError();if(IsLoaded()&&LMSError!=NO_ERROR){WriteToDebug("Returning LMS Error: "+LMSError);return LMSError;}
WriteToDebug("Returning No Error");return NO_ERROR;}
function GetLastErrorDesc(){WriteToDebug("In GetLastErrorDesc");if(intError!=NO_ERROR){WriteToDebug("Returning API Error - "+strErrorDesc);return strErrorDesc;}
else if(IsLoaded()&&objLMS.GetLastError()!=NO_ERROR){WriteToDebug("returning LMS Error");return objLMS.GetLastErrorDesc;}
WriteToDebug("Returning No Error");return"";}
function SetErrorInfo(intErrorNumToSet,strErrorDescToSet){WriteToDebug("In SetErrorInfo - Num="+intErrorNumToSet+" Desc="+strErrorDescToSet);intError=intErrorNumToSet;strErrorDesc=strErrorDescToSet;}
function ClearErrorInfo(){WriteToDebug("In ClearErrorInfo");var intError=NO_ERROR;var strErrorDesc="";}
function CommitData(){WriteToDebug("In CommitData");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
if(!blnOverrodeTime){WriteToDebug("Did not override time, saving incremental time");dtmEnd=new Date();AccumulateTime();dtmStart=new Date();objLMS.SaveTime(intAccumulatedMS);}
return objLMS.CommitData();}
function Suspend(){WriteToDebug("In Suspend");ClearErrorInfo();return ExecFinish(EXIT_TYPE_SUSPEND);}
function Finish(){WriteToDebug("In Finish");ClearErrorInfo();return ExecFinish(EXIT_TYPE_FINISH);}
function TimeOut(){WriteToDebug("In TimeOut");ClearErrorInfo();return ExecFinish(EXIT_TYPE_TIMEOUT);}
function Unload(){WriteToDebug("In Unload");ClearErrorInfo();return ExecFinish(DEFAULT_EXIT_TYPE);}
function SetReachedEnd(){WriteToDebug("In SetReachedEnd");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
if(blnStatusWasSet==false){objLMS.SetCompleted();}
blnReachedEnd=true;return true;}
function ConcedeControl()
{WriteToDebug("Conceding control with type: "+EXIT_BEHAVIOR);ClearErrorInfo();var contentRoot=null;var urlBase=null;switch(EXIT_BEHAVIOR)
{case"SCORM_RECOMMENDED":contentRoot=SearchParentsForContentRoot();if(contentRoot==window.top)
{Suspend();contentRoot.window.close();}
else
{Suspend();if(contentRoot!=null){if(IsAbsoluteUrl(EXIT_TARGET)){contentRoot.scormdriver_content.location.href=EXIT_TARGET;}else{urlBase=GetContentRootUrlBase(contentRoot);contentRoot.scormdriver_content.location.href=urlBase+EXIT_TARGET;}}}
break;case"ALWAYS_CLOSE":Suspend();window.close();break;case"ALWAYS_CLOSE_TOP":Suspend();window.top.close();break;case"ALWAYS_CLOSE_PARENT":Suspend();window.parent.close();break;case"NOTHING":Suspend();break;case"REDIR_CONTENT_FRAME":Suspend();contentRoot=SearchParentsForContentRoot();if(contentRoot!=null){if(IsAbsoluteUrl(EXIT_TARGET)){contentRoot.scormdriver_content.location.href=EXIT_TARGET;}else{urlBase=GetContentRootUrlBase(contentRoot);contentRoot.scormdriver_content.location.href=urlBase+EXIT_TARGET;}}
break;}
return true;}
function GetContentRootUrlBase(contentRoot){var urlParts=contentRoot.location.href.split("/");delete urlParts[urlParts.length-1];contentRoot=urlParts.join("/");return contentRoot;}
function SearchParentsForContentRoot(){var contentRoot=null;var wnd=window;var i=0;if(wnd.scormdriver_content){contentRoot=wnd;return contentRoot;}
while(contentRoot==null&&wnd!=window.top&&(i++<100)){if(wnd.scormdriver_content){contentRoot=wnd;return contentRoot;}
else{wnd=wnd.parent;}}
WriteToDebug("Unable to locate content root");return null;}
function GetStudentID(){WriteToDebug("In GetStudentID");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return"";}
return objLMS.GetStudentID();}
function GetStudentName(){WriteToDebug("In GetStudentName");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return"";}
return objLMS.GetStudentName();}
function GetBookmark(){WriteToDebug("In GetBookmark");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return"";}
return objLMS.GetBookmark();}
function SetBookmark(strBookmark,strDesc){WriteToDebug("In SetBookmark - strBookmark="+strBookmark+", strDesc="+strDesc);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.SetBookmark(strBookmark,strDesc);}
function GetDataChunk(){WriteToDebug("In GetDataChunk");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return"";}
return objLMS.GetDataChunk();}
function SetDataChunk(strData){WriteToDebug("In SetDataChunk strData="+strData);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.SetDataChunk(strData);}
function GetLaunchData(){WriteToDebug("In GetLaunchData");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return"";}
return objLMS.GetLaunchData();}
function GetComments(){var strCommentString;var aryComments;var i;WriteToDebug("In GetComments");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return null;}
strCommentString=objLMS.GetComments();WriteToDebug("strCommentString="+strCommentString);strCommentString=new String(strCommentString);if(strCommentString!=""){aryComments=strCommentString.split(" | ");for(i=0;i<aryComments.length;i++){WriteToDebug("Returning Comment #"+i);aryComments[i]=new String(aryComments[i]);aryComments[i]=aryComments[i].replace(/\|\|/g,"|");WriteToDebug("Comment #"+i+"="+aryComments[i]);}}
else{aryComments=new Array(0);}
return aryComments;}
function WriteComment(strComment){var strExistingCommentString;WriteToDebug("In WriteComment strComment="+strComment);ClearErrorInfo();strComment=new String(strComment);if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
strComment=strComment.replace(/\|/g,"||");strExistingCommentString=objLMS.GetComments();if(strExistingCommentString!=""&&strExistingCommentString!='undefined'){strComment=" | "+strComment;}
strComment=strComment;return objLMS.WriteComment(strComment);}
function GetLMSComments(){WriteToDebug("In GetLMSComments");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return"";}
return objLMS.GetLMSComments();}
function GetAudioPlayPreference(){WriteToDebug("In GetAudioPlayPreference");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return PREFERENCE_DEFAULT;}
return objLMS.GetAudioPlayPreference();}
function GetAudioVolumePreference(){WriteToDebug("GetAudioVolumePreference");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return 100;}
return objLMS.GetAudioVolumePreference();}
function SetAudioPreference(PlayPreference,intPercentOfMaxVolume){WriteToDebug("In SetAudioPreference PlayPreference="+PlayPreference+" intPercentOfMaxVolume="+intPercentOfMaxVolume);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
if(PlayPreference!=PREFERENCE_OFF&&PlayPreference!=PREFERENCE_ON){WriteToDebug("Error Invalid PlayPreference");SetErrorInfo(ERROR_INVALID_PREFERENCE,"Invalid PlayPreference passed to SetAudioPreference, PlayPreference="+PlayPreference);return false;}
if(!ValidInteger(intPercentOfMaxVolume)){WriteToDebug("Error Invalid PercentOfMaxVolume - not an integer");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid PercentOfMaxVolume passed to SetAudioPreference (not an integer), intPercentOfMaxVolume="+intPercentOfMaxVolume);return false;}
intPercentOfMaxVolume=parseInt(intPercentOfMaxVolume,10);if(intPercentOfMaxVolume<1||intPercentOfMaxVolume>100){WriteToDebug("Error Invalid PercentOfMaxVolume - out of range");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid PercentOfMaxVolume passed to SetAudioPreference (must be between 1 and 100), intPercentOfMaxVolume="+intPercentOfMaxVolume);return false;}
WriteToDebug("Calling to LMS");return objLMS.SetAudioPreference(PlayPreference,intPercentOfMaxVolume);}
function GetLanguagePreference(){WriteToDebug("In GetLanguagePreference");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return"";}
return objLMS.GetLanguagePreference();}
function SetLanguagePreference(strLanguage){WriteToDebug("In SetLanguagePreference strLanguage="+strLanguage);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.SetLanguagePreference(strLanguage);}
function GetSpeedPreference(){WriteToDebug("In GetSpeedPreference");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return 100;}
return objLMS.GetSpeedPreference();}
function SetSpeedPreference(intPercentOfMax){WriteToDebug("In SetSpeedPreference intPercentOfMax="+intPercentOfMax);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
if(!ValidInteger(intPercentOfMax)){WriteToDebug("ERROR Invalid Percent of MaxSpeed, not an integer");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid PercentOfMaxSpeed passed to SetSpeedPreference (not an integer), intPercentOfMax="+intPercentOfMax);return false;}
intPercentOfMax=parseInt(intPercentOfMax,10);if(intPercentOfMax<0||intPercentOfMax>100){WriteToDebug("ERROR Invalid Percent of MaxSpeed, out of range");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid PercentOfMaxSpeed passed to SetSpeedPreference (must be between 1 and 100), intPercentOfMax="+intPercentOfMax);return false;}
WriteToDebug("Calling to LMS");return objLMS.SetSpeedPreference(intPercentOfMax);}
function GetTextPreference(){WriteToDebug("In GetTextPreference");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetTextPreference();}
function SetTextPreference(intPreference){WriteToDebug("In SetTextPreference intPreference="+intPreference);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
if(intPreference!=PREFERENCE_DEFAULT&&intPreference!=PREFERENCE_OFF&&intPreference!=PREFERENCE_ON){WriteToDebug("Error - Invalid Preference");SetErrorInfo(ERROR_INVALID_PREFERENCE,"Invalid Preference passed to SetTextPreference, intPreference="+intPreference);return false;}
return objLMS.SetTextPreference(intPreference);}
function GetPreviouslyAccumulatedTime(){WriteToDebug("In GetPreviouslyAccumulatedTime");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return 0;}
return objLMS.GetPreviouslyAccumulatedTime();}
function AccumulateTime(){WriteToDebug("In AccumulateTime dtmStart="+dtmStart+" dtmEnd="+dtmEnd+" intAccumulatedMS="+intAccumulatedMS);if(dtmEnd!=null&&dtmStart!=null){WriteToDebug("Accumulating Time");intAccumulatedMS+=(dtmEnd.getTime()-dtmStart.getTime());WriteToDebug("intAccumulatedMS="+intAccumulatedMS);}}
function GetSessionAccumulatedTime(){WriteToDebug("In GetSessionAccumulatedTime");ClearErrorInfo();WriteToDebug("Setting dtmEnd to now");dtmEnd=new Date();WriteToDebug("Accumulating Time");AccumulateTime();if(dtmStart!=null){WriteToDebug("Resetting dtmStart");dtmStart=new Date();}
WriteToDebug("Setting dtmEnd to null");dtmEnd=null;WriteToDebug("Returning "+intAccumulatedMS);return intAccumulatedMS;}
function SetSessionTime(intMilliseconds){WriteToDebug("In SetSessionTime");ClearErrorInfo();if(!ValidInteger(intMilliseconds)){WriteToDebug("ERROR parameter is not an integer");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid intMilliseconds passed to SetSessionTime (not an integer), intMilliseconds="+intMilliseconds);return false;}
intMilliseconds=parseInt(intMilliseconds,10);if(intMilliseconds<0){WriteToDebug("Error, parameter is less than 0");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid intMilliseconds passed to SetSessionTime (must be greater than 0), intMilliseconds="+intMilliseconds);return false;}
blnOverrodeTime=true;intTimeOverrideMS=intMilliseconds;objLMS.SaveTime(intTimeOverrideMS);return true;}
function PauseTimeTracking(){WriteToDebug("In PauseTimeTracking");ClearErrorInfo();WriteToDebug("Setting dtmEnd to now");dtmEnd=new Date();WriteToDebug("Accumulating Time");AccumulateTime();WriteToDebug("Setting Start and End times to null");dtmStart=null;dtmEnd=null;return true;}
function ResumeTimeTracking(){WriteToDebug("In ResumeTimeTracking");ClearErrorInfo();WriteToDebug("Setting dtmStart to now");dtmStart=new Date();return true;}
function GetMaxTimeAllowed(){WriteToDebug("In GetMaxTimeAllowed");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return MAX_CMI_TIME;}
return objLMS.GetMaxTimeAllowed();}
function DisplayMessageOnTimeout(){WriteToDebug("In DisplayMessageOnTimeOut");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.DisplayMessageOnTimeout();}
function ExitOnTimeout(){WriteToDebug("In ExitOnTimeOut");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.ExitOnTimeout();}
function GetPassingScore(){WriteToDebug("In GetPassingScore");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return 0;}
return objLMS.GetPassingScore();}
function GetScore(){WriteToDebug("In GetScore");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return 0;}
return objLMS.GetScore();}
function GetScaledScore(){WriteToDebug("In GetScaledScore");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return 0;}
return objLMS.GetScaledScore();}
function SetScore(intScore,intMaxScore,intMinScore){WriteToDebug("In SetScore, intScore="+intScore+", intMaxScore="+intMaxScore+", intMinScore="+intMinScore);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
if(!IsValidDecimal(intScore)){WriteToDebug("ERROR - intScore not a valid decimal");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Score passed to SetScore (not a valid decimal), intScore="+intScore);return false;}
if(!IsValidDecimal(intMaxScore)){WriteToDebug("ERROR - intMaxScore not a valid decimal");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Max Score passed to SetScore (not a valid decimal), intMaxScore="+intMaxScore);return false;}
if(!IsValidDecimal(intMinScore)){WriteToDebug("ERROR - intMinScore not a valid decimal");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Min Score passed to SetScore (not a valid decimal), intMinScore="+intMinScore);return false;}
WriteToDebug("Converting SCORES to floats");intScore=parseFloat(intScore);intMaxScore=parseFloat(intMaxScore);intMinScore=parseFloat(intMinScore);if(strLMSStandard=='SCORM')
{WriteToDebug("DEBUG - SCORM 1.2 so checking max score length");if(intScore<0||intScore>100){WriteToDebug("ERROR - intScore out of range");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Score passed to SetScore (must be between 0-100), intScore="+intScore);return false;}
if(intMaxScore<0||intMaxScore>100){WriteToDebug("ERROR - intMaxScore out of range");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Max Score passed to SetScore (must be between 0-100), intMaxScore="+intMaxScore);return false;}
if(intMinScore<0||intMinScore>100){WriteToDebug("ERROR - intMinScore out of range");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Min Score passed to SetScore (must be between 0-100), intMinScore="+intMinScore);return false;}}
if(SCORE_CAN_ONLY_IMPROVE===true){var previousScore=GetScore();if(previousScore!=null&&previousScore!=""&&previousScore>intScore){WriteToDebug("Previous score was greater than new score, configuration only allows scores to improve, returning.");return true;}}
WriteToDebug("Calling to LMS");return objLMS.SetScore(intScore,intMaxScore,intMinScore);}
function SetPointBasedScore(intScore,intMaxScore,intMinScore){WriteToDebug("In SetPointBasedScore, intScore="+intScore+", intMaxScore="+intMaxScore+", intMinScore="+intMinScore);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
if(!IsValidDecimal(intScore)){WriteToDebug("ERROR - intScore not a valid decimal");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Score passed to SetScore (not a valid decimal), intScore="+intScore);return false;}
if(!IsValidDecimal(intMaxScore)){WriteToDebug("ERROR - intMaxScore not a valid decimal");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Max Score passed to SetScore (not a valid decimal), intMaxScore="+intMaxScore);return false;}
if(!IsValidDecimal(intMinScore)){WriteToDebug("ERROR - intMinScore not a valid decimal");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Min Score passed to SetScore (not a valid decimal), intMinScore="+intMinScore);return false;}
WriteToDebug("Converting SCORES to floats");intScore=parseFloat(intScore);intMaxScore=parseFloat(intMaxScore);intMinScore=parseFloat(intMinScore);if(strLMSStandard=='SCORM')
{if(intScore<0||intScore>100){WriteToDebug("ERROR - intScore out of range");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Score passed to SetScore (must be between 0-100), intScore="+intScore);return false;}
if(intMaxScore<0||intMaxScore>100){WriteToDebug("ERROR - intMaxScore out of range");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Max Score passed to SetScore (must be between 0-100), intMaxScore="+intMaxScore);return false;}
if(intMinScore<0||intMinScore>100){WriteToDebug("ERROR - intMinScore out of range");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Min Score passed to SetScore (must be between 0-100), intMinScore="+intMinScore);return false;}}
if(SCORE_CAN_ONLY_IMPROVE===true){var previousScore=GetScore();if(previousScore!=null&&previousScore!=""&&previousScore>intScore){WriteToDebug("Previous score was greater than new score, configuration only allows scores to improve, returning.");return true;}}
WriteToDebug("Calling to LMS");return objLMS.SetPointBasedScore(intScore,intMaxScore,intMinScore);}
function CreateResponseIdentifier(strShort,strLong){if(strShort.replace(" ","")==""){WriteToDebug("Short Identifier is empty");SetErrorInfo(ERROR_INVALID_ID,"Invalid short identifier, strShort="+strShort);return false;}
if(strShort.length!=1){WriteToDebug("ERROR - Short Identifier  not 1 character");SetErrorInfo(ERROR_INVALID_ID,"Invalid short identifier, strShort="+strShort);return false;}
if(!IsAlphaNumeric(strShort)){WriteToDebug("ERROR - Short Identifier  not alpha numeric");SetErrorInfo(ERROR_INVALID_ID,"Invalid short identifier, strShort="+strShort);return false;}
strShort=strShort.toLowerCase();strLong=CreateValidIdentifier(strLong);return new ResponseIdentifier(strShort,strLong);}
function ResponseIdentifier(strShort,strLong){this.Short=new String(strShort);this.Long=new String(strLong);this.toString=function(){return"[Response Identifier "+this.Short+", "+this.Long+"]";};}
function MatchingResponse(source,target){if(source.constructor==String){source=CreateResponseIdentifier(source,source);}
if(target.constructor==String){target=CreateResponseIdentifier(target,target);}
this.Source=source;this.Target=target;this.toString=function(){return"[Matching Response "+this.Source+", "+this.Target+"]";};}
function CreateMatchingResponse(pattern)
{var aryPairs=new Array();var aryEachPair=new Array();pattern=new String(pattern);aryPairs=pattern.split("[,]");for(var i=0;i<aryPairs.length;i++)
{var thisPair=new String(aryPairs[i]);aryEachPair=thisPair.split("[.]");WriteToDebug("Matching Response ["+i+"]  source: "+aryEachPair[0]+"  target: "+aryEachPair[1]);aryPairs[i]=new MatchingResponse(aryEachPair[0],aryEachPair[1]);}
WriteToDebug("pattern: "+pattern+" becomes "+aryPairs[0]);if(aryPairs.length==0)return aryPairs[0];else return aryPairs;}
function CreateValidIdentifier(str){if(objLMS.Standard==="SCORM"||objLMS.Standard==="AICC"){return CreateValidIdentifierLegacy(str);}else{return CreateUriIdentifier(str,objLMS.Standard==="TCAPI");}}
function CreateUriIdentifier(str,iri){if(str===undefined||str===null||str==="")
{return"";}
str=Trim(str);var uri=new URI(str);if(!uri.is('absolute'))
{str='urn:scormdriver:'+encodeURIComponent(str);uri=new URI(str);}
uri.normalize();if(iri){uri.iri();}
return uri.toString();}
function CreateValidIdentifierLegacy(str){if(str!=null||str!=""){str=new String(str);str=Trim(str);if(str.toLowerCase().indexOf("urn:")==0){str=str.substr(4);}
str=str.replace(/[^\w\-\(\)\+\.\:\=\@\;\$\_\!\*\'\%]/g,"_");return str;}else{return"";}}
function Trim(str){str=str+'';str=str.replace(/^\s*/,"");str=str.replace(/\s*$/,"");return str;}
function RecordTrueFalseInteraction(strID,blnResponse,blnCorrect,blnCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID){strID=CreateValidIdentifier(strID);strLearningObjectiveID=CreateValidIdentifier(strLearningObjectiveID);WriteToDebug("In RecordTrueFalseInteraction strID="+strID+", blnResponse="+blnResponse+", blnCorrect="+blnCorrect+", blnCorrectResponse="+blnCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID);if(!(typeof(DO_NOT_REPORT_INTERACTIONS)=="undefined")&&DO_NOT_REPORT_INTERACTIONS===true){WriteToDebug("Configuration specifies interactions should not be reported, exiting.");return true;}
ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
if(blnResponse!=true&&blnResponse!=false){SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The Response parameter must be a valid boolean value.");return false;}
if(blnCorrectResponse!=null&&blnCorrectResponse!=true&&blnCorrectResponse!=false){SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The Correct Response parameter must be a valid boolean value or null.");return false;}
var dtmTime=new Date();WriteToDebug("Calling to LMS");return objLMS.RecordTrueFalseInteraction(strID,blnResponse,blnCorrect,blnCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime);}
function RecordMultipleChoiceInteraction(strID,response,blnCorrect,correctResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID){strID=CreateValidIdentifier(strID);strLearningObjectiveID=CreateValidIdentifier(strLearningObjectiveID);WriteToDebug("In RecordMultipleChoiceInteraction strID="+strID+", response="+response+", blnCorrect="+blnCorrect+", correctResponse="+correctResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID);if(!(typeof(DO_NOT_REPORT_INTERACTIONS)=="undefined")&&DO_NOT_REPORT_INTERACTIONS===true){WriteToDebug("Configuration specifies interactions should not be reported, exiting.");return true;}
ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
strID=new String(strID);var aryResponse;var aryCorrectResponse;if(response.constructor==String){aryResponse=new Array();var responseIdentifier=CreateResponseIdentifier(response,response);if(responseIdentifier==false){SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The response is not in the correct format");return false;}
aryResponse[0]=responseIdentifier;}
else if(response.constructor==ResponseIdentifier){aryResponse=new Array();aryResponse[0]=response;}
else if(response.constructor==Array||response.constructor.toString().search("Array")>0){aryResponse=response;}
else if(window.console&&response.constructor.toString()=='(Internal Function)'&&response.length>0){aryResponse=response;}
else{if(window.console){window.console.log("ERROR_INVALID_INTERACTION_RESPONSE :: The response is not in the correct format.");}
SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The response is not in the correct format");return false;}
if(correctResponse!=null&&correctResponse!=undefined&&correctResponse!=""){if(correctResponse.constructor==String){aryCorrectResponse=new Array();responseIdentifier=CreateResponseIdentifier(correctResponse,correctResponse);if(responseIdentifier==false){SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The correct response is not in the correct format");return false;}
aryCorrectResponse[0]=responseIdentifier;}
else if(correctResponse.constructor==ResponseIdentifier){aryCorrectResponse=new Array();aryCorrectResponse[0]=correctResponse;}
else if(correctResponse.constructor==Array||correctResponse.constructor.toString().search("Array")>0){aryCorrectResponse=correctResponse;}
else if(window.console&&correctResponse.constructor.toString()=='(Internal Function)'&&correctResponse.length>0){aryCorrectResponse=correctResponse;}
else{SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The correct response is not in the correct format");return false;}}
else{aryCorrectResponse=new Array();}
var dtmTime=new Date();WriteToDebug("Calling to LMS");return objLMS.RecordMultipleChoiceInteraction(strID,aryResponse,blnCorrect,aryCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime);}
function RecordFillInInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID){strID=CreateValidIdentifier(strID);strLearningObjectiveID=CreateValidIdentifier(strLearningObjectiveID);WriteToDebug("In RecordFillInInteraction strID="+strID+", strResponse="+strResponse+", blnCorrect="+blnCorrect+", strCorrectResponse="+strCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID);if(!(typeof(DO_NOT_REPORT_INTERACTIONS)=="undefined")&&DO_NOT_REPORT_INTERACTIONS===true){WriteToDebug("Configuration specifies interactions should not be reported, exiting.");return true;}
ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
var dtmTime=new Date();WriteToDebug("Calling to LMS");return objLMS.RecordFillInInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime);}
function RecordMatchingInteraction(strID,response,blnCorrect,correctResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID){strID=CreateValidIdentifier(strID);strLearningObjectiveID=CreateValidIdentifier(strLearningObjectiveID);WriteToDebug("In RecordMatchingInteraction strID="+strID+", response="+response+", blnCorrect="+blnCorrect+", correctResponse="+correctResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID);if(!(typeof(DO_NOT_REPORT_INTERACTIONS)=="undefined")&&DO_NOT_REPORT_INTERACTIONS===true){WriteToDebug("Configuration specifies interactions should not be reported, exiting.");return true;}
ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
var aryResponse;var aryCorrectResponse;if(response.constructor==MatchingResponse){aryResponse=new Array();aryResponse[0]=response;}
else if(response.constructor==Array||response.constructor.toString().search("Array")>0){aryResponse=response;}
else if(window.console&&response.constructor.toString()=='(Internal Function)'&&response.length>0){aryResponse=response;}
else{SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The response is not in the correct format");return false;}
if(correctResponse!=null&&correctResponse!=undefined){if(correctResponse.constructor==MatchingResponse){aryCorrectResponse=new Array();aryCorrectResponse[0]=correctResponse;}
else if(correctResponse.constructor==Array||correctResponse.constructor.toString().search("Array")>0){aryCorrectResponse=correctResponse;}
else if(window.console&&correctResponse.constructor.toString()=='(Internal Function)'&&correctResponse.length>0){aryCorrectResponse=correctResponse;}
else{SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The response is not in the correct format");return false;}}
else{aryCorrectResponse=new Array();}
var dtmTime=new Date();WriteToDebug("Calling to LMS");return objLMS.RecordMatchingInteraction(strID,aryResponse,blnCorrect,aryCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime);}
function RecordPerformanceInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID){strID=CreateValidIdentifier(strID);strLearningObjectiveID=CreateValidIdentifier(strLearningObjectiveID);WriteToDebug("In RecordPerformanceInteraction strID="+strID+", strResponse="+strResponse+", blnCorrect="+blnCorrect+", strCorrectResponse="+strCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID);if(!(typeof(DO_NOT_REPORT_INTERACTIONS)=="undefined")&&DO_NOT_REPORT_INTERACTIONS===true){WriteToDebug("Configuration specifies interactions should not be reported, exiting.");return true;}
ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
var dtmTime=new Date();WriteToDebug("Calling to LMS");return objLMS.RecordPerformanceInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime);}
function RecordSequencingInteraction(strID,response,blnCorrect,correctResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID){strID=CreateValidIdentifier(strID);strLearningObjectiveID=CreateValidIdentifier(strLearningObjectiveID);WriteToDebug("In RecordSequencingInteraction strID="+strID+", response="+response+", blnCorrect="+blnCorrect+", correctResponse="+correctResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID);if(!(typeof(DO_NOT_REPORT_INTERACTIONS)=="undefined")&&DO_NOT_REPORT_INTERACTIONS===true){WriteToDebug("Configuration specifies interactions should not be reported, exiting.");return true;}
ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
var aryResponse;var aryCorrectResponse;if(response.constructor==String){aryResponse=new Array();var responseIdentifier=CreateResponseIdentifier(response,response);if(responseIdentifier==false){SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The response is not in the correct format");return false;}
aryResponse[0]=responseIdentifier;}
else if(response.constructor==ResponseIdentifier){aryResponse=new Array();aryResponse[0]=response;}
else if(response.constructor==Array||response.constructor.toString().search("Array")>0){aryResponse=response;}
else if(window.console&&response.constructor.toString()=='(Internal Function)'&&response.length>0){aryResponse=response;}
else{SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The response is not in the correct format");return false;}
if(correctResponse!=null&&correctResponse!=undefined&&correctResponse!=""){if(correctResponse.constructor==String){aryCorrectResponse=new Array();responseIdentifier=CreateResponseIdentifier(correctResponse,correctResponse);if(responseIdentifier==false){SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The correct response is not in the correct format");return false;}
aryCorrectResponse[0]=responseIdentifier;}
else if(correctResponse.constructor==ResponseIdentifier){aryCorrectResponse=new Array();aryCorrectResponse[0]=correctResponse;}
else if(correctResponse.constructor==Array||correctResponse.constructor.toString().search("Array")>0){aryCorrectResponse=correctResponse;}
else if(window.console&&correctResponse.constructor.toString()=='(Internal Function)'&&correctResponse.length>0){aryCorrectResponse=correctResponse;}
else{SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The correct response is not in the correct format");return false;}}
else{aryCorrectResponse=new Array();}
var dtmTime=new Date();WriteToDebug("Calling to LMS");return objLMS.RecordSequencingInteraction(strID,aryResponse,blnCorrect,aryCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime);}
function RecordLikertInteraction(strID,response,blnCorrect,correctResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID){strID=CreateValidIdentifier(strID);strLearningObjectiveID=CreateValidIdentifier(strLearningObjectiveID);WriteToDebug("In RecordLikertInteraction strID="+strID+", response="+response+", blnCorrect="+blnCorrect+", correctResponse="+correctResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID);if(!(typeof(DO_NOT_REPORT_INTERACTIONS)=="undefined")&&DO_NOT_REPORT_INTERACTIONS===true){WriteToDebug("Configuration specifies interactions should not be reported, exiting.");return true;}
ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
var riResponse;var riCorrectResponse;if(response.constructor==String){riResponse=CreateResponseIdentifier(response,response);}
else if(response.constructor==ResponseIdentifier){riResponse=response;}
else{SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The response is not in the correct format");return false;}
if(correctResponse==null||correctResponse==undefined){riCorrectResponse=null;}
else if(correctResponse.constructor==ResponseIdentifier){riCorrectResponse=correctResponse;}
else if(correctResponse.constructor==String){riCorrectResponse=CreateResponseIdentifier(correctResponse,correctResponse);}
else{SetErrorInfo(ERROR_INVALID_INTERACTION_RESPONSE,"The response is not in the correct format");return false;}
var dtmTime=new Date();WriteToDebug("Calling to LMS");return objLMS.RecordLikertInteraction(strID,riResponse,blnCorrect,riCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime);}
function RecordNumericInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID){strID=CreateValidIdentifier(strID);strLearningObjectiveID=CreateValidIdentifier(strLearningObjectiveID);WriteToDebug("In RecordNumericInteraction strID="+strID+", strResponse="+strResponse+", blnCorrect="+blnCorrect+", strCorrectResponse="+strCorrectResponse+", strDescription="+strDescription+", intWeighting="+intWeighting+", intLatency="+intLatency+", strLearningObjectiveID="+strLearningObjectiveID);if(!(typeof(DO_NOT_REPORT_INTERACTIONS)=="undefined")&&DO_NOT_REPORT_INTERACTIONS===true){WriteToDebug("Configuration specifies interactions should not be reported, exiting.");return true;}
ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
if(!IsValidDecimal(strResponse)){WriteToDebug("ERROR - Invalid Response, not a valid decmial");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Response passed to RecordNumericInteraction (not a valid decimal), strResponse="+strResponse);return false;}
if(strCorrectResponse!=undefined&&strCorrectResponse!=null&&IsValidDecimal(strCorrectResponse)==false){WriteToDebug("ERROR - Invalid Correct Response, not a valid decmial");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Correct Response passed to RecordNumericInteraction (not a valid decimal), strCorrectResponse="+strCorrectResponse);return false;}
var dtmTime=new Date();WriteToDebug("Calling to LMS");return objLMS.RecordNumericInteraction(strID,strResponse,blnCorrect,strCorrectResponse,strDescription,intWeighting,intLatency,strLearningObjectiveID,dtmTime);}
function GetStatus(){WriteToDebug("In GetStatus");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return LESSON_STATUS_INCOMPLETE;}
return objLMS.GetStatus();}
function ResetStatus(){WriteToDebug("In ResetStatus");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
WriteToDebug("Setting blnStatusWasSet to false");blnStatusWasSet=false;return objLMS.ResetStatus();}
function GetProgressMeasure(){WriteToDebug("In GetProgressMeasure");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return LESSON_STATUS_INCOMPLETE;}
return objLMS.GetProgressMeasure();}
function SetProgressMeasure(numMeasure){WriteToDebug("In SetProgressMeasure, passing in: "+numMeasure);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return LESSON_STATUS_INCOMPLETE;}
return objLMS.SetProgressMeasure(numMeasure);}
function SetPassed(){WriteToDebug("In SetPassed");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
WriteToDebug("Setting blnStatusWasSet to true");blnStatusWasSet=true;return objLMS.SetPassed();}
function SetFailed(){WriteToDebug("In SetFailed");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
WriteToDebug("Setting blnStatusWasSet to true");blnStatusWasSet=true;return objLMS.SetFailed();}
function GetEntryMode(){WriteToDebug("In GetEntryMode");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return ENTRY_FIRST_TIME;}
return objLMS.GetEntryMode();}
function GetLessonMode(){WriteToDebug("In GetLessonMode");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return MODE_NORMAL;}
return objLMS.GetLessonMode();}
function GetTakingForCredit(){WriteToDebug("In GetTakingForCredit");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetTakingForCredit();}
function SetObjectiveScore(strObjectiveID,intScore,intMaxScore,intMinScore){WriteToDebug("In SetObjectiveScore, intObjectiveID="+strObjectiveID+", intScore="+intScore+", intMaxScore="+intMaxScore+", intMinScore="+intMinScore);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
strObjectiveID=new String(strObjectiveID);if(strObjectiveID.replace(" ","")==""){WriteToDebug("ERROR - Invalid ObjectiveID, empty string");SetErrorInfo(ERROR_INVALID_ID,"Invalid ObjectiveID passed to SetObjectiveScore (must have a value), strObjectiveID="+strObjectiveID);return false;}
if(!IsValidDecimal(intScore)){WriteToDebug("ERROR - Invalid Score, not a valid decmial");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Score passed to SetObjectiveScore (not a valid decimal), intScore="+intScore);return false;}
if(!IsValidDecimal(intMaxScore)){WriteToDebug("ERROR - Invalid Max Score, not a valid decmial");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Max Score passed to SetObjectiveScore (not a valid decimal), intMaxScore="+intMaxScore);return false;}
if(!IsValidDecimal(intMinScore)){WriteToDebug("ERROR - Invalid Min Score, not a valid decmial");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Min Score passed to SetObjectiveScore (not a valid decimal), intMinScore="+intMinScore);return false;}
WriteToDebug("Converting Scores to floats");intScore=parseFloat(intScore);intMaxScore=parseFloat(intMaxScore);intMinScore=parseFloat(intMinScore);if(intScore<0||intScore>100){WriteToDebug("ERROR - Invalid Score, out of range");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Score passed to SetObjectiveScore (must be between 0-100), intScore="+intScore);return false;}
if(intMaxScore<0||intMaxScore>100){WriteToDebug("ERROR - Invalid Max Score, out of range");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Max Score passed to SetObjectiveScore (must be between 0-100), intMaxScore="+intMaxScore);return false;}
if(intMinScore<0||intMinScore>100){WriteToDebug("ERROR - Invalid Min Score, out of range");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Min Score passed to SetObjectiveScore (must be between 0-100), intMinScore="+intMinScore);return false;}
WriteToDebug("Calling To LMS");return objLMS.SetObjectiveScore(strObjectiveID,intScore,intMaxScore,intMinScore);}
function SetObjectiveStatus(strObjectiveID,Lesson_Status){WriteToDebug("In SetObjectiveStatus strObjectiveID="+strObjectiveID+", Lesson_Status="+Lesson_Status);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
strObjectiveID=new String(strObjectiveID);if(strObjectiveID.replace(" ","")==""){WriteToDebug("ERROR - Invalid ObjectiveID, empty string");SetErrorInfo(ERROR_INVALID_ID,"Invalid ObjectiveID passed to SetObjectiveStatus (must have a value), strObjectiveID="+strObjectiveID);return false;}
if((Lesson_Status!=LESSON_STATUS_PASSED)&&(Lesson_Status!=LESSON_STATUS_COMPLETED)&&(Lesson_Status!=LESSON_STATUS_FAILED)&&(Lesson_Status!=LESSON_STATUS_INCOMPLETE)&&(Lesson_Status!=LESSON_STATUS_BROWSED)&&(Lesson_Status!=LESSON_STATUS_NOT_ATTEMPTED)){WriteToDebug("ERROR - Invalid Status");SetErrorInfo(ERROR_INVALID_STATUS,"Invalid status passed to SetObjectiveStatus, Lesson_Status="+Lesson_Status);return false;}
WriteToDebug("Calling To LMS");return objLMS.SetObjectiveStatus(strObjectiveID,Lesson_Status);}
function GetObjectiveStatus(strObjectiveID){WriteToDebug("In GetObjectiveStatus, strObjectiveID="+strObjectiveID);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetObjectiveStatus(strObjectiveID);}
function SetObjectiveDescription(strObjectiveID,strObjectiveDescription){WriteToDebug("In SetObjectiveDescription strObjectiveID="+strObjectiveID+", strObjectiveDescription="+strObjectiveDescription);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
strObjectiveID=new String(strObjectiveID);if(strObjectiveID.replace(" ","")==""){WriteToDebug("ERROR - Invalid ObjectiveID, empty string");SetErrorInfo(ERROR_INVALID_ID,"Invalid ObjectiveID passed to SetObjectiveStatus (must have a value), strObjectiveID="+strObjectiveID);return false;}
WriteToDebug("Calling To LMS");return objLMS.SetObjectiveDescription(strObjectiveID,strObjectiveDescription);}
function GetObjectiveDescription(strObjectiveID){WriteToDebug("In GetObjectiveDescription, strObjectiveID="+strObjectiveID);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetObjectiveDescription(strObjectiveID);}
function GetObjectiveScore(strObjectiveID){WriteToDebug("In GetObjectiveScore, strObjectiveID="+strObjectiveID);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetObjectiveScore(strObjectiveID);}
function IsLmsPresent(){return blnLmsPresent;}
function SetObjectiveProgressMeasure(strObjectiveID,strObjectiveProgressMeasure){WriteToDebug("In SetObjectiveProgressMeasure strObjectiveID="+strObjectiveID+", strObjectiveProgressMeasure="+strObjectiveProgressMeasure);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
strObjectiveID=new String(strObjectiveID);if(strObjectiveID.replace(" ","")==""){WriteToDebug("ERROR - Invalid ObjectiveID, empty string");SetErrorInfo(ERROR_INVALID_ID,"Invalid ObjectiveID passed to SetObjectiveProgressMeasure (must have a value), strObjectiveID="+strObjectiveID);return false;}
WriteToDebug("Calling To LMS");return objLMS.SetObjectiveProgressMeasure(strObjectiveID,strObjectiveProgressMeasure);}
function GetObjectiveProgressMeasure(strObjectiveID){WriteToDebug("In GetObjectiveProgressMeasure, strObjectiveID="+strObjectiveID);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetObjectiveProgressMeasure(strObjectiveID);}
function SetNavigationRequest(strNavRequest){WriteToDebug("In SetNavigationRequest");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.SetNavigationRequest(strNavRequest);}
function GetNavigationRequest(){WriteToDebug("In GetNavigationRequest");ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetNavigationRequest();}
function GetInteractionType(strInteractionID)
{strInteractionID=CreateValidIdentifier(strInteractionID);WriteToDebug("In GetInteractionType, strInteractionID="+strInteractionID);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetInteractionType(strInteractionID);}
function GetInteractionTimestamp(strInteractionID)
{strInteractionID=CreateValidIdentifier(strInteractionID);WriteToDebug("In GetInteractionTimestamp, strInteractionID="+strInteractionID);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetInteractionTimestamp(strInteractionID);}
function GetInteractionCorrectResponses(strInteractionID)
{strInteractionID=CreateValidIdentifier(strInteractionID);WriteToDebug("In GetInteractionCorrectResponses, strInteractionID="+strInteractionID);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetInteractionCorrectResponses(strInteractionID);}
function GetInteractionWeighting(strInteractionID)
{strInteractionID=CreateValidIdentifier(strInteractionID);WriteToDebug("In GetInteractionWeighting, strInteractionID="+strInteractionID);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetInteractionWeighting(strInteractionID);}
function GetInteractionLearnerResponses(strInteractionID)
{strInteractionID=CreateValidIdentifier(strInteractionID);WriteToDebug("In GetInteractionLearnerResponses, strInteractionID="+strInteractionID);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetInteractionLearnerResponses(strInteractionID);}
function GetInteractionResult(strInteractionID)
{strInteractionID=CreateValidIdentifier(strInteractionID);WriteToDebug("In GetInteractionResult, strInteractionID="+strInteractionID);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetInteractionResult(strInteractionID);}
function GetInteractionLatency(strInteractionID)
{strInteractionID=CreateValidIdentifier(strInteractionID);WriteToDebug("In GetInteractionLatency, strInteractionID="+strInteractionID);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetInteractionLatency(strInteractionID);}
function GetInteractionDescription(strInteractionID)
{strInteractionID=CreateValidIdentifier(strInteractionID);WriteToDebug("In GetInteractionDescription, strInteractionID="+strInteractionID);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
return objLMS.GetInteractionDescription(strInteractionID);}
function CreateDataBucket(strBucketId,intMinSize,intMaxSize){WriteToDebug("In CreateDataBucket, strBucketId="+strBucketId+", intMinSize="+intMinSize+", intMaxSize="+intMaxSize);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
strBucketId=new String(strBucketId);if(strBucketId.replace(" ","")==""){WriteToDebug("ERROR - Invalid BucketId, empty string");SetErrorInfo(ERROR_INVALID_ID,"Invalid strBucketId passed to CreateDataBucket (must have a value), strBucketId="+strBucketId);return false;}
if(!ValidInteger(intMinSize)){WriteToDebug("ERROR Invalid Min Size, not an integer");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid intMinSize passed to CreateDataBucket (not an integer), intMinSize="+intMinSize);return false;}
if(!ValidInteger(intMaxSize)){WriteToDebug("ERROR Invalid Max Size, not an integer");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid intMaxSize passed to CreateDataBucket (not an integer), intMaxSize="+intMaxSize);return false;}
intMinSize=parseInt(intMinSize,10);intMaxSize=parseInt(intMaxSize,10);if(intMinSize<0){WriteToDebug("ERROR Invalid Min Size, must be greater than or equal to 0");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Min Size passed to CreateDataBucket (must be greater than or equal to 0), intMinSize="+intMinSize);return false;}
if(intMaxSize<=0){WriteToDebug("ERROR Invalid Max Size, must be greater than 0");SetErrorInfo(ERROR_INVALID_NUMBER,"Invalid Max Size passed to CreateDataBucket (must be greater than 0), intMaxSize="+intMaxSize);return false;}
intMinSize=(intMinSize*2);intMaxSize=(intMaxSize*2);return objLMS.CreateDataBucket(strBucketId,intMinSize,intMaxSize);}
function GetDataFromBucket(strBucketId){WriteToDebug("In GetDataFromBucket, strBucketId="+strBucketId);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
strBucketId=new String(strBucketId);if(strBucketId.replace(" ","")==""){WriteToDebug("ERROR - Invalid BucketId, empty string");SetErrorInfo(ERROR_INVALID_ID,"Invalid strBucketId passed to GetDataFromBucket (must have a value), strBucketId="+strBucketId);return false;}
return objLMS.GetDataFromBucket(strBucketId);}
function PutDataInBucket(strBucketId,strData,blnAppendToEnd){WriteToDebug("In PutDataInBucket, strBucketId="+strBucketId+", blnAppendToEnd="+blnAppendToEnd+", strData="+strData);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
strBucketId=new String(strBucketId);if(strBucketId.replace(" ","")==""){WriteToDebug("ERROR - Invalid BucketId, empty string");SetErrorInfo(ERROR_INVALID_ID,"Invalid strBucketId passed to PutDataInBucket (must have a value), strBucketId="+strBucketId);return false;}
if(blnAppendToEnd!=true){WriteToDebug("blnAppendToEnd was not explicitly true so setting it to false, blnAppendToEnd="+blnAppendToEnd);blnAppendToEnd=false;}
return objLMS.PutDataInBucket(strBucketId,strData,blnAppendToEnd);}
function DetectSSPSupport(){return objLMS.DetectSSPSupport();}
function GetBucketInfo(strBucketId){WriteToDebug("In GetBucketInfo, strBucketId="+strBucketId);ClearErrorInfo();if(!IsLoaded()){SetErrorInfo(ERROR_NOT_LOADED,"Cannot make calls to the LMS before calling Start");return false;}
strBucketId=new String(strBucketId);if(strBucketId.replace(" ","")==""){WriteToDebug("ERROR - Invalid BucketId, empty string");SetErrorInfo(ERROR_INVALID_ID,"Invalid strBucketId passed to GetBucketInfo (must have a value), strBucketId="+strBucketId);return false;}
var bucketInfo=objLMS.GetBucketInfo(strBucketId);bucketInfo.TotalSpace=(bucketInfo.TotalSpace/2);bucketInfo.UsedSpace=(bucketInfo.UsedSpace/2);WriteToDebug("GetBucketInfo returning "+bucketInfo);return bucketInfo;}
function SSPBucketSize(totalSpace,usedSpace){this.TotalSpace=totalSpace;this.UsedSpace=usedSpace;this.toString=function(){return"[SSPBucketSize "+this.TotalSpace+", "+this.UsedSpace+"]";};}
var textFile = null,
  makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});
    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(data);
    // returns a URL you can use as a href
    return textFile;
  };
function downloadDebugLogs()
{
	var iframeTag = getDebugLogsIFrame();
	var debugDoc = iframeTag.contentWindow.document;
	var logTags = debugDoc.getElementsByClassName("debugLog");
	var textString;
	var i;
	for(i=0;i<logTags.length;i++)
	{
		var text= logTags[i].innerHTML;
		textString +=text;
		textString+="\n";
	}
	var save = window.parent.document.createElement('a');
	save.href = makeTextFile(textString);;
	save.target = '_blank';
	save.download = "DebugLogs.log";

	var event = document.createEvent('Event');
	event.initEvent('click', true, true);
	save.dispatchEvent(event);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
}
function createButtonToggleEvent(){
    document.getElementById("toggleDebugWindowButton").onclick = toggleDebugWindow;
}
function toggleDebugWindow()
{
	var debugIframeDiv = window.parent.document.getElementById("debugWinHolder");
	if(debugIframeDiv.style.display == "block") 
	{
		debugIframeDiv.style.display = "none";
		window.parent.document.getElementById("toggleDebugWindowButton").innerHTML = "Display Debug logs";
	}
	else
	{	
		debugIframeDiv.style.display = "block";
		document.getElementById("toggleDebugWindowButton").innerHTML = "Hide Debug logs";
	}
}
function SizeDisplay()
{
	var iframeTag = getDebugLogsIFrame();
	var debugDoc = iframeTag.contentWindow.document;
	debugDoc.getElementById('myButton').innerHTML = String(window.parent.innerHeight);
}
function getDebugLogsIFrame()
{
    var lCurrentWindow = window;
    var lNoOfLoops = 0;
    if(lCurrentWindow)
    {
        while(1)
        {
            if(lCurrentWindow.document.getElementById("debugWin"))
            {
                return lCurrentWindow.document.getElementById("debugWin");
            }
            var lParentWindow = lCurrentWindow.parent;
            if(lParentWindow == lCurrentWindow)
                return "";
            if(lParentWindow == undefined)
                return "";
            lCurrentWindow = lParentWindow;
            lNoOfLoops +=1;
            if(lNoOfLoops > 10)
                return "";
        }
    }
}
var g_backgroundColor="#FFFFFF";
function setBackgroundColorForLogs(aColor)
{
    g_backgroundColor = aColor;
}
function getBackgroundColorForLogs()
{
    return g_backgroundColor;
}