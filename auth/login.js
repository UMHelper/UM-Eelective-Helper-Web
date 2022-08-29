
function sessionLogin () {
    $.ajax({
        type: "GET",
        url: BBS_API_URL + '/api/users/' + Cookies.get('bbs_userid'),

        headers: {
            "Authorization": 'Token ' + Cookies.get('bbs_token'),
            "Access-Control-Allow-Origin": "*"
        },
        success: function (response) {
            if (response.data.attributes.isEmailConfirmed) {
                $('#loginAlert').attr('style', 'display:block;');
                $('#loginForm').attr('style', 'display:none;');

                // navbar avatar
                $('#avatarNav').empty().append(getAvatar(response.data.attributes.displayName, response.data.attributes.avatarUrl));

                // login info
                $('#loginAlert').empty().append('<br><b>歡迎回來</b><br>Welcome back');
                $('#loginAlert').append('<div class="m-4" id="avatarNav" style="--size:100px;" >' + getAvatar(response.data.attributes.displayName, response.data.attributes.avatarUrl) + '</div>');
                $('#loginAlert').append("<h4><b>" + response.data.attributes.displayName + "</b></h4>" + response.data.attributes.email + '<br>');
                $('#loginAlert').append('<button id="logout" class="my-3 btn btn-warning">登出 Log Out</button><br>');

                $("#logout").click(function () {
                    Cookies.remove('bbs_token');
                    Cookies.remove('bbs_userid');
                    $("#loginAlert").empty().append('登出成功<br> Logged Out');
                    sessionLogin();
                })
            }
            else {
                $('#loginAlert').attr('style', 'display:block;');
                $("#loginAlert").empty().append('用戶信息錯誤或澳大電郵地址未驗證<br> Your UM Email is not verified');
            }
            refreshTooltips();
        },
        error: function (response) {
            $("#loginAlert").empty().append('電郵地址或密碼錯誤<br> Wrong credential (email or password)');
            refreshTooltips();
        },
    });
}

$("form").submit(function () {
    event.preventDefault();

    $.ajax({
        type: "POST",
        dataType: "json",
        url: BBS_API_URL + '/api/token',
        data: $('form').serialize(),
        success: function (response) {
            Cookies.set('bbs_token', response.token, { expires: 365 });
            Cookies.set('bbs_userid', response.userId, { expires: 365 });
            sessionLogin();
        },
        error: function (response) {
            $("#loginAlert").empty().append('電郵地址或密碼錯誤<br> Wrong credential (email or password)');
            sessionLogin();
        },
    });
});
