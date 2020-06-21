### Preface

흔히 생각하는 도큐먼트의 목적을 가진 정적인 문서에서, 다양한 요소들이 다이나믹하게 상호작용하는 지금까지, 모던 웹어플리케이션은 지난 몇 년 동안 큰 발전을 해왔습니다. 다이나믹한 웹의 끝판왕을 보여주는 듯한 [Apple](http://www.apple.com)의 웹사이트가 대표적인 예시입니다.

수요가 있으면 공급이 있듯이, 우리의 수요에 따라 Javascript도 발전을 이루어왔습니다. 비동기적인 요청을 위한 큰 흐름을 보자면 XMLHttpRequest부터 Ajax, Promise, fetch, async&await까지 선택지가 다양해졌습니다.

주로 Promise로 코드를 짜오던 습관을 코드의 간결함과 가시성을 위해서 ES6의 Async&Await를 깊이 공부하고 사용하기로 했습니다.

---

### Async & Await

ES6에서 Async & Await을 지원하기 시작한 이 기능은 비동기적인 요청을 동기적인 코드로 보이도록 해 주고 코드를 간결해주는데 큰 역할을 하고 있다. Promise를 써본 이들은 잘 알겠지만, then(), catch() chain을 쓰다 보면, 작성하고 있는 코드가 잘 짜고 있는지 고뇌가 생기곤 한다.

async & await 키워드는 비동기적이고, promise 기반 코드를 간결하고, Promise chain으로부터 벗어날 수 있게 해 준다. 이를 사용하기 위해서는 Async는 reserved word로 함수 선언에 prefix로 붙여줌으로써, 비동기적인 함수임을 나타낸다. 그리고 이 함수 블럭 내에서 비로소 await syntax를 사용할 수 있게 된다. (이외의 범위에서는 syntax error가 반겨줄 것이다.)

```
async function name([param[, param[, ...param]]]) {
   statements
}
```

**\- Parameters**

name: 함수 이름

param: 함수에 전달될 arguments들

statements: 함수내의 로직 (주로 await를 이용한다.)

**\- Return value**

async 함수의 결과 값인 Promise 객체를 리턴한다.

사실 이 부분이 중요하다. 아래에서 볼 수 있듯이, Async는 사실 Promise 객체에 value를 리턴한다. 따라서, async function의 값을 활용해야 한다면. hello().then((res) => ...)처럼 로직을 짜주어야 한다.

```
async function hello() {
  return "hello, world!"
}

//result::
Promise {<resolved>: "hello, world!"}
```

---

### Async & Await의 기본적인 사용법

```
function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling');
  const result = await resolveAfter2Seconds();
  console.log(result);
  // expected output: 'resolved'
}

asyncCall();

```

resolveAfter2Seconds() 함수는 2초 후에 promise 객체에 'resolved'를 포함해서 리턴한다.

asyncCall() 함수는

1\. 'calling'을 console에 로그를 찍는다.

2\. resolveAfter2Seconds 함수의 리턴 값을 기다린다.

\*\* 이 때, control을 잠시 양보하고, 비동기적인 함수인 resolveAfter2Seconds이 resolve() 또는 reject()이 되기를 기다렸다가 순서적으로 다시 진행하기 시작한다. 그러고 나서 Promise의 값을 받아온 후, result에 저장한다.

3\. result의 값을  console에 로그를 찍는다.

---

### Async & Await를 이용한 활용

```
function resolveAfter2Seconds() {
  console.log("starting slow promise")
  return new Promise(resolve => {
    setTimeout(function() {
      resolve("slow")
      console.log("slow promise is done")
    }, 2000)
  })
}

function resolveAfter1Second() {
  console.log("starting fast promise")
  return new Promise(resolve => {
    setTimeout(function() {
      resolve("fast")
      console.log("fast promise is done")
    }, 1000)
  })
}

async function sequentialStart() {
  console.log('==SEQUENTIAL START==')

  // 1. 거의 바로 실행이 됨.
  const slow = await resolveAfter2Seconds()
  console.log(slow) // 2. 과정(1)후, 2초 후 실행

  const fast = await resolveAfter1Second()
  console.log(fast) // 3. 과정(1)후, 3초 후 실행
}

async function concurrentStart() {
  console.log('==CONCURRENT START with await==');
  const slow = resolveAfter2Seconds() // 동시에 타이머 시작
  const fast = resolveAfter1Second() // 동시에 타이머 시작

  // 1. 거의 바로 실행이 됨.
  console.log(await slow) // 2. 과정(1)후, 2초 뒤에 실행
  console.log(await fast) // 3. 과정(1)후, 2초 뒤에 실행 && fast가 미리 실행되었기 때문에, 과정(2) 이후에 거의 바로 실행
}

function concurrentPromise() {
  console.log('==CONCURRENT START with Promise.all==')
  return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then((messages) => {
    console.log(messages[0]) // slow
    console.log(messages[1]) // fast
  })
}

async function parallel() {
  console.log('==PARALLEL with await Promise.all==')

  await Promise.all([
      (async()=>console.log(await resolveAfter2Seconds()))(),
      (async()=>console.log(await resolveAfter1Second()))()
  ])
}

sequentialStart()

// sequentialStart 함수가 끝날 때까지 기다렸다가 실행
setTimeout(concurrentStart, 4000)

// concurrentStart 함수가 끝날 때까지 기다렸다가 실행
setTimeout(concurrentPromise, 7000)

// concurrentPromise 함수가 끝날 때까지 기다렸다가 실행
setTimeout(parallel, 10000)
```

코드 1에서 Advanced된 코드이다.

**\- sequentialStart() 함수**

2. resolveAfter2Seconds() 함수

2초 동안 pause 후, Promise return 값을 받는다.

3.  resolveAfter1Second() 함수

\*\* 과정 2를 끝내고서야, 위의 함수를 실행시키고 1초 pause 후, Promise return 값을 받는다.

함수명대로 await의 나열을 통해 sequential 하게 처리하고자 할 때, 사용할 수 있는 방법이다.

```
starting slow promise
slow promise is done
slow
starting fast promise
fast promise is done
fast
```

**\- concurrentStart() 함수**

1. 위에서 resolveAfter2Seconds(), resolveAfter1Second()를 동시에 실행됨.

2. await이 걸린 상태이므로, resolveAfter2Seconds()의 2초 후 리턴 값을 console에 찍음.

3.await이 걸린 상태이고 함수는 1초 후에 값을 return 했지만, resolveAfter2Seconds의 await 영향으로 2초 기다리다가,  리턴 값을 console에 찍음.

\*\* sequentialStart() 함수와는 다르게 동시에 함수를 call 하지만, 콘솔에 찍히는 값은 await으로 인해 2초 후에 동시에 찍힘.

```
fast promise is done
slow promise is done
slow
fast
```

**\- concurrentPromise() 함수**

concurrentStart()와 비교하면 재밌다.

1. resolveAfter2Seconds(), resolveAfter1Second()를 Promise.all()에 담는다.

\*\* [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)은 return 타이밍이 다른 각 비동기 함수들의 모든 요청의 결과 값을 하나로 모아준다. 즉, 비동기적인 요청을 동시에 실행하고, 리턴 값을 iterable로 내준다. 따라서, 미리 끝난 요청은 다른 요청이 끝날 때까지 기다려야 한다.

fast promise is done  
slow promise is done  
slow  
fast

```
fast promise is done
slow promise is done
slow
fast
```

**\- parallel() 함수**

concurrentStart(), concurrentPromise()와는 다르게 병렬적으로 비동기적인 요청을 사용할 때의 방법이다.

1. resolveAfter2Seconds(), resolveAfter1Second()를 모두 console 찍는 것으로 병렬 task 요청한다.

\*\* 콘솔에 resolveAfter1Second(), resolveAfter2Seconds()의 값이 아래처럼 찍히고 나서야, Promise.all이 처리한다.

```
fast promise is done
fast
slow promise is done
slow
```

---

### Async & Await 그리고 Error Handling

일반적으로 promise 로직이 값을 resolve(value) 하지만, reject(value)의 경우, throw문과 같다.

위에서 설명한 것처럼, 아래 (1) await의 결과가 reject일 경우, (2)의 코드와 같다.

```
// (1)
async function f() {
  await Promise.reject(new Error("Whoops!"));
}

// (2)
async function f() {
  throw new Error("Whoops!");
}
```

실제 프로젝트에서 Promise 내 로직은 비동기적으로 움직이기 때문에, 값을 받기 위한 딜레이가 있다. reject을 받은 경우, 위의 예시처럼 await은 error을 throw 하므로 이를 try..catch로 핸들링할 수 있다.

아래의 코드블럭에서는 fetch request의 결과물이 reject를 리턴한다고 가정한다. (1)처럼 try..catch를 이용해 바로 핸들링해주는 것을 추천한다. 그 이유는, (2)에서처럼 reject 된 값을 처리해주지 않는다면, promise의 catch()로 처리해주어야 하는데, 이를 잊는다면 에러를 뿜어낼 것이다.

```
// (1) try..catch를 사용한 에러핸들링
async function f() {
  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
    alert(err);
  }
}

// (2) try..catch로 핸들링하지 않았을 경우
async function f() {
  let response = await fetch('http://no-such-url');
}

// f()은 reject된 promise를 리턴한다.
f().catch(alert);
```

---

### 다음주 계획

**\- React Lifecycle 함수**

React Framework를 알아가기 위해, Lifecycle을 이해하는게 중요하다고 생각해서 선정했습니다.

---

### 참고 출처

> MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async\_function  
> MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await  
> Javascript Info: https://javascript.info/async-await
