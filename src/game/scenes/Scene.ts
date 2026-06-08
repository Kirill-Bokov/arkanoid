import { Container } from "pixi.js";
import type { SceneType } from "../types/SceneType";
import { InputSystem } from "../systems/InputSystem";

export abstract class Scene implements SceneType {
    public readonly container = new Container();
    protected input: InputSystem;

    constructor(
        input: InputSystem
    ) {
        this.input = input;
    }

    abstract init(): void;
    abstract update(deltaTime: number): void;

}
