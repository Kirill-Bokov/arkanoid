import type { Paddle } from "../entities/Paddle";
import type { Ball } from "../entities/Ball";

export type PaddleCollision = {
  collided: boolean;
  hitPoint?: number;
};

export class CollisionSystem {

  public checkBallPaddle(ball: Ball, paddle: Paddle): PaddleCollision {
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

    if (!isColliding) {
      return { collided: false };
    }

    const hitPoint =
      ((ball.x - paddle.x) / paddle.width) * 2 - 1;

    return {
      collided: true,
      hitPoint
    };
  }
}
