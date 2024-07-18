import { css } from "hono/css";

import type { GooseSelect } from "../db/schema";

export function GooseCard({
  name,
  location,
  motivations,
  programmingLanguage,
  imageUrl,
}: GooseSelect) {
  return (
    <div class={cardContainerClass}>
      <figure class={figureClass}>
        <img
          src={
            imageUrl ??
            "https://github.com/fiberplane/honc-template/raw/main/honc.png"
          }
          alt=""
        />
      </figure>

      <div class={contentClass}>
        <h4>{name}</h4>
        <p>{location}</p>

        <p>{motivations}</p>
        <p>{programmingLanguage}</p>
      </div>
    </div>
  );
}

const cardContainerClass = css`
  display: grid;
  grid: auto / 100px 1fr;
  grid-column-gap: 8px;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 8px;
`;

const figureClass = css`
  margin: 0;

  img {
    height: 100px;
    width: 100px;
    object-fit: cover;
  }
`;

const contentClass = css`
  display: grid;

  > * {
    margin: 0;
    line-height: 1;
  }

  p {
    font-size: 0.8rem;
  }
`;
