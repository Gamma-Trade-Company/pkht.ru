import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ProductFeature from "../../components/ProductFeature";
import ProductGallery from "../../components/ProductGallery";
import classes from './ProductsCard.module.scss';

const ProductsCard = () => {
    const {id} = useParams();
    const [productInfo, setProductInfo] = useState(state);
    const {title, imgList, featureList} = productInfo;

    useEffect(()=>{
        setProductInfo({
            title: '"Love2art" морилка LAS-80 80 мл',
            imgList: [
                '/img/products/3.jpg',
                '/img/products/4.jpg',
            ],
            featureList: [
                {
                    name: 'ТМ',
                    value: 'ТМ',
                },
                {
                    name: 'Серия',
                    value: 'Серия',
                },
                {
                    name: 'Артикул',
                    value: 'Артикул',
                },
                {
                    name: 'Вес, кг',
                    value: 'Вес, кг',
                },
                {
                    name: 'Количество, шт',
                    value: 'Количество, шт',
                },
                {
                    name: 'Назначение',
                    value: 'Назначение',
                },
                {
                    name: 'Объем, мл,',
                    value: 'Объем, мл,',
                },
                {
                    name: 'ТУ',
                    value: 'ТУ',
                },
                {
                    name: 'Тип товара',
                    value: 'Тип товара',
                },
                {
                    name: 'Тип упаковки',
                    value: 'Тип упаковки',
                },
            ],
        });
    },[]);

    return (
        <section className={classes.products__card}>
            <div className="container">
                <h1>{title}</h1>
                <div className={`row ${classes['products__card-content']}`}>
                    <div className="col">
                        <ProductGallery imgList={imgList}/>
                    </div>
                    <div className={`${classes.feature}`}>
                        <ProductFeature featureList={featureList} />
                    </div>
                </div>
            </div>
        </section>
    );
}

const state = {
    title: '',
    imgList: [],
    featureList: [],
};

export default ProductsCard;