
$("#load").click(function () {
    $("#testAlert").append("<br><br>[Load]<br>Token: " + Cookies.get('bbs_token'))
    $("#testAlert").append("<br>UserId: " + Cookies.get('bbs_userid'))
})

$("#fetch").click(function () {
    $.ajax({
        type: "GET",
        url: BBS_API_URL + '/api/users/' + Cookies.get('bbs_userid'),

        headers: {
            "Authorization": 'Token ' + Cookies.get('bbs_token'),
            "Access-Control-Allow-Origin": "*"
        },
        success: function (response) {
            if (!response.data.attributes.isEmailConfirmed)
                $("#testAlert").append('<br><br>[Login FAILED] Wrong token')
            $("#testAlert").append("<br><br>[Fetch Success]<br>Username: " + response.data.attributes.username
                + "<br>Nickname: " + response.data.attributes.displayName + "<br>Email: " + response.data.attributes.email
                + "<br>Email confirmed: " + response.data.attributes.isEmailConfirmed )


            $('#avatarNav').empty().append(getAvatar(response.data.attributes.displayName, response.data.attributes.avatarUrl));

            refreshTooltips();
        },
        error: function (response) {
            $("#testAlert").append("<br>[Fetch FAILED] " + JSON.stringify(response))
        },
    });
})

$("#clear").click(function () {
    Cookies.remove('bbs_token');
    Cookies.remove('bbs_userid');
    $("#load").click();
})

$("form").submit(function () {
    event.preventDefault();

    $.ajax({
        type: "POST",
        dataType: "json",
        url: BBS_API_URL + '/api/token',
        data: $('form').serialize(),
        success: function (response) {

            Cookies.set('bbs_token', response.token, { sameSite: 'strict' });
            Cookies.set('bbs_userid', response.userId, { sameSite: 'strict' });
            $("#testAlert").append("<br>Login Success ")
            $("#fetch").click();
        },
        error: function (response) {
            $("#testAlert").append("<br>FAIL " + JSON.stringify(response))
        },
    });
});
