import React from 'react';
import styles from '../style.module.less';

const CustomerHeader = (props: any) => {
  return (
    <div className={styles.titleContainer}>
      <span className={styles.title}>Thêm nhân viên</span>
    </div>
  );
};
export default CustomerHeader;