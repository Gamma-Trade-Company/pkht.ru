import BlockHeader from '../blockHeader';
import './certificates.scss';
import CertificatesBlock from './CertificatesBlock';

export default function Certificates() {
    return (
        <section className="certificates">
            <div className="certificates__header">
                <BlockHeader>Качество нашей продукции</BlockHeader>
            </div>
            <div className="certificates__body">
                {
                    blockList.map(block => (
                        <div className="certificates__body-block" key={block.url}>
                            <CertificatesBlock {...block} />
                        </div>
                    ))
                }
            </div>
        </section>
    );
}

const blockList = [
    {
        url: '/documents/kraski_guash.pdf',
        img: '/img/certificates/kraski_guash.png',
    },
    {
        url: '/documents/kraski_akvarel.pdf',
        img: '/img/certificates/kraski_akvarel.png',
    },
    {
        url: '/documents/plastilin.pdf',
        img: '/img/certificates/plastilin.png',
    },
];