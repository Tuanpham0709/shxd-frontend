import React from 'react';
import styles from '../style.module.less'
interface Props {
  title?: string
}
const CustomerHeader: React.FC<Props> = ({ title = "Thêm khách hàng" }) => {
  return (
    <div className={styles.titleContainer}>
      <span className={styles.title}>{title}</span>
    </div>
  );
};
export default CustomerHeader;
