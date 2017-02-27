## 任务四：定位和居中问题以及border

## 居中

### 方法一

> 同时水平和竖直

使用`position`,设置`top`和`left`都为`50%`

然后利用负边距，将div偏移一般

```html
        #main{
            width: 400px;
            height: 200px;
            background: #CCCCCC;
            position: absolute;
            top:50%;
            left:50%;
            margin-top: -100px;
            margin-left: -200px;
        }
```



## border-radius

### 常规设置

- 一个值：表示4个圆角都使用这个值
- 两个值：表示左上角和右下角使用第一个值
- 三个值：表示左上角使用第一个值，右上角和左下角使用第二个值，右下角使用第三个值
- 四个值：依次对应左上角、右上角、右下角、左下角（顺时针顺序）。

### 斜杠设置第二组值

- 第一组值表示水平半径，

- 第二组值表示垂直半径。

  第二组值也可以同时设置1到4个值，应用规则与第一组值相同。

### 单独设置每个角

- border-top-left-radius
- border-top-right-radius
- border-bottom-right-radius
- border-bottom-left-radius

可以设置一个或两只值

当两个值的时候表示水平和垂直半径



