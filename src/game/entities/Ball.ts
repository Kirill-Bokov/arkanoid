import { Graphics, Rectangle } from "pixi.js";
import { GAME_WIDTH, GAME_HEIGHT } from "../GameConfig";

export class Ball {
  public x: number;
  public y: number;

  public velocityX: number;
  public velocityY: number;
  public radius: number;

  private readonly speed: number = 5;
  private attachedToPaddle: boolean = false;
  public readonly view: Graphics;

  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;

    this.radius = radius;

    this.velocityX = 0;
    this.velocityY = -this.speed;

    this.view = new Graphics();
    this.draw();

    this.syncView();
  }

  private draw(): void {
    this.view.circle(0, 0, this.radius);
    this.view.fill("#ffffff");
  }

  public update(deltaTime: number): void {
    if (this.attachedToPaddle) {
      this.syncView();
      return;
    }

    this.x += this.velocityX * deltaTime;
    this.y += this.velocityY * deltaTime;

    this.handleWallCollision();
    this.syncView();
  }
  public reflect(nx: number, ny: number): void {
    const dot =
      this.velocityX * nx +
      this.velocityY * ny;

    this.velocityX -= 2 * dot * nx;
    this.velocityY -= 2 * dot * ny;
  }
  public bounceFromPaddle(hitPoint: number): void {
    const maxAngle = Math.PI / 3;
    const angle = hitPoint * maxAngle;

    this.velocityX = Math.sin(angle) * this.speed;
    this.velocityY = -Math.cos(angle) * this.speed;
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

  }

  public reset(paddle: { x: number; y: number }): void {
    this.velocityX = 0;
    this.velocityY = 0;

    this.attachToPaddle(paddle);
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

  public attachToPaddle(paddle: { x: number; y: number }): void {
    this.attachedToPaddle = true;

    this.velocityX = 0;
    this.velocityY = 0;

    this.x = paddle.x;
    this.y = paddle.y - 60;

    this.syncView();
  }

  public launch(): void {
    this.attachedToPaddle = false;

    this.velocityX = 0;
    this.velocityY = this.speed;
  }
  public isLost(): boolean {
    return this.y > GAME_HEIGHT;
  }
}