import { css } from "hono/css";

import type { GooseSelect } from "../db/schema";

export function GooseCard({
  name,
  location,
  motivations,
  programmingLanguage,
  imageUrl,
  isFlockLeader,
}: GooseSelect) {
  return (
    <div class={cardContainerClass}>
      {isFlockLeader && <div class={flockLeaderBadge}>flock leader</div>}

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
  border-radius: 8px;
  padding: 8px;
  position: relative;
`;

const flockLeaderBadge = css`
  position: absolute;
  right: 4px;
  top: 4px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 1px solid var(--accent);
  border-radius: 9999px;
  line-height: 1;
  padding: .5em .75em;
  font-family: var(--mono-font);
  font-size: 0.8rem;
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
