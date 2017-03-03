/**
 * Created by myth52125 on 17/3/3.
 */


//获取元素
var canvas = document.getElementById('canvas')
var painterList = document.getElementById('painterList')
var list = document.getElementById('list')

var bgColor = document.getElementById('bgColor').value.trim()
var ptColor = document.getElementById('ptColor').value.trim()


//vancas设置宽度
canvas.width = 600
canvas.height = 600

var context = canvas.getContext('2d')

//设置每一个笔画的形式,虽然没用到,用的别的
function Painters() {
    this.id = 0;
    this.start = [];
    this.end = [];
    this.canPaint = 1;
}

//一个数组存储所有的笔画
painters = []

//获得点击的位置
var mouseInCanvasStart = {
    x: 0, y: 0, canCreate: 0
}
//获得鼠标拖动到的位置
var mouseInCancasEnd = {
    x: 0, y: 0
}

canvas.onmousedown = function (event) {
    console.log('canvas被点击')
    mouseInCanvasStart = {
        x: event.clientX - canvas.getBoundingClientRect().left,
        y: event.clientY - canvas.getBoundingClientRect().top,
        canCreate: 1
    }
}

canvas.onmousemove = function (event) {


    mouseInCancasEnd = {
        x: event.clientX - canvas.getBoundingClientRect().left,
        y: event.clientY - canvas.getBoundingClientRect().top
    }
    creating(mouseInCanvasStart, mouseInCancasEnd)


}


canvas.onmouseup = function (event) {
    createNewLine(mouseInCanvasStart, mouseInCancasEnd)

    //取消拖动
    mouseInCanvasStart.canCreate = 0


    updata()
    renderUl()
    addSwitch()


}
canvas.onmouseout = function (event) {
    mouseInCanvasStart.canCreate = 0
}


function creating(startObj, endObj) {

//当可以拖动时,显示
    if (startObj.canCreate == '1') {

        // console.log(startObj.canCreate)
        // console.log('正在绘制:('+startObj.x+','+startObj.y +')到('+endObj.x+','+endObj.y+')')
        context.clearRect(0, 0, 600, 600)
        updata()
        context.beginPath()
        context.moveTo(startObj.x, startObj.y)
        context.lineTo(endObj.x, endObj.y)
        context.strokeStyle = 'black'
        context.stroke()


    }
}


//重新绘制每一笔画
function updata() {

    var bgColor = document.getElementById('bgColor').value.trim()



    context.clearRect(0, 0, 600, 600)

    context.beginPath()
    if (bgColor) {
        context.fillStyle = bgColor
    } else {
        context.fillStyle = 'white'
    }
    context.fillRect(0, 0, canvas.width, canvas.height)


    for (var i = 0; i < painters.length; i++) {
        // console.log(painters[i].canPaint)

        if (painters[i].canPaint == 1) {
            context.beginPath()
            context.moveTo(painters[i].start[0], painters[i].start[1])
            context.lineTo(painters[i].end[0], painters[i].end[1])


                context.lineWidth=painters[i].width





                context.strokeStyle = painters[i].color


            context.stroke()
        }
        context.fill()
        // console.log('正在重画')
    }


}



//像前面的笔画数组中添加新的笔画,每一笔都有单独的宽和颜色
function createNewLine(mouseInCanvasStart, mouseInCancasEnd) {


    var ptColor = document.getElementById('ptColor').value.trim()
    var ptWidth=parseInt(document.getElementById('ptWidth').value)

    painters.push({
        id: painters.length + 1,
        start: [mouseInCanvasStart.x, mouseInCanvasStart.y],
        end: [mouseInCancasEnd.x, mouseInCancasEnd.y],
        canPaint: 1,
        width:(ptWidth)?ptWidth:5,
        color:(ptColor)?ptColor:'black'
    })


    // console.log(painters[0].start + "   " + mouseInCanvasStart.x)
}


//生成列表
function renderUl() {


    //取消绑定的事件
    var input=document.getElementsByTagName('input')
    for(var i=0;i<input.length;i++){
        input[i].onclick=null
    }

    //重新绘制ul之前,删除已有内容
    list.innerHTML = ''

    //重新绘制ul
    for (var i = 0; i < painters.length; i++) {
        var li = document.createElement('li')
        li.name = 'order'

        var ipt = document.createElement('input')
        ipt.type = 'button'
        ipt.name = 'canHidden'
        if (painters[i].canPaint == 1) {
            ipt.value = '隐藏'
        } else {
            ipt.value = '显示'
        }

        var del = document.createElement('input')
        del.type = 'button'
        del.name = 'del'
        del.value = '删除'


        var order = document.createElement('input')
        order.type = 'button'
        order.name = 'order'
        order.value = '提升'

        var text = document.createTextNode('我是第' + painters[i].id + '条线')


        li.appendChild(ipt)
        li.appendChild(text)
        li.appendChild(del)
        li.appendChild(order)
        list.appendChild(li)
    }


}

//添加隐藏,排序,删除
function addSwitch() {


    var canHiddens = document.getElementsByName('canHidden')

    if (canHiddens.length > 0) {
        for (var i = 0; i < canHiddens.length; i++) {
            // console.log(i)

            canHiddens[i].i = i
            canHiddens[i].onclick = function () {
                // console.log(this.i)


                if (canHiddens[this.i].value == '隐藏') {

                    canHiddens[this.i].value = '显示'
                    painters[this.i].canPaint = 0

                } else {

                    canHiddens[this.i].value = '隐藏'
                    painters[this.i].canPaint = 1
                }

                // console.log(painters[this.i].canPaint)
                updata()
            }


        }
    }


    var dels = document.getElementsByName('del')

    if (dels.length > 0) {
        for (var i = 0; i < dels.length; i++) {
            // console.log(i)

            dels[i].i = i
            dels[i].onclick = function () {
                // console.log(this.i)

                painters.splice(this.i, 1)


                //每次点击完以后都要重新绘制,重新添加事件
                updata()
                renderUl()
                addSwitch()
            }


        }
    }

    var order = document.getElementsByName('order')

    if (order.length > 1) {
        for (var i = 1; i < order.length; i++) {


            order[i].i = i
            order[i].onclick = function () {

                console.log('haha')

                var temp = painters[this.i - 1]

                painters[this.i - 1] = painters[this.i]
                painters[this.i] = temp

                //每次点击完以后都要重新绘制,重新添加事件
                updata()
                renderUl()
                addSwitch()



            }


        }
    }


}

