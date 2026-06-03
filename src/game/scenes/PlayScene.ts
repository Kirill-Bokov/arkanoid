import { Scene } from "./Scene";
import { Graphics } from "pixi.js";

export class PlayScene extends Scene {
  private background!: Graphics;

  public init(): void {
    this.background = new Graphics();

    this.background.rect(0, 0, 800, 600);
    this.background.fill("#120e33ff");

    this.container.addChild(this.background);
  }

  public update(delta: number): void {
  }

  public destroy(): void {
    this.container.removeChildren();
  }
}
