#### 자바스크립트를 모르신다면 읽지마세요...

사실 필자도 자바스크립트를 잘 모른다. 다만 뭐지는 안다... 그리고 써봤다... 그렇지만 자바스크립트를 정말 모른다면 타입스크립트를 할 의미가 없다고 생각한다...

우선 타입스크립트는 자바스크립트의 superset이다. Superset이란? A >= B 일때, A는 B의 수퍼셋이라고 할 수 있다. 한마디로, 타스는 자스를 포함한 어떤 다른 것들을 가지고있는 언어이다.

이제부터 본격적으로 들어가보자!

# 정의

> *TypeScript is designed for development of large applications and transcompiles to JavaScript.*

타입스크립트라는 녀석은 [공식문서](https://www.typescriptlang.org/) 를 찾아보아도, 자바스크립트 얘기만하고 별 다른 얘기를 하지 않고있다... 그러고 이어진 위키에서는 바로 위에 처럼 뜬구름잡는 이야기를 하고있다. 몇번 찾아본 이후와 내 생각을 첨가해서 그 이유를 대충 짐작 할 수 있었다.

타입 스크립트는 자바스크립트의 superset이다. 한마디로, 타입스크립트 ≥ 자바스크립트

이유는, 타입스크립트는 자바스크립트로 transcompile 되기 때문이다. Transcompile이란, 타입스크립트가 컴파일 과정에서 javascript로 변화하고 브라우저 혹은 컴파일러는 이 자바스크립트를 컴파일 하는것이다. 그렇다면 대충 위의 정의에서 transcompile은 이해가되었지만, large applications에서는 왜?

### Large Applications?

이때까지, TS의 정의에 대한 이해를 하였지만, 이제부터 TS가 뭔지 알아볼려고 한다. TS는 자바스크립트에 타입을 얹어 주는 것이다. 그 이유는 자바스크립트는 loosely coupled한 언어이다. 다른 말로 하자면, 컴파일이 매우 관대하기때문에, 인터프레팅과정에서 매우 관대하다.

이 기능이 large applications에서는 룰을 만듦으로써 개발자들에게 훨씬더 안정적이고 효율적인 개발을 할 수 있게하는것이다. 예를 들어, js에서 난 에러를 개발자들이(나같은...) 디버깅 할려면 꽤 많은 시간을 할애하며 로직을 전부다시 따라가야 하지만, ts는 이를 미리 방지하고 컴파일 타임에 에러를 내뱉기때문에, 훨씬더 효율적인 개발을 가능하게 하고 이는 큰 서비스를 만들때 더욱더 효과적이다.

이렇게 정리를 하다보니, 뭔가 이해가 된다. 왜 타입스크립트는 많이 듣게되는 개념이면서도 자스를 빼놓고는 얘기할 수 없는지 또한 짬뽕님이 왜 타입스크립트를 자스안에 넣었는지 까지도...

# Technical Definition

![](https://images.velog.io/images/jgam/post/352ab3ef-d572-4516-b750-3a05265cae4d/Screen%20Shot%202020-06-19%20at%2017.24.00.png)

지금 부터는 꽤 기술적인 생각으로 정의해 볼려고한다.  TS는  microsoft에서 개발 및 유지 관리하는 오픈소스  프로그래밍 언어이다. JS의 의미를 지원함과 동시에 statically typed 와 ECMAScript의 상위집합인 구문들을 추가로 제공한다. 위 다이어그램을 보면 이해가 편할 것이다. (보는 바와같이 자스는 점점 더 스케일이 커지며 진화해옴)

*TypeScript 는 컴파일러에 의한 코드 오타를 처리하는 정적 유형 지정의 이점을 통해 컴파일 타임에 모든 유형 오류를 알린다.*

또한 타스의 기능중 하나인 주석을 사용하면 ide가 코드에 대해 더 나은 정적 분석을 진행 할 수 있다고 하는데... 이건 잘을 모르겠다. 하지만 이것이 주는 이점은 분명하다: 코드작성동안 실수를 줄여 훨씬 생산적인 코딩을 할 수 있다!

# 타입스크립트의 방식

## Basic Type

- Boolean
- Number
- String

    
 ![](https://images.velog.io/images/jgam/post/ccc3ac34-bfb6-44a6-9e7c-a5eec52389b0/Screen_Shot_2020-06-17_at_11.43.37_PM.png)
    가장 기본이되는 스트링먼저 한컷!

- Array
   ![](https://images.velog.io/images/jgam/post/3ea00da6-3deb-4efd-9218-75d7f74c2d52/Screen_Shot_2020-06-17_at_11.44.41_PM.png)
    Array literal을 이용한 방식이다. 다른 방식은 generic!

    ![](https://images.velog.io/images/jgam/post/d51f02ab-0119-45f3-a371-f15568eae0fe/Screen_Shot_2020-06-17_at_11.45.06_PM.png)

    Generic안에 연산자를 넣으면 그것들을 이용해서 안의 리턴값을 지정할수있다. 어레이안에 어떤것이 들어갈지 한타입이지만 아무타입으로 지정가능!

- Null/Undefined

    이것의 존재이유는,,, 무엇?

- 그 외에 tuple, any, void, never, enum 존재!
- void와 any는 넘어가고 tuple은 추가,삭제 수정이 자유롭지만 고정된 크기의 배열로 사용하기 위함이다. 이유는 params의 타입이 정해져있고 맞는 params만 넣어줘야되기때문이다. enum은 어떠한 변수에 값으로 할당할수있는 요소들의 집합! never은...이만 넘어간다..

## Function

개인적을 굉장히 중요한 타입이라 생각된다. 이유는 당연히 react에서 functional component를 자주 쓰기때문이다.

바로 넘어가보자... 일단 간단하게 생각해서 함수에는 2가지 선언형식이있었다: 1. 선언형 2. 표현형

선언형에서는 그 함수의 params에 관한 타입만 지정해줄 수 있다면, 표현형에서는 그 변수에다가도 함수를 지정할 수도 있다.

```tsx
let curFunction: Function = function(){console.log('watshi function')};
```

하지만 위의 선언방식은 아직도 너무 유연한거 같기 때문에, 안의 인자까지 제대로된 타입을 지정해줄 필요가 있다.

```tsx
function split(str:string):string[]{
	return str.split('');
}
let curFunction: (string) => string[] = split;
```

함수를 선언한뒤 그 함수를 표현식으로 다시 썼을때, 이런식으로 타입을 strict하게 지정해 줄수있다.

### Function overloading

자스에서의 오버로딩은 그리 어렵지 않았지만, 타스에서는 자스같은 오버로딩은 굉장히 역설적이다. 하지만 그렇다고 함수 오버로딩이 안되는것이 아니기때문에 몇가지 방법을 보도록 하겠다.

- optional parameter

    방식은 쓰여도 되고 안쓰여도 되는, required: false인 param이다.

    ```tsx
    function shorten(target: string, magnitude?: number){
    ```

    위의 방식처럼 오버로딩을 따라 흉내낼수있다.

- union type
인자의 갯수로 오버로딩을 해보았지만, 인자의 타입에 대해서는 어떤 처리를 해줘야될까? 이번에는 함수 말고 클래스를 봐보도록하자.

   ```tsx
    class StudyMember{
    	age: number;
    	constructor(arg: number | StudyMember){
    		if (typeof arg === 'number'){
    			this.age = arg;
    		}
    		else if(arg instanceof StudyMember){
    			this.arge = arg.age;
    		}
    	}
    }
    ```


   이 방법이 조금 실망스럽게 느껴지는 가장 큰 이유는, 타스의 원래 의도와 벗어난 스트럭쳐 때문이다. 이 코드에 대해서 확실한 타입 체킹이 언제 될지 생각을 해보면, 컴파일 타임이 아닌 런타임 일것이다. 이유는 어떠한 params가 constructor에 들어오는지는 오직 런타임에서만 알수있기때문...!
    그래서 매우 이상한 방법이라 생각했고, 또한 여러가지 조건문, 매개변수의 이름까지 여러모로 불편하지만 공식문서에서는 이런식으로.... 오버로딩을 해결한다고... 쓰여있다....

## Class

타입스크립트에서 class를 정의하는 방법이란 contructor에서 해줘야되는것일까...?

(바로 빗나감...)



타입스크립트에서의 클래스를 정의할때는, constructor이전에 그 클래스안의 프로퍼티에대한 타입을 정해줘야 한다. 또한, 생성자에서 받는 params에도 타입을 정해주어야 한다.

- static

TS에서는 static의 사용을 허용한다. 고로 인스턴스를 refer할 수 있다... 이것은 또 자스랑은 틀리다..

- private

또한 마찬가지로, 클래스 생성시에 자스는 외부에서 접근을 막는 방법이 없음으로 그냥 _ 를 붙여서 private화 했다면, 타스는 private화가 가능해졌다. 이것은 비단 constructor에도 사용할수있기때문에, 결국 oop언어와의 괴리감을 좁힐수있게되었다.

- readonly

readonly는 어떠한 프로퍼티에 새 값을 할당할수 없게 한다. 말그대로 readonly...

## Interface

드디어 갓갓 interface...한마디로 클래스에 어떠한 요소들이 있는지 정의해주는 개념이다. 코드를 보면 이해가 편하다.
![](https://images.velog.io/images/jgam/post/b9b77344-d945-465a-94bb-cbd8f6621330/Screen_Shot_2020-06-18_at_1.00.09_AM.png)

보다 싶이, interface 는 클래스가 어떠한 형태를 나타내야되는지 잘 설명하고 있다. 그렇지만 에러가 뜬다, 이유는 getArea() 메소드가 없기때문이다.



바로 고쳐준다. 그러니까 에러가 없다. constructor에 width 와 height는 any type이라는 워닝을 주는것이다.

이제 클래스에 대해서 조금 더 깊이 들어가보자

- Duck Typing

덕 타이핑이란 동적 타이핑의 종류로 자스는 동적타입 언어이기도 해서 이것이 가능하다.

![](https://images.velog.io/images/jgam/post/ca562668-e9f2-4e98-9c83-af334b795ab9/Screen_Shot_2020-06-18_at_9.36.17_AM.png)

인터페이스를 적용해보면 이런식으로 나타낼수있다.

![](https://images.velog.io/images/jgam/post/a694019a-7a94-4003-b65b-8e88bc0c578f/Screen_Shot_2020-06-18_at_9.39.18_AM.png)

위 방법은 우리가 익히 알던 방법이다. 이해하는데도 무리가 없이, 함수안에 어떠한 클래스가 들어오고 그 클래스의 type을 선언해준것이다.

이제 실제 덕타이핑을 보자!

![](https://images.velog.io/images/jgam/post/79427d84-dad8-4fc4-86b9-34f6a26efc0b/Screen_Shot_2020-06-18_at_9.45.40_AM.png)

truck을 문제 없이 run한다. 이게 바로 덕타이핑의 예제이다. 이제 확실히 덕타이핑이란 무엇인지도 알수있다. 덕타이핑이란, 한마디로 새가 오리처럼 걷고, 오리처럼 꽥꽥한다면, 그 새는 오리일 것이다. 마찬가지로, 어떠한 클래스가 accelerate한다면 그것은 vehicle 일것이다 라고 지정한것과 비슷한 의미이다.

- Optional 프로퍼티

말 그대로 어떤 프로퍼티가 optional로 들어갈수 있게끔 하는 타입스크립트 규칙이다.

```tsx
interface Developer{
	Determination : number;
	Skills ?: number;
	Experience ?: number;
	Sharing: number,

}
```

보다 싶이, 어떠한 개발자 interface에 내가 필요하다고 생각되는 스킬들과 optional로 필요한 스킬들을 넣었다.

- Indexable

마찬가지로 object내에서 indexable을 써볼수있다.

```tsx
interface Indexable{
	[key: string]: any;
}

const DictObject: Indexable = {
	current: 1,
	after: 'any'
}
```

- Functional Interface

functional interface에서는 복잡하지만 몇가지 명시를 해줘야될것들이 이미 보인다.

1. 인수값들
2. 리턴값

```tsx
interface functionInterface{
	(arg1: number, arg2: string): number;
}

function add...//cannot because it is function declaration!!

const subTract: functionInterface = (a,b)=>{
	return a-parseInt(b)
}
const addFunc: functionInterface = (a: number, b: string):number =>{
	return a + parseInt(b);
}
```

2가지 방법이있다. 첫번째는 interface를 애초에 명시해주는 방법이고 후자는, 아예 function을 쓰면서 타입을 지정해주는 방법인데, 후자인 경우에는 내가 만든 interface와 조금 틀린 부분이 있을때 쓰게된다.

## Generic

제네릭이란 어떠한 클래스나 함수에서 사용할 타입을 결정하는 프로그래밍 기법이다. 자스에서는 런타임에 함수와 클래스가 모든 타입에 대응하기때문에, 이런개념을 들을 필요가 없었다. 그래서 타스에서 특정타입을 위한 프로그래밍 기법인 재네릭이 추가된것 같다.

재네릭을 사용할때 주의해야 될점이있다. 아토믹 디자인을 대입해보면서 초기에 어떤식의 design pattern을 이용하는지에 따라 훨씬더 많은 시간이 소요된다는것을 깨닫고, 어떤경우에 쓸수있는지 한번 미리 고민을 해본다면 훨씬더 개념에 대한 이해가 높아진다. 우선, 2가지의 경우이다.

1. 어레이같은 자료구조의 경우, 그 안의 값들을 타입으로 지정해줄수가 있다. 범용적인 타입을 주기위해 any를 넣을수도있겠다.

    ```tsx
    const data: any[] = [];
    ```

2. 범용성을 위한것이지만, 또 한편으로는 어레이안에 들어갈수있는 element들에 대한 타입체킹이 힘들어짐으로써 발생하는 문제들이 있을것이다.

    ```tsx
    data.pop().substring(0)//type error when popped element is a number
    ```

위의 2가지 경우를 생각해보면 재네릭을 활용해서 훨씬 쉽게 해결할 수 있다.

```tsx
class Stack<T>{
	private data: T[] = [];
	constructor(){}
	push(item: T):void{
		this.data.push(item);
	}

	pop():T{
		return this.data.pop();
	}
}
```

<T>라는 문법은 재네릭을 사용하겠다는 의미이고 식별자로 사용가능한 다른 무엇이든 들어간다. convention is T(Type variable). 이제는 범용성을 가능하게한 클래스의 선언이 가능해지고 또한 정적타입체킹까지 완료됨으로 훨씬더 안정적인 코딩이 가능해진다.

### 그렇다면 function은?

어떠한 배열을 받는 function이 있다고 가정하자

```tsx
function getArr(arr:any[]): any{
	return arr[0];
}
```

위의 코드는 generic 을 사용하지 않았고 리턴타입이 무엇인지 알수가 없다. 하지만,

```tsx
function getArr<T>(arr:T[]):T{
	return arr[0];
}
```

보다 싶이 식별자로 인해서 이 function 을 콜해줄때, 타입을 설정해 줄 수 있다.

### 2가지 이상의 params?

함수에서는 여러가지 함수가 쓰일수있다.

```tsx
function getArr(a:any, b:any):any{
	return a[0] + b[0]
}
```

어떻게 generic을 활용해서 2개의 어레이에 첫번째값들을 더한값을 줄수있을까?

```tsx
function getArr<T,U>(a:T, b:U): T{
	return a[0] + b[0];
}
```

타입변수를 2가지를 활용하면 된다!

또한 상속변수까지 가능하다!

```tsx
function getFirstElement<T extends Stack<U>, U>(container: T):U{
	const item = container.pop();
	container.push(item);
	return item;
}
```

T는 stack에 상속된 타입을 설정해주는것이다. 그렇게하지 않으면 type error가 날것이다.

## Conclusion

타입스크립트는 확실히 자바스크립트기반 언어이고 자바스크립트에 대한 이해도가 높을수록 타입에 대한 이해도 빠를것이다. 간단히 타입만 지정해주는 언어인만큼, 이 언어가 왜 태어났고 자스의 어떠한 부분을 보완해주는지 이해하면서 보면 훨씬 이해가 더 잘가는 것 같다.
