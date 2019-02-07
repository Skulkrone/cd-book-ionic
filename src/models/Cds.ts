export class Cds {
    description: string[];
    isRent: boolean;
    renter: string

    constructor(public name:string, public artist: string) {
        this.isRent = false;
    }
}