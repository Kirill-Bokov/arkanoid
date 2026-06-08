export interface CollisionResult {
  collided: boolean;

  normalX?: number;
  normalY?: number;

  hitPoint?: number; 
  target?: unknown;
}

export type BrickType =
  | "empty"
  | "normal"
  | "strong"
  | "very_strong"
  | "unbreakable";

export interface LevelSchema {
  rows: number;
  cols: number;
  offsetY: number;
  grid: BrickType[][];
}

export interface LayoutMetrics {
  brickWidth: number;
  brickHeight: number;

  paddleWidth: number;
  paddleHeight: number;

  ballRadius: number;
}