function myAlert(msg) {
    if (confirm(msg + '\n\n 按[確認]鍵向開發團隊反饋. 按[取消]返回.\nPress [OK] to feedback or [Cancel].')) {
        location.href = '/feedback.html';
    } else {
    }
}

var API_server = "https://mpserver.umeh.top";

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