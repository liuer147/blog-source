`infer` 关键字 只能用在 条件类型 中。用来提取类型的某一个部分的类型；放在不同的位置，就可以帮我们取不同位置的类型。
### 内置类型 `ReturnType`
`ReturnType`可以获取 函数类型 的返回值类型。
```typescript
function getUser(name: string, age: number) {
  return { name, age, address: {} };
}

type RType = ReturnType<typeof getUser>
/*
type RType = {
    name: string;
    age: number;
    address: {};
}
*/

// 怎么实现的呢？借助 infer xx，放在不同的位置就可以取不同位置的类型
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

```
### 内置类型 `Parameters`
`Parameters` 可以获取 函数类型 的参数类型。
```typescript
type PType = Parameters<typeof getUser>
/*
	type PType = [name: string, age: number]
*/

 // 实现： <T extends xxx> 这是泛型约束，后面的是条件类型
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
```
### 内置类型 `InstanceType`
`InstanceType` 可以获取 实例 的类型。
```typescript
type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer I ? I : never
```
### 更改字面量元组的顺序
```typescript
type TailToHead<T extends any[]> = T extends [...infer C, infer B]
  ? [B, ...C]
  : any;

type x = TailToHead<["jw", 30, 40, 50, "回龙观"]>; // ["回龙观","jw",30,40,50]
```
### 将元组转换为联合类型
```typescript
type ElementOf<T> = T extends Array<infer R> ? R : any; // Array<infer R>   (string|number|boolean)[]

type TupleToUnion = ElementOf<[string, number, boolean]>;
```
### 递归获取某类型
```typescript
type PromiseV<T> = T extends Promise<infer V> ? PromiseV<V> : T;

type PromiseReturnValue = PromiseV< Promise<Promise<number>> >; // number?
```
