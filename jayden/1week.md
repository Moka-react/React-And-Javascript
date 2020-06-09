# 아직 미완성

# 주제 선정 이유

> 함수형 프로그래밍이 대세라고 한다. 함수형 프로그래밍을 먼저 공부해볼까? 라는 생각을 해봤지만, 어차피 모르는거 객체지향의 개념에 대해서 알아보고 그 이후 다시 생각해보자는 결론이다. 지금까지 프론트 개발을 하면서 프로토타입을 사용해본적이 손에 꼽힌다. 프로토타입의 경우 객체지향을 사용하지 않으면 중요하지 않을 수 있다고 한다.

# 프로토타입이란?

자바스크립트는 함수 기반 언어인 Scheme을 기반으로 처음 만들어졌고, 이후 자바에서 다양한 프로그래밍 개념들을 발췌했다. 자바스크립트는 이벤트와 함수기반 언어이고 객체지향 언어는 아니다. 객체지향 언어가 아니지만 자바에서 다양한 개념들을 가져왔기 때문에 객체지향과 비슷한 특징을 가진다. 자바스크립트는 객체지향 개념을 지원하기 위해 프로토타입을 사용한다.프로토타입으로 구현할 수 있는 대표적인 객체지향 개념은 `상속` 이다.

## 클래스 복습

Javascript class는 ECMAScript 2015에서 등장했으며, 기존의 prototype 기반의 상속 보다 명료하게 사용할 수 있다. Class 문법은 새로운 객체지향 상속 모델을 제공하는 것은 아니다.

### Class란

Javascript에서의 Class는 사실 함수다. 함수를 함수 표현식과 함수 선언식으로 정의할 수 있듯이 class 문법도 class 표현식과 선언식 두 가지 방법을 제공 한다.

### Class 선언적 방식

```jsx
class A {}

console.log(new A());
```

### Class 표현식 방식

```jsx
const B = class {};
console.log(new B())'
```

### 선언적 방식이지만 호이스팅은 안된다

```jsx
new C();
class C {};


C is not defined
```

### Constructor란

함수의 인자와 비슷하다고 생각하면 편한데 class에서도 비슷한 기능이 있다. 최초의 초기값을 객체 안으로 넣어 줄수 있는 기능이다.

```jsx
class A {}
console.log(new A());

class B {
  constructor() {
    console.log('constructor');
  }
}
console.log(new B());

class C {
  constructor(name, age) {
    console.log('constructor', name, age)
  }
}
console.log(new B('Jayden', 30));
console.log(new B());

// 결과
A {}
constructor
B {}
constructor Jayden 30
constructor undefined undefined
B {}
```

### 멤버 변수(객체의 프로퍼티)

```jsx
class A {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
console.log(new A("Jayden", 30)); // A { name : 'Jayden', age : 30 }

class B {
  name;
  age;
}
console.log(new A("Jayden", 30)); // A { name : undefined, age : undefined }

class C {
  name = "no name";
  age = 0;

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
console.log(new C("Jayden", 30)); // A { name : 'Jayden', age : 30 }
```

### 멤버 함수

```jsx
class A {
  one() {
    console.log("one", this);
  }
  two = function () {
    console.log("two", this);
  };
}
new A().one(); // one A { two : [Function: two] }
new A().two(); // two A { two : [Function: two] }

class B {
  name = "Jayden";
  hi() {
    console.log("hi", this.name);
  }
}
new B().hi(); // hi Jayden
```

### get, set

```jsx
class A {
  _name = "no name";
  get name() {
    return this._name + "**";
  }
  set name(value) {
    this._name = value + "!!";
  }
}

const a = new A();
console.log(a); // A { _name : 'no name' }
a.name = "Jayden"; // set 함수가 실행된다
console.log(a); // A { _name : 'Jayden!!' }
console.log(a.name); // Jayden!!**, set 함수가 실행된다
console.log(a._name); // Jayden!!, 초기값을 불러온다
```

## readonly

```jsx
class B {
  _name = "no name"; // 앞에 _ 가 있으면 외부에서 값을 변경하지 말자는 약속이 있는 경우 의미가 생김
  get name() {
    return this._name + "**";
  }
}

const b = new B();
console.log(b); // B { _name : 'no name' }
b.name = "Jayden"; // set 함수가 없기 때문에 정상 작동 하지 않는다.(에러는 나지 않음)
console.log(b); // B { _name : 'no name' }
```

### static 변수, 함수

클래스를 new를 사용하는게 아니라, 클래스를 통해서 변수와 함수를 사용하는 방식이다.

```jsx
class A {
  static age = 30;
  static hi() {
    console.log(A.age);
  }
}

console.log(A.A.age); // [Function: A] { age: 30 } 30
A.hi(); // 37

class B {
  age = 30;
  static hi() {
    console.log(this.age);
  }
}

console.log(B.B.age); // [Function: B] undefined
B.hi(); // undefined

class C {
  static name = "이 클래스의 이름은 무엇인가?";
}
console.log(C); // [Function: 이 클래스의 이름은 무엇인가?] { name: '이 클래스의 이름은 무언인가? }
```

### Extends

```jsx
// 상속 기본
class Parent {
  name = "Jayden";

  hi() {
    console.log("hi", this.name);
  }
}

class Child extends Parent {}

const p = new Parent();
const c = new Child();

console.log(p, c); // Parent { name: 'jayden' } Child { name: 'Jayden' }
c.hi(); // hi Jayden
c.name = "JeaWook";
c.hi(); // hi JeaWook
```

### Override

클래스의 상속 멤버 변수 및 함수 오버라이딩, 추가

```jsx
class Parent {
  name = "Jayden";
  hi() {
    console.log("hello", this.name);
  }
}

class Child extends Parent {
  age = 30;
  hi() {
    console.log("hello", this.age);
  }
}

const p = new Parent();
const c = new Child();
console.log(p, c); // Parent { name: 'jayden' } Child { name: 'Jayden', age: 30 }
```

### Super

```jsx
class Parent {
  name = "Jayden";
  constructor(name) {
    this.name = name;
  }
  hi() {
    console.log("hello", this.name);
  }
}

class Child extends Parent {
  age;
  constructor(name, age) {
    super(name);
    this.age = age;
  }
  hi() {
    console.log("hello", this.name, this.age);
  }
}
```

### Static 상속

```jsx
class Parent {
  static age = 30;
}

class Child extends parent {}
console.log(Parent.age, Child.age); // 30 30
```

# 프로토타입

## prototype, constructor, **proto**

생성자 함수가 있을때 new를 통해 인스턴스를 만들면 생성자 함수의 prototype 이라는 프로퍼티가 인스턴스에 **proto** 로 전달 된다. 즉 생성자함수의 prototype과 인스턴스의 **\*\*proto** 프로퍼티는 같은 객체를 참조한다.\*\*
