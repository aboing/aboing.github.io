//轮播图效果
{
    let imgbox = document.querySelectorAll("#banner .imb");
    let circle = document.querySelectorAll(".lbCircle div");
    circle.forEach(function (ele, index) {
        ele.onclick = function () {
            for (let i = 0; i < imgbox.length; i++) {
                circle[i].classList.remove("active");
                imgbox[i].style.zIndex = 0;
            }
            ele.classList.add("active");
            imgbox[index].style.zIndex = 1;
        }
    });
    var now = 0;
    setInterval(function () {
        now++;
        if (now === imgbox.length) {
            now = 0;
        }
        for (let i = 0; i < imgbox.length; i++) {
            circle[i].classList.remove("active");
            imgbox[i].style.zIndex = 0;
        }
        circle[now].classList.add("active");
        imgbox[now].style.zIndex = 1;
    }, 2000)
}

//产品与服务
{
    var lss=document.querySelectorAll(".tabL li");
    var tabs=document.querySelectorAll(".tabC .tabCimg");
    lss.forEach(function(ele,index){
        ele.onmouseover=function(){
            for(let i=0;i<lss.length;i++){
                lss[i].classList.remove("mous");
                tabs[i].style.zIndex=0;
            }
            ele.classList.add("mous");
            tabs[index].style.zIndex=1;
        }
    })
}

//产品展示
// {
// let biglbox=document.querySelector(".biglbox");
// let now = 4;
//     let st = setInterval(boxFn, 1500);
//     function boxFn() {
//         biglbox.style.transition = "all 1s";
//         now++;
//         biglbox.style.marginLeft = -217 * now + "px";
//     }
//     let btnL = document.querySelector(".iboxL");
//     let btnR = document.querySelector(".iboxR");
//     btnR.onclick = function () {
//         now++;
//         biglbox.style.transition = "all 1s";
//         biglbox.style.marginLeft = -217 * now + "px";
//     }
//
//     btnL.onclick = function () {
//         now--;
//         biglbox.style.transition = "all 1s";
//         biglbox.style.marginLeft = -217 * now + "px";
//     }
//     biglbox.addEventListener("transitionend", function () {
//         if (now == 12) {
//             biglbox.style.transition = "none";
//             biglbox.style.marginLeft = "-868px";
//             now = 4;
//         }
//         if (now == 0) {
//             biglbox.style.transition = "none";
//             biglbox.style.marginLeft = "-1736px";
//             now = 8;
//         }
//     });
//
// }

//固定定位
{
    let totop=document.querySelector(".totop");
    window.addEventListener("scroll",function(){
        let obj=document.documentElement.scrollTop===0?document.body:document.documentElement;
        totop.onclick=function(){
            animate(obj,{scrollTop:0},1000);
        }
    });
}