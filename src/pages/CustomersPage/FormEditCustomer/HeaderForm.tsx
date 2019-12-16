import React from 'react';
import styles from '../style.module.less';

const CustomerHeader = (props: any) => {
  return (
    <div className={styles.titleContainer}>
      <span className={styles.title}>Ban QLDA thành phố Hà Nội</span>
    </div>
  );
};
export default CustomerHeader;