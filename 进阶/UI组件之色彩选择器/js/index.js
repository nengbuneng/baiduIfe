


var colorShow=document.getElementById('choosed')
var colorPointer=document.getElementById('colorPointer')
var bar=document.getElementById('bar')
var barPointer=document.getElementById('barPointer')
var black=document.getElementById('black')

var R=document.getElementById('R')
var G=document.getElementById('G')
var B=document.getElementById('B')

var black=document.getElementById('black')
var black=document.getElementById('black')
var black=document.getElementById('black')



    barPointer.style.top=20+'px'

    var barH=barPointer.style.top

function arrToBack(arr) {
    return 'linear-gradient(to left, white,rgb('+parseFloat(arr[0])+','+parseFloat(arr[1])+','+parseFloat(arr[2]) +'))'

}

function arrToRgb(arr) {
    return 'rgb('+parseFloat(arr[0])+','+parseFloat(arr[1])+','+parseFloat(arr[2]) +')'
}

function rgbChangeIntohsl(rgb) {
    //rgb为储存rgb颜色的长度为3的一维数组
    var r = rgb[0] / 255,
        g = rgb[1] / 255,
        b = rgb[2] / 255;
    var min = Math.min.apply(Array, [r, g, b]),
        max = Math.max.apply(Array, [r, g, b]);
    var h, s, l;
    //计算h的值
    if (max == min) {
        h = 0;
    }
    else if (max == r && g >= b) {
        h = 60 * (g - b) / (max - min);
    }
    else if (max == r && g < b) {
        h = 60 * (g - b) / (max - min) + 360;
    }
    else if (max == g) {
        h = 60 * (b - r) / (max - min) + 120;
    }
    else if (max == b) {
        h = 60 * (r - g) / (max - min) + 240;
    }
    //计算l的值
    l = (max + min) / 2;
    //计算s的值
    if (l == 0 || max == min) {
        s = 0;
    }
    else if (l > 0 && l <= 0.5) {
        s = (max - min) / (2 * l);
    }
    else if (l > 0.5) {
        s = (max - min) / (2 - 2 * l);
    }

    return [Math.round(h), Math.round(s * 100) / 100, Math.round(l * 100) / 100];

}


//用于显示数据的RGBHSL
function showData(arrRgb) {
    R.value=parseFloat(arrRgb[0])
    G.value=parseFloat(arrRgb[1])
    B.value=parseFloat(arrRgb[2])
    var arrHsl=rgbChangeIntohsl(arrRgb)
    H.value=parseFloat(arrHsl[0])
    L.value=parseFloat(arrHsl[1])
    S.value=parseFloat(arrHsl[2])
    console.log(arrHsl)
}


function getBarColor() {
    var barH=barPointer.style.top
    var spa=400/6
    var remain=parseFloat(barH)%spa
    var item=Math.floor(parseFloat(barH)/spa)

    console.log('item:'+item+'    remain:'+remain)


    //判断当前的rgb
    var rgb=[]
    var per=remain/spa
// console.log()

    switch (item+1){

        case 1:{
            rgb=[255,255*per,0]
            break
        }
        case 2:{
            rgb=[255-255*per,255,0]
            break
        }
        case 3:{
            rgb=[0,255,255*per]
            break
        }
        case 4:{
            rgb=[0,255-255*per,255]
            break
        }
        case 5:{
            rgb=[255*per,0,255]
            break
        }
        case 6:{
            rgb=[255,0,255-255*per]
            break
            }

    }

    return rgb
}


//点击Bar以后,改变barPointer 的位置,获取位置的颜色值,设置colorShoW区域的渐变颜色,然后重新获取showPointer位置的颜色
bar.onclick=function (event) {

    console.log('bar被点击'+event.clientY)

    //改变barPointer位置

    var mouseH=event.clientY
    barPointer.style.top=mouseH+'px'


    //获取 bar的颜色值
    var rgb= getBarColor()


    // console.log('switch之后的rgb:'+rgb)

    //改变colorShow区域 的颜色
    choosed.style.background=arrToBack(rgb)

    //重新花去colorShow被选中的颜色
    var newColor=getColorShowColor()

}

//滑动时颜色的变化
//xy,相对与左上角
function colorChange(arr,x,y) {

    for(var i=0;i<arr.length;i++){

        arr[i]=arr[i]+(255-arr[i])*(x)/400
        arr[i]=arr[i]-arr[i]*y/400
    }
// console.log(arr)
    return arr
}


function getColorShowColor() {

    var barRgb=getBarColor()

    var newColor=colorChange(barRgb,parseFloat(colorPointer.style.left),parseFloat(colorPointer.style.top))
    showData(newColor)
    return newColor
}





//z-index高,只能点击到它
black.onclick=function (event) {

    var mouseInColorShowX=event.clientX-colorShow.style.left
    var mouseInColorShowY=event.clientY-colorShow.style.top

    // console.log('colorShow被点击'+mouseInColorShowX)

    colorPointer.style.top=mouseInColorShowY+'px'
    colorPointer.style.left=mouseInColorShowX+'px'





    var colorShowRgb=getColorShowColor()


    console.log('barColor:'+arrToBack(colorShowRgb))


}






    





