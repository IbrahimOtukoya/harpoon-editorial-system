/**
 * Valve: a quarter-turn isolation valve between two flanges, its lever turned
 * across the pipe to closed and locked there: a padlock through the lever's
 * end, a lock-out tag hanging from the shackle. The lock is the bright mark.
 * The pointer moving across the stage sets the tag swinging after it on a
 * spring, and the bright passes to the tag. The slider is the swing, in degrees.
 */
const {
  Cam, clamp, facing, fit, hull, open, poly, prism, proj, rad, rings, rrect, seg,
  spring, stepS, mk, place, pointer, put, register, disposer, solid,
} = HL;

const CY = 30, CZ = 40, R = 10, FR = 15;
const PIV = [100, 84, 44], REST = 9;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let reach = value;
  const C = Cam(45, 0.5, 1.95);
  fit(C, [[30, CY - R, CZ], [170, CY + R, CZ - R], [100, 88, 84], [70, 84, 0], [130, 84, 0], [30, CY, CZ + R], [170, CY, CZ - R]], 200, 166);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);
  const box = (x0, y0, x1, y1, r, b, z0, z1) => { const [o, i] = rings(x0, y0, x1, y1, r, b); const s = solid(g); put(s, prism(P, front, o, i, z0, z1)); return s; };

  // a cylinder along x: the hull of its two end circles, its near cap, and a dim seam a little inside that cap
  const circle = (x, r, n = 20) => Array.from({ length: n }, (_, k) => P(x, CY + r * Math.cos((2 * Math.PI * k) / n), CZ + r * Math.sin((2 * Math.PI * k) / n)));
  const cylX = (x0, x1, r) => {
    mk("path", { d: poly(hull(circle(x0, r).concat(circle(x1, r)))), class: "sil" }, g);
    mk("path", { d: poly(circle(x1, r)), class: "nf" }, g);
    mk("path", { d: poly(circle(x1, r - 1.6)), class: "nf lo" }, g);
  };

  // far to near along the pipe: pipe, flange, body, bonnet and stem, flange, pipe
  cylX(30, 78, R);
  cylX(78, 86, FR);
  box(86, CY - 15, 114, CY + 15, 6, 1.4, CZ - 17, CZ + 17);
  box(93, CY - 7, 107, CY + 7, 3, 1, CZ + 17, CZ + 27);
  box(98, CY - 2, 102, CY + 2, 1.2, 0.6, CZ + 27, CZ + 35);
  cylX(114, 122, FR);
  // the near flange's four bolts
  for (let k = 0; k < 4; k++) { const a = rad(45 + 90 * k); place(mk("circle", { r: 1.1, class: "dot off" }, g), P(122, CY + 11.5 * Math.cos(a), CZ + 11.5 * Math.sin(a))); }
  cylX(122, 170, R);

  // the lever, turned across the pipe: closed. Its end carries a hole for the lock.
  const lev = box(95, CY - 6, 105, 84, 3.5, 1, CZ + 35, CZ + 38);
  mk("path", { d: poly(rrect(97.5, 75, 102.5, 80, 2.5, 4).map((q) => P(q.u, q.v, CZ + 38))), class: "nf" }, g);

  // the padlock: body hanging below the lever's end, its shackle up through the hole
  const lock = box(93, 71, 107, 83, 3, 1, CZ + 8, CZ + 26);
  mk("path", { d: open([[97.5, CZ + 26], ...Array.from({ length: 9 }, (_, k) => [100 - 2.5 * Math.cos((Math.PI * k) / 8), CZ + 41 + 2.5 * Math.sin((Math.PI * k) / 8)]), [102.5, CZ + 26]].map(([x, z]) => P(x, 77.5, z))), class: "nf sil" }, g);
  mk("path", { d: poly(rrect(98.5, CZ + 14, 101.5, CZ + 19, 1.5, 3).map((q) => P(q.u, 83, q.v))), class: "nf lo" }, g);
  lock.sil.classList.add("hi");

  // the tag, a thin card hanging from the lock body on a short cord, swinging in its own plane about the cord's top
  const cord = mk("path", { class: "nf lo" }, g);
  const back = mk("path", { class: "lo" }, g), face = mk("path", { class: "sil" }, g);
  const hole = mk("path", { class: "nf" }, g), band = mk("path", { class: "nf lo" }, g);
  const card = rrect(-13, -46, 13, -8, 3, 4);
  const sw = spring(REST);
  let drawn = NaN;
  function drawTag(a) {
    const s = Math.sin(rad(a)), c = Math.cos(rad(a));
    const w = (u, v, dy = 0) => P(PIV[0] + u * c - v * s, PIV[1] + dy, PIV[2] + u * s + v * c);
    cord.setAttribute("d", open([P(PIV[0], PIV[1], CZ + 8), w(0, 0), w(0, -8)]));
    back.setAttribute("d", poly(card.map((q) => w(q.u, q.v, -1.2))));
    face.setAttribute("d", poly(card.map((q) => w(q.u, q.v))));
    hole.setAttribute("d", poly(rrect(-2, -14, 2, -10, 2, 4).map((q) => w(q.u, q.v))));
    band.setAttribute("d", seg(w(-10, -18), w(10, -18)) + seg(w(-10, -22), w(10, -22)) + seg(w(-10, -30), w(7, -30)) + seg(w(-10, -34), w(3, -34)) + seg(w(-10, -38), w(6, -38)));
  }

  const B = register(stage, (dt) => {
    const moving = stepS(sw, dt);
    if (sw.x !== drawn) { drawTag(sw.x); drawn = sw.x; }
    return moving;
  });
  bag.add(B.unregister);

  // the pointer's screen x against the pivot's sets where the tag swings to; the ground never moves, so nothing can flicker
  const px = P(PIV[0], PIV[1], PIV[2])[0];
  function move([x]) {
    sw.t = clamp((x - px) / 70, -1, 1) * reach;
    face.classList.add("hi"); lock.sil.classList.remove("hi");
    read.textContent = "tag " + (sw.t < -1 ? "left" : sw.t > 1 ? "right" : "still");
    B.wake();
  }
  function leave() {
    sw.t = REST;
    face.classList.remove("hi"); lock.sil.classList.add("hi");
    read.textContent = "rest";
    B.wake();
  }

  bag.add(pointer(stage, { move, leave }));
  bag.add(() => svg.replaceChildren());
  return {
    set: (v) => { reach = clamp(v, 0, 40); B.wake(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "valve",
  means: "An isolation valve locked closed: a padlock through its lever, a lock-out tag that swings after the pointer.",
  rules: [4, 5, 8, 9],
  range: [16, 28, 40],
  tour: [[110, 160], [300, 170], [200, 220], null],
  mount,
});
