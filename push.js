const webPush = require("web-push");

const vapidKeys = {
  "publicKey": "BPEEb6RMNZiF78JvRo9nevzODMNLPIYJCimGlzi1sXxvIWbejabbqq2sHHfEi0JF49xPhbE8yuJSLrCHNYf5D1g",
  "privateKey": "P8ygNus1K3kgBDsEbEjUadp_Iaw-Atq-g8P3xm5NOGQ"
};

webPush.setVapidDetails(
  "mailto:bolaber@info.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

const pushSubscription = {
  "endpoint": " https://fcm.googleapis.com/fcm/send/dcJGsFxRo-0:APA91bGxBqXbfB2SUPqFylTjkttOnQZfSEQyUxQknab4WOt7dTUNiYHmuo51xRsN8rYOLqJiwFGQ6UDDtlT2eR-nMbcgshMuPtdoUjLZcsCyvilF1MMr8qZuNCviefIG4KHOMFo-pKPZ",
  "keys": {
    "p256dh": "BExQ0Usafq5Paus5XDcxOR9irZV2Leq/RyVvULIwxt8IapEZyz7jKexfKZkJd4XcBw4qVfMh5lpmiTyWpAjj8co=",
    "auth": "PaHMTcJ4WSIfgNm/pB1maA=="
  }
};

const payload = "English league standings updated, check now at here";

const options = {
  gcmAPIKey: "776420593915",
  TTL: 60
};

webPush.sendNotification(
  pushSubscription,
  payload,
  options
);
