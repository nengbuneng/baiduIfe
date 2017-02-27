## WebGL No.1 - Three.js 入门

> WebGL的渲染是需要HTML5 Canvas元素



# Three.js

> 3D javaScript库。Three.js封装了底层的图形接口，能大大简化WebGL的开发



## 引入three.js

- 下载引用

  ```
  <script type="text/javascript" src="js/three.js"></script>
  ```

- cdn引用

  ```htm
  <script src="http://cdn.bootcss.com/three.js/r83/three.min.js"></script>
  ```

  ​

产生全局变量`THREE`



**注意**

- 和别的操作DOM的js不同，他并不需要DOM都加载以后在加载，所以放在`<head>`中
- 并且他需要在使用`THREE`变量之前引入

## Three.js组成

### 渲染器（Renderer）

渲染器将和Canvas元素进行绑定。

1. 绑定HTML中已有的`canvas`

```javascript
var renderer=new THREE.WebGLRender({
  canvas:document.getElementById('mainCanvas')
})
```

2. 使用Thress.js生成`canvas`,`(renderer.domElement`指向该标签，然后`appendChild()`到DOM中

```javascript
var renderer=new THREE.WebGLRenderer()
renderer.setSize(400,300)
document.getElementByTagName('body')[0].appendChild(renderer.domElement)
```



#### renderer属性和方法

`renderer.setCleraColor()`

设置`canvas`的背景色

参数为一个十六进制的颜色，是`0x`开头，而不是`#`

`renderer.render(scene,camera)`

渲染结果

第一个参数是场景，第二个参数是相机

### 场景（Scene）

> 是一个容器，盛放Three.js添加的物体

#### 初始化

```javascript
var scene = new THREE.Scene();
```

#### scene属性和方法

`scene.add()`

将传入参数指向的物体添加到场景中



### 照相机（Camera）

#### 什么是照相机

Three.js创建的场景是三维的，而通常情况下显示屏是二维的。照相机就是这样一个抽象，它定义了三维空间到二维屏幕的投影方式。



![mark](http://okwdz16o9.bkt.clouddn.com/blog/20170224/185621258.png)



被添加到场景中

#### 坐标系

webGL和Three.js中的坐标系

![mark](http://okwdz16o9.bkt.clouddn.com/blog/20170224/184135876.png)

#### 初始化

##### 透视相机

```javascript
var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 1000);
camera.position.set(0, 0, 5);
scene.add(camera);
```



##### 参数的意义

```javascript
THREE.PerspectiveCamera(fov, aspect, near, far)
```

`fov`是视景体竖直方向上的张角（是角度制而非弧度制），如侧视图所示。

`aspect`等于`width / height`，是照相机水平方向和竖直方向长度的比值，通常设为Canvas的横纵比例。

`near`和`far`分别是照相机到视景体最近、最远的距离，均为正值，且`far`应大于`near`。





![mark](http://okwdz16o9.bkt.clouddn.com/blog/20170224/191536465.png)



![mark](http://okwdz16o9.bkt.clouddn.com/blog/20170224/192205919.png)

![mark](http://okwdz16o9.bkt.clouddn.com/blog/20170224/192224279.png)



##### 正交投影相机

```javascript
THREE.OrthographicCamera(left, right, top, bottom, near, far)
```

六个参数分别代表正交投影照相机拍摄到的空间的六个面的位置，这六个面围成一个长方体，我们称其为**视景体**（Frustum）。只有在视景体内部（下图中的灰色部分）的物体才可能显示在屏幕上，而视景体外的物体会在显示之前被裁减掉。

类似定义了一个能够显示出来的区域

###### 参数的意义

值*100px是实际的像素

值的意义，假象`canvas`的宽就是((right-left)*100px)。那么如果小于实际的宽，那么物体呈现出来的图像将被拉长，相反如果大于`canvas`的宽，那么将被压缩

而中心点，默认是`canvas`的中心，那么如果((right-left)*100px)等于`canvas`的宽，但是向左移动了，那么物体相对的会向右移动

###### 参数的设置

为了保持照相机的横竖比例，需要保证`(right - left)`与`(top - bottom)`的比例与Canvas宽度与高度的比例一致。

`near`与`far`都是指到照相机位置在深度平面的位置，而照相机不应该拍摄到其后方的物体，因此这两个值应该均为正值。为了保证场景中的物体不会因为太近或太远而被照相机忽略，一般`near`的值设置得较小，`far`的值设置得较大，具体值视场景中物体的位置等决定。

![mark](http://okwdz16o9.bkt.clouddn.com/blog/20170224/185826969.png)



**单词**

- perspective:透视

#### camera属性和方法

`camera.position.set()`

设置相机的位置

`camera.lookAt(new THREE.Vector3(0, 0, 0));`

默认相机是看相`z`负方向，如果改变了相机位置，那么他仍然，看相`z`负方向，将看不到图像。

`new THREE.Vector3(0, 0, 0)`

设置相机的方向从，相机位置，看相`(0,0,0)`点



### 实例：创建一个长方体

```javascript
var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 3),
        new THREE.MeshBasicMaterial({
            color: 0xff0000
        })
);
scene.add(cube);
```

**单词**

- mesh:网状物
- cube:立方体
- geometry:几何体
- material:材料

1，2，3代表的是在x,y,z方向上的长度，是一个相对长度，也像素无关





## 创建物体

> 在创建物体时，需要传入两个参数，一个是几何形状（Geometry），另一个是材质（Material）
>
> WebGL需要程序员指定每个顶点的位置，而在Three.js中，可以通过指定一些特征来创建几何形状，例如使用半径创建一个球体，从而省去程序员一个个指定顶点的工作量。

### 立方体

```javascript
THREE.CubeGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)
```

`width`是x方向上的长度；

`height`是y方向上的长度；

`depth`是z方向上的长度；

后面的三个参数分别是在三个方向上的上面三个值分段数，如`widthSegments`为`3`的话，代表x方向上水平分为三份，，后三个参数的缺省值为`1`

![mark](http://okwdz16o9.bkt.clouddn.com/blog/20170224/192945415.png)



### 平面

是一个面，有厚度

```javascript
THREE.PlaneGeometry(width, height, widthSegments, heightSegments)
```

`width`是x方向上的长度；

`height`是y方向上的长度；

后两个参数同样表示分段。

### 球体 (球面)

```javascript
THREE.SphereGeometry(radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength)
```

`radius`是半径；

`segmentsWidth`表示经度上的切片数；

`segmentsHeight`表示纬度上的切片数；

`phiStart`表示经度开始的弧度；

`phiLength`表示经度跨过的弧度；

`thetaStart`表示纬度开始的弧度；

`thetaLength`表示纬度跨过的弧度。

#### 经度弧度

`new THREE.SphereGeometry(3, 8, 6, Math.PI / 6, Math.PI / 3)`表示起始经度为`Math.PI / 6`，经度跨度为`Math.PI / 3`。效果如下：

![mark](http://okwdz16o9.bkt.clouddn.com/blog/20170224/193320029.png)

#### 纬度弧度

```javascript
new THREE.SphereGeometry(3, 8, 6, 0, Math.PI * 2, Math.PI / 6, Math.PI / 3)
```



意味着纬度从`Math.PI / 6`跨过`Math.PI / 3`。

![mark](http://okwdz16o9.bkt.clouddn.com/blog/20170224/193427328.png)

### 圆形

```javascript
THREE.CircleGeometry(radius, segments, thetaStart, thetaLength)
```

```javascript
new THREE.CircleGeometry(3, 18, Math.PI / 3, Math.PI / 3 * 4)
```

可以创建一个在x轴和y轴所在平面的三分之二圆的扇形：

![mark](http://okwdz16o9.bkt.clouddn.com/blog/20170224/193523063.png)

### 圆柱体

```javascript
THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
```



`radiusTop`与`radiusBottom`分别是顶面和底面的半径，由此可知，当这两个参数设置为不同的值时，实际上创建的是一个圆台；`height`是圆柱体的高度；`radiusSegments`与`heightSegments`可类比球体中的分段；`openEnded`是一个布尔值，表示是否没有顶面和底面，缺省值为`false`，表示有顶面和底面。



```javascript
new THREE.CylinderGeometry(2, 2, 4, 18, 3)
```

![mark](http://okwdz16o9.bkt.clouddn.com/blog/20170224/193618225.png)

### 圆台

将底面半径设为`3`创建一个圆台：

```javascript
new THREE.CylinderGeometry(2, 3, 4, 18, 3)
```

效果如下：

![mark](http://okwdz16o9.bkt.clouddn.com/blog/20170224/193705729.png)

`new THREE.CylinderGeometry(2, 3, 4, 18, 3, true)`将创建一个没有顶面与底面的圆台，效果如下：

![mark](http://okwdz16o9.bkt.clouddn.com/blog/20170224/193723440.png)





### 正四面体、正八面体、正二十面体

```javascript
THREE.TetrahedronGeometry(radius, detail)
THREE.OctahedronGeometry(radius, detail)
THREE.IcosahedronGeometry(radius, detail)
```

`radius`是半径；`detail`是细节层次（Level of Detail）的层数，对于大面片数模型，可以控制在视角靠近物体时，显示面片数多的精细模型，而在离物体较远时，显示面片数较少的粗略模型。

```javascript
new THREE.TetrahedronGeometry(3)
```

![mark](http://okwdz16o9.bkt.clouddn.com/blog/20170224/193822728.png)





### 圆环面

```javascript
THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)
```

![mark](http://okwdz16o9.bkt.clouddn.com/blog/20170224/193859854.png)

`radius`是圆环半径；`tube`是管道半径；`radialSegments`与`tubularSegments`分别是两个分段数，详见上图；`arc`是圆环面的弧度，缺省值为`Math.PI * 2`。

`new THREE.TorusGeometry(3, 1, 4, 8)`创建一个粗糙的圆环面：

![mark](http://okwdz16o9.bkt.clouddn.com/blog/20170224/193942123.png)



`new THREE.TorusGeometry(3, 1, 12, 18)`创建一个较为精细的圆环面：

![mark](http://okwdz16o9.bkt.clouddn.com/blog/20170224/193957944.png)



### 字体形状

使用文字形状需要下载和引用额外的字体库。例如`helvetiker_regular.typeface.json`文件放在目录下.

如果是cdn直接，加载一个网址

```javascript
var loader = new THREE.FontLoader();
loader.load('../lib/helvetiker_regular.typeface.json', function(font) {
    var mesh = new THREE.Mesh(new THREE.TextGeometry('Hello', {
        font: font,
        size: 1,
        height: 1
    }), material);
    scene.add(mesh);

    // render
    renderer.render(scene, camera);
});
```





#### 构造函数

```javascript
THREE.TextGeometry(text, parameters)
```

`text`是文字字符串，`parameters`是以下参数组成的对象：

- `size`：字号大小，一般为大写字母的高度
- `height`：文字的厚度
- `curveSegments`：弧线分段数，使得文字的曲线更加光滑
- `font`：字体，默认是`'helvetiker'`，需对应引用的字体文件
- `weight`：值为`'normal'`或`'bold'`，表示是否加粗
- `style`：值为`'normal'`或`'italics'`，表示是否斜体
- `bevelEnabled`：布尔值，是否使用倒角，意为在边缘处斜切
- `bevelThickness`：倒角厚度
- `bevelSize`：倒角宽度

### 自定义形状





## 材质

> 材质（Material）是独立于物体顶点信息之外的与渲染效果相关的属性。通过设置材质可以改变物体的颜色、纹理贴图、光照模式等。

### 基本材质

基本材质，即使改变场景中的光源，使用该材质的物体也始终为颜色处处相同的效果

#### 构造函数

```javascript
THREE.MeshBasicMaterial(opt)
```

##### opt常用

- visible`：是否可见，默认为`true`
- `side`：渲染面片正面或是反面，默认为正面`THREE.FrontSide`，可设置为反面`THREE.BackSide`，或双面`THREE.DoubleSide`
- `wireframe`：是否渲染线而非面，默认为`false`
- `color`：十六进制RGB颜色，如红色表示为`0xff0000`
- `map`：使用纹理贴图

### Lambert材质

符合Lambert光照模型的材质。Lambert光照模型的主要特点是只考虑漫反射而不考虑镜面反射的效果，因而对于金属、镜子等需要镜面反射效果的物体就不适应，对于其他大部分物体的漫反射效果都是适用的。

#### 构造函数

```javascript
new THREE.MeshLambertMaterial(opt)
```

##### opt

- `color`是用来表现材质对散射光的反射能力，也是最常用来设置材质颜色的属性。
- `ambient`表示对环境光的反射能力，只有当设置了`AmbientLight`后，该值才是有效的，材质对环境光的反射能力与环境光强相乘后得到材质实际表现的颜色。
- `emissive`是材质的自发光颜色，可以用来表现光源的颜色。单独使用红色的自发光



### Phong材质

> 符合Phong光照模型的材质。和Lambert不同的是，Phong模型考虑了镜面反射的效果，因此对于金属、镜面的表现尤为适合。

镜面反射部分的模型为：

```
 Ispecular = Ks * Is * (cos(alpha)) ^ n
```

#### 构造函数

```javascript
new THREE.MeshPhongMaterial(opt);
```

##### 例如

#### opt

- `specular`值指定镜面反射系数作说明
- `color`是用来表现材质对散射光的反射能力，也是最常用来设置材质颜色的属性。
- `ambient`表示对环境光的反射能力，只有当设置了`AmbientLight`后，该值才是有效的，材质对环境光的反射能力与环境光强相乘后得到材质实际表现的颜色。
- `emissive`是材质的自发光颜色，可以用来表现光源的颜色。单独使用红色的自发光

```javascript
var material = new THREE.MeshPhongMaterial({
    specular: 0xff0000
});
var sphere = new THREE.Mesh(new THREE.SphereGeometry(3, 20, 8), material);
```

![mark](http://okwdz16o9.bkt.clouddn.com/blog/20170224/195314890.png)

`shininess`值越大时，高光的光斑越小，默认值为`30`。我们将其设置为`1000`时：

```javascript
new THREE.MeshPhongMaterial({
    specular: 0xff0000,
    shininess: 1000
});
```

![mark](http://okwdz16o9.bkt.clouddn.com/blog/20170224/195405303.png)



### 法向材质

> 将材质的颜色设置为其法向量的方向，有时候对于调试很有帮助。

#### 构造函数

```javascript
new THREE.MeshNormalMaterial()
```



观察的角度不同，物体的颜色就不同了。因此，在调试时，要知道物体的法向量，使用法向材质就很有效。





### 纹理贴图



