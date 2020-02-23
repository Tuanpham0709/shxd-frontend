import React, { useContext } from 'react';
import styles from './styles.module.less';
import { AppContext } from '../../../contexts/AppContext';
const placeholderProps = "Nhập nội dung...";
interface ImageProps {
    src?: string;
    index?: number;
}
const ImageCard: React.FC<ImageProps> = ({ src, index }) => {
    const { onUpdateContext, filesLocation } = useContext(AppContext);

    const onUpdateNote = (e) => {
        console.log(e);
        const { value } = e.target;
        let filesL = filesLocation ? filesLocation : [];
        filesL[index].note = value;
        onUpdateContext({ filesLocation: filesLocation })
    }
    return (
        <div className={styles.card}>
            <img className={styles.imgSize} height="auto" width="auto" src={src}></img>
            <textarea onChange={onUpdateNote} placeholder={placeholderProps} className={styles.input} />
        </div>
    )
}
export default ImageCard;


