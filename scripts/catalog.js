function addCatalog(course, framework) {
    var url = "/course/" + course.courseCode + "/";
    $(framework).append('<div class="col"><div class="shadow card "><h2 class="h6 card-header border-light">'
        + course.courseCode
        + '</h2><a href="' + url + '"><div class="card-body"><h3 class="h6 card-text">'
        + course.courseTitle + '</h3><h4 class="card-text cont fw-normal">'
        + (course.preRequisite ? "Requires " + course.preRequisite : "") + '</h4></div></a><div class="card-footer border-light"><div class="meta"><div class="attr">Credits</div><div class="cont">'
        + course.credits + '</div></div><div class="meta"><div class="attr">Year</div><div class="cont">'
        + (course.suggestedYearOfStudy ? course.offeringProgLevel+'-' +course.suggestedYearOfStudy : '-') + '</div></div><div class="meta"><div class="attr">Grading</div><div class="cont">'
        + (course.gradingSystem ? course.gradingSystem : '-') + '</div></div><div class="meta"><div class="attr">Language</div><div class="cont">'
        + (course.mediumOfInstruction ? course.mediumOfInstruction : '-') + '</div></div></div></div></div>');
}

function addDepts(faculty, items) {
    $(".nav-pills").append('<li class="nav-item dropdown"><a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">' + faculty + '</a><ul class="dropdown-menu" id="ul_' + faculty + '"></ul></li>');
    for (i in items)
        $("#ul_" + faculty).append('<li><a class="dropdown-item" href="/catalog.html?faculty=' + faculty + '&dept=' + items[i] + '&PGlevel=' + PGlevel + '">' + items[i] + '</a></li>');
}

function addFaculties(items) {
    for (i in items)
        $(".nav-pills").append('<li class="nav-item" id="li_' + items[i] + '"><a class="nav-link" href="/catalog.html?faculty=' + items[i] + '&PGlevel=' + PGlevel + '">' + items[i] + '</a></li>');
}

var faculty = $.urlParam('faculty');
var dept = $.urlParam('dept');
var PGlevel = $.urlParam('PGlevel') == "true";

addDepts('FAH', ['CJS', 'DCH', 'DENG', 'DHIST', 'DPHIL', 'DPT', 'ELC']);
addDepts('FBA', ['AIM', 'DRTM', 'FBE', 'IIRM', 'MMI']);
addDepts('FLL', ['MLS']);
addDepts('FSS', ['DCOM', 'DECO', 'DGPA', 'DPSY', 'DSOC']);
addDepts('FST', ['CEE', 'CIS', 'CSG', 'DPC', 'ECE', 'EME', 'MAT']);
addDepts('ICI', ['CIE']);
addFaculties(['FED', 'FHS', 'HC', 'IAPME', 'ICMS', 'RC']);


$("#searchPG").prop("checked", PGlevel)

$('#searchPG').on('change.bootstrapSwitch', function (e) {
    document.location.href = '/catalog.html?faculty=' + faculty + (dept ? '&dept=' + dept : "") + '&PGlevel=' + e.target.checked;
  });

if (faculty) {
    $('#title_catalog').append(" of " + (dept ? dept + " | " : "") + faculty);
    $(document).prop('title', "Catalog of " + (dept ? dept + " | " : "") + faculty + " | 澳大選咩課 What2Reg @UM");
    $('link[rel="canonical"]').attr('href', 'https://www.umeh.top/catalog.html?faculty=' + faculty + (dept ? '&dept=' + dept : "") + '&PGlevel=' + PGlevel );
}
else {
    $(".nav-pills").after('<div class="alert alert-info alert-dismissible fade show" role="alert" style="width: 100%">請選擇要查詢的科系<br>Select the faculty and/or department<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');

}
$("#ul_" + faculty).parent().children('a').addClass('active');
$("#li_" + faculty).children('a').addClass('active');
var reqUrl = "https://api.data.um.edu.mo/service/academic/course_catalog/v1.0.0/all?"
    + "offering_unit=" + faculty + (dept ? ("&offering_dept=" + dept) : "") + "&offering_prog_level=" + (PGlevel ? "PG" : "UG");
if (faculty)
    $.ajax({
        url: reqUrl,
        data: {},
        type: "GET",
        beforeSend: function (req) { req.setRequestHeader('Authorization', 'Authorization: Bearer bfa9b6c0-3f4f-3b1f-92c4-1bdd885a1ca2'); },
        success: function (res) {
            $('.container').append('<div class="row row-cols-1 row-cols-md-2 g-4" id="panel_courses"></div>');
            for (var i in res._embedded) {
                addCatalog(res._embedded[res._embedded.length - i - 1], '#panel_courses');
            }

            if (res._embedded.length > 99)
                $(".nav-pills").after('<div class="alert alert-info alert-dismissible fade show" role="alert" style="width: 100%">已經顯示最大數量 （100）的課程<br>Showing the maximum amount (100) of courses. <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
            else if (res._embedded.length < 1)
                Sentry.captureException(res);
                $(".nav-pills").after('<div class="alert alert-warning alert-dismissible fade show" role="alert" style="width: 100%">選擇的學系/學院似乎並未開設此級別的課程，如有疑問請向我們反饋<br>The department/faculty does not offer courses on this level. Please let us know if that\'s not the case. <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');

        },
        error: function (data) {
            Sentry.captureException(data);
            $(".nav-pills").after('<div class="alert alert-danger alert-dismissible fade show" role="alert" style="width: 100%">數據加載錯誤，我們已經收到此問題！<br>Error loading data. Please try again or feedback to us! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
        }
    });
