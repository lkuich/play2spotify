const request = require('request-promise-native');

async function getQueries(url) {
    const page = await request.get(url);
    
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    const dom = new JSDOM(page);
    const doc = dom.window.document;
    
    const tracks = doc.querySelectorAll(".tracklist-entry");
    console.log(tracks.length)
    for (const track of tracks) {
        const title = track.querySelector(".track-title").textContent;
        const artist = track.querySelector(".artist").textContent;

        queries.push(`${title} - ${artist}`);
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

async function addTracks(playlistId, track, token) {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${track}`;
    await request.post(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
}

async function playToSpotify(sopifyToken, googlePlayPlaylist, spotifyPlaylist) {
    const queries = await getQueries(googlePlayPlaylist);
    const skippedTracks = [];
    
    for (const query of queries) {
        const track = await searchSpotifyTrack(query, sopifyToken);
        if (track)
            await addTracks(spotifyPlaylist, track, sopifyToken);
        else
            skippedTracks.push(query);
    }

    return skippedTracks;
}

module.exports = playToSpotify;