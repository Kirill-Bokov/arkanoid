import type { Paddle } from "../entities/Paddle";
import type { Ball } from "../entities/Ball";

export class CollisionSystem {

  public checkBallPaddle(ball: Ball, paddle: Paddle): void {
    const ballLeft = ball.x - ball.radius;
    const ballRight = ball.x + ball.radius;
    const ballTop = ball.y - ball.radius;
    const ballBottom = ball.y + ball.radius;

    const paddleLeft = paddle.x;
    const paddleRight = paddle.x + paddle.width;
    const paddleTop = paddle.y;
    const paddleBottom = paddle.y + paddle.height;

    const isColliding =
      ballRight >= paddleLeft &&
      ballLeft <= paddleRight &&
      ballBottom >= paddleTop &&
      ballTop <= paddleBottom;

    if (!isColliding) return;

    this.resolveBallPaddle(ball, paddle);
  }

  private resolveBallPaddle(ball: Ball, paddle: Paddle): void {

    ball.velocityY = Math.abs(ball.velocityY) * -1;
    ball.y = paddle.y - ball.radius;
  }
}