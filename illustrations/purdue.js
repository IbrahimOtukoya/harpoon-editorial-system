/**
 * Purdue: the Purdue model as a building of four floors. Field devices on the
 * ground floor, controllers above them, SCADA workstations above those, and
 * enterprise servers at the top. A wider gap sits between SCADA and enterprise,
 * and in it the one bright line: the boundary between OT and IT. The floor
 * under the pointer opens the stack there; the floors above it lift, less the
 * further they are, and the bright passes to it. The slider is the lift.
 */
const {
  Cam, clamp, facing, fit, open, poly, prism, proj, rings, ringAt, rrect, run, seg,
  tween, tset, tval, tdone, mk, place, pointer, put, register, disposer, solid,
} = HL;

const FX = 130, FY = 76, T = 3, G = 40, DMZ = 18;
const NAMES = ["field devices", "controllers", "scada", "enterprise"];
const base = (i) => i * G + (i > 2 ? DMZ : 0);

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let reach = value;
  const C = Cam(45, 0.5, 1.2);
  fit(C, [[-8, -8, 0], [FX + 8, -8, 0], [FX + 8, FY + 8, -T], [-8, FY + 8, -T], [0, 0, base(3) + 26 + 18], [FX, FY, base(3) + 18]], 200, 162);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);

  const box = (G0, x0, y0, x1, y1, r, b, z0, z1) => { const [o, i] = rings(x0, y0, x1, y1, r, b); const s = solid(G0); put(s, prism(P, front, o, i, z0, z1)); return s; };
  const line = (G0, d, cls) => mk("path", { d, class: cls }, G0);
  const dot = (G0, pt, cls) => place(mk("circle", { r: 1, class: cls }, G0), pt);

  // what stands on each floor, drawn at the floor's height z, back to front
  const kit = [
    (G0, z) => { // field devices: transmitters on stalks and two valves
      for (const [x, y] of [[18, 48], [44, 62], [66, 50], [88, 64], [104, 46], [118, 60]]) {
        box(G0, x - 1, y - 1, x + 1, y + 1, 0.5, 0.3, z, z + 9);
        const o = rrect(x - 4.5, y - 4.5, x + 4.5, y + 4.5, 4.5, 10), i = rrect(x - 3.5, y - 3.5, x + 3.5, y + 3.5, 3.5, 10);
        put(solid(G0), prism(P, front, o, i, z + 9, z + 14));
        dot(G0, P(x, y + 4.5, z + 11.5), "dot off");
      }
    },
    (G0, z) => { // controllers: a rack of PLCs on a backplate
      box(G0, 16, 46, 114, 51, 1.5, 0.8, z, z + 20);
      for (let k = 0; k < 6; k++) { const x0 = 22 + k * 15; box(G0, x0, 51, x0 + 11, 63, 1.4, 0.8, z + 3, z + 17); dot(G0, P(x0 + 3, 63, z + 13), k === 0 ? "dot m" : "dot off"); }
    },
    (G0, z) => { // scada: two desks with monitors
      for (const x0 of [18, 74]) {
        box(G0, x0, 46, x0 + 40, 64, 2, 1, z + 8, z + 11);
        for (const x of [x0 + 3, x0 + 35]) box(G0, x, 48, x + 2, 62, 0.8, 0.4, z, z + 8);
        line(G0, poly(rrect(x0 + 6, z + 12, x0 + 34, z + 23, 1.5, 3).map((q) => P(q.u, 51, q.v))), "");
        line(G0, poly(rrect(x0 + 8, z + 14, x0 + 32, z + 21, 1, 3).map((q) => P(q.u, 51, q.v))), "nf lo");
      }
    },
    (G0, z) => { // enterprise: three server racks
      for (const x0 of [24, 54, 84]) {
        box(G0, x0, 20, x0 + 22, 40, 1.8, 1, z, z + 26);
        let v = ""; for (let h = 5; h < 24; h += 4) v += seg(P(x0 + 3, 40, z + h), P(x0 + 19, 40, z + h));
        line(G0, v, "nf lo");
      }
    },
  ];

  // floors bottom to top; each gap's riser and, in the wide gap, the boundary
  const floors = NAMES.map((name, i) => ({ name, i, g: mk("g", {}, g), tw: tween(0), drawn: NaN }));
  const boundary = mk("path", { class: "nf hi" }, g);
  g.insertBefore(boundary, floors[3].g);
  const [fo, fi] = rings(0, 0, FX, FY, 4, 1.4);
  const bring = rrect(-8, -8, FX + 8, FY + 8, 8, 6);

  function drawFloor(f, lift) {
    const z = base(f.i) + lift;
    f.g.replaceChildren();
    // the riser up from the floor below, at the near right corner, behind this floor's slab
    if (f.i > 0) line(f.g, seg(P(FX - 8, FY - 8, base(f.i - 1) + (floors[f.i - 1].lift || 0)), P(FX - 8, FY - 8, z - T)), "nf lo");
    f.slab = solid(f.g);
    put(f.slab, prism(P, front, fo, fi, z - T, z));
    f.slab.sil.classList.toggle("hi", !!f.on);
    kit[f.i](f.g, z);
    if (f.i === 3) boundary.setAttribute("d", poly(ringAt(P, bring, z - T - 7)));
  }

  const B = register(stage, (_dt, now) => {
    let moving = false;
    floors.forEach((f) => {
      f.lift = tval(f.tw, now) * reach;
      if (!tdone(f.tw, now)) moving = true;
    });
    floors.forEach((f) => { const key = f.lift + (f.on ? "h" : ""); if (key !== f.drawn) { drawFloor(f, f.lift); f.drawn = key; } });
    return moving;
  });
  bag.add(B.unregister);

  // hit: the floor whose resting top, at the slab's middle, is nearest the pointer's height on screen, inside the slab's width
  const tops = floors.map((f) => P(FX / 2, FY / 2, base(f.i) + 12)[1]);
  const xs = [P(0, FY, 0)[0], P(FX, 0, 0)[0]];
  function hit([sx, sy]) {
    if (sx < xs[0] - 6 || sx > xs[1] + 6) return -1;
    let best = -1, d = 1e9;
    tops.forEach((y, i) => { const e = Math.abs(sy - y); if (e < d) { d = e; best = i; } });
    return d < 40 ? best : -1;
  }

  let act = -1;
  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : act;
    act = a;
    floors.forEach((f, i) => {
      const k = i - a;
      f.on = i === a;
      tset(f.tw, a < 0 || k <= 0 ? 0 : 1, now, Math.abs(i - from) * 45);
      f.drawn = NaN;
    });
    boundary.classList.toggle("hi", a < 0); boundary.classList.toggle("lo", a >= 0);
    read.textContent = a < 0 ? "rest" : "level " + a + " · " + NAMES[a];
    B.wake();
  }

  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());
  return {
    set: (v) => { reach = clamp(v, 0, 18); floors.forEach((f) => { f.drawn = NaN; }); B.wake(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "purdue",
  means: "The Purdue model as four floors, the OT/IT boundary bright between them: the floor under the pointer opens the stack.",
  rules: [2, 4, 5, 9],
  range: [8, 13, 18],
  tour: [[200, 230], [200, 180], [200, 110], null],
  mount,
});
