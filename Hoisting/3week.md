호이스팅 개념

함수안에 있는 선언들을 모두 끌어올려서 해당 함수 유효범위의 최상단에 선언하는 것을 말한다.

**호이스팅이란**

자바스크립트 함수는 실행되기전에 함수안에 필요한 변수값들을 모두 모아서 유효범위의 최상단에 선언한다.

- 함수 안에 존재하는 변수 /함수선언에 대한 정보를 기억하고 있다가 실행시킨다.
- 유효범위 : 함수 블록 {} 안에 유효

**호이스팅의 대상**

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

함수선언문 과 함수표현식에서의 호이스팅

- 함수선언문에서의 호이스팅

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

- 함수표현식에서의 호이스팅

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
