import {Component, useEffect, useState} from 'react';
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
import Feedback from '../../views/Feedback';
import PopUp from '../PopUp';
// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {visibleBtnToUp: false}
//   }

//   componentDidMount() {
//     // this.showBtnToUp();
//     // window.addEventListener('scroll', this.showBtnToUp);
//   }

//   componentWillUnmount() {
//     // window.removeEventListener('scroll', this.showBtnToUp);
//   }

//   showBtnToUp = () => {
//     if (window.pageYOffset > 200) return this.setState({visibleBtnToUp: true});
//     return this.setState({visibleBtnToUp: false});
//   }

//   render() {
//     return (
//       <>
//         <Header />
//         <ButtonToUp visible={this.state.visibleBtnToUp}/>
//         <main className='main'>
//           <Routes>
//             <Route path='/' element={<MainPage />} />
//             <Route path='/where-to-buy' element={<WhereToBuy />} />
//             <Route path='/catalog' element={<Catalog/>} >
//               <Route index element={<IndexCatalog/>} />
//               <Route path='product-card/:id' element={<ProductsCard/>} />
//               <Route path=':id/*' element={<DetailedCatalog/>} />
//             </Route>
            
//             <Route path='/search/:query' element={<SearchView />} />
//             <Route path='/advantages' element={<Advantages/>} />
//             <Route path='/about' element={<About/>} />
//             <Route path='/feedback' element={<Feedback/>} />
//             <Route path='*' element={<NotFound/>}/>
//           </Routes>
//         </main>
//         <Footer />
//       </>
//     )
//   }
// }

export default function App() {
  const [visibleBtnToUpState, setVisibleBtnToUpState] = useState(window.pageYOffset > 200);
  let scrollFrontierFlag = visibleBtnToUpState;
  function handlerScroll() {
    if (window.pageYOffset > 200 && !scrollFrontierFlag) {
      scrollFrontierFlag = true;
      return setVisibleBtnToUpState(scrollFrontierFlag);
    } else if (window.pageYOffset <= 200 && scrollFrontierFlag) {
      scrollFrontierFlag = false;
      return setVisibleBtnToUpState(scrollFrontierFlag);
    }
  }

  useEffect(()=>{
    window.addEventListener('scroll', handlerScroll);
    return () => window.removeEventListener('scroll', handlerScroll);
  },[]);

  const [{isShowPopUp, contentPopUp}, setPopUpState] = useState({isShowPopUp: false, contentPopUp: <></>});

  const handlerPopUp = ({isShowPopUp, contentPopUp}) => {
    document.body.style.overflowY = isShowPopUp ? 'hidden' : '';
    if (!isShowPopUp) {
      return setPopUpState({isShowPopUp: false});
    } else {
      setPopUpState(() => ({isShowPopUp: true, contentPopUp}));
    }
  };

  return (
    <>
      <Header />
      <ButtonToUp visible={visibleBtnToUpState}/>
      <main className='main'>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/where-to-buy' element={<WhereToBuy />} />
          <Route path='/catalog' element={<Catalog/>} >
            <Route index element={<IndexCatalog/>} />
            <Route path='product-card/:id' element={<ProductsCard handlerPopUp={handlerPopUp}/>} />
            <Route path=':id/*' element={<DetailedCatalog/>} />
          </Route>
          
          <Route path='/search/:query' element={<SearchView />} />
          <Route path='/advantages' element={<Advantages/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/feedback' element={<Feedback/>} />
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </main>
      <Footer />
      {
        isShowPopUp ? <PopUp className="test" handlerPopUp={handlerPopUp}>
          {contentPopUp}
        </PopUp> : null
      }
    </>
  )
}
