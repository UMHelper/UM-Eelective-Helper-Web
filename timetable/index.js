import Calendar from './calendar.js';

function addEvents(events){
    var cals = []
    for (var evt in events) {
      var endHour = events[evt].endTime.split(":")[0];
      var endMin = events[evt].endTime.split(":")[1];

      var startHour = events[evt].startTime.split(":")[0];
      var startMin = events[evt].startTime.split(":")[1];

      //if (endMin == "00") {
      //  endMin = "59";
      //  endHour = endHour - 1;
      //}

      events[evt].startTime = startHour.toString().padStart(2, '0') + ":" + startMin;
      events[evt].endTime = endHour.toString().padStart(2, '0') + ":" + endMin;


      var cal = {
        id: evt, 
        eventName: events[evt].eventName, //events[evt].eventName, 
        dateFrom: "2018-01-0" + events[evt].dayOfWeek+"T" + events[evt].startTime + ":00.000" , 
        dateTo: "2018-01-0" + events[evt].dayOfWeek+"T" + events[evt].endTime + ":00.000" , 
        id: events[evt].id
      }

      console.log(cal.dateFrom, cal.dateTo)
      cals.push(cal)
    }

    new Calendar(cals);
    $(".calendar-body-column[data-day='0']").css('display', 'none')
    $(".calendar-day").last().css('display', 'none')
    $('#calendar-body-row-22 .calendar-body-column:not(:first)').css('display','none')

}

const d2n = {
  'MON': 0,
  'TUE': 1,
  'WED': 2,
  'THU': 3,
  'THURS': 3,
  'FRI': 4,
  'SAT': 5,
  'SUM': 6

}

function updateCalendar() {
  
    console.log("Update Calendar")
    var timetable_cart = localStorage.getItem('timetable_cart')
    timetable_cart = JSON.parse(timetable_cart)

    var id = 0
    var events = []

    for (var i in timetable_cart) {
      var course = {}
      course.eventName = timetable_cart[i].code; 
      if (course.eventName.length > 4){
        course.eventName = timetable_cart[i].code.substring(0,4) + "\n" + timetable_cart[i].code.substring(4);
      }
      
      for (var j in timetable_cart[i].schedules) {
        var dayOfWeek = d2n[timetable_cart[i].schedules[j].date]
        var startTime = timetable_cart[i].schedules[j].time.split("-")[0]
        var endTime = timetable_cart[i].schedules[j].time.split("-")[1]

        events.push({ eventName: course.eventName, dayOfWeek: dayOfWeek, startTime: startTime, endTime: endTime, id: i })
      }
    }

    addEvents(events)

}

updateCalendar()