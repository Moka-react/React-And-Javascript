# 객체

객체형(Object Type)에는 다양한 데이터를 담을 수 있다. 키로 구분된 데이터 집합이나 복잡한 개체(entity)를 저장할 수 있다. 객체는 자바스크립트 거의 모든 면에 녹아있는 개념이므로, 자바스크립트를 잘 다루려면 객체를 잘 이해하고 있어야 한다.

객체는 중괄호 `{...}` 를 이용해 만들 수 있다. 중괄호 안에는 `키(key): 값(value)` 쌍으로 구성된 프로퍼티(property)를 여러 개 넣을 수 있는데 `키(key)` 에는 문자형, `값(value)` 에는 모든 자료형이 허용된다. 프로퍼티 키는 `프로퍼티 이름` 이라고도 불린다.

```js
let user = new Object(); // '객체 생성자' 문법
let user = {}; // '객체 리터럴' 문법
```

위의 코드에서 보면 중괄호 `{...}` 를 이용해 객체를 선언하는 것을 **객체 리터럴(object literal)** 이라고 부른다. 객체를 선언할 때는 주로 이 방법을 사용한다.

### 리터럴과 프로퍼티

중괄호 `{...}` 안에는 `키(key): 값(value)` 쌍으로 구성된 프로퍼티가 들어간다.

```js
let user = {
  // 객체(Object)
  name: 'Kevin', // 키(key): "name", 값(value): "Kevin"
  age: 30, // 키(key): "age", 값(value): 30
};
```

`콜론(:)`을 기준으로 왼쪽엔 키(key)가, 오른쪽엔 값(value)가 위치한다. 프로퍼티 키는 프로퍼티 `이름` 혹은 `식별자` 라고도 부른다.
객체 `user`에는 프로퍼티가 두 개 있는 것이다.

1. 첫 번째 프로퍼티 : `"name"`(이름)과 `"Kevin"`(값)
2. 두 번째 프로퍼티 : `"age"`(이름)과 `30`(값)

점 표기법(dot notation)을 이용하면 프로퍼티 값을 읽는 것도 가능하다.

```js
alert(user.name); // Kevin
alert(user.age); // 30
```

프로퍼티 값에는 모든 자료형이 올 수 있다. 불린(boolean)형 프로퍼티를 추가해보자.

```js
user.isAdmin = true;
```

`delete`연산자를 이용하면 프로퍼티를 삭제할 수 있다.

```js
delete user.age;
```

### 대괄호 표기법

여러 단어를 조합해 프로퍼티 키를 만든 경우엔, 점 표기법을 사용해 프로퍼티 값을 읽을 수 없다.

```js
user.like birds = true // 문법 에러 발생
```

자바스크립트는 위와 같은 코드를 이해하지 못한다. `user.likes`까지는 이해하다가 예상치 못한 `birds`를 만나면 문법 에러를 뱉어낸다.
'점'은 키가 '유효한 변수 식별자'인 경우에만 사용할 수 있다. 유효한 변수 식별자엔 공백이 없어야 한다. 또한 숫자로 시작하지 않아야 하며 `$`와 `_`를 제외한 특수 문자가 없어야 한다.
키가 유효한 변수 식별자가 아닌 경우엔 점 표기법 대신에 `대괄호 표기법(square bracket notation)`이라 불리는 방법을 사용할 수 있다. 대괄호 표기법은 키에 어떤 문자열이 있던지 상관없이 동작한다.

```js
let user = {};

// set
user['likes birds'] = true;
alert(user['likes birds']); // true
delete user['likes birds'];
```

### 계산된 프로퍼티

객체를 만들 때, 객체 리터럴 안의 프로퍼티 키가 대괄호로 둘러싸여 있는 경우, 이를 `계산된 프로퍼티(computed property)`라고 부른다.

```js
let car = prompt('어떤 차를 구매할 것인가?', 'genesis');

let bag = {
  [car]: 5,
};
alert(bag.genesis); // car에 "genesis"가 할당되었다면 5가 출력됨
```

위 예시에서 `[car]`는 프로퍼티 이름은 변수 `car`에서 가져오겠다는 것을 의미한다.
사용자가 프롬프트 대화상자에 `genesis`를 입력했다면 `bag`에는 `{genesis: 5}`가 할당되었을 것이다.

### 단축 프로퍼티

```js
function makeUser(name, age) {
  return {
    name: name,
    age: age,
  };
}

let user = makeUser('Kevin', 30);
alert(user.name); // Kevin
```

프로퍼티들의 이름과 값이 변수의 이름과 동일한 것을 확인할 수 있다. 하지만 `프로퍼티 값 단축 구문(property value shorthand)`을 사용하면 코드를 짧게 줄일 수 있다.

```js
function makeUser(name, age) {
  return {
    name, // name: name과 같음
    age, // age: age와 같음
  };
}
```

### 'in' 연산자로 프로퍼티 존재 여부 확인하기

자바스크립트 객체의 중요한 특징 중 하나는 다른 언어와는 달리, 존재하지 않는 프로퍼티에 접근하려 해도 에러가 발생하지 않고 `undefined`를 반환한다는 것이다.
이런 특징을 응용하면 프로퍼티 존재 여부를 쉽게 확인할 수 있다.

```js
let user = {};

alert(user.noSuchProperty === undefined); // true는 '프로퍼티가 존재하지 않음'을 의미
```

이렇게 `undefined`와 비교하는 것 이외에도 연산자 `in`을 사용하면 프로퍼티 존재 여부를 확인할 수 있다.

```js
'key' in object;
```

```js
let user = {name: 'Kevin', age: 30};

alert('age' in user); // user.age가 존재하므로 true가 출력
alert('blabla' in user); // user.blabla는 존재하지 않기 때문에 false 출력
```

`in` 왼쪽에는 반드시 프로퍼티 이름이 와야한다. 프로퍼티 이름은 보통 따옴표로 감싼 문자열이다.
따옴표를 생략하게 되면 엉뚱한 변수가 조사 대상이 된다.

```js
let user = {age: 30};

let key = 'age';
alert(key in user); // true, 변수 key에 저장된 값("age")을 사용해 프로퍼티 존재 여부를 확인
```

### for...in 반복문

`for...in` 반복문을 사용하면 객체의 모든 키를 순회할 수 있다.
`for...in`은 `for( ; ; )` 반복문과는 완전히 다르다. (기억하자)

```js
for (key in object) {
  // 각 프로퍼티 키(key)를 이용하여 본문(body)를 실행한다
}
```

```js
let user = {
  name: "Kevin",
  age: 30,
  isAdmin: true
};

for(let key in user) {
  alert(key); // name, age, isAdmin
  alert(user[key]); // Kevin, 30, true
```

`for...in` 반복문에서도 `for( ; ; )`문처럼 반복 변수를 선언(let key)했다는 점에 주목해보자.
반복 변수명은 자유롭게 정할 수 있다. `for(let prop in obj)`와 같이 `key`말고 다른 변수명을 사용해도 괜찮다.

### 객체 정렬 방식

객체는 특별한 방식으로 정렬된다. 정수 프로퍼티(integer property)는 자동으로 실행되고, 그 외의 프로퍼티는 객체에 추가한 순서 그대로 정렬된다.

```js
let codes = {
  '49': '독일',
  '41': '스위스',
  '44': '영국',
  '1': '미국',
};

for (let code in codes) {
  alert(code); // 1, 41, 44, 49
}
```

위의 코드를 실행해보면 1, 41, 44, 49 순으로 출력 된다. 그 이유는 키(key)가 정수이기 때문에 `1, 41, 44, 49` 순으로 프로퍼티가 자동 정렬되었기 때문이다.

### ---정리---

객체는 몇 가지 특수한 기능을 가진 연관 배열(associative array)이다.
객체는 프로퍼티(키key-값value 쌍)를 저장한다.

- 프로퍼티 키는 **문자열**이나 **심볼**이어야 한다. 보통은 문자열이다.
- 값value는 어떤 자료형도 가능하다.

아래와 같은 방법을 사용하면 프로퍼티에 접근할 수 있다.

- 점 표기법: `obj.property`
- 대괄호 표기법: `obj["property"]`
  대괄호 표기법을 사용하면 `obj[varWithKey]` 같이 변수에서 키를 가져올 수 있다.

객체에는 추가 연산자를 사용할 수 있다.

- 프로퍼티를 삭제하고 싶을 때 : `delete obj.prop`
- 해당 key를 가진 프로퍼티가 객체 내에 있는지 확인하고자 할 때 : `"key" in obj`
- 프로퍼티를 나열할 때 : `for (let key in obj)`
