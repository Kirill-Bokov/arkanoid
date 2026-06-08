import { Scene } from "./Scene";
import { Graphics, Container } from "pixi.js";

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
import { SoundManager } from "../systems/SoundManager";
import { Button } from "../utilities/Button";

export class PlayScene extends Scene {
  private background!: Graphics;

  private paddle!: Paddle;

  private collision!: CollisionSystem;
  private brickManager!: BrickManager;
  private levelManager!: LevelManager;
  private levelController!: LevelController;

  private metrics!: LayoutMetrics;

  private sound!: SoundManager;
  private audioUnlocked = false;

  private uiLayer!: Container;

  private playButton!: Button;
  private restartButton!: Button;
  private menuButton!: Button;
  private resumeButton!: Button;

  private uiState: "menu" | "playing" | "paused" = "menu";

  public init(): void {
    this.metrics = LayoutCalculator.calculate(level1);

    this.createBackground();

    this.collision = new CollisionSystem();

    this.sound = new SoundManager();
    this.loadSounds();
    this.unlockAudio();

    this.createPaddle();
    this.createBallAndController();

    this.createBrickSystem();
    this.loadLevel();

    this.createUI();
    this.layoutUI();
    this.setUIState("menu");
  }

  public update(deltaTime: number): void {
    this.updatePaddle();

    if (this.uiState === "playing") {
      this.levelController.update(deltaTime);

      this.handlePaddleCollision();
      this.handleBrickCollisions();
    }

    this.checkWinCondition();
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

    this.container.addChild(ball.view);
  }

  private createBrickSystem(): void {
    this.brickManager = new BrickManager(this.container);
    this.levelManager = new LevelManager(this.brickManager);
  }

  private loadLevel(): void {
    this.levelManager.loadLevel(level1, this.metrics);
  }

  private loadSounds(): void {
    this.sound.load(
      "ball_hit",
      new URL("../../assets/sounds/ball_hit.wav", import.meta.url).toString()
    );

    this.sound.load(
      "brick_hit",
      new URL("../../assets/sounds/brick_hit.wav", import.meta.url).toString()
    );

    this.sound.load(
      "brick_destroy",
      new URL("../../assets/sounds/brick_destroy.wav", import.meta.url).toString()
    );
  }

  private unlockAudio(): void {
    if (this.audioUnlocked) return;

    window.addEventListener(
      "pointerdown",
      () => {
        this.audioUnlocked = true;
        this.sound.play("ball_hit", 0);
      },
      { once: true }
    );
  }

  private createUI(): void {
    this.uiLayer = new Container();
    this.container.addChild(this.uiLayer);

    this.playButton = new Button("Играть", 0, 0, () => this.onPlay());

    this.restartButton = new Button("Рестарт", 0, 0, () => this.onRestart());

    this.menuButton = new Button("☰", 0, 0, () => this.onMenu());

    this.resumeButton = new Button("Продолжить", 0, 0, () => this.onResume());

    this.uiLayer.addChild(this.playButton.view);
    this.uiLayer.addChild(this.restartButton.view);
    this.uiLayer.addChild(this.menuButton.view);
    this.uiLayer.addChild(this.resumeButton.view);
  }

  private layoutUI(): void {
    this.playButton.view.x =
      GAME_WIDTH / 2 - this.playButton.getWidth() / 2;
    this.playButton.view.y = GAME_HEIGHT / 2 - 80;

    this.resumeButton.view.x =
      GAME_WIDTH / 2 - this.resumeButton.getWidth() / 2;
    this.resumeButton.view.y = GAME_HEIGHT / 2 - 80;

    this.restartButton.view.x =
      GAME_WIDTH / 2 - this.restartButton.getWidth() / 2;
    this.restartButton.view.y = GAME_HEIGHT / 2 + 10;

    this.menuButton.view.x =
      GAME_WIDTH - this.menuButton.getWidth() - 10;
    this.menuButton.view.y = 10;
  }

  private setUIState(state: "menu" | "playing" | "paused"): void {
    this.uiState = state;

    const inMenu = state === "menu";
    const inPlaying = state === "playing";
    const inPaused = state === "paused";

    this.playButton.view.visible = inMenu;

    this.menuButton.view.visible = inPlaying;

    this.resumeButton.view.visible = inPaused;
    this.restartButton.view.visible = inPaused;
  }

  private onPlay(): void {
    this.setUIState("playing");
    this.levelController.start();
  }

  private onMenu(): void {
    this.setUIState("paused");
  }

  private onResume(): void {
    this.setUIState("playing");
  }

  private onRestart(): void {
    this.levelManager.reset();
    this.loadLevel();
    this.levelController.start();
    this.setUIState("playing");
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

    this.sound.play("ball_hit", 0.1);
  }

  private handleBrickCollisions(): void {
    const ball = this.levelController.getBall();

    for (const brick of this.brickManager.getAll()) {
      const collision = this.collision.checkBallBrick(ball, brick);

      if (!collision.collided) continue;

      const destroyed = this.brickManager.handleHit(brick);

      ball.reflect(collision.normalX!, collision.normalY!);

      this.sound.play("brick_hit", 0.05);

      if (destroyed) {
        this.sound.play("brick_destroy", 0.05);
      }

      break;
    }
  }

  private checkWinCondition(): void {
    if (this.brickManager.isLevelCleared()) {
      console.log("WIN");
    }
  }
}