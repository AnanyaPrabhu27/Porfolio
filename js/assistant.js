// A small scripted assistant. No AI behind it, it just matches questions to answers.js.

const launcher = document.getElementById("launcher");
const panel = document.getElementById("assistant");
const chatLog = document.getElementById("chatLog");
const suggestions = document.getElementById("suggestions");
const askForm = document.getElementById("askForm");
const askInput = document.getElementById("askInput");

const ready = answers.filter((a) => a.answer);
const SHOWN_AT_FIRST = 5;
let greeted = false;
let answeredCount = 0;
let offeredFollowUp = false;
const askedQuestions = []; // sent along with the email so I know what they were curious about

function addMessage(html, from) {
  const msg = document.createElement("div");
  msg.className = `msg ${from}`;
  msg.innerHTML = html;
  chatLog.append(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
  return msg;
}

// shows "typing…" for a moment so it feels less instant
function reply(html) {
  const msg = addMessage(
    '<span class="typing"><i></i><i></i><i></i></span>',
    "bot",
  );
  setTimeout(
    () => {
      msg.innerHTML = html;
      chatLog.scrollTop = chatLog.scrollHeight;
    },
    reduceMotion ? 0 : 650,
  );
}

// longer keyword matches count for more, so "best way to contact" finds contact
function findAnswer(text) {
  const q = text.toLowerCase();
  let best = null;
  let bestScore = 0;

  for (const item of ready) {
    const score = item.keywords
      .filter((k) => q.includes(k))
      .reduce((sum, k) => sum + k.length, 0);
    if (score > bestScore) {
      best = item;
      bestScore = score;
    }
  }
  return best;
}

function ask(text, item = findAnswer(text)) {
  addMessage(text.replace(/</g, "&lt;"), "me");
  askedQuestions.push(text);

  if (/get back|follow up|my email|contact me|reach me/i.test(text)) {
    showFollowUpForm();
    return;
  }

  if (item) {
    reply(item.answer);
    answeredCount++;

    // after a couple of answers, offer (once) to pass their email on. never forced.
    if (answeredCount === 2 && !offeredFollowUp) {
      offeredFollowUp = true;
      setTimeout(
        () =>
          reply(
            "If you'd like Ananya to get back to you, you can leave your email. Totally optional.",
          ),
        reduceMotion ? 0 : 1400,
      );
    }
  } else {
    reply(
      `I'm a small scripted assistant, so I can't answer that one. Try a question below, or email Ananya at <b>${email}</b>.`,
    );
  }
}

function showSuggestions(all) {
  suggestions.innerHTML = "";
  const list = all ? ready : ready.slice(0, SHOWN_AT_FIRST);

  for (const item of list) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = item.question;
    btn.addEventListener("click", () => ask(item.question, item));
    suggestions.append(btn);
  }

  const follow = document.createElement("button");
  follow.type = "button";
  follow.className = "follow";
  follow.textContent = "Leave my email for Ananya";
  follow.addEventListener("click", showFollowUpForm);
  suggestions.append(follow);

  if (!all && ready.length > SHOWN_AT_FIRST) {
    const more = document.createElement("button");
    more.type = "button";
    more.className = "more";
    more.textContent = `More questions (${ready.length - SHOWN_AT_FIRST})`;
    more.addEventListener("click", () => showSuggestions(true));
    suggestions.append(more);
  }
}

// the little "leave your email" form inside the chat.
// it posts to Netlify Forms, so the messages show up in my Netlify dashboard and inbox.
function showFollowUpForm() {
  if (chatLog.querySelector(".follow-form")) return;

  const msg = addMessage(
    `<form class="follow-form">
      <p>Leave your details and Ananya will get back to you. Only she sees this.</p>
      <label>Email <input type="email" name="email" required autocomplete="email"></label>
      <label>Name or company <span>(optional)</span> <input type="text" name="name" autocomplete="organization"></label>
      <label>Message <span>(optional)</span> <textarea name="message" rows="2"></textarea></label>
      <button type="submit">Send to Ananya</button>
    </form>`,
    "bot",
  );

  const form = msg.querySelector("form");
  form.querySelector("input").focus();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    data.append("form-name", "follow-up");
    data.append("asked", askedQuestions.join(" | "));
    data.append("page", location.href);

    form.querySelector("button").disabled = true;

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });
      if (!res.ok) throw new Error(res.status);
      msg.remove();
      reply("Thanks! Ananya will be in touch soon.");
    } catch {
      form.querySelector("button").disabled = false;
      reply(
        `That didn't go through, sorry. You can email her directly at <b>${email}</b>.`,
      );
    }
  });
}

function togglePanel(open) {
  panel.hidden = !open;
  launcher.setAttribute("aria-expanded", open);

  if (open && !greeted) {
    greeted = true;
    reply(
      "Hi. I can introduce Ananya's work and answer the usual recruiter questions: availability, location, roles and more. What would you like to know?",
    );
  }
  if (open) askInput.focus();
}

showSuggestions(false);

launcher.addEventListener("click", () => togglePanel(panel.hidden));
document
  .getElementById("assistantClose")
  .addEventListener("click", () => togglePanel(false));
document
  .getElementById("heroAsk")
  .addEventListener("click", () => togglePanel(true));

askForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = askInput.value.trim();
  if (!text) return;
  ask(text);
  askInput.value = "";
});
