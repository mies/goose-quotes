import { css } from "hono/css";

export type Goose = {
  name: string;
  id: number;
  isFlockLeader?: boolean;
  programmingLanguage?: string;
  motivations?: string;
  location?: string;
};

export function GooseCard({
  name,
  id,
  isFlockLeader,
  location,
  motivations,
  programmingLanguage,
}: Goose) {
  return (
    <div class={cardContainerClass}>
      <figure class={figureClass}>
        <img src="https://placedog.net/100" alt="" />
      </figure>

      <div class={contentClass}>
        <h3>{name}</h3>
        <p>{location}</p>

        <p>{motivations}</p>
        <p>{programmingLanguage}</p>
      </div>
    </div>
  );
}

const figureClass = css`
  margin: 0;

  img {
    height: 100px;
    width: 100px;
    object-fit: cover;
  }
`;

const cardContainerClass = css`
  display: grid;
  grid:  auto /100px 1fr;
`;

const contentClass = css`
  display: grid;

  p {
    margin: 0;
  }
`;
