import React from 'react';
import { Input, Button, Checkbox } from 'antd';
import styles from './style.module.less';
const toolBtnDataProps = [
  { icon: 'unordered-list' },
  { icon: 'file-image' },
  { icon: 'share-alt' },
  { icon: 'mail' },
  { icon: 'file' },
  { icon: 'save' },
  { icon: 'fullscreen' },
];
const filterDataProps = [
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
  { label: 'Bản xác định hợp đồng abcd ' },
];
const { Search } = Input;
class WorkingTree extends React.Component {
  state: {};

  render() {
    return (
      <div className={styles.filterContainer}>
        <div className={styles.searchContainer}>
          <Search size="small" />
        </div>
        <div className={styles.miniToolbar}>
          {toolBtnDataProps.map((item: any, index: number) => (
            <Button
              className={styles.btnIcon}
              size="small"
              icon={item.icon}
            ></Button>
          ))}
        </div>
        <div className={styles.hozLine}>
          <div className={styles.chooseAll}>
            <span>Chọn tất cả</span>
            <Checkbox />
          </div>
        </div>
        <div>
          <div className={styles.treeContainer}>
            {filterDataProps.map((item: any, index: number) => (
              <div style={{ marginBottom: 15, width: '100%' }}>
                <span className={styles.left}>{item.label}</span>
                <Checkbox className={styles.right} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default WorkingTree;
