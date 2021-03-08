var entry =  window.location.pathname.split('/')[1];
var course_code = window.location.pathname.split('/')[2];
var prof_name = window.location.pathname.split('/')[3];
setTimeout(function () {
    if(!(entry.indexOf('html')>0 || course_code == undefined))
        window.location.href = '/'+ entry +'.html?course=' + course_code + '&instructor=' + prof_name;
}, 0);