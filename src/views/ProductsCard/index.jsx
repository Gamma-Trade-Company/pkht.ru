import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ProductFeature from "../../components/ProductFeature";
import ProductGallery from "../../components/ProductGallery";
import NotFound from "../NotFound";
import classes from './ProductsCard.module.scss';

const ProductsCard = () => {
    const {id} = useParams();
    const [productInfo, setProductInfo] = useState(state);
    const {title, imgList, featureList, loaded, description} = productInfo;

    useEffect(()=>{
        (async()=>{
            const resp = await fetch(`https://pkht.ru/api/catalog/product-card/${id}/`);
            const { title, imgList, featureList, description } = await resp.json();
            document.title = title + " — Переславский комбинат художественных товаров";
            
            setProductInfo({...productInfo, title, imgList, featureList, description, loaded: featureList.length !== 0});
        })();
    },[]);

    return (
        !loaded ?  <NotFound /> :
        <section className={classes.products__card}>
            <div className="container">
                <h1 className={classes.title}>{title}</h1>
                <div className={`row ${classes['products__card-content']}`}>
                    <div className="col">
                        <ProductGallery imgList={imgList}/>
                    </div>
                    <div className={`${classes.feature}`}>
                        <ProductFeature featureList={featureList} />
                    </div>
                </div>
                <div className="row">
                    <div className={'col ' + classes.descriptionWrap}>
                        <p className={classes.description} dangerouslySetInnerHTML={{ __html: description}}></p>
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
    loaded: true,
    description: '',
};

export default ProductsCard;