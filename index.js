const playToSpotify = require('./play2spotify');

(async () => {
    const args = process.argv.slice(2);
    if (args.length === 3) {
        await playToSpotify(args[0], args[1], args[2]);
    } else {
        console.log("You must pass 3 arguments in order, the Spotify token, the Spotify Playlist ID, and the Google Play Music Playlist URL");
    }
})();