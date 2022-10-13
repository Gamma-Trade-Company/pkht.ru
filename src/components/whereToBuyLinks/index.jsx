import React from 'react';

import './style.scss';

class WhereToBuyLinks extends React.Component {
    constructor (props) {
        super (props);

        this.state = {
            shops: [
                {
                    name: "Хобби-гипермаркет Леонардо",
                    url: "https://leonardo.ru/ishop/tree_9538925633/",
                    description: "Купить в розницу",
                    img: "/img/shops/shop1.png",
                },
                {
                    name: "Фирма Гамма",
                    url: "https://firma-gamma.ru/ishop/20362990822/",
                    description: "Купить оптом",
                    img: "/img/shops/shop2.png",
                },
                {
                    name: "Сеть магазинов «Иголочка»",
                    url: "https://www.igla.ru/",
                    description: "Купить в розницу",
                    img: "/img/shops/shop3.png",
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