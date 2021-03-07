function searchMain() {
    $('#close_alert').focus().click();
    if ($("#input_search_main").val().length < 4)
        $('#search_form').prepend('<div class="alert alert-dismissible alert-danger fade show" id="too_short" role="alert" style="padding: 0.3cm">關鍵字太短了! Keyword too short!<button id="close_alert" type="button" data-bs-dismiss="alert" aria-label="Close" style="visibility: hidden;"></button></div>');
    else
        document.location.href = "/search.html?keyword=" + $("#input_search_main").val().trim() + "&instructor=" + $("#searchByInstructor").is(":checked");
}

$('#searchByInstructor').on('change.bootstrapSwitch', function (e) {
    $("#input_search_main").attr("placeholder", e.target.checked ? "e.g. CHAN Tai Man" : "e.g. ACCT1000 or Accounting");
});

$('#input_search_main').keypress(function (e) {
    if (e.which == 13) {
        $(this).blur();
        $('#button_search_main').focus().click();
    }
});

// get total num
$.ajax({
    url: API_server + "/get_stat/",
    dataType: "json",
    success: function (data) {
        for (var i in data.faculty_detail) {
            $("#numsPanel").append('<div class="shadow text-secondary numsItem"><h3 class="h6" style="font-weight: bolder; color: black">' + i + '</h3><div style="font-size: small">' + data.faculty_detail[i].course + ' courses</div>' + '<div style="font-size: small">' + data.faculty_detail[i].comment + ' comments</div></div>');
        }
    },
    error: function (data) {
        $("#numsPanel").append('<div class="alert alert-danger" role="alert" style="padding: 0.3cm">連接伺服器失敗，請重試或向我們反饋！<br>Error connecting to the server. Please try again or send feedback to us!</div>');
    }
});
