var API_server = "https://mpserver.umeh.top";
//var API_server = "http://localhost:8000";
const BBS_API_URL = "https://www.umbbs.xyz"

var inline_ad = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>\n<ins class="adsbygoogle"\nstyle="display:block"\ndata-ad-format="fluid"\ndata-ad-layout-key="-h2-o+o-38+av"\ndata-ad-client="ca-pub-6229219222351733"\ndata-ad-slot="9401190562"></ins>\n<script>\n(adsbygoogle = window.adsbygoogle || []).push({});\n</script>';


Sentry.init({
    dsn: "https://7fe207ba73ea46479b375784bd521f62@o4504094876368896.ingest.sentry.io/4504094884036608",

    // Alternatively, use `process.env.npm_package_version` for a dynamic release version
    // if your build tool supports it.
    release: "my-project-name@2.3.12",
    integrations: [new Sentry.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,

});

$(function () { $("footer").load("/src/footer.html") });

function getAvatar(displayName, AvatarUrl) {
    var tooltip = 'data-bs-toggle="tooltip" title="User: \n' + displayName + '"';
    if (AvatarUrl) {
        return ('<img class="Avatar" src="' + AvatarUrl + '"' + tooltip + '>');
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
        colors[sum % colors.length] + '" ' + tooltip + '>' + n + ' </span>');
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

function generateColorInverted(value) {
    var color = "";
    if (value > 3.33) {
        color = "bg-light text-success";
    }
    else if (value > 1.67) {
        color = "bg-light text-warning";
    }
    else if (value > 0) {
        color = "bg-light text-danger";
    }
    else {
        color = "bg-white text-dark";
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

function generateVerifiedBadge(value, comment_id) {
    if (value) {
        return '<i class="bi bi-patch-check-fill vote-button" style="color:green" data-bs-toggle="tooltip" title="Verified UM User (logged in)"> Verified</i>';
    } else {
        return '<i class="bi bi-patch-question  vote-button" style="color:burlywood" data-bs-toggle="tooltip" title="Not Verified (not logged in)"></i>';
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
function addInstructor(course_code, prof, framework, brief, is_offer = false) {
    var url = "/reviews/" + course_code + "/" + prof.name.replaceAll('/', '$');
    var margin = brief ? 'style="margin: 0.4cm"' : "";
    var meta = brief ? "" : '<div class="card-footer border-light">'
        + '<div class="meta"><div class="attr">Overall</div><div class="cont">' + (prof.result * 2).toFixed(1) +
        '</div></div><div class="meta"><div class="attr">Grade</div><div class="cont">' + (prof.grade * 2).toFixed(1) +
        '</div></div><div class="meta"><div class="attr">Easy</div><div class="cont">' + (prof.hard * 2).toFixed(1) +
        '</div></div><div class="meta"><div class="attr">Outcome</div><div class="cont">' + (prof.reward * 2).toFixed(1) +
        '</div></div><div class="meta"><div class="attr">Comments</div><div class="cont">' + prof.num +
        '</div></div></div>';
    var badge = '<span class="badge ' + generateColorInverted(prof.result) + '">Offered</span>'
    var head = brief ? "" : '<h3 class="h6 card-header border-light text-end small '
        + generateColor(prof.result) + '">'
        + '<div class="row">'
        + '<div class="col-2">'
        + (is_offer ? badge : '')
        + '</div>'
        + '<div class="col-10 text-end">'
        + (prof.result * 2).toFixed(1) + '<span style="font-size: x-small">/10</span>'
        + '</div>'
        + '</div>'
        + '</h3>';
    $(framework).append('<div class="col"><div class="shadow card"' + margin + '>' + head + '<a href="' + url + '"><div class="card-body"><h2 class="h6 card-text mb-3">' + prof.name + '</h2>'
        + '<div class="progress" style="height:0.1cm"><div class="progress-bar ' + generateColor(prof.result) + '" role="progressbar" style="width: '
        + prof.result * 20 + '%"></div></div></div></a>' + meta + '</div></div>');
}

// type: brief, full
function addReview(review, framework) {
    var meta = '<div style="margin-top:-7px; margin-bottom: -7px;">' +
        //'<div class="meta"><div class="attr">Overall</div><div class="cont">' + generateAttitude(review.recommend) +
        '<div class="meta"><div class="attr">Grade</div><div class="cont">' + generateAttitude(review.grade) +
        '</div></div><div class="meta"><div class="attr">Workload</div><div class="cont">' + generateAttitude(review.hard) +
        '</div></div><div class="meta"><div class="attr">Outcome</div><div class="cont">' + generateAttitude(review.reward) +
        '</div></div></div>';
    $(framework).append('<div class="col" id="review-' + review.id + '"><div class="shadow card"><div class="h6 card-header border-light small '
        + generateColor(review.recommend) + '">'
        + '<div class="row"><div class="col-7">' + review.pub_time + '</div><div class="col-5 text-end">' + (review.recommend * 2).toFixed(1)
        + '<span style="font-size: x-small">/10</span></div></div>'
        + '</div><div class="card-body">' + (review.content ? '<h2 class="h6 mb-3 card-text">'
            + review.content.replace(/</g, "&lt;").replace(/>/g, "&gt;") + '</h2>' : '') + meta + '</div>' +
        '<div class="card-footer border-light"><div class="row small text-muted"><div class="col-5">'
        + generateVerifiedBadge(review.verified) + '</div><div class="col-7 text-end px-1">'
        + '<button class="bi bi-hand-thumbs-up-fill me-2 vote-button" onclick="voteOn(' + review.id + ',1)" data-bs-toggle="tooltip" title="Upvote"> </button><span class="vote-num">'
        + (review.upvote - review.downvote) + '</span>'
        + '<button class="bi bi-hand-thumbs-down-fill ms-2 vote-button" onclick="voteOn(' + review.id + ',-1)" data-bs-toggle="tooltip" title="Downvote"> </button>'

        + '<button class="bi bi-flag-fill ms-2 vote-button" onclick="report(' + review.id + ')" data-bs-toggle="tooltip" title="Report Abuse"> </button>'
        + '</div></div></div>' + '</div></div>');
    updateVoteColor(review.id, review.offset);
}

try {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
            .then(reg => console.log('Service Worker registered', reg))
            .catch(err => console.log('Not supported.', err));
    }
} catch (error) {
    Sentry.captureException(error);
}

function refreshTooltips(selector) {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll(selector))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
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
                $('#loginAlert').attr('style', 'display:block;');
                $('#loginForm').attr('style', 'display:none;');

                // navbar avatar
                $('#avatarNav').empty().append(getAvatar(response.data.attributes.displayName, response.data.attributes.avatarUrl));

                // login info
                $('#loginAlert').empty().append('<br><b>歡迎回來</b><br>Welcome back');
                $('#loginAlert').append('<div class="m-4" id="avatarNav" style="--size:100px;" >' + getAvatar(response.data.attributes.displayName, response.data.attributes.avatarUrl) + '</div>');
                $('#loginAlert').append("<h4><b>" + response.data.attributes.displayName + "</b></h4>" + response.data.attributes.email + '<br>');
                $('#loginAlert').append('<button id="logout" class="my-3 btn btn-warning">登出 Log Out</button><br>');

                $("#logout").click(function () {
                    Cookies.remove('bbs_token', { domain: "umeh.top" });
                    Cookies.remove('bbs_userid', { domain: "umeh.top" });
                    $("#loginAlert").empty().append('登出成功<br> Logged Out');
                    $('#avatarNav').empty().append('<span class="Avatar" style="--avatar-bg:#cccccc;" data-bs-toggle="tooltip" title="Not Logged In">?</span>');
                    refreshTooltips(".Avatar");
                })
            }
            else {
                if ($('#loginModal').hasClass('show'))
                    $("#loginAlert").empty().append('用戶信息錯誤或澳大電郵地址未驗證<br> Your UM Email is not verified');
            }
            refreshTooltips(".Avatar");
            return true;
        },
        error: function (response) {
            if ($('#loginModal').hasClass('show'))
                $("#loginAlert").empty().append('電郵地址或密碼錯誤<br> Wrong credential (email or password)');

            refreshTooltips(".Avatar");
            return false;
        },
    });

}

function newToastMessage(message) {
    $('#toast-message').empty().append(message);
    $('#toast').toast('show');
}

const sortByWeekday = (a, b) => {
    const d2n = {
        'MON': 0,
        'TUE': 1,
        'WED': 2,
        'THU': 3,
        'THURS': 3,
        'FRI': 4,
        'SAT': 5,
        'SUM': 6

    }
    return d2n[a.date.toUpperCase()] - d2n[b.date.toUpperCase()]
}
function duplicatesectionCheck(timetable_cart, section) {
    console.log(timetable_cart[0], section)
    for (const n in timetable_cart) {
        if (section.code == timetable_cart[n].code &&
            section.prof == timetable_cart[n].prof &&
            section.section == timetable_cart[n].section) {
            return false
        }
    }
    return true
}

// add to schedule cart or timetable list, if specified
function updateTimetableCartList(element = ".timetable_cart_list", show_button = true) {
    console.log("Update")
    var timetable_cart = localStorage.getItem('timetable_cart')
    console.log(timetable_cart, $(element))
    if (timetable_cart == "" || timetable_cart == null || timetable_cart == '[]') {
        $(element).html(
            'Your cart is empty. Try to add some courses first.</h5>'
        )
        return
    }
    timetable_cart = JSON.parse(timetable_cart)

    var meta = ""

    for (const n in timetable_cart) {
        let schedules = ""
        for (const s in timetable_cart[n].schedules) {
            schedules += "<tr>\n" +
                "                                        <td>" + timetable_cart[n].schedules[s].date + "</td>\n" +
                "                                        <td>" + timetable_cart[n].schedules[s].time + "</td>\n" +
                "                                        <td>" + timetable_cart[n].schedules[s].location + "</td>\n" +
                "                                    </tr>"
        }
        // card 
        meta += "<div class=\"card mb-3\"'>\n" +
            "                        <div class=\"card-header\" style='display: flex;justify-content: space-between;'><div class='text-body'>" +
            timetable_cart[n].code +
            " - Section " +
            timetable_cart[n].section +
            " <a href=\"/course/" +
            timetable_cart[n].code +
            "\"><i class=\"bi bi-box-arrow-in-up-right small\"></i></a></div>" +
            " <button type=\"button\" class=\"btn text-end p-0\" section-num=\"" + n + "\" onclick='deleteSectionFromCart(this)'><i class=\"bi-trash3\" style=\"font-size: 14px;display: flow;\"></i></button>\n" +
            "</div>\n" +
            "                        <div class=\"card-body\">\n" +
            "                            <p class=\"card-subtitle text-body-secondary mb-2\"> " +
            timetable_cart[n].prof +
            " <a href=\"/reviews/" +
            timetable_cart[n].code + "/" +
            timetable_cart[n].prof +
            "\"><i class=\"bi bi-box-arrow-in-up-right small\"></i></a></p>\n" +
            "                            <table class=\"table table-borderless table-hover table-sm\" style='margin-bottom: 0'>\n" +
            "                                <tbody>\n" +
            schedules +
            "                                </tbody>\n" +
            "                            </table>\n" +
            "                        </div>\n" +
            "                    </div>"
    }
    console.log(show_button)
    if (show_button==true) {
        meta += '  <button type="button" id="button_timetable" class="btn btn-warning button_timetable my-4 me-1 w-100"><i class="bi bi-calendar-week my-2 me-1"> </i>Check Out My Timetable</button>'
    }

    $(element).html(meta)
    $('.button_timetable').click(function () {
        document.location.href = "/timetable/";
    })

}

function addSectionToCart(e) {
    var timetable_cart = []
    if (localStorage.getItem("timetable_cart") != "" && localStorage.getItem("timetable_cart") != null) {
        timetable_cart = JSON.parse(localStorage.getItem("timetable_cart"))
    }
    var newSection = {
        code: e.getAttribute('code'),
        prof: e.getAttribute('prof'),
        section: e.getAttribute('section'),
        schedules: JSON.parse(
            e.getAttribute('schedules')
        )
    }
    if (duplicatesectionCheck(timetable_cart, newSection)) {
        timetable_cart.push(newSection)
        newToastMessage("添加成功 Added successfully!");
    }
    else {
        newToastMessage("错误：已經添加過 Error: Section already added!");
    }

    e.setAttribute('disabled', '')
    localStorage.setItem('timetable_cart', JSON.stringify(timetable_cart))
    updateTimetableCartList()
}

function addCourseSection(section) {
    var res = '<table class="table table-borderless">' +
        '<thead class="table-light"><tr>' +
        '<td colspan="3">Section ' +
        section.section +
        '</td></tr></thead><tbody>'
    section.schedules.sort(sortByWeekday)
    console.log(section.schedules.sort(sortByWeekday))
    for (const n in section.schedules) {
        res += '<tr>' +
            '<td>' +
            section.schedules[n].date +
            '</td>' +
            '<td>' +
            section.schedules[n].time +
            '</td>' +
            '<td>' +
            section.schedules[n].location +
            '</td></tr> '
    }
    res += '<tr><td colspan="3">' +
        '<button type="button" class="btn btn-primary addCartBtn" ' +
        'section="' + section.section + '" ' +
        'code="' + course_code + '" ' +
        'prof="' + instructor + '" ' +
        "schedules='" +
        JSON.stringify(section.schedules) + "' " +
        'onclick="addSectionToCart(this)"' +
        '>' +
        '<i class="bi bi-cart-plus"></i> Add to Schedule Cart</button>' +
        '</td></tr></tbody></table>'
    return res
}

function deleteSectionFromCart(e) {
    console.log(e.getAttribute('section-num'))

    var timetable_cart = JSON.parse(localStorage.getItem("timetable_cart"))

    timetable_cart = [...timetable_cart.slice(0, e.getAttribute('section-num')), ...timetable_cart.slice(e.getAttribute('section-num') + 1)]

    console.log(timetable_cart.length)
    localStorage.setItem('timetable_cart', JSON.stringify(timetable_cart))
    updateTimetableCartList()
}