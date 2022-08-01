$(function () { $("footer").load("/src/footer.html") });


//$('#navbarTogglerDemo02 > ul').append('<li class="nav-item"><a class="nav-link" aria-current="page" href="' + '/' + '">' + '首頁 Home' + '</a></li>');
$('#navbarTogglerDemo02 > ul').append('<li class="nav-item"><a class="nav-link" aria-current="page" href="'
    + '/catalog.html' + '">' + 'Catalog 目錄' + '</a></li>');
$('#navbarTogglerDemo02 > ul').append('<li class="nav-item dropdown">'
    + '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">'
    + 'GE 通識' + '</a>'
    + '<ul class="dropdown-menu" aria-labelledby="navbarDropdown" >'
    + '<li><a class="dropdown-item" href="' + '/search.html?keyword=GEGA' + '"target="_blank">' + '環球意識 GEGA' + '</a></li>'
    + '<li><a class="dropdown-item" href="' + '/search.html?keyword=GELH' + '"target="_blank">' + '文學人文 GELH' + '</a></li>'
    + '<li><a class="dropdown-item" href="' + '/search.html?keyword=GEST' + '"target="_blank">' + '科學技術 GEST' + '</a></li>'
    + '<li><a class="dropdown-item" href="' + '/search.html?keyword=GESB' + '"target="_blank">' + '社會行爲 GESB' + '</a></li>'
    + '</ul></li >');
$('#navbarTogglerDemo02 > ul').append('<li class="nav-item"><a class="nav-link" aria-current="page" href="'
    + 'https://umbbs.xyz/t/umeh' + '" target="_blank">' + 'Feedback 反饋 ' + '</a></li>');

$('#navbarTogglerDemo02 > ul').append('<li class="nav-item"><a class="nav-link" aria-current="page" href="'
    + 'https://umbbs.xyz/' + '" target="_blank">' + 'UM Whole 討論區' + '</a></li>');

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


// get current version
$.ajax({
    url: "https://api.github.com/repos/UMHelper/UM-Eelective-Helper-Web/branches/bootstrap",
    dataType: "json",
    success: function (data) {
        $('#version').html('<a href="' + data.commit.html_url + '">' + data.commit.commit.author.date);
    },
    error: function (data) {
        $('#version').html("ERROR");
    }
});