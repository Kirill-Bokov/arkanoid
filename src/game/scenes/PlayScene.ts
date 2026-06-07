import { Scene } from "./Scene";
import { Graphics } from "pixi.js";

import { Paddle } from "../entities/Paddle";
import { Ball } from "../entities/Ball";

import { CollisionSystem } from "../systems/CollisionSystem";
import { BrickManager } from "../systems/BrickManager";
import { LevelManager } from "../systems/LevelManager";

import {
  GAME_WIDTH,
  GAME_HEIGHT,
} from "../GameConfig";

import { level1 } from "../levels/level1";
import { LayoutCalculator } from "../LayoutCalculator";
import type { LayoutMetrics } from "../types/GameTypes";
import { LevelController } from "../systems/LevelController";

export class PlayScene extends Scene {
  private background!: Graphics;

  private paddle!: Paddle;

  private collision!: CollisionSystem;
  private brickManager!: BrickManager;
  private levelManager!: LevelManager;
  private levelController!: LevelController;

  private metrics!: LayoutMetrics;

  public init(): void {
    this.metrics = LayoutCalculator.calculate(level1);

    this.createBackground();

    this.collision = new CollisionSystem();

    this.createPaddle();
    this.createBallAndController();

    this.createBrickSystem();
    this.loadLevel();
  }

  public update(deltaTime: number): void {
    this.updatePaddle();

    this.levelController.update(deltaTime);

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
      GAME_WIDTH / 2 - this.metrics.paddleWidth / 2,
      GAME_HEIGHT - 50,
      this.metrics.paddleWidth,
      this.metrics.paddleHeight
    );

    this.container.addChild(this.paddle.view);
  }

  private createBallAndController(): void {
    const ball = new Ball(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      this.metrics.ballRadius
    );

    this.levelController = new LevelController(ball, this.paddle);
    this.levelController.start();

    this.container.addChild(ball.view);
  }

  private createBrickSystem(): void {
    this.brickManager = new BrickManager(this.container);
    this.levelManager = new LevelManager(this.brickManager);
  }

  private loadLevel(): void {
    this.levelManager.loadLevel(level1, this.metrics);
  }

  private updatePaddle(): void {
    const mouseX = this.input.getMouseX();
    this.paddle.moveTo(mouseX - this.paddle.width / 2);
  }

  private handlePaddleCollision(): void {
    const ball = this.levelController.getBall();

    const collision = this.collision.checkBallPaddle(ball, this.paddle);
    if (!collision.collided) return;

    ball.bounceFromPaddle(collision.hitPoint!);
    ball.y = this.paddle.y - ball.radius;
  }

  private handleBrickCollisions(): void {
    const ball = this.levelController.getBall();

    for (const brick of this.brickManager.getAll()) {
      const collision = this.collision.checkBallBrick(ball, brick);

      if (!collision.collided) continue;

      ball.reflect(collision.normalX!, collision.normalY!);
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
