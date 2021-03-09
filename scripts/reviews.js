var course_code = decodeURI(window.location.pathname.split('/')[2]).replace('$O', '/').toUpperCase();
var instructor = decodeURI(window.location.pathname.split('/')[3]).replace('$O', '/').toUpperCase();

$(document).prop('title', instructor + ' | ' + course_code + " | 澳大選咩課 What2Reg @UM");
$('#input_search_nav').val(course_code);
$('link[rel="canonical"]').attr('href', 'https://www.umeh.top/reviews/' + course_code + '/' + instructor);
$("meta[name='description']").attr('content', '講師 ' + instructor + ' 在課程 ' + course_code + ' 的中評分及評價 ');

$('.breadcrumb').append('<li class="breadcrumb-item"><a href="/search.html?keyword=' + course_code.substring(0, 4) + '">' + course_code.substring(0, 4) + '</a></li>');

$('.breadcrumb').append('<li class="breadcrumb-item"><a href="/course/' + course_code + '">' + course_code + '</a></li>');
$('#title_instructor').append(instructor);
$('header > nav').css('background-color', 'rgba(0,0,0,0)');

$(window).on('scroll', function () {
  var scrollTop = $(window).scrollTop(),
    elementOffset = $('#title_eng').offset().top;
  $('header > nav').css("background-color", (elementOffset - scrollTop < 70 ? "#30548b" : "#30548b00"));
});


$.ajax({
  url: API_server + "/course_info/?New_code=" + course_code,
  dataType: "json",
  success: function (data) {
    $(document).prop('title', instructor + ' | ' + course_code + ' ' + data.course_info.courseTitleEng + " | 澳大選咩課 What2Reg @UM");
    $('#title_eng').text(data.course_info.courseTitleEng);
    $('#title_chi').text(data.course_info.courseTitleChi);
    if (data.course_info == 'Error Code')
      $("#panel_instructors").append('<div class="alert alert-danger show" role="alert" style="width: 100%">課程不存在<br>Course not found</div>');

    if (data.prof_info.length == 1) {
      $('#panel_instructors').remove();
    }
    for (var i in data.prof_info) {
      addInstructor(course_code, data.prof_info[i], '#panel_instructors', true);
    }
  },
  error: function (data) {
    $("#panel_instructors").append('<div class="alert alert-danger show" role="alert" style="width: 100%">數據錯誤<br>Error</div>');
  }
});


$.ajax({
  url: API_server + "/all_comment_info/?New_code=" + course_code + '&prof_name=' + instructor,
  dataType: "json",
  success: function (data) {
    if (data.comments.length == 0)
      $("#panel_instructors").append('<div class="alert alert-info alert-dismissible fade show" role="alert" style="width: 100%">還沒有人評價過，做第一個評價者吧！<br>No reviews yet. Be the first to comment!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');

    $('#progress_overall').append('<div class="progress-bar ' + generateColor(data.prof_info.result) + '" role="progressbar" style="width: '
      + data.prof_info.result * 20 + '%"></div>');
    $('#progress_grade').append('<div class="progress-bar ' + generateColor(data.prof_info.grade) + '" role="progressbar" style="width: '
      + data.prof_info.grade * 20 + '%"></div>');
    $('#progress_hard').append('<div class="progress-bar ' + generateColor(data.prof_info.hard) + '" role="progressbar" style="width: '
      + data.prof_info.hard * 20 + '%"></div>');
    $('#progress_outcome').append('<div class="progress-bar ' + generateColor(data.prof_info.reward) + '" role="progressbar" style="width: '
      + data.prof_info.reward * 20 + '%"></div>');

    var temp_desc = '';
    for (var i in data.comments) {
      addReview(data.comments[i], '#panel_reviews');
      if (i < 6)
        temp_desc += data.comments[i].content + '. ';
    }
    $("meta[name='description']").attr('content', '講師 ' + instructor + ' 在課程 ' + course_code + ' 的中評分及評價. ' + temp_desc);
  },
  error: function (data) {
    $("#panel_reviews").append('<div class="alert alert-danger alert-dismissible fade show" role="alert" style="width: 100%">數據加載錯誤，請重試或向我們反饋！<br>Error loading data. Please try again or send feedback to us! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
  }
});


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
