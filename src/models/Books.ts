export class Books {
    description: string[];
    isRent: boolean;

    constructor(public name:string, public author: string) {
        this.isRent = false;
    }
}