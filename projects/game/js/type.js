//点击开始游戏
let start = document.querySelector(".login .type");
let login = document.querySelector(".login");
let container = document.querySelector(".container");
let game = document.querySelector(".game");
let num = 3;
let obj = {};
let score = document.querySelector(".score");
let level = document.querySelector(".level");
let hp = document.querySelector(".hp");
let end = document.querySelector(".end");
start.onclick = function () {
    container.style.display = "block";
    login.style.display = "none";
};;
// //创建字母
function create() {
    let divs = document.createElement("div");
    divs.className = "newbox";
    do {
        var randomLeft = -Math.floor(Math.random() * 600);
    } while (check(randomLeft));
    let randomTop = Math.floor(Math.random() * 400);
    divs.style.left = randomLeft + "px";
    divs.style.top = randomTop + "px";
    do {
        var randomnum = Math.floor(Math.random() * 26 + 65);
        var randomLetter = String.fromCharCode(randomnum);
    } while (obj[randomLetter]);
    obj[randomLetter] = {left: randomLeft, top: randomTop, ele: divs};
    divs.innerHTML = randomLetter;
    game.appendChild(divs);
}
// //去重
function check(newleft) {
    for (let i in obj) {
        if (newleft > obj[i].left - 100 && newleft < obj[i].left + 100) {
            return true;
        }
    }
}
// //自动轮播
let st = setInterval(lunb, 50);
function lunb() {
    for (let i in obj) {
        let t = obj[i].left;
        t += 20;
        obj[i].ele.style.left = t + "px";
        obj[i].left = t;
        if (obj[i].left > 1100) {
            game.removeChild(obj[i].ele);
            delete  obj[i];
            // game.innerHTML="";
            hp.innerHTML--;
            create();
            if (hp.innerHTML === "0") {
                clearInterval(st);
                end.style.display = "block";
            }
        }

    }
}
// //键盘事件
document.onkeydown = function (e) {
    let kc = e.keyCode;
    let zm = String.fromCharCode(kc);
    if (obj[zm]) {
        game.removeChild(obj[zm].ele);
        delete obj[zm];
        create();
        score.innerHTML++;
        if (score.innerHTML % 10 === 0) {
            level.innerHTML++;
            num++;
        }
    }
}
// //重新开始
end.onclick = function () {
    end.style.display = "none";
    hp.innerHTML = 5;
    score.innerHTML = 0;
    level.innerHTML = 1;
    game.innerHTML="";
};
//点击开始按钮
let begin=document.querySelector("#start");
var flag=true;
begin.onclick=function(e){
    if(flag){
        for (let i = 0; i < num; i++) {
            create();
        }
        flag=false;
    }
};
//点击暂停按钮
let stop=document.querySelector("#stop");
var now=0;
stop.onclick=function(){
    now++;
    if(now%2==1){
        clearInterval(st);
    }else{
        // console.log(stop.value);
        stop.value="继续";
        st = setInterval(lunb, 50);
    }
};
//点击结束按钮
let over=document.querySelector("#over");
over.onclick=function(){
    end.style.display = "block";
    game.innerHTML="";
    clearInterval(st);
    // flag=true;
}


