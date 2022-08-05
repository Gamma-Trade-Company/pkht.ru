import { Component } from "react";
import './TopBanner.scss';

export default class TopBanner extends Component {
    render() {
        return <section className="top__banner">
            <div className="container top__banner-container">
                <div className="row top__banner-row">
                    <div className="col-12 top__banner-col">
                        <h1>Переславский <br /> комбинат <br /> художественных <br /> товаров</h1>
                        <h2>Развиваем любовь к творчеству <br /> у взрослых и детей</h2>
                    </div>
                </div>
            </div>
        </section>
    }
}