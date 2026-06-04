import { Graphics, Rectangle } from "pixi.js";
import { BALL_RADIUS, GAME_HEIGHT, GAME_WIDTH } from "../GameConfig";

export class Ball {
  public x: number;
  public y: number;

  public velocityX: number;
  public velocityY: number;
  public radius: number;

  public readonly view: Graphics;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.velocityX = 0;
    this.velocityY = 5;
    this.radius = BALL_RADIUS;

    this.view = new Graphics();
    this.draw();

    this.syncView();
  }

  private draw(): void {
    this.view.circle(0, 0, this.radius);
    this.view.fill("#ffffff");
  }

  public update(deltaTime: number): void {
    this.x += this.velocityX * deltaTime;
    this.y += this.velocityY * deltaTime;

    this.handleWallCollision();

    this.syncView();
  }

  private handleWallCollision(): void {
    if (this.x - this.radius <= 0) {
      this.x = this.radius;
      this.velocityX *= -1;
    }

    if (this.x + this.radius >= GAME_WIDTH) {
      this.x = GAME_WIDTH - this.radius;
      this.velocityX *= -1;
    }

    if (this.y - this.radius <= 0) {
      this.y = this.radius;
      this.velocityY *= -1;
    }

    if (this.y - this.radius >= GAME_HEIGHT) {
      this.reset();
    }
  }
  //В будущем переделать так, чтобы платформа тоже центровалась в этот момент
  public reset(): void {
    this.x = GAME_WIDTH / 2;
    this.y = GAME_HEIGHT -80;

    this.velocityX = 0;
    this.velocityY = 5;
  }

  public getBounds(): Rectangle {
    return new Rectangle(
      this.x - this.radius,
      this.y - this.radius,
      this.radius * 2,
      this.radius * 2
    );
  }

  private syncView(): void {
    this.view.x = this.x;
    this.view.y = this.y;
  }
}
