import constrain from './_Constrain';
import './Array.prototype.keys';

const packer = (mapw, maph, roomminw, roomminh, roommaxw, roommaxh) => {
    const cellx = Math.floor(mapw / roomminw);
    const celly = Math.floor(maph / roomminh);
    const field = [...Array(cellx).keys()].map(x => [...Array(celly).keys()].map(y => -1));
    const cellstepx = (roommaxw, roomminw) => {
        return Math.ceil(roommaxw / roomminw * Math.random());
    };
    const cellstepy = (roommaxh, roomminh) => {
        return Math.ceil(roommaxh / roomminh * Math.random());
    };
    const fillmap = (field, x, y, cellstepx, cellstepy, id) => {
        let check = 0,
            Threshold = cellstepx * cellstepy;
        if (cellstepx === 0 || cellstepy === 0) return false;
        [...Array(cellstepx).keys()].forEach(distx => {
            [...Array(cellstepy).keys()].forEach(disty => {
                try {
                    const targetselval = field[x + distx][y + disty];
                    if (targetselval === -1) check++;
                } catch (error) {}
            });
        });
        if (check === Threshold) {
            [...Array(cellstepx).keys()].forEach(distx => {
                [...Array(cellstepy).keys()].forEach(disty => {
                    field[x + distx][y + disty] = id;
                });
            });
            field[x][y] = {
                x: x * roomminw,
                y: y * roomminh,
                w: roomminw * cellstepx,
                h: roomminh * cellstepy,
            };
        }
    };
    const checkmap = (_field) => {
        const field = [..._field];
        const flatten = field.reduce((a, c) => a.concat(c), []);
        if (flatten.includes(-1)) return true;
        else return false;
    };

    let id = 0,
        rmw = roommaxw,
        rmh = roommaxh;
    do {
        for (let x = 0; x < field.length; x += 1) {
            let xfield = field[x];
            for (let y = 0; y < xfield.length; y += 1) {
                id++;
                fillmap(field, x, y, cellstepx(rmw, roomminw), cellstepy(rmh, roomminh), id);
            }
        }
        rmw = constrain(rmw = rmw / 5, 1, roommaxw);
        rmh = constrain(rmh = rmh / 5, 1, roommaxh);
    } while ((rmw !== 1 || rmh !== 1) && checkmap(field))
    const mapfratten = field.reduce((a, c) => a.concat(c), []);
    const result = mapfratten.filter(v => (typeof v === 'object'));
    return result;
};

export { packer };