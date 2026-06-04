import { Container } from "pixi.js";
import type { SceneType } from "../types/SceneType";

export abstract class Scene implements SceneType {
  public readonly container = new Container();

  abstract init(): void;
  abstract update(deltaTime: number): void;
  abstract destroy(): void;
}
