let canvas = document.querySelector("canvas");
let cobj = canvas.getContext("2d");
let start = document.querySelector("#start");
let w = 40;
let blank = {};
let manual = document.querySelector(".manual");
let restart = document.querySelector(".manual .restart");
start.onclick = function () {
    canvas.classList.add("show");
    start.value = "游戏中";
    canvas.style.display="block";
}
let renji = document.querySelector("#renji");
let rj = false;
renji.onfocus = function () {
    rj = true;
}
function drawBoard() {
    cobj.beginPath();
    for (let i = 1; i < 14; i++) {
        cobj.moveTo(20, i * w + 0.5 + 20);
        cobj.lineTo(580, i * w + 0.5 + 20);
        cobj.moveTo(i * w + 0.5 + 20, 20);
        cobj.lineTo(i * w + 0.5 + 20, 580);
    }
    cobj.stroke();
    cobj.strokeRect(0.5 + 20, 0.5 + 20, 559, 559);
    function drawPointer(x, y) {
        cobj.save();
        cobj.translate(x * w+20, y * w+20);
        cobj.beginPath();
        cobj.arc(0, 0, 5, 0, 2 * Math.PI);
        cobj.fillStyle = "#000";
        cobj.fill();
        cobj.restore();
    }

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
}
drawBoard();
function j(x, y) {
    return x + "_" + y;
}
let pos = {};
function create(x, y, color) {
    cobj.save();
    cobj.beginPath();
    cobj.translate(x * w+20, y * w+20);
    cobj.arc(0, 0, 16, 0, 2 * Math.PI);
    cobj.fillStyle = color;
    cobj.fill();
    cobj.restore();
    pos[j(x, y)] = color;
    delete blank[j(x, y)];
}
let flag = true;
canvas.onclick = function (e) {
    let x = Math.round((e.offsetX-20)/ w);
    let y = Math.round((e.offsetY-20) / w);
    if (pos[j(x, y)]) {
        return;
    }
    //判断输赢
    if (flag) {
        create(x, y, "#000");
        if (check(x, y, "#000") === 5) {
            alert("黑方获胜");
            manual.style.display = "block";
            canvas.style.display = "none";
        }
        if (rj) {
            let p = getRj();
            create(p.x, p.y, "#fff");
            if (check(p.x, p.y, "#fff") === 5) {
                alert("白方获胜");
                manual.style.display = "block";
                canvas.style.display = "none";
            }
            return;
        }
    }
    else {
        create(x, y, "#fff");
        if (check(x, y, "#fff") === 5) {
            alert("白方获胜");
            manual.style.display = "block";
            canvas.style.display = "none";
        }
    }
    flag = !flag;
}

function check(x, y, color) {
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
}

function getRj() {
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

//生成棋谱
let qipu = document.querySelector(".manual .qipu");
let imgbox = document.querySelector(".imgbox");
let download = document.querySelector("#download");
qipu.onclick = function () {
    setnum();
    imgbox.style.display = "block";
    download.style.display = "block";
    manual.style.display = "none";
    let url = canvas.toDataURL();
    let newimg = new Image();
    newimg.src = url;
    imgbox.appendChild(newimg);
    download.href = url;
    download.setAttribute("download", "qipu.png");
}
//重新开始
restart.onclick = function () {
    canvas.classList.remove("show");
    manual.style.display = "none";
    cobj.clearRect(0, 0, 600, 600);
    pos = {};
    start.value = "开始游戏";
    drawBoard();
}

//setnum;
function setnum() {
    let n = 1;
    for (let i in pos) {
        console.log(pos);
        let x = parseInt(i.split("_")[0]);
        let y = parseInt(i.split("_")[1]);
        cobj.textAlign = "center";
        cobj.textBaseline = "middle";
        cobj.font = "30px cursive";
        cobj.save();
        if (pos[i] === "#000") {
            cobj.fillStyle = "#fff";
        } else {
            cobj.fillStyle = "#000";
        }
        cobj.translate(x * w+20, y * w+20);
        cobj.fillText(n++, 0, 0);
        cobj.restore();
    }
}

//音乐
let music=document.querySelector(".music");
let stq=setInterval(lb,3000);
function lb(){
    music.classList.add("mic");
}
let flagq=true;
music.onclick=function(){
    if(flagq){
        clearInterval(stq);
        music.classList.remove("mic");
        flagq=false;
    }else{
        stq=setInterval(lb,3000);
        music.classList.add("mic");
        flagq=true;
    }
}

