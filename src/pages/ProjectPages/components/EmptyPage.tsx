import React from 'react';
import styles from './style.module.less';
interface IProps {
    onPresOpenModal: () => void;
}
const EmptyPage: React.FC<IProps> = ({ onPresOpenModal }) => {
    return (
        <div
            onClick={onPresOpenModal}
            className={styles.container}>
            <div className={styles.centerSelf}>
                <h3 className={styles.title}>
                    Bạn chưa có tài liệu nào, tạo thêm tài liệu
            </h3>
                <img
                    className={styles.imgEmpty}
                    src={require('../../../assets/images/emptyPage.svg')} />
            </div>
        </div >
    )
}
export default EmptyPage;