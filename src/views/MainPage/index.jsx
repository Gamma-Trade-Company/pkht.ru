import { Component } from "react";
import ContactsBlock from "../../components/contactsBlock";
import ProductsBlock from "../../components/productsBlock";
import TopBanner from "../../components/TopBanner";
import PageWrapper from "../../components/pageWrapper/";
import Advantages from "../../components/advantages";
import Certificates from "../../components/Certificates";

export default class MainPage extends Component {

    componentDidMount () {
        document.title = "Переславский комбинат художественных товаров";
    }

    render() {
        return <>
            <TopBanner/>

            <PageWrapper page="main">
                <Advantages />
                <Certificates/>
                <ProductsBlock />
                <ContactsBlock />
            </PageWrapper>
        </>
    }
}