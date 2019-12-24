import React from 'react';
import { Input, Button } from 'antd';
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
// const filterDataProps = [{ label: 'Bản xác định hợp đồng abcd ' }, { label: 'Bản xác định hợp đồng abcd ' }];
const { Search } = Input;
class WorkingTree extends React.Component {
  state: {
    gData: [];
    expandedKeys: ['0-0', '0-0-0', '0-0-0-0'];
  };

  render() {
    return (
      <div className={styles.filterContainer}>
        <div className={styles.searchContainer}>
          <Search className={styles.search} size="small" />
        </div>
        <div className={styles.miniToolbar}>
          {toolBtnDataProps.map((item: any, index: number) => (
            <Button key={index + ''} className={styles.btnIcon}>
              <i className={item.icon}></i>
            </Button>
          ))}
        </div>

        <div>
          <div className={`${styles.treeContainer} ${styles.scrollbar}`}>
            <PdfTree />
          </div>
        </div>
      </div>
    );
  }
}
// {filterDataProps.map((item: any, index: number) => (
//   <div style={{ width: '100%', marginBottom: 10 }}>
//     <span className={styles.left}>{item.label}</span>
//     <Checkbox className={styles.right} />
//   </div>
// ))}
export default WorkingTree;
