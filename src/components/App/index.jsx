import {Component} from 'react';
import './scss/App.scss';

import {Routes, Route} from 'react-router-dom';

import MainPage from '../../views/MainPage';
import Header from '../header';
import Footer from '../footer';
import WhereToBuy from '../../views/WhereToBuy';
export default class App extends Component {

  render() {
    return (
      <>
        <Header />
        <main className='main'>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/where-to-buy' element={<WhereToBuy />} />
          </Routes>
        </main>
        <Footer />
      </>
    )
  }
}
