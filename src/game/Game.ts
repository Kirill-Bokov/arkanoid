import { Application } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from "./GameConfig";
import type { Scene } from "./scenes/Scene";
import { PlayScene } from "./scenes/PlayScene";
import { InputSystem } from "./systems/InputSystem";

export class Game {
    private app!: Application;
    private currentScene!: Scene;
    private input!: InputSystem;

    public async start(): Promise<void> {
        this.app = new Application();

        await this.app.init({
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            background: "#1e1e1e",
            antialias: true,
        });

        const root = document.getElementById("game-root");
        if (!root) throw new Error("game-root not found");

        root.appendChild(this.app.canvas);
        this.input = new InputSystem(this.app.canvas);
        this.input.init();
        this.changeScene(
            new PlayScene(this.input)
        );

        this.app.ticker.add(() => {
            this.update(this.app.ticker.deltaTime);
        });
    }

    public changeScene(scene: Scene): void {
        if (this.currentScene) {
            this.currentScene.destroy();
            this.app.stage.removeChild(this.currentScene.container);
        }

        this.currentScene = scene;

        this.currentScene.init();
        this.app.stage.addChild(this.currentScene.container);
    }
    private update(delta: number): void {
        if (this.currentScene) {
            this.currentScene.update(delta);
        }
    }
}