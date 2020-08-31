var API_server = "https://mpserver.umeh.top";

var search_button = document.getElementById("search");

function changeType() {
  document.getElementById("course_input").placeholder = "Eg. " + (document.getElementById("byCrn").checked == true ? "ACCT1000" : "CHAN TAI MAN");
}

function goSearch() {

  if (document.getElementById("byCrn").checked == true) {
    searcher(document.getElementById("course_input").value.toUpperCase());
  }
  else {
    redirect_ins(document.getElementById("course_input").value.toUpperCase());
  }

}

function searcher(crn) {
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
            throw "Undefined: New_code. Contact developers for help.";
          }

          document.getElementById("title").innerHTML =
            resp_json.course_info.New_code;

          document.getElementById("course_name").innerHTML =
            resp_json.course_info.courseTitleEng;

          document.getElementById("course_info").innerHTML =
            "學院：" +
            resp_json.course_info.Offering_Unit +
            "&nbsp;&nbsp;&nbsp;專業：" +
            resp_json.course_info.Offering_Department;

          document.getElementById("judge_table").removeAttribute("hidden");
          document.getElementById("umicon").setAttribute("hidden", "");
          search_button.innerHTML = "查詢";
          search_button.removeAttribute("disabled");
          document.getElementById("course_num").removeAttribute("disabled");

          if (resp_json.prof_info.length === 0) {
            document.getElementById("course_rank").innerHTML = "暫時沒有評分";
            document
              .getElementById("judge_table_body")
              .setAttribute("hidden", "");
            document
              .getElementById("judge_table_head")
              .setAttribute("hidden", "");
          } else {
            rank = 0;
            document.getElementById("judge_table_body").innerHTML = " ";
            for (i in resp_json.prof_info) {
              rank += resp_json.prof_info[i].result;
              document.getElementById("judge_table_body").innerHTML +=
                '<tr><td class="mdl-data-table__cell--non-numeric"><a href="./instructor.html?New_code=' +
                encodeURIComponent(resp_json.course_info.New_code) +
                "&prof_name=" +
                encodeURIComponent(resp_json.prof_info[i].name) +
                '" target="_blank">' +
                resp_json.prof_info[i].name +
                "</a>" +
                "</td><td>" +
                String((resp_json.prof_info[i].result * 2).toFixed(2)) +
                "/10</td></tr>";
            }

            document.getElementById("course_rank").innerHTML =
              String(((rank / resp_json.prof_info.length) * 2).toFixed(2)) +
              "/10";

            document
              .getElementById("judge_table_body")
              .removeAttribute("hidden");
            document
              .getElementById("judge_table_head")
              .removeAttribute("hidden");
          }
        } catch (e) {
          alert("輸入的課號無效，請重試。\r錯誤代號：" + String(e));

          search_button.innerHTML = "查詢";
          search_button.removeAttribute("disabled");
          document.getElementById("course_num").removeAttribute("disabled");
        }
      }
    };

    request_search.open(
      "GET",
      API_server +
      "/course_info/?New_code=" + crn
    );

    document.getElementById("course_input").value = "";
    document.getElementById("course_input").setAttribute("disabled", "");

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


search_button.onclick = goSearch;
document.getElementById("byCrn").onclick = changeType;
document.getElementById("byIns").onclick = changeType;

document
  .getElementById("course_input")
  .setAttribute("onkeypress", "if(event.keyCode==13) {searcher()}");

document.getElementById("course_input").value = "";

//document.getElementById("search_instructor").onclick = redirect_ins;

//document  .getElementById("ins_name")  .setAttribute("onkeypress", "if(event.keyCode==13) {redirect_ins()}");
