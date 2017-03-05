/**
 * Created by myth52125 on 17/3/5.
 */





//获取cavas
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

canvas.width = 600
canvas.height = 600


//获取画笔工具，但其实这个没什么用
var eraser = document.getElementById('eraser')
var eraserRect = document.getElementById('eraserRect')
var eraserArc = document.getElementById('eraserArc')
var brush = document.getElementById('brush')
var spray = document.getElementById('spray')

//获取集合
var tools = document.getElementsByName('tools')
var eraser = document.getElementsByName('eraser')


//橡皮边框
var eraserRectBorder = document.getElementById('eraserRectBorder')
var eraserArcBorder = document.getElementById('eraserArcBorder')

//定义笔刷，如果需要，然而也没有使用
brushStyle = {
    width: 8,
    height: 16,

}

//定义橡皮，如果需要，然而也没有使用
eraserStyle = {
    rect: eraserRectBorder,
    arc: eraserArcBorder,
    rectSize: [3, 6],
    arcSize: 6
}


//获取使用什么工具
function whatTool(tools) {
    var tool = {
        name: '',
        size: '',
        color: 'black',
        eraserStyle: ''
    }
    for (var i = 0; i < tools.length; i++) {
        console.log(tools[i].checked, tools[i].id)
        if (tools[i].checked == true) {
            tool.name = tools[i].id
            break
        }
    }

    var whatEraser = ''
    if (tool.name == 'eraser') {
        for (var i = 0; i < eraser.length; i++) {
            // console.log(eraser[i].checked, eraser[i].id)
            if (eraser[i].checked == true) {
                tool.eraserStyle = eraser[i].id
                break
            }
        }
    }
    // console.log(tool.eraserStyle)
    //返回的是个obj
    return tool
}


//和拖动，是否绘制相关
var paint = {
    tool: '',
    canPaint: 0,
}


canvas.onmousedown = function (event) {
    console.log('按下')
    paint.canPaint = 1
    paint.tool = whatTool(tools)

    if (paint.tool.name == 'eraser') {

    if (paint.tool.eraserStyle == 'eraserRect'){
        eraserStyle.rect.style.visibility = 'visible'
    }else {
        eraserStyle.arc.style.visibility = 'visible'
    }}

    console.log(eraserStyle.arc.style.visibility)
}


canvas.onmousemove = function (event) {
    event.preventDefault()

    // console.log(paint.canPaint)
    if (paint.canPaint == 1) {


        var mouseIncanvsX = event.clientX - canvas.getBoundingClientRect().left
        var mouseIncanvsY = event.clientY - canvas.getBoundingClientRect().top


        eraserStyle.arc.style.top = mouseIncanvsY + 'px'
        eraserStyle.arc.style.left = mouseIncanvsX + 'px'


        console.log(paint.tool.eraserStyle)

        if (paint.tool.name == 'brush') {

            context.beginPath()
            context.fillStyle = 'black'
            context.fillRect(mouseIncanvsX - brushStyle.width / 2, mouseIncanvsY - brushStyle.height / 2, brushStyle.width, brushStyle.height)


        }

        //橡皮。。。给橡皮加了个小边框
        if (paint.tool.name == 'eraser') {
            if (paint.tool.eraserStyle == 'eraserRect') {

                eraserStyle.rect.style.top = mouseIncanvsY + 'px'
                eraserStyle.rect.style.left = mouseIncanvsX + 'px'


                context.beginPath()
                context.fillStyle = 'white'
                context.fillRect(mouseIncanvsX - 3, mouseIncanvsY - 3, 6, 6)


            } else {

                eraserStyle.arc.style.top = mouseIncanvsY + 'px'
                eraserStyle.arc.style.left = mouseIncanvsX + 'px'


                context.beginPath()
                context.fillStyle = 'white'
                context.arc(mouseIncanvsX - 3, mouseIncanvsY - 3, 10, 0 * Math.PI, 2 * Math.PI)
                context.fill()
            }
        }

        if(paint.tool.name == 'spray'){
            console.log('hah')
            context.beginPath()
            context.fillStyle = 'red'
            for(var i=0;i<2;i++){
                context.arc(mouseIncanvsX +Math.random()*20-10, mouseIncanvsY +Math.random()*0-10, 1, 0 * Math.PI, 2 * Math.PI)
                context.fill()
            }



        }


    }


}


canvas.onmouseout = function (event) {
    paint.canPaint = 0
    eraserStyle.rect.style.visibility = 'hidden'
    eraserStyle.arc.style.visibility = 'hidden'
}

canvas.onmouseup = function (event) {
    paint.canPaint = 0
    eraserStyle.rect.style.visibility = 'hidden'
    eraserStyle.arc.style.visibility = 'hidden'
}





