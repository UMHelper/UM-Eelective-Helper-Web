if (window.location.pathname.split('/')[1] == 'professor') {
  keyword = decodeURI(window.location.pathname.split('/')[2]).replaceAll('$','/');
  instructorSearch = true;
}
else {
  var keyword = $.urlParam('keyword').toUpperCase();
  var instructorSearch = $.urlParam('instructor') == "true";
}
$("#searchByInstructor").prop("checked", instructorSearch)


$(document).prop('title', "Results of " + keyword + " | 澳大選咩課 What2Reg @UM");
$('#input_search_nav').val(keyword);
$('link[rel="canonical"]').attr('href', 'https://www.umeh.top/search.html?keyword=' + keyword + '?instructor=' + instructorSearch);
//$("meta[name='description']").attr('content', 'new_description');

$('#title_search').append(keyword);
$('#searchByInstructor').on('change.bootstrapSwitch', function (e) {
  document.location.href = "/search.html?keyword=" + keyword + "&instructor=" + e.target.checked;
});

$.ajax({
  url: API_server + "/fuzzy_search/?text=" + keyword + '&type=' + (instructorSearch ? 'prof' : 'course'),
  dataType: "json",
  success: function (data) {
    $('#panel_courses').remove();
    var dataLength = (instructorSearch ? data.prof_info : data.course_info).length;
    if (dataLength == 0)
      $("#title_search").after('<div class="alert alert-warning alert-dismissible fade show" role="alert" style="width: 100%">沒有找到任何内容，換一個關鍵字試一試？<br>Nothing found. Try another keyword or send feedback to us! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
    else if (instructorSearch) {
      for (var i in data.prof_info) {
        $('#title_search').after('<div class="accordion my-4" id="panel_courses"></div>');
        $('#panel_courses').append('<div class="accordion-item"><h2 class="accordion-header" id="prof' + i + '"><button class="shadow accordion-button ' + (dataLength < 4 ? "" : "collapsed") + '" type="button" data-bs-toggle="collapse" data-bs-target="#collapse' + i + '" aria-expanded="' + (dataLength < 4) + '" aria-controls="collapse' + i + '">' + data.prof_info[i].name + '</button></h2><div id="collapse' + i + '" class="accordion-collapse collapse '+(dataLength < 4 ? "show" : "")+'" aria-labelledby="heading' + i + '" data-bs-parent="#panel_courses"><div class="accordion-body py-4">  <div class="row row-cols-1 row-cols-md-2 g-4"  id="instructor' + i + '"></div> </div></div></div>');

        for (var j in data.prof_info[i].courses)
          addCourse(data.prof_info[i].courses[j].course_info, '#instructor' + i,
            data.prof_info[i].name, data.prof_info[i].courses[j].comment_info.result);
      }
    }
    else {
      $('#title_search').after('<div class="row row-cols-1 row-cols-md-2 g-4" id="panel_courses"></div>');
      for (var i in data.course_info) {
        if (data.course_info[0].New_code == keyword)
          location.href = "/course/" + keyword;
        addCourse(data.course_info[i], '#panel_courses', null, null);
      }
    }

    if (dataLength > 8)
      $("#title_search").after('<div class="alert alert-info alert-dismissible fade show" role="alert" style="width: 100%">結果有點多，可以用更多關鍵字細化你的搜索！<br>Many results found. Longer keyword helps to find your target. <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');

  },
  error: function (data) {
    $("#title_search").after('<div class="alert alert-danger alert-dismissible fade show" role="alert" style="width: 100%">數據加載錯誤，請重試或向我們反饋！<br>Error loading data. Please try again or send feedback to us! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
  }
});

