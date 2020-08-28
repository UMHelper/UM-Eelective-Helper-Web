var API_server = "http://mpserver.umeh.top";

function modify_title(course_json_obj) {
  document.getElementById("title").innerHTML =
    course_json_obj.course_info.New_code;
  document.getElementById("course_name").innerHTML =
    course_json_obj.course_info.courseTitleEng;
  document.getElementById("course_info").innerHTML =
    `学院：${course_json_obj.course_info.Offering_Unit}` +
    `&nbsp;&nbsp;&nbsp;专业：${course_json_obj.course_info.Offering_Department}`;
  document.getElementById("instructor_name").innerHTML =
    course_json_obj.prof_info.name;
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
  } catch (e) {}
  document.getElementById("result1").innerHTML = `总评：${(
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
  } catch (e) {}
  document.getElementById("result2").innerHTML = `轻松程度：${(
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
  } catch (e) {}
  document.getElementById("result3").innerHTML = `给分情况：${(
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
  } catch (e) {}
  document.getElementById("result4").innerHTML = `学习收获：${(
    course_json_obj.prof_info.reward * 2
  ).toFixed(2)}/10`;
}
function comment_gen(course_json_obj) {
  for (var i in course_json_obj.comments) {
    document.getElementById(
      "comment_li_real_part"
    ).innerHTML += `<tr><td class="mdl-shadow--2dp">${course_json_obj.comments[i].content}</td></tr>`;
  }
}
try {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function () {
    var resp_text = req.responseText;
    var resp_json = JSON.parse(resp_text);
    try {
      if (resp_json.course_info.New_code === undefined) {
        throw "New_code未定义。";
      }
      modify_title(resp_json);
      comment_gen(resp_json);
    } catch (e) {
      alert(`后台内部异常，错误代码：${e}，请重试。`);
    }
  };

  var url_params = new URLSearchParams(window.location.search);
  document
    .getElementById("make_comment")
    .setAttribute("href", "./comment.html" + window.location.search);

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
  alert(`网络连接异常，错误代码:${e}，请重试。`);
}
