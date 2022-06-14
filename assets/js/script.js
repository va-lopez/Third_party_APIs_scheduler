var schedule = [];
var startTime = 9;
var endingTime = 17; // 5 oclock in 24 hour format, must be less than 24.
var currentTime;
var DateTime =luxon.DateTime;
var date;
var hour;
var day;
var month;
var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

//check to see if there is a schedule already on the local storage, if not, create an empty array
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

//using lexon to get the date and time to use in later functions
var getTime = function(){
    const dT = DateTime.now();
    month = dT.month;
    day = dT.weekday;
    date = dT.day;
    hour = dT.hour;
}

//save schedule to local storage
var saveSchedule = function(){
    localStorage.setItem("schedule", JSON.stringify(schedule));
};

//clear out all the text from the "textarea"s, not being used currently but good to add eventually
var clearSchedule = function(){
    for(var i =0; i<24; i++){
         schedule[i].event = "";
    }
}

//create the html elments dynamically
var createSchedule = function(){
    //first display the current day on the top at the header
    $("#currentDay").text(weekDays[day]+ ", " + months[month] +" " + date + "th");

    //create the html elements dynamically, use global variables above to specify which hours you'd like to show
    var scheduleEl = $("<div>")
        .addClass("description");

    //global variables above set up which hours get shown on the planner
    for(var i=startTime; i<=endingTime; i++){
        //create the html elements
        var blockEl = $("<div>").attr({class:"time-block row", data:i});
        var timeEl = $("<p>").addClass("hour col-lg-1 col-md-2 col-sm-3 col-4 d-flex justify-content-end pt-2");

        //add the text content for the AM hours and then PM hours
        if(i==0)
            timeEl.text('12 AM');
        else if (i<12)
            timeEl.text(i + ' AM');
        else if (i===12)
            timeEl.text('12 PM');
        else
            timeEl.text((i-12) + ' PM');

        //check the current hour and figure out what the class should be to create different colors for past hours, current hour, and future hours.
        var classColor;
        if(i<hour)
            classColor = "past";
        else if (i===hour)
            classColor = "present";
        else
            classColor = "future";

        //create the form and button elements.
        var textareaEl = $("<textarea>")
            .text(schedule[i].event)
            .addClass("col-lg-10 col-md-8 col-sm-6 col-4 "+classColor)
            .attr({id:i});
        var saveBtnEl = $("<button>")
            .addClass("saveBtn col-lg-1 col-md-2 col-sm-3 col-4")
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

//when a text area is selected, the box gets highlighted
$(".list-group").on("blur","textarea", function(){
    this.trigger("focus");
})

loadSchedule();
getTime();
createSchedule();
//clearSchedule();