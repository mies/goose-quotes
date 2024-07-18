import { css } from "hono/css";

type GooseFormProps = {
  handleFormSubmission: (event: Event) => void;
};

export default function GooseForm({ handleFormSubmission }: GooseFormProps) {
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
