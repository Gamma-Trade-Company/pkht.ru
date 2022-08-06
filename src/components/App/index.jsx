import {Component} from 'react';
import './scss/App.scss';

import MainPage from '../../views/MainPage';
export default class App extends Component {

  render() {
    return (
      <>
        <main>
          <MainPage/>
        </main>
      </>
    )
  }
}
