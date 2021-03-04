function myAlert(msg) {
    if (confirm(msg + '\n\n 按[確認]鍵向開發團隊反饋. 按[取消]返回.\nPress [OK] to feedback or [Cancel].')) {
        location.href = '/feedback.html';
    } else {
    }
}

var API_server = "https://mpserver.umeh.top";
var inline_ad = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>\n<ins class="adsbygoogle"\nstyle="display:block"\ndata-ad-format="fluid"\ndata-ad-layout-key="-h2-o+o-38+av"\ndata-ad-client="ca-pub-6229219222351733"\ndata-ad-slot="9401190562"></ins>\n<script>\n(adsbygoogle = window.adsbygoogle || []).push({});\n</script>';

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'UA-176924130-2');

try {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
            .then(reg => console.log('Service Worker registered', reg))
            .catch(err => console.log('Not supported.', err));
    }
} catch (error) {

}