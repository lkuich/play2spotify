const request = require('request-promise-native');

async function getQueries(url) {
    const page = await request.get(url);
    
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    const dom = new JSDOM(page);

    const $ = (require('jquery'))(dom.window);

    // TODO: Better query to get length
    const len = parseInt($(`.stats`).text().replace(' songs', '').trim());
    const queries = [];
    for (let i = 0; i < len; i++) {
        const dataQuery = `.tracklist-entry[data-track-index="${i}"]`;
        const title = $(`${dataQuery} .track-title`).html();
        const artist = $(`${dataQuery} .artist`).html();
        
        queries.push(`${title}, ${artist}`);
    }

    return queries;
}

async function searchSpotifyTrack(query, token) {
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist%2Ctrack&limit=1`;
    const response = JSON.parse(await request.get(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }));
    
    if (response.tracks.items.length > 0) {
        const track = response.tracks.items[0].uri;
        return track;
    }
}

async function addTracks(tracks, token) {
    const url = `https://api.spotify.com/v1/playlists/4sP9VYce9Pr48bFhFoNrHq/tracks?uris=${tracks}`;
    await request.post(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
}

async function playToSpotify(googlePlay, sopifyToken) {
    const queries = await getQueries(googlePlay);
    
    for (const query of queries) {
        const track = await searchSpotifyTrack(query, sopifyToken);
        if (track)
            await addTracks(track, sopifyToken);
        else
            console.log(`Skipping ${query}`);
    }
}

(async () => {
    const args = process.argv.slice(2);
    if (args.length === 2) {
        await playToSpotify(args[0], args[1]);
    } else {
        console.log("You must pass 2 arguments in order, the Spotify token, and the Google Play Music Playlist URL");
    }
})();