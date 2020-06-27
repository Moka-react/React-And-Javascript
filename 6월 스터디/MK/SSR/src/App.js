import React, { Component } from 'react';
import Home from './Home';
import About from './About';
class App extends Component {
  state = {
    page: this.props.page,
  };
  componentDidMount() {
    window.onpopstate = (event) => {
      //단일 페이지 애플리케이션을 직접 구현하기 위해서 onpopstate 이벤트 처리 함수를 등록
      // 브라우저에서 뒤로가기를 누르면 호출될것!
      this.setState({ page: event.state });
    };
  }
  onChangePage = (e) => {
    //특정 페이지로 이동하는 버튼의 이벤트처리 메서드
    const page = e.target.dataset.page;
    window.history.pushState(page, '', `/${page}`);
    //pushState 메서드를 통해 브라우저에게 주소가 변경됐다는것을 알린다.
    this.setState({ page });
  };
  render() {
    const { page } = this.state;
    const PageComponent = page === 'home' ? Home : About;
    //page 상탯값에 따라 렌더링 할 페이지의 컴포넌트가 결정된다.
    return (
      <div>
        <button data-page='home' onClick={this.onChangePage}>
          Home
        </button>
        <button data-page='about' onClick={this.onChangePage}>
          About
        </button>
        <PageComponent />
      </div>
    );
  }
}

export default App;
