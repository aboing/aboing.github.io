class Game {
    constructor() {
        this.canvas = document.querySelector("canvas");
        this.cobj =this.canvas.getContext("2d");
        this.start = document.querySelector("#start");
        this.w = 40;
        this.blank = {};
        this.manual = document.querySelector(".manual");
        this.span = document.querySelector(".manual span");
        this.renji = document.querySelector("#renji");
        this.rj = false;
        this.pos = {};
    };
    init(){

    };
    _drawPointer(x, y) {
        this.cobj.save();
        this.cobj.translate(x * w, y * w);
        this.cobj.beginPath();
        this.cobj.arc(0, 0, 5, 0, 2 * Math.PI);
        this.cobj.fillStyle = "#000";
        this.cobj.fill();
        this.cobj.restore();
    };
    _drawBoard() {
        cobj.beginPath();
        for (let i = 1; i < 14; i++) {
            cobj.moveTo(0, i * w + 0.5);
            cobj.lineTo(560, i * w + 0.5);
            cobj.moveTo(i * w + 0.5, 0);
            cobj.lineTo(i * w + 0.5, 560);
        }
        cobj.stroke();
        cobj.strokeRect(0.5, 0.5, 559, 559);
        _drawPointer(x, y);
        for (let i = 0; i < 15; i++) {
            for (let k = 0; k < 15; k++) {
                blank[j(i, k)] = true;
            }
        }
        drawPointer(3, 3);
        drawPointer(11, 3);
        drawPointer(7, 7);
        drawPointer(3, 11);
        drawPointer(11, 11);
    };
    _j(x, y) {
        return x + "_" + y;
    };
    _create(x, y, color) {
        this.cobj.save();
        this.cobj.beginPath();
        this.cobj.translate(x * w, y * w);
        this.cobj.arc(0, 0, 16, 0, 2 * Math.PI);
        this.cobj.fillStyle = color;
        this.cobj.fill();
        this.cobj.restore();
        this.pos[j(x, y)] = color;
        delete this.blank[j(x, y)];
    };
    _check(x, y, color) {
        let row = 1;
        let i = 1;
        while (pos[j(x + i, y)] === color) {
            row++;
            i++;
        }
        i = 1;
        while (pos[j(x - i, y)] === color) {
            row++;
            i++;
        }
        let col = 1;
        i = 1;
        while (pos[j(x, y + i)] === color) {
            col++;
            i++;
        }
        i = 1;
        while (pos[j(x, y - i)] === color) {
            col++;
            i++;
        }
        let x1 = 1;
        i = 1;
        while (pos[j(x + i, y - i)] === color) {
            x1++;
            i++;
        }
        i = 1;
        while (pos[j(x - i, y + i)] === color) {
            x1++;
            i++;
        }
        let x2 = 1;
        i = 1;
        while (pos[j(x - i, y - i)] === color) {
            x2++;
            i++;
        }
        i = 1;
        while (pos[j(x + i, y + i)] === color) {
            x2++;
            i++;
        }
        return Math.max(row, col, x1, x2);
    };
    _getRj() {
        let max = 0;
        let weiz = {};
        for (let i in blank) {
            let x = parseInt(i.split("_")[0]);
            let y = parseInt(i.split("_")[1]);
            let length = check(x, y, "#000");
            if (length > max) {
                max = length;
                weiz = {x, y};
            }
        }
        let max1 = 0;
        let weiz1 = {};
        for (let i in blank) {
            let x = parseInt(i.split("_")[0])
            let y = parseInt(i.split("_")[1])
            let length = check(x, y, "#fff");
            if (length > max1) {
                max1 = length;
                weiz1 = {x, y};
            }
        }
        if (max > max1) {
            return weiz;
        } else {
            return weiz1;
        }
    }
}
let game = new Game();
this._drawBoard();
this._create();
this.renji.onfocus = function () {
    this.rj = true;
}

let flag = true;
this.canvas.onclick = function (e) {
    let x = Math.round(e.offsetX / w);
    let y = Math.round(e.offsetY / w);
    if (pos[j(x, y)]) {
        return;
    }
    //判断输赢
    if (flag) {
        create(x, y, "#000");
        if (check(x, y, "#000") === 5) {
            alert("黑方获胜");
            manual.style.display="block";
            canvas.style.display="none";
        }
        if (rj) {
            let p = getRj();
            create(p.x, p.y, "#fff");
            if (check(p.x, p.y, "#fff") === 5) {
                alert("白方获胜");
                manual.style.display="block";
                canvas.style.display="none";
            }
            return;
        }
    }
    else {
        create(x, y, "#fff");
        if (check(x, y, "#fff") === 5) {
            alert("白方获胜");
            manual.style.display="block";
            canvas.style.display="none";
        }
    }
    flag = !flag;
}