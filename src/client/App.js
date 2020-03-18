import React, { Component } from 'react';
import './app.css';

export default class App extends Component {
  state = {
    nowEditing: false,
    nowSaving: false,
    currentItem: {
      id: null,
      body: null,
      status: null
    }
  };
//source.txt파일 내용울 가져와서 sources에 넣어준다.
  componentDidMount() {
    fetch('/api/source')
      .then(res => res.text())
      .then((t) => {
        this.setState({ sources: t });
      });
  }

  //nowEditing을 바꿔준 다음 sources를 바디로 포스트를 보내는데  source.txt파일에 보낸다.
  handleClickSaveSource() {
    this.toggleMode();
    fetch('/api/source',
      {
        method: 'POST',
        headers: {
          Accept: 'text/plain',
          'Content-Type': 'text/plain'
        },
        body: this.state.sources
      });
  }

  //i번째 파일을 읽어온다.
  handleClickItem(i) {
    fetch(`/api/data/${i}`)
      .then(res => res.json())
      .then((json) => {
        this.setState(prevState => ({
          currentItem: {
            ...prevState.currentItem,
            ...json
          }
        }));
      });
  }
  //nowSaving을 true로 바꾼다음 this.state.currentItem.id를 포스트로 보낸다. 그리고 'ok'가 오면 nowSaving: false 하고
  //handleClickItem 함수를 실행 시킨다.
  handleClickSaveItem() {
    this.setState({ nowSaving: true });

    fetch(`/api/data/${this.state.currentItem.id}`,
      {
        method: 'POST',
        headers: {
          Accept: 'text/plain',
          'Content-Type': 'text/plain'
        }
      })
      .then(res => res.text())
      .then((text) => {
        if (text === 'ok') {
          this.setState({ nowSaving: false });
          this.handleClickItem(this.state.currentItem.id);
        }
      });
  }

  //sources를 e.target.value?로 바꿔준다.
  handleChangeValue(e) {
    this.setState({ sources: e.target.value });
  }

  // 취소를 누르면 state값 초기화
  handleClickCancel() {
    this.setState({
      currentItem: {
        id: null,
        body: null,
        status: null
      }
    });
  }
  // ture 면 false, flase면 true로 바꿔준다.
  toggleMode() {
    this.setState(prevState => ({ nowEditing: !prevState.nowEditing }));
  }

  render() {
    const { sources } = this.state;
    let lis = '';

    if (sources) {
      lis = sources.split('\n').map((line, i) => (
        <li className={this.state.currentItem.id === String(i) ? 'active' : ''} key={i}>
          <a onClick={this.handleClickItem.bind(this, i)}>{decodeURIComponent(line)}</a>
        </li>));
    }

    return (
      <div>
        <h3>article collector (for medium blog)</h3>
        <div className={this.state.nowEditing ? 'hidden' : ''}>
          <header>
            <button onClick={this.toggleMode.bind(this)}>편집</button>
          </header>
          <ul>
            {lis}
          </ul>
          <code id="content" className={this.state.currentItem.status === 'nonexist' ? 'hidden' : ''}>{this.state.currentItem.body}</code>
          <div id="modal" className={this.state.currentItem.status === 'nonexist' ? '' : 'hidden'}>
            <div className="modal-content">
              <p>아직 수집되지 않았습니다. 수집 후 파일로 저장하시겠습니까?</p>
              <button disabled={this.state.nowSaving} onClick={this.handleClickSaveItem.bind(this)}>
                수집 후 저장
              </button>
              <button disabled={this.state.nowSaving} onClick={this.handleClickCancel.bind(this)}>
                취소
              </button>
              <span className={this.state.nowSaving ? '' : 'hidden'}>저장 중...</span>
            </div>
          </div>
        </div>

        <div className={this.state.nowEditing ? '' : 'hidden'}>
          <header>
            <button onClick={this.handleClickSaveSource.bind(this)}>저장</button>
          </header>
          <div>
            <p>
              내용을 가져올
              <a href="https://medium.com/" target="_blank">Medium</a>
              post URL을 한줄씩 입력하세요.
            </p>
            <p>
              예:
              <code>https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4</code>
            </p>
          </div>
          <textarea value={sources} onChange={this.handleChangeValue.bind(this)} />
        </div>
      </div>
    );
  }
}
