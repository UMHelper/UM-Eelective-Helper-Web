function goBack() {
  window.location.href = '/course/' + course_code;
}

function goFb() {
  window.location.href = '/feedback.html';
}

function submitReviews() {
  window.location.href = '/submit/' + course_code + '/' + prof_name;
}

function getCourseInfo(resp_json) {

  document.getElementById("course_name").innerHTML = resp_json.course_info.courseTitleEng;
  document.getElementById("course_name_chi").innerHTML = resp_json.course_info.courseTitleChi;
  document.getElementById("course_info").innerHTML = "Offered by " + resp_json.course_info.Offering_Department + ", " + resp_json.course_info.Offering_Unit;
  document.getElementById("medium").innerHTML = resp_json.course_info.Medium_of_Instruction + " Instruction";
  document.getElementById("credits").innerHTML = resp_json.course_info.Credits + " Credits";
  document.getElementById("overall").style.width = resp_json.prof_info.result * 20 + "%";
  document.getElementById("or").innerHTML = (resp_json.prof_info.result * 2).toFixed(1) + "/10";
  document.getElementById("tension").style.width = resp_json.prof_info.hard * 20 + "%";
  document.getElementById("lw").innerHTML = (resp_json.prof_info.hard * 2).toFixed(1) + "/10";
  document.getElementById("attendance").style.width = resp_json.prof_info.attendance * 20 + "%";
  document.getElementById("ac").innerHTML = (resp_json.prof_info.attendance * 2).toFixed(1) + "/10";
  document.getElementById("marks").style.width = resp_json.prof_info.grade * 20 + "%";
  document.getElementById("gm").innerHTML = (resp_json.prof_info.grade * 2).toFixed(1) + "/10";
  document.getElementById("clo").style.width = resp_json.prof_info.reward * 20 + "%";
  document.getElementById("lo").innerHTML = (resp_json.prof_info.reward * 2).toFixed(1) + "/10";

}

function generateAttitude(value, type, style) { //style: boolean
  var msg = "";
  var color = "grey";
  if (value < 1.67) {
    color = "red";
    switch (type) {
      case "attendance":
        msg += "堂堂點名 😡"
        break;
      case "marks":
        msg += "爛grade 😭"
        break;
      case "workload":
        msg += "好繁重 😫"
        break;
      case "recommend":
        msg += "👎"
        break;
    }
  }
  else if (value < 3.33) {
    color = "orange";
    switch (type) {
      case "attendance":
        msg = "有時點名 🔖"
        break;
      case "marks":
        msg = "給分ok 🆗"
        break;
      case "workload":
        msg = "工作量一般 🤔"
        break;
      case "recommend":
        msg = "👌"
        break;
    }
  }
  else {
    color = "green";
    switch (type) {
      case "attendance":
        msg = "少點名 🏝️"
        break;
      case "marks":
        msg = "給分靚 💯"
        break;
      case "workload":
        msg = "輕鬆 🥳"
        break;
      case "recommend":
        msg = "👍"
        break;
    }
  }
  return (style == false ? msg : ('<div class="score" style="color: ' + color + '">' + msg + '</div>'));
}

function getComments(course_json_obj) {
  var meta_desc = '講師' + prof_name + '在' + course_code + '課程中的評價。';
  for (var i in course_json_obj.comments) {
    document.getElementById("reviews").innerHTML +=
      '<div class="page_container primary_white large3 medium5 small12 zi2 ins_info">'
      + '<a class="link" href="#"><h4>' + course_json_obj.comments[i].pub_time + " " + generateAttitude(course_json_obj.comments[i].recommend, "recommend", false) + '</h4></a>'
      + '<p class="context">' + course_json_obj.comments[i].content + '</p>'
      + generateAttitude(course_json_obj.comments[i].hard, "workload", true)
      + generateAttitude(course_json_obj.comments[i].attendance, "attendance", true)
      + generateAttitude(course_json_obj.comments[i].grade, "marks", true)
      + ' </div>';
    if (i < 3) {
      meta_desc += course_json_obj.comments[i].content.replace(/(\r\n|\n|\r)/gm, "") + ' ';
    }
    //'<button id="share"' + no + ' class="primary_green right" style="display: inline-block;vertical-align: middle;padding:0.15cm"><i class="ms-Icon ms-Icon--Share icon-small"></i></button>'
  }
  metas[index_desc].setAttribute('content', meta_desc);
  document.getElementById("progress").style.visibility = "hidden";
}

function share(content) {
  content = "\n" + window.location.pathname.split('/')[2] + " " + window.location.pathname.split('/')[3] + "\n" + "Come and see more reviews on this course! 快來看一下有關此課程的更多評論吧\n\n" + content;
  if (navigator.share) {
    navigator.share({
      title: document.title,
      text: content,
      url: document.URL,
    })
      .then(() => console.log('Successful share'))
      .catch((error) => myAlert('I guess you canceled sharing. If not, it is because you browser\'s lack of sharing API support. \n我猜你取消了分享。如果并没有的话，你的瀏覽器應該并不支持分享功能API。', error));
  }
}


// init
var url_params = new URLSearchParams(window.location.search);
var course_code = decodeURI(window.location.pathname.split('/')[2]).toUpperCase();
var prof_name = decodeURI(window.location.pathname.split('/')[3]).replace('%2F', '/').toUpperCase();
if (course_code == "UNDEFINED") {
  course_code = url_params.get("New_code");
  prof_name = url_params.get("prof_name");
}

//add cononical label
var meta = document.createElement('link');
meta.setAttribute('rel', 'canonical');
meta.setAttribute('href', 'https://www.umeh.top/reviews/'+ course_code + '/' + prof_name);
document.getElementsByTagName('head')[0].appendChild(meta);

document.getElementById("title").innerHTML = course_code ;
document.getElementById("title_url").setAttribute("href", "/course/" + course_code) ;
document.getElementById("ins").innerHTML = prof_name;
document.getElementById("ins_url").setAttribute("href", "/professor/" + prof_name) ;
document.title = prof_name + " " + course_code + " | 澳大選咩課 What2Reg @UM";
document.getElementById("back").onclick = goBack;
document.getElementById("submit").onclick = submitReviews;
document.getElementById("share").onclick = share;
document.getElementById("feedback").onclick = goFb;

//find description meta
var index_desc;
var metas = document.getElementsByTagName('meta');
for (let j = 0; j < metas.length; j++) {
  if (metas[j].getAttribute('name') === 'description') {
    index_desc = j;
  }
}


try {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (req.readyState === XMLHttpRequest.DONE) {
      if (this.status == 500) { // the backend just return 500 when no comments found.
        document.getElementById("reviews").innerHTML += '<div class="page_container primary_white large3 medium5 small12 zi2 ins_info"><p>No reviews yet 😥 Be the first to submit!</p><p>暫無評價，做第一個開路者吧！</p> </div>';
        document.getElementById("course_name").innerHTML = "NO REVIEWS YET";
        document.getElementById("course_name_chi").innerHTML = "無評價";
        document.getElementById("credits").innerHTML = "Submit the first review if you have taken this course by this instructor!";
        document.getElementById("course_info").innerHTML = "如果你熟悉這個講師的這個課程，請發佈評價！";
        document.getElementById("medium").innerHTML = "";
        document.getElementById("overall").style.width = "0%";
        document.getElementById("tension").style.width = "0%";
        document.getElementById("attendance").style.width = "0%";
        document.getElementById("marks").style.width = "0%";
        document.getElementById("clo").style.width = "0%";
        setTimeout(() => {
          myAlert("Hey you are the one😲 — There's no comment yet for this course. Be the first to submit your review! \n嘿，也許這是一個巧合——這門課還沒有評價！做第一個評價的人吧~\n\nIf you think this is a system mistake 如果閣下認爲這是一個系統問題,");
        }, 1000);
      }
      else {
        var resp_text = req.responseText;
        var resp_json = JSON.parse(resp_text);
        try {
          if (resp_json.course_info.New_code === undefined) {
            throw "Undefined New_code.";
          }
          getCourseInfo(resp_json);
          getComments(resp_json);
        } catch (e) {
          myAlert(`Seems to be a backend issue; please try again and contact developers. Error: ${e}.`);
        }
      }
    }
  };

  req.open(
    "GET",
    API_server +
    "/all_comment_info/?New_code=" +
    encodeURIComponent(course_code) +
    "&prof_name=" +
    encodeURIComponent(prof_name)
  );
  req.send();
} catch (e) {
  myAlert(`Network issue; please try again or contact developers. Error: ${e}.`);
}


