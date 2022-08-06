import { Component } from "react";
import ContactsBlock from "../../components/contactsBlock";
import ProductsBlock from "../../components/productsBlock";
import TopBanner from "../../components/TopBanner";
import PageWrapper from "../../components/pageWrapper/";
import Advantages from "../../components/advantages";

export default class MainPage extends Component {
    render() {
        return <main>
            <TopBanner/>

            <PageWrapper>
                <Advantages />
                <ProductsBlock />
                <ContactsBlock />
            </PageWrapper>
        </main>
    }
}