var search_button = document.getElementById("search");

function changeType() {
    document.getElementById("course_input").placeholder = "Eg. " + (document.getElementById("byCrn").checked == true ? "ACCT1000" : "CHAN TAI MAN");
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
}

// init
/*search_button.onclick = goSearch;
document
    .getElementById("course_input")
    .setAttribute("onkeypress", "if(event.keyCode==13) {goSearch()}");

document.getElementById("course_input").value = "";*/

// get total num
$.ajax({
    url: API_server + "/get_stat/",
    dataType: "json",
    success: function (data) {
        var com = data.faculty_detail;
        for (var i in data.faculty_detail) {
            $("#numsPanel").append('<div class="numsItem"><div style="font-weight: bolder;">' + i + '</div><div>' + data.faculty_detail[i].comment + '</div></div>');
        }
    },
    error: function (data) {
        $("#numsPanel").replaceWith("ERROR");
    }
});

$.ajax({
    url: "https://api.github.com/repos/UMHelper/UM-Eelective-Helper-Web/branches/main",
    dataType: "json",
    success: function (data) {
        $('#version').replaceWith('<a href="'+ data.commit.html_url + '">'+ data.commit.commit.author.date);
    },
    error: function (data) {
        $('#version').replaceWith("ERROR");
    }
});