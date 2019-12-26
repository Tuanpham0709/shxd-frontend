import React from 'react';
import styles from './style.module.less';
import { Input, Select, Icon } from 'antd';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';

const { Option } = Select;

const optionDataProps = [
  { keyword: 'Mã công trình', value: 'A' },
  { keyword: 'Người duyệt', value: 'B' },
  { keyword: 'Ngày gửi duyệt', value: 'C' },
  { keyword: 'Tình trạng', value: 'D' },
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
                    return (
                      <Option key={index + ''} value={item.value}>
                        {item.keyword}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
              <Col md={8}>
                <Link className={`${styles.linkBtn}`} to="/projects/create">
                  <Icon className={`${styles.mr1}`} type="plus-circle" theme="filled" />
                  Thêm
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default HeaderBarCustomer;
