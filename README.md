# Ananya Prabhu – portfolio

My personal site: [velvety-ganache-c94f02.netlify.app](https://velvety-ganache-c94f02.netlify.app)

Plain HTML, CSS and JavaScript, no build step. The hero is a small three.js scene that simulates the kind of radar point cloud my research pipeline tracks.

## What's where

```
index.html          page structure
css/style.css       all the styling
js/projects.js      the projects on the bookshelf (edit this to add one)
js/answers.js       the assistant's questions and answers
js/library.js       builds the shelf and the open-book view
js/assistant.js     the chat assistant + "leave your email" form
js/radar-room.js    the 3D radar room in the hero
js/main.js          clock and copy-email button
media/              demo videos, posters, cursors
resume.pdf
```

## Running it locally

Any static server works, for example:

```
python -m http.server
```

then open http://localhost:8000.

## Adding a project

Copy one block in `js/projects.js`, change the text, and drop the video in `media/`.
`ratio` is the video's width / height, so the book on the shelf matches the video's shape.

## Visitor stats and messages

- **Stats:** [GoatCounter](https://www.goatcounter.com). No cookies, so no cookie banner. Replace `YOUR-CODE` in `index.html` with the GoatCounter code.
- **Messages:** the assistant's email form uses Netlify Forms. Submissions show up under *Forms* in the Netlify dashboard.
