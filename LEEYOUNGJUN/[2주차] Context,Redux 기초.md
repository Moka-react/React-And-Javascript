### React 상태관리 (Context,Redux,Mobx)


1. Context

 - 단계마다 일일이 props를 넘겨주지 않고도 컴포넌트 트리 전체에 데이터를 제공할 수 있습니다.

 ```javascript
<GrandMother>

<Mother>

<Me>
// <GrandMother>의 컴포넌트에 있는 state,prop의 정보를 <Mother> 컴포넌트를 거치지 않고 <Me> 에게 바로 전달 해줄 수 있다
```

주의) context 사용시 컴포넌트를 재사용하기 어려워질 수 있다.

``` javascript
const MyContext = React.createContext(defaultValue)

or

import {createContext} from 'react'

const MyContext = createContext(defaultValue)

// defaultValue는 트리 안에서 적절한 Provider를 찾지 못했을 때만 쓰이는 값

let useValue : {

   name : "LEE"

   age : 27

};

<MyContext.Provider value = {useValue} >

    <ChildComponent/> // {useValue}을 사용하기 위한 하위 컴포넌트

</MyContext.Provider>
```
 

Context 오브젝트에 포함된 React 컴포넌트인 Provider는 context를 구독하는 컴포넌트들에게 context의 변화를 알리는 역할을 합니다.

 

생성된 Context는 Provider과 Consumer을반환하여 최상위 컴포넌트를 Provider로 감싸면 하위에 있는 컴포넌트들은 Provider에 value로 설정한 값을 Consumer로 받아 value값들을 사용할 수 있습니다.


2. Redux

JavaScript 어플리케이션에서 data-state와 UI-state를 관리해주는도구<br/>
FlUX 아키텍처를 편하게 사용해주는 라이브러리

※ FLUX 아키텍처란? <br/>
   시스템에서 어떠한 Action 을 받았을 때, Dispatcher가 받은 Action들을 통제하여 Store에 있는 데이터를 업데이트합니다. 그리고 변동된 데이터가 있으면 View 에 리렌더링합니다.
그리고, View에서 Dispatcher로 Action을 보낼 수도 있죠
Dispatcher은 작업이 중첩되지 않도록 해줍니다. 즉, 어떤 Action이 Dispatcher를 통하여 Store에 있는 데이터를 처리하고, 그 작업이 끝날 때 까지 다른 Action들을 대기시킵니다.

Redux 사용시 3가지 원칙<br/>
1. Single Source of Truth (모든state를 담는 단하나의 스토어)
 - 어플리케이션의 state를 위해 단 한개의 store를 사용, 모든 state가 한곳에 있다
2. State는 읽기 전용
-  어플리케이션에서 state를 직접 변경할 수 없다
-  action 이 dispatch 되어야 state가 변경 된다
3. action을 처리하는 함수인 Reducer인 순수 함수로 변화는 이루어 져야한다

store: React.js 프로젝트에서 사용하는 모든 동적 데이터들을 담아두는 곳 입니다.<br/>
action: 어떤 변화가 일어나야 할 지 나타내는 객체입니다.<br/>
reducer: action 객체를 받았을 때, 데이터를 어떻게 바꿀지 처리할지 정의하는 객체입니다.
이전 상태와 액션을 받아 다음 상태를 반환하는 함수이다

순수함수란?<br/>
외부 네트워크 혹은 데이터베이스에 접근하지 않아야한다.<br/>
return 값은 오직 parameter 값에만 의존되어야한다.<br/>
인수는 변경되지 않아야한다.<br/>
같은 인수로 실행된 함수는 언제나 같은 결과를 반환해야한다.<br/>
순수하지 않은 API 호출을 하지 말아야 한다. (Date 및 Math 의 함수 등)<br/>

2-1) 액션(Action)<br/>
- 애플리케이션에서 스토어로 보내는 데이터 묶음 store.dispathc()를 통해 보낼 수 있다
- 액션은 자바스크립트 객체 이다
- 반드시 어떤 형태의 액션이 실행될지 나타내는 type 속성을 가져야 함
  
```javascript
const Todo_List = 'Todo_List'
{
   type : Todo_List,
   text : 'Redux Test'
}
```

2-2) 액션 생상자
- 액션을 만드는 함수

```javascript
function Todo_List(text){
   return{
      type : Todo_List,
      text
   }
}
// 실제로 액션을 보내려면 결과값을 dispatch()함수에 넘겨줘야 한다
dispatch(Todo_List(text)) 
or
const bound_Todo_List = (text) => dispatch(addTodo(text)) 
// 자동으로 액션을보내주는 바인드된 액션 생성자 생성
```

2-3) 리듀서(Reducer)
- 이전 상태와 액션을 받아서 다음 상태를 반환하는 순수 함수
```
(previousState,action) => newState
```

2-4)  스토어(Store)

- 애플리케이션의 상태를 저장 
- getState()를 통해 상태에 접근
- dispatch(action)를 통해 상태를 수정
- subscribe(listener)를 통해 리스너를 등록

### 차주 예정 
생각보다 Redux의 개념이 어려워 파악한 Redux를 기준으로 Redux의 예제 및 플로우를 확인 해보아야 할거 같습니다

참고 <br/>
https://ko.reactjs.org/docs/context.html <br/>
https://velopert.com/1225<br/>
https://deminoth.github.io/redux/basics/Store.html
