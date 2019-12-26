import React from 'react';
import { Input } from 'antd';
import styles from './style.module.less';
import PdfTree from './PdfTree';
const toolBtnDataProps = [
  { icon: 'icon-them-dau-muc' },
  { icon: 'icon-them-tai-lieu' },
  { icon: 'icon-share' },
  { icon: 'icon-send-mail' },
  { icon: 'icon-copy' },
  { icon: 'icon-vi-tri-luu' },
  { icon: 'icon-tai-lieu-thieu' },
];
const { Search } = Input;
const WorkingTree = () => {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.searchContainer}>
        <Search className={styles.search} size="small" />
      </div>
      <div className={styles.miniToolbar}>
        {toolBtnDataProps.map((item: any, index: number) => (
          <a
            key={index + ''}
            className={styles.btnIcon}
            style={{
              height: 35,
              backgroundColor: '#DFDFDF',
              width: '14.24%',
            }}
          >
            <i className={item.icon} />
          </a>
        ))}
      </div>
      <div>
        <div className={`${styles.treeContainer} ${styles.scrollbar}`}>
          <PdfTree />
        </div>
      </div>
    </div>
  );
};
// {filterDataProps.map((item: any, index: number) => (
//   <div style={{ width: '100%', marginBottom: 10 }}>
//     <span className={styles.left}>{item.label}</span>
//     <Checkbox className={styles.right} />
//   </div>
// ))}
export default WorkingTree;
