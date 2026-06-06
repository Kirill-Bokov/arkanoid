import { Graphics } from "pixi.js";

export class Brick {
  public readonly view: Graphics;

  public x: number;
  public y: number;

  public readonly width: number;
  public readonly height: number;

  private hp: number;

  constructor(x: number, y: number, width: number, height: number, hp: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.hp = hp;

    this.view = new Graphics();

    this.draw();
    this.sync();
  }

  public takeDamage(amount: number): boolean {
    this.hp -= amount;
    this.draw();

    return this.hp <= 0;
  }

  public isDestroyed(): boolean {
    return this.hp <= 0;
  }

  private draw(): void {
    this.view.clear();

    const color =
      this.hp === 3 ? "#ff4d4d" :
      this.hp === 2 ? "#ffa500" :
      this.hp === Infinity ? "ffffff" :
      "#ffff66";

    this.view.rect(0, 0, this.width, this.height);
    this.view.fill(color);
  }

  public sync(): void {
    this.view.x = this.x;
    this.view.y = this.y;
  }
}
