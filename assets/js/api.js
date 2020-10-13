let base_url = "https://api.football-data.org/v2/";
let token = "2116977228654ecd8d10ee99f374e3de";
let loading = document.querySelector(".loader");
let opt = {
	headers: {
		"X-Auth-Token": token,
	},
};
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
	// Method reject() akan membuat blok catch terpanggil
	if (response.status !== 200) return Promise.reject(new Error(response.statusText));
	// Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
	else return Promise.resolve(response);
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
	return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
	// Parameter error berasal dari Promise.reject()
	console.log("Error : " + error);
}

export function getStandings(id_liga = "2021") {
	if ("caches" in window) {
		caches
			.match(`${base_url}competitions/${id_liga}/standings?standingType=TOTAL`)
			.then(response => {
				if (response) {
					response.json().then(data => {
						let standingsHTML = "";
						data.standings[0].table.forEach(e => {
							standingsHTML += /*html*/ `
                <div class="col s12 card card-standings hoverable">
                    <a href="./pages/team.html?id=${e.team.id}">
                      <div class="row card-content">
                        <div class="col s4 m2 center-align club">
                            <img src="${e.team.crestUrl.replace(
                              /^http:\/\//i,
                              "https://"
                            )}" class="team-img" alt="logo-team"/>
                        </div>
                        <div class="col s8 m4">
                            <span class="black-text truncate">${e.team.name}</span>
                            <p>Position: ${e.position}</p>
                        </div>
                        <div class="col s12 m6 right-align">
                            <div class="col s3 center-align">                          
                                <p class="black-text">W</p>                                                    
                                <p class="black-text">${
                                  e.won
                                }</p>                          
                            </div>
                            <div class="col s3 center-align">                          
                                <p class="black-text">L</p>                                                    
                                <p class="black-text">${
                                  e.draw
                                }</p>                          
                            </div>
                            <div class="col s3 center-align">                          
                                <p class="black-text">D</p>                                                    
                                <p class="black-text">${
                                  e.lost
                                }</p>                          
                            </div>
                            <div class="col s3 center-align">                          
                                <p class="black-text">PTS</p>                                                    
                                <p class="black-text">${
                                  e.points
                                }</p>                          
                            </div>
                        </div>
                      </div>                      
                    </a>
                </div>
              `;
						});
						// Sisipkan judul
						document.getElementById("standings-liga").innerHTML = data.competition.name;
						// Sisipkan komponen card ke dalam elemen dengan id #content
						document.getElementById("standings").innerHTML = standingsHTML;
					});
				}
			})
			.catch(error)
			.finally(() => loading.classList.toggle("hide"));
	}

	fetch(`${base_url}competitions/${id_liga}/standings?standingType=TOTAL`, opt)
		.then(status)
		.then(json)
		.then(data => {
			let standingsHTML = "";
			data.standings[0].table.forEach(e => {
        standingsHTML += /*html*/ `
          <div class="col s12 card card-standings hoverable">
              <a href="./pages/team.html?id=${e.team.id}">
                <div class="row card-content">
                  <div class="col s4 m2 center-align club">
                      <img src="${e.team.crestUrl.replace(
                        /^http:\/\//i,
                        "https://"
                      )}" class="team-img" alt="logo-team"/>
                  </div>
                  <div class="col s8 m4">
                      <span class="black-text truncate">${e.team.name}</span>
                      <p>Position: ${e.position}</p>
                  </div>
                  <div class="col s12 m6 right-align">
                      <div class="col s3 center-align">                          
                          <p class="black-text">W</p>                                                    
                          <p class="black-text">${
                            e.won
                          }</p>                          
                      </div>
                      <div class="col s3 center-align">                          
                          <p class="black-text">L</p>                                                    
                          <p class="black-text">${
                            e.draw
                          }</p>                          
                      </div>
                      <div class="col s3 center-align">                          
                          <p class="black-text">D</p>                                                    
                          <p class="black-text">${
                            e.lost
                          }</p>                          
                      </div>
                      <div class="col s3 center-align">                          
                          <p class="black-text">PTS</p>                                                    
                          <p class="black-text">${
                            e.points
                          }</p>                          
                      </div>
                  </div>
                </div>                      
              </a>
          </div>
        `;
			});
			// Sisipkan judul
			document.getElementById("standings-liga").innerHTML = data.competition.name;
			// Sisipkan komponen card ke dalam elemen dengan id #content
			document.getElementById("standings").innerHTML = standingsHTML;
		})
		.catch(error)
		.finally(() => loading.classList.toggle("hide"));
}

export function getTeams(id_liga = "2021") {
	if ("caches" in window) {
		caches
			.match(`${base_url}competitions/${id_liga}/teams`)
			.then(response => {
				if (response) {
					response.json().then(data => {
						// Menyusun komponen card teams secara dinamis
						let teamsHTML = "";
						data.teams.forEach(team => {
							teamsHTML += /*html*/ `  
								<div class="col s12 m6 l4">      
									<div class="card card-standings hoverable">
										<a href="./pages/team.html?id=${team.id}">
											<div class="row card-content">
												<div class="col s2 center-align">
													<img src="${team.crestUrl.replace(
													/^http:\/\//i,
													"https://"
													)}" class="team-img" alt="logo-team" />
												</div>
												<div class="col s4 offset-s2">
													<span class="black-text truncate">${team.name}</span>
													<p class="indigo-text">${team.area.name}</p>
												</div>                      
											</div>                      
										</a>
									</div>
								</div>
							`;
						});
						// Sisipkan judul
						document.getElementById("teams-liga").innerHTML = `All Team <br>${data.competition.name}`;
						// Sisipkan komponen card ke dalam elemen dengan id #content
						document.getElementById("teams").innerHTML = teamsHTML;
					});
				}
			})
			.catch(error)
			.finally(() => loading.classList.toggle("hide"));
	}

	fetch(`${base_url}competitions/${id_liga}/teams`, opt)
		.then(status)
		.then(json)
		.then(data => {
			// Objek/array JavaScript dari response.json() masuk lewat data.
			// Menyusun komponen card teams secara dinamis
			let teamsHTML = "";
			data.teams.forEach(team => {
				teamsHTML += /*html*/ `  
          <div class="col s12 m6 l4">      
            <div class="card card-standings hoverable">
              <a href="./pages/team.html?id=${team.id}">
                <div class="row card-content">
                  <div class="col s2 center-align">
                    <img src="${team.crestUrl.replace(
                    /^http:\/\//i,
                    "https://"
                    )}" class="team-img" alt="logo-team" />
                  </div>
                  <div class="col s4 offset-s2">
                    <span class="black-text truncate">${team.name}</span>
                    <p class="indigo-text">${team.area.name}</p>
                  </div>                      
                </div>                      
              </a>
            </div>
          </div>
        `;
			});
			// Sisipkan judul
			document.getElementById("teams-liga").innerHTML = `All Team <br>${data.competition.name}`;
			// Sisipkan komponen card ke dalam elemen dengan id #content
			document.getElementById("teams").innerHTML = teamsHTML;
		})
		.catch(error)
		.finally(() => loading.classList.toggle("hide"));
}

export function getTeamById() {
	return new Promise((resolve, reject) => {
		// Ambil nilai query parameter (?id=)
		let urlParams = new URLSearchParams(window.location.search);
		let idParam = urlParams.get("id");
		if ("caches" in window) {
			caches.match(`${base_url}teams/${idParam}`).then(response => {
					if (response) {
						response.json().then(data => {
							// Objek JavaScript dari response.json() masuk lewat variabel data.
							// Menyusun komponen card artikel secara dinamis
            let teamHTML = /*html*/ `
              <h2 id="team-liga" class="center-align">${data.name}</h2>
              <div class="col s6 offset-s3 center">
                <img src="${data.crestUrl.replace(
                  /^http:\/\//i,
                  "https://"
                )}" alt="logo team" class="img-logo"/>
              </div>            
              <br>                        
              <ul class="collection with-header">
                <li class="collection-header"><h6>Details</h6></li>
                <li class="collection-item">              
                    <i class="material-icons">map</i>
                    <span class="right blue-text truncate">${
                      data.address
                    }</span>
                </li>              
                <li class="collection-item">              
                    <i class="material-icons">phone</i>
                    <span class="right blue-text truncate">${
                      data.phone
                    }</span>
                </li>              
                <li class="collection-item">              
                    <i class="material-icons">public</i>
                    <span class="right blue-text truncate">${
                      data.website
                    }</span>
                </li>              
                <li class="collection-item">              
                    <i class="material-icons">email</i>
                    <span class="right blue-text truncate">${
                      data.email
                    }</span>
                </li>              
                <li class="collection-item">              
                    <i class="material-icons">place</i>
                    <span class="right blue-text truncate">${
                      data.venue
                    }</span>
                </li>              
                </ul>         
                <br>           
              <ul class="collection with-header">
              <li class="collection-header"><h6>Squad</h6></li>         
            `;
						let no = 1;
							data.squad.forEach(squad => {
								teamHTML += /*html*/ `
                  <li class="collection-item">              
                    <span class="black-text truncate">${no++}. ${squad.name} (${squad.position}) 
                      <i class="material-icons secondary-content blue-text">person</i>
                    </span>            
                  </li>  
                `;
							});
							teamHTML += /*html*/`
                  </ul>   
              `;

							document.getElementById("body-content").innerHTML = teamHTML;
							// Kirim objek data hasil parsing json untuk disimpan ke indexed db
							resolve(data);
						});
					}
				})
				.catch(error)
				.finally(() => loading.classList.toggle("hide"));
		}

		fetch(`${base_url}teams/${idParam}`, opt)
			.then(status)
			.then(json)
			.then(data => {
				// Menyusun komponen card artikel secara dinamis
        let teamHTML = /*html*/ `
          <h2 id="team-liga" class="center-align">${data.name}</h2>
          <div class="col s6 offset-s3 center">
            <img src="${data.crestUrl.replace(
              /^http:\/\//i,
              "https://"
            )}" alt="logo team" class="img-logo"/>
          </div>            
          <br>                        
          <ul class="collection with-header">
            <li class="collection-header"><h6>Details</h6></li>
            <li class="collection-item">              
                <i class="material-icons">map</i>
                <span class="right blue-text truncate">${
                  data.address
                }</span>
            </li>              
            <li class="collection-item">              
                <i class="material-icons">phone</i>
                <span class="right blue-text truncate">${
                  data.phone
                }</span>
            </li>              
            <li class="collection-item">              
                <i class="material-icons">public</i>
                <span class="right blue-text truncate">${
                  data.website
                }</span>
            </li>              
            <li class="collection-item">              
                <i class="material-icons">email</i>
                <span class="right blue-text truncate">${
                  data.email
                }</span>
            </li>              
            <li class="collection-item">              
                <i class="material-icons">place</i>
                <span class="right blue-text truncate">${
                  data.venue
                }</span>
            </li>              
            </ul>         
            <br>           
          <ul class="collection with-header">
          <li class="collection-header"><h6>Squad</h6></li>         
        `;
        let no = 1;
          data.squad.forEach(squad => {
            teamHTML += /*html*/ `
              <li class="collection-item">              
                <span class="black-text truncate">${no++}. ${squad.name} (${squad.position}) 
                  <i class="material-icons secondary-content blue-text">person</i>
                </span>            
              </li>  
            `;
          });
          teamHTML += /*html*/`
              </ul>   
          `;
				document.getElementById("body-content").innerHTML = teamHTML;
				// Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
				resolve(data);
			})
			.catch(error)
			.finally(() => loading.classList.toggle("hide"));
	});
}

export function getFavoriteTeams() {
	getAll()
		.then(teams => {
			// Menyusun komponen card artikel secara dinamis
			let teamsHTML = "";
			teams.forEach(team => {
				teamsHTML += /*html*/`
						<div class="col s12 m6 l4">      
						<div class="card card-standings hoverable">
							<a href="./pages/team.html?id=${team.id}&saved=true">
								<div class="row card-content">
									<div class="col s2 center-align">
										<img src="${team.crestUrl.replace(
										/^http:\/\//i,
										"https://"
										)}" class="team-img" alt="logo-team"/>
									</div>
									<div class="col s4 offset-s2">
										<span class="black-text truncate">${team.name}</span>
										<p class="indigo-text">${team.area.name}</p>
									</div>                      
								</div>                      
							</a>
						</div>
					</div>
                `;
			});
			// Sisipkan judul
			document.getElementById("favorite-liga").innerHTML = `Favorite Team`;
			// Sisipkan komponen card ke dalam elemen dengan id #body-content
			document.getElementById("favorite-teams").innerHTML = teamsHTML;
		});
}

export function getFavoriteTeamById() {
	let urlParams = new URLSearchParams(window.location.search);
	let idParam = urlParams.get("id");

	getById(idParam).then(team => {
    let teamHTML = /*html*/`
              <h2 id="team-liga" class="center-align">${team.name}</h2>
              <div class="col s6 offset-s3 center">
                <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" class="img-logo" alt="logo-team"/>
              </div>            
              <br>                        
              <ul class="collection with-header">
                <li class="collection-header"><h6>Details</h6></li>
                <li class="collection-item">              
                  <i class="material-icons">map</i>
                  <span class="right blue-text truncate">${team.address}</span>
                </li>              
                <li class="collection-item">              
                  <i class="material-icons">phone</i>
                  <span class="right blue-text truncate">${team.phone}</span>
                </li>              
                <li class="collection-item">              
                  <i class="material-icons">public</i>
                  <span class="right blue-text truncate">${team.website}</span>
                </li>              
                <li class="collection-item">              
                  <i class="material-icons">email</i>
                  <span class="right blue-text truncate">${team.email}</span>
                </li>              
                <li class="collection-item">              
                  <i class="material-icons">place</i>
                  <span class="right blue-text truncate">${team.venue}</span>
                </li>              
              </ul>         
              <br>           
              <ul class="collection with-header">
                <li class="collection-header"><h6>Squad</h6></li>         
            `;
		let no = 1;
		team.squad.forEach(squad => {
			teamHTML += /*html*/`
              <li class="collection-item">              
              <span class="black-text truncate">${no++}. ${squad.name} (${
          squad.position
        }) <i class="material-icons secondary-content blue-text">person</i></span>            
              </li>  
              `;
		});

		teamHTML += /*html*/`
              </ul>   
            `;
		// Sisipkan komponen card ke dalam elemen dengan id #content
		document.getElementById("body-content").innerHTML = teamHTML;
	});
}