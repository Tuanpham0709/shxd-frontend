import React from 'react';
import styles from './style.module.less';
import { Input, Select, Icon } from 'antd';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom'

const { Option } = Select;

const optionDataProps = [
  { keyword: 'Khách hàng A', value: 'A' },
  { keyword: 'Khách hàng B', value: 'B' },
  { keyword: 'Khách hàng C', value: 'C' },
  { keyword: 'Khách hàng D', value: 'D' },
];
interface OptionProps {
  keyword: string;
  value: string;
}
const { Search } = Input;
const HeaderBarCustomer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <Row>
          <Col md={7}>
            <Search size="small" placeholder="Tìm kiếm" />
          </Col>
          <Col md={10}></Col>
          <Col md={7}>
            <Row>
              <Col md={16}>
                <Select placeholder="Lọc" showSearch style={{ width: '100%' }}>
                  {optionDataProps.map((item: OptionProps, index: number) => {
                    return <Option value={item.value}>{item.keyword}</Option>;
                  })}
                </Select>
              </Col>
              <Col md={8}>
                  <Link
                    className={`${styles.linkBtn}`}
                    to="/add-customer"
                  >
                    <Icon
                      className={`${styles.mr1}`}
                      type="plus-circle" theme="filled"
                    />
                      Thêm
                  </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default HeaderBarCustomer;
