import {
    getStandings,
    getTeams,
    getFavoriteTeams
} from './api.js';

document.addEventListener("DOMContentLoaded", function () {
    // Load Sidebar
    let elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();
    // Load content page
    let page = window.location.hash.substr(1);
    if (page === "") page = "standings";
    loadPage(page);

    function loadNav() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status !== 200) return;

                // Muat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav").forEach((elm) => {
                    elm.innerHTML = xhttp.responseText;
                });

                // Daftarkan event listener untuk setiap tautan menu
                document
                    .querySelectorAll(".sidenav a, .topnav a")
                    .forEach( (elm) => {
                        elm.addEventListener("click", (event) => {
                            // Tutup sidenav
                            let sidenav = document.querySelector(".sidenav");
                            M.Sidenav.getInstance(sidenav).close();
                            // Muat konten halaman yang dipanggil
                            page = event.target.getAttribute("href").substr(1);
                            loadPage(page);
                        });
                    });
            }
        };
        xhttp.open("GET", "/component/nav.html", true);
        xhttp.send();
    }

    function loadPage(page) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                let content = document.querySelector("#body-content");
                if (page === "standings") {
                    getStandings('2021');
                } else if (page === "teams") {
                    getTeams('2021');
                } else if (page === "favorite-teams") {
                    getFavoriteTeams();
                }
                if (this.status === 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status === 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };
        xhttp.open("GET", "/pages/" + page + ".html", true);
        xhttp.send();
    }
});