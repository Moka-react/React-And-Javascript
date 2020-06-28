# 개요

> 자바스크립트를 처음 공부하는 사람이라면 this가 어렵기로 명성있다는것을 알것이다. 하지만, 난 처음공부하는게 아니니깐 남이 이해하기 쉽게 정리해보려 한다.

# this의 바인딩

this는 호출 방식에 따라 동적으로 바인딩 된다. this의 바인딩에 대해서 5개의 호출 주체로 나눠서 살펴보자.

## 전역공간 : window/global

전역공간에서의 this는 전역 객체를 가르킨다.

## 함수내부 : window/global

```jsx
function a() {
  console.log(this);
}
a();

function b() {
  function c() {
    console.log(this);
  }
  c();
}
b();

var d = {
  e: function () {
    function f() {
      console.log(this);
    }
    f();
  },
};
d.e();
```

위 함수 a, b, c는 모두 전역 객체를 가르킨다. 즉, 함수내부에서도 기본적으로는 전역 객체를 가르킨다.

쉽게 설명하면 `함수는 전역객체의 메소드다` 라고 생각하면 된다. 그럼 위의 함수호출 부분을 아래와 같이 보면 이해가 쉬울것이다.

```jsx
function a() {
  console.log(this);
}
window.a();

function b() {
  function c() {
    console.log(this);
  }
  c();
}
window.b();

var d = {
  e: function () {
    function f() {
      console.log(this);
    }
    window.f();
  },
};
d.e();
```

## 메소드를 호출했을때

```jsx
var a = {
  b: function () {
    console.log(this);
  },
};
a.b();

var a = {
  b: {
    c: function () {
      console.log(this);
    },
  },
};
a.b.c();
```

메소드에서의 this를 찾는 방법은 아주 간단하다. 함수에 알아 봤던것 처럼 window를 없애고 그 자리에 무언가 있다면 그게 this다. `메소드 함수의 앞에 있는 . 까지가 this다`. 하지만 메서드 안에서 내부함수가 있을때는 조금 다르다. 아래의 코드를 보자.

```jsx
var a = 10;
var obj = {
  a: 20,
  b: function () {
    console.log(this.a); // 20
    function c() {
      console.log(this.a); // 10
    }
    c();
  },
};
obj.b();
```

b는 메소드 이지만, c는 함수라서 가르키는 값이 다르다. 그러면 c함수에서 this인 obj를 가르킬수 있을까?

```jsx
var a = 10;
var obj = {
  a: 20,
  b: function () {
    var _this = this;
    console.log(this.a); // 20
    function c() {
      console.log(_this.a); // 20
    }
    c();
  },
};
obj.b();
```

## 생성자 함수 : 인스턴스

```jsx
function Person(n, a) {
  this.name = n;
  this.age = a;
}
var jayden = new Person("제이든", 22);
console.log(jayden);
```

## 콜백(좀 어려움)

콜백에서의 this를 알아보기전에 먼저 아래의 메서드들에 대해서 이해하고 가자. thisArg는 this를 개발자가 직접 명시한다고 보면 된다.

- call(즉시호출)

  ```jsx
  func.call(thisArg[, arg1[, arg2[, ...]]])
  ```

- apply(즉시호출)

  ```jsx
  func.apply(thisArg, [argsArray]);
  ```

- bind(새로운 함수를 생성)

  ```jsx
  func.call(thisArg[, arg1[, arg2[, ...]]])
  ```

- 위 메서드들의 예제

  ```jsx
  function a(x, y, z) {
  	console.log(this, x, y, z);
  }
  var b = {
  	c: 'eeeee'
  };

  a.call(b, 1, 2, 3);
  a.apply(b, [1, 2, 3];

  var c = a.bind(b);
  c(1, 2, 3);

  var d = a.bind(b, 1, 2);
  d(3);
  ```

### 콜백에서의 this 정리

- 기본적으로는 함수에서의 this와 같다.
- 제어권을 가진 함수가 콜백의 this를 명시한 경우 그에 따른다.

  ```jsx
  var callback = function () {
    console.log(this);
  };
  var obj = {
    a: 1,
    b: function (cb) {
      cb();
    },
  };
  obj.b(callback);
  ```

- 개발자가 this를 바인딩한 채로 콜백을 넘기면 그에 따른다.

  ```jsx
  var callback = function () {
    console.log(this);
  };
  var obj = {
    a: 1,
    b: function (cb) {
      cb.call(this);
    },
  };
  obj.b(callback);
  ```

# 마무리

그 어렵다던 this도 이렇게 풀어해치면 별거없다.
