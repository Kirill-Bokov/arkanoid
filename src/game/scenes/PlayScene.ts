import { Scene } from "./Scene";
import { Graphics } from "pixi.js";
import { Paddle } from "../entities/Paddle";
import { PADDLE_HEIGHT, PADDLE_WIDTH, GAME_WIDTH, GAME_HEIGHT } from "../GameConfig";
import { Ball } from "../entities/Ball";
import { CollisionSystem } from "../systems/CollisionSystem";

export class PlayScene extends Scene {
  private background: Graphics;
  private paddle: Paddle;
  private ball: Ball;
  private collision: CollisionSystem;

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

    this.ball = new Ball(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2
    );
    this.container.addChild(this.ball.view);

    this.collision = new CollisionSystem();
  }

  public update(deltaTime: number): void {
    const mouseX = this.input.getMouseX();

    this.paddle.moveTo(mouseX - PADDLE_WIDTH / 2);
    this.ball.update(deltaTime);
    this.collision.checkBallPaddle(this.ball, this.paddle);
  }

  public destroy(): void {
    this.container.removeChildren();
  }
}