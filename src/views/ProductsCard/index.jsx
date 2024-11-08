import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/UI/Button";
import ProductFeature from "../../components/ProductFeature";
import ProductGallery from "../../components/ProductGallery";
import NotFound from "../NotFound";
import classes from './ProductsCard.module.scss';
import FormOrder from "../../components/FormOrder";

const ProductsCard = ({handlerPopUp}) => {
    const {id} = useParams();
    const [productInfo, setProductInfo] = useState(state);
    const {title, imgList, featureList, loaded, description, showForm, check_code, detailid, goodid} = productInfo;

    useEffect(()=>{
        (async()=>{
            const resp = await fetch(`https://pkht.ru/api/catalog/product-card/${id}/`);
            const { title, imgList, featureList, description, showForm, check_code, detailid, goodid} = await resp.json();
            document.title = title + " — Переславский комбинат художественных товаров";
            
            setProductInfo({...productInfo, title, imgList, featureList, showForm, check_code, detailid, goodid, description, loaded: featureList.length !== 0});
        })();
    },[]);

    const contentPopUp = check_code != null ? <FormOrder capcha={check_code} detailid={String(detailid)} goodid={String(goodid)} /> : null;

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
                        {
                            showForm ? <Button onClick={()=> handlerPopUp({isShowPopUp: true, contentPopUp: contentPopUp})}>
                                Заказать
                            </Button> : null
                        }
                        <br/>
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
    showForm: false,
    check_code: null,
    detailid: '',
    goodid: '',
};

export default ProductsCard;