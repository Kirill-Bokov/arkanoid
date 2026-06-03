import { Rectangle } from "pixi.js";

export interface EntityType {
  update(delta: number): void;
  getBounds(): Rectangle;
}
