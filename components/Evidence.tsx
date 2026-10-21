export type Pin = { x: number; y: number; note: string };

export function Evidence({ pages }: { pages: { src: string; page: string; pins: Pin[] }[] }) {
  let k = 0;
  const numbered = pages.map((p) => ({ ...p, pins: p.pins.map((pin) => ({ ...pin, k: ++k })) }));
  return (
    <div>
      <div className="evidence">
        {numbered.map((p) => (
          <figure key={p.src}>
            <div className="frame">
              <img src={p.src} alt={`Brochure page ${p.page}`} width={910} height={1287} loading="lazy" />
              {p.pins.map((pin) => (
                <span key={pin.k} className="pin" style={{ left: `${pin.x}%`, top: `${pin.y}%` }} aria-hidden>
                  {pin.k}
                </span>
              ))}
            </div>
            <figcaption>Brochure p.{p.page}</figcaption>
          </figure>
        ))}
      </div>
      <ol className="pin-notes">
        {numbered.flatMap((p) =>
          p.pins.map((pin) => (
            <li key={pin.k}>
              <span className="k">{pin.k}</span>
              <span>{pin.note}</span>
            </li>
          )),
        )}
      </ol>
    </div>
  );
}
