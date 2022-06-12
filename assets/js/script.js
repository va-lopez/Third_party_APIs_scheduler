var schedule;
var startingTime =9;
var EndingTime =5;

//event listener, click button to save to local storage
$(".saveBtn").click(function(){
    //enter in code to save item into local storage
    //first find the time of the block associated to the click
    //get input value from that time block
    //save text content into correct value in schedule obj

    saveSchedule();
})

var saveSchedule = function(){
    localStorage.setItem("daySchedule", JSON.stringify(schedule));
}

var loadSchedule = function(){
    schedule = JSON.parse(localStorage.getItem("daySchedule"));

    // if nothing in localStorage, create a new object to track all events
    if(!schedule){
        schedule = {
            9: "",
            10: "",
            11: "",
            12: "",
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
    };
    }
}

var createSchedule = function(){
    for(var i=0; i<(12-startingTime+EndingTime+1); i++){
        var timeHour=0;
        if(i<=12-startingTime){
            timeHour=i+startingTime;
        }else{
            timeHour=i+startingTime-12;
        }
        var blockEl = $("<div>").attr({class:"time-block", data:timeHour});
        var timeEl = $("<div>").addClass("hour");
        var displayTimeEl = $("<p>");


        if(i<=12-startingTime){
            timeHour=i+startingTime;
            //displayTimeEl.val = timeHour+":00 AM";
            timeEl.append('<p>'+ timeHour + ':00 AM </p>');
            //timeEl.append("<p>$(timeHour) + ':00 AM</p> ");
        }else{
            timeHour=i+startingTime-12;
            timeEl.append('<p>'+ timeHour + ':00 PM </p>');
            //timeEl.append("<p>timeHour + ':00 PM</p> ");
        }
        //var blockEl = $("<div>").addClass("time-block").data(timeHour);
        var formEl = $("<form>");

        var inputEl = $("<input>").attr({type:"text", class: "row past", name: "event"});
        //var inputEl = $("input[type=text]").addClass("row past");
        var saveBtnEl = $("<button>").attr({type:"click", class: "saveBtn"});
        saveBtnEl.html('Save');
        formEl.append(inputEl);
        blockEl.append(timeEl,formEl,saveBtnEl);
        
        $(".container").append(blockEl);
    }
};

createSchedule();