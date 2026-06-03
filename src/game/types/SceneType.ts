export interface SceneType {
  init(): void;
  update(delta: number): void;
  destroy(): void;
}
