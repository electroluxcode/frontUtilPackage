

# 1.ts 基础的学习

目的：明确输出输入。快速定位bug

```
npm install  typescript -g
npm install  ts-node -g

tsc --init
ts-node .\index.ts
node .\index.ts
```



## 1.1  基本类型

```js
string
number
boolean

//知识点1：基本类型
let param: string = "测试"; //number boolean
// console.log(param);
```



## 1.2  数组元组



```ts
// 知识点2：数组 / 元组（用的少）let x: [string, number];/枚举（不如object 但是这里object 好像用不了） enum Color {Red = 1, Green, Blue} Color.Green;
// 两种数据声明方式
// let paramArray:string[] =["1","6"] 
let paramArray: Array<string> = ["1", "6"]
// console.log(paramArray);
```



## 1.3 方法



```js
// 知识点3：方法 string/void (返回值为空)
function add(): string {
    // console.log("测试");
    return "测试"
}
```



## 1.4 联合数据类型

```ts
// 知识点4：联合数据类型
let a: string | number = 2;
```



## 1.5 类型断言/接口

```typescript

// 知识点5：类型断言/接口
interface IUser {
    id:number,
    // 5.1表示这个变量可有可无（可选属性），不加？如果不加上name会报错
    // 5.2或者 使用的变量 加上 as Iuser(类型断言)
    name?: string,
    // 5.3只读属性(字面意思)
    readonly age:number;
    // 5.3只读属性(字面意思)
    callback1?:(admin:string) => string
    
}
//5.5函数 类型 （形参）
interface Ifunction{
    (source: string): void;
}
let ceshiFunction:Ifunction=(testParam)=>{
    console.log(testParam)
    return "dd"
}
// 1212
ceshiFunction("函数断言")
// 5.6 如果interface里面 想加入你的属性 ，就要用类型断言
let b:IUser = {
    id: 45,
    age:8,
    name1:12,
    callback1:(test:string):string=>{
        return test
    }
} as IUser ;
b.id=5
// 5.7默认值
b.callback1=(admin:string="100")=>{
    console.log(admin)
    return admin
}
b.callback1("断言45454545");
// b.age=5
// console.log(b)
// 接口使用可索引的类型还挺常见的：

// 5.8 array和object的序列判断
interface test{
    [index:number]:string
}
// let test1:test =[4] //报错  "4" 这样就不报错
// let test2:test ={id:1} //报错
// [index：number]:string  这样子就是数组
// [index：string]:string  这样子就是对象



```





## 1.6 object的使用

```ts
//知识点6：object 的使用。除了 基本类型的元素
// 多重嵌套也是这样
// [{id:1}]  {id:1}
function ce(o: object | null): void{
    console.log(o);
}

ce([{id:1}])

let data:object ={
    b
};
console.log(data)
```









# 2. 高级基础

## 2.1  类的使用

```ts
// ts 高级
// 知识点1：接口，class扩展用extend，继承用implement
// class用extend继承，下面有public private protect，都不能访问我们只能通过方法暴露出去
// getter setter 封装
class parentSuper {
    // 1.1 public protect和 private 关键字 // static先于我们new的对象而存在
    public param: string;
    constructor(message: string) {
        this.param = message
    }
    // 1.2get（get这个名字会出现 在console.log的时候） set 是在尝试给他赋值的时候会出现。
    // 这玩意相当于获取器
    get param1() {
        return "测试" + this.param
    }
    set param1(val: string) {
        this.param = "测试 set" + val
    }
    say = () => {
        // console.log(this.param1);
    }
}
// 1.3 继承和扩展
// let test= new parentSuper("class 类型的参数1111");
class grandpaSuper extends parentSuper {
    constructor(message: string) {
        super(message)
    }
}
new grandpaSuper("class 类型的参数1111").say()
// 抽象对象用来承担方法，extend后需要按照abstract的类型定义来实现方法。抽象类能给一个简单约束，能给一个函数基本的实现方法

// 1.4 命名空间/模块:跳过
// 导出export class as xxx






```





## 2.2 泛型的使用

```ts
// 知识点2:泛型
function ab<t>(str: t): t {
    return str
}
console.log(ab(46))

interface abcType {
    name: string,
    id: number
}

class abc<abcTyp>{
    //  知识点2.1重要这里 person:abcType 会报错 属性“person”没有初始化表达式，且未在构造函数中明确赋值
    // 在这种情况下，我们使用 ! 符号表示我们知道它myInput没有在构造函数中初始化，我们将在其他地方处理它
    // TypeScript 的 Strict Class Initialization 引起的。
    public person!: abcTyp

}
// console.log(ab(46))

```





## 2.3  装饰器



### 2.3.0实操

防抖节流封装

```ts

防抖
function debounce(time: number = 0.3) {
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        let fn = descriptor.value;
        window.flag =null;
        descriptor.value = function (...args: any[]) {
            clearTimeout(window.flag)
                window.flag=setTimeout(()=>{
                    fn()
            },time)
        }
        return descriptor
    }
}

```











### 2.3.1类装饰器

```ts
// 知识点3:装饰器(套了一层新功能)
// 装饰器
// 装饰器功能：
// 3.1 能力扩展（@的函数只写了prototype）-类装饰器: 
// ClassDecorator-传参传一个constructor: Function就可以了,如果还要传一个参数
const action: ClassDecorator = (constructor: Function) => {
    constructor.prototype.say = () => {
        return "我在说话"
    }
    constructor.prototype.run = () => {
        return "我在跑步"
    }
    constructor.prototype.params = ["手","脚"]
}

@action
class person {}

// TS 无法为装饰器提供类型保护 ，这个属于常年的bug
//@ts-ignore  后必须有这玩意（@ts-ignore）
console.log(new person().run,new person().params)




// 3.2能力扩展-重载构造函数-类
const action1 = (constructor: any) => {

    return class extends constructor { // 返回一个target的继承，进行一个扩展
        action: any = '我在重载构造函数'
        getData() {
            this.action = '我在重载构造函数' + '----';
            return (this.action) // 我是构造函数里的apiYrl----
        }
    }
}

@action1
class person1 {
    public action: string;
    constructor() {
        this.action = "我在喝水"
    }
}
//@ts-ignore  后必须有这玩意（@ts-ignore）
console.log(new person1().getData())



// 3.3 能力扩展-增加xxx参数或者方法-传参写法-类: 
const actionParams = (params: string) => {
    return function (target: any) {
        // 返回的target就是调用本装饰器的类（返回class）
        // console.log(target)
        // 返回参数 输出 "我在游泳"
        // console.log(params)
        target.prototype.action = params; 
    }
}
@actionParams("我在游泳")
class person2 {
}
console.log(new person2().action)  
```



### 2.3.2  方法装饰器

```ts
// 3.4 能力扩展-不传参写法-function 里面的 方法

// 方法装饰器接受三个参数：
// 对于静态方法，第一个参数为类的构造函数。对于实例方法，为类的prototype（target）
// 第二个参数为方法名（key）。
// 第三个参数为方法描述符（descriptor）。
// 实参示例：方法名: MethodDecorator= (target: Object, key: string | symbol, descriptor: PropertyDescriptor) 


const addSkill: MethodDecorator = (target: any, key: string | symbol, descriptor: PropertyDescriptor) => {
    
    //这个origin可以拿到下面装饰方法的数据
    const origin = descriptor.value;
    // console.log(descriptor)
    descriptor.value = function (...args:any) {
        //这一段是覆盖原来的方法
        console.log("参数重新写一下",...args)

        // 执行原来的方法，可以考虑在这里加上一个 xx.call方法
        origin.call(this,...args)
    };
}
class Person {
    public name: string;
    constructor() {
        this.name = "小明"
    }
    @addSkill
    skill(a:any) {
        console.log("原来的参数",a);
    }

}


let c = new Person();
c.skill("sd");
// 输出 
//参数重新写一下 sd
//原来的参数 sd
//@ts-ignore  后必须有这玩意（@ts-ignore）
// new Person.skill(); // 静态方法生效，class中的方法前面加一个static，person不用实例化然后里面也有值了。target 这时能输出class



//-------------------------------------------------------------------------------------------
// 3.5 能力扩展-传参写法- function（节流是很合适的）
const addSkill1 = (target: any) => {
    
    console.log(target)
}
const actionParams1 = (params: string) => {
    return function () {
        console.log("带参数的方法参数是：",params)
    }
}
class Person1 {
    public name: string;
    constructor() {
        this.name = "小明"
    }
    //@ts-ignore  后必须有这玩意（@ts-ignore）
    @actionParams1("测试")
    skill1(a:any) {
        console.log("带参数的测试 原来的参数",a);
    }

}

let c2 = new Person1();
// c2.skill1.prototype.test="sad"
c2.skill1("sd"); 
//输出 
//带参数的方法参数是： 测试
//带参数的测试 原来的参数 sd


```











### 2.3.3 descriptor



```ts

// 4.descriptor修改
const descriptor: MethodDecorator = (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor): object => {
    return {
        value: () => {
            console.log('descriptor修改方法被替换')
        },
        writable: false,
        enumerable: true,
        configurable: true,
    };
}

class desCase {
    name = 'peiqi';
    @descriptor
    eat() {

    }
}
new desCase().eat()
//输出    descriptor修改方法被替换
```





## 2.4 object(record)约束

通过这玩意可以约束object的类型

```ts
// 高级：如果我们要定义一个对象的key和value

interface PageInfo {
    title: string;
    id?:number
}
type Page = "home" | "about" | "contact" | string;

// 知识点1：定义一个对象的key，value值。前面的是type（意味着在要key必须是这个type）.
// 知识点1.1 Record后面的泛型就是对象键和值的变量名和类型值
const nav: Record<Page, PageInfo> = {
    about: { title: "about2" },
    contact: { title: "contact" },
    home: { title: "home" },
};

type NewIndex = "name" | "age" | "id"

//知识点1.2第二个参数给interface类型
const NewObject: Record<NewIndex, PageInfo> = {
    name: { title: "about2",id:5 },
    id: { title: "contact" },
    age: { title: "home" },
};

//知识点1.3第二个参数直接给基础类型
const New1Object: Record<NewIndex, number> = {
    name: 2,
    id: 3,
    age:7,
};


// 看到评论区好像有一种更好的方法 试过后不好用
const obj: { [key: string ] : number } = {}
```



## 2.5 Partial(属性全部可选)

生成一个新类型，该类型与 T 拥有相同的属性，但是所有属性皆为可选项

```ts
interface Foo {
    name: string
    age: number
}
type Bar = Partial<Foo>
// 相当于
type Bar = {
    name?: string
    age?: number
}
```



## 2.6 Required(属性全部必选)

生成一个新类型，该类型与 T 拥有相同的属性，但是所有属性皆为必选项

```ts
interface Foo {
    name: string
    age?: number
}
type Bar = Required<Foo>
// 相当于
type Bar = {
    name: string
    age: string
}
```

## 2.7 readonly

```ts
interface Foo {
    name: string
    age: number
}
type Bar = Readonly<Foo>
// 相当于
type Bar = {
    readonly name: string
    readonly age: string
}

```



## 2.8 Pick(属性取合集)

```ts
interface Foo {
    name: string;
    age?: number;
    gender: string;
}
type Bar = Pick<Foo, 'age' | 'gender'>
// 相当于
// type Bar = {
//     age?: number
//     gender: string
// }

// const todo: Bar= {
//    age: 3,
//    gender: "男"
// };
// console.log(todo)
```



## 2.9  类型体操里面可能会用



```ts
// 1.Exclude 返回string 差集 Extract  并集
type A = number | string | boolean
type B = number | boolean

type Foo = Exclude<A, B>

// type的返回差集 
// 相当于
// type Foo = number | boolean 之类的
let temp1:Foo = "sa"
```







# 3.文档知识



## 3.1交叉类型



交叉类型是将多个类型合并为一个类型。这个里欸行能够拥有所有类型的特性







# 4.类型体操





```
首先你的node版本是要在node 16.0 以上的，这就意味着你最好弄一个nvm ，然后一些安装nvm的东西可以看到这个链接https://blog.csdn.net/QWERTYQ16/article/details/124497532

nvm list available
nvm install 16.18.0
nvm use 16.18.0
node -v

因为每一个题目他都有测试用例，所以在每一个
npm install @type-challenges/utils 
```

















