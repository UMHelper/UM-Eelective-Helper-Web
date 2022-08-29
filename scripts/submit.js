var course_code = $.urlParam('course').toUpperCase();
var instructor = $.urlParam('instructor').toUpperCase();


$(document).prop('title', "Submit Review | " + instructor + ' | ' + course_code + " | 澳大選咩課 What2Reg @UM");

$('link[rel="canonical"]').attr('href', 'https://www.umeh.top/submit.html?course=' + course_code + '?instructor=' + instructor);

$('#title_comment').append(instructor + ' for ' + course_code);
$('#New_code').val(course_code);
$('#prof_name').val(instructor);

$('.breadcrumb').append('<li class="breadcrumb-item"><a href="/search.html?keyword=' + course_code.substring(0, 4) + '">' + course_code.substring(0, 4) + '</a></li>');

$('.breadcrumb').append('<li class="breadcrumb-item"><a href="/course/' + course_code + '">' + course_code + '</a></li>');

$('.breadcrumb').append('<li class="breadcrumb-item"><a href="/reviews/' + course_code + '/' + instructor.replaceAll('/','$') + '">' + instructor + '</a></li>');

$('#sub_form').attr('action',);
$('#sub_form').attr('method', 'POST');

$("#submit_btn").click(function () {
    var form = $("#sub_form");
    if (!form[0].checkValidity())
        alert("請檢查下内容是否完整！\nSeems the form is incomplete! More details will help your classmates much!");
    else if ($("#content").val().trim().length < 10)
        alert("爲了幫助同學，請再詳細少少呀！\nMore details will help your classmates much!");
    else {
        $.ajax({
            url: API_server + '/submit_comment/',
            type: 'post',
            data: $('#sub_form').serialize(),
            success: function () {
                $('#title_comment').html('感謝您的評價！<br>Thanks for your comment! ');
                $('#sub_form').css('display', 'none');
            },
            error: function () {
                alert("遇到錯誤，請向我們反饋，謝謝！\nServer issue detected. Please send feedback to us. Thank you!");
            }
        });
    }
});
