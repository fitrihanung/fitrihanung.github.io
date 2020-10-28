// load workbox library
importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");
if(workbox) {
  console.log("Workbox is loaded");
} else {
  console.log("Worbox didn't loaded");
}

workbox.precaching.precacheAndRoute([
  { url: "/index.html", revision: "1" },
  { url: "/navbar.html", revision: "1" },
  { url: "/manifest.json", revision: "1"},
  { url: "/push.js", revision: "1" },
  { url: "/team-info.html", revision: "1" },
  { url: "/styles/materialize.min.css", revision: "1" },
  { url: "/images/favicon_16.png", revision: "1" },
  { url: "/images/home.png", revision: "1" },
  { url: "/images/load_512.png", revision: "1" },
  { url: "/images/maskable_72.png", revision: "1" },
  { url: "/images/maskable_144.png", revision: "1" },
  { url: "/images/maskable_192.png", revision: "1" },
  { url: "/images/maskable_512.png",  revision: "1" },
  { url: "/pages/home.html", revision: "1" },
  { url: "/pages/saved.html", revision: "1" },
  { url: "/pages/standings.html", revision: "1" },
  { url: "/pages/teams.html", revision: "1" },
  { url: "/js/materialize.min.js", revision: "1" },
  { url: "/js/navbar.js", revision: "1" },
  { url: "/js/reg-servis-worker.js", revision: "1" },
  { url: "/js/api.js", revision: "1" },
  { url: "/js/db.js", revision: "1" },
  { url: "/js/idb.js", revision: "1" },
],
{
  ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
  new RegExp("/pages/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages"
  })
);

workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org/v2/"),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpeg|jpg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: "google-fonts-webfonts",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0,200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

// event push notification
self.addEventListener("push", function(event) {
  let body = "";
  if (event.data) {
    body = event.data.text();
  } else {
    body = "push message no payload";
  }
  const options = {
    body: body,
    icon: "images/maskable_72.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrivel: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification("Bolaber Notification", options)
  );
});
