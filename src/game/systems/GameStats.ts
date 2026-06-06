export class GameStats {
  public score = 0;
  public destroyedBricks = 0;

  public addScore(value: number): void {
    this.score += value;
  }

  public addDestroyed(): void {
    this.destroyedBricks++;
  }
}
