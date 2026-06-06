import { Scene } from "./Scene";
import { Graphics } from "pixi.js";

import { Paddle } from "../entities/Paddle";
import { Ball } from "../entities/Ball";

import { CollisionSystem } from "../systems/CollisionSystem";
import { BrickManager } from "../systems/BrickManager";
import { GameStats } from "../systems/GameStats";

import {
  GAME_WIDTH,
  GAME_HEIGHT,
  PADDLE_WIDTH,
  PADDLE_HEIGHT
} from "../GameConfig";

export class PlayScene extends Scene {
  private background!: Graphics;

  private paddle!: Paddle;
  private ball!: Ball;

  private collision!: CollisionSystem;
  private brickManager!: BrickManager;
  private stats!: GameStats;

  public init(): void {
    this.createBackground();

    this.collision = new CollisionSystem();
    this.stats = new GameStats();

    this.createPaddle();
    this.createBall();

    this.createBrickManager();
    this.setupBrickEvents();
  }

  public update(deltaTime: number): void {
    this.updatePaddle();
    this.updateBall(deltaTime);

    this.handlePaddleCollision();
    this.handleBrickCollisions();

    this.checkWinCondition();
  }

  public destroy(): void {
    this.container.removeChildren();
  }

  private createBackground(): void {
    this.background = new Graphics();
    this.background.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    this.background.fill("#120e33ff");
    this.container.addChild(this.background);
  }

  private createPaddle(): void {
    this.paddle = new Paddle(
      GAME_WIDTH / 2 - PADDLE_WIDTH / 2,
      GAME_HEIGHT - 50,
      PADDLE_WIDTH,
      PADDLE_HEIGHT
    );

    this.container.addChild(this.paddle.view);
  }

  private createBall(): void {
    this.ball = new Ball(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2
    );

    this.container.addChild(this.ball.view);
  }

  private createBrickManager(): void {
    this.brickManager = new BrickManager(this.container);
    this.brickManager.createLevel();
  }

  private setupBrickEvents(): void {
    this.brickManager.setOnBrickDestroyed(() => {
      this.stats.addScore(100);
      this.stats.addDestroyed();
    });
  }

  private updatePaddle(): void {
    const mouseX = this.input.getMouseX();
    this.paddle.moveTo(mouseX - this.paddle.width / 2);
  }

  private updateBall(deltaTime: number): void {
    this.ball.update(deltaTime);
  }

  private handlePaddleCollision(): void {
    const collision =
      this.collision.checkBallPaddle(this.ball, this.paddle);

    if (!collision.collided || collision.hitPoint === undefined) return;

    this.ball.bounceFromPaddle(collision.hitPoint);

    this.ball.y = this.paddle.y - this.ball.radius;
  }

  private handleBrickCollisions(): void {
    for (const brick of this.brickManager.getAll()) {

      const collision =
        this.collision.checkBallBrick(this.ball, brick);

      if (!collision.collided) continue;

      this.ball.bounceVertical();

      this.brickManager.handleHit(brick);

      break;
    }
  }

  private checkWinCondition(): void {
    if (this.brickManager.isLevelCleared()) {
      console.log("WIN");
    }
  }
}