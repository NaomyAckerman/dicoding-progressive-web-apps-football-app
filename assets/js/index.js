import {
    getTeamById,
    getFavoriteTeamById
} from './api.js';

// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js"));
    // Periksa fitur Notification API
    if ("Notification" in window) requestPermission();
    else console.error("Browser tidak mendukung notifikasi.");
} else console.log("ServiceWorker belum didukung browser ini.");

function requestPermission() {
    Notification.requestPermission().then(result => {
        if (result === "denied") return
        else if (result === "default") return    
        navigator.serviceWorker.ready.then(()=>{
            // Subscripe FCM
            if (('PushManager' in window)) {
                navigator.serviceWorker.getRegistration()
                    .then(registration => {
                        registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array(
                                "BAcFiicWyJRdSuD8CAgR9STKOkdWDgV7RrE2gBlC12s17HO_Pf_tWAokizZ3wUppEwvzRvvonzOPtJel-FwVMxk"
                            )
                        }).then(subscribe => {
                            console.log(subscribe.endpoint);;
                            console.log(btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('p256dh')))));
                            console.log(btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('auth')))));;
                        }).catch(e => console.error('Belum dapat melakukan subscribe ', e.message));
                    });
            };
        })
    });
};

// Convert string public key
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

document.addEventListener("DOMContentLoaded", function () {
    // cek apakah page menuju ke halaman detail team team.html
    const page = window.location.pathname;
    if (page === "/pages/team.html") {
        let urlParams = new URLSearchParams(window.location.search);
        let isFromSaved = urlParams.get("saved");
        let id = urlParams.get("id");
        let btnSave = document.getElementById("save");
        // cek apakah detail team berasal dari favorit team
        if (isFromSaved) {
            // Hide fab jika dimuat dari indexed db
            btnSave.innerHTML = `<i class="large material-icons">delete</i>`;
            // ambil team
            getFavoriteTeamById();
            btnSave.onclick = () => {
                deleteSavedTeamById(id);
                window.location.replace('/#favorite-teams');
            };
        } else {
            let item = getTeamById();
            btnSave.onclick = () => item.then(team => saveForTeam(team));
        };
    };
});