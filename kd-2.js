<!-- hide script from old browsers

	var eventMessage = new EventMessage(01, "startup", "startup", Date.now(), "Home");
	var mt_get_answers_flag = true;
	var mt_kds = "";
	
	function mtPopulateArray(e){
		mt_answers[$(e).attr(mt_qId)] = {questionId:$(e).attr(mt_qId), answer:"", kd:""};
	}
	
	function EventMessage(id, target, eventType, startTimestamp, pageName) {
	this.id = id;
	this.startingEventType = eventType;
	this.endingEventType = "";
	this.startTimestamp = startTimestamp;
	this.endTimestamp = "";
	this.pageName = pageName;
	this.Target = target;
	this.keyEvents = [];
    this.addKeyEvent = function (keyEvent) {
    this.keyEvents.push(keyEvent);};
  }
	
	function KeyEvent(keyCode, target, timestamp, eventType) {

	this.KeyCode = keyCode;
    this.Target = target;
    this.Timestamp = timestamp;
    this.EventType = eventType;
   }
   function CreateAndAddKeyEventMessage(event){
	   		try{
		 var keyCode = event.which;
		 var target = event.target.id;
		 var eventType =  event.type;
		 var keyEvent = new KeyEvent(keyCode, target, event.timeStamp, eventType)
		 eventMessage.addKeyEvent(keyEvent);
		 //console.log(JSON.stringify(keyEvent));
	   }catch(err){
	   }
   }
   
   function GenerateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

	function WriteOuttoService() {
				try{
			eventMessage.endingEventType = event.type;
			eventMessage.endTimestamp = event.timeStamp;
			var jsonString = JSON.stringify(eventMessage);
		    console.log(jsonString);
			$.ajax({
           url: 'MyController/MyAction',
           contentType: "application/json; charset=utf-8",
           type: "POST",
           data: jsonString,
           dataType: "json",
           success: function (data) {
             //...
           },
           error: function () {
             //...
           }
       });
	   }catch(err){
	   }
	}
	
	/********************** Initialize Input Variables **********************/
	        $(document).ready(function() {
				//Mouse listeners
			// $( document ).mousemove(function( event ) {
  // var pageCoords = "( " + event.pageX + ", " + event.pageY + " )";
  // var clientCoords = "( " + event.clientX + ", " + event.clientY + " )";
  // var documentSize = $(document).width() + "," + $(document).height();
// console.log("pageCoords: " + pageCoords + " clientCoords: " + clientCoords + " doc: " + documentSize);
// });	
				
	// keystroke data listeners
	$("input").keyup(function(event) {
		CreateAndAddKeyEventMessage(event)
	}).keydown(function(event) {
		CreateAndAddKeyEventMessage(event)
	}).keypress(function(event) {
        var char = String.fromCharCode(event.which);
        var isUpper = char == char.toUpperCase();
        console.log(char + ' pressed' + (isUpper ? ' and uppercase' : ''))
    }).focusin(function(event) {
		try{
		 var target = event.target.id;
		 var eventType =  event.type;
		 var pageName = window.location.pathname.split("/").pop();
		 var em = new EventMessage(GenerateUUID(), target, eventType, event.timeStamp, pageName);
		 eventMessage = em;
	   }catch(err){
	   }
	}).focusout(function(event) {
		WriteOuttoService()
	});
		$("textarea").keyup(function(event) {
		CreateAndAddKeyEventMessage(event)
	}).keydown(function(event) {
		CreateAndAddKeyEventMessage(event)
	}).focusin(function(event) {
		try{
		 var target = event.target.id;
		 var eventType =  event.type;
		 var pageName = window.location.pathname.split("/").pop();
		 var em = new EventMessage(GenerateUUID(), target, eventType, event.timeStamp, pageName);
		 eventMessage = em;
	   }catch(err){
	   }
	}).focusout(function(event) {
		WriteOuttoService()
	});
        });
		
		
	
	// end hiding script from old browsers -->