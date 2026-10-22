/**
 * Plant: a cutaway of a small plant on its floor slab. A control room, two PLC
 * cabinets, a tank fed by a pipe rack, and a conveyor line. One bright line
 * runs along the floor from the control room past the cabinets to the line:
 * the control network. The part under the pointer lifts out of the slab, and
 * the network gives its bright up to it. The slider is the lift.
 */
const {
  Cam, clamp, facing, fit, hull, open, poly, prism, proj, rings, ringAt, rrect, run, seg, unproj,
  tween, tset, tval, tdone, mk, place, pointer, put, register, disposer, solid,
} = HL;

const FX = 220, FY = 150;
const NET = [[64, 42], [76, 42], [76, 36], [132, 36], [132, 96], [96, 96], [96, 110]];

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let reach = value;
  const C = Cam(45, 0.5, 1.3);
  fit(C, [[0, 0, -5], [FX, 0, 0], [FX, FY, -5], [0, FY, -5], [176, 36, 52 + 20], [37, 34, 46 + 20]], 200, 170);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);

  // the slab, then the network on the floor, so every part stands on it
  const [fr, fi] = rings(0, 0, FX, FY, 5, 1.6);
  put(solid(g), prism(P, front, fr, fi, -5, 0));
  const net = mk("path", { d: open(NET.map(([x, y]) => P(x, y, 0))), class: "nf hi" }, g);
  const ends = [NET[0], NET[NET.length - 1]].map(([x, y]) => { const d = mk("circle", { r: 1.3, class: "dot m" }, g); place(d, P(x, y, 0)); return d; });

  // each part draws itself into its own group at a lift dz
  const box = (G, x0, y0, x1, y1, r, b, z0, z1) => { const [o, i] = rings(x0, y0, x1, y1, r, b); const s = solid(G); put(s, prism(P, front, o, i, z0, z1)); return s; };
  const line = (G, d, cls) => mk("path", { d, class: cls }, G);
  const parts = [
    { name: "control room", x: [10, 64], y: [10, 58], top: 46, draw(G, z) {
      const s = box(G, 10, 10, 64, 58, 3, 1.4, z, z + 46);
      line(G, poly(rrect(16, z + 26, 58, z + 38, 2, 3).map((q) => P(q.u, 58, q.v))), "nf");
      for (const x of [26.5, 37, 47.5]) line(G, seg(P(x, 58, z + 26.5), P(x, 58, z + 37.5)), "nf lo");
      line(G, poly(rrect(18, z, 28, z + 18, 1.5, 3).map((q) => P(64, q.u, q.v))), "nf lo");
      return s;
    } },
    { name: "plc cabinets", x: [84, 120], y: [12, 28], top: 40, draw(G, z) {
      let s;
      for (const x0 of [84, 104]) {
        s = box(G, x0, 12, x0 + 16, 28, 1.5, 0.8, z, z + 40);
        line(G, poly(rrect(x0 + 2, z + 4, x0 + 14, z + 37, 1.2, 3).map((q) => P(q.u, 28, q.v))), "nf lo");
        line(G, seg(P(x0 + 12, 28, z + 18), P(x0 + 12, 28, z + 24)), "nf");
      }
      return s;
    } },
    { name: "pipe rack", x: [166, 186], y: [56, 132], top: 28, draw(G, z) {
      for (const y of [64, 124]) for (const x of [168, 184]) box(G, x - 1.5, y - 1.5, x + 1.5, y + 1.5, 0.8, 0.5, z, z + 22);
      for (const y of [64, 124]) box(G, 166, y - 1.5, 186, y + 1.5, 0.8, 0.5, z + 19, z + 22);
      box(G, 168, 56, 173, 132, 2.4, 0.8, z + 22, z + 27);
      return box(G, 176, 56, 181, 132, 2.4, 0.8, z + 22, z + 27);
    } },
    { name: "tank", x: [158, 194], y: [18, 54], top: 52, draw(G, z) {
      const o = rrect(158, 18, 194, 54, 18, 14), i = rrect(160, 20, 192, 52, 16, 14);
      const s = solid(G);
      put(s, { sil: poly(hull(ringAt(P, o, z).concat(ringAt(P, o, z + 52)))), crease: open(ringAt(P, run(i, front), z + 52)) });
      for (const h of [16, 34]) line(G, open(ringAt(P, run(o, front), z + h)), "nf lo");
      return s;
    } },
    { name: "conveyor", x: [36, 150], y: [112, 136], top: 32, draw(G, z) {
      for (const x of [46, 93, 140]) { box(G, x - 1.5, 114, x + 1.5, 117, 0.8, 0.5, z, z + 14); box(G, x - 1.5, 131, x + 1.5, 134, 0.8, 0.5, z, z + 14); }
      const s = box(G, 36, 112, 150, 136, 3, 1.2, z + 14, z + 20);
      let seams = ""; for (let x = 50; x < 146; x += 16) seams += seg(P(x, 114, z + 20), P(x, 134, z + 20));
      line(G, seams, "nf lo");
      for (const [x0, l, h] of [[48, 22, 12], [86, 18, 10], [116, 24, 14]]) {
        box(G, x0, 116, x0 + l, 132, 1.4, 0.8, z + 20, z + 20 + h);
        line(G, seg(P(x0 + 2, 124, z + 20 + h), P(x0 + l - 2, 124, z + 20 + h)), "nf lo");
      }
      return s;
    } },
  ];
  for (const p of parts) { p.g = mk("g", {}, g); p.tw = tween(0); p.drawn = NaN; }

  const B = register(stage, (_dt, now) => {
    let moving = false;
    parts.forEach((p) => {
      const z = tval(p.tw, now) * reach;
      if (z !== p.drawn) { p.g.replaceChildren(); p.sil = p.draw(p.g, z).sil; p.sil.classList.toggle("hi", !!p.on); p.drawn = z; }
      if (!tdone(p.tw, now)) moving = true;
    });
    return moving;
  });
  bag.add(B.unregister);

  // hit: each part's rest top, on its own plane; the part whose footprint holds the pointer, the nearest one winning
  function hit([sx, sy]) {
    let best = -1;
    parts.forEach((p, i) => {
      const inside = ([x, y]) => x >= p.x[0] - 2 && x <= p.x[1] + 2 && y >= p.y[0] - 2 && y <= p.y[1] + 2;
      if ([0, p.top / 2, p.top].some((h) => inside(unproj(C, sx, sy, h)))) best = i;
    });
    return best;
  }

  let act = -1;
  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : act;
    act = a;
    parts.forEach((p, i) => {
      p.on = i === a;
      tset(p.tw, i === a ? 1 : 0, now, Math.abs(i - from) * 40);
      p.drawn = NaN;
    });
    net.classList.toggle("hi", a < 0); net.classList.toggle("lo", a >= 0);
    ends.forEach((d) => d.classList.toggle("off", a >= 0));
    read.textContent = a < 0 ? "rest" : parts[a].name;
    B.wake();
  }

  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());
  return {
    set: (v) => { reach = clamp(v, 0, 20); parts.forEach((p) => { p.drawn = NaN; }); B.wake(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "plant",
  means: "A plant in cutaway, its control network traced along the floor: the part under the pointer lifts out of the slab.",
  rules: [1, 4, 6, 9],
  range: [8, 14, 20],
  tour: [[150, 120], [215, 105], [240, 200], null],
  mount,
});
