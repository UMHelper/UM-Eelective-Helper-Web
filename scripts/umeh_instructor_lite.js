var API_server = "https://mpserver.umeh.top";

function modify_title(course_json_obj) {
  document.getElementById("title").innerHTML =
    `<a href="./instructor.html?New_code=${encodeURIComponent(course_json_obj.course_info.New_code)}&prof_name=${encodeURIComponent(course_json_obj.prof_info.name)}>${course_json_obj.course_info.New_code}</a>`;
  document.getElementById("course_name").innerHTML =
    course_json_obj.course_info.courseTitleEng;
  document.getElementById("course_info").innerHTML =
    `學院：${course_json_obj.course_info.Offering_Unit}` +
    `&nbsp;&nbsp;&nbsp;專業：${course_json_obj.course_info.Offering_Department}`;
  document
    .getElementById("progress_total")
    .addEventListener("mdl-componentupgraded", function () {
      this.MaterialProgress.setProgress(
        10 * (course_json_obj.prof_info.result * 2)
      );
    });
  try {
    document
      .getElementById("progress_total")
      .MaterialProgress.setProgress(
        10 * (course_json_obj.prof_info.result * 2)
      );
  } catch (e) { }
  document.getElementById("result1").innerHTML = `總評：${(
    course_json_obj.prof_info.result * 2
  ).toFixed(2)}/10`;
  document
    .getElementById("progress_relax")
    .addEventListener("mdl-componentupgraded", function () {
      this.MaterialProgress.setProgress(
        10 * (course_json_obj.prof_info.hard * 2)
      );
    });
  try {
    document
      .getElementById("progress_relax")
      .MaterialProgress.setProgress(10 * (course_json_obj.prof_info.hard * 2));
  } catch (e) { }
  document.getElementById("result2").innerHTML = `輕鬆程度：${(
    course_json_obj.prof_info.hard * 2
  ).toFixed(2)}/10`;
  document
    .getElementById("progress_score")
    .addEventListener("mdl-componentupgraded", function () {
      this.MaterialProgress.setProgress(
        10 * (course_json_obj.prof_info.grade * 2)
      );
    });
  try {
    document
      .getElementById("progress_score")
      .MaterialProgress.setProgress(10 * (course_json_obj.prof_info.grade * 2));
  } catch (e) { }
  document.getElementById("result3").innerHTML = `給分情況：${(
    course_json_obj.prof_info.grade * 2
  ).toFixed(2)}/10`;
  document
    .getElementById("progress_harvest")
    .addEventListener("mdl-componentupgraded", function () {
      this.MaterialProgress.setProgress(
        10 * (course_json_obj.prof_info.reward * 2)
      );
    });
  try {
    document
      .getElementById("progress_harvest")
      .MaterialProgress.setProgress(
        10 * (course_json_obj.prof_info.reward * 2)
      );
  } catch (e) { }
  document.getElementById("result4").innerHTML = `學習收穫：${(
    course_json_obj.prof_info.reward * 2
  ).toFixed(2)}/10`;
}

try {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function () {
    if (req.readyState === XMLHttpRequest.DONE) {
      var resp_text = req.responseText;
      var resp_json = JSON.parse(resp_text);
      try {
        if (resp_json.course_info.New_code === undefined) {
          throw "New_code未定義。";
        }
        modify_title(resp_json);
      } catch (e) {
        alert(`後臺出現異常，錯誤代號：${e}，請重試。`);
      }
    }
  };

  var url_params = new URLSearchParams(window.location.search);

  req.open(
    "GET",
    API_server +
    "/comment_info/?New_code=" +
    encodeURIComponent(url_params.get("New_code")) +
    "&prof_name=" +
    encodeURIComponent(url_params.get("prof_name"))
  );
  req.send();
} catch (e) {
  alert(`網路鏈結異常，錯誤代號：${e}，請重試。`);
}
