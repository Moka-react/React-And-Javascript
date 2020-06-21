
# 주제 선정이유
   class 형태의 컴포넌트로 구성된 프로젝트를 진행하다 상태관리에 용이하다는 Hooks를 이용하여 프로젝트를 진행하려고 합니다. 프로젝트를 진행하는데에 있어서 보다 개념을 확실히 정리하여 개발을 진행하는것이 원활한 개발 진행방향으로 나아갈 수 있게 될 것같아 개념부터 천천히 정리해보려고 합니다.


# React Hooks 

## Hooks란?
  function(함수)형 컴포넌트에서 사용할 수 없었던 라이프 사이클 및 state 형태를 사용하게 해주는 JavaScript 라이브러리
  
  데이터가 많아질수록 처리 속도도 향상된다는 소문이 있지만 정확하게 검증된건지는 잘 모르겠습니다.
  Hooks의 장점을 더 아시는분은 알려주시면 감사하겠습니다 ㅎㅎ
  
### Hooks 규칙
- 최상위에서만 Hook 호출 가능, 반복문,조건문,중첩된 함수 내에 Hooks는 실행될 수 없다
- 함수형 컴포넌트 내에서만 Hooks 가능,일반 JS함수, Class 형 컴포넌트에서는 선언 불가능


### 1. useState

사용법 1
``` javascript
const [state,setState] = useState('초기값')
```

클래스 컴포넌트의 setState 메서드와 다르게, useState는 갱신객체를 자동으로 합치지는 않습니다.
함수 업데이트 폼을 객체 전개 연산자와 결합함으로써 동작을 복제 할 수 있습니다.  
``` javascript
setState(prevState => {
    return {...prevState,...updatedValues};
})
```

※
기존 setState는 동기식으로 처리되며 중간에 다른 작업들을 할 수 있지만 두번째 인자에 실행할 함수를 설정
해주면 실행할 함수를 비동기로 처리해 준 후 setState를 진행함
``` javascript
this.setState({
    
},()=>{
    function 실행할 함수
}) 
```

### 2.useEffect
- useEffect는 함수 컴포넌트 내에 side Effect를 수행할 수 있게 해준다.<br/>
※ side Effect : 데이터를 가져오거나 DOM을 직접 조작하는 작업
- 기본적으로 모든 렌더링이 완료된 후에 수행
- useEffect 사용 시 DOM을 바꾼 뒤 useEffect안에 실행한 'effect' 함수 실행 
- 여러개의 useEffect 선언 가능
  
사용법
``` javascript
useEffect(()=>{
    '실행할 함수 혹은 기능'
    return (()=> { // 해제할 필요가 있는 기능 구현 시 return에서 선언, ComponentDidUnmount 역할
        '해제할 기능' 
    })
},[두번째 인자])
//1. 두번째 인자가 빈 배열일 경우 렌더링 되기 최초 한 번 실행 (ComponentDidMount)
//2. 두번째 인자로 설정된것의 변화가 있을때 useEffect내에 실행한 함수를 실행(ComponentDidUpdate)
```

Custom Hooks
생성한 Hooks를 다른 함수형 컴포넌트에서 객체 형식으로 사용할 수 있다.
``` javascript
1. function useFriendStatus(friend ID)
{
   const [isOnline,setIsOnline] = useState(null);
   ~~~
   return isOnline
}

2. function FriendStatus(props){
    const  isOnline = useFriendStatus(props.friend.id);
    ~~~
    return isOnline ? "Online " : "Offline"
}

3. function FriendListItem(props){
   const isOnline = useFriendStatus(props.friend.id);
   ~~~
   return (
     <li style ={{color:inOnline ? "green" :"black"}}>
      {props.friend.name} 
    </li>
    )

}
```
참고 <br/>
https://reactjs.org/docs/hooks-reference.html 
