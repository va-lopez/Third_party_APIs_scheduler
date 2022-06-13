var schedule = [];
var startTime = 9;
var endingTime = 17; // 5 oclock in 24 hour format, must be less than 24.

var loadSchedule = function(){
    var checkSchedule = JSON.parse(localStorage.getItem("schedule"));

    // if nothing in localStorage, create a new object to track all events
    if(!checkSchedule){
        for(var i=0; i<=24; i++){
            //create objects with properties of time and if am or pm
            var key;
            var am;
            if(i===0){
                key = 12;
                am = true;
            }else if(i<12){
                key = i;
                am = true;
            }else if(i===12){
                key = 12;
                am = false;
            }else{
                key=i-12;
                am = false;
            }
            schedule.push({
                hour: [key],
                event : "",
                am: [am] 
            });
        }
    }else{
         schedule = checkSchedule;
    }
};

var saveSchedule = function(){
    localStorage.setItem("schedule", JSON.stringify(schedule));
};

var clearSchedule = function(){
    for(var i =0; i<24; i++){
        schedule[i].event = "";
    }
}

var createSchedule = function(){
    //create the html elements dynamically, use global variables above to specify which hours you'd like to show
    var scheduleEl = $("<div>")
        .addClass("description");
    for(var i=startTime; i<=endingTime; i++){
        //create the html elements
        var blockEl = $("<div>").attr({class:"time-block", data:i});
        var timeEl = $("<p>").addClass("hour row");

        //add the text content for the AM hours and then PM hours
        if(i==0)
            timeEl.text('12:00 AM');
        else if (i<12)
            timeEl.text(i + ':00 AM');
        else if (i===12)
            timeEl.text('12:00 PM');
        else
            timeEl.text((i-12) + ':00 PM');


        //create the form and button elements.
        var textareaEl = $("<textarea>")
            .text(schedule[i].event)
            .addClass("row past")
            .attr({id:i});
        var saveBtnEl = $("<button>")
            .addClass("saveBtn row")
            .text("Save")
            .attr({type:"button",id:"btn"});
        blockEl.append(timeEl,textareaEl,saveBtnEl);
        scheduleEl.append(blockEl);
        
        //append all these elments to the main container element
        $(".container").append(scheduleEl);
    }
};

//add event listener to save buttons. If that button is click, only that text will get stored in local storage
$(document).ready(function(){
    $(".description #btn").click(function(){
        //first get the index from the button clicked
        var hour = $(this)
            .closest(".time-block")
            .attr("data");
        
            var text = $("#"+ hour).val();
            schedule[hour].event = text;
            saveSchedule();
    })
});

loadSchedule();
createSchedule();
clearSchedule();