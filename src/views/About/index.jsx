import React from 'react';

import './style.scss';

import Picture from '../../components/Picture';

class About extends React.Component {

    componentDidMount () {
        document.title = "О компании — Переславский комбинат художественных товаров";
    }

    render = () => {
        return (
            <>
                <Picture
                    src="/img/about/main"
                    ext={["png"]}
                    alt=""
                    className="aboutPage_img"
                />
                <section style={{marginTop: "3.3rem"}}>
                    <div className="container">
                        <div className="aboutPage_layout">
                            <div className="aboutPage_content">
                                <h3 className="textPage_h3">О компании</h3>
                                <p className="textPage_paragraph">
                                    ООО "Аква плюс" — молодое, современное, динамично развивающееся предприятие, производящее обширный ассортимент товаров для детского творчества, художественной продукции и канцелярских товаров.
                                </p>
                                <p className="textPage_paragraph">
                                    В 2019 году, ООО «Аква плюс» заявила о себе как производитель продукции для детского творчества; художественных товаров; канцелярской продукции.
                                </p>
                                <p className="textPage_paragraph textPage_paragraph__bottomSpace">
                                    Ассортимент продукции рассчитан для школьного, дошкольного и профессионального образования.
                                </p>

                                
                                <h3 className="textPage_h3">На рынках представлены флагманские товары:</h3>
                                <p className="textPage_paragraph">
                                    Сегмент детского творчества: краски пальчиковые, гуашь, пластилин, краски акварельные, доски для лепки, продукция представлена ТМ «Лео»; «Гигантозавры».
                                </p>
                                <p className="textPage_paragraph">
                                    Сегмент художественных товаров:  краски акварельные, гуашь художественная, краски масляные, грунт, разбавители, медиумы, краски акриловые, тушь художественная, картон грунтованный, холсты, пластилин скульптурный. Продукция представлена ТМ «Живопись»; «Изостудия»; «VISTA-ARTISTA».
                                </p>
                                <p className="textPage_paragraph">
                                    Сегмент канцелярских товаров: тушь, папки пластиковые, каталоги, регистраторы, архивные короба, планшеты. Продукция представлена ТМ «Expert Complete»; «Лео»;
                                </p>
                                <p className="textPage_paragraph">
                                    Выпускаемая продукция соответствует высоким требованиям по качеству и безопасности, сертифицирована согласно действующим техническим регламентам Таможенного союза ЕАЭС.
                                </p>
                                <p className="textPage_paragraph">
                                    Преимущество нашей компании: собственная научно-исследовательская лаборатория, современное оборудование, высоко квалифицированный персонал.
                                </p>
                                <p className="textPage_paragraph textPage_paragraph__bottomSpace">
                                    Приобрести продукцию можно в сети хобби-гипермаркетов «Леонардо», а также в рознице города.
                                </p>

                                                                
                                <h3 className="textPage_h3">Миссия</h3>
                                <p className="textPage_paragraph textPage_paragraph__bottomSpace">
                                    Развиваем любовь к творчеству у взрослых и детей.
                                </p>

                                                                
                                <h3 className="textPage_h3">Задачи</h3>
                                <ol className="textPage_list textPage_list__numeric textPage_list__bottomSpace">
                                    <li>Производить продукцию по мировым стандартам качества и безопасности.</li>
                                    <li>Улучшать технологические характеристики выпускаемой продукции.</li>
                                    <li>Осваивать рынки стран СНГ, Азии, США, Европы.</li>
                                </ol>
                            </div>
                            <div className="aboutPage_director">
                                <Picture
                                    src="/img/about/director"
                                    ext={["png"]}
                                    alt=""
                                    className="aboutPage_directorPhoto"
                                />
                                <h3 className="aboutPage_directorName">Филиппов 
Андрей&nbsp;Александрович</h3>
                                <p className="aboutPage_directorRole">Директор</p>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default About;