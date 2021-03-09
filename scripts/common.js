var API_server = "https://mpserver.umeh.top";
var inline_ad = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>\n<ins class="adsbygoogle"\nstyle="display:block"\ndata-ad-format="fluid"\ndata-ad-layout-key="-h2-o+o-38+av"\ndata-ad-client="ca-pub-6229219222351733"\ndata-ad-slot="9401190562"></ins>\n<script>\n(adsbygoogle = window.adsbygoogle || []).push({});\n</script>';

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'UA-176924130-2');

try {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
            .then(reg => console.log('Service Worker registered', reg))
            .catch(err => console.log('Not supported.', err));
    }
} catch (error) {

}

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    return decodeURI(results[1]) || 0;
}
// get current version
$.ajax({
    url: "https://api.github.com/repos/UMHelper/UM-Eelective-Helper-Web/branches/bootstrap",
    dataType: "json",
    success: function (data) {
        $('#version').replaceWith('<a href="' + data.commit.html_url + '">' + data.commit.commit.author.date);
    },
    error: function (data) {
        $('#version').replaceWith("ERROR");
    }
});

$("#button_search_nav").click(function () {
    if ($("#input_search_nav").val().length < 4)
        alert("關鍵字太短了! \nThe keyword is too short!");
    else
        document.location.href = "/search.html?keyword=" + $("#input_search_nav").val().trim() + "&instructor=" + $("#searchByInstructor").is(":checked");
});

$('#input_search_nav').keypress(function (e) {
    if (e.which == 13) {
        $(this).blur();
        $('#button_search_nav').focus().click();
    }
});

function generateColor(value) {
    var color = "";
    if (value > 3.33) {
        color = "bg-success text-light";
    }
    else if (value > 1.67) {
        color = "bg-warning text-dark";
    }
    else if (value > 0) {
        color = "bg-danger text-light";
    }
    return color;
}

function generateAttitude(value) { 
    if (value > 3.33) {
        return ("👍");
    }
    else if (value > 1.67) {
        return ("👌");
    }
    else {
        return ("👎");
    }
}


function addCourse(course, framework, prof_name, value) {
    var url = "/" + (prof_name ? "reviews" : "course") + "/" + course.New_code + "/" + (prof_name ? prof_name.replaceAll('/', '$') : "");
    $(framework).append('<div class="col"><div class="shadow card "><h2 class="h6 card-header border-light ' + generateColor(value) + '">'
        + course.New_code
        + '</h2><a href="' + url + '"><div class="card-body"><h3 class="h6 card-text">'
        + course.courseTitleEng + '</h3><h3 class="h6 card-text">'
        + course.courseTitleChi + '</h3></div></a><div class="card-footer border-light"><div class="meta"><div class="attr">Credits</div><div class="cont">'
        + course.Credits + '</div></div><div class="meta"><div class="attr">Dept</div><div class="cont">'
        + (course.Offering_Department ? course.Offering_Department : '-') + '</div></div><div class="meta"><div class="attr">Faculty</div><div class="cont">'
        + course.Offering_Unit + '</div></div><div class="meta"><div class="attr">Language</div><div class="cont">'
        + (course.Medium_of_Instruction ? course.Medium_of_Instruction : '-') + '</div></div></div></div></div>');
}

// type: brief, full
function addInstructor(course_code, prof, framework, brief) {
    var url = "/reviews/" + course_code + "/" + prof.name.replaceAll('/', '$');
    var margin = brief ? 'style="margin: 0.4cm"' : "";
    var meta = brief ? "" : '<div class="card-footer border-light">'
        + '<div class="meta"><div class="attr">Overall</div><div class="cont">' + (prof.result * 2).toFixed(1) +
        '</div></div><div class="meta"><div class="attr">Grade</div><div class="cont">' + (prof.grade * 2).toFixed(1) +
        '</div></div><div class="meta"><div class="attr">Easy</div><div class="cont">' + (prof.hard * 2).toFixed(1) +
        '</div></div><div class="meta"><div class="attr">Outcome</div><div class="cont">' + (prof.reward * 2).toFixed(1) +
        '</div></div><div class="meta"><div class="attr">Comments</div><div class="cont">' + prof.num +
        '</div></div></div>';
    var head = brief ? "" : '<h3 class="h6 card-header border-light text-end small '
        + generateColor(prof.result) + '">'
        + (prof.result * 2).toFixed(1) + '<span style="font-size: x-small">/10</span>'
        + '</h3>';
    $(framework).append('<div class="col"><div class="shadow card"' + margin + '>' + head + '<a href="' + url + '"><div class="card-body"><h2 class="h6 card-text mb-3">' + prof.name + '</h2>'
        + '<div class="progress" style="height:0.1cm"><div class="progress-bar ' + generateColor(prof.result) + '" role="progressbar" style="width: '
        + prof.result * 20 + '%"></div></div></div></a>' + meta + '</div></div>');
}

// type: brief, full
function addReview(review, framework) {
    if (review.content) {
        var meta = '<div class="card-footer border-light">'
            + '<div class="meta"><div class="attr">Overall</div><div class="cont">' + generateAttitude(review.recommend) +
            '</div></div><div class="meta"><div class="attr">Grade</div><div class="cont">' + generateAttitude(review.grade) +
            '</div></div><div class="meta"><div class="attr">Easy</div><div class="cont">' + generateAttitude(review.hard) +
            '</div></div><div class="meta"><div class="attr">Outcome</div><div class="cont">' + generateAttitude(review.reward) +
            '</div></div></div>';
        $(framework).append('<div class="col"><div class="shadow card"><div class="h6 card-header border-light small '
            + generateColor(review.recommend) + '">' + '<div class="row"><div class="col-7">' + review.pub_time + '</div><div class="col-5 text-end">' + (review.recommend * 2).toFixed(1) + '<span style="font-size: x-small">/10</span></div></div>'
            + '</div><div class="card-body"><h2 class="h6 card-text">' + review.content + '</h2></div>' + meta + '</div></div>');
    }
}
