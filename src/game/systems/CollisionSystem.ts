import type { Paddle } from "../entities/Paddle";
import type { Ball } from "../entities/Ball";
import type { Brick } from "../entities/Brick";
import type { CollisionResult } from "../types/GameTypes";


export class CollisionSystem {

  public checkBallPaddle(ball: Ball, paddle: Paddle): CollisionResult {

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
    target: paddle,
    hitPoint,

    normalX: hitPoint,
    normalY: -Math.sqrt(1 - hitPoint * hitPoint) 
  };
}
  public checkBallBrick(ball: Ball, brick: Brick): CollisionResult {

  const closestX = Math.max(
    brick.x,
    Math.min(ball.x, brick.x + brick.width)
  );

  const closestY = Math.max(
    brick.y,
    Math.min(ball.y, brick.y + brick.height)
  );

  const dx = ball.x - closestX;
  const dy = ball.y - closestY;

  const distSq = dx * dx + dy * dy;

  if (distSq > ball.radius * ball.radius) {
    return { collided: false };
  }

  const dist = Math.sqrt(distSq) || 1;

  return {
    collided: true,
    target: brick,
    normalX: dx / dist,
    normalY: dy / dist
  };
}
}
