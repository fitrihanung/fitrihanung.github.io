//register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
    .register("../service-worker.js")
    .then(function() {
      console.log("Registration service worker successful");
      requestPermission();
    })
    .catch(function() {
      console.log("Registration service worker failed");
    });
  });
} else {
  console.log("Browser doesn't support service worker")
}

// permisson + convert data push notif
function requestPermission() {
  if("Notification" in window) {
    Notification.requestPermission().then(function(result) {
      if(result === "denied") {
        console.log("Notification feature is not allowed!");
        return;
      }else if(result === "default") {
        console.error("User closes the request permission dialog. ");
        return;
      }

      navigator.serviceWorker.ready.then( () => {
        if(("PushManager" in window)) {
          navigator.serviceWorker.getRegistration().then(function(registration) {
            registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array("BPEEb6RMNZiF78JvRo9nevzODMNLPIYJCimGlzi1sXxvIWbejabbqq2sHHfEi0JF49xPhbE8yuJSLrCHNYf5D1g")
            }).then(function(subscribe) {
              console.log("Successfully subscribed with the endpoint ", subscribe.endpoint);
              console.log("Successfully subscribed with the p256dh key: ", btoa(String.fromCharCode.apply(
                null, new Uint8Array(subscribe.getKey("p256dh"))
              )));
              console.log("Successfully subscribed with the auth key: ", btoa(String.fromCharCode.apply(
                null, new Uint8Array(subscribe.getKey("auth"))
              )));
            }).catch(function(e) {
              console.error("Can not subscribe!", e.message);
            });
          });
        }
      })
    });
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
  .replace(/-/g, "+")
  .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
