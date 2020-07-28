객체지향의 개념을 공부하고 싶다. 하지만 자바스크립트 하나도 아직 똑바로 못하는데 다른 언어를 공부하기는 싫다. 그래서 자바스크립트로 그냥 한다. 자바스크립트는 객체지향언어인가? 여러 검색을 해보니 더 혼란스럽다.

> *JavaScript는 일급 함수를 사용하는 가벼운 객체 지향 인터프리터 언어이며 웹페이지의 스크립트 언어로 잘 알려져 있지만, 브라우저가 아닌 환경에서도 많이 사용된다. 프로토타입 기반, 다중 패러다임 스크립트 언어이며, 동적이고 명령어, 객체 지향, 함수 프로그래밍 스타일을 지원한다.*
                                                                                         **- MDN에서의 정의 -**
*자바스크립트에는 Object, Function, Array 등과 같이 다양한 기본 객체들이 있고, 모든 객체는 자바스크립트의 기본 객체인 Object를 확장하고 있다. 이러한 면을 보면서 자바스크립트가 객체지향 언어라고 생각할 수도 있겠지만, 자바스크립트는 이벤트와 함수 기반 언어이고 객체지향 언어는 아니다.*
                                                                      **- 속깊은 Javascript의 일부 발췌 -**
*자바스크립트는 멀티-패러다임 언어로 명령형(imperative), 함수형(functional), 프로토타입 기반(prototype-based) 객체지향 언어다. 비록 다른 객체지향 언어들과의 차이점에 대한 논쟁들이 있긴 하지만, 자바스크립트는 강력한 객체지향 프로그래밍 능력들을 지니고 있다. 간혹 클래스가 없어서 객체지향이 아니라고 생각하는 사람들도 있으나 프로토타입 기반의 객체지향 언어다.*
                                                                  **- Poiemaweb 객체지향 프로그래밍 -**

뭐 어쩌라는 말이야! 일단 가능한거 같으니까 알아보고 다시 한번 생각해보자.

# 자바스크립트에서의 객체생성 방법

자바스크립트에서 객체를 생성하는 방법은 아래의 세가지 방법이 있다.

- 함수를 통한 객체 생성
- Object.create()를 통한 객체 생성
- 클래스를 통한 객체 생성

# 함수를 이용하는 방법

```jsx
function Person(name, age) {
  this.name = name;
  this.age = age;
}

let JAYDEN = new Person('제욱', 30);
let IU = new Person('지은', 28);
console.log(JAYDEN.name) // '제욱'
console.log(IU.name) // '지은'
```

## new와 constructor

먼저 new와 constructor 를 사용하지 않았을때의 코드를 살펴보자.

```jsx
let JAYDEN = {
  name: 'jayden';
  age : 30,
  getName: function() {
    return this.name;
  }
}

let IU = {
  name: 'jayden';
  age : 30,
  getName: function() {
    return this.name;
  }
}

console.log(JAYDEN.getName());
console.log(IU.getName());
```

`getName()` 이라는 메서드가 중복되어 있다. 개발자들은 기본적으로 귀차니즘이 많다(?) 그렇기 때문에 중복을 제거해주고, 재사용성을 항상 고민해야한다. 다음으로 new와 constructor를 활용해서 어떻게 중복을 제거하고 메서드를 재사용할 수 있는지 알아보자.

```jsx
function Person(name, age) {
  this.name = name;
  this.age = age;
  getName: function() {
    return this.name;
  }
}

let JAYDEN = new Person('제욱', 30);
let IU = new Person('지은', 28);
console.log(JAYDEN.getName()) // '제욱'
console.log(JAYDEN.getName()) // '지은'
```

### new

자바스크립트에서 new 키워드 뒤에는 객체의 생성자 즉 함수가 위치해야 한다. 이 생성자를 통해서 객체의 생성과 초기화가 한꺼번에 되는것이다.

# 프로토타입을 통한 객체지향

자바스크립트의 프로토타입을 통한 객체지향을 실현하기 위해서는 아래의 키워드를 꼭 이해 해야만 한다. 

- prototype
- constructor
- __proto__
- 상속
- prototype chaining

# prototype

자바스크립트에서 객체지향의 개념을 지원하기 위해 prototype을 사용한다. prototype은 한글로 `원형` 이라 표현하는데 ECMAScript 표준에 의하면 그 뜻은 다음과 같다.

> *다른 객체들과 공유되는 속성을 제공하는 객체이다. 생성자가 객체를 생성할 때, 객체는 내부적으로 생성자의 prototype 속성을 활용하여 속성들의 레퍼런스를 참조한다.*

## prototype 사용해보기

```jsx
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.getName = function() {
  return this.name;
}

let JAYDEN = new Person('정제욱', 30);
let IU = new Person('이지은', 28);
**IU.getName = function() {
  return `가수 활동명 : IU, 연기자 활동명 : ${this.name}`
}**
console.log(JAYDEN.getName()) // '정제욱'
console.log(IU.getName()) // 가수 활동명 : IU, 연기자 활동명 : 이지은
```

프로토타입을 사용하기 이전에는 생성자에서 `getName()` 을 정의했었는데, 그때의 결과와는 일단 똑같아 보인다. 하지만 차이점이 있는데 차이점은 아래와 같다.

- 프로토타입을 활용해서 정의한 코드가 가독성이 조금 더 좋다(개인적인 주관)
- 생성자 외부에 정의되어 있기 때문에, 객체가 만들어질 때 마다 실행되지 않고, 한번만 실행된다
- `IU.getName` 과 같이 재사용 할 수 있다.

# __ **proto __**

현재 ECMAScript의 명세에서는 제외되었으나 브라우저들이 지원하고 있다. 

> *Deprecated : This feature is no longer recommended. Though some browsers might still support it, it may have already been removed from the relevant web standards, may be in the process of being dropped, or may only be kept for compatibility purposes. Avoid using it, and update existing code if possible; see the compatibility table at the bottom of this page to guide your decision. Be aware that this feature may cease to work at any time.*

__ proto __ 속성은 모든 객체가 가지고 있는 속성이다. 객체가 생성될 때 자신의 부모객체의 prototype을 가르키게 된다. 

## __ proto __ 사용해보기

```jsx
let parentObj = {  parentValue : 'parent' };
let childObj = {  childValue : 'child' };
childObj.__proto__ = parentObj;
console.log(childObj.parentValue) // parent
console.log(childObj.parentValue) // parent
```

자바스크립트에서는 클래스가 아닌 객체를 직접 다른객체에 자식으로 만들 수 있다. 상속과 같은말이다. __ proto __ 는 매우 유연하기 때문에 의도하지 않은 변경이 일어날수도 있는 위험성이 있다. 

# Object.create()

앞서 살펴본 __ proto __ 는 표준에서 제외되었고, 권장하지 않는다고 했다. __ proto__의 대체가 Object.create() 이다. 

## Object.create() 사용해보기

```jsx
let parentObj = {  parentValue : 'parent' };
let childObj = Object.create(parentObj, {
  childValue : {
    value : 'child',
    writable : false
  }
})
console.log(childObj.parentValue) // parent
console.log(childObj.childValue) // child
childObj.parentValue = 'changed child';
console.log(childObj.childValue) // child
```

이 함수는 인자로 전달된 parentObj를 기반으로 새로운 객체 childObj 를 생성한다. 두번째 인자를 통해서 다음과 같은 기능을 추가할 수 있다.

- writable : 쓰기 가능 여부를 지시한다
- configurable : 파일이 객체로부터 제거 가능한지 또는 생성 후 추가적인 구성을 지원하는지 여부를 지시한다
- enumerable : 객체의 속성을 열거하는 동안 속성이 나열될 수 있는지를 지시
- value : 기본값

# constructor, prototype, __ proto __의 상관관계

아래의 그림과 코드를 통해 3가지 키워드들의 상관관계를 이해하고 각각의 키워드를 살펴보면 이해가 쉽다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7a7f1c34-55e2-449b-8310-b2cd1b825d4d/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7a7f1c34-55e2-449b-8310-b2cd1b825d4d/Untitled.png)

```jsx
function Person(name, age) {
  this.name = name;
  this.age = age;
}

let IU = new Person('지은', 28);

(1) console.dir(Person);
(2) console.dir(IU);
(3) console.dir(IU.constructor);
(4) console.dir(IU.__proto__.constructor);
(5)console.log(IU.constructor === IU.__proto__.constructor)
```

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6cc5d0e3-a62e-4374-8b2e-2931c7b6af6b/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6cc5d0e3-a62e-4374-8b2e-2931c7b6af6b/Untitled.png)

- `Constructor(생성자)` Person을 new 키워드를 통해 `instance(객체)` 를 만들면,
- Constructor Person의 `prototype` 이
- 즉, 생성자의 `prototype`과 객체의 `__proto__`  는 같은 객체를 참조한다.
- 객체의  `__proto__`  는 생략가능하다.

# 메서드 상속

```jsx
function ParentPerson(name, age, nickname) {
  this.name = name;
  this.age = age;
  this.nickname = nickname;
}
ParentPerson.prototype.getNickname = function() {
    return `본명 : ${this.name} 별명 : ${this.nickname}`;
}

function ChildPerson(name, age, nickname) {
  this.name = name;
  this.age = age;
  this.nickname = nickname;
}
ChildPerson.prototype.getNickname = function() {
    return `본명 : ${this.name} 별명 : ${this.nickname}`;
}
let JAYDEN = new ChildPerson('정제욱', 30, '제이든');
console.log(JAYDEN.getName());
```

위의 코드에서 ParentPerson과 ChildPerson은 코드가 중복된다. 이때 사용할수있는게 상속인데, 상속기능을 구현한 코드를 보면서 알아보자.

```jsx
function ParentPerson(name, age, nickname) {
  this.name = name;
  this.age = age;
  this.nickname = nickname;
  console.log(this); // ChildPerson {name: "정제욱", age: 30, nickname: "제이든"}
}
ParentPerson.prototype.getNickname = function() {
    return `본명 : ${this.name} 별명 : ${this.nickname}`;
}

function ChildPerson(name, age, nickname) {
  ParentPerson.call(this, name, age, nickname)
}

let JAYDEN = new ChildPerson('정제욱', 30, '제이든');
```

 ****`ParentPerson.call` 이 구문을 통해 상속을 구현했다. `call` 을 사용하지 않고 아래와 같이 호출했을때는 바라보는 this는 아래와 같다.

```jsx
function ParentPerson(name, age, nickname) {
  this.name = name;
  this.age = age;
  this.nickname = nickname;
  console.log(this); // window

function ChildPerson(name, age, nickname) {
  ParentPerson(name, age, nickname)
} 
let JAYDEN = new ChildPerson('정제욱', 30, '제이든')
```

**this는 호출 방식에 따라 동적으로 바인딩 된다. 생성자 함수에서의 this는 객체를 바라본다.** **자바스크립트에서 객체지향의 가장 중요한 부분은 `this` 다.** `this`에 대한것은 [**'여기'](https://www.notion.so/philippijw/this-637624f5d1dc453c93d4a3447c44ba5d)** 를 클릭해서 이전에 작성한 글을 참고하기 바란다.

위의 코드에서는 아직 `getNickname()` 메서드를 상속받지 못했다. 다음에 알아볼 프로토타입 체이닝을 통해서 알아보자.

# 프로토타입 체이닝

```jsx
function ParentPerson(name, age, nickname) {
  this.name = name;
  this.age = age;
  this.nickname = nickname;
}
ParentPerson.prototype.getNickname = function() {
    return `본명 : ${this.name} 별명 : ${this.nickname}`;
}

function ChildPerson(name, age, nickname) {
  ParentPerson.call(this, name, age, nickname)
}

let JAYDEN = new ChildPerson('정제욱', 30, '제이든');
console.log(JAYDEN.getNickname()); // Uncaught TypeError: JAYDEN.getNickname is not a function
```

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/21d3f135-a60b-4588-8b37-7681cbe7679a/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/21d3f135-a60b-4588-8b37-7681cbe7679a/Untitled.png)

## 그림을 통한 단계별 설명

`ChildPerson()` 생성자를 통해 생성된 JAYDEN 객체에서 `JAYDEN.getNickname()` 을 실행하고 싶으면 다음과 같은 과정을 통한다. 

- JAYDEN 객체에서 `getNickname()` 메서드를 찾는데 없으니 `__proto__` 를 통해서 `ChildPerson의 prototype`에서 찾는다.
- 또 없으니깐 `ChildPerso의 __proto__` 를 통해서 `ParentPerson의 prototype`에서 찾는다.
- `ParentPerson` 에 `getNickname()` 가 있으니깐 연결해준다.

```jsx
function ParentPerson(name, age, nickname) {
  this.name = name;
  this.age = age;
  this.nickname = nickname;
}
ParentPerson.prototype.getNickname = function() {
    return `본명 : ${this.name} 별명 : ${this.nickname}`;
}

function ChildPerson(name, age, nickname) {
  ParentPerson.call(this, name, age, nickname)
}
// ChildPerson.prototype.__proto__ = ParentPerson.prototype; 권장하지 않음
ChildPerson.prototype = Object.create(ParentPerson.prototype); // 권장함

let JAYDEN = new ChildPerson('정제욱', 30, '제이든');
console.log(JAYDEN.getNickname()); // 본명 : 정제욱 별명 : 제이든
```

# 마무리

이걸 공부하려고 2일이라는 시간을 투자했다. 진짜 처음에는 이게 무슨소리인가 싶을정도로 어려웠는데, 반복학습을 통해서 이제 감이온다. 내가 이걸 공부한 이유는 단지 OOP 이 키워드 하나 때문이다.

# 참고자료

- 속깊은 Javascript(저자 : 양성익)
- PoiemaWeb - 자바스크립트 객체지향 프로그래밍
- 생활코딩 - 객체 지향 프로그래밍
- Javascript 핵심 개념 알아보기 - JS Flow