import React from 'react';
import { Button, Select } from 'antd';
import styles from './style.module.less';
const { Option } = Select;
const optionDataProps = [
  { name: 'Nguyen Van A', value: 'Nguyen Van A' },
  { name: 'Nguyen Van A', value: 'Nguyen Van A' },
  { name: 'Nguyen Van A', value: 'Nguyen Van A' },
  // { name: 'Nguyen Van A', value: 'Nguyen Van A' },
];
const btnDataProps = [
  { text: 'Gửi phê duyệt', color: '#FF4D4F', icon: 'icon-submit', padding: 15 },
  { text: 'Xuất file Excel', color: '#00B894', icon: 'icon-file-export', padding: 15 },
  { text: 'In tài liệu', color: '#FFA200', icon: 'icon-save', padding: 20 },
];
interface OptionProps {
  name: string;
  value: string;
}
interface ButtonProps {
  text: string;
  color: string;
  icon: string;
  padding: number;
}
const HeaderBar = () => {
  return (
    <div className={styles.toolbar}>
      <Button icon="eye" className={`${styles.missingDocsBtn} ${styles.btnHeight}`}>
        Tài liệu thiếu
      </Button>
      <div style={{ float: 'right' }}>
        <Select placeholder="Chọn người phê duyệt" showSearch style={{ width: 360 }}>
          {optionDataProps.map((item: OptionProps, index: number) => {
            return (
              <Option key={index + ''} value={item.value}>
                {item.name}
              </Option>
            );
          })}
        </Select>
        <div className={styles.btnRight}>
          {btnDataProps.map((item: ButtonProps, index: number) => {
            return (
              <Button
                key={index + ''}
                className={`${styles.btnTool} ${styles.btnHeight}`}
                style={{ background: item.color, paddingLeft: item.padding, paddingRight: item.padding, border: '0' }}
              >
                <i className={item.icon}></i>
                {item.text}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default HeaderBar;
