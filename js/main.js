const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// clock in the menu bar (always Finnish time)
const clock = document.getElementById("clock");
const timeFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Helsinki",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
});

function updateClock() {
  clock.innerHTML = `Finland · <b>${timeFormat.format(new Date())}</b>`;
}
updateClock();
setInterval(updateClock, 20000);

// copy email button
const copyButton = document.getElementById("copyMail");

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("ananyaprabhu753@gmail.com");
    copyButton.textContent = "Copied";
  } catch {
    // clipboard blocked, so just select the text instead
    const range = document.createRange();
    range.selectNodeContents(document.getElementById("mail"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    copyButton.textContent = "Selected";
  }
  setTimeout(() => (copyButton.textContent = "Copy email"), 1800);
});
