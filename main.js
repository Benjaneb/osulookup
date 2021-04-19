function getUser() {
    fetch("https://osu.ppy.sh/api/v1/users/9158995/osu",

    )
    .then(response => response.json())
    .then(json => {
        console.log(json);
    });
}