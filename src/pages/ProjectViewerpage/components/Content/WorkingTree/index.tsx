import React from 'react';
import { Input, Button } from 'antd';
import styles from './style.module.less';
import PdfTree from './PdfTree';
const toolBtnDataProps = [
  { icon: 'unordered-list' },
  { icon: 'file-image' },
  { icon: 'share-alt' },
  { icon: 'mail' },
  { icon: 'file' },
  { icon: 'save' },
  { icon: 'fullscreen' },
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
            <Button
              key={index + ''}
              className={styles.btnIcon}
              style={{
                height: 35,
                backgroundColor: '#DFDFDF',
                width: '14.24%',
                borderWidth: 2,
                borderColor: '#fff',
              }}
              size="small"
              icon={item.icon}
            ></Button>
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
