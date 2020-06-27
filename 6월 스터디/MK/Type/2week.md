자바스크립트는 동적타입언어다.따라서 변수의타입은 런타임에 결정된다.

정적타입 언어는 변수의 타입이 컴타일 타임에 결정된다.

동적 타입 언어에는 파이썬(Python) , PHP 등이 있고,

정적 타입 언어에는 자바(Java), C++ 등이 있다.

# 주제를 선정한 이유?

리액트를 하면서 최근 typeScript 를 보게 되었다 그런데 !!! 코드가 안 읽히는 부분들이 있어서 공부 하고자 마음 먹었다! 타입스크립트를 내것으로 만들어야겠다.

### 타입스크립트란?

타입스크립트는 자바스크립트의 모든기능을 포함하면서 정적타입을 지원하는 언어

지금부터 동적타임언어와 정적타입언어를 비교해 보면서 왜 자바스크립트에 정적타입이 필요한지 알아보자!

### javaScript

function sum(a,b) {
return a+ b;
}
sum('x','y'); //'xy'

위 코드는 자바스크립트 문법상 어떠한 문제도 없으니 에러 없다!
why?
이러한 상황이 발생한 이유는 변수나 변환값의 타입을 사전에 지정하지 않는 자바스크립트 동적 타이핑에 의한것!

### typeScript

function sum(a : number , b : number) {
return a+b;
}
sum('x','y');

TypeScript는 정적 타입을 지원하므로 컴파일 단계에서 오류를 포착할 수 있는 장점이 있고,
명시적인 정적 타입 지정은 개발자의 의도를 명확하게 코드로 기술할 수 있고,
이는 코드의 가독성을 높이고 예측할 수 있게 하며 디버깅을 쉽게 함!

# **타입 표기 (Type Annotation)**

타입스크립트 코드에서 어떤 변수 또는 값의 타입을 표기하기 위해 **타입 표기**를 사용한다. 타입 표기는 식별자 또는 값 뒤에 콜론(`:`)을 붙여 `value: type` 의 형태로 표기함!

```
const temp: boolean = true;
const answer: number = 42;
const typescript: string = "great";
const greetings: string = `
Hello, Readers!
Welcome to TypeScript.
`;
const hasType: Object = {
  TypeScript: true,
  JavaScript: false
};

```

const temp : boolean = false;

const studyCode : number = 0622;

const typescript : string = "minkyung";

const kyungings : string = `Hello , minkyung ! Welcome to TypeScript`;

const haveType : Object = {

TypeScript : true,

javaScript : false

};

### 숫자: Number

모든 부동 소수점 값을 사용할 수 있습니다.ES6에 도입된 2진수 및 8진수 리터럴도 지원함!

```
let num: number;
let integer: number = 6;
let float: number = 3.14;
let hex: number = 0xf00d; // 61453
let binary: number = 0b1010; // 10
let octal: number = 0o744; // 484
let infinity: number = Infinity;
let nan: number = NaN;
```

### 문자열: String

문자열을 나타냅니다.작은따옴표(**`'`**), 큰따옴표(**`"`**) 뿐만 아니라 ES6의 템플릿 문자열도 지원함!

```
let str: string;
let red: string = 'Red';
let green: string = "Green";
let myColor: string = `My color is ${red}.`;
let yourColor: string = 'Your color is' + green;
```

### 배열: Array

순차적으로 값을 가지는 일반 배열을 나타냅니다.배열은 다음과 같이 두 가지 방법으로 타입을 선언할 수 있음!

```
// 문자열만 가지는 배열
let fruits: string[] = ['Apple', 'Banana', 'Mango'];
// Or
let fruits: Array<string> = ['Apple', 'Banana', 'Mango'];

// 숫자만 가지는 배열
let oneToSeven: number[] = [1, 2, 3, 4, 5, 6, 7];
// Or
let oneToSeven: Array<number> = [1, 2, 3, 4, 5, 6, 7];
```

유니언 타입(다중 타입)의 ‘문자열과 숫자를 동시에 가지는 배열’도 선언할 수 있다!

```
let array: (string | number)[] = ['Apple', 1, 2, 'Banana', 'Mango', 3];
// Or
let array: Array<string | number> = ['Apple', 1, 2, 'Banana', 'Mango', 3];
```

배열이 가지는 항목의 값을 단언할 수 없다면 **`any`**를 사용할 수 있당!

```
let someArr: any[] = [0, 1, {}, [], 'str', false];
```

인터페이스(Interface)나 커스텀 타입(Type)을 사용할 수도 있다!

```
interface IUser {
  name: string,
  age: number,
  isValid: boolean
}
let userArr: IUser[] = [
  {
    name: 'Neo',
    age: 85,
    isValid: true
  },
  {
    name: 'Lewis',
    age: 52,
    isValid: false
  },
  {
    name: 'Evan',
    age: 36,
    isValid: true
  }
];
```

### 튜플: Tuple

Tuple 타입은 배열과 매우 유사함!차이점이라면 **정해진 타입의 고정된 길이(length) 배열**을 표현함!

```
let tuple: [string, number];
tuple = ['a', 1];
tuple = ['a', 1, 2]; // Error - TS2322
tuple = [1, 'a']; // Error - TS2322
```

// Variables

let userId : number = 1234;

let userName : string = 'MIN';

let isValid : boolean = true;

//Tuple

let user :[number , string , boolean] = [1234 , 'MIN' ,true];

console.log(user[0]); //1234

console.log(user[1]); //'MIN'

console.log(user[2]) //true

### 열거형: Enum

Enum은 숫자 혹은 문자열 값 집합에 이름(Member)을 부여할 수 있는 타입으로, 값의 종류가 일정한 범위로 정해져 있는 경우 유용함!

기본적으로 **`0`**부터 시작하며 값은 **`1`**씩 증가함!

### 결론

우리는 줄곤 Javascript 로 코드를 짰다!

하지만 타입을 명시하지 않는 Javascript 의 특성상 어떤 값이 넘오는지 , 이 함수가 넘겨받을 값이 글인지,숫자인지, 카테고리 데이터 인지 알기 힘들다

하지만 타입이 있다면 코드를 짤때, 짱짱 편함

Typescript 를 사용하면 , 코드를 돌려보지 않아도 코드에서 생길수 있는 문제점들을 바로바로 알려준다!!!
또! (Typescript의 interface 를 써서 ) 넘겨받을 object의 키 값들을 알수 있으니, 자동으로 완성도 잘되고 개발이 편해질거다!
