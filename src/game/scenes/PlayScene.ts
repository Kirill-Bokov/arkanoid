import { Scene } from "./Scene";
import { Graphics } from "pixi.js";
import { Paddle } from "../entities/Paddle";
import { PADDLE_HEIGHT, PADDLE_WIDTH } from "../GameConfig";

export class PlayScene extends Scene {
  private background!: Graphics;
  private paddle: Paddle;
  public init(): void {
    this.background = new Graphics();

    this.background.rect(0, 0, 800, 600);
    this.background.fill("#120e33ff");

    this.container.addChild(this.background);
    this.paddle = new Paddle(
      340,
      550,
      PADDLE_WIDTH,
      PADDLE_HEIGHT
    );

    this.container.addChild(
      this.paddle.view
    );
  }
private direction = 1;
  public update(deltaTime: number): void {
  this.paddle.moveTo(
    this.paddle.x + 4 * this.direction * deltaTime
  );

  if (this.paddle.x > 680) {
    this.direction = -1;
  }

  if (this.paddle.x < 0) {
    this.direction = 1;
  }
}

  public destroy(): void {
    this.container.removeChildren();
  }
}
