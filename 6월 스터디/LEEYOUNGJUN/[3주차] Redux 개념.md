### Redux
1.Reducer

Reducer란?

이전 상태와 액션을 받아서 다음 상태를 반환한다<br/>
이전 상태를 변경하는것이 아니라 새로운 상태를 반환<br/>
기존 상태를 복사하고 변화를 준 다음에 반환<br/>
(previousState,action) => new State

```javascript
counter.js
import * as types from './ActionTypes'

// 초기 상태 작성 상수 형태의 객체로 작성
const initialState = {
    number : 0 
};

export default function counter(state = initalState, action){
    // if(typeof state === 'undefined'){
    //     return initalState;
    // } 
    switch(action.type){
        case types.INCREMENT:
            // return {number : state.number + 1}
            return {
                ...state, 
                number:state.number + 1
                } //spread 문법
        case types.DECREMENT:
            return {...state, number:state.number - 1}

        default:
        return state;
    }
}
```
```javascript
ui.js
import * as types from './ActionTypes'

const initialState = {
    color : [255,255,255]

    export default function ui(state= initialState,action){
        if(action.type === types.SET_COLOR){
            return{
                color :action.color
            }
        }else{
            return state;
        }
    }
}
```

```javascript
import {combineReducers} from 'redux'
import counter from './counter'
import ui from './ui'
const reducers = combineReducers({
    counter,ui
});

export default reducers;
```

2.Action

 작업에 대한 정보를 가지고 있는 객체

필수로 type을 가져야 한다
 ```javascript
 ActionTypes.js
 export const INCREMENT = "INCREMENT"
 export const DECREMENT = "DECREMENT"
 export const SET_COLOR = "SET_COLOR"
 ```

 ```javascript
 index.js
 import {INCREMENT,DECREAMENT,SET_COLOR} from './ActionTypes'
 import * as types from './ActionTypes' //위 아래 동일
 export function increment(){
   return{
     type : types.INCREMENT
   }  
 } // 액션 생성자

  export function decrement(){
   return{
     type : types.DECREMENT
   }  
 } // 액션 생성자


 export function setColor(){
   return{
     type : types.SET_COLOR,
     color : 
   }  
 } // 액션 생성자

 ```

3.Store

```javascript
App.js
import React fro ' react'
import ReactDOM ' react-dom'

import App from ;./components/App;

import {createStore} from 'redux'
import reducers from './reducers'

const store = createStore(reducers) //인수로 리듀서를 전달

console.log(store.getState()); // state의 상태를 보여줌
// subscribe() => 상태 변화가 있을때마다 특정 함수를 실행 
const unsubscribe = store.subscribe(()=> console.log(store.getState()))
store.dispatch(action.increment()); // action을 보내는 dispatch
store.dispatch(action.increment());
store.dispatch(action.decrement());
store.dispatch(acions.setColor([200,200,200]));

unsubscribe(); // dispatch로 action이 변경되는 log를 찍는다


render(){
  ~~~~
}

```

dispatch(action)

액션을 리듀서로 보낸다는것이다 

dispatch가 실행되면 스토어는 러듀서의 현재 자신 상태와 전다발은 액션을 전달해줌
새상태를 주면 현상태로 갈아 끼운다


### 차주 계획
Redux를 React에서 사용하는 예제들과 React_redux 에서 사용되는 함수들을 스터디할 예정입니다

참고
https://www.inflearn.com/course/react-%EA%B0%95%EC%A2%8C-velopert/>
