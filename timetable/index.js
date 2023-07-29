import Calendar from './calendar.js';

const events = [
  { id: 0, eventName: 'Event 0', dateFrom: Date.parse("2023-07-29T11:00:00.000"), dateTo: Date.parse("2023-07-29T12:00:00.000") },
  { id: 1, eventName: 'Event 1', dateFrom: Date.parse("2023-07-27T14:00:00.000"), dateTo: Date.parse("2023-07-27T16:00:00.000") },
  { id: 2, eventName: 'Event 2', dateFrom: Date.parse("2023-07-24T18:00:00.000"), dateTo: Date.parse("2023-07-24T19:30:00.000") }
]

var calendar = new Calendar(events);
$(".calendar-body-column[data-day='0']").css('display', 'none')
$(".calendar-day").last().css('display', 'none')
$('#calendar-body-row-22 .calendar-body-column:not(:first)').css('display','none')

