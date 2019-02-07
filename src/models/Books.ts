export class Books {
    description: string[];
    isRent: boolean;
    renter: string;

    constructor(public name: string, public author: string) {
        this.isRent = false;
    }
}