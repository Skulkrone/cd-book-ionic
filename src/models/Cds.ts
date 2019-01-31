export class Cds {
    description: string[];
    isRent: boolean;

    constructor(public name:string, public artist: string) {
        this.isRent = false;
    }
}