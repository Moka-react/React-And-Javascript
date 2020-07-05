> 면접관: 실행컨텍스트란 무엇인가요? 설명가능한가요?

프론트 개발 2-3개월 차일때, 이직을 고민하고 면접봤었던 회사에서 면접관의 질문이었다. 그당시 어떤 말을 했는지 잘 기억이 나진 않지만, 결과적으로 면접관을 납득 시킬만한 대답을 하진 못했던 기억이난다. 그후에 공부하고 이해했던 바로는, **자바스크립트의 실행환경에 대한 정의였다.**

이번 스터디때 이 과정에 대해서  다시한번 정리를 할려고한다.

## 컨텍스트
자바스크립트에는 **컨텍스트** 라는것이 존재한다. 컨텍스트는 환경이라는 것과 비슷한데, 이렇게만 설명을 하면 이해가 안되니 조금더 깊게 들어가보자.

자스에서 처음 코드를 실행하면 **전역컨텍스트**가 생성이된다. 페이지가 종료될때까지 유지된다. 함수를 호출할때마다는 **함수컨텍스트**가 생성된다. 이렇게 컨텍스트는 어떠한 자스안에서 그안의 환경을 새로 만들면서 변수,혹은 함수들을 관리하는것이다.

#### 컨텍스트 4가지 특징
1. 전역컨텍스트 생성후, 함수호출마다 컨텍스트가 생긴다. (이것은 함수컨텍스트)
2. 컨텍스트 생성시 그 안에, 변수객체(arguments, variable), scope chain, this가 생성된다
3. 컨텍스트 생성후에 함수가 실행되고, 사용되는 변수들을 변수 객체안에서 값을 찾고 없다면 스코프체인을 이용해 올라가며 찾는다.
4. 함수 실행이 마무리되면, 해당 컨텍스트는 사라진다. (클로저 제외)

예제 코드를 통해서 각각의 컨텍스트를 알아볼려구 한다.
```js
var name = 'jgam';
function hello(word) {
  console.log(word + ' ' + name);
}
function say () {
  var name = 'reactStudy';
  console.log(name);
  hello('hello');
}
say();
```

## Global Context
전역컨텍스트가 생성된 후에, 두번째 원칙에 따라 변수객체, scope chain, this가 들어온다. 물론 전역객체에 arguments는 없다. variable은 해당 변수! scope chain은 자기 자신이다. (전역이니까) this는 윈도우 이다. 여기서 this를 바꾸는 방법은 new를 통해서 인스턴스를 호출하는 것이다. 혹은 bind를 통해서 상속하는 this를 바꿔줄수 있다. 이제 이것을 코드로 한번 보자.
```js
'globalContext': {
	variableObjects: {
    	arguments: null,
        variable: ['name', 'hello','say']
    },
    scopeChain: ['globalContext'],
    this: window,
}
```
여기서 variable을 보면 name, hello, say가 있는데, name 은 변수이니 이해가 가지만, hello 와 say는 왜 그럴까? 바로 **호이스팅** 때문이다. 이부분은 나중에 다루도록 하겠다.

이제 예제 코드가 위에서 부터 실행되면서, variable은 이런식으로 바뀔것이다.
```js
...
variable: [{name: 'jgam'},{hello: Function}, {say: Function}]
...
```

## Functional Context
예제 코드가 실행될때 마지막줄의 execution은 say함수를 콜할것이다. 이럴때 say함수의 컨텍스트가 생성된다. 이 컨텍스트에 대한 정보를 코드로 보자.
```js
"SayContext":{
	variableObject: {
    	arguments: null,
        variable: ['name'],
    },
    scopeChain: ['say의 variableObject','GlobalContext_variableObject'],
    this: window,

}
```
간단한 설명으로는, argument는 없으니 null이고, variable은 함수안에 name을 가리키게 된다. 스코프체인은 현재 컨텍스트안의 변수들을 체크하고 없다면 global context를 가게 된다. 유의할 점은, 항상 현재 컨텍스트의 변수객체가 scopeChain array의 앞쪽에 푸시가 된다.(뒷쪽 아님!) 그러고 this는 설정해준적이 없으니 자연스럽게 window가 된다.

그러고 자연스럽게 say 함수줄로 올라가서 차례대로 실행이되면서, name은 reactStudy가 될것이고 console의 method가 실행되면서 reactStudy를 로깅한다. 그러면서 hello라는 함수를 실행시키게 된다. 그런데 이때 자바스크립트는 현재 컨텍스트에서 hello라는 변수를 찾게되는데, 찾을수가 없다. 그래서 스코프 체인의 globalcontext_variableObject를 찾게되고, 상위변수객체에서는 hello라는 함수가 정의가 되어있다. 이걸 호출하게된다.

그러고 hello가 콜되면서 hello에 대한 함수 컨텍스트가 새로 생성되게 된다. 이것을 또 코드로 한번 보자.
```js
"helloContext":{
	variableObject:{
      arguments: [{ word: "hello"}],
      variable: null,
    }
    scopeChain: ['wow_variableObject', 'global_variableObject'],
    this: window,
}
```
이것을 또 자세히 보자면, arguments는 있으니 word: "hello"로 정의가 되고 hello함수안에 변수는 없으니 null 이다. scopeChain을 보면, 현재 컨텍스트의 변수객체를 확인하고, 그 이후에는 전역변수객체를 확인한다. 이것은 lexical scoping에 따라 hello함수의 스코프 체인은 선언시에 정해져있다. this는 또 바인딩해준것이 없기에 window가 된다.

이제 코드를 실행하는부분을 보자. 주의할점은 아직 say함수가 종료되지 않았다. hello함수는 console.log를 할때 인자인 word: hello와 현재 컨텍스트에 없지만 전역컨텍스트에있는 name을 가져와서 'hello jgam' 을 로깅 하게된다. 이것이 실행되고 현재 컨텍스트인 hello 함수 실행이 마무리되면서 컨텍스트가 사라지게되고 그 이후에 say함수의 실행도 마무리되면서 컨텍스트가 사라지게 된다.

결과적으로 마지막에 프로그램 실행이 끝나고 전역컨텍스트도 사라지게 된다.

사실 여기까지가 컨텍스트의 기본적인 내용이라 생각했지만, 앞서 언급한 호이스팅 관한 내용도 간단하게 정리 해보면서 글을 마무리하고싶다.(사실 자바스크립트는 모든 개념이 이렇게 연관되어있어서, 한가지의 개념을 설명하는게 그렇게 쉽지않은거같다.)

## 호이스팅
호이스팅이란 변수를 선언하고 초기화했을때 선언 부분이 최상단으로 끌어올려지는 현상을 말한다. 코드를 보면 이해가 빠를테니, 코드를 보자.
```js
console.log(name);//undefined
Hello();//wow
function Hello(){
	console.log('wow')
}
var name = 'jgam';
```

이 코드의 첫 2라인을 보면 이해가 가지 않는다. 변수와 함수가 나중에 선언 되었더라도 각각 실행하는데는 문제가 없다. 이것이 호이스팅이다. 호이스팅으로 해석된 코드를 다시보자.
```js
function Hello(){
  console.log('wow');
}
var name;
console.log(name);
Hello();
name = 'jgam';
```
이제 이해가 쉽다. 함수는 선언식이 위로 올라오면서 문제 없이 출력이되지만, name은 선언된 변수만 위로 올라가서 (아직 assign이 된 상태가 아님) undefined를 출력한다. 그렇다면, 함수를 **선언식**이 아닌 **표현식**으로 작성한다면 어떻게될까?
```js
Hello();//refernce error
var Hello = functino(){
  console.log('wow');
}
```
이렇게 되면 에러가 뜬다. 이유는 Hello는 변수 선언이 되어있지만 함수로 인식되지 않아서 변수를 콜할려고 할때는 reference error가 뜬다.

위의 글과 연관짓는다면, 전역 함수에 say와 hello는 변수로 호이스팅 되는 것이다!


