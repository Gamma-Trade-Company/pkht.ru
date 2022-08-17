import {Component} from 'react';
import './scss/App.scss';

import {Routes, Route} from 'react-router-dom';

import MainPage from '../../views/MainPage';
import Header from '../header';
import Footer from '../footer';
import WhereToBuy from '../../views/WhereToBuy';
import ButtonToUp from '../UI/ButtonToUp';
import NotFound from '../../views/NotFound';
import Catalog from '../../views/Catalog';
import DetailedCatalog from '../DetailedCatalog';
import IndexCatalog from '../IndexCatalog';
import ProductsCard from '../../views/ProductsCard';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {visibleBtnToUp: false}
  }

  componentDidMount() {
    this.showBtnToUp();
    window.addEventListener('scroll', this.showBtnToUp);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.showBtnToUp);
  }

  showBtnToUp = () => {
    if (window.pageYOffset > 200) return this.setState({visibleBtnToUp: true});
    return this.setState({visibleBtnToUp: false});
  }

  render() {
    return (
      <>
        <Header />
        <ButtonToUp visible={this.state.visibleBtnToUp}/>
        <main className='main'>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/where-to-buy' element={<WhereToBuy />} />
            <Route path='/catalog' element={<Catalog/>} >
              <Route index element={<IndexCatalog/>} />
              <Route path=':id/*' element={<DetailedCatalog/>} />
            </Route>
            <Route path='*' element={<NotFound/>}/>
            <Route path='/product-card/:id' element={<ProductsCard/>} />
          </Routes>
        </main>
        <Footer />
      </>
    )
  }
}
