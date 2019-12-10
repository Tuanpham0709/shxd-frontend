import React from 'react';
import styles from './style.module.less';
import { Input, Select } from 'antd';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom'

const { Option } = Select;

const optionDataProps = [
  { keyword: 'Khách hàng A', value: 'A' },
  { keyword: 'Khách hàng B', value: 'B' },
  { keyword: 'Khách hàng C', value: 'C' },
  { keyword: 'Khách hàng D', value: 'D' },
];
const btnDataProps = [
  { text: 'Thêm', color: '#F9D74D', icon: 'plus-circle', padding: 20 },
];
interface OptionProps {
  keyword: string;
  value: string;
}
interface ButtonProps {
  text: string;
  color: string;
  icon: string;
  padding: number;
}
const { Search } = Input;
const HeaderBarCustomer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <Row>
          <Col md={12}>
            <Search size="small" />
          </Col>
          <Col md={12}>
            <Row>
              <Col md={18}>
                <Select placeholder="Lọc" showSearch style={{ width: '100%' }}>
                  {optionDataProps.map((item: OptionProps, index: number) => {
                    return <Option value={item.value}>{item.keyword}</Option>;
                  })}
                </Select>
              </Col>
              <Col md={6}>
                <div className={styles.btnRight}>
                  {btnDataProps.map((item: ButtonProps, index: number) => {
                    return (
                      // <Button
                      //   className={`${styles.btnTool} ${styles.colorBlack} ${styles.btnHeight}`}
                      //   style={{ background: item.color, paddingLeft: item.padding, paddingRight: item.padding }}
                      //   icon={item.icon}
                      // >
                      //   {item.text}
                      // </Button>
                        <Link to="/projects">Redirect</Link>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default HeaderBarCustomer;
