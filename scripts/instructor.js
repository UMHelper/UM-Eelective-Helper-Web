
var API_server = "https://mpserver.umeh.top";

function mymyAlert(msg) {
  if (confirm(msg + '\n\nPress [OK] to feedback this issue. Press [Cancel] to go back.\n 按[確認]鍵向開發團隊反饋. 按[取消]返回.')) {
    location.href = '/feedback.html';
  } else {
  }
}

function add_course(course_json_obj, course_number) {
  document.getElementById("name_of_prof").innerHTML = course_code;
  document.getElementById("viewport").innerHTML += `
            <h2><a target="_blank" href="/reviews/${encodeURIComponent(course_json_obj.course_info.New_code)}/${encodeURIComponent(course_json_obj.prof_info.name)}">${course_json_obj.course_info.New_code}</a></h2>
            <h2>
            ${course_json_obj.course_info.courseTitleEng}
            </h2>
            <h2>
                Offered by ${course_json_obj.course_info.Offering_Department}, ${course_json_obj.course_info.Offering_Unit}
            </h2>
            <div class="mdl-card mdl-shadow--2dp" style="margin:0 auto;">
            <div class="mdl-card__title">
            </div>
            <div class="mdl-card__supporting-text">
                <div class="mdl-slider__container">
  <input disabled class="mdl-slider mdl-js-slider is-upgraded" type="range" min="0" max="100" value="${10 * (course_json_obj.prof_info.result * 2)}" tabindex="0" data-upgraded=",MaterialSlider"><div class="mdl-slider__background-flex">
  <div class="mdl-slider__background-lower" style="flex: ${0.1 * (course_json_obj.prof_info.result * 2)} 1 0%;">
  </div>
  <div class="mdl-slider__background-upper" style="flex: ${1 - (0.1 * (course_json_obj.prof_info.result * 2))} 1 0%;"></div>
  </div>
</div>
                <p>Overall Recommended: ${(
      course_json_obj.prof_info.result * 2
    ).toFixed(2)}/10</p>
                <div class="mdl-slider__container">
  <input disabled class="mdl-slider mdl-js-slider is-upgraded" type="range" min="0" max="100" value="${10 * (course_json_obj.prof_info.hard * 2)}" tabindex="0" data-upgraded=",MaterialSlider"><div class="mdl-slider__background-flex">
  <div class="mdl-slider__background-lower" style="flex: ${0.1 * (course_json_obj.prof_info.hard * 2)} 1 0%;">
  </div>
  <div class="mdl-slider__background-upper" style="flex: ${1 - (0.1 * (course_json_obj.prof_info.hard * 2))} 1 0%;"></div>
  </div>
</div>
                <p>Light Workload: ${(
      course_json_obj.prof_info.hard * 2
    ).toFixed(2)}/10</p>
                <div class="mdl-slider__container">
  <input disabled class="mdl-slider mdl-js-slider is-upgraded" type="range" min="0" max="100" value="${10 * (course_json_obj.prof_info.grade * 2)}" tabindex="0" data-upgraded=",MaterialSlider"><div class="mdl-slider__background-flex">
  <div class="mdl-slider__background-lower" style="flex: ${0.1 * (course_json_obj.prof_info.grade * 2)} 1 0%;">
  </div>
  <div class="mdl-slider__background-upper" style="flex: ${1 - (0.1 * (course_json_obj.prof_info.grade * 2))} 1 0%;"></div>
  </div>
</div>
                <p>Good Marks: ${(
      course_json_obj.prof_info.grade * 2
    ).toFixed(2)}/10</p>
                <div class="mdl-slider__container">
  <input disabled class="mdl-slider mdl-js-slider is-upgraded" type="range" min="0" max="100" value="${10 * (course_json_obj.prof_info.reward * 2)}" tabindex="0" data-upgraded=",MaterialSlider"><div class="mdl-slider__background-flex">
  <div class="mdl-slider__background-lower" style="flex: ${0.1 * (course_json_obj.prof_info.reward * 2)} 1 0%;">
  </div>
  <div class="mdl-slider__background-upper" style="flex: ${1 - (0.1 * (course_json_obj.prof_info.reward * 2))} 1 0%;"></div>
  </div>
</div>
                <p>Learning Outcome: ${(
      course_json_obj.prof_info.reward * 2
    ).toFixed(2)}/10</p>
            </div>
            </div>
            `
}

// init
var url_params = new URLSearchParams(window.location.search);
var course_code = url_params.get("New_code");
if (course_code == null)
{
  course_code = decodeURI(window.location.pathname.split('/')[2]);
}

try {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function () {
    if (req.readyState === XMLHttpRequest.DONE) {
      var resp_text = req.responseText;
      try {
        var resp_json = JSON.parse(resp_text);

        try {
          if (resp_json.prof_info.name === undefined) {
            throw "name未定義。";
          }

          for (var k in resp_json.course) {
            add_course(resp_json.course[k], k);
          }

          if (resp_json.course.length === 0) {
            myAlert("Instructor not found or he runs no course.");
            window.location = "/index.html"
          }
        } catch (e) {
          myAlert(`Seems to be a backend issue. ${e}; please try again.`);
          window.location = "/index.html"
        }
      } catch (e) {

        myAlert("Instructor not found or he runs no course. " + String(e));
        window.location = "/index.html"
      }
    }
  };

  var url_params = new URLSearchParams(window.location.search);

  req.open(
    "GET",
    API_server +
    "/prof_info/?name=" +
    encodeURIComponent(course_code)
  );
  req.send();
} catch (e) {
  myAlert(`Network issue. 網路鏈結異常，錯誤代號：${e}，請重試。`);
}
