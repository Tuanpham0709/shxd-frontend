import React from 'react';
import styles from '../style.module.less';

const CustomerHeader = (props: any) => {
  return (
    <div className={styles.titleContainer}>
      <span className={styles.title}>Nguyễn Trọng Phùng Hưng</span>
    </div>
  );
};
export default CustomerHeader;