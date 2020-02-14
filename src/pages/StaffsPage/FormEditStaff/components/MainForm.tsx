import React from 'react';
import InputForm from './InputForm';
import VisualForm from './VisualForm';
import { Col, Row } from 'antd';
import styles from '../style.module.less';
const EditCustomer = () => {
  return (
    <div className={`${styles.bgWhite} ${styles.pd3}`}>
      <Row>
        <Col md={10}>
          <VisualForm />
        </Col>
        <Col md={2}></Col>
        <Col md={12}>
          <InputForm />
        </Col>
      </Row>
    </div>
  );
};
export default EditCustomer;
