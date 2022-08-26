import OpenedCatalog from "../OpenedCatalog";
import classes from './IndexCatalog.module.scss';

export default function IndexCatalog () {
    document.title = "Каталог товаров — Переславский комбинат художественных товаров";
    return (
        <>
            <h1>Каталог товаров</h1>
            <OpenedCatalog className={classes.index__catalog}/>
        </>
    );
}