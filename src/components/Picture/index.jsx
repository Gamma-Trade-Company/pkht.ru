import React from 'react';

class Picture extends React.Component {
    render = () => {
        const {src, ext, alt, className} = this.props;
        return (
            <picture className={className}>
                {
                    ext.map((e, i) => {
                        <source srcSet={src+"."+e} type={"image/"+e} key={i} />
                    })
                }
                <source srcSet={src+".webp"} type="image/webp" />
                <img src={src+".webp"} alt={alt} />
            </picture>
        )
    }
}

export default Picture;