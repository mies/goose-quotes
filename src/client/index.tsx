import { css } from "hono/css";
import { render, useEffect, useState } from "hono/jsx/dom";
import { hc } from "hono/client";

import { GooseCard } from "./Goose";
import type { AddGoose, GetGeese } from "..";
import type { GooseSelect } from "../db/schema";
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
      <h1>Hi from client</h1>

      <div class={containerClass}>
        {geese.map((goose) => (
          // biome-ignore lint/correctness/useJsxKeyInIterable: silly
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

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const root = document.getElementById("root")!;
render(<Client />, root);
