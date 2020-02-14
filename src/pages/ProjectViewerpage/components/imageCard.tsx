import React from 'react';
import styles from './styles.module.less'
const placeholderProps = "Nhập nội dung..."
interface ImageProps {
    src?: string;
}
const ImageCard: React.FC<ImageProps> = ({ src }) => {
    console.log("src", src);

    return (
        <div className={styles.card}>
            <img className={styles.imgSize} height="auto" width="auto" src={src}></img>
            <textarea placeholder={placeholderProps} className={styles.input} />
        </div>
    )
}
export default ImageCard;


