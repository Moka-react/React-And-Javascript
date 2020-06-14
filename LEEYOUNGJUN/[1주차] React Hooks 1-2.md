## 3. useContext

### Context란?
주로, 애플리케이션으로 전역적으로 데이터가 사용되야 할 때 사용됩니다. (전역적인 상태 관리)
여러 컴포넌트를 거쳐서 값을 전달해주는것이 아니라, Context를 통해서 원하는 값이나 함수를 바로 사용할 수 있습니다.

```javascript
import React,{useContext,createContext} from react;

const TextContext = createContext();
conts TextContext2 = createContext();

const UseContextExample= () =>{
    const hello = useContext(TextContext)
    const world = useContext(TextContext2)

    return (
        <div>
        {hello + '' + world}
        </div>
    )
} // 함수형 컴포넌트 안에서 useContext를 사용하여 만들어진 Context에서 값을 불러옴

function App(){
    return(
        <div>
        <TextContext.Provider value="hello">
            <TextContext2.Provider value ="world">
                <UseContextExample  />
            </TextContext2.Provider>
        </TextContext.Provider>
        </div>
    )
}
```

## 4. useMemo
 메모이제이션(Memoization)이란?
  - 기존에 수행한 연산의 결과값을 어딘가에 저장해두고 동일한 입력이 들어오면 재활용하는 프로그래밍 기법
  - 적절히 사용시 중복 연산을 피할 수 있으며 성능 측면에서 큰 이점이 있다.

``` javascript
function compute(x,y){
    return z
}
```
x,y값이 기존과 동일한 경우 연산을 시작하지 않고 메모리에 저장해놨던 z의 값을 그대로 사용하는 기법

사용법

```javascript
import {useMemo} from 'raect'
function MyComponent({x,y}){
    const z = useMemo(()=>compute(x,y) , [x,y])
    return z  
}
```

x와 y값이 렌더링했을때와 동일할 경우 렌더링 때 구했던 결과값을 재활용 합니다
하지만 x,y 값이 이전에 렌더링 했을때와 달라졌을경우 ()=>compute(x,y) 함수를 호출하여 z에 할당해 준다 


## 5. useReducer   
usetState / Redux 와 비슷하게 동작한다
여러 State를 관리하기 위해 사용한다.

```javascript 
const [state,dispatch] = useReducer(reducer,initialArg,init){
}
```
useReducer 는 reducer와 초기 State 를 받고, 반영될 State 와 Dispatch 를 반환한다.
Reducer 는 현재 State 와 Dispatch 로부터 받은 Action을 받아, 이후 반영될 State 를 반환한다.
Dispatch 에게는 Action을 넘길 수 있으며 useReducer의 reducer 가 처리된후 재 랜더링한다.

참고 <br/>
https://www.daleseo.com/ <br/>
https://reactjs.org/docs/hooks-reference.html

# 다음주 주제 

React 상태관리 (Context,Redux 등) 
Hooks를 이용한 프로젝트 관리법
