import type { Brick } from "../entities/Brick";


export type BrickCollision = {
  collided: boolean;
  brick?: Brick;
};

export type PaddleCollision = {
  collided: boolean;
  hitPoint?: number;
};