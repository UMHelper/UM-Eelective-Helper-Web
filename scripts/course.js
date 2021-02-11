var API_server = "https://mpserver.umeh.top";


function myAlert(msg) {
  if (confirm(msg + '\n\nPress [OK] to feedback this issue. Press [Cancel] to go back.\n 按[確認]鍵向開發團隊反饋. 按[取消]返回.')) {
    location.href = '/feedback.html';
  } else {
    goBack();
  }
}

function goBack() {
  document.location.href = "/";
}

function searcher(crn) {
  var request_search = new XMLHttpRequest();

  try {
    request_search.onreadystatechange = function () {
      if (request_search.readyState === XMLHttpRequest.DONE) {
        var resp_text = request_search.responseText;

        try {
          var resp_json = JSON.parse(resp_text);
          if (resp_json.course_info.New_code === undefined) {
            throw "Undefined: New_Code. Contact developers for help.";
          }

          document.getElementById("title").innerHTML =
            resp_json.course_info.New_code;

          document.getElementById("course_name").innerHTML =
            resp_json.course_info.courseTitleEng;

          document.getElementById("course_name_chi").innerHTML =
            resp_json.course_info.courseTitleChi;

          document.getElementById("course_info").innerHTML =
            "Offered by " + resp_json.course_info.Offering_Department + ", " + resp_json.course_info.Offering_Unit;

          document.getElementById("medium").innerHTML = resp_json.course_info.Medium_of_Instruction + " Instruction";
          document.getElementById("credits").innerHTML = resp_json.course_info.Credits + " Credits";

          if (resp_json.prof_info.length === 0) {
            document.getElementById("course_rank").innerHTML = "Average: Not Available";
          } else {
            rank = 0;
            for (i in resp_json.prof_info) {
              rank += resp_json.prof_info[i].result;
              //document.getElementById("ins_panel").innerHTML += '<div class="page_container primary_white large10 medium10 small10 zi2 ins_info"><a href="/reivews.html?New_code=' + encodeURIComponent(resp_json.course_info.New_code) + "&prof_name=" + encodeURIComponent(resp_json.prof_info[i].name) + '" target="_blank"><div>' + resp_json.prof_info[i].name + '</div></a><span class="flex_text"> <div>' + resp_json.prof_info[i].num + ' Comments</div></span><span class="flex_text"><div>' + String((resp_json.prof_info[i].result * 2).toFixed(2)) + '/10</div></span><div class="bar" style="margin-top:0.5cm"><div class="barcontent" style="width: ' + resp_json.prof_info[i].result * 20 + '%"></div></div></div>'
              //+"?New_code="+ encodeURIComponent(resp_json.course_info.New_code) + "&prof_name=" + encodeURIComponent(resp_json.prof_info[i].name) 
              document.getElementById("ins_panel").innerHTML += '<div class="page_container primary_white large10 medium10 small10 zi2 ins_info"><a href="/reviews/' + encodeURIComponent(resp_json.course_info.New_code) + "/" + encodeURIComponent(resp_json.prof_info[i].name) +'" target="_blank"><div class="flex_text">' + resp_json.prof_info[i].name + '</div></a><div class="flex_text">' + resp_json.prof_info[i].num + ' Comments</div><div class="flex_text">' + String((resp_json.prof_info[i].result * 2).toFixed(2)) + '/10</div><div class="bar" style="margin-top:0.5cm"><div class="barcontent" style="width: ' + resp_json.prof_info[i].result * 20 + '%"></div></div></div>'
            }

            document.getElementById("course_rank").innerHTML = "Average: " +
              String(((rank / resp_json.prof_info.length) * 2).toFixed(2)) +
              "/10";

          }
        } catch (e) {

          if (String(e).includes("New_Code"))
            myAlert("Cannot find the course, typo? \n找不到這個課程，鍵入錯了嗎？ " + course_code);
          else
            myAlert("Unexpected error \rError：" + String(e));
        }
      }
    };

    request_search.open(
      "GET",
      API_server +
      "/course_info/?New_code=" + crn
    );

    request_search.send();
  } catch (e) {
    alert("Network issue. Contact developers for help. " + String(e));
  }
}

// init
var url_params = new URLSearchParams(window.location.search);
var course_code = url_params.get("New_code").toUpperCase();
if (course_code == null)
{
  course_code = decodeURI(window.location.pathname.split('/')[2]).toUpperCase();
}
document.title = course_code + " | 澳大選咩課 What2Reg @UM";
document.getElementById("back").onclick = goBack;
searcher(course_code)