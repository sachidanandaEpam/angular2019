export abstract class SessionStrategy {
    constructor() { }

    public abstract getStorage();

    public get(key: string): string {
        return this.getStorage().getItem(key);
    }

    public set(key: string, value: string): void {
        this.getStorage().setItem(key, value);
    }

    public remove(key: string): void {
        return this.getStorage().removeItem(key);
    }

    public removeAll(): void {
        return this.getStorage().clear();
    }
}
