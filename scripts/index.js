$('#searchByInstructor').on('change.bootstrapSwitch', function (e) {
    $("#input_search_main").attr("placeholder", e.target.checked ? "e.g. CHAN Tai Man" : "e.g. ACCT1000 or Accounting");
});

$('#input_search_main').keypress(function (e) {
    if (e.which == 13) {
        $(this).blur();
        $('#button_search_main').focus().click();
    }
});

$("#button_search_main").click(function () {
    $('#close_alert').focus().click();
    if ($("#input_search_main").val().length < 4)
        $('#search_form').prepend('<div class="alert alert-dismissible alert-danger fade show" id="too_short" role="alert" style="padding: 0.3cm">關鍵字太短了! Keyword too short!<button id="close_alert" type="button" data-bs-dismiss="alert" aria-label="Close" style="visibility: hidden;"></button></div>');
    else
        document.location.href = "/search.html?keyword=" + $("#input_search_main").val().trim() + "&instructor=" + $("#searchByInstructor").is(":checked");
});

function scrollNav() {
    var scrollTop = $(window).scrollTop(),
        elementOffset = $('#logo').offset().top;
    $('header > nav').css("background-color", (elementOffset - scrollTop < 0 ? "#30548b" : "#30548bD0"));
    $('#navbarTogglerDemo02 > .d-flex').attr('style', 'display: ' + (elementOffset - scrollTop < 0 ? "flex" : "none !important"));
}

scrollNav();

$(window).on('scroll', function () {
    scrollNav();
});

// get total num
$.ajax({
    url: API_server + "/get_stat/",
    dataType: "json",
    success: function (data) {
        for (var i in data.faculty_detail) {
            $("#numsPanel").append('<div class="shadow text-secondary numsItem"><h3 class="h6" style="font-weight: bolder; color: black">' + i + '</h3><div style="font-size: smaller">' + data.faculty_detail[i].course + ' courses</div>' + '<div style="font-size: smaller">' + data.faculty_detail[i].comment + ' comments</div></div>');
        }
    },
    error: function (data) {
        $("#numsPanel").append('<div class="alert alert-danger" role="alert" style="padding: 0.3cm">連接伺服器失敗，請重試或向我們反饋！<br>Error connecting to the server. Please try again or send feedback to us!</div>');
    }
});


// get updates
$.ajax({
    url: "https://umbbs.xyz/api/discussions?include=user%2ClastPostedUser%2Ctags%2Ctags.parent%2CfirstPost&filter%5Btag%5D=umeh&sort=",
    dataType: "json",
    success: function (data) {
        for (var i in data.data) {
            if(i > 3) break;
            var post = data.data[i].attributes;
            var url = post.shareUrl;
            var title = post.title;
            var commentCount = post.commentCount;
            var viewCount = post.viewCount;
            var date = post.createdAt.substring(0, 10);

            $("#updates").append('<a href="'+url+'" class="list-group-item list-group-item-action" aria-current="true"><div class="d-flex justify-content-between"><small>'+date+'</small><span><span class="badge bg-primary rounded-pill"><i class="bi bi-eye-fill"></i>'+ viewCount+'</span> <span class="badge bg-primary rounded-pill"><i class="bi bi-chat-dots-fill"></i>'+ commentCount+'</span></span></div><h6 class="mb-1">'+title +'</h6></a>');

            
        }
    },
    error: function (data) {
        $("#updates").append('<a href="#" class="list-group-item list-group-item-action active" aria-current="true"><h6 class="mb-1">遇到未知錯誤，請向我們反饋。</h6><div class="d-flex justify-content-between"><small>Error encountered. Please contact us.</small><span class="badge bg-primary rounded-pill">error</span></div></a>');
    }
});

