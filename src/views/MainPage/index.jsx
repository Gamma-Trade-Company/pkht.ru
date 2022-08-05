import { Component } from "react";
import ContactsBlock from "../../components/contactsBlock";
import TopBanner from "../../components/TopBanner";

export default class MainPage extends Component {
    render() {
        return <main>
            <TopBanner/>

            <ContactsBlock />
        </main>
    }
}