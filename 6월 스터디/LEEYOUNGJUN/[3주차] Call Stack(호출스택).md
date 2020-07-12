### CallStack(호출스택) 이란?
현재 실행중인 서브루틴에 관한 정보를 저장하는 스택 자료구조 
현재 실행 중인 서브루틴의 실행이 끝났을 때 제어를 반환할 지점을 보관하기 위해 사용된다

※ 서브루틴(Sub-routine)이란?
  

  반복되는 것을 한 먼만 사용하요 메모리 사용을 최대한 줄이도록 고안된 것이 서브 루틴이다<br/>
  반복되는 기능에 대해서 하나의 서브루틴(ex 함수)을 메모리에 적재한 뒤 필요시 마다 해당 메모리를 호출하여
  기능을 실행한다.

```javascript
function addFunction(a,b) {
    return a+b;
}

function printAddResult(x,y){
    let addresult = addFunction(x,y)
    console.log(addresult)
}

printAddResult(10,100)
```
```
step 1

printAddResult(10,100)

step 2 

addFunction(a,b) <br/>
printAddResult(10,100)

step 3 

console.log(addresult) <br/>
printAddResult(10,100)

step 4 

printAddResult(10,100)

step 5 

```


설명)
엔진이 코드를 실행 하기 전에는 호출 스택이 비어있다 맨 아랫줄에 printAddResult 함수가 실행되고(step1)
step1이 실행 된후 addFunction(x,y) 함수(스택)이 쌓인다 addFunction(x,y) 함수가 완료되고 console.log(addresult)가 스택에 쌓이고 실행된후 제거 된다 printAddResult 스택(함수)는 위에 쌓여진 스택들이 다 사라진 다음에 실행되는 구조인것이다.  


함수를 선언함에 있어서 재귀함수를 마구잡이로 사용하면 stack이 많이 쌓여 공간 복잡도가 증가하여 stack overflow가 발생하여 프로세서가 정상 작동 할 수 없다 <br/> 
일반적으로 컴파일러나 인터프리터가 콜 스택을 관리해준다고 하지만 무분별한 함수 호출로 인한 stack의 중첩은 프로세서 실행에 영향을 끼칠 수 있다

이 문제를 해결하기 위해서는 비동기 콜백(Asynchronous callbacks)를 사용하는 것이다
코드의 일부를 실행하고 나중에 실행될 콜백함수를 제공하는것이다
무분별한 비동기 콜백 또한 프로세서 실행속도에 영향을 미칠 수 있기 때문에 적절한 콜 스택을 이용하는것이 개발을 잘하는 길이 될거 같다.
