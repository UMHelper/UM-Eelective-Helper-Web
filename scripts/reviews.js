var course_code = decodeURI(window.location.pathname.split('/')[2]).toUpperCase();
var instructor = decodeURI(window.location.pathname.split('/')[3]).replaceAll('$', '/').toUpperCase();

mustFillNavbar = false;
scrollNav();

$(document).prop('title', instructor + ' | ' + course_code + " | 澳大選咩課 What2Reg @UM");
$('#input_search_nav').val(course_code);
$('link[rel="canonical"]').attr('href', 'https://www.umeh.top/reviews/' + course_code + '/' + instructor);
$("meta[name='description']").attr('content', '講師 ' + instructor + ' 在課程 ' + course_code + ' 的中評分及評價 ');

$('.breadcrumb').append('<li class="breadcrumb-item"><a href="/search.html?keyword=' + course_code.substring(0, 4) + '">' + course_code.substring(0, 4) + '</a></li>');

$('.breadcrumb').append('<li class="breadcrumb-item"><a href="/course/' + course_code + '">' + course_code + '</a></li>');
$('#title_instructor').append(instructor + ' <a class="h6" href="/professor/' + instructor.replaceAll('/', '$') + '"><i class="bi bi-box-arrow-in-up-right"></i></a>');

// report form
$("#reportForm").submit(function () {
  event.preventDefault();
  newToastMessage("提交中 Submitting...");

  $.ajax({
    type: "POST",
    dataType: "json",
    url: BBS_API_URL + '/api/posts',
    headers: {
        "Authorization": 'Token ' + Cookies.get('bbs_token'),
        "Access-Control-Allow-Origin": "*"
    },
    data: {
      "data": {
        "type": "posts", "attributes": {
          "content": "Reporting comment \nURL: " + $('#report-comment-url').val() 
          + "\nReasons: " + $('#report-reasons').val()+ "\nComment: " 
          + $('#report-comment-id').val() ,
        }, "relationships": { "discussion": { "data": { "type": "discussions", "id": "422" } } }
      }
    },
    success: function (response) {
      newToastMessage('舉報成功 Reported successfully');
      $('#reportModal').modal('hide');
    },
    error: function (response) {
      Sentry.captureException(response);
      newToastMessage("服務器錯誤 Internal Server Error");
    },
  });
});

function report(comment_id) {
  newToastMessage('請稍後片刻 One second please...');

  $.ajax({
    type: "GET",
    url: BBS_API_URL + '/api/users/' + Cookies.get('bbs_userid'),

    headers: {
        "Authorization": 'Token ' + Cookies.get('bbs_token'),
        "Access-Control-Allow-Origin": "*"
    },
    success: function (response) {
      if (response.data.attributes.isEmailConfirmed) {
        $('#report-comment-id').val("[" + comment_id + "] \n\n> Original content: \n "+ $("#review-" + comment_id + " .card-body h2").text());
        $('#report-comment-url').val(document.URL);
        $('#report-reasons').val("");
        $('#reportModal').modal('show');
      }
      else {
        $('#loginModal').modal('show');
        newToastMessage('請先登入賬戶 Please login first');
      }
    },
    error: function (response) {
    $('#loginModal').modal('show');
      newToastMessage('請先登入賬戶 Please login first');
    },
});
  
}

function updateVoteColor(comment_id, offset) {
    if (offset > 0) {
      $("#review-" + comment_id + " .bi-hand-thumbs-up-fill").addClass("vote-up-pressed");
      $("#review-" + comment_id + " .bi-hand-thumbs-down-fill").removeClass("vote-down-pressed");
    }
    else if (offset < 0) {
      $("#review-" + comment_id + " .bi-hand-thumbs-down-fill").addClass("vote-down-pressed");
      $("#review-" + comment_id + " .bi-hand-thumbs-up-fill").removeClass("vote-up-pressed");
    }
    else {
      $("#review-" + comment_id + " .bi-hand-thumbs-up-fill").removeClass("vote-up-pressed");
      $("#review-" + comment_id + " .bi-hand-thumbs-down-fill").removeClass("vote-down-pressed");
    }
  }

function voteOn(comment_id, offset) {
    $.ajax({
      url: API_server + '/submit_vote/',
      type: 'post',

      xhrFields: {
        withCredentials: true
      },
      data: {
        "comment_id": comment_id,
        "offset": offset
      },
      success: function () {
        updateVoteColor(comment_id, offset);
        var vote_count = parseInt($("#review-" + comment_id + " .vote-num").text());
        $("#review-" + comment_id + " .vote-num").empty().append(vote_count + offset);

      },

      statusCode: {
        403: function () {
          $('#loginModal').modal('show');
          newToastMessage('登入賬戶方可投票 Please login first');
        },
        405: function () {
          newToastMessage("已經為此評價投過票了 Already voted!");
        },
        500: function (data) {
          Sentry.captureException(data);
          newToastMessage("服務器錯誤 Internal Server Error");
        }
      }
    });
  }


$.ajax({
    url: API_server + "/course_info/?New_code=" + course_code,
    dataType: "json",
    xhrFields: {
      withCredentials: true
    },
    success: function (data) {
      $(document).prop('title', instructor + ' | ' + course_code + ' ' + data.course_info.courseTitleEng + " | 澳大選咩課 What2Reg @UM");
      $('#title_eng').text(data.course_info.courseTitleEng);
      $('#title_chi').text(data.course_info.courseTitleChi);
      if (data.course_info == 'Error Code')
        newToastMessage('課程不存在<br>Course not found');

      if (data.prof_info.length == 1) {
        $('#panel_instructors').remove();
      }
      for (var i in data.prof_info) {
        addInstructor(course_code, data.prof_info[i], '#panel_instructors', true);
      }
    },
    error: function (data) {
      Sentry.captureException(data);
      newToastMessage("服務器錯誤 Internal Server Error");
    }
  });


$.ajax({
  url: API_server + "/all_comment_info/?New_code=" + course_code + '&prof_name=' + instructor,
  dataType: "json",
  xhrFields: {
    withCredentials: true
  },
  success: function (data) {
    $('#progress_overall').append('<div class="progress-bar ' + generateColor(data.prof_info.result) + '" role="progressbar" style="width: '
      + data.prof_info.result * 20 + '%"></div>');
    $('#progress_grade').append('<div class="progress-bar ' + generateColor(data.prof_info.grade) + '" role="progressbar" style="width: '
      + data.prof_info.grade * 20 + '%"></div>');
    $('#progress_hard').append('<div class="progress-bar ' + generateColor(data.prof_info.hard) + '" role="progressbar" style="width: '
      + data.prof_info.hard * 20 + '%"></div>');
    $('#progress_outcome').append('<div class="progress-bar ' + generateColor(data.prof_info.reward) + '" role="progressbar" style="width: '
      + data.prof_info.reward * 20 + '%"></div>');

    data.comments.sort(function (a, b) {
      if (a.verified != b.verified) return b.verified - a.verified;
      else if (a.upvote != b.upvote) return (b.upvote) - (a.upvote);
      else if (a.downvote != b.downvote) return (b.downvote) - (a.downvote);
      else return b.id - a.id;
    });

    var temp_desc = '';
    for (var i in data.comments) {
      addReview(data.comments[i], '#panel_reviews');
      if (i < 6)
        temp_desc += data.comments[i].content + '. ';
    }
    $("meta[name='description']").attr('content', '講師 ' + instructor + ' 在課程 ' + course_code + ' 的中評分及評價. ' + temp_desc);

    refreshTooltips(".vote-button");

    if(data.prof_info.offer_info.is_offer){
      $('#show_timetable').css('display','inline-block')
      var meta="<small class=\"text-muted\"><em>Data Sources: reg.um.edu.mo</em></small>"
      for (const n in data.prof_info.offer_info.schedules) {
        meta+=addCourseSection(data.prof_info.offer_info.schedules[n])
      }

      $('#timetable_body').html(meta)
    }
  },
  error: function (data) {
    Sentry.captureException(data);
    $("#panel_reviews").append('<div class="alert alert-info alert-dismissible fade show" role="alert" style="width: 100%">還沒有人評價過，做第一個評價者吧！<br>No reviews yet. Be the first to comment!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
  }
});

$("#button_submit").click(function () {
  document.location.href = "/submit.html?course=" + course_code + "&instructor=" + instructor;
});

