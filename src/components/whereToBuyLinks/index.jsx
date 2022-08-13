import React from 'react';

import './style.scss';
import LeonardoImg from '../../assets/img/shop1.png';
import GammaImg from '../../assets/img/shop2.png';

class WhereToBuyLinks extends React.Component {
    constructor (props) {
        super (props);

        this.state = {
            shops: [
                {
                    name: "Хобби-гипермаркет Леонардо",
                    url: "https://leonardo.ru/ishop/tree_9538925633/",
                    description: "Купить в розницу",
                    img: LeonardoImg,
                },
                {
                    name: "Фирма Гамма",
                    url: "https://firma-gamma.ru/ishop/20362990822/",
                    description: "Купить оптом",
                    img: GammaImg,
                },
            ]
        }
    }
    render () {
        return (
            <div className='whereToBuy'>
                {
                    this.state.shops.map((shop, i) => (
                        <div className='whereToBuy_block' key={i}>
                            <img src={shop.img} alt='' className='whereToBuy_img' />
                            <div className='whereToBuy_text'>
                                <p className='whereToBuy_name'>{shop.name}</p>
                                <p className='whereToBuy_description'>{shop.description}</p>
                            </div>
                            <a
                                href={shop.url}
                                target="_blank"
                                className='whereToBuy_button'
                                rel='noopener noreferrer'
                            >Смотреть</a>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default WhereToBuyLinks;