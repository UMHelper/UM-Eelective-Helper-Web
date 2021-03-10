
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