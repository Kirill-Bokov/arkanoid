import { Brick } from "../entities/Brick";
import type { BrickType } from "../types/GameTypes";

export class BrickFactory {
    public static create(
        x: number,
        y: number,
        width: number,
        height: number,
        type: BrickType,
    ): Brick {

        switch (type) {
            case "empty":
                return new Brick(x, y, width, height, 0);

            case "normal":
                return new Brick(x, y, width, height, 1);

            case "strong":
                return new Brick(x, y, width, height, 2);
            case "very_strong":
                return new Brick(x, y, width, height, 3);
            case "unbreakable":
                return new Brick(x, y, width, height, Infinity);
        }
    }
}