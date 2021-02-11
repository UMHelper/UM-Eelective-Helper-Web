var API_server = "https://mpserver.umeh.top";

function myAlert(msg) {
    if (confirm(msg + '\n\nPress [OK] to feedback this issue. Press [Cancel] to go back.\n 按[確認]鍵向開發團隊反饋. 按[取消]返回.')) {
        location.href = '/feedback.html';
    } else {
    }
}

var search_button = document.getElementById("search");

function changeType() {
    document.getElementById("course_input").placeholder = "Eg. " + (document.getElementById("byCrn").checked == true ? "ACCT1000" : "CHAN TAI MAN");
}



function getNums(resp_json) {
    var com = resp_json.faculty_detail;

    document.getElementById("connecting").innerHTML = "DATABASE OF REVIEWS";
    for (var i in com) {
        document.getElementById("numsPanel").innerHTML += '<div class="numsItem"><div style="font-weight: bolder;">' + i + '</div><div>' + com[i].comment + '</div></div>'
    }
}


function redirect_ins(ins) {
    
}

function goSearch() {
    document.getElementById("progress").style.visibility = "visible";
    if (document.getElementById("course_input").value.length < 4) {
        alert("Length too short. 多鍵入幾個字吧，太短了！");
    }
    else if (document.getElementById("byCrn").checked == true) {
        document.location.href =
        "/course/" +
        encodeURIComponent(document.getElementById("course_input").value.toUpperCase());
    }
    else {
        document.location.href =
        "/professor/" +
        encodeURIComponent(document.getElementById("course_input").value.toUpperCase());
    }
    document.getElementById("progress").style.visibility = "hidden";
}

// init
search_button.onclick = goSearch;
document.getElementById("byCrn").onclick = changeType;
document.getElementById("byIns").onclick = changeType;

document
    .getElementById("course_input")
    .setAttribute("onkeypress", "if(event.keyCode==13) {goSearch()}");

document.getElementById("course_input").value = "";

// get total num
try {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === XMLHttpRequest.DONE) {
            var resp_json = JSON.parse(req.responseText);
            getNums(resp_json);
        }
    };

    req.open("GET", API_server + "/get_stat/");
    req.send();
} catch (e) {
    myAlert(`Network issue or we're down😇. \n網路問題或者我們的服務中斷\n Error: ${e}.`);
}

