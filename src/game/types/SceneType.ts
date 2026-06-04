export interface SceneType {
  init(): void;
  update(deltaTime: number): void;
  destroy(): void;
}
