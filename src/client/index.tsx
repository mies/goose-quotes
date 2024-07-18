import { hc } from "hono/client";
import { css } from "hono/css";
import { render, useEffect, useState } from "hono/jsx/dom";

import type { AddGoose, GetGeese } from "..";
import type { GooseSelect } from "../db/schema";
import { GooseCard } from "./Goose";
import GooseForm from "./GooseForm";

const getClient = hc<GetGeese>("/");
const postClient = hc<AddGoose>("/");

export default function Client() {
  const [geese, setGeese] = useState<Array<GooseSelect>>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getClient.api.geese.$get();
      if (!res.ok) {
        console.error("Failed to fetch geese");
        return;
      }

      const geese = await res.json();

      // @ts-ignore the geese date entries don't match Date/string
      setGeese(geese);
    })();
  }, []);

  const handleFormSubmission = async (event: Event) => {
    event.preventDefault();
    const target = event.target;
    if (!(target instanceof HTMLFormElement)) {
      return;
    }

    const formData = new FormData(target);
    const name = formData.get("name");
    if (typeof name !== "string") {
      return;
    }

    const res = await postClient.api.geese.$post({ json: { name } });
    if (!res.ok) {
      console.error("Failed to add goose");
      return;
    }

    const goose = await res.json();
    // @ts-ignore the geese date entries don't match Date/string
    setGeese((geese) => [...geese, goose]);
    setShowAddForm(false);
  };

  return (
    <main>
      {showAddForm ? (
        <GooseForm handleFormSubmission={handleFormSubmission} />
      ) : (
        <button type="button" onClick={() => setShowAddForm((s) => !s)}>
          Add goose
        </button>
      )}
      <h1>Silly geese</h1>

      <div class={containerClass}>
        {geese.map((goose) => (
          // biome-ignore lint/correctness/useJsxKeyInIterable: Ho... no
          <GooseCard {...goose} />
        ))}
      </div>
    </main>
  );
}

const containerClass = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-flow: row;
  gap: 32px;
`;

/* biome-ignore lint/style/noNonNullAssertion: Biome doesn't know we've been
amazing and actually added an element with the "root" id */
const root = document.getElementById("root")!;
render(<Client />, root);
