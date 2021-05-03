/**
 * Class to define the spacing defaults for an appearance.
 */
export class Spacing {

    x1: string;
    x2: string;
    x3: string;
    x4: string;
    x5: string;
    x6: string;

    constructor(x1: string, x2: string, x3: string, x4: string, x5: string, x6: string) {
        this.x1 = x1;
        this.x2 = x2;
        this.x3 = x3;
        this.x4 = x4;
        this.x5 = x5;
        this.x6 = x6;
    }

    static apply() {
        return new Spacing('8px', '12px', '16px', '24px', '32px', '48px');
    }

};

export default Spacing;