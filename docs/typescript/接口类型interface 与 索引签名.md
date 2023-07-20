接口声明是 _命名对象类型的另一种方式_。
> 接口属性的类型，可以通过 `[]`获取。

```typescript
interface IPerson {
  name: string
  age: number
}

type NameType = IPerson['name'] // type NameType = string

const tom: IPerson = {
  name: 'Tom',
  age: 22,
  sex: '男',
  ...
}
```

> 1. 接口继承使用 `extends`关键字，表示子接口具备父接口的所有内容。
> 2. 接口是支持多继承的，类不支持多继承

```typescript
interface Ani1 {
  name: string
  classify: string
}

interface Ani2 {
  name: string
  age: number
}

interface child extends Ani1, Ani2 {

}

const cc: child = {
  
}

type AniName = Ani1['name']
```
![image.png](/typescript/1679815323777-d90c96e5-4e01-4866-a8ac-d7aedd8ca5cb.png)

> `**interface**`**接口类型 和 **`**type**`**类型别名的区别：**
> 1. `**interface**`**_只能__ _声明对象类型；而**`**type**`**不仅可以申明对象类型，还可以是其他，如：联合类型，基本类型，元组等。**
> 2. `**interface**`**可以通过 _多次声明__ _向现有接口添加新字段；而**`**type**`**同名称只能声明一次。**
> 3. **它们都允许扩展。**`**interface**`**使用 **`**extends**`** 关键字扩展内容；而**`**type**`**使用 **_**交集**_** 扩展内容。**
> 
![image.png](/typescript/1679410105318-ea559d3f-a9be-4eb7-848d-c73202b1d820.png)

> 定义对象类型，一般推荐 `interface`

### 索引签名（`Index Signatures`）
在 TypeScript 中，索引签名是一种用于描述对象的索引类型的语法，它可以让我们定义一种可以通过索引访问属性的类型。
```typescript
interface Person {
  [anyPropertyName: string]: number | string
}

const Tom: Person = {
  name: 'Tom',
  age: 22,
  sex: '男'
}

interface ICollection {
  [index: number]: any
  length: number
}

const arr: ICollection = ['a', 1, 'b']
```
> 注意：
> 1. 索引签名的 属性名类型 **_只能是 _**`**_string_**`**_ 或者 _**`**_number_**`（`[]`里面），不能是其他类型，或者联合类型。且 属性名不能与已有属性的名称重复。
> 2. 属性值可以是任意类型
> 3. 索引类型可以写多个，不过 **_数字类型索引的类型，必须是字符串类型索引的类型的 子类型。_**
>    1. **_原因：_在 JavaScript 中，对象的属性名只能是字符串类型，而不能是数字类型。因此，当我们使用数字类型的索引来访问对象中的属性时，实际上是将数字类型的属性名转换成了字符串类型的属性名。**

```typescript
interface IObj {
  [index: number]: string
  [prop: string]: number | string // 允许
}

interface IObj {
  [index: number]: number | string // 编译失败！
  [prop: string]: number
}

//---------------------------------------------
interface IObj {
  [index: number]: string
  [prop: string]: number | string
  aaa: boolean // 编译失败，aaa也是字符串，需要满足定义的索引签名
}
```
