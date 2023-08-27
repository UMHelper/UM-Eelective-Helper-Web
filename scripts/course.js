var course_code = decodeURI(window.location.pathname.split('/')[2]).toUpperCase();

$(document).prop('title', course_code + " | 澳大選咩課 What2Reg @UM");
$('#input_search_nav').val(course_code);
$('link[rel="canonical"]').attr('href', 'https://www.umeh.top/course/' + course_code);
$("meta[name='description']").attr('content', '課程 ' + course_code + ' 的講師評分及評價 ');

$('#title_course').append(course_code);
$('.breadcrumb').append('<li class="breadcrumb-item"><a href="/search.html?keyword=' + course_code.substring(0, 4) + '">' + course_code.substring(0, 4) + '</a></li>');

/*
$('header > nav').css('background-color', 'rgba(0,0,0,0)');

$(window).on('scroll', function () {
  var scrollTop = $(window).scrollTop(),
    elementOffset = $('#title_course').offset().top;
  $('header > nav').css("background-color", (elementOffset - scrollTop < 70 ? "#30548b" : "#30548b00"));
});
*/

// crawler detection
if (/bot|google|baidu|bing|msn|teoma|slurp|yandex/i.test(navigator.userAgent)) {
  $('#googleBotCourseInfo').css('display', 'block');
}
else {
  $('#googleBotCourseInfo').css('display', 'none');
}


function showModal(showDesc) {
  $('#modal-content').html((showDesc ? description : ilo));
  $('#bannerformmodal').removeClass("hide").modal('show');
}

mustFillNavbar = false;
scrollNav();
var description = '<h6>Course Description</h6><p>', ilo = '<h6>Intended Learning Outcomes</h6><p>';

$.ajax({
  url: API_server + "/course_info/?New_code=" + course_code,
  dataType: "json",
  xhrFields: {
    withCredentials: true
  },
  success: function (data) {
    $(document).prop('title', course_code + ' ' + data.course_info.courseTitleEng + " | 澳大選咩課 What2Reg @UM");

    $('#title_eng').text(data.course_info.courseTitleEng);
    $('#title_chi').text(data.course_info.courseTitleChi);
    $('#meta_credits').text(data.course_info.Credits);

    if (data.course_info.Offering_Department) {
      $('#meta_dept').html('<a href="/catalog.html?faculty=' + data.course_info.Offering_Unit + '&dept=' + data.course_info.Offering_Department + '">' + data.course_info.Offering_Department + '</a>');
      $('#meta_faculty').text(data.course_info.Offering_Unit);
    }
    else {
      $('#meta_dept').text('-');
      $('#meta_faculty').html('<a href="/catalog.html?faculty=' + data.course_info.Offering_Unit + '">' + data.course_info.Offering_Unit + '</a>');
    }
    $('#meta_lang').text(data.course_info.Medium_of_Instruction ? data.course_info.Medium_of_Instruction : '-');

    var temp_desc = '';
    if (data.course_info == 'Error Code')
      $("#panel_instructors").append('<div class="alert alert-danger alert-dismissible fade show" role="alert" style="width: 100%">課程不存在，請重試或向我們反饋！<br>Course not found. Try again and feedback to us! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
    else if (data.prof_info.length == 0)
      $("#panel_instructors").append('<div class="alert alert-warning alert-dismissible fade show" role="alert" style="width: 100%">這個課程存在，但是近年來并沒有開設過，因此沒有評價。<br>Found this course but it hasn\'t been offered in recent years.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');

    data.prof_info.sort(function (a, b) {
      if (a.offer_info.is_offer != b.offer_info.is_offer) return b.offer_info.is_offer - a.offer_info.is_offer;
      else return b.result - a.result;
    });

    var is_offer = false
    for (var i in data.prof_info) {
      addInstructor(course_code, data.prof_info[i], '#panel_instructors', false, data.prof_info[i].offer_info.is_offer);
      temp_desc += data.prof_info[i].name + ' ' + (data.prof_info[i].result * 2).toFixed(1);
      if (data.prof_info[i].offer_info.is_offer) {
        is_offer = true
      }
    }

    //console.log(is_offer)

    $('#title_course').html(course_code + ' <span class="align-middle badge rounded-pill '
      + (is_offer ? "bg-primary" : "bg-danger")
      + '" style="font-size: 0.8rem; margin-left:2px">'
      + (is_offer ? "Offered" : "Not Offered")
      + '</span>')

    $("meta[name='description']").attr('content', data.course_info.courseTitleChi + ' ' + course_code + ' 的講師評分及評價 ' + temp_desc);

  },
  error: function (data) {
    Sentry.captureException(data);
    $("#panel_instructors").append('<div class="alert alert-danger alert-dismissible fade show" role="alert" style="width: 100%">數據加載錯誤，請重試或向我們反饋！<br>Error loading course data. Please try again or send feedback to us! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
  }
});


$.ajax({
  url: "https://api.data.um.edu.mo/service/academic/course_catalog/v1.0.0/all?course_code=" + course_code,
  data: {},
  type: "GET",
  beforeSend: function (req) { req.setRequestHeader('Authorization', 'Authorization: Bearer bfa9b6c0-3f4f-3b1f-92c4-1bdd885a1ca2'); },
  success: function (data) {

    if (data._embedded == null || data._embedded.length == 0) {
      description += "Not available.".replaceAll('\n', '</p><p>') + '</p>';
      $('#googleBotCourseDesc').html("Not available.".replaceAll('\n', '</p><p>') + '</p>');

      ilo += "Not available.".replaceAll('\n', '</p><p>') + '</p>';
      $('#googleBotCourseIlo').html("Not available.".replaceAll('\n', '</p><p>') + '</p>');
    }
    else {
      course_api_return = data._embedded[0];
      if (course_api_return.courseDescription) {
        description += course_api_return.courseDescription.replaceAll('\n', '</p><p>') + '</p>';
        $('#googleBotCourseDesc').html(course_api_return.courseDescription.replaceAll('\n', '</p><p>') + '</p>');
      }
      if (course_api_return.ilo) {
        ilo += course_api_return.ilo.replaceAll('\n', '</p><p>') + '</p>';
        $('#googleBotCourseIlo').html(course_api_return.ilo.replaceAll('\n', '</p><p>') + '</p>');
      }
    }
  },
  error: function (data) {
    Sentry.captureException(data);
    $("#panel_instructors").prepend('<div class="alert alert-danger alert-dismissible fade show" role="alert" style="width: 100%">澳大 API 连接錯誤，無法加載課程介紹。請重試或向我們反饋！<br>Error loading course description and ILOs from UM API Server. Please try again or send feedback to us! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');


    description += "<p>Error loading course description and ILOs from UM API Server. Please try again or send feedback to us! </p>";
    $('#googleBotCourseDesc').html("<p>Error loading course description and ILOs from UM API Server. Please try again or send feedback to us! </p>");
    ilo += "<p>Error loading course description and ILOs from UM API Server. Please try again or send feedback to us! </p>";
    $('#googleBotCourseIlo').html("<p>Error loading course description and ILOs from UM API Server. Please try again or send feedback to us! </p>");
  }
});
