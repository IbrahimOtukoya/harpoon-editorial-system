/**
 * Process: Harpoon's four stages as an exploded stack of plates, Diagnose at
 * the bottom and Operate at the top. Each plate carries what that stage does:
 * a field of assets with a few found (Diagnose), zones and the conduits between
 * them (Design), controls built up as blocks (Build), a gauge and a running
 * trace (Operate). One bright riser threads the stack from bottom to top. The
 * plate under the pointer opens the stack: the plates above it lift, and the
 * bright passes to it. The slider is the lift.
 */
const {
  Cam, clamp, facing, fit, open, poly, prism, proj, rings, ringAt, rrect, seg,
  tween, tset, tval, tdone, mk, place, pointer, put, register, disposer, solid,
} = HL;

const S = 110, T = 4, G = 54;
const NAMES = ["diagnose", "design", "build", "operate"];
const base = (i) => i * G;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let reach = value;
  const C = Cam(45, 0.5, 1.08);
  fit(C, [[0, 0, -T], [S, 0, -T], [S, S, -T], [0, S, -T], [0, 0, base(3) + 18], [S, S, base(3) + 18]], 200, 166);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);
  const line = (G0, d, cls) => mk("path", { d, class: cls }, G0);
  const onTop = (z) => (r) => ringAt(P, r, z);

  const kit = [
    (G0, z) => { // diagnose: a field of assets, three found, one lens over them
      for (let a = 0; a < 7; a++) for (let b = 0; b < 7; b++) {
        const found = (a === 4 && b === 2) || (a === 5 && b === 3) || (a === 5 && b === 2);
        place(mk("circle", { r: found ? 1.4 : 1, class: found ? "dot m" : "dot off" }, G0), P(19 + a * 12, 19 + b * 12, z));
      }
      line(G0, poly(onTop(z)(rrect(57, 31, 89, 63, 16, 12))), "nf");
      line(G0, seg(P(84, 59, z), P(98, 73, z)), "nf");
    },
    (G0, z) => { // design: three zones and the conduits that join them
      const zones = [[14, 14, 50, 50], [62, 14, 96, 44], [24, 62, 96, 96]];
      for (const [x0, y0, x1, y1] of zones) {
        line(G0, poly(onTop(z)(rrect(x0, y0, x1, y1, 5, 5))), "nf");
        line(G0, poly(onTop(z)(rrect(x0 + 3, y0 + 3, x1 - 3, y1 - 3, 3, 5))), "nf lo");
      }
      line(G0, seg(P(50, 30, z), P(62, 30, z)) + seg(P(36, 50, z), P(36, 62, z)) + seg(P(80, 44, z), P(80, 62, z)), "nf");
    },
    (G0, z) => { // build: controls built up in rows, one still going in
      for (let a = 0; a < 4; a++) for (let b = 0; b < 3; b++) {
        const x0 = 16 + a * 21, y0 = 20 + b * 26, h = a === 3 && b === 2 ? 3 : 8;
        const [o, i] = rings(x0, y0, x0 + 15, y0 + 18, 2, 1);
        put(solid(G0), prism(P, front, o, i, z, z + h));
      }
    },
    (G0, z) => { // operate: a gauge and a running trace
      const [o, i] = rings(18, 18, 50, 50, 16, 1.2);
      put(solid(G0), prism(P, front, o, i, z, z + 3));
      line(G0, poly(onTop(z + 3)(rrect(25, 25, 43, 43, 9, 10))), "nf lo");
      line(G0, seg(P(34, 34, z + 3), P(41, 27, z + 3)), "nf");
      const tr = [[14, 84], [30, 84], [38, 70], [46, 96], [54, 76], [62, 84], [96, 84]];
      line(G0, open(tr.map(([x, y]) => P(x, y, z))), "nf");
      line(G0, seg(P(62, 72, z), P(96, 72, z)) + seg(P(62, 96, z), P(96, 96, z)), "nf lo");
    },
  ];

  const plates = NAMES.map((name, i) => ({ name, i, g: mk("g", {}, g), tw: tween(0), drawn: NaN, lift: 0 }));
  const [po, pi] = rings(0, 0, S, S, 5, 1.6);

  function draw(p) {
    const z = base(p.i) + p.lift;
    p.g.replaceChildren();
    // the riser from the plate below, at the near corner, painted before this plate so the plate covers its top
    if (p.i > 0) p.riser = line(p.g, seg(P(S - 9, S - 9, base(p.i - 1) + plates[p.i - 1].lift), P(S - 9, S - 9, z - T)), act < 0 ? "nf hi" : "nf lo");
    const s = solid(p.g);
    put(s, prism(P, front, po, pi, z - T, z));
    s.sil.classList.toggle("hi", p.i === act);
    kit[p.i](p.g, z);
  }

  let act = -1;
  const B = register(stage, (_dt, now) => {
    let moving = false;
    for (const p of plates) { p.lift = tval(p.tw, now) * reach; if (!tdone(p.tw, now)) moving = true; }
    for (const p of plates) { const key = p.lift + ":" + act; if (key !== p.drawn) { draw(p); p.drawn = key; } }
    return moving;
  });
  bag.add(B.unregister);

  // hit: the plate whose resting middle is nearest the pointer's height on screen, inside the stack's width
  const mids = plates.map((p) => P(S / 2, S / 2, base(p.i))[1]);
  const xs = [P(0, S, 0)[0], P(S, 0, 0)[0]];
  function hit([sx, sy]) {
    if (sx < xs[0] - 4 || sx > xs[1] + 4) return -1;
    let best = -1, d = 1e9;
    mids.forEach((y, i) => { const e = Math.abs(sy - y); if (e < d) { d = e; best = i; } });
    return d < 44 ? best : -1;
  }

  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : act;
    act = a;
    plates.forEach((p, i) => tset(p.tw, a >= 0 && i > a ? 1 : 0, now, Math.abs(i - from) * 45));
    read.textContent = a < 0 ? "rest" : NAMES[a];
    B.wake();
  }

  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());
  return {
    set: (v) => { reach = clamp(v, 0, 20); plates.forEach((p) => { p.drawn = NaN; }); B.wake(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "process",
  means: "Diagnose, design, build, operate as an exploded stack, one bright riser through it: the plate under the pointer opens it.",
  rules: [2, 4, 5, 9],
  range: [8, 14, 20],
  tour: [[200, 250], [200, 180], [200, 110], null],
  mount,
});
