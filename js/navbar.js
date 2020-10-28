document.addEventListener("DOMContentLoaded", function() {
  // activate sidebar navigation
  const elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNavbar();

  function loadNavbar() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;
  // load menu list link
        document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });
  // register event listener -> link menu
        document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
          elm.addEventListener("click", function(event) {
  // close sidenav
            const sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();
  // load active content page
            page = event.target.getAttribute("href").substr(1);
            loadPages(page);
          });
        });
      }
    };
    xhttp.open("GET", "navbar.html", true);
    xhttp.send();
  }
  // load page content
  let page = window.location.hash.substr(1);
  if (page === "") page = "home";
  loadPages(page);

  function loadPages(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        const content = document.querySelector("#body_content");
        if(page === "standings") {
          getAllStandings();
        } else if (page === "teams") {
          getAllTeams();
        } else if (page === "saved") {
          getSavedTeam();
        }
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 400) {
          content.innerHTML = "<p>sorry, your page is not found</p>";
        } else {
          content.innerHTML = "<p>sorry, your page can not access</p>";
        }
      }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }
});
