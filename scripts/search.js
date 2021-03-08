var keyword = $.urlParam('keyword').toUpperCase();
var instructorSearch = $.urlParam('instructor') == "true";
$("#searchByInstructor").prop("checked", instructorSearch)

$(document).prop('title', "Results of " + keyword + " | 澳大選咩課 What2Reg @UM");
$('#input_search_nav').val(keyword);
$('link[rel="canonical"]').attr('href', 'https://www.umeh.top/search.html?course=' + keyword + '?instructor=' + instructorSearch);
//$("meta[name='description']").attr('content', 'new_description');

$('#title_search').append(keyword);
$('#searchByInstructor').on('change.bootstrapSwitch', function (e) {
  document.location.href = "/search.html?keyword=" + keyword + "&instructor=" + e.target.checked;
});

function addCourse(course, framework, prof) {
  var url = "/" + (prof ? "reviews" : "course") + "/" + course.New_code + "/" + (prof ? prof.replace('/', '$O') : "");
  $(framework).append('<div class="col"><div class="shadow card "><h2 class=" h6 card-header border-light">'
    + course.New_code
    + '</h2><a href="' + url + '"><div class="card-body"><h3 class="h6 card-text">'
    + course.courseTitleEng + '</h3><h3 class="h6 card-text">'
    + course.courseTitleChi + '</h3></div></a><div class="card-footer border-light"><div class="meta"><div class="attr">Credits</div><div class="cont">'
    + course.Credits + '</div></div><div class="meta"><div class="attr">Dept</div><div class="cont">'
    + (course.Offering_Department ? course.Offering_Department : '-') + '</div></div><div class="meta"><div class="attr">Faculty</div><div class="cont">'
    + course.Offering_Unit + '</div></div><div class="meta"><div class="attr">Language</div><div class="cont">'
    + (course.Medium_of_Instruction ? course.Medium_of_Instruction : '-') + '</div></div></div></div></div>');
}

$.ajax({
  url: API_server + "/fuzzy_search/?text=" + keyword + '&type=' + (instructorSearch ? 'prof' : 'course'),
  dataType: "json",
  success: function (data) {
    $('#panel_courses').remove();
    var dataLength = (instructorSearch ? data.prof_info : data.course_info).length;
    if (dataLength == 0) {
      $("#title_search").after('<div class="alert alert-warning alert-dismissible fade show" role="alert" style="width: 100%">沒有找到任何内容，換一個關鍵字試一試？<br>Nothing found. Try another keyword or send feedback to us! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
    }
    else if (instructorSearch) {
      for (var i in data.prof_info) {
        $('#title_search').after('<div class="accordion my-4" id="panel_courses"></div>');
        $('#panel_courses').append('<div class="accordion-item"><h2 class="accordion-header" id="prof' + i + '"><button class="shadow accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse' + i + '" aria-expanded="false" aria-controls="collapse' + i + '">' + data.prof_info[i].name + '</button></h2><div id="collapse' + i + '" class="accordion-collapse collapse" aria-labelledby="heading' + i + '" data-bs-parent="#panel_courses"><div class="accordion-body py-4">  <div class="row row-cols-1 row-cols-md-2 g-4"  id="instructor' + i + '"></div> </div></div></div>');

        for (var j in data.prof_info[i].courses)
          addCourse(data.prof_info[i].courses[j].course_info, '#instructor' + i, data.prof_info[i].name);
      }
    }
    else {
      $('#title_search').after('<div class="row row-cols-1 row-cols-md-2 g-4" id="panel_courses"></div>');
      for (var i in data.course_info)
        addCourse(data.course_info[i], '#panel_courses');
    }

  },
  error: function (data) {
    $("#title_search").after('<div class="alert alert-danger alert-dismissible fade show" role="alert" style="width: 100%">數據加載錯誤，請重試或向我們反饋！<br>Error loading data. Please try again or send feedback to us! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
  }
});

