/**
 * Default border styles for appearance.
 */
export class Borders {

    radiusX1: string;
    radiusX2: string;
    radiusX3: string;

    constructor(radiusX1: string, radiusX2: string, radiusX3: string) {
        this.radiusX1 = radiusX1;
        this.radiusX2 = radiusX2;
        this.radiusX3 = radiusX3;
    }

    static apply(): Borders {
        return new Borders('2px', '5px', '10px');
    }

};

export default Borders;