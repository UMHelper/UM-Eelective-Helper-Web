var course_code = window.location.pathname.split('/')[2];
var prof_name = window.location.pathname.split('/')[2];
setTimeout(function () {
    window.location.href = '/instructor.html?New_code=' + encodeURIComponent(course_code) + '&prof_name=' + encodeURIComponent(prof_name);
}, 2000);