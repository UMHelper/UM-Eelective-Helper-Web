var API_server = "https://mpserver.umeh.top";

var search_button = document.getElementById("search");

function changeType() {
  document.getElementById("course_input").placeholder = "Eg. " + (document.getElementById("byCrn").checked == true ? "ACCT1000" : "CHAN TAI MAN");
}

function myAlert(msg) {
  if (confirm(msg + '\n\nPress [OK] to feedback this issue. 按[確認]鍵向開發團隊反饋.\nPress [Cancel] to go back. 按[取消]返回.')) {
    location.href='./feedback.html';
  } else {
  }
}

function goSearch() {
  if (document.getElementById("course_input").value.length < 4) {
    document.getElementById("progress").style.visibility = "visible";
    alert("Length too short. Please type in accurate information to search.");
    document.getElementById("progress").style.visibility = "hidden";
  }
  else if (document.getElementById("byCrn").checked == true) {
    searcher(document.getElementById("course_input").value.toUpperCase());
  }
  else {
    redirect_ins(document.getElementById("course_input").value.toUpperCase());
  }

}

function goBack() {

  document.getElementById("ins_panel").innerHTML = "";

  document.getElementById("entry").style.display = "inherit";
  document.getElementById("info").style.display = "none";
  //document.getElementById("entry").style.visibility = "visible";
  //document.getElementById("info").style.visibility = "hidden";
}

function searcher(crn) {
  document.getElementById("progress").style.visibility = "visible";
  search_button.setAttribute("disabled", "");
  search_button.innerHTML = "Processing...";
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
          document.getElementById("entry").style.height = 0;

          search_button.innerHTML = "Search 搜索";
          search_button.removeAttribute("disabled");
          document.getElementById("course_input").removeAttribute("disabled");

          if (resp_json.prof_info.length === 0) {
            document.getElementById("course_rank").innerHTML = "Average: Not Available";
          } else {
            rank = 0;
            for (i in resp_json.prof_info) {
              rank += resp_json.prof_info[i].result;
              //document.getElementById("ins_panel").innerHTML += '<div class="page_container primary_white large10 medium10 small10 zi2 ins_info"><a href="./instructor.html?New_code=' + encodeURIComponent(resp_json.course_info.New_code) + "&prof_name=" + encodeURIComponent(resp_json.prof_info[i].name) + '" target="_blank"><div>' + resp_json.prof_info[i].name + '</div></a><span class="flex_text"> <div>' + resp_json.prof_info[i].num + ' Comments</div></span><span class="flex_text"><div>' + String((resp_json.prof_info[i].result * 2).toFixed(2)) + '/10</div></span><div class="bar" style="margin-top:0.5cm"><div class="barcontent" style="width: ' + resp_json.prof_info[i].result * 20 + '%"></div></div></div>'

              document.getElementById("ins_panel").innerHTML += '<div class="page_container primary_white large10 medium10 small10 zi2 ins_info"><a href="./instructor.html?New_code=' + encodeURIComponent(resp_json.course_info.New_code) + "&prof_name=" + encodeURIComponent(resp_json.prof_info[i].name) + '" target="_blank"><div class="flex_text">' + resp_json.prof_info[i].name + '</div></a><div class="flex_text">' + resp_json.prof_info[i].num + ' Comments</div><div class="flex_text">' + String((resp_json.prof_info[i].result * 2).toFixed(2)) + '/10</div><div class="bar" style="margin-top:0.5cm"><div class="barcontent" style="width: ' + resp_json.prof_info[i].result * 20 + '%"></div></div></div>'
            }

            document.getElementById("course_rank").innerHTML = "Average: " +
              String(((rank / resp_json.prof_info.length) * 2).toFixed(2)) +
              "/10";

            document.getElementById("progress").style.visibility = "hidden";
            document.getElementById("entry").style.display = "none";
            document.getElementById("info").style.display = "inherit";
          }
        } catch (e) {

          if (String(e).includes("New_Code"))
            myAlert("Cannot find the course, typo? 找不到這個課程，鍵入錯了嗎？ " + document.getElementById("course_input").value.toUpperCase());
          else
            myAlert("Unexpected error \rError：" + String(e));
          search_button.innerHTML = "Search";
          search_button.removeAttribute("disabled");
          document.getElementById("course_input").removeAttribute("disabled");
          document.getElementById("progress").style.visibility = "hidden";
          goBack()
        }
      }
    };

    request_search.open(
      "GET",
      API_server +
      "/course_info/?New_code=" + crn
    );

    document.getElementById("course_input").value = "";
    //document.getElementById("course_input").setAttribute("disabled", "");

    request_search.send();
  } catch (e) {
    alert("Network issue. Contact developers for help. " + String(e));
  }
}

function redirect_ins(ins) {
  document.location.href =
    "./prof_info.html?prof_name=" +
    encodeURIComponent(ins);
}

// init
search_button.onclick = goSearch;
document.getElementById("byCrn").onclick = changeType;
document.getElementById("byIns").onclick = changeType;
document.getElementById("back").onclick = goBack;

document
  .getElementById("course_input")
  .setAttribute("onkeypress", "if(event.keyCode==13) {goSearch()}");

document.getElementById("course_input").value = "";

goBack();

