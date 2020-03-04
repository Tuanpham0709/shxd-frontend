import React from 'react';
import { Input, Select, Icon, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import styles from './style.module.less';

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
interface IProps {
  onChangeSearch: (e) => void;
  onSearch: (value) => void;
}
const { Search } = Input;
const HeaderBarCustomer: React.FC<IProps> = ({ onSearch, onChangeSearch }) => {
  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <Row>
          <Col md={7}>
            <Search
              onSearch={onSearch}
              onChange={onChangeSearch}
              size="small" placeholder="Tìm kiếm" />
          </Col>
          <Col md={10}></Col>
          <Col md={7}>
            <Row>
              <Col md={16}>
                <Select placeholder="Lọc" showSearch style={{ width: '100%' }}>
                  {optionDataProps.map((item: OptionProps, index: number) => {
                    return (
                      <Option key={`${index}`} value={item.value}>
                        {item.keyword}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
              <Col md={8}>
                <Link className={`${styles.linkBtn}`} to="/customers/edit">
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
