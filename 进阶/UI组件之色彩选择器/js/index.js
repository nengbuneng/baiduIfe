// 红（R：255 G：0 B：0）1
// 橙（R：255 G：156 B：0）2
// 黄（R：255 G：255 B：0）3
// 绿（R：0 G：255 B：0）4
// 青（R：0 G：255 B：255）5
// 蓝（R：0 G：0 B：255）6
// 紫（R：255 G： B：255）7

function Color(x, y, h) {
    this._colorX = x
    this._colorY = y
    this._barY = h

    this._squ2 = 1.41
    this.spa = 66.67

    this.barColor = {
        r: 0,
        g: 0,
        b: 0,


    }
    this.color = {
        r: 0,
        g: 0,
        b: 0,
    }       //获得颜色rgb值

    this.hsl = []

}

Color.prototype = {

    rgbToHsl: function () {
        var r = color.color.r
        var g = color.color.g
        var b = color.color.b
        r /= 255
        g /= 255
        b /= 255
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return hsl = [h, s, l];
    },


    toRGB: function (obj) {
        return 'rgb(' + obj.r + ',' + obj.g + ',' + obj.b + ')'
    },
    getColor: function () {
        var percent = -((400 - parseInt(this._colorX) - parseInt(this._colorY)) / 400)
        this.getBarColor()


        this.color.r = this.barColor.r + percent * 255
        this.color.g = this.barColor.g + percent * 255
        this.color.b = this.barColor.b + percent * 255

        if (this.color.r > 255) {
            this.color.r = 255
        }
        if (this.color.g > 255) {
            this.color.g = 255
        }
        if (this.color.b > 255) {
            this.color.b = 255
        }

        if (this.color.r < 0) {
            this.color.r = 0
        }
        if (this.color.g < 0) {
            this.color.g = 0
        }
        if (this.color.b < 0) {
            this.color.b = 0
        }
        this.rgbToHsl()
        return this.color

    },
    // 获取颜色
    getBarColor: function () {

        // console.log(parseInt(this._barY / this.spa)+1+'  '+this._barY % this.spa)

        switch (parseInt(this._barY / this.spa) + 1) {
            case 1:
            {
                this.barColor = {
                    r: 255,
                    g: parseInt(156 * (color._barY % color.spa) / 66),
                    b: 0
                }

                break
            }
            case 2:
            {
                this.barColor = {
                    r: 255,
                    g: parseInt(156 + 99 * (color._barY % color.spa) / 66),
                    b: 0
                }

                break

            }
            case 3:
            {
                this.barColor =
                {
                    r: 255 - parseInt(255 * (color._barY % color.spa) / 66),
                    g: 255,
                    b: 0
                }

                break
            }
            case 4:
            {
                this.barColor = {
                    r: 0,
                    g: 255,
                    b: parseInt(255 * (color._barY % color.spa) / 66)
                }

                break
            }
            case 5:
            {
                this.barColor = {
                    r: 0,
                    g: 255 - parseInt(255 * (color._barY % color.spa) / 66),
                    b: 255
                }

                break
            }
            case 6:
            {
                this.barColor = {
                    r: parseInt(255 * (color._barY % color.spa) / 66),
                    g: 0,
                    b: 255,
                }

                break
            }
            case 7:
            {
                this.barColor = {
                    r: 255,
                    g: 0,
                    b: 255,
                }
                break
            }

        }


        return 'rgb(' + this.barColor.r + ',' + this.barColor.g + ',' + this.barColor.b + ')'


    },


}

var color = new Color()

var colorShow = document.getElementById('colorShow')
var bar = document.getElementById('bar')
var colorPointer = document.getElementById('colorPointer')
var barPoint = document.getElementById('barPoint')
colorShow.style.background = '-webkit-linear-gradient(-45deg, white ,red,black)'

//获取input
var r = document.getElementById('RInput')
var g = document.getElementById('GInput')
var b = document.getElementById('BInput')

var h = document.getElementById('HInput')
var s = document.getElementById('SInput')
var l = document.getElementById('LInput')
console.log(r)

//给各种Point一个处世的值
function init() {
    barPoint.style.top = 0 + 'px'
    colorPointer.style.top = 200 + 'px'
    colorPointer.style.left = 200 + 'px'

}

init()

function changeColor() {
    console.log(color.hsl)


    color._barY = parseInt(barPoint.style.top)


    colorShow.style.background = '-webkit-linear-gradient(-45deg, white ,' + color.getBarColor() + ',black)'

    getColot()


}


function getColot() {


    color._barY = parseInt(barPoint.style.top)


    color._colorY = parseInt(colorPointer.style.top)
    color._colorX = parseInt(colorPointer.style.left)

    r.value = color.getColor().r
    g.value = color.getColor().g

    b.value = color.getColor().b


    h.value = color.hsl[0]
    s.value = color.hsl[1]
    l.value = color.hsl[2]


}

//bar的拖拽,改变颜色
var canDrapInbar = null
var canDrapIncolor = null

colorShow.onmousedown = function (event) {
    canDrapIncolor = getColot
}

colorShow.onmousemove = function (event) {

    if (canDrapIncolor) {

        //改变colorPointer位置
        var mouseInColorX = event.clientX - colorShow.offsetLeft
        var mouseInColorY = event.clientY - colorShow.offsetTop

        colorPointer.style.top = mouseInColorY + 'px'
        colorPointer.style.left = mouseInColorX + 'px'


        canDrapIncolor()

    }
}

colorShow.onmouseup = function (event) {
    canDrapIncolor = null
}


bar.onmousedown = function () {
    canDrapInbar = changeColor
}
bar.onmousemove = function (event) {

    if (canDrapInbar) {
        var mouseInBarX = event.clientX - bar.offsetLeft
        var mouseInBarY = event.clientY - bar.offsetTop


        barPoint.style.top = mouseInBarY + 'px'
        canDrapInbar()
    }
}
bar.onmouseup = function () {
    canDrapInbar = null
}









