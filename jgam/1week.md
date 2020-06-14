토이프로젝트를 진행하면서 느꼈던 점을 몇가지의 포스팅을 통해서 공유해볼려고 합니다.

왠만하면 첫 언어 혹은 framework를 배우면서 바로 서비스를 처음부터 만들지 않는다. 대부분, 그 기술스택에 능한 사람을 옆에 끼고(?), 같이 만들게 되고 이렇게 되었을때 그 기술스택에 대해서 간접적으로 체험하며 어떤식의 동작과정을 거치는지에 대한 전반적인 이해는 훨씬 빠를수있으나, 처음부터 무언가를 만들려고 하면 부딫치는 여러가지 문제가 발생한다. 그 중 가장기본이되는 개념을 알아보고 조금 더 깊게 논의해보고자 한다.

### 컴포넌트란?
리액트에서의 컴포넌트는 가장 중요한 요소이다. 리액트로 만들어진 앱을 이루는 최소한의 단위가 컴포넌트이기 때문이다. 이 작은 컴포넌트들이 유기적으로 잘 연결되고 동작될때 같은 리액트앱이라도 훨씬 효율적인 앱이 될 수 있다. 정리하자면, **작으면서 단단한 컴포넌트**와 만들어진 컴포넌트들이 **유기적으로 연결되며 동작을 할때**, 좋은 앱이 만들어진다.

컴포넌트는 데이터를 입력받아 DOM Node를 출력하는 함수이다. 이때 입력받는 데이터는 props나 state같은것들이 있고, 공식문서에도 그렇게 나와있다.


### Uncontrolled Component VS Controlled Component
Uncontrolled component는 상태를 react에서 제이허지 않는다. 다른 말로 하자면, 상태가 바뀌면서 re-rendering되는 리액트의 특성을 뛰어넘게되고 rendering을 하지 않으며 이부분에서 cost-efficient하다고 할 수 있다. 그렇다면 어떤 경우에 uncontrolled component를 써야 되는가? 예를 든다면, form에다가 쓸 수 있을것이다. 하지만, 초기화 기능을 쓰고싶을때는, controlled component를 써서 state를 refresh 해줘야될것이다.

### Pure Component?
Pure Component가 이번 블로깅을 하게된 이유이기도 할만큼 쉽지만 복잡한 내용을 담고있다. (물론 나에게만 복잡할수도...) pure component는 props나 state를 얕은 비교해서 변경점이 없으면 render를 다시 실행하지 않는다. 다른말로 하면, props나 state변화가 없다면 rendering하지 않기때문에, 훨씬 효율적이다. 상상 해보자. pure component로 form을 구성하는 이메일과 비밀번호의 컴포넌트를 만들었다면, 이메일이 바뀌었을때 email pure component가 실행이되지만, password pure component는 실행되지 않을것이고 이럴때, pure component 와 controlled component를 이용한 효율을 높일수 있다.

그렇다면... pure component만 사용하면 앱이 항상 최적화될까?
그렇지 않다.

불필요한 비교로직이 들어가기 때문에 더 느릴수도있다. 예를들어서
> <Input
>     type="password"
      ...
  	  onChange={{{target: {value}}) => this.setState({password: value })}
/>


  이때 component가 렌더링 되면서 함수 인스턴스가 새로생성되고, 그 말뜻은 onChange가 무조건 콜된다는것이다. 다른말로하면, 무조건 인풋컴포넌트가 리렌더링 되고 이것은 우리가 애초에 원했던 동작방식과는 틀리다.
  
 
### Functinoal Component?
  
 Component자체가 props를 받아 node를 렌더하는 함수에 가까운 개념으로 component를 작성하는 컴포넌트이다. 필자도 함수형 컴포넌트를 사용하는데 이유는 가독성이 훨씬 좋다. 또한 클래스형과 마찬가지로 Hooks라는 기능을 이용해서 함수형컴포넌트로 앱을 작성할 수 있게된것도 큰 장점이다.

#### React.memo?
  함수형 컴포넌트에서 pure component를 쓰고싶을때 사용하는 훅스이다. 이름에서 추론가능하다싶이, memoization에서 따온 네이밍이다. 순수함수의 입력이 같으면 리터하는 값도 항상 같다는 점을 이용해서 한번 계산한 반환값을 저장해두고 다음 입력이 들어올 때 저장된 값을 반환한다. React.memo의 경우에는 props와 state가 같다면 굳이 렌더링을 하지 않는 형태로 구현가능하다.

  #### useCallback?
  함수형 컴포넌트는 함수의 본문자체가 render함수이기 때문에, 이벤트 헨들러를 어디서 만들어냐에 대해서 계속 새로운 함수를 만들게 된다. 이유는 렌더가 되면서 새로운 함수 인스턴스가 생성되기때문에. 이것은 아까 pure component에서 inline function을 생성하는것이랑 똑같은 원리로 **비효율적**이다.
  
  이것을 해결하기위해서, useCallback을 씁니다. 사용법은 쓰고싶은 함수를 useCallback으로 감싸고 두번째인자에, 빈 배열을 넘기면 된다. 두번째 배열은 dependency list라는 것인데, useCallback의 동작원리는 클로저 입니다. 좀더 자세하게 말하자면, 첫번째 인자의 함수가 클로저 생성된 당시의 값을 기억하지만, 그값이 업데이트되면 의미가 없어지는 것이죠. 따라서, 그값이 업데이트 될때마다 새로운 함수를 만들어야되고 그기준이 dependency list가 되는것입니다.
  
  #### useMemo?
  만약 props로 넘겨준 것이 react Node일 경우에는 항상 새로운 노드가 생성되면서 매번 랜더가 일어날것이다. 이문제를 막기위해서 useCallback을 사용한다.(usecallback이란 비슷한 개념이다)

  
  #### useEffect?
 useEffect는 훅스에서 componentDidMount와 componentDidUpdate가 실행되는 시점을 합한 개념이다. 여기서 data fetching같은 side effect를 발생 시킬수있다.
  componentWillUnmount는 useEffect에 리턴으로 값을 줄때 실행 할 수 있다. 이것을 클린업이라고 하는데, 같은 관심사를 가진 로직을 한데 묶어놓을수있기에 유용하다.
  
  ### 마무리
  리액트에는 이런 여러가지 컴포넌트가 존재하고 시대의 흐름에따라 함수형 컴포넌트가 생겨나고 그에따른 훅스가 생겨났다. 어떤 컴포넌트가 어떻게 쓰이고 또한 어떤식으로 발전을해왔는지를 이해하는것이 컴포넌트사용에 있어 훨씬더 효율적이고 다양한 방법을 제시할 수 있다.
