var API_server = "https://mpserver.umeh.top";

function goBack() {
  window.location.href = './index.html'
}

function submitReviews() {
  var url_params = new URLSearchParams(window.location.search);
  window.location.href = './submit.html?New_code=' + url_params.get("New_code") + '&prof_name=' + url_params.get("prof_name");
}

function getCourseInfo(resp_json) {

  document.getElementById("title").innerHTML =
    resp_json.course_info.New_code;

  document.getElementById("course_name").innerHTML =
    resp_json.course_info.courseTitleEng;

  document.getElementById("ins").innerHTML =
    resp_json.prof_info.name;

  document.getElementById("course_name_chi").innerHTML =
    resp_json.course_info.courseTitleChi;

  document.getElementById("course_info").innerHTML =
    "Offered by " + resp_json.course_info.Offering_Department + ", " + resp_json.course_info.Offering_Unit;

  document.getElementById("medium").innerHTML = resp_json.course_info.Medium_of_Instruction + " Instruction";
  document.getElementById("credits").innerHTML = resp_json.course_info.Credits + " Credits";
  document.getElementById("overall").style.width = resp_json.prof_info.result * 20 + "%";
  document.getElementById("or").innerHTML += " (" + (resp_json.prof_info.result * 2).toFixed(2) + "/10)";
  document.getElementById("tension").style.width = resp_json.prof_info.hard * 20 + "%";
  document.getElementById("lw").innerHTML += " (" + (resp_json.prof_info.hard * 2).toFixed(2) + "/10)";
  document.getElementById("attendance").style.width = resp_json.prof_info.attendance * 20 + "%";
  document.getElementById("ac").innerHTML += " (" + (resp_json.prof_info.attendance * 2).toFixed(2) + "/10)";
  document.getElementById("marks").style.width = resp_json.prof_info.grade * 20 + "%";
  document.getElementById("gm").innerHTML += " (" + (resp_json.prof_info.grade * 2).toFixed(2) + "/10)";
  document.getElementById("clo").style.width = resp_json.prof_info.reward * 20 + "%";
  document.getElementById("lo").innerHTML += " (" + (resp_json.prof_info.reward * 2).toFixed(2) + "/10)";

}


function getComments(course_json_obj) {
  var no = 1;
  for (var i in course_json_obj.comments) {

    document.getElementById("reviews").innerHTML += '<div class="page_container primary_white large3 medium5 small12 zi2 ins_info"><a href="#">' + no + '#<a/><p>' + course_json_obj.comments[i].content + '</p><p class="score">(Light ' + (course_json_obj.comments[i].hard * 2).toFixed(0) + '/10, Marks ' + (course_json_obj.comments[i].grade * 2).toFixed(0) + '/10)</p> </div>'
    //<button id="share" class="primary_green right" style="display: inline-block;vertical-align: middle;padding:0.15cm"><i class="ms-Icon ms-Icon--Share icon-small"></i></button>
    no++;
  }
}

function share(content) {
  content = "\n" + url_params.get("New_code") + " " + url_params.get("prof_name") + "\n" + "Come and see more reviews on this course! 快來看一下有關此課程的更多評論吧\n\n" + content;
  if (navigator.share) {
    navigator.share({
      title: "澳大選咩課 What@Reg @UM",
      text: content,
      url: document.URL,
    })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
  }
}


try {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function () {
    if (req.readyState === XMLHttpRequest.DONE) {
      var resp_text = req.responseText;
      var resp_json = JSON.parse(resp_text);
      try {
        if (resp_json.course_info.New_code === undefined) {
          throw "Undefined New_code. Contact developers for help.";
        }
        getCourseInfo(resp_json);
        getComments(resp_json);
      } catch (e) {
        alert(`Seems to be a backend issue; please try again. Error: ${e}.`);
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
  alert(`Network issue; please try again. Error: ${e}.`);
}


// init
document.getElementById("back").onclick = goBack;
document.getElementById("submit").onclick = submitReviews;
document.getElementById("share").onclick = share;



