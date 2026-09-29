# 💙 BFF Birthday Interactive Website

A five-page interactive birthday surprise website with a soft sky-blue friendship theme.

## Pages

1. **Birthday Welcome** — Happy Birthday + YES/NO interaction.
2. **Make a Wish** — Click all five candles to reveal "You Are So Special Always".
3. **BFF Game** — Catch 10 stars/hearts; winning reveals congratulations and bouquet.
4. **Memories** — One photo at a time with captions and controlled progression.
5. **Final Message** — Open the envelope to reveal a long best-friend birthday message.

## Add your own photos

Put exactly five photos in:

`assets/photos/`

Rename them:

- `photo1.jpg`
- `photo2.jpg`
- `photo3.jpg`
- `photo4.jpg`
- `photo5.jpg`

You can use PNG/WebP too, but then update the filenames in `script.js`.

## Add background video

Put a short looping MP4 at:

`assets/video/birthday-bg.mp4`

The video is intentionally displayed with low opacity so it feels like a transparent background layer.

## Add music

Put an MP3 file at:

`assets/music/birthday-music.mp3`

Most browsers block autoplay with sound until the user interacts with the page. The website also has a music button in the top-right.

## Run

You can simply double-click `index.html`.

For the most reliable experience, use a local server:

```bash
python -m http.server 8000
```

Then open:

`http://localhost:8000`

## Personalize

Edit the final message in `index.html`, the memory captions in `script.js`, and the colors/fonts in `style.css`.
