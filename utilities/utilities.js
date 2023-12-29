function getRandomColor() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}

function timestampToDate(timestamp) {
    return new Date(timestamp*1000).toLocaleDateString('en-US',{month:'short', day: 'numeric', year: 'numeric'});
}