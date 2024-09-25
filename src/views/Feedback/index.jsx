import Accordion from "../../components/UI/Accordion";
import FormFeedback from "./components/FormFeedback/FormFeedback";
import FormOffer from "./components/FormOffer/FormOffer";
import classes from './feedback.module.scss';

export default function Feedback() {
    return (
        <section style={{ marginTop: '3.3rem' }}>
            <div className="container">
                <h1 className={classes.title}>Обратная связь</h1>
                <Accordion
                    summary="Предложение сырья и комплектующих"
                    open={window.location.hash.replace('#', '') === 'anchor-form-offer'}
                    id="anchor-form-offer"
                    className={classes.accordion}>
                      <FormOffer/>
                </Accordion>
                <Accordion
                    summary="Обратная связь от потребителей / отзывы про товар"
                    id="anchor-form-feedback"
                    open={window.location.hash.replace('#', '') === 'anchor-form-feedback'}
                    className={classes.accordion}>
                      <FormFeedback/>
                </Accordion>
            </div>
        </section>
    );
}