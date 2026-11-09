// Builds the bookshelf from projects.js and opens a book when you click it.

const shelf = document.getElementById("shelf");
const book = document.getElementById("book");
const bookMedia = document.getElementById("bookMedia");

function coverArt(project) {
  if (project.video) {
    return `<video src="media/${project.video}.mp4" poster="media/${project.video}.jpg"
              autoplay muted loop playsinline aria-hidden="true"></video>`;
  }

  if (project.beforeAfter) {
    const [before, after] = project.beforeAfter;
    return `
      <img src="media/${before}" alt="">
      <img class="after" src="media/${after}" alt="">
      <span class="wipe-label" style="left: 8px">Before</span>
      <span class="wipe-label" style="right: 8px">After</span>`;
  }

  if (project.bars) {
    const widths = [82, 60, 70, 44, 56, 30];
    return `<div class="bars">${widths.map((w) => `<i style="width: ${w}%"></i>`).join("")}</div>`;
  }

  return "";
}

function pageArt(project) {
  if (project.video) {
    return `<video src="media/${project.video}.mp4" poster="media/${project.video}.jpg"
              autoplay muted loop playsinline controls aria-label="Demo of ${project.title}"></video>`;
  }

  if (project.beforeAfter) {
    const [before, after] = project.beforeAfter;
    return `
      <div class="pair">
        <figure><img src="media/${before}" alt="Original photo of two wine glasses">Before</figure>
        <figure><img src="media/${after}" alt="The same photo with Rain Princess style on the detected glasses">After · Rain Princess</figure>
      </div>`;
  }

  return `<div class="plate"><p class="mono">${project.tag}</p><div class="big">${project.shelfTitle}</div></div>`;
}

projects.forEach((project, i) => {
  const slot = document.createElement("div");
  slot.className = "slot";

  const cover = document.createElement("button");
  cover.type = "button";
  cover.className = "cover";
  cover.style.setProperty("--c", project.colour);
  cover.style.setProperty("--i", i);
  cover.style.setProperty("--ar", project.ratio);
  if (project.width) cover.style.setProperty("--w", project.width);
  cover.setAttribute("aria-label", `Open project: ${project.title}`);

  cover.innerHTML = `
    <div class="art ${project.beforeAfter ? "wipe" : ""}">${coverArt(project)}</div>
    <div class="band">
      <div><span class="k">${project.tag}</span><span class="t">${project.shelfTitle}</span></div>
      <span class="y">${project.year}</span>
    </div>`;

  cover.addEventListener("click", () => openBook(project));

  const plank = document.createElement("div");
  plank.className = "plank";

  slot.append(cover, plank);
  shelf.append(slot);
});

function openBook(project) {
  document.getElementById("bookMeta").textContent = project.meta;
  document.getElementById("bookTitle").textContent = project.title;
  document.getElementById("bookBody").textContent = project.about;
  document.getElementById("bookPoints").innerHTML = project.points.map((p) => `<li>${p}</li>`).join("");
  document.getElementById("bookStack").innerHTML = project.stack.map((s) => `<span>${s}</span>`).join("");

  const link = document.getElementById("bookLink");
  link.innerHTML = project.link.url
    ? `<a href="${project.link.url}" target="_blank" rel="noopener">${project.link.text} ↗</a>`
    : `<span class="mono">${project.link.text}</span>`;

  bookMedia.innerHTML = pageArt(project);
  book.showModal();
}

document.getElementById("bookClose").addEventListener("click", () => book.close());

// clicking the dark area around the book closes it too
book.addEventListener("click", (e) => {
  if (e.target === book) book.close();
});

// stop the video when the book closes
book.addEventListener("close", () => {
  bookMedia.innerHTML = "";
});
