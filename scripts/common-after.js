
$(function () { $("#loginPlaceholder").load("/src/login.html") });

//$('#navbarTogglerDemo02 > ul').append('<li class="nav-item"><a class="nav-link" aria-current="page" href="' + '/' + '">' + '首頁 Home' + '</a></li>');
$('#navbarTogglerDemo02 > ul').append('<li class="nav-item"><a class="nav-link" aria-current="page" href="'
    + '/catalog.html' + '">' + 'Catalog' + '</a></li>');
$('#navbarTogglerDemo02 > ul').append('<li class="nav-item dropdown">'
    + '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">'
    + 'GE' + '</a>'
    + '<ul class="dropdown-menu" aria-labelledby="navbarDropdown" >'
    + '<li><a class="dropdown-item" href="' + '/search.html?keyword=GEGA' + '"target="_blank">' + '環球意識 GEGA' + '</a></li>'
    + '<li><a class="dropdown-item" href="' + '/search.html?keyword=GELH' + '"target="_blank">' + '文學人文 GELH' + '</a></li>'
    + '<li><a class="dropdown-item" href="' + '/search.html?keyword=GEST' + '"target="_blank">' + '科學技術 GEST' + '</a></li>'
    + '<li><a class="dropdown-item" href="' + '/search.html?keyword=GESB' + '"target="_blank">' + '社會行爲 GESB' + '</a></li>'
    + '</ul></li >');
$('#navbarTogglerDemo02 > ul').append('<li class="nav-item"><a class="nav-link" aria-current="page" href="'
    + 'https://umbbs.xyz/t/umeh' + '" target="_blank">' + 'Feedback' + '</a></li>');

$('#navbarTogglerDemo02 > ul').append('<li class="nav-item"><a class="nav-link" aria-current="page" href="'
    + 'https://umbbs.xyz/' + '" target="_blank">' + 'Whole 討論區' + '</a></li>');

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

// navbar events

var mustFillNavbar = true;
var navbarCollapseShown = false;
var alwaysShowSearch = true;

function scrollNav() {
    var scrollTop = $(window).scrollTop(),
        elementOffset = $('h1').offset().top;
    if(mustFillNavbar || elementOffset - scrollTop < 0 || navbarCollapseShown){
        $('header > nav').css("background",  "#30548b" );
        $('header > nav').addClass("shadow")
        $('#navbarTogglerDemo02 > .input-group').attr('style', 'display:flex; max-width: 250px;');
    
    } else {
        $('header > nav').css("background", "#30548b00");
        $('header > nav').removeClass("shadow");
        if(!alwaysShowSearch)
            $('#navbarTogglerDemo02 > .input-group').attr('style', 'display:none !important;');
    }
}

$('#navbarTogglerDemo02').on('show.bs.collapse', function () {
    navbarCollapseShown = true;
    $('#avatarNav').attr('style','display:none !important; margin-top: -5px; margin-bottom: -5px; --size: 36px;');
    scrollNav();
})

$('#navbarTogglerDemo02').on('hidden.bs.collapse', function () {
    navbarCollapseShown = false;
    $('#avatarNav').attr('style','display:flex; margin-top: -5px; margin-bottom: -5px; --size: 36px;');
    scrollNav();
})

scrollNav();

$(window).on('scroll', function () {
    scrollNav();
});

sessionLogin();
