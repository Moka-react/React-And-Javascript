# 주제 선정 이유 : 이번에 새 프로젝트를 맡았는데 다 훅스를 쓰는 플젝이라 모호한 개념을 다 잡기 위해 공부하게 되었다

딱 7개만 공부해보려고 한다.

# 1.useState

useState 함수는 하나의 상태값만 관리 할 수 있기 때문에 컴포넌트에서 관리할 상태가 여러 개라면 useState 를 여러번 사용하기!

```jsx
import React, { useState } from 'react';

const sun = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };
  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName} />
        <input value={nickname} onChange={onChangeNickname} />
      </div>
      <div>
        <div>
          <p> 이름 :</p> {name}
        </div>
        <div>
          <p> 닉네임 :</p> {nickname}
        </div>
      </div>
    </div>
  );
};

export default sun;
```

# 2.useEffect

클래스형 컴포넌트의 componentDidMount 와 componentDidUpdate 를 합친 형태!

```jsx
useEffect (()=> {})

//마운트 될때만 실행하고 싶을때!
useEffect (()=> {
	console.log('마운트 될때만 실행됨!')
} ,[]);

//특정값이 업데이트 될때만 실행하고 싶을때!
useEffect (()=> {
	console.log(name)
} ,[name]);
 --> useEffect 는 두번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어준다
```

기본적으로 useEffect 는 렌더링 되고 난 직후마다 실행이 되고!

두번째 파라미터 배열에 무엇을 넣느냐에 따라 실행되는 조건이 달라진다

만약 컴포넌트가 언마운트되기 전이나, 업데이트 되기직전에 어떠한 직업을 수행하고 싶다면

useEffect 에서 뒷정리 함수(cleanup)를 반환해줘야함

```jsx
useEffect(() => {
  console.log('이펙트');
  console.log(name);
  return () => {
    console.log(
      '여기가 언마운트되기전! 업데이트 되기 직전에 언제 작업하고 싶으면!'
    );
    console.log(name);
  };
});
```

# 3.useContext

# 4.useReducer

# 5.useMemo

# 6.useCallback

# 7.useRef
