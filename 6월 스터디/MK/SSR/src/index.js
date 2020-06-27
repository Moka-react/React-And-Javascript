import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

ReactDom.render(<App page='home' />, document.getElementById('root'));

//render 함수를 이용해서 App 컴포넌트를 돔요소에 연결!
