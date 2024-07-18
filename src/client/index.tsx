import { css, Style } from "hono/css";
import { Fragment, useEffect, useState } from "hono/jsx";
import { render } from "hono/jsx/dom";
import { type Goose, GooseCard } from "./Goose";

export default function Client() {
  const [geese, setGeese] = useState<Array<Goose>>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/geese");
        const geese: Array<Goose> = await response.json();
        setGeese(geese);
      } catch (err) {
        console.error(err);
      }
    })();
  });

  return (
    <>
      <Style />
      <div class={wrapperClass}>
        <h1>Hi from client</h1>

        <div class={containerClass}>
          {geese.map((goose) => (
            <Fragment key={goose.id.toString()}>
              {/* wtf? */}
              <GooseCard {...goose} />
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

const wrapperClass = css`
  width: min(100%, 1200px);
  margin-inline: auto;
`;

const containerClass = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-flow: row;
  gap: 20px;
`;

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const root = document.getElementById("root")!;
render(<Client />, root);
