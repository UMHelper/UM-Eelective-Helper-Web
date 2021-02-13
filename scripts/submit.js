
function goBack() {
    document.location.href = '/reviews/' + encodeURIComponent(course_code) + "/" + encodeURIComponent(prof_name);
}

// init
var url_params = new URLSearchParams(window.location.search);
var course_code = decodeURI(window.location.pathname.split('/')[2]).toUpperCase();
var prof_name = decodeURI(window.location.pathname.split('/')[3]).toUpperCase();
if (course_code == "UNDEFINED") {
    course_code = url_params.get("New_code");
    prof_name = url_params.get("prof_name");
}

document.getElementById("reminder").innerHTML = `Commenting on course ${course_code} for instructor ${prof_name}.`;
document.getElementById("course_number").setAttribute("value", course_code);
document.getElementById("prof_name").setAttribute("value", prof_name);
document.getElementById("submit_btn").onclick = function () {
    document.getElementById("sub_form").submit();
    document.getElementById("sub_form").style.display = "none";
    document.getElementById("reminder").innerHTML = "Thanks for your comment! 感謝您的評價！<br>Redirecting back..."
    setTimeout(() => { goBack(); }, 2000);

}
document.getElementById("back").onclick = goBack;
