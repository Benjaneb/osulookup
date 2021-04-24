"using strict";

async function authorize() { // Fetch token
    return await fetch("https://glacial-peak-29237.herokuapp.com/https://osu.ppy.sh/oauth/token", {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "grant_type": "client_credentials",
            "client_id": 6654,
            "client_secret": "IuBG8rnvw0U60si1KDMhkaBnGyhMvLSGkhSNWKPu",
            "scope": "public"
        })
    })
    .then(response => {
        return response.json();
    })
    .then(json => {
        return json.access_token;
    })
    .catch(err => console.error(err));
}

async function getUser() {
    const token = await authorize();
    const userID = "9158995";

    return fetch(`https://glacial-peak-29237.herokuapp.com/https://osu.ppy.sh/api/v2/users/${userID}/osu`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.error(err));
}

async function buildProfile() {
    toggl(".search");
    toggl(".loading");
    const user = await getUser();
    toggl(".loading");
    toggl(".user");

    document.querySelector(".pfp").setAttribute("src", user.avatar_url);
    document.querySelector(".username").innerHTML = user.username;
}

function toggl(selector) {
    document.querySelector(selector).classList.toggle("hide");
}