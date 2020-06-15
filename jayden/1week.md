# 주제 선정 이유

> 함수형 프로그래밍이 대세라고 한다. 함수형 프로그래밍을 먼저 공부해볼까? 라는 생각을 해봤지만, 어차피 모르는거 객체지향의 개념에 대해서 알아보고 그 이후 다시 생각해보자는 결론이다. 지금까지 프론트 개발을 하면서 프로토타입을 사용해본적이 손에 꼽힌다. 프로토타입의 경우 객체지향을 사용하지 않으면 중요하지 않을 수 있다고 한다.

# 프로토타입이란?

자바스크립트는 함수 기반 언어인 Scheme을 기반으로 처음 만들어졌고, 이후 자바에서 다양한 프로그래밍 개념들을 발췌했다. 자바스크립트는 이벤트와 함수기반 언어이고 객체지향 언어는 아니다. 객체지향 언어가 아니지만 자바에서 다양한 개념들을 가져왔기 때문에 객체지향과 비슷한 특징을 가진다. 자바스크립트는 객체지향 개념을 지원하기 위해 프로토타입을 사용한다.프로토타입으로 구현할 수 있는 대표적인 객체지향 개념은 `상속` 이다.

# 프로토타입

## prototype, constructor, **proto**

생성자 함수가 있을때 new 키워드를 통해 인스턴스를 만들면 생성자 함수의 `prototype` 이라는 프로퍼티가 인스턴스에 `__proto__` 로 전달 된다. 즉 생성자 함수의 `prototype`과 인스턴스의 `__proto__` 프로퍼티는 같은 객체를 참조한다. `__proto__` 는 내부 프로퍼티에 접근할때 생략이 가능하다.

![prototype](https://user-images.githubusercontent.com/51406753/84573479-a2438b00-addb-11ea-9e67-7ec1a619563f.jpeg)

# 메소드 상속 및 동작 원리

먼저 아래의 예시를 보자.

```jsx
function Person(name, age) {
  this.name = name;
  this.age = age;
}

let jayden = new Person("제이든", 30);
let iu = new Person("이지은", 28);

jayden.setOlder = function () {
  this.age += 1;
};

jayden.getAge = function () {
  return this.age;
};

iu.setOlder = function () {
  this.age += 1;
};

iu.getAge = function () {
  return this.age;
};
```

위 코드를 보면 `setOlder` 와 `getAge` 함수는 중복된다. 중복을 피하고 싶으면 어떻게 해야할까? 아래와 같이 수정 해보자.

```jsx
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.setOlder = function () {
  this.age += 1;
};

Person.prototype.getAge = function () {
  return this.age;
};

let jayden = new Person("제이든", 30);
console.log(jayden.__proto__.setOlder());
console.log(jayden.__proto__.getAge()); // NaN
let iu = new Person("이지은", 28);
```

위 코드에서 NaN이 나오는 이유를 살펴보자!
![IMG_0319](https://user-images.githubusercontent.com/51406753/84587208-3c491900-ae58-11ea-96f3-5c8aee6dde21.jpg)

이번주는 진행하는 프로젝트로 인해 많은 공부를 못했지만, 이제는 프로토타입에 대해서 정확히 알고있는것 같다. 다음주에는 프로토타입 체이닝에 대해서 공부하고, 디자인 패턴에 대해 공부해보려 한다.

# 다음주 주제

### 프로토타입 체이닝

### 디자인패턴

- 모듈 패턴
- 이벤트 델리게이션 패턴
- 플락시 패턴
- 데코레이터 패턴,
- Init-time branching 패턴
