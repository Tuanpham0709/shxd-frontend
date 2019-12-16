import React from 'react';
import styles from '../style.module.less';

const CustomerHeader = ({ title }) => {
  return (
    <div className={styles.titleContainer}>
      <span className={styles.title}>{title}</span>
    </div>
  );
};
export default CustomerHeader;
