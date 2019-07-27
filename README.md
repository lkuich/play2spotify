# play2spotify

A minimal and simple Node.js app to import your Spotify playlists to Google Play.

## Usage

1. Get your public Google Play Music playlist URL
  - Share your playlist
  - Make it public
  - Get the sharable URL
  - Visit the URL in an Incognito Window
  - Get the URL from the Incognito Window
 
Your playlist URL should look something like this:
https://play.google.com/music/preview/pl/ZMaBXylzrlyojbfOog3HOcAmR0PlCpykCcxxrBYcUHFh7KOj9lgD4dU0lVqDEryt7pZFtuT2lgM3RC8TEP1ad2N_09kzXqZIXA==

2. Get an API key from Spotify Developers
You should get a Bearer Token that looks something like this:

3. Get the ID of your target playlist

```bash
p2s apikey https://play.google.com/music/preview/pl/ZMaBXylzrlyojbfOog3HOcAmR0PlCpykCcxxrBYcUHFh7KOj9lgD4dU0lVqDEryt7pZFtuT2lgM3RC8TEP1ad2N_09kzXqZIXA== 4sP9VYce9Pr48bFhFoNrHq
```
