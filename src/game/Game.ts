import { Application } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from "./GameConfig";
import type { Scene } from "./scenes/Scene";
import { PlayScene } from "./scenes/PlayScene";

export class Game {
    private app!: Application;
    private currentScene!: Scene;

    public async start(): Promise<void> {
        this.app = new Application();

        await this.app.init({
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            background: "#1e1e1e",
            antialias: true,
        });

        const root = document.getElementById("game-root");
        root.appendChild(this.app.canvas);

        this.changeScene(new PlayScene());

        this.app.ticker.add((ticker) => {
            this.update(ticker.deltaTime);
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