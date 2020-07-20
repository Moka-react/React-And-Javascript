# TypeScript 1주차 Study

## 여러 글들을 보고 생각한 TypeScript를 쓰는 이유

```내가 생각하는 TypeScript를 쓰는이유
-자바스크립트는 변수에 값을 할당하는 순간 타입이 정해지는 동적인 언어이다. 그로 인해서 여러가지 문제가 발생한다.
정적 타입의 언어인 java, c++등에서는 애초에 처음부터 const,let이 아닌 타입을 정해놓고 변수에 값을 할당하기때문에 어디서 에러가 발생했는지 찾을수가없는 문제가 발생하지 않는다.

- 타입스크립트의 장점
 TypeScript를 쓰면 ide의 도움을 받아 실행하기전에 대부분의 에러를 잡아 낼수 있다.
-함수의 매개변수로 값을 넘겼을때 어떤타입인지알아서 그 관련 메서드들의 자동완성기능을 사용가능.
- 변수가 어떤 타입의 변수이며 전달받은 파라미터가 어떤 타입인지 바로 확인할 수 있다.

- 의미있게 변수이름을 지어도 다른사람이 보거나 코드를 짠 본인이 오랜만에 보게되면 어떤 값을 반환하는 함수인지
사용되는 파라미터의 타입이 무엇인지 알기 어려울 수 있다.
이것을 해결 해준다는점에서 유지보수에 용이하다.

- 타입스크립트는 자바스크립트에 정적 타입이 더해진 상위호환이기 때문에 처음엔 배울것이 있기때문에 조금 귀찮지만 사용하고 익숙해진다면 개발경험을 좋게해주어 TypeScript를 선호하게 된다는것이 경험자들의 대부분의 의견인것같다.
```

## 기본 타입

```ts
//타입스크립트는 기본적으로 우리가 정의한 타입외에
//다른 타입이 오게되었을 경우 에러를 표시해줍니다.
let exam: number = 2; // o
exam = 3; // o
exam = 'three'; // x (타입 불일치로 에러)
exam = true; // x (타입 불일치로 에러)
```

```ts
// array(배열)
// 두가지 방법으로 작성이 가능합니다.
let list: number[] = [2, 3, 4];
let list2: Array<number> = [1, 2, 3];
let list3: ReadonlyArray<number> = [1, 2, 3]; // 읽기 전용 배열 (수정 불가)
```

```ts
// tuple(튜플)
/* 타입과 개수가 고정된 배열을 튜플이라고 합니다.*/
// 튜플 선언
let tuple1: [boolean, string, number] = [true, 'hello', 3]; // 선언과 동시에 초기화하는방법.
let tuple2: [string, number]; // 선언과 초기화 분리 하는 방법;

tuple2 = ['hello', 3]; // o ( 길이 일치, 타입 일치)
tuple2 = [3, true]; // x (타입순서 안맞으므로 에러)
tuple2 = ['hello', 3, 3]; // x (길이초과이므로 에러)
```

```ts
// enum(열거형)
/* 관련된 데이터의 집합에 이름을 붙여서 사용.
 * 시작부터 번호를 0부터 매긴다.
 * 매겨진값을 이용해 키값을 얻는것이 가능하다.
 */
enum Color {
  Red, // 'Red' : 0
  Green, // 'Green' : 1
  Blue, // 'Blue' : 2
}

console.log(Color.Green); // 매겨진 번호값 얻음   결과 : 1
console.log(Color[0]); // string key값 얻음      결과 : 'Red'
```

```ts
// any
/* 어떤타입이든지 다 가능.
 * 사용할 때
 * 입력받는 값이 어떤타입의 변수인지 알기힘든경우 에러 통과를 위해 사용한다.
 * 타입을 정적으로 정하는 타입스크립트에서는 지양해야한다.
 */
let anyArr: any[] = [1, true, '알지못하는 타입의 값'];
```

```ts
//void
//return 값이 없는 함수의 반환타입을 void로 쓴다.
function noReturnFunc(): void {
  console.log('no return');
  // javascript에서는 기본적으로 undefined가 return 되지만 리턴을 하지않을경우 void로 타입을 적어준다.
}
```

```ts
// Never
/* 절대 발생할 수 없는 타입 (= 마지막에 도달할 수 없다.)
  무한루프를 돌거나 함수가 중간에 종료될 경우에 사용.*/
function error(message: string): never {
  throw new Error(message); // 리턴 하지못하고 중간에 함수가 종료된다.
}

function infiniteLoop(): never {
  while (true) {} // 무한반복되어 return에 도달할 수 없다.
}
```

```ts
// object
/*number, string,boolean, symbol, undefined, null, bigint
 *등의 원시타입 아닌 타입을 나타낼때 사용.
 */
// 내부를 알수없는 객체이기때문에 any와 비슷하기때문에 지양하는게 좋은것같습니다.
function objectFunc(o: object) {}
objectFunc(1); // x (원시타입이므로 에러)
objectFunc({ name: 'hello', age: 20 }); // o 원시타입 이외의 타입이므로 통과.
```

```ts
// type assertions (타입 단언)
/* typescript 보다 개발자가 type을 확실히 잘알고있을때 강제로 타입을 명시하는 것.*/
let someValue: any = 'this is a string';
let strLength = (<string>someValue).length;
let strLength2 = (someValue as string).length;
```

## interface(인터페이스)

```ts
// interface
// 객체나 함수 등이 우리가 원하는 타입의 프로퍼티를 가지고 원하는 값을 리턴하는 메서드로 이루어진 그 형태를 선언하는것이다.
// 함수나 클래스에도 사용가능.
// 주로 객체나 클래스의 형태를 정할때 사용한다.
// 시작을 대문자로하는 컨벤션이 있다.

interface LabeledValue {
  label: string;
}

function printLabel(labeledObj: LabeledValue): void {
  console.log(labeledObj.label);
}

let myObj = { size: 10, label: 'size 10 Object' };
// 인터페이스를 충족시키면 파라미터의 수는 상관없이 통과된다.
printLabel(myObj);

// 선택적 프로퍼티
// 모든 프로퍼티가 항상 필요하지 않을수 있기때문에
// ?를붙여 원하는 프로퍼티만 사용하면서 명시되지않은 타입의 사용은 방지한다.
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): void {
  if (config.color) console.log(config.color);
  if (config.width) console.log(config.width);
}

let mySquare = createSquare({ color: 'black' });

//읽기전용 프로퍼티
interface Point1 {
  x: number;
  y: number;
}

const point1: Point1 = {
  x: 1,
  y: 2,
};

point1.x = 3; // o 같은타입으로 변경가능

interface Point2 {
  readonly x: number;
  readonly y: number;
}

const point2: Point2 = {
  x: 1,
  y: 2,
};

point2.x = 3; // 같은타입이더라도 readonly 이기때문에 값의 변경불가.

// 비슷해보이지만
// const 는 값이 변하지않는 변수를 쓸때 사용. readonly는 프로퍼티가 변하지 않을 때 사용.

//초과 프로퍼티 검사
// 인터페이스에없는 프로퍼티type을 동적으로 생성할때 쓴다.
interface Apparel {
  color: string;
  fabric: string;
  [propname: string]: any;
}

const tShirt: Apparel = {
  color: 'red',
  fabric: 'cotton',
};

tShirt['price'] = 3000; // 인터페이스의 조건을 맞추면서 동적으로 프로퍼티 할당가능.

//함수타입
//인터페이스로 객체의 형태 뿐만아니라 함수의 형태도 정해줄 수 있다.
interface evenOrOddFunc {
  (num1: number): string;
}

let evenOrOdd: evenOrOddFunc;
evenOrOdd = function (num: number): string {
  return num % 2 === 0 ? 'even' : 'odd';
};

const evenOddResult = evenOrOdd(3);
console.log(evenOddResult);
```

## Class(클래스)

```ts
/**
 * 클래스
 */
// 다른 객체 지향언어처럼 private, public, protected 지원
// public 해당 클래스 및 인스턴스에서 접근가능.
// private 해당클래스와 내부에서만 접근가능.
// protected 해당 클래스와 그 클래스를 상속받은 하위 클래스에서만 접근가능.
class Animal {
  public age = 0; // age = 0과 같다.
  protected name: string;
  private weight: number; // compile 대상을 es6이상으로하면 #weight로 사용가능.
  constructor(name: string, weight: number) {
    this.name = name;
    this.weight = weight;
  }
  move() {
    console.log(`부모 클래스 메서드`);
    this.name = 'protected'; // o
    this.weight = 30; // o
  }
}

class Dog extends Animal {
  constructor(name: string, weight: number) {
    super(name, weight);
  }
  move() {
    console.log('자식클래스 메서드');
    // 자식 클래스에서는 protected, public만 접근가능
    this.name = 'protected'; // o
    this.weight = 3; // x 같은 타입이지만 private이기때문에 참조 및 변경 불가능.
  }
}

const buldog = new Dog('buldog', 15);

// protected나 private는 인스턴스에서 접근 불가능.
buldog.age = 30; // o public
buldog.name = 'private'; // x private
buldog.weight = 20; // x protected
```

## Generics(제네릭)

```ts
// 제네릭
/* 단일 타입이 아닌 다양한 타입에서 동작함으로써 재사용성을 늘려주는 문법
 * 어떤값이든 사용하고싶을때 any를 쓰면 해결된다. 하지만 입력받는타입과 리턴타입을 보장받지못한다.
 * 제네릭을 쓰면 입력할때 동적으로 받은 타입으로 그 함수나 객체가 어떤 타입의 변수,메서드의 구성으로 되어있는지 알수있습니다.
 * 함수에 썼을경우 리턴타입은 어떤타입이와도 상관없지만 파라미터자리에는 받아온 타입값을 같이 적어주어야합니다.
 */

function identity(arg: number): number {
  return arg;
}

function identity(arg: any): any {
  return arg; // 아무타입의 파라미터를 받을수 있지만 반환타입이 보장되지 않는다.
}

function genericFunc<T>(arg: T): T {
  return arg;
}

const value = genericFunc<string>('hello'); // 동적으로 타입 결정
```
