
export namespace Utils {
    export function getRandomInt(min, max): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    export function getAngleTo(mx, my, px, py) {
        // var self = that;
        var distX = my - py;
        var distY = mx - px;
        var angle = Math.atan2(distX, distY);
        // var degrees = angle * 180/ Math.PI;
        return angle;
    }

    export function getAngleX(length, angle) {
        return Math.cos(angle) * length;
    }

    export function getAngleY(length, angle) {
        return Math.sin(angle) * length;
    }
}