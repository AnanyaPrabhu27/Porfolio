// Answers for the assistant. Each one has the question shown on the button,
// some words people might type, and the reply.
// Leave answer as null to hide a question until it's written.

const email = "ananyaprabhu753@gmail.com";

const answers = [
  {
    question: "What is her strongest project?",
    keywords: [
      "strongest",
      "proud",
      "main project",
      "top project",
      "biggest achievement",
    ],
    answer:
      "The real-time radar tracking system at Tampere University. She was the sole developer: three ceiling sensors, clustering and tracking of up to three people, and a six-view dashboard. It became her first-author paper, submitted to IEEE Sensors Letters with a preprint on arXiv.",
  },
  {
    question: "Is she open to work, and when can she start?",
    keywords: [
      "open to work",
      "start",
      "available",
      "availability",
      "notice period",
      "when can",
    ],
    answer:
      "Yes. She's looking for her first full-time data or AI role and can start in January 2027.",
  },
  {
    question: "Where is she based? Remote, hybrid or relocating?",
    keywords: [
      "based",
      "where",
      "location",
      "remote",
      "hybrid",
      "relocat",
      "city",
      "live",
    ],
    answer:
      "She's based in Tampere, Finland. She's open to on-site, hybrid and remote roles, and happy to relocate within Europe.",
  },
  {
    question: "Does she need visa sponsorship?",
    keywords: ["visa", "sponsor", "permit", "authori", "right to work"],
    answer:
      "She doesn't need sponsorship to work in Finland. For roles elsewhere in Europe, it's best to ask her directly so she can check what applies.",
  },
  {
    question: "What kind of roles is she looking for?",
    keywords: [
      "role",
      "title",
      "position",
      "looking for",
      "kind of job",
      "company size",
      "field",
    ],
    answer:
      "Junior data engineer, data analyst, and ML or AI engineer roles, plus graduate and trainee programmes. She's most drawn to teams working with real-world data from sensors, health or customers, and she's open on company size.",
  },
  {
    question: "What was her hardest project?",
    keywords: [
      "hardest",
      "difficult project",
      "contribution",
      "story",
      "toughest",
    ],
    answer:
      "The radar tracking system at Tampere University. She started with no background in radar or sensors, learned the hardware and data streams on the job, and became the sole developer of the whole pipeline: ingestion, clustering, tracking and a six-view dashboard. She also planned the data collection sessions and wrote the first-author paper.",
  },
  {
    question: "How does she work with a team and handle feedback?",
    keywords: ["team", "feedback", "collaborat", "criticism", "colleague"],
    answer:
      "She always asks for feedback, because you can't know what someone thinks of your work until they tell you. Clear and honest feedback is what she prefers. She does her best work in a team that meets, talks things through and learns from each other.",
  },
  {
    question: "How does she handle failure?",
    keywords: ["fail", "mistake", "setback", "went wrong"],
    answer:
      "When things feel overwhelming, her first move is to build structure: a timetable, a spreadsheet, a plan. When a project or presentation doesn't go the way she hoped, she focuses on what's next. She rewards herself for the wins and doesn't dwell on the setbacks. Something she's working on: asking for help earlier instead of trying to solve everything on her own.",
  },
  {
    question: "What environment brings out her best?",
    keywords: ["environment", "culture", "best work", "thrive", "motivat"],
    answer:
      "A positive team with real collaboration. She's comfortable working remotely, but she learns the most when people meet, share ideas and work things through together.",
  },
  {
    question: "What would challenge her most in a new role?",
    keywords: ["challenge her", "weakness", "struggle", "hard for her"],
    answer:
      "Learning a new field or toolset quickly. She has done it before: she started the radar project knowing nothing about radar and ended up writing a paper on it.",
  },
  {
    question: "Something not in her CV?",
    keywords: [
      "not in",
      "cv",
      "resume",
      "surprising",
      "fun fact",
      "hobby",
      "outside work",
    ],
    answer:
      "She loves exploring creativity in tech, from small electronics like the desk robots going viral to art made with code. She also built a full online store from scratch for her aunt's Ayurvedic skincare brand.",
  },
  {
    question: "What should I ask her in an interview?",
    keywords: ["interview", "ask her", "question to ask", "recommend"],
    answer:
      "Ask how she went from no radar background to a working multi-sensor pipeline and a submitted paper. It shows how she learns something new.",
  },
  {
    question: "What is her salary expectation?",
    keywords: ["salary", "pay", "compensation", "wage", "expectation"],
    answer: "She's happy to discuss salary directly, depending on the role.",
  },
  {
    question: "Which tools does she use?",
    keywords: [
      "tool",
      "skill",
      "stack",
      "python",
      "sql",
      "tech",
      "programming",
    ],
    answer:
      "Python and SQL every day. Data engineering: Airflow, Kafka, MQTT, PostgreSQL and Docker. ML: scikit-learn, PyTorch, TensorFlow, and SHAP and LIME for explainability. She has also used Power BI and React.",
  },
  {
    question: "What is her research about?",
    keywords: [
      "research",
      "paper",
      "thesis",
      "publication",
      "xai",
      "explainable",
      "ieee",
    ],
    answer:
      "Human activity recognition with ceiling-mounted radar (first-author paper submitted to IEEE Sensors Letters, preprint on arXiv), and explainable AI: her thesis used LIME and SHAP to explain emotion classifiers.",
  },
  {
    question: "What did she study?",
    keywords: [
      "study",
      "degree",
      "education",
      "graduat",
      "university",
      "school",
    ],
    answer:
      "A Bachelor of Engineering in ICT, specialising in Data Engineering and AI, at Turku University of Applied Sciences. She graduated in June 2026.",
  },
  {
    question: "What is the best way to contact her?",
    keywords: [
      "contact",
      "email",
      "reach",
      "phone",
      "linkedin",
      "get in touch",
      "message her",
    ],
    answer: `Email is quickest: <b>${email}</b>. She's also on <a href="https://linkedin.com/in/ananya-prabhu-870b59271">LinkedIn</a>.`,
  },
];
