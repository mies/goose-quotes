import { css } from "hono/css";
import { render, useEffect, useState } from "hono/jsx/dom";
import { hc } from "hono/client";

import { GooseCard } from "./Goose";
import type { GetGeese } from "..";
import type { GooseSelect } from "../db/schema";

const client = hc<GetGeese>("/");

export default function Client() {
  const [geese, setGeese] = useState<Array<GooseSelect>>([]);

  useEffect(() => {
    (async () => {
      const res = await client.api.geese.$get();
      if (!res.ok) {
        console.error("Failed to fetch geese");
        return;
      }

      const geese = await res.json();

      // @ts-ignore
      setGeese(geese);
    })();
  }, []);

  return (
    <>
      <div>
        <h1>Hi from client</h1>

        <div class={containerClass}>
          {geese.map((goose) => (
            <GooseCard {...goose} />
          ))}
        </div>
      </div>
    </>
  );
}

const containerClass = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-flow: row;
  gap: 32px;
`;

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const root = document.getElementById("root")!;
render(<Client />, root);
