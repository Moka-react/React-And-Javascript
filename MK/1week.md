# 주제 선정 이유

> 왜 갈수록 개발자들이 서버사이드 렌더링에 집중하게 되는걸까? 에 의문이 생겨서 살펴보게 되었다.

# 서버사이드 렌더링 이란?

서버사이드 렌더링 (server side rendering) 이란 서버에서 리액트 코드를 실행해서 렌더링하는 것을말한다

## 서버사이드 렌더링이 필요한 이유는 다음 두가지가 대표적

- 검색 엔진 최적화 (search engine optimization, SEO) 를 해야 한다.

- 빠른 첫 페이지 렌더링이 중요하다

많은 수의 사용자를 대상으로 하는 사이트라면 검색 엔진 최적화를 위해서 서버 사이드 렌더링은 필수다.

## 서버사이드 렌더링을 하면 사용자가 요청한 페이지를 빠르게 보여줄 수 있다.

클라이언트 렌더링만 한다면 자바 스크립트를 실행해야만 화면이 보이기 때문에 저사양 기기를 사용하는 사용자 일수록

요천한 페이지가 느리게 보인다. 네트워크 인프라가 약한 나라일수록 서비스를 해야한다면 서버사이드 렌더링을 중요하게 생각해야함

## 이번장에서는 먼저 프레임워크 도움 없이 직접 서버 사이트 렌더링 환경을 구축해봄.

so, 서버 사이드 렌더링을 지원하는 대표적인 프레임워크인 넥스트.js 를 알아본다.

# 서버사이드 렌더링 초급편

## 초급편에서 다루는 내용은 4가지

1.리액트에서 제공하는 renderToString , hydrate 함수를 사용

2.서버에서 생성된 데이터를 클라이언트로 전달하는 방법

3.styled-components 로 작성된 스타일이 서버사이드 렌더링시 어떻게 처리 되는지

4.서버용 번들파일을 만드는 방법

## 실습을 위해 프로젝트 생성

1. 플젝생성
   mkdir test-ssr
   cd test-ssr
   npm init -y
   npm install react react-dom

2. 바벨실행을 위한 패키지 설치
   npm install @babel/core @babel/plugin-proposal-class-properties
   @babel/preset-env @babel/preset-react

3. 웹팩 실행을 위한 패키지를 설치
   npm install webpack webpack-cli babel-loader clean-webpack-plugin
   html-webpack-plugin

## 클라이언트에서만 렌더링해보기

서버사이드 렌더링을 구현하기 위한 사정작업으로 클라이언트에서만 렌더링하는 웹사이트를 만들어 보겠습니다.

1. 프로젝트 루트에 src 폴더를 만들고 Home.js , About.js 파일 만들고 나서 Home.js 와 About.js 를 렌더링하는 App 컴포넌트도 만들기

2. App 컴포넌트는 버튼을 통해 각 페이지로 이동할 수 있는 기능을 제공합니다.

3. 이제 index.js 파일을 만들고 앞에서 만든 App 컴포넌트를 렌더링해봅시다.

4. 웹팩설정 과 바벨설정을 해주면 클라이언트에서만 렌더링하는 간단한 웹사이트릐 코드를 모두 작성했습니다.

- 이제 웹팩을 실행해서 보자.

  - npx webpack

실행해서 보면 사실 의도한 대로 버튼이 클릭이 안된다. url 이 file:// 로 시작하기 때문에!
push State 메서드를 호출할때 에러가 발생.
이거는 뒤에서 서버를 띄우는 방식을 이용하면 자동으로 해결이 됩니다.

나중에 서버사이드 렌더링을 구현하면 브라우저가 자바스크립트를 실행하지 않아도 화면의 내용한 확인할 수 있게 됩니다.

## 서버사이드 렌더링 함수 사용해보기 : renderToString

리액트에서는 서버사이드 렌더링을 위해 다음네개의 함수를 제공

- renderToString

- renderToNodeStream

- renderToStaticMarkup

- renderToStaticNodeStream

## 정적 페이지를 렌더링 할때 사용

- renderToNodeStream

- renderToStaticNodeStream

## 결론

서버사이드 렌더링을 하면 이미 돔 요소가 만들어진 상태이기 때문에 클라이언트 측에서 또 다시 렌더링할 필요는 없습니다.
단, 돔요소에 필요한 이벤트 처리 함수를 연결해야합니다.
이벤트 처리 함수를 연결하지 않으면 화면은 보이지만 사용자가 버튼을 눌러도 반응하지 않습니다.
