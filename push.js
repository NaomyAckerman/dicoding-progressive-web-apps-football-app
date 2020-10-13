let webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BAcFiicWyJRdSuD8CAgR9STKOkdWDgV7RrE2gBlC12s17HO_Pf_tWAokizZ3wUppEwvzRvvonzOPtJel-FwVMxk",
    "privateKey": "8o38yUJXF4kevUeDybDzAN-0IfopBvi4Oqs3fCzcKsw"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cQt_j6Yx7A4:APA91bGi2ZsNRJ--4Xw0bNfCCIc073IqfuU9sheChaJRCutJrJkVABjRs2aD5jpj1_OUkz1EZ-ULEsXzaCAC8rPnnlblyS0IAEgM63WTjx2KhLU-xcVIOM6CSXcLp_b4vY4Qku9ZycdJ",
    "keys": {
        "p256dh": "BIOcm521TiqF2RzQa2r3mC+TdjAQlCe9j2CgaQQ3L3c1ybCQSbUErs8uN6svUOjy42DNSf/y9MB/fuxIwSpJ5a8=",
        "auth": "KvJ5M9kvZYz/zxxw1CYHFg=="
    }
};
let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

let options = {
    gcmAPIKey: '869551195358',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);