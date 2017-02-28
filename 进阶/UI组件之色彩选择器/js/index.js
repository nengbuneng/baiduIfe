


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
    return 'linear-gradient(to left, white,rgb('+parseInt(arr[0])+','+parseInt(arr[1])+','+parseInt(arr[2]) +'))'

}

function arrToRgb(arr) {
    return 'rgb('+parseInt(arr[0])+','+parseInt(arr[1])+','+parseInt(arr[2]) +')'
}

//用于显示数据的RGBHSL
function showData(arrRgb) {
    R.value=parseInt(arrRgb[0])
    G.value=parseInt(arrRgb[1])
    B.value=parseInt(arrRgb[2])

}


function getBarColor() {
    var barH=barPointer.style.top
    var spa=400/6
    var remain=parseInt(barH)%spa
    var item=Math.floor(parseInt(barH)/spa)

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
console.log(arr)
    return arr
}


function getColorShowColor() {

    var barRgb=getBarColor()

    var newColor=colorChange(barRgb,parseInt(colorPointer.style.left),parseInt(colorPointer.style.top))
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






    





