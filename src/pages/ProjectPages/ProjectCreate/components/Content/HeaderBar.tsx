import React from 'react';
import { Button, Select } from 'antd';
import styles from './style.module.less';
import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
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
      <Row>
        <Col xl={7}>
          <Button className={`${styles.missingDocsBtn} ${styles.btnHeight}`}>Tài liệu thiếu</Button>
        </Col>
        <Col xl={6}>
          <Select placeholder="Chọn người phê duyệt" showSearch style={{ width: '100%' }}>
            {optionDataProps.map((item: OptionProps, index: number) => {
              return <Option value={item.value}>{item.name}</Option>;
            })}
          </Select>
        </Col>
        <Col xl={11}>
          <div className={styles.btnRight}>
            {btnDataProps.map((item: ButtonProps, index: number) => {
              return (
                <Button
                  className={`${styles.btnTool} ${styles.btnHeight}`}
                  style={{ background: item.color, paddingLeft: item.padding, paddingRight: item.padding }}
                >
                  <i className={item.icon}></i>{item.text}
                </Button>
              );
            })}
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default HeaderBar;
