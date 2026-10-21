/**
 * Cabinet: a PLC control cabinet standing on its plinth, door swung open. On
 * the DIN rail inside sit a power supply, a CPU and four I/O cards, between a
 * cable duct above and one below. The module under the pointer slides out of
 * the rack; its neighbours ease forward less, staggered outwards. At rest the
 * CPU's run lamp is the bright mark and one I/O card sits half drawn.
 * The slider is how far a module slides, in world units.
 */
const {
  Cam, clamp, facing, fit, open, poly, prism, proj, rings, rrect, unproj, seg,
  tween, tset, tval, tdone, mk, place, pointer, put, register, disposer, solid,
} = HL;

const W = 100, D = 32, H = 150, PL = 8, T = 4, ZB = 14, ZT = 144, BACK = 4;
const MZ0 = 72, MZ1 = 102, MY0 = 6, MD = 12;
// the rack, left to right: [name, width]
const RACK = [["psu", 12], ["cpu", 11], ["io 1", 8], ["io 2", 8], ["io 3", 8], ["io 4", 8]];
const REST_OUT = [0, 0, 0, 0, 0, 0.5];
const OPEN = (118 * Math.PI) / 180;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let reach = value;
  const C = Cam(45, 0.5, 1.06);
  const dx = Math.cos(OPEN), dy = Math.sin(OPEN);
  fit(C, [[0, 0, 0], [W, 0, H + 4], [W, D, 0], [0, D, 0], [W * dx, D + W * dy, 0], [W * dx, D + W * dy, H]], 200, 168);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);
  const onFront = (pts) => pts.map(([x, z]) => P(x, D, z));
  const ring2 = (r) => r.map((q) => [q.u, q.v]);

  // plinth, body, roof cap: three solids, back to front
  const [pr, pi] = rings(3, 3, W - 3, D - 3, 3, 1.2);
  put(solid(g), prism(P, front, pr, pi, 0, PL));
  const [br, bi] = rings(0, 0, W, D, 3, 1.4);
  const body = prism(P, front, br, bi, PL, H);
  put(solid(g), body);

  // the cavity seen through the opening: its left wall, its floor, the back plate
  const hole = ring2(rrect(T, ZB, W - T, ZT, 3, 4));
  mk("path", { d: poly(onFront(hole)), class: "fo" }, g);
  mk("path", { d: poly([P(T, D, ZB), P(T, D, ZT), P(T, BACK, ZT), P(T, BACK, ZB)]), class: "lo" }, g);
  mk("path", { d: poly([P(T, D, ZB), P(W - T, D, ZB), P(W - T, BACK, ZB), P(T, BACK, ZB)]), class: "lo" }, g);
  mk("path", { d: open([P(T, BACK, ZT), P(T, BACK, ZB), P(W - T, BACK, ZB)]), class: "nf lo" }, g);

  // two slotted cable ducts and the DIN rail between them
  for (const [z0, z1] of [[110, 124], [44, 58]]) {
    const [dr, di] = rings(T + 1, BACK, 68, BACK + 9, 1.5, 1);
    put(solid(g), prism(P, front, dr, di, z0, z1));
    let slots = "";
    for (let x = T + 5; x < 66; x += 4.5) slots += seg(P(x, BACK + 9, z0 + 3), P(x, BACK + 9, z1 - 1));
    mk("path", { d: slots, class: "nf lo" }, g);
  }
  mk("path", { d: seg(P(T + 1, BACK + 1, 87), P(70, BACK + 1, 87)) + seg(P(T + 1, BACK + 1, 85), P(70, BACK + 1, 85)), class: "nf lo" }, g);

  // the modules: each its own group, so a slide only rewrites its own paths
  let x = T + 1.5;
  const mods = RACK.map(([name, w], i) => {
    const m = { name, x0: x, x1: x + w, el: solid(g), marks: mk("path", { class: "nf lo" }, g), dots: [], tw: tween(REST_OUT[i]), drawn: NaN };
    const n = name === "cpu" ? 3 : name === "psu" ? 1 : 4;
    for (let k = 0; k < n; k++) m.dots.push(mk("circle", { r: 1.1, class: name === "cpu" && k === 0 ? "dot" : "dot off" }, g));
    x += w + 1.5;
    return m;
  });

  function drawMod(m, out) {
    const y0 = MY0 + out, y1 = y0 + MD, xm = (m.x0 + m.x1) / 2;
    const [mr, mi] = rings(m.x0, y0, m.x1, y1, 1.6, 0.9);
    put(m.el, prism(P, front, mr, mi, MZ0, MZ1));
    const f = (u, z) => P(u, y1, z);
    let d = "";
    if (m.name === "psu") for (let z = MZ0 + 5; z < MZ1 - 8; z += 3) d += seg(f(m.x0 + 2.5, z), f(m.x1 - 2.5, z));
    else if (m.name === "cpu") d = poly(ring2(rrect(m.x0 + 2.5, MZ0 + 4, m.x1 - 2.5, MZ0 + 15, 1.2, 3)).map(([u, z]) => f(u, z)));
    else for (let z = MZ0 + 4; z < MZ0 + 17; z += 3.2) d += seg(f(m.x0 + 2, z), f(m.x1 - 2, z));
    m.marks.setAttribute("d", d);
    m.dots.forEach((el, k) => place(el, f(m.name === "cpu" ? m.x0 + 3.5 + k * 3.5 : xm + (m.name === "psu" ? 0 : (k - 1.5) * 2), MZ1 - 4)));
  }

  // what stands nearer than the cavity: the right flank with its louvres, the front with the opening cut out, the roof
  mk("path", { d: poly([P(W, 0, PL), P(W, D, PL), P(W, D, H), P(W, 0, H)]), class: "fo" }, g);
  for (const z of [26, 32, 38, 116, 122, 128]) mk("path", { d: poly(rrect(10, z, 30, z + 2.4, 1.2, 3).map((q) => P(W, q.u, q.v))), class: "nf lo" }, g);
  const outer = [[0, PL], [W, PL], [W, H], [0, H]];
  mk("path", { d: poly(onFront([...outer, outer[0], hole[0], ...hole.slice().reverse(), hole[0]])), class: "fo" }, g);
  mk("path", { d: poly(onFront(hole)), class: "nf" }, g);
  mk("path", { d: body.sil, class: "nf sil" }, g);
  const [cr, ci] = rings(-2, -2, W + 2, D + 2, 4, 1.2);
  put(solid(g), prism(P, front, cr, ci, H, H + 4));

  // the door: a plate on its hinge, its thickness a second line behind it
  const dw = (u, z, t = 0) => P(u * dx - t * dy, D + u * dy + t * dx, z);
  const leaf = ring2(rrect(1, 10, W - 1, H - 2, 3, 4));
  mk("path", { d: poly(leaf.map(([u, z]) => dw(u, z, -2.4))), class: "lo" }, g);
  const door = mk("path", { d: poly(leaf.map(([u, z]) => dw(u, z))), class: "sil" }, g);
  mk("path", { d: poly(ring2(rrect(14, 34, W - 14, 92, 2, 3)).map(([u, z]) => dw(u, z))), class: "nf lo" }, g);
  mk("path", { d: poly(ring2(rrect(W - 9, 70, W - 5, 90, 2, 3)).map(([u, z]) => dw(u, z))), class: "nf" }, g);

  const B = register(stage, (_dt, now) => {
    let moving = false;
    for (const m of mods) {
      const v = tval(m.tw, now);
      if (v !== m.drawn) { drawMod(m, v * reach); m.drawn = v; }
      if (!tdone(m.tw, now)) moving = true;
    }
    return moving;
  });
  bag.add(B.unregister);

  // hit: the pointer on the plane of the modules' tops, which never moves; pick by x along the rack
  function hit([sx, sy]) {
    const [wx, wy] = unproj(C, sx, sy, MZ1);
    if (wy < BACK - 4 || wy > D + 30) return -1;
    return mods.findIndex((m) => wx >= m.x0 - 1 && wx <= m.x1 + 1);
  }

  let act = -1;
  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : act;
    act = a;
    mods.forEach((m, i) => {
      const k = Math.abs(i - from);
      const to = a < 0 ? REST_OUT[i] : k === 0 ? 1 : k === 1 ? 0.4 : 0.12;
      tset(m.tw, to, now, k * 45);
      m.el.sil.classList.toggle("hi", i === a);
    });
    mods[1].dots[0].classList.toggle("m", a >= 0 && a !== 1);
    read.textContent = a < 0 ? "rest" : mods[a].name;
    B.wake();
  }

  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());
  return {
    set: (v) => { reach = clamp(v, 0, 12); mods.forEach((m) => { m.drawn = NaN; }); B.wake(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "cabinet",
  means: "A PLC cabinet, door open: the module under the pointer slides out of the rack, its neighbours easing forward less.",
  rules: [1, 2, 5, 9],
  range: [4, 8, 12],
  tour: [[150, 150], [190, 165], [220, 180], null],
  mount,
});
