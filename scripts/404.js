var course_code = window.location.pathname.split('/')[2];
var prof_name = window.location.pathname.split('/')[3];
setTimeout(function () {
    window.location.href = '/instructor.html?New_code=' + course_code + '&prof_name=' + prof_name;
}, 2000);