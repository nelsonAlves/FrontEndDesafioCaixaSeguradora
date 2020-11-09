(function() {
    const search = document.getElementById("search");
    const profile = document.getElementById("profile");
    const url = "https://api.github.com/users";
    const client_id = "Iv1.7bf46f7d6225b4a9";
    const client_secret = "7a8b52ab7de85e1228325b588492d1151aaf8fca";
   
    
    async function getUser(user) {

        const profileResponse = await 
        fetch(
            `${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`
            );

        const reposResponse = await 
        fetch(
            `${url}/${user}/repos?client_id=${client_id}&client_secret=${client_secret}`
            );
    
        const profile = await profileResponse.json();
        const repos = await reposResponse.json();
        
        return {profile, repos};
    }

    function showProfile(user) {
        
        profile.innerHTML = `<div class="row">
        <div class="col-md-4">
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${user.avatar_url}">                    
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Repositórios: <span class="badge">${user.public_repos}</span></li>
                        <li class="list-group-item">Seguidores: <span class="badge">${user.followers_url}</span></li>
                        <li class="list-group-item">Seguindo: <span class="badge">${user.following_url}</span></li>
                    </ul>
                    <div class="card-body">
                        <a href="${user.html_url}" target="_blank" 
                        class="btn btn-warning btn-block">Ver Pefil</a>
                    </div>            
                </div>
              <div class="col-md-8">
                  <div id="repos">
                </div>
              </div>
            </div>
        </div>
    </div>`;
    }

    function showRepos(repos) {
            
        let output='';

        repos.forEach(repos => {
            output += 
            ` <div class="card card-body mb-2">
            <div class="row">
                <div class="col-md-6"><a href="${repo.html_url}" target="_blank">
                ${repo.name}
                </a>
                </div>
                    <div class="col-md-6">
                        <span class="badge badge-primary">Strars:${repo.stargazes_count}</span>
                        <span class="badge badge-success">Watch:${repo.watchers_count}</span>
                        <span class="badge badge-warning">Forks:${repo.forks_count}</span>
                    </div>
         </div>
        
         </div>`;
        });

        document.getElementById("repos").innerHTML = output;
    }

    search.addEventListener("keyup", e =>{
        const user = e.target.value;

        if (user.length > 0) {
            
            getUser(user).then(res => {                
                showProfile(res.profile);
                showRepos(res.repos);
            });
        }
    });
})();
