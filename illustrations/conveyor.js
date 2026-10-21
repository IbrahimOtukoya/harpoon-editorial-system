/**
 * Conveyor: a belt conveyor on three pairs of legs, a drum at each end, guard
 * rails either side, carrying four cartons of different sizes. The carton
 * under the pointer lifts off the belt; its neighbours slide along the belt to
 * make room, less the further they are, staggered outwards. At rest the
 * photo-eye on the near rail is the bright mark. The slider is the lift, in
 * world units.
 */
const {
  Cam, circ, clamp, facing, fit, poly, prism, proj, rings, seg,
  tween, tset, tval, tdone, mk, place, pointer, put, register, disposer, solid,
} = HL;

const L = 190, W = 40, H = 46, BED = 10, RAIL = 5, RT = 2.4, DR = 5;
// the cartons, far to near along the belt: [x0, length, width, height]
const BOX = [[14, 30, 24, 22], [56, 24, 22, 16], [92, 32, 26, 26], [140, 26, 22, 18]];
const LEGS = [14, L / 2, L - 14];
const EYE = 124;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let reach = value;
  const C = Cam(45, 0.5, 1.45);
  fit(C, [[0, 0, 0], [L, 0, H + RAIL], [L, W, 0], [0, W, 0], [92, 7, H + 26 + 18]], 200, 166);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);
  const slab = (x0, y0, x1, y1, r, b, z0, z1) => { const [o, i] = rings(x0, y0, x1, y1, r, b); put(solid(g), prism(P, front, o, i, z0, z1)); };

  // the foot ties first, so the legs stand in front of them; then the legs; then the bed, which hides their tops
  let ties = seg(P(LEGS[0], W - 5, 14), P(LEGS[2], W - 5, 14));
  for (const x of LEGS) ties += seg(P(x, 5, 9), P(x, W - 5, 9));
  mk("path", { d: ties, class: "nf lo" }, g);
  for (const x of LEGS) {
    slab(x - 2, 3, x + 2, 7, 1, 0.6, 0, H - BED);
    slab(x - 2, W - 7, x + 2, W - 3, 1, 0.6, 0, H - BED);
  }
  slab(0, 0, L, W, 4, 1.4, H - BED, H);

  // the drums, seen end-on in the near face, and the belt's seams over the bed
  for (const x of [DR + 1, L - DR - 1]) {
    mk("path", { d: poly(circ(DR - 0.8, 14).map((q) => P(x + q.u, W, H - BED / 2 + q.v))), class: "nf" }, g);
    place(mk("circle", { r: 0.9, class: "dot off" }, g), P(x, W, H - BED / 2));
  }
  let seams = "";
  for (let x = 20; x < L - 8; x += 18) seams += seg(P(x, RT + 1, H), P(x, W - RT - 1, H));
  mk("path", { d: seams, class: "nf lo" }, g);

  // the far rail, then the cartons, then the near rail with its photo-eye
  slab(1, 1, L - 1, 1 + RT, 1, 0.5, H, H + RAIL);
  const boxes = BOX.map(([x0, l, w, h], i) => {
    return { i, x0, l, w, h, el: solid(g), tape: mk("path", { class: "nf lo" }, g), up: tween(0), dx: tween(0), drawn: "" };
  });
  slab(1, W - 1 - RT, L - 1, W - 1, 1, 0.5, H, H + RAIL);
  slab(EYE - 2, W - 1 - RT, EYE + 2, W - 1, 1, 0.5, H + RAIL, H + RAIL + 6);
  const eye = mk("circle", { r: 1.2, class: "dot" }, g);
  place(eye, P(EYE, W - 1, H + RAIL + 3.5));

  function drawBox(b, up, dx) {
    const y0 = (W - b.w) / 2, x0 = b.x0 + dx, z0 = H + up, z1 = z0 + b.h;
    const [o, i] = rings(x0, y0, x0 + b.l, y0 + b.w, 1.6, 1);
    put(b.el, prism(P, front, o, i, z0, z1));
    b.tape.setAttribute("d", seg(P(x0 + 2.5, W / 2, z1), P(x0 + b.l - 2.5, W / 2, z1)) + seg(P(x0 + b.l / 2, y0 + 2.5, z1), P(x0 + b.l / 2, y0 + b.w - 2.5, z1)));
  }

  const B = register(stage, (_dt, now) => {
    let moving = false;
    for (const b of boxes) {
      const up = tval(b.up, now) * reach, dx = tval(b.dx, now), key = up + "," + dx;
      if (key !== b.drawn) { drawBox(b, up, dx); b.drawn = key; }
      if (!tdone(b.up, now) || !tdone(b.dx, now)) moving = true;
    }
    return moving;
  });
  bag.add(B.unregister);

  // hit: a single row, so the carton whose resting centre is nearest the pointer's screen x, inside a band over the belt
  const centres = boxes.map((b) => P(b.x0 + b.l / 2, W / 2, H + b.h / 2));
  function hit([sx, sy]) {
    let best = -1, d = 1e9;
    centres.forEach(([cx, cy], i) => { const e = Math.abs(sx - cx); if (e < d && Math.abs(sy - cy) < 46) { d = e; best = i; } });
    return d < 30 ? best : -1;
  }

  let act = -1;
  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : act;
    act = a;
    boxes.forEach((b, i) => {
      const k = Math.abs(i - from), side = Math.sign(i - a);
      const dx = a < 0 || k === 0 ? 0 : side * (k === 1 ? 5 : 2);
      tset(b.up, a === i ? 1 : 0, now, k * 45);
      tset(b.dx, clamp(dx, -b.x0 + 4, L - 4 - b.x0 - b.l), now, k * 45);
      b.el.sil.classList.toggle("hi", i === a);
    });
    eye.classList.toggle("m", a >= 0);
    read.textContent = a < 0 ? "rest" : "carton " + (a + 1);
    B.wake();
  }

  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());
  return {
    set: (v) => { reach = clamp(v, 0, 18); boxes.forEach((b) => { b.drawn = ""; }); B.wake(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "conveyor",
  means: "A belt conveyor carrying cartons: the one under the pointer lifts off the belt while its neighbours slide along to make room.",
  rules: [1, 2, 5, 9],
  range: [6, 12, 18],
  tour: [[150, 150], [205, 170], [250, 195], null],
  mount,
});
