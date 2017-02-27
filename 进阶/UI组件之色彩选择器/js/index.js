// 红（R：255 G：0 B：0）
// 橙（R：255 G：156 B：0）
// 黄（R：255 G：255 B：0）
// 绿（R：0 G：255 B：0）
// 青（R：0 G：255 B：255）
// 蓝（R：0 G：0 B：255）
// 紫（R：255 G： B：255）



var colorShow=document.getElementById('colorShow')
var bar=document.getElementById('bar')
var colorPointer=document.getElementById('colorPointer')
var barPoint=document.getElementById('barPoint')
colorShow.style.background='-webkit-linear-gradient(-45deg, white ,red,black)'


colorShow.onclick=function (event) {
    var mouseInColorX=event.clientX-colorShow.offsetLeft
    var mouseInColorY=event.clientY-colorShow.offsetTop


    colorPointer.style.left=mouseInColorX+'px'
    colorPointer.style.top=mouseInColorY+'px'
    console.log(mouseInColorX+'  '+mouseInColorY+'  '+ colorPointer.style.top)
}

bar.onclick=function (event) {
    var mouseInBarX=event.clientX-bar.offsetLeft
    var mouseInBarY=event.clientY-bar.offsetTop


    // barPoint.style.left=mouseInBarX+'px'
    barPoint.style.top=mouseInBarY+'px'


console.log(barPoint.style.top)
    colorShow.style.background='-webkit-linear-gradient(-45deg, white ,rgb(0,0,'+parseInt(barPoint.style.top)%100 +'0),black)'




}

