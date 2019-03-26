var CONFIG = {
				COURSETITLE			: "Service Excellent",
				FILENAME			: "index_scorm.html",
				BGCOLOR				: "#f5f4f1",
				FPVERSION			: "",
				COURSE_WIDTH		: "800",
				COURSE_HEIGHT		: "600",
				WMODE				: "",
				TARGET				: "CaptivateContent",
				RIGHTCLICKENABLED	: '',
				SWFOBJ_ID			: 'Captivate',
				SWFOBJ_NAME			: 'Captivate',
				REDIRECT_URL		:  "http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash",
				NOSCRIPT_MSG		: "This course requires JavaScript to be enabled in your browser. Please enable JavaScript, then relaunch the course.",
                SEAMLESS_TABBING    : ""
			},
	makeCallsToDriver	= false,
	CaptivateObj;


var m_StudentName ; 
	
	
var m_currentWindow = window;
var m_parentWindow = window.parent;
var m_topWindow = window.top;
try
{
    if(m_parentWindow.document)
        var cmt = "tring to access document of parent window";
}
catch(e)
{
    m_parentWindow = m_currentWindow;
}
try
{
    if(m_topWindow.document)
        var cmt = "tring to access document of top window";
}
catch(e)
{
    m_topWindow = m_currentWindow;
    try
    {
        while(m_topm_parentWindow.document)
            m_topWindow = m_topm_parentWindow;
    }
    catch(e)
    {}
}
	
function DoFinish()
{
	/*	call Unload() only if the SWF was embedded
		else redirect action will also call this leading to 
		uexpected results
	*/
    var lRunningInConnect = false ;
    var lRunningInConnectFunctionExists = false ;

    lRunningInConnectFunctionExists = m_parentWindow && m_parentWindow.IsRunningInConnect && typeof m_parentWindow.IsRunningInConnect === 'function' ;
    lRunningInConnect =  lRunningInConnectFunctionExists && m_parentWindow.IsRunningInConnect() ;
    
    if(!lRunningInConnect)
    {
    	if(CaptivateObj)
    	{
    		CaptivateObj.flushSwfQueue();
    		CommitData();
    		Unload();
    	}
    }
}
			

/*
	In AICC the result can be the following strings: correct, wrong, unanticipated, neutral
	In SCORM the possible values can be: correct, incorrect, unanticipated, neutral
	
	Map these to the corresponding constants in the RUSTICI SCORM driver
	"incorrect" in SCORM is mapped to the contant INTERACTION_RESULT_WRONG
*/
function ConvertToInteractionResultConstant(token_str) {


    var c = token_str.toLowerCase();
    var interactionResult;
    switch (c) {
    case "correct":
        interactionResult = INTERACTION_RESULT_CORRECT;
        break;

    case "wrong":
        interactionResult = INTERACTION_RESULT_WRONG;
        break;

    case "unanticipated":
        interactionResult = INTERACTION_RESULT_UNANTICIPATED;
        break;

    case "neutral":
        interactionResult = INTERACTION_RESULT_NEUTRAL;
        break;

    case "incorrect":
        interactionResult = INTERACTION_RESULT_WRONG;
        break;

    default:
        trace("Could not find appropriate token for interaction result! -" + token_str);

    }

    return interactionResult;
}

function CPHasStudentName()
{
	return true;
}	

function CPGetStudentName()
{
    if(m_StudentName)
    {
        return m_StudentName ;
    }
    var lStudentName = GetStudentName();
    var lLastError = GetLastError();
    if(lLastError === 0 )
    {
        m_StudentName = lStudentName ;
    }
    return lStudentName ;
}




/*Call handler for EI calls
Note the EI calls do not call the scormdriver API functions directly;
There is an additonal level of indirection; in some cases, there is additional 
processing to be done.
*/

function Captivate_DoExternalInterface() {

    trace("\nRecd EI call:" + Array.prototype.slice.call(arguments).join(":"));

    //Interaction data related vars
    var interactionID_str, 
		correctResponse_str, 
		weight_int, 
		studentResponse_str, 
		result_str, 
		latency_int, 
		objectiveID_str, 
		descriptionTexts,
		question_text = "";
    
    


    if (arguments.length < 1) {
        trace("Insufficient arguments to EI call");
        return;
    }


    var CmdToExecute = new String(arguments[0]),
    	SetVal = arguments[1],
    	strErr = "true",
    	retValForSWF = "",
    	lastArg = arguments[arguments.length - 1];
    	

    if (lastArg && lastArg != "") retValForSWF = lastArg;

    
   	// do nothing, if SCORM API is not available
    if (!makeCallsToDriver) {
        trace("Running instance of API not detected in  EI handler. Ignoring call.");
        return;
    }


    //check if this is an interaction related function - if so, get the individual data strings - this
    //is a temp. soln. till arity in Queue.as is officially increased
    if (CmdToExecute.indexOf("Interaction") > -1 && CmdToExecute.indexOf("Record") > -1) {

        trace("Found a record interaction call:" + CmdToExecute);

        var interaction_arr = SetVal;
        if (interaction_arr.length != 8) 
			trace("ERROR! Wrong number of interaction elements received!");

        interactionID_str = interaction_arr[0];
        correctResponse_str = interaction_arr[1];
        weight_int = parseInt(interaction_arr[2]);
        studentResponse_str = interaction_arr[3];
        result_str = ConvertToInteractionResultConstant(interaction_arr[4]);
        latency_int = parseInt(interaction_arr[5]);
        objectiveID_str = interaction_arr[6];
        descriptionTexts = interaction_arr[7];
		question_text = descriptionTexts.questionText;
		
        trace("Interaction Elements:");
        trace(interactionID_str);
        trace(correctResponse_str);
        trace(weight_int);
        trace(studentResponse_str);
        trace(result_str);
        trace(latency_int);
        trace(objectiveID_str);
        trace(descriptionTexts);
		
    }



    //the API has already been initialized - so shouldn't be initialized again
    //check whether its initialized and revert back
    if (CmdToExecute == "Start") {

        trace("Fwd:" + "Do nothing!");

        strErr = makeCallsToDriver;
        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);


    } else if (CmdToExecute == "SetExitSuspendAfterCompleted") {

        trace("Fwd:" + "SetExitSuspendAfterCompleted!");
        var lExitSuspendIfCompleted = (SetVal == "true" ? true : false);
        EXIT_SUSPEND_IF_COMPLETED = lExitSuspendIfCompleted;
        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);


    } else if (CmdToExecute == "SetExitNormalIfPassed") {

        trace("Fwd:" + "SetExitNormalIfPassed!");
        var lExitNormalIfPassed = (SetVal == "true" ? true : false);
        EXIT_NORMAL_IF_PASSED = lExitNormalIfPassed;
        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);


    } else if (CmdToExecute == "CommitData") {
        trace("Fwd:" + "CommitData");

        strErr = CommitData();

        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);

    } else if (CmdToExecute == "SetReachedEnd") {
        trace("Fwd:" + "SetReachedEnd:" + SetVal);

        strErr = SetReachedEnd();

        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);
    } else if (CmdToExecute == "SetDataChunk") {
        trace("Fwd:" + "SetDataChunk:" + SetVal);

        strErr = SetDataChunk(SetVal);

        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);
    } else if (CmdToExecute == "SetPassed") {
        trace("Fwd:" + "SetPassed");

        strErr = SetPassed();

        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);
    } else if (CmdToExecute == "SetProgressMeasure") {
        trace("Fwd:" + "SetProgressMeasure" + SetVal);

        strErr = SetProgressMeasure(SetVal);

        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);
    } else if (CmdToExecute == "SetFailed") {
        trace("Fwd:" + "SetFailed");

        strErr = SetFailed();

        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);
    } else if (CmdToExecute == "GetEntryMode") {
        trace("Fwd:" + "GetEntryMode:");

        strErr = GetEntryMode(SetVal);

        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);
    } else if (CmdToExecute == "SetBookmark") {
        trace("Fwd:" + "SetBookmark:" + SetVal);

        strErr = SetBookmark(SetVal);

        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);
    } else if (CmdToExecute == "SetSessionTime") {
        trace("Fwd:" + "SetSessionTime():" + SetVal);

        strErr = SetSessionTime(SetVal);

        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);
    } else if (CmdToExecute == "GetLastError") {
        trace("Fwd:" + "GetLastLMSErrorCode:");

        strErr = GetLastLMSErrorCode();

        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);
    } else if (CmdToExecute == "GetLastErrorDesc") {
        trace("Fwd:" + "GetLastErrorDesc:");

        strErr = GetLastErrorDesc();

        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);
    } else if (CmdToExecute == "SetScore") {
        trace("Fwd:" + "SetScore:" + SetVal);


        //var scores = String(SetVal).split("|");
        var scores = SetVal;
        trace(String(scores));
        strErr = SetScore(scores[0], scores[1], scores[2]);

        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);
    } else if (CmdToExecute == "SetPointBasedScore") {
        trace("Fwd:" + "SetPointBasedScore:" + SetVal);


        //var scores = String(SetVal).split("|");
        var scores = SetVal;
        trace(String(scores));
        strErr = SetPointBasedScore(scores[0], scores[1], scores[2]);

        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);
    } else if (CmdToExecute == "Suspend") {
        trace("Fwd:" + "Suspend:");

        strErr = Suspend();

        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);
    } else if (CmdToExecute == "GetDataChunk") {
        trace("Fwd:" + "GetDataChunk:");

        strErr = GetDataChunk();

        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);
    } else if (CmdToExecute == "ConcedeControl") {
        trace("Fwd:" + "ConcedeControl");

        strErr = ConcedeControl();

        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);

    } else if (CmdToExecute == "GetBookMark") {
        trace("Fwd:" + "GetBookMark():");

        strErr = GetBookmark();

        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);
    } else if (CmdToExecute == "GetLaunchData") {
        trace("Fwd:" + "GetLaunchData():");

        strErr = GetLaunchData();

        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);
    } else





    //Interaction set value handlers
    if (CmdToExecute == "RecordMultipleChoiceInteraction") {
        trace("Fwd:" + "RecordMultipleChoiceInteraction():");



        var correctResponse_arr = []
        var studentResponse_arr = []

        //get the answer text arrays
        var MCQ_answer_texts = descriptionTexts.answerTexts;

        var split_char_correctResponse = "";
        var split_char_studentResponse = "";

        if (correctResponse_str.indexOf(".") > -1) split_char_correctResponse = ".";
        if (correctResponse_str.indexOf(",") > -1) split_char_correctResponse = ",";

        if (studentResponse_str.indexOf(".") > -1) split_char_studentResponse = ".";
        if (studentResponse_str.indexOf(",") > -1) split_char_studentResponse = ",";


        trace("Split char correct:" + split_char_correctResponse);
        trace("Split char student:" + split_char_studentResponse);


        if (correctResponse_str != "") {
            if (split_char_correctResponse != "") {
                correctResponse_arr = correctResponse_str.split(split_char_correctResponse);
            } else {
                correctResponse_arr.push(correctResponse_str);
            }
        } else {
            correctResponse_arr.push("1"); // send in a dummy value here
        }

        if (studentResponse_str != "") {
            if (split_char_studentResponse != "") {
                studentResponse_arr = studentResponse_str.split(split_char_studentResponse);
            } else {
                studentResponse_arr.push(studentResponse_str);
            }
        } else {
            studentResponse_arr.push("1"); // send in a dummy value here
        }


        //create corresponding response identifier objects
        correctResponse_ResponIdent_arr = [];
        studentResponse_ResponIdent_arr = [];

        var idx = 0;

        if (MCQ_answer_texts)
      	{
			for (idx = 0; idx < correctResponse_arr.length; idx++) 
			{
				var lLongText = MCQ_answer_texts[correctResponse_arr[idx]];
				if((undefined == lLongText) || ("" == lLongText))
					lLongText = correctResponse_arr[idx];		
				correctResponse_ResponIdent_arr.push(CreateResponseIdentifier(correctResponse_arr[idx], lLongText));
			}
													
			for (idx = 0; idx < studentResponse_arr.length; idx++) 
			{
				var lLongText = MCQ_answer_texts[studentResponse_arr[idx]];
				if ((undefined == lLongText) || ("" == lLongText))
					lLongText = studentResponse_arr[idx];	
				studentResponse_ResponIdent_arr.push(CreateResponseIdentifier(studentResponse_arr[idx], lLongText));
			}	
        } 
		else 
		{
            for (idx = 0; idx < correctResponse_arr.length; idx++) 
				correctResponse_ResponIdent_arr.push(
												CreateResponseIdentifier(correctResponse_arr[idx], 
													correctResponse_arr[idx])
												);
												
            for (idx = 0; idx < studentResponse_arr.length; idx++) 
				studentResponse_ResponIdent_arr.push(
												CreateResponseIdentifier(studentResponse_arr[idx], 
													studentResponse_arr[idx])
												);

        }


        strErr = RecordMultipleChoiceInteraction(interactionID_str, 
												studentResponse_ResponIdent_arr, 
												result_str, 
												correctResponse_ResponIdent_arr, 
												question_text, 
												weight_int, 
												latency_int, 
												objectiveID_str);

        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);
    } else if (CmdToExecute == "RecordTrueFalseInteraction") {
        trace("Fwd:" + "RecordTrueFalseInteraction():");
		var TF_answer_texts = descriptionTexts.answerTexts;
        var bStudent_response = TF_answer_texts[studentResponse_str];
		var bCorrect_response = TF_answer_texts[correctResponse_str];

        strErr = RecordTrueFalseInteraction(interactionID_str, 
											bStudent_response, 
											result_str, 
											bCorrect_response, 
											question_text, 
											weight_int, 
											latency_int, 
											objectiveID_str);

        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);
    } else if (CmdToExecute == "RecordFillInInteraction") {
        trace("Fwd:" + "RecordFillInInteraction():");


        strErr = RecordFillInInteraction(interactionID_str, 
										studentResponse_str, 
										result_str, 
										correctResponse_str, 
										question_text, 
										weight_int, 
										latency_int, 
										objectiveID_str);

        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);
    } else if (CmdToExecute == "RecordMatchingInteraction") {
        trace("Fwd:" + "RecordMatchingInteraction():");


        var leftColumnTexts = descriptionTexts.answerTexts.left;
        var rightColumnTexts = descriptionTexts.answerTexts.right;

        var correctResponse_MatchingResponses_arr = [];
        var studentResponse_MatchingResponses_arr = [];

        var temp_responses_arr = correctResponse_str.split(",");
        var resp_idx = 0;
        var curr_resp, src_target;

        for (resp_idx = 0; resp_idx < temp_responses_arr.length; ++resp_idx) {
            curr_resp = temp_responses_arr[resp_idx];
            src_target = curr_resp.split(".");

            var match_temp1 = src_target[0];
            var match_temp2 = src_target[1];
	
			var lLongLeftColText = leftColumnTexts[match_temp1];
			var lLongRightColText = rightColumnTexts[match_temp2];
			if ((undefined == lLongLeftColText) || ("" == lLongLeftColText))
			    lLongLeftColText = match_temp1;
			if ((undefined == lLongRightColText) || ("" == lLongRightColText))
			    lLongRightColText = match_temp2;
		
            var resp_src = CreateResponseIdentifier(match_temp1, lLongLeftColText);
            var resp_target = CreateResponseIdentifier(match_temp2, lLongRightColText);

            
            correctResponse_MatchingResponses_arr.push(new MatchingResponse(resp_src, resp_target));
        }

        temp_responses_arr = studentResponse_str.split(",");
        for (resp_idx = 0; resp_idx < temp_responses_arr.length; ++resp_idx) {
            curr_resp = temp_responses_arr[resp_idx];
            src_target = curr_resp.split(".");

            var match_temp1 = src_target[0];
            var match_temp2 = src_target[1];

           	var lLongLeftColText = leftColumnTexts[match_temp1];
			var lLongRightColText = rightColumnTexts[match_temp2];
			if((undefined == lLongLeftColText ) || ("" == lLongLeftColText ))
				lLongLeftColText = match_temp1;
			if((undefined == lLongRightColText) || ("" == lLongRightColText))
				lLongRightColText = match_temp2;
		
            var resp_src = CreateResponseIdentifier(match_temp1, lLongLeftColText);
            var resp_target = CreateResponseIdentifier(match_temp2, lLongRightColText);
            
            studentResponse_MatchingResponses_arr.push(new MatchingResponse(resp_src, resp_target));
        }


        strErr = RecordMatchingInteraction(interactionID_str, 
										studentResponse_MatchingResponses_arr, 
										result_str, 
										correctResponse_MatchingResponses_arr, 
										question_text, 
										weight_int, 
										latency_int, 
										objectiveID_str);

        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);
    } else if (CmdToExecute == "RecordSequencingInteraction") {
        trace("Fwd:" + "RecordSequencingInteraction():");
	
		var lLongLearnerResponse = descriptionTexts.answerTexts.learner_response;
		var lLongCorrectResponse = descriptionTexts.answerTexts.correct_response;
		if((undefined == lLongLearnerResponse) || ("" == lLongLearnerResponse))
			lLongLearnerResponse = studentResponse_str.substring(0, 1);
		if((undefined == lLongCorrectResponse) || ("" == lLongCorrectResponse))
			lLongCorrectResponse = correctResponse_str.substring(0, 1);
		
        strErr = RecordSequencingInteraction(interactionID_str, 
						CreateResponseIdentifier(studentResponse_str.substring(0, 1),
							lLongLearnerResponse), 
						result_str, 
						CreateResponseIdentifier(correctResponse_str.substring(0, 1),
							lLongCorrectResponse), 
						question_text, 
						weight_int, 
						latency_int, 
						objectiveID_str);

        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);
    } else if (CmdToExecute == "RecordLikertInteraction") {
        trace("Fwd:" + "RecordLikertInteraction():");

        strErr = RecordLikertInteraction(interactionID_str, 
										CreateResponseIdentifier(studentResponse_str.substring(0, 1), 
											studentResponse_str), 
										true, 
										null,
										question_text, 
										weight_int, 
										latency_int, 
										objectiveID_str);

        if (retValForSWF != "") CaptivateObj.SetScormVariable(retValForSWF, strErr);
        trace("Setting var in SWF:" + retValForSWF + " = " + strErr);
    } else trace("This call has not been ported or is not handled yet.");
    return strErr;
}

//This function name should not be changed - scormdriver.js internally calls this. 
		 
function LoadContent(){
	
	trace("LoadContent: Has API loaded and been properly initialized?:"+String(IsLoaded()));
	
	if(!IsLoaded()) {
		trace("Error loading API - Aborting!");
		return;
	}

	trace("Exiting Load content...");
	return;
	
}

var oldBeforeUnloadHandler = null;
var oldUnloadHandler = null;

function CPDoBeforeUnload()
{
    var lRunningInConnect = false ;
    var lRunningInConnectFunctionExists = false ;
    lRunningInConnectFunctionExists = m_parentWindow && m_parentWindow.IsRunningInConnect && typeof m_parentWindow.IsRunningInConnect === 'function' ;
    lRunningInConnect =  lRunningInConnectFunctionExists && m_parentWindow.IsRunningInConnect() ;

    if(!lRunningInConnect)
    {
    	if(window.onbeforeunload)
    		window.onbeforeunload();

    	if(oldBeforeUnloadHandler)
    		oldBeforeUnloadHandler();		
    }
}

function CPDoUnload()
{
    var lRunningInConnect = false ;
    var lRunningInConnectFunctionExists = false ;
    lRunningInConnectFunctionExists = m_parentWindow && m_parentWindow.IsRunningInConnect && typeof m_parentWindow.IsRunningInConnect === 'function' ;
    lRunningInConnect =  lRunningInConnectFunctionExists && m_parentWindow.IsRunningInConnect() ;

    if(!lRunningInConnect)
    {
    	if(window.onunload)
    		window.onunload();
    	if(oldUnloadHandler)
    		oldUnloadHandler();		
    }
}

function RegisterForCloseOnTopWindow()
{
	if(isIE && m_topWindow && m_topWindow != window.self)
	{
		var targetWin = m_topWindow;
		if(targetWin.onbeforeunload)
		{
			if(targetWin.onbeforeunload != window.onbeforeunload)
			{
				oldBeforeUnloadHandler = targetWin.onbeforeunload;
			}
		}
		if(targetWin.onunload)
		{
			if(targetWin.onunload != window.onunload)
			{
				oldBeforeUnloadHandler = targetWin.onunload;
			}
		}
		targetWin.onbeforeunload = CPDoBeforeUnload;
		targetWin.onunload = CPDoUnload;
	}
}


function isIE()
{
	var agt=navigator.userAgent.toLowerCase();
	var is_ie     = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
	return is_ie;
}

function OnloadActivities(){

    var lRunningInConnect = false ;
    var lRunningInConnectFunctionExists = false ;
    lRunningInConnectFunctionExists = m_parentWindow && m_parentWindow.IsRunningInConnect && typeof m_parentWindow.IsRunningInConnect === 'function' ;
    lRunningInConnect =  lRunningInConnectFunctionExists && m_parentWindow.IsRunningInConnect() ;

    if(!lRunningInConnect)
    {
    	trace("Inside body. Calling Start() on driver.");
    	Start();
    	if(IsLoaded()) makeCallsToDriver = true;
    	trace("Can make calls to driver?"+ makeCallsToDriver);
    }
	
    var lstrURL = CONFIG.FILENAME ;

    if(lRunningInConnect)
    {
        var strURLParams = "";
        var strURLFull = document.location + "";
        var intTemp = strURLFull.indexOf("#");
        if (intTemp == -1)
            intTemp = strURLFull.indexOf("?");
        if (intTemp > 0)
            strURLParams = strURLFull.substring(intTemp + 1, strURLFull.length);

        strURLParams = (strURLParams==unescape(strURLParams)?escape(strURLParams):strURLParams);
        strURLParams = (strURLParams==""?"":"?") + strURLParams;

        lstrURL += strURLParams ;
    }		
	
	//Embed SWf using the SWFObject library
	var so = new SWFObject(lstrURL, CONFIG.SWFOBJ_ID, 
									CONFIG.COURSE_WIDTH, CONFIG.COURSE_HEIGHT, 
									CONFIG.FPVERSION, "#CCCCCC");
				
		so.addParam("quality", "high");
		so.addParam("wmode", CONFIG.WMODE);
		so.addParam("bgcolor", CONFIG.BGCOLOR);
		so.addParam("menu", "false");
        so.addParam("seamlesstabbing",CONFIG.SEAMLESS_TABBING);
		so.setAttribute("name", CONFIG.SWFOBJ_NAME);
		so.setAttribute("redirectUrl", CONFIG.REDIRECT_URL);
		so.addParam("AllowScriptAccess","always");
		so.write(CONFIG.TARGET);
		
	
	CaptivateObj = document.getElementById('Captivate');
	if(CaptivateObj) CaptivateObj.focus(); 
	
	
	//enable right click if needed
	if(CONFIG.RIGHTCLICKENABLED)
	{
		RightClick.init();
	}
	RegisterForCloseOnTopWindow();

}




			