import cls from './certificatesBlock.module.scss';

export default function CertificatesBlock({className, ...props}) {
    return (
        <a 
            className={className ? `${className} ${cls.block}` : cls.block}
            href={props.url}
            target="_blank"
            rel="noopener noreferrer">
                <img className={cls.img} src={props.img} alt="" />
        </a>
    );
}