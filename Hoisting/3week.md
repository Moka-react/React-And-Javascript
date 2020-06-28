## 호이스팅 개념

함수안에 있는 선언들을 모두 끌어올려서 해당 함수 유효범위의 최상단에 선언하는 것을 말한다.

## "한마디로 그대로 끌어 올린다는 뜻!"

## **호이스팅이란**

자바스크립트 함수는 실행되기전에 함수안에 필요한 변수값들을 모두 모아서 유효범위의 최상단에 선언한다.

- 함수 안에 존재하는 변수 /함수선언에 대한 정보를 기억하고 있다가 실행시킨다.
- 유효범위 : 함수 블록 {} 안에 유효

### "자스에서 끌어 올린다는것은 변수선언 과 함수 선언을 끌어 올리는 것!"

## 호이스팅 발생하는 원인?

자스의 변수 생성 and 초기화의 작업이 분리돼서 진행되기 때문!

## **호이스팅의 대상**

var 변수 선언과 함수선언문에서만 호이스팅이 일어난다

- let/const 변수 선언과 함수 표현식에서는 호이스팅이 발생하지 않는다
- var 변수/함수의 선언만 위로 끌어 올려지며, 할당은 끌어 올려지지 않는다

```jsx
console.log('test');
var min = '민구';
let min2 = '정민구2';

var min; // [호이스팅 선언!]
console.log('test');
min = '민구'; //"할당"
let min2 = '정민구2'; //[호이스팅 발생 X]
```

# **함수선언문 과 함수표현식에서의 호이스팅**

- **함수선언문에서의 호이스팅**

함수 선언문은 코드를 구현한 위치와 관계없이 자바스크립트의 특징인 호이스팅에 따라 브라우저가 자바스크립트를 해석할때 맨위로 끌어 올려진다.

```jsx
function  studyName(firstname) { //함수선언문
	var result = inner(); // 선언 및 할당
	console.log(typeof inner); // > "function"
	console.log("name is" + result); > "name is react"

	function inner() { //함수선언문
		return "react";
	}
}

studyName();

```

**\*\*** 내부의 호이스팅 (Hoisting) 의결과 ****\*\*****

```jsx
function studyName(firstname) {
  //함수선언문
  var result; //[Hoisting] var 변수선언

  function inner() {
    //[Hoisting] 함수 선언문. --> 끌어올려짐.
    return 'react';
  }
  result = inner(); //할당
  console.log(typeof inner); // > "function"
  console.log('name is' + result); // > "name is react"
}

studyName();
```

- **함수표현식에서의 호이스팅**

  - 함수 표현식은 함수선언문과 달리 선언과 호출순서에 따라서 정상적으로 함수가 실행되지 않을 수 있다.

  - 함수 표현식에서는 선언과 할당의 분리가 발생한다

    1.함수표현식의 선언이 호출보다 위에 있는 경우

  ```jsx
  function studyName(firstname) {
    var inner = function () {
      return 'react';
    };
    var result = inner();
    console.log('name is', result);
  }
  ```

  **\*\*\*** 내부의 호이스팅 (Hoisting) 의결과 **\*\***

  ```jsx
  function studyName() {
    var inner; //[호이스팅] 함수표현식의 변수값 '선언'
    var result; // [호이스팅] var 변수값 '선언'

    inner = function () {
      //함수표현식 '할당'
      return 'react';
    };

    result = inner(); //함수 '호출'
    console.log('name is', result);
  }
  studyName();
  ```

  2.함수표현식의 선언이 호출보다 아래에 있는 경우 (var 변수에 할당) - TypeError

  ```jsx
  function studyName(firstname) {
    //함수선언문
    console.log(inner); //'undefind' : 선언은 되어있지만 값이 할되지 ㄴㄴ
    var result = inner();
    console.log('name is', result);

    var inner = function () {
      //함수표현식
      return 'react';
    };
  }
  studyName(); //TypeError : inner is not a function
  ```

  **\*\*\*** 내부의 호이스팅 (Hoisting) 의결과 **\*\***

  ```jsx
  function studyName(firstname) {
    var inner; //[호이스팅 함수 표현식의 변수값 '선언']

    console.log(inner); //'underfined'

    var result = inner(); //error!
    console.log('name is', result);

    inner = function () {
      return 'react';
    };
  }

  studyName(); //TypeError : inner is not a function
  ```

  studyName 이 실행되는 순간 호이스팅에 의해 inner 는 'undefined' 로 지정된다 ! 그래서 typeError 에 inner is not defined 가 나오지 않은것!

  inner 가 undefined라는 것은 !

  아직은 함수로 인식되지 않고 있다는 것을 의미함

  3.함수표현식의 선언이 호출보다 아래에 있는 경우 (const /let 변수에 할당)

  -ReferenceError

  ```jsx
  function studyName(firstname) { //함수선언문
  	console.log(inner); //ERROR!!
  	let
  	let result = function() { //함수표현식
  		return 'react';
  	}
  }
  studyName();  // ReferenceError : inner is not defined
  ```

  - let/const의 경우, 호이스팅이 일어나지 않게 때문에 위에 예시를 그대로 이해
  - console.log(inner); 에서 inner 에 대한 선언이 되어있지 않기 때문에 이때는 "inner is not defind" 오류가 발생
  - 함수표현식보다 함수선언문을 더 자주 사용하지만,

    어떤 코딩컨벤션에서는 함수표현식을 권장하기도 한다

  - 결론 : 어떤 컨벤션을 갖던지 한가지만 정해서 사용하기!

  ***

  ## 함수 표현식 권장이유?

  자스의 쌤으로 알려진 **더글러스 크락포드는**

  함수생성에 있어서 **함수표현식만으로** 사용할 것을 권장

  ### Why?

  1.일단 함수선언식 예제

  ```jsx
  //1.sum(8,2)
  console.log(sum(8, 2)); //10

  //2. sum(yes,no)
  function sum(yes, no) {
    return yes + no;
  }
  //3.sum(4,5)
  console.log(sum(4, 5)); //9
  ```

  예제 1번은 아직 자기가 add() 함수에 정의 되지 않았지만

  add() 함수를 호출하는 것이 가능!

  왜냐면?

  함수가 자신이 위치한 코드에 상관없이 함수 선언문형태로 정의한 함수의 유효범위가

  코드의 맨처음부터 시작한다는것을 알수 있다!

  이것을 바로 함수 호이스팅이라 부른다.

  ## 결론

  함수를 선언하기 전에 함수를 선언한 것이기 때문에

  코드의 구조를 엉성하게 만들수도 있기에 더글라스 아저씨는 지적했다!

  ### so, 함수 표현식만을 사용하라고 권장함

  2.함수표현식 예제

  ```jsx
  //1.sum(8,2)
  console.log(sum(8, 2)); //Error

  //함수 표현식 형태로 sum() 함수 정의

  var sum = function (yes, no) {
    return yes + no;
  };

  //2.sum(5,4)
  console.log(5, 4); //9
  ```

  예제1번 함수는 함수표현식에서 실행이 될까? 답은 아니다!

  왜냐면?

  우리가 함수표현식 형태로 sum() 함수를 정의해줬기 때문에!

  so, 호이스팅을 일어나지 않는다!

  예제2번 함수를 보면 sum ()함수가 생성된 이후에 호출이 가능한것 알수있음!

  ## 결론

  함수표현식 형태는 정의해준 함수 생성된 후에

  함수의기능이 제대로 동작하는것을 확인할수있다

  ### so, 함수 표현식을 사용해서 불필요한 작업을 줄이자!

  ***

  ## 호이스팅 우선순위

  ### 같은이름 var변수 선언 VS 함수선언 에서의 호이스팅

  - 변수선언이 함수선언보다 위로 끌어올려짐.

  ```jsx
  var cafeName = '스타벅스';

  function cafeName() {
    console.log('스타벅스 이름이 나온다!');
  }
  function coffeeName() {
    console.log('돌체라떼 맛있음?');
  }

  var cafeMenu = '돌체라떼';

  console.log(typeof cafeName);
  console.log(typeof coffeeName);
  ```

  **\*\*\*** 내부의 호이스팅 (Hoisting) 의결과 **\*\***

  ```jsx
  //1.[호이스팅] 변수 값 선언
  var cafeName;
  var coffeeName;

  //2. [호이스팅] 함수선언문
  function cafeName() {
    console.log('스타벅스 이름이 나온다!');
  }
  function coffeeName() {
    console.log('돌체라떼 맛있음?');
  }

  //3. 변수값 할당
  cafeName = '스타벅스';
  coffeeName = '돌체라떼';

  console.log(typeof cafeName); //"string"
  console.log(typeof coffeeName); //"string"
  ```

  ### 값이 할당되어 있지 않은 변수 VS 값이 할당되어 있는 변수에서의 호이스팅

  ```jsx
  var cafeName = '스타벅스'; //값 할당
  var coffeeName; //값 할당 X

  function cafeName() {
    //같은 이름의 함수 선언
    console.log('스타벅스 함수');
  }
  function coffeeName() {
    //같은 이름의 함수 선언
    console.log('돌체라떼 함수');
  }

  console.log(typeof cafeName); //"string"
  console.log(typeof coffeeName); //"function"
  ```

  - 값이 할당 안되어있는 변수의 경우 !

    —> 함수선언문이 변수를 덮어쓴다.

  - 값이 할당되어 있는 변수의 경우!

    —> 변수가 함수선언문을 덮어쓴다.

# # 팁 (호이스팅 사용시 주의)

1. **코드의 가독성과 유지보수를 위해 호이스팅이 일어나지 않도록 한다.**

   - 호이스팅을 제대로 모르더라도 함수와 변수를 가급적 코드 상단부 에서 선언하면, 호이스팅으로 인한 스코프 꼬임 현상 방지가능
   - let/const 를 사용 하기

2. **var 를 쓰면 혼란스럽고 쓸모없는 코드가 생길 수 있음.근데 왜 우리는 var와 호이스팅을 이해해야 할까?**

- ES6를 어디에서든 쓸 수 있으려면 아직 시간이 더 걸려서 ES5로 트랜스컴파일을 해야함
- so, 아직은 var 가 어떻게 동작하는 이해하고 있어야함!
