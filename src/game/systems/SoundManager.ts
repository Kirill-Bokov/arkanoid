export class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();

  public load(name: string, src: string): void {
    const audio = new Audio(src);
    audio.preload = "auto";

    this.sounds.set(name, audio);
  }

  public play(name: string, volume = 0.5): void {
    const original = this.sounds.get(name);
    if (!original) return;

    const clone = original.cloneNode(true) as HTMLAudioElement;
    clone.volume = volume;
    clone.play();
  }
}
