import Calendar from './calendar.js';

function addEvents(events){
    var cals = []
    for (var evt in events) {
      var endHour = events[evt].endTime.split(":")[0];
      var endMin = events[evt].endTime.split(":")[1];
      if (endMin == "00") {
        endMin = "59";
        endHour = endHour - 1;
        console.log(events[evt].endTime)
      }

      events[evt].startTime = startHour.toString().padStart(2, '0') + ":" + endMin;
      events[evt].endTime = endHour.toString().padStart(2, '0') + ":" + endMin;

      var cal = {
        id: evt, 
        eventName: events[evt].eventName + "\nSec " + events[evt].section, //events[evt].eventName, 
        dateFrom: "2018-01-0" + events[evt].dayOfWeek+"T" + events[evt].startTime + ":00.000" , 
        dateTo: "2018-01-0" + events[evt].dayOfWeek+"T" + events[evt].endTime + ":00.000" , 
        section: events[evt].section
      }
      cals.push(cal)
    }

    new Calendar(cals);
    $(".calendar-body-column[data-day='0']").css('display', 'none')
    $(".calendar-day").last().css('display', 'none')
    $('#calendar-body-row-22 .calendar-body-column:not(:first)').css('display','none')

}

const events = [
  { eventName: 'ACCT1000', dayOfWeek: 1, startTime: "08:00", endTime: "10:00", section: 1 },
  { eventName: 'ACCT1000', dayOfWeek: 3, startTime: "16:00", endTime: "17:59", section: 1 },
  { eventName: 'COMP1000', dayOfWeek: 4, startTime: "10:00", endTime: "11:30", section: 2 },
  { eventName: 'COMP1000', dayOfWeek: 5, startTime: "20:00", endTime: "21:00", section: 2 },
]

addEvents(events)