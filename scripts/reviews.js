var course_code = decodeURI(window.location.pathname.split('/')[2]).replace('$O', '/').toUpperCase();
var instructor = decodeURI(window.location.pathname.split('/')[3]).replace('$O', '/').toUpperCase();

$(document).prop('title', instructor + ' | ' + course_code + " | 澳大選咩課 What2Reg @UM");
$('#input_search_nav').val(course_code);
$('link[rel="canonical"]').attr('href', 'https://www.umeh.top/reviews/' + course_code + '/' + instructor);
$("meta[name='description']").attr('content', '講師 ' + instructor + ' 在課程 ' + course_code + ' 的中評分及評價 ');

$('#title_instructor').append(instructor)
$('#title_course').append(course_code)
$('header > nav').css('background', 'linear-gradient(37deg, #002a4c, #0396e6)');

$('main').on('scroll', function () {
  var scrollTop = $(window).scrollTop(),
    elementOffset = $('#title_course').offset().top;
  $('header > nav').css("background", (elementOffset - scrollTop < 70 ? "unset" : "linear-gradient(37deg, rgb(4 68 119), rgb(3, 150, 230))"));

  $('header > nav').css("background-color", (elementOffset - scrollTop < 70 ? "#30548b" : "unset"));
});




function getCourseInfo(resp_json) {

  document.getElementById("course_name").innerHTML = resp_json.course_info.courseTitleEng;
  document.getElementById("course_name_chi").innerHTML = resp_json.course_info.courseTitleChi;
  document.getElementById("course_info").innerHTML = "Offered by " + resp_json.course_info.Offering_Department + ", " + resp_json.course_info.Offering_Unit;
  document.getElementById("medium").innerHTML = resp_json.course_info.Medium_of_Instruction + " Instruction";
  document.getElementById("credits").innerHTML = resp_json.course_info.Credits + " Credits";
  document.getElementById("overall").style.width = resp_json.prof_info.result * 20 + "%";
  document.getElementById("or").innerHTML = (resp_json.prof_info.result * 2).toFixed(1) + "/10";
  document.getElementById("tension").style.width = resp_json.prof_info.hard * 20 + "%";
  document.getElementById("lw").innerHTML = (resp_json.prof_info.hard * 2).toFixed(1) + "/10";
  document.getElementById("attendance").style.width = resp_json.prof_info.attendance * 20 + "%";
  document.getElementById("ac").innerHTML = (resp_json.prof_info.attendance * 2).toFixed(1) + "/10";
  document.getElementById("marks").style.width = resp_json.prof_info.grade * 20 + "%";
  document.getElementById("gm").innerHTML = (resp_json.prof_info.grade * 2).toFixed(1) + "/10";
  document.getElementById("clo").style.width = resp_json.prof_info.reward * 20 + "%";
  document.getElementById("lo").innerHTML = (resp_json.prof_info.reward * 2).toFixed(1) + "/10";

}

function generateAttitude(value, type, style) { //style: boolean
  var msg = "";
  var color = "grey";
  if (value < 1.67) {
    color = "red";
    switch (type) {
      case "attendance":
        msg += "堂堂點名 😡"
        break;
      case "marks":
        msg += "爛grade 😭"
        break;
      case "workload":
        msg += "好繁重 😫"
        break;
      case "recommend":
        msg += "👎"
        break;
    }
  }
  else if (value < 3.33) {
    color = "orange";
    switch (type) {
      case "attendance":
        msg = "有時點名 🔖"
        break;
      case "marks":
        msg = "給分ok 🆗"
        break;
      case "workload":
        msg = "工作量一般 🤔"
        break;
      case "recommend":
        msg = "👌"
        break;
    }
  }
  else {
    color = "green";
    switch (type) {
      case "attendance":
        msg = "少點名 🏝️"
        break;
      case "marks":
        msg = "給分靚 💯"
        break;
      case "workload":
        msg = "輕鬆 🥳"
        break;
      case "recommend":
        msg = "👍"
        break;
    }
  }
  return (style == false ? msg : ('<div class="score" style="color: ' + color + '">' + msg + '</div>'));
}
