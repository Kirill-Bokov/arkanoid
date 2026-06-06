import type { Paddle } from "../entities/Paddle";
import type { Ball } from "../entities/Ball";
import type { Brick } from "../entities/Brick";
import type { BrickCollision, PaddleCollision } from "../types/GameTypes";


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
  public checkBallBrick(ball: Ball, brick: Brick): BrickCollision {
    const isColliding =
      ball.x + ball.radius >= brick.x &&
      ball.x - ball.radius <= brick.x + brick.width &&
      ball.y + ball.radius >= brick.y &&
      ball.y - ball.radius <= brick.y + brick.height;

    if (!isColliding) return { collided: false };

    return {
      collided: true,
      brick
    };
  }
}
