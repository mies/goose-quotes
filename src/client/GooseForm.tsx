import { css } from "hono/css";
import { hc } from "hono/client";

import type { AddGoose } from "..";

const client = hc<AddGoose>("/");

export default function GooseForm() {
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

    await client.api.geese.$post({ json: { name } });
  };

  return (
    <form class={formClass} onSubmit={handleFormSubmission}>
      <label>
        Name
        <input type="text" name="name" />
      </label>
      <button type="submit">Add goose</button>
    </form>
  );
}

const formClass = css`
  max-width: 400px;
  label {
    display: grid;
  }
`;
