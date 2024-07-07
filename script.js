const APIURL = 'https://api.github.com/users/';

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario para manejarlo con JavaScript
    const user = document.getElementById('search').value;
    if (user) {
        getUser(user);
    }
});  

function getUser(username) {
    axios.get(APIURL + username)
    .then(function(response) {
        // función que se ejecutará al recibir una respuesta
        console.log(response.data);
        createUserCard(response.data);
    })
    .catch(function(error) {
        // función para capturar el error
        console.log(error);
        if (error.response.status == 404) {
            createErrorCard('No profile with this username');
        }
    });
}  

function createUserCard(user) {
    document.getElementById('main');
    console.log(user.repos_url)
    main.innerHTML = `
        <div class="card">
            <div>
                <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <ul>
                    <li>${user.followers} <strong>Followers</strong></li>
                    <li>${user.following} <strong>Following</strong></li>
                    <li>${user.public_repos} <strong>Repos</strong></li>
                </ul>  
            </div>
        </div>
    `;
}  

function createErrorCard(msg) {
    const main = document.getElementById('main');
    main.innerHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `;
}
