// Everything on the shelf. To add a project, copy one block and change it.
// ratio = width / height of the video, so the book is the same shape as the demo.

const projects = [
  {
    shelfTitle: "Radar Tracking",
    tag: "Research",
    year: "2026",
    colour: "#ffb8c9",
    video: "radar-dashboard",
    ratio: "1280 / 714",
    title: "Real-time multi-person radar tracking",
    meta: "Tampere University · 2026",
    about:
      "An end-to-end system that turns raw point clouds from three ceiling-mounted radars into tracked people and activities, in real time.",
    points: [
      "MQTT ingestion, DBSCAN clustering, position smoothing and tracking of up to three people",
      "Six-view dashboard: room map, point cloud, zero-Doppler, activity, clinical and replay",
      "Basis of my first-author paper, submitted to IEEE Sensors Letters (preprint on arXiv)",
    ],
    stack: ["Python", "MQTT", "DBSCAN", "JavaScript"],
    link: {
      text: "Read the preprint",
      url: "https://arxiv.org/abs/2610.39628",
    },
  },
  {
    shelfTitle: "Ayur Efkt Store",
    tag: "Full stack",
    year: "2026",
    colour: "#f1ddbd",
    video: "ayur-efkt",
    ratio: "1280 / 676",
    title: "Ayur Efkt online store",
    meta: "Built for a family business",
    about:
      "The complete online store for my aunt's Ayurvedic skincare brand. I built the whole web side from scratch: design, frontend, backend, orders and analytics.",
    points: [
      "Node.js and Express backend with MongoDB Atlas, deployed on Render",
      "Cart, checkout, order confirmation emails and customer reviews",
      "Google Analytics to see where visitors come from",
    ],
    stack: ["Node.js", "Express", "MongoDB", "Google Analytics"],
    link: {
      text: "View on GitHub",
      url: "https://github.com/AnanyaPrabhu27/Ayur-Efkt",
    },
  },
  {
    shelfTitle: "Notiva",
    tag: "Frontend",
    year: "2025",
    colour: "#ffb0c4",
    video: "notiva",
    ratio: "1280 / 700",
    title: "Notiva productivity dashboard",
    meta: "Personal project",
    about:
      "A React and TypeScript productivity app with task management, a Pomodoro timer and animated dashboards.",
    points: [
      "Component-based UI with animated progress views",
      "Task tracking with a weekly overview",
    ],
    stack: ["React", "TypeScript"],
    link: {
      text: "View on GitHub",
      url: "https://github.com/AnanyaPrabhu27/Notiva-Productivity-Dashboard",
    },
  },
  {
    shelfTitle: "GameLend",
    tag: "Full stack",
    year: "2024",
    colour: "#ffd29e",
    video: "game-lending",
    ratio: "1280 / 668",
    title: "Game lending system",
    meta: "Full-stack project",
    about:
      "A Flask and SQLite app for borrowing, lending and reviewing games, like a library, with authentication and admin views.",
    points: [
      "Authentication and admin workflows",
      "Catalogue, loans and reviews",
    ],
    stack: ["Flask", "SQLite", "Python"],
    link: {
      text: "View on GitHub",
      url: "https://github.com/AnanyaPrabhu27/Game-Lending-System",
    },
  },
  {
    shelfTitle: "Federated Learning",
    tag: "Capstone",
    year: "2025",
    colour: "#d6ccff",
    video: "federated",
    ratio: "776 / 436",
    title: "Federated learning monitoring dashboard",
    meta: "INSIGHT Lab capstone · 2025",
    about:
      "A prototype interface for monitoring a federated learning system used in distributed brain-imaging research. I was the project manager.",
    points: [
      "Led planning, team coordination and documentation with the lab as client",
      "Designed the prototype interface for distributed AI research",
    ],
    stack: ["UI/UX", "Figma", "Federated learning"],
    link: { text: "Confidential client project", url: null },
  },
  {
    shelfTitle: "ETL Pipelines",
    tag: "Data engineering",
    year: "2024",
    colour: "#a8e6d4",
    video: "pipelines",
    ratio: "900 / 462",
    title: "ETL pipelines with Apache Airflow",
    meta: "Coursework · 2024",
    about:
      "Scheduled pipelines that load, clean and aggregate power-plant and weather data into SQL, plus PostgreSQL pipelines with Kafka streaming.",
    points: [
      "Orchestrated repeatable loads with Airflow DAGs",
      "Streaming ingestion with Kafka into PostgreSQL",
    ],
    stack: ["Airflow", "PostgreSQL", "Kafka", "Python"],
    link: {
      text: "View on GitHub",
      url: "https://github.com/AnanyaPrabhu27/Data-Engineering-Projects",
    },
  },
  {
    shelfTitle: "Head Motion Tracking",
    tag: "R&D",
    year: "2025",
    colour: "#ffc9d6",
    video: "unity",
    ratio: "600 / 418",
    width: "76%",
    title: "Head motion tracking in Unity",
    meta: "R&D project · 2025",
    about:
      "A head-tracking application with real-time sensor integration for human–computer interaction research.",
    points: [
      "Real-time sensor data mapped onto a 3D avatar",
      "Built for HCI experiments",
    ],
    stack: ["Unity", "C#", "Sensors"],
    link: { text: "Confidential research project", url: null },
  },
  {
    shelfTitle: "Glass Detection + Style",
    tag: "Deep learning",
    year: "2025",
    colour: "#ffd9a8",
    beforeAfter: ["glass-before.jpg", "glass-after.jpg"],
    ratio: "1 / 1",
    width: "62%",
    title: "Wine glass detection and style transfer",
    meta: "Deep Learning course project",
    about:
      "A three-stage pipeline: a custom CNN classifier, a fine-tuned YOLOv5s detector, and neural style transfer applied only to the detected glasses.",
    points: [
      "Fine-tuned YOLOv5s to find the glasses",
      "Applied Rain Princess, Candy, Mosaic and Udnie styles only to the detected regions",
    ],
    stack: ["PyTorch", "YOLOv5", "CNN", "Style transfer"],
    link: {
      text: "View on GitHub",
      url: "https://github.com/AnanyaPrabhu27/CNN_YOLO_StyleTransfer",
    },
  },
  {
    shelfTitle: "Explainable AI",
    tag: "Thesis",
    year: "2026",
    colour: "#c9b8ff",
    bars: true,
    ratio: "1 / 1",
    width: "62%",
    title: "Explainable AI for emotion classification",
    meta: "Bachelor's thesis · Turku UAS · 2026",
    about:
      "My thesis on making emotion classifiers transparent, so you can see why a model decides what it does.",
    points: [
      "Applied LIME and SHAP to labeled emotion data",
      "Compared what each method shows about the model's decisions",
    ],
    stack: ["Python", "scikit-learn", "LIME", "SHAP"],
    link: {
      text: "Read on Theseus",
      url: "https://theseus.fi/handle/10024/927587",
    },
  },
];
