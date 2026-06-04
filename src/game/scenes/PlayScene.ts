import { Scene } from "./Scene";
import { Graphics } from "pixi.js";
import { Paddle } from "../entities/Paddle";
import { PADDLE_HEIGHT, PADDLE_WIDTH, GAME_WIDTH, GAME_HEIGHT } from "../GameConfig";

export class PlayScene extends Scene {
  private background: Graphics;
  private paddle: Paddle;

  public init(): void {
    this.background = new Graphics();

    this.background.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    this.background.fill("#120e33ff");

    this.container.addChild(this.background);

    this.paddle = new Paddle(
      GAME_WIDTH / 2 - PADDLE_WIDTH / 2,
      GAME_HEIGHT - 50,
      PADDLE_WIDTH,
      PADDLE_HEIGHT
    );

    this.container.addChild(this.paddle.view);
  }

   public update(deltaTime: number): void {
    const mouseX = this.input.getMouseX();

    this.paddle.moveTo(mouseX - PADDLE_WIDTH / 2);
   }

  public destroy(): void {
    this.container.removeChildren();
  }
}