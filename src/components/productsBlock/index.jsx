import React from 'react';

import './style.scss';

import BlockHeader from "../blockHeader/";
import { Link } from 'react-router-dom';

class ProductsBlock extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            categories: [
                {
                    id: 0,
                    name: "Краски",
                    img: "/img/categories/1.png",
                    link: "/catalog/60/"
                },
                {
                    id: 1,
                    name: "Художественные товары",
                    img: "/img/categories/2.png",
                    link: "/catalog/67/"
                },
                {
                    id: 2,
                    name: "Канцелярские товары",
                    img: "/img/categories/3.png",
                    link: "/catalog/71/"
                },
                {
                    id: 3,
                    name: "Товары для детского творчества",
                    img: "/img/categories/4.png",
                    link: "/catalog/78/"
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
                        this.state.categories.map(({id, name, img, link}) => (
                            <div className="productsBlock_product" key={id}>
                                <Link to={link}><img src={img} alt="" className="productsBlock_img" /></Link>
                                <p className="productsBlock_text"><Link className="productsBlock_textLink" to={link}>{name}</Link></p>
                            </div>
                        ))
                    }
                </div>
            </>
        );
    }
}

export default ProductsBlock;