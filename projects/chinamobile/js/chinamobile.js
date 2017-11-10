// banner轮播图
{
    let imgs = document.querySelectorAll(".boximg  li");
    let btns = document.querySelectorAll(".bBotton li");
    let bannerObj = document.querySelector("#banner");
    let leftObj = document.querySelector(".botLeft");
    let rightObj = document.querySelector(".botRight");

    let now = 0;
    let z = 10;
    let flag = true;
    rightObj.onclick = function () {
        if (flag) {
            flag = false;

            imgs[now].classList.add("leftOut");
            btns[now].classList.remove("bBotton1");
            now++;
            if (now === imgs.length) {
                now = 0;
            }
            imgs[now].style.zIndex = z++;
            imgs[now].classList.add("rightIn");
            btns[now].classList.add("bBotton1");
        }
        leftObj.onclick = function () {
            imgs[now].classList.add("rightOut");
            btns[now].classList.remove("bBotton1");
            now--;
            if (now === -1) {
                now = imgs.length - 1;
            }
            imgs[now].style.zIndex = z++;
            imgs[now].classList.add("leftIn");
            btns[now].classList.add("bBotton1");

        }
    }

    let st = setInterval(lunboFn, 1500);

    function lunboFn() {
        imgs[now].classList.add("leftOut");
        btns[now].classList.remove("bBotton1");
        now++;
        if (now === imgs.length) {
            now = 0;
        }
        imgs[now].classList.add("rightIn");
        btns[now].classList.add("bBotton1");
        imgs[now].style.zIndex = z++;
        btns[now].style.zIndex = z + 1;

    }

    bannerObj.onmouseover = window.onblur = function () {
        clearInterval(st);
        btns.forEach(function (ele, index) {
            ele.onclick = function () {
                if (flag) {
                    flag = false;

                    if (now < index) {
                        btns[now].classList.remove("bBotton1");
                        imgs[now].classList.add("leftOut");
                        imgs[index].style.zIndex = z++;
                        btns[index].classList.add("bBotton1");
                        imgs[index].classList.add("rightIn");

                    } else if (now > index) {
                        btns[now].classList.remove("bBotton1");
                        imgs[now].classList.add("rightOut");
                        imgs[index].style.zIndex = z++;
                        btns[index].classList.add("bBotton1");
                        imgs[index].classList.add("leftIn");
                    }
                    now = index;
                }
            }
        });
    }
    imgs.forEach(function (ele) {
        ele.addEventListener("animationend", function () {
            ele.className = "";
            flag = true;
        });
    });
    bannerObj.onmouseout = window.onfocus = function () {
        st = setInterval(lunboFn, 2000);
    }
}
//wlan开始
{
    let bboxObj = document.querySelector(".box-inner ul");
    let now = 4;
    let st = setInterval(boxFn, 1500);
    function boxFn() {
        bboxObj.style.transition = "all 1s";
        now++;
        bboxObj.style.marginLeft = -295 * now + "px";
    }
    let btnL = document.querySelector(".btnL");
    let btnR = document.querySelector(".btnR");
    btnR.onclick = function () {
        now++;
        bboxObj.style.transition = "all 1s";
        bboxObj.style.marginLeft = -295 * now + "px";
    }

    btnL.onclick = function () {
        now--;
        bboxObj.style.transition = "all 1s";
        bboxObj.style.marginLeft = -295 * now + "px";
    }
    bboxObj.addEventListener("transitionend", function () {
        if (now == 12) {
            bboxObj.style.transition = "none";
            bboxObj.style.marginLeft = "-1180px";
            now = 4;
        }
        if (now == 0) {
            bboxObj.style.transition = "none";
            bboxObj.style.marginLeft = "-2360px";
            now = 8;
        }
    });

//鼠标移入移出
    let boxObj = document.querySelector(".box");
    boxObj.onmouseover = window.onblur = function () {
        clearInterval(st);
    }
    boxObj.onmouseout = window.onfocus = function () {
        st = setInterval(boxFn, 1500);
    }
}
// 反应时间问题


