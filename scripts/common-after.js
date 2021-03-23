$(function(){ $("footer").load("/src/footer.html") });


//$('#navbarTogglerDemo02 > ul').append('<li class="nav-item"><a class="nav-link" aria-current="page" href="' + '/' + '">' + '首頁 Home' + '</a></li>');
$('#navbarTogglerDemo02 > ul').append('<li class="nav-item"><a class="nav-link" aria-current="page" href="'
+ '/catalog.html' + '">' + '全部課程 Catalog' + '</a></li>');
$('#navbarTogglerDemo02 > ul').append('<li class="nav-item dropdown">'
    + '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">'
    + '通識 GE Guide' + '</a>'
    + '<ul class="dropdown-menu" aria-labelledby="navbarDropdown" >'
    + '<li><a class="dropdown-item" href="' + '/search.html?keyword=GEGA' + '"target="_blank">' + '環球意識 GEGA' + '</a></li>'
    + '<li><a class="dropdown-item" href="' + '/search.html?keyword=GELH' + '"target="_blank">' + '文學人文 GELH' + '</a></li>'
    + '<li><a class="dropdown-item" href="' + '/search.html?keyword=GEST' + '"target="_blank">' + '科學技術 GEST' + '</a></li>'
    + '<li><a class="dropdown-item" href="' + '/search.html?keyword=GESB' + '"target="_blank">' + '社會行爲 GESB' + '</a></li>'
    + '</ul></li >');
$('#navbarTogglerDemo02 > ul').append('<li class="nav-item"><a class="nav-link" aria-current="page" href="'
    + 'https://docs.google.com/forms/u/1/d/e/1FAIpQLSe-y585fa_eJXUeFYwp-WyXyBJ_PL31hAzZABFr-eCNcr_RwA/viewform' + '" target="_blank">' + '反饋 Feedback' + '</a></li>');


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

