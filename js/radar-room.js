// The hero animation: a room with three ceiling radars and a person made of points,
// a bit like what my real pipeline sees. Built with three.js.

(function () {
  const cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const colours = {
    background: cssVar("--plum"),
    grid: cssVar("--seam"),
    person: cssVar("--blush"),
    sensor: cssVar("--lilac"),
    path: cssVar("--apricot"),
  };

  const canvas = document.getElementById("room");
  const tag = document.getElementById("ptag");

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(colours.background);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(colours.background, 9, 22);

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  const lookAt = new THREE.Vector3(-0.9, 1.1, 0);
  const v = (x, y, z) => new THREE.Vector3(x, y, z);

  // ---------- the room ----------

  scene.add(new THREE.GridHelper(8, 16, colours.grid, colours.grid));

  const walls = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(8, 3, 6)),
    new THREE.LineBasicMaterial({ color: colours.grid }),
  );
  walls.position.y = 1.5;
  scene.add(walls);

  // three sensors on the ceiling, each with its coverage cone
  const sensorSpots = [
    [-2.4, -1.4],
    [2.4, -1.4],
    [0, 1.8],
  ];

  for (const [x, z] of sensorSpots) {
    const sensor = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.07, 0.3),
      new THREE.MeshBasicMaterial({ color: colours.sensor }),
    );
    sensor.position.set(x, 3, z);

    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(2.3, 3, 40, 1, true),
      new THREE.MeshBasicMaterial({
        color: colours.sensor,
        transparent: true,
        opacity: 0.05,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    cone.position.set(x, 1.5, z);

    const footprint = new THREE.Mesh(
      new THREE.RingGeometry(2.28, 2.31, 96),
      new THREE.MeshBasicMaterial({
        color: colours.sensor,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
      }),
    );
    footprint.rotation.x = -Math.PI / 2;
    footprint.position.set(x, 0.01, z);

    scene.add(sensor, cone, footprint);
  }

  // a chair so the person has somewhere to sit
  const chairSpot = v(2, 0, 1);
  const chair = new THREE.Group();
  const chairLines = new THREE.LineBasicMaterial({ color: colours.path, transparent: true, opacity: 0.7 });

  function addChairPart(w, h, d, x, y, z) {
    const part = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)), chairLines);
    part.position.set(x, y, z);
    chair.add(part);
  }

  addChairPart(0.55, 0.06, 0.5, 0, 0.5, 0); // seat
  addChairPart(0.55, 0.5, 0.05, 0, 0.78, -0.23); // back
  for (const [x, z] of [
    [-0.24, -0.21],
    [0.24, -0.21],
    [-0.24, 0.21],
    [0.24, 0.21],
  ]) {
    addChairPart(0.03, 0.5, 0.03, x, 0.25, z); // legs
  }
  chair.position.copy(chairSpot);
  scene.add(chair);

  // ---------- the person (a cloud of points around a simple skeleton) ----------

  // [from joint, to joint, thickness]
  const bones = [
    ["hip", "chest", 0.16],
    ["chest", "head", 0.06],
    ["head", "head", 0.13],
    ["lShoulder", "lElbow", 0.05],
    ["lElbow", "lHand", 0.045],
    ["rShoulder", "rElbow", 0.05],
    ["rElbow", "rHand", 0.045],
    ["lHip", "lKnee", 0.07],
    ["lKnee", "lFoot", 0.055],
    ["rHip", "rKnee", 0.07],
    ["rKnee", "rFoot", 0.055],
    ["lShoulder", "rShoulder", 0.06],
  ];

  const POINTS = 1500;
  const boneOf = new Uint8Array(POINTS);
  const along = new Float32Array(POINTS);
  const offset = new Float32Array(POINTS * 3);

  // give thicker bones (and the head) more points
  const weights = bones.map(([a, b, r]) => (a === b ? r * 3 : r));
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);

  for (let i = 0; i < POINTS; i++) {
    let pick = Math.random() * totalWeight;
    let b = 0;
    while (pick > weights[b]) pick -= weights[b++];

    boneOf[i] = b;
    along[i] = Math.random();

    const radius = bones[b][2] * Math.sqrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    offset[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    offset[i * 3 + 1] = radius * Math.cos(phi);
    offset[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
  }

  const positions = new Float32Array(POINTS * 3);
  const cloud = new THREE.BufferGeometry();
  cloud.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  // soft round dot texture
  const dot = document.createElement("canvas");
  dot.width = dot.height = 32;
  const ctx = dot.getContext("2d");
  const glow = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  glow.addColorStop(0, "#fff");
  glow.addColorStop(0.4, "rgba(255,255,255,0.8)");
  glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 32, 32);

  scene.add(
    new THREE.Points(
      cloud,
      new THREE.PointsMaterial({
        color: colours.person,
        size: 0.05,
        map: new THREE.CanvasTexture(dot),
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    ),
  );

  // tracking box around the person, like on the real dashboard
  const trackBox = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(0.9, 1.95, 0.9)),
    new THREE.LineBasicMaterial({ color: colours.person, transparent: true, opacity: 0.6 }),
  );
  scene.add(trackBox);

  // the path they walked, drawn on the floor
  const TRAIL = 240;
  const trailPoints = new Float32Array(TRAIL * 3);
  const trail = new THREE.BufferGeometry();
  trail.setAttribute("position", new THREE.BufferAttribute(trailPoints, 3));
  scene.add(
    new THREE.Line(
      trail,
      new THREE.LineBasicMaterial({ color: colours.path, transparent: true, opacity: 0.75 }),
    ),
  );

  // ---------- poses ----------

  const joints = {};
  const target = {};
  const jointNames = [
    "hip",
    "chest",
    "head",
    "lShoulder",
    "lElbow",
    "lHand",
    "rShoulder",
    "rElbow",
    "rHand",
    "lHip",
    "lKnee",
    "lFoot",
    "rHip",
    "rKnee",
    "rFoot",
  ];
  for (const name of jointNames) joints[name] = v(0, 1, 0);

  function setPose(time, activity) {
    let hipY = 0.98 + Math.sin(time * 1.6) * 0.01; // breathing
    if (activity === "walk") hipY = 0.98 + Math.abs(Math.sin(time * 5)) * 0.035;
    if (activity === "sit") hipY = 0.56;

    target.hip = v(0, hipY, 0);
    target.chest = v(0, hipY + 0.5, activity === "sit" ? -0.04 : 0);
    target.head = v(0, hipY + 0.78, 0);

    for (const [side, dir, phase] of [
      ["l", -1, 0],
      ["r", 1, Math.PI],
    ]) {
      const shoulder = v(dir * 0.2, target.chest.y - 0.02, target.chest.z);
      let upperArm = 0.16;
      let forearm = 0.22;
      let swing = 0.02;

      if (activity === "walk") swing = Math.sin(time * 5 + phase) * 0.22;
      if (activity === "sit") {
        upperArm = 0.5;
        forearm = 1.3;
        swing = 0.18;
      }

      const elbow = v(
        shoulder.x + dir * Math.sin(upperArm) * 0.3,
        shoulder.y - Math.cos(upperArm) * 0.3,
        shoulder.z + swing,
      );
      const hand = v(
        elbow.x + dir * Math.sin(forearm) * 0.27,
        elbow.y - Math.cos(forearm) * 0.27,
        elbow.z + (activity === "sit" ? 0.18 : swing * 0.8),
      );

      const hip = v(dir * 0.11, hipY - 0.04, 0);
      let knee, foot;

      if (activity === "sit") {
        knee = v(hip.x + dir * 0.03, hip.y + 0.02, 0.44);
        foot = v(knee.x, 0.04, 0.5);
      } else if (activity === "walk") {
        const step = Math.sin(time * 5 + phase);
        knee = v(hip.x, hip.y - 0.46, step * 0.16 + 0.04);
        foot = v(knee.x, Math.max(0.04, knee.y - 0.46 + Math.max(0, step) * 0.08), step * 0.26);
      } else {
        knee = v(hip.x + dir * 0.02, hip.y - 0.47, 0.03);
        foot = v(knee.x + dir * 0.02, 0.04, 0);
      }

      target[side + "Shoulder"] = shoulder;
      target[side + "Elbow"] = elbow;
      target[side + "Hand"] = hand;
      target[side + "Hip"] = hip;
      target[side + "Knee"] = knee;
      target[side + "Foot"] = foot;
    }
  }

  // what the person does, in a loop: [activity, label, confidence, seconds]
  const routine = [
    ["walk", "walking", 0.94, 9],
    ["stand", "standing", 0.97, 3.5],
    ["sit", "sitting", 0.96, 5],
    ["stand", "standing", 0.97, 3],
  ];

  const walkLoop = (t) => v(Math.sin(t * 0.3) * 1.8 + 0.5, 0, Math.sin(t * 0.6) * 1.2);

  let step = 0;
  let stepTime = 0;
  let time = 0;
  let cameraAngle = 0;
  let facing = 0;
  const position = v(0.6, 0, 0.2);
  const temp = new THREE.Vector3();
  const turn = new THREE.Matrix4();

  for (let i = 0; i < TRAIL; i++) {
    trailPoints[i * 3] = position.x;
    trailPoints[i * 3 + 1] = 0.015;
    trailPoints[i * 3 + 2] = position.z;
  }

  function draw() {
    const [activity, label, confidence, duration] = routine[step];

    if (!reduceMotion && stepTime > duration) {
      step = (step + 1) % routine.length;
      stepTime = 0;
    }

    // walk toward wherever this activity happens
    let goal = position.clone();
    if (activity === "walk") goal = walkLoop(time);
    if (activity === "sit") goal = v(chairSpot.x, 0, chairSpot.z + 0.05);

    const toGoal = goal.clone().sub(position);
    const distance = toGoal.length();
    const moving = activity === "walk" || distance > 0.12;

    if (distance > 0.001) {
      position.add(toGoal.normalize().multiplyScalar(Math.min(distance, activity === "walk" ? 0.045 : 0.03)));
    }

    // turn smoothly toward where they're going
    let wantFacing = facing;
    if (moving && distance > 0.02) wantFacing = Math.atan2(goal.x - position.x, goal.z - position.z);
    else if (activity === "sit") wantFacing = 0;
    let diff = wantFacing - facing;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    facing += diff * 0.08;

    const shown = moving ? "walk" : activity;
    setPose(time, shown);
    for (const name of jointNames) joints[name].lerp(target[name], reduceMotion ? 1 : 0.14);

    // place every point on its bone, plus a little radar noise
    turn.makeRotationY(facing);
    const noise = reduceMotion ? 0 : 0.02;

    for (let i = 0; i < POINTS; i++) {
      const [from, to] = bones[boneOf[i]];
      temp.copy(joints[from]).lerp(joints[to], along[i]);
      temp.x += offset[i * 3];
      temp.y += offset[i * 3 + 1];
      temp.z += offset[i * 3 + 2];
      temp.applyMatrix4(turn);

      positions[i * 3] = temp.x + position.x + (Math.random() - 0.5) * noise;
      positions[i * 3 + 1] = temp.y + (Math.random() - 0.5) * noise;
      positions[i * 3 + 2] = temp.z + position.z + (Math.random() - 0.5) * noise;
    }
    cloud.attributes.position.needsUpdate = true;

    trackBox.position.set(position.x, joints.hip.y, position.z);
    trackBox.scale.y = shown === "sit" ? 0.68 : 1;
    trackBox.rotation.y = facing;

    trailPoints.copyWithin(0, 3);
    trailPoints[TRAIL * 3 - 3] = position.x;
    trailPoints[TRAIL * 3 - 2] = 0.015;
    trailPoints[TRAIL * 3 - 1] = position.z;
    trail.attributes.position.needsUpdate = true;

    // slow orbit around the room
    if (!reduceMotion) cameraAngle += 0.0011;
    const angle = cameraAngle + 0.7;
    const tilt = 0.38;
    const distanceFromRoom = 7.8;
    camera.position.set(
      lookAt.x + distanceFromRoom * Math.sin(angle) * Math.cos(tilt),
      lookAt.y + distanceFromRoom * Math.sin(tilt) + 0.5,
      lookAt.z + distanceFromRoom * Math.cos(angle) * Math.cos(tilt),
    );
    camera.lookAt(lookAt);

    renderer.render(scene, camera);

    // label above the head
    const shownLabel = moving && activity !== "walk" ? "walking" : label;
    const shownConfidence = moving && activity !== "walk" ? 0.92 : confidence;
    tag.textContent = `P1 · ${shownLabel} · ${shownConfidence.toFixed(2)}`;

    const onScreen = v(position.x, joints.head.y + 0.42, position.z).project(camera);
    tag.style.left = ((onScreen.x + 1) / 2) * canvas.clientWidth + "px";
    tag.style.top = canvas.offsetTop + ((1 - onScreen.y) / 2) * canvas.clientHeight + "px";

    if (!reduceMotion) {
      time += 0.016;
      stepTime += 0.016;
      requestAnimationFrame(draw);
    }
  }

  // keep the canvas sharp when the window size changes
  new ResizeObserver(() => {
    // on phones the text sits under the room, so centre the room instead of pushing it right
    lookAt.x = canvas.clientWidth < 900 ? 0.5 : -0.9;
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    if (reduceMotion) draw();
  }).observe(canvas);

  draw();
})();
