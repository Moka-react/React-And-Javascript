const presets = ['@babel/preset-react', '@babel/preset-env'];
const plugins = ['@babel/plugin-proposal-class-properties'];
//App.js 파일에서 상탯값과 이벤트 처리 메서드를 정의할때 이 플러그인 덕분에 편하게 작성할 수 있었다.
//babel.config.js 파일의 설정은 babel-loader가 실행될때 적용된다.
module.exports = { presets, plugins };
