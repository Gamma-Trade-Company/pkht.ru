import React from 'react';
import BlockHeader from '../../components/blockHeader';
import Picture from '../../components/Picture';

class Advantages extends React.Component {
    render = () => {
        return (
            <section style={{marginTop: "3.3rem"}}>
                <div className="container">
                    <BlockHeader>Преимущества</BlockHeader>
                    <div className="textPage_imgRow">
                        <Picture
                            src="/img/advantages/1"
                            ext={["png"]}
                            alt=""
                            className="textPage_img"
                        />
                        <Picture
                            src="/img/advantages/2"
                            ext={["png"]}
                            alt=""
                            className="textPage_img"
                        />
                    </div>
                    <h3 className="textPage_h3">Лаборатория</h3>
                    <p className="textPage_paragraph">
                        Производственные цеха и оборудование соответствует запросам времени и пожарной безопасности.  
                    </p>
                    <p className="textPage_paragraph">
                        С конца 2019 года на предприятие работает собственная, научно-исследовательская лаборатория, оснащенная современным , аналитическим и контрольно-измерительным оборудованием.
                    </p>
                    <p className="textPage_paragraph">
                        Опытные инженеры-исследователи разрабатывают, совершенствуют рецептуры, исследуют новинки рынка.
                    </p>
                    <p className="textPage_paragraph textPage_paragraph__bottomSpace">
                        Опираясь на возможности лаборатории, предприятие проводит комплексный анализ компонентов, дает экспертное заключение службе технолога.
                    </p>
                    <div className="textPage_imgRow">
                        <Picture
                            src="/img/advantages/3"
                            ext={["png"]}
                            alt=""
                            className="textPage_img"
                        />
                        <Picture
                            src="/img/advantages/4"
                            ext={["png"]}
                            alt=""
                            className="textPage_img"
                        />
                    </div>

                    <h3 className="textPage_h3">ОТК</h3>
                    <p className="textPage_paragraph">
                        Служба лаборатории «ОТК» организованна по стандарту системы менеджмента качества.
                    </p>
                    <p className="textPage_paragraph">
                        Инженеры лаборатории ведут контроль производства на всех этапах производства, начиная от контроля входного сырья и материалов.
                    </p>
                    <p className="textPage_paragraph">
                        Технологи-контролёры  улучшают результаты своей деятельности, отслеживают этапы производства, осуществляют забор образцов продукции, дают заключение в соответствии с внутренними регламентами и требованиям к службе ОТК на предприятии.
                    </p>
                    <p className="textPage_paragraph">
                        Серьезное значение имеет периодичность испытаний продукции, а также контроль проведения испытаний новых образцов продукции.
                    </p>
                    <p className="textPage_paragraph textPage_paragraph__bottomSpace">
                        И только после двух этапов контроля качества, продукция направляется на фасовку или упаковку.
                    </p>
                    <div className="textPage_imgRow">
                        <Picture
                            src="/img/advantages/5"
                            ext={["png"]}
                            alt=""
                            className="textPage_img"
                        />
                        <Picture
                            src="/img/advantages/6"
                            ext={["png"]}
                            alt=""
                            className="textPage_img"
                        />
                    </div>
                    <h3 className="textPage_h3">Активная работа с художниками</h3>
                    <p className="textPage_paragraph">
                        В своей работе продукцией ООО "ПКХТ" пользуются следующие художники:
                    </p>
                    <p className="textPage_paragraph">
                        1. Дарья Александровна Лазько, техника работы  разная.
                    </p>
                    <p className="textPage_paragraph">
                        https://vk.com/mysticalart<br />
                        Youtube: Mystical Buttons<br />
                        Instagram: mysticalbuttonsart
                    </p>
                    <br />
                    <p className="textPage_paragraph">
                        2. Дарья Долгополова, техника работы: акварель, маркеры, гуашь, акрил.
                    </p>
                    <p className="textPage_paragraph">
                        Youtube: Dari Art<br />
                        Instagram: dari_art1<br />
                        ЯндексДзен: Dari Art - Рисовать Может Каждый
                    </p>
                    <br />
                    <p className="textPage_paragraph">
                        3. Анастасия Ермакова, техника работы: масло
                    </p>
                    <p className="textPage_paragraph">
                        Youtube: Анастасия Ермакова.<br />
                        Instagram: @ermakova_art<br />
                        Telegram: https://t.me/s/ermakova_art<br />
                        VK: https://vk.com/ermakovaart
                    </p>
                    <br />
                    <p className="textPage_paragraph">
                        4. Александра Сергеевна Захарова, техника работы: акварель
                    </p>
                    <p className="textPage_paragraph">
                        Youtube: Special Sect<br />
                        Instagram: specialsect<br />
                        Telegram: t.me/specialsect<br />
                        VK: https://vk.com/club187662539<br />
                        ЯндексДзен: https://zen.yandex.ru/id/6222249a8aed9b697401eef0
                    </p>
                    <br />
                    <p className="textPage_paragraph">
                        5. Дмитрий Ревякин, техника работы -масло
                    </p>
                    <p className="textPage_paragraph textPage_paragraph__bottomSpace">
                        Youtube: Живопись и рисунок<br />
                        Telegram: https://t.me/RevyakinD<br />
                        VK: https://vk.com/d.v.revyakin<br />
                        ЯндексДзен: https://zen.yandex.ru/id/615448dd4218de6302d4cdd6
                    </p>
                </div>
            </section>
        );
    }
}

export default Advantages;