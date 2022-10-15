// 类型体操简单来说就是处理的值是类型。
// 1.在类型编程中，我们定义的“变量”是不可变的，我们只能去生成新的变量，而不能去修改已有的变量
// 2.类型编程中只有表达式，没有“语句”这一概念，也就没有所谓的条件语句，不过有extends ? :表达式可以帮助我们达到类似的目的。
// 类似于：type isNumber<T> = T extends number ? true : false;
// 3.条件


// interface Stu {
//     name: string;
//     age: number;
// }

// type keys = keyof Stu; // type keys = 'name' | 'age' 这里使用了 keyof 来提取 Temp 中的 key。
// // in JavaScript
// let index = 1;

// let n = 10;

// while (n--) {
//   index *= 10;
// }
// // in type gymnastics
// type path = 'a.b.c';

// type Split<T extends string> = T extends `${infer A}.${infer B}` ? A | Split<B> : T;

// type test = Split<path>; // type test =  a  |  b  |  c






