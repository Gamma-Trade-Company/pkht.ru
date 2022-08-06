import React from 'react';

import './style.scss';

import BlockHeader from "../blockHeader/";

class ProductsBlock extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            categories: [
                {
                    id: 0,
                    name: "Краски",
                    img: "/img/categories/1.png"
                },
                {
                    id: 1,
                    name: "Художественные товары",
                    img: "/img/categories/2.png"
                },
                {
                    id: 2,
                    name: "Канцелярские товары",
                    img: "/img/categories/3.png"
                },
                {
                    id: 3,
                    name: "Товары для лепки",
                    img: "/img/categories/4.png"
                }
            ]
        }
    }
    render () {
        return (
            <>
                <BlockHeader>Продукты</BlockHeader>
                <div className="productsBlock">
                    {
                        this.state.categories.map(({id, name, img}) => (
                            <div className="productsBlock_product" key={id}>
                                <img src={img} alt="" className="productsBlock_img" />
                                <p className="productsBlock_text">{name}</p>
                            </div>
                        ))
                    }
                </div>
            </>
        );
    }
}

export default ProductsBlock;