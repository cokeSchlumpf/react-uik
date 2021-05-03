export interface Weights {
    normal: number,
    medium: number,
    bold: number
}

/**
 * Helper class to define typography of an appearance.
 */
export class Typography {

    font: string;
    cssImport?: string;
    weights: Weights;

    constructor(font: string, weights: Weights, cssImport?: string) {
        this.font = font;
        this.cssImport = cssImport;
        this.weights = weights;
    }

    static apply(): Typography {
        return new Typography(
            '1.6rem \'IBM Plex Sans\', sans-serif',
            {
                normal: 300,
                medium: 500,
                bold: 800
            },
            "@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100;300;500;800&display=swap');");
    }

}