Mobx 란 React를 위한 상태 관리 라이브러리이다.

redux의 dispatch, action의 개념에 익숙한 유저라면 약간 생소할 수 있다.

Redux가 함수형 아이디어를 적용했다면, Mobx는 반응형 아이디어를적용했다.

Mobx 에서는 반응형 프로그래밍 패러다임에서

필수적으로 언급되는 옵저버(Observer) 패턴을 적극적으로 사용한다.

다만, MobX에서는 오직 상태(데이터)만 관찰 가능하며, 상태가 변경되었을 때 반응한다.

또한 상태를 변경시키는 것도 직접해야한다.

Mobx 은 상태를 Observable 하게 관리할 수 있도록 돕는 라이브러리이다.

(@)observable

observable은 넘겨받은 객체나 값 등을 Observable하게 만든다. 주로 객체를 넘기거나 클래스의 내부에서 데코레이터로 사용하게 된다.

```jsx
import { observable, autorun } from 'mobx';

class Person {
  @observable age = '30';
  name = '정민구';
}

const person = new Person();

autorun(() => {
  document.getElementById('age').innerText = person.age.toString();
});

autorun(() => {
  document.getElementById('name').innerText = person.name;
});

setInterval(() => {
  person.age++;
});
```

데코레이터 문법을 활용할 수 있다면 @observable 을 프로퍼티에 선언해줌으로써

observable한 값으로 만들수있다

위 예제를 보면, 나이는 1초마다 업데이트 되지만 이름값은 업데이트 되지 않는 것을 알수있다.

@observable 을 사용하게 되면 프로퍼티를 읽거나 쓰는것이 모든 값을 관찰 하는 것과 연관된다.

즉, person.age같은 코드로 값을 얻는 것은 옵저버를 등록하고, 실제로 그 값을 관찰(observe)하는 행위가 된다.

반대로 person.age = 10같은 코드로 값을 할당하는 것은 그 값을 관찰하는 모든 옵저버들에게 통지(notify)하는 행위가 된다.

**1.state**

**2.derivations**

**3.Reaction**

**4.Action**

# Observable

자바스크립트에서 하나의 item과 여러개의 item을 처리하는 2가지 방법(Async, sync)이 있습니다

Async는 비동기 방식으로 흔이 알고 있는 setTimeout, xhr, event등이 있습니다.

async한 상황에서 우리가 처리하던 방식은 callback 또는 주로 사용하던 promise가 있었습니다.

그치만 promise나 callback은 단 하나의 data을 받고 종료되어 버리는 패턴을 가지고 있습니다.

then(), catch()를 통해 데이터를 받고 끝나는 것 입니다.

그렇기 때문에 이 데이터들이 시간과 연계되어 잇달아 일어나게 받아야 하는 상황이 생긴다면 promise를 사용하여 해결 할 수 없습니다.

이때 사용할 수 잇는 것이 Observable객체 입니다.

promise 와의 큰 차이점은 Cancel 이 가능하다는것입니다

시퀀셜하게 들어오는 데이터의 스트림이기 때문에 취소를 할 수 있는것 입니다.

# Observer

promise에서는 결과에 대해서 resolve(), reject() 함수를 통해서 데이터를 전달해줍니다.

observable에서 이런 역할을 하는 객체가 observer 객체 입니다.

observer 객체에도 역시 데이터를 넣어주는 **next()함수 (= resolve),**

에러가 났을 때 에러를 보내줄 수 있는 **error()함수 (=reject)**

마지막으로 데이터 스트림의 종료를 알려주는 **complete()함수** 입니다. 이 종료 함수는 promise에는 없습니다.

observer의 구성을 정리하면 아래와 같습니다.

```jsx
observer = {
	next : function(data){},
	error : function(err){}.
	complete : function(){}
}
```

Observer & Observable

observer 객체의 next 함수를 사용하여 데이터를 time stream 에다가 push 해줄 수 있습니다

이것을 publisher 락 할수 있습니다.그리고 Observable은 데이터를 subscribe 할수 있습니다

Observable 을 subscriber 라고 할수 있습니다 예전부터 많이 사용하면 pub/sub 패턴을 생각하면된다.
