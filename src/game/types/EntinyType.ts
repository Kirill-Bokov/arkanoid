import { Rectangle } from "pixi.js";

export interface EntityType {
  update(deltaTime: number): void;
  getBounds(): Rectangle;
}
