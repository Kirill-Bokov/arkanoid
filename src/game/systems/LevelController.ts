import { Ball } from "../entities/Ball";
import { Paddle } from "../entities/Paddle";

export type GameState =
  | "idle"
  | "ball_spawn_delay"
  | "playing"
  | "ball_lost";

export class LevelController {
  private state: GameState = "idle";
  private spawnTimer: number | null = null;

  private ball: Ball;
  private paddle: Paddle;

  constructor(ball: Ball, paddle: Paddle) {
    this.ball = ball;
    this.paddle = paddle;
  }

  public getBall(): Ball {
    return this.ball;
  }

  public getPaddle(): Paddle {
    return this.paddle;
  }

  public start(): void {
    this.resetRound();
  }

  public update(deltaTime: number): void {
    switch (this.state) {
      case "playing":
        this.ball.update(deltaTime);

        if (this.ball.isLost()) {
          this.onBallLost();
        }
        break;
    }
  }

  private resetRound(): void {
    this.state = "ball_spawn_delay";

    this.ball.reset(this.paddle);
    this.ball.attachToPaddle(this.paddle);

    this.scheduleBallLaunch();
  }

  private scheduleBallLaunch(): void {
    if (this.spawnTimer !== null) clearTimeout(this.spawnTimer);

    this.spawnTimer = window.setTimeout(() => {
      this.launchBall();
    }, 2000);
  }

  private launchBall(): void {
    this.state = "playing";
    this.ball.launch();
  }

  private onBallLost(): void {
    this.state = "ball_lost";

    this.scheduleNextLife();
  }

  private scheduleNextLife(): void {
    if (this.spawnTimer !== null) clearTimeout(this.spawnTimer);

    this.spawnTimer = window.setTimeout(() => {
      this.resetRound();
    }, 1500);
  }
}