var API_server = "https://mpserver.umeh.top";
var inline_ad = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>\n<ins class="adsbygoogle"\nstyle="display:block"\ndata-ad-format="fluid"\ndata-ad-layout-key="-h2-o+o-38+av"\ndata-ad-client="ca-pub-6229219222351733"\ndata-ad-slot="9401190562"></ins>\n<script>\n(adsbygoogle = window.adsbygoogle || []).push({});\n</script>';
const BBS_API_URL = "https://umbbs.xyz"
$(function () { $("nav").load("/src/header.html") });


function getAvatar(displayName, AvatarUrl) {
    var tooltip = 'data-bs-toggle="tooltip" title="User: \n' + displayName  + '"';
    if (AvatarUrl) {
        return ('<img class="Avatar" src="' + AvatarUrl + '"' +tooltip +'>');
    }

    const colors = [
        "#ef9a9a",
        "#f48fb1",
        "#ce93d8",
        "#b39ddb",
        "#9fa8da",
        "#90caf9",
        "#81d4fa",
        "#80deea",
        "#80cbc4",
        "#a5d6a7"
    ];

    var sum = 0;
    for (index in displayName) {
        sum += displayName.charCodeAt(index);
    }

    var i = displayName || "?";
    n = i.charAt(0).toUpperCase();

    return ('<span class="Avatar" style="--avatar-bg:' +
        colors[sum % colors.length] + '" '+ tooltip +'>' + n + ' </span>');
}

/*! js-cookie v3.0.1 | MIT */
!function (e, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self, function () { var n = e.Cookies, o = e.Cookies = t(); o.noConflict = function () { return e.Cookies = n, o } }()) }(this, (function () { "use strict"; function e(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var o in n) e[o] = n[o] } return e } return function t(n, o) { function r(t, r, i) { if ("undefined" != typeof document) { "number" == typeof (i = e({}, o, i)).expires && (i.expires = new Date(Date.now() + 864e5 * i.expires)), i.expires && (i.expires = i.expires.toUTCString()), t = encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape); var c = ""; for (var u in i) i[u] && (c += "; " + u, !0 !== i[u] && (c += "=" + i[u].split(";")[0])); return document.cookie = t + "=" + n.write(r, t) + c } } return Object.create({ set: r, get: function (e) { if ("undefined" != typeof document && (!arguments.length || e)) { for (var t = document.cookie ? document.cookie.split("; ") : [], o = {}, r = 0; r < t.length; r++) { var i = t[r].split("="), c = i.slice(1).join("="); try { var u = decodeURIComponent(i[0]); if (o[u] = n.read(c, u), e === u) break } catch (e) { } } return e ? o[e] : o } }, remove: function (t, n) { r(t, "", e({}, n, { expires: -1 })) }, withAttributes: function (n) { return t(this.converter, e({}, this.attributes, n)) }, withConverter: function (n) { return t(e({}, this.converter, n), this.attributes) } }, { attributes: { value: Object.freeze(o) }, converter: { value: Object.freeze(n) } }) }({ read: function (e) { return '"' === e[0] && (e = e.slice(1, -1)), e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent) }, write: function (e) { return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent) } }, { path: "/" }) }));

(function (e, t, n, i, s, a, c) {
    e[n] = e[n] || function () { (e[n].q = e[n].q || []).push(arguments) }
    ; a = t.createElement(i); c = t.getElementsByTagName(i)[0]; a.async = true; a.src = s
        ; c.parentNode.insertBefore(a, c)
})(window, document, "galite", "script", "https://cdn.jsdelivr.net/npm/ga-lite@2/dist/ga-lite.min.js");

galite('create', 'UA-176924130-2', 'auto');
galite('send', 'pageview');

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    return decodeURI(results[1]) || 0;
}

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
    var meta = '<div class="card-footer border-light">'
        + '<div class="meta"><div class="attr">Overall</div><div class="cont">' + generateAttitude(review.recommend) +
        '</div></div><div class="meta"><div class="attr">Grade</div><div class="cont">' + generateAttitude(review.grade) +
        '</div></div><div class="meta"><div class="attr">Easy</div><div class="cont">' + generateAttitude(review.hard) +
        '</div></div><div class="meta"><div class="attr">Outcome</div><div class="cont">' + generateAttitude(review.reward) +
        '</div></div></div>';
    $(framework).append('<div class="col"><div class="shadow card"><div class="h6 card-header border-light small '
        + generateColor(review.recommend) + '">' + '<div class="row"><div class="col-7">' + review.pub_time + '</div><div class="col-5 text-end">' + (review.recommend * 2).toFixed(1) + '<span style="font-size: x-small">/10</span></div></div>'
        + '</div>' + (review.content ? '<div class="card-body"><h2 class="h6 card-text">' + review.content.replace(/</g, "&lt;").replace(/>/g, "&gt;") + '</h2></div>' : '') + meta + '</div></div>');
}

try {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
            .then(reg => console.log('Service Worker registered', reg))
            .catch(err => console.log('Not supported.', err));
    }
} catch (error) {

}

function refreshTooltips() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
}

function sessionLogout() {
    Cookies.remove('bbs_token');
    Cookies.remove('bbs_userid');
    $('#avatarNav').empty().append('<span class="Avatar" style="--avatar-bg:#cccccc;"data-bs-toggle="tooltip" title="Not Logged In">?</span>');
    console.log("[Fetch] Logout")
    refreshTooltips();
}

function sessionLogin() {
    $.ajax({
        type: "GET",
        url: BBS_API_URL + '/api/users/' + Cookies.get('bbs_userid'),

        headers: {
            "Authorization": 'Token ' + Cookies.get('bbs_token'),
            "Access-Control-Allow-Origin": "*"
        },
        success: function (response) {
            if (response.data.attributes.isEmailConfirmed) {
                $('#avatarNav').empty().append(getAvatar(response.data.attributes.displayName, response.data.attributes.avatarUrl));
                console.log("[Fetch] Success " + JSON.stringify(response));
            }
            else {
                console.log("[Fetch] Wrong token " + JSON.stringify(response));
                sessionLogout();
            }
            refreshTooltips();
        },
        error: function (response) {
            console.log("[Fetch] User info failed " + JSON.stringify(response));
            sessionLogout();
        },
    });
}

