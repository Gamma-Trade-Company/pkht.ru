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
import Advantages from '../../views/Advantages';
import About from '../../views/About';
import DetailedCatalog from '../DetailedCatalog';
import IndexCatalog from '../IndexCatalog';
import ProductsCard from '../../views/ProductsCard';
import SearchView from '../../views/Search';
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
              <Route path='product-card/:id' element={<ProductsCard/>} />
              <Route path=':id/*' element={<DetailedCatalog/>} />
            </Route>
            
            <Route path='/search/:query' element={<SearchView />} />
            <Route path='/advantages' element={<Advantages/>} />
            <Route path='/about' element={<About/>} />
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </main>
        <Footer />
      </>
    )
  }
}
