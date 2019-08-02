import { packer } from './packer';

class loadingIcon {
    constructor(parentNode) {
        this._parentNode;
        this._ctx;
        this._req;
        this._resolution = 2;
        this._loadAnimation = false;

        const canvas = document.createElement('canvas');

        this._parentNode = parentNode;
        this._ctx = canvas.getContext('2d');
        this._parentNode.appendChild(canvas);


        loadingIcon.draw(this, canvas, this._parentNode, this._ctx);
    }

    stop() {
        cancelAnimationFrame(this._req);
    }

    startLoadAnimation() {
        this._loadAnimation = true;
    }

    static draw(that, canvas, container, ctx) {

        let parentBound = container.getBoundingClientRect();

        const rects = packer(parentBound.width * 2, parentBound.height * 2 + 10, 2, 10, 11, 70);

        const draw = () => {
            that._req = requestAnimationFrame(draw);

            parentBound = container.getBoundingClientRect();
            const width = parentBound.width;
            const height = parentBound.height;
            

            loadingIcon.resolution(canvas, ctx, width, height, that._resolution);
    
            
            ctx.save();
            ctx.fillStyle = '#ffffff';
            rects.forEach(rect => {
                if (that._loadAnimation) ctx.globalAlpha = Math.random();
                ctx.fillRect(rect.x, rect.y, rect.w - 1, rect.h - 1);
            });
            ctx.restore();
        }
        requestAnimationFrame(draw);
    }

    // static drawRoundPoly(ctx, x, y, radius, vertexLength, roundRadius) {
    //     const getRoundVertexPos = (x, y, radius, degree) => {
    //         const xPos = x + radius * Math.cos(degree * (Math.PI / 180));
    //         const yPos = y + radius * Math.sin(degree * (Math.PI / 180));
    //         return [xPos, yPos];
    //     }

    //     const r = radius - roundRadius;
    //     let polyVertexes = [];
    //     let rounds = [];

    //     [...Array(vertexLength).keys()].forEach(i => {
    //         const degree = 360 * i / vertexLength;

    //         const point = getRoundVertexPos(x, y, r, degree);

    //         const e = 180 - 90 - (180 * (vertexLength - 2) / vertexLength / 2);

    //         const degree1 = degree - Math.abs(e) / (vertexLength - 2);
    //         const degree2 = degree + Math.abs(e) / (vertexLength - 2);

    //         const start = getRoundVertexPos(point[0], point[1], roundRadius, degree1);
    //         const end = getRoundVertexPos(point[0], point[1], roundRadius, degree2);

    //         polyVertexes.push([start, end]);

    //         rounds.push({
    //             pos: point,
    //             arcStart: degree1,
    //             arcEnd: degree2,
    //             radius: roundRadius,
    //         });
    //     });

    //     ctx.beginPath();
    //     polyVertexes.forEach((line, index) => {
    //         const next = ((index + 1) === polyVertexes.length) ? 0 : index + 1;

    //         const start = line[1];
    //         const end = polyVertexes[next][0];

    //         if(index === 0) ctx.moveTo(start[0], start[1]);
    //         ctx.lineTo(end[0], end[1]);
            

    //         const round = rounds[next];
    //         const pos = round.pos;
    //         const roundStart = round.arcStart * Math.PI / 180;
    //         const roundEnd = round.arcEnd * Math.PI / 180;
    //         ctx.arc(pos[0], pos[1], round.radius, roundStart, roundEnd);
    //     });
    //     ctx.closePath();
    // }
    // static drawRect(ctx, x, y, w, h, r) {
    //     ctx.beginPath();
     
    //     ctx.moveTo(x + r, y);
    //     ctx.lineTo(x + w - r, y);
    //     ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, 0, false);
    //     ctx.lineTo(x + w, y + h - r);
    //     ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5, false);
    //     ctx.lineTo(x + r, y + h);
    //     ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI, false);
    //     ctx.lineTo(x, y + r);
    //     ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);

    //     ctx.closePath();
    // }
    static resolution(canvas,ctx,canvasWidth,canvasHeight,resolution) {
        
        canvas.width = canvasWidth * resolution;
        canvas.height = canvasHeight * resolution;

        ctx.scale(resolution, resolution);

        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${canvasHeight}px`;
    }
}

export { loadingIcon };