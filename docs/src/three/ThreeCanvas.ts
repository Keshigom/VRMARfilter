import * as THREE from "three";

export class ThreeCanvas {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    private init() {

    }

    public greet(): void {
        console.log("Hello, " + this.greeting);
    }
}