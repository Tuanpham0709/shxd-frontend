import React from 'react';
import CustomerVisual from './CustomerVisual/index';
import CustomerForm from './CustomerForm/index';
import { Col, Row } from 'antd';
import styles from './style.module.less';
const Content = () => {
  return (
    <div className={styles.contentContainer}>
      <Row>
        <Col md={12}>
          <CustomerVisual />
        </Col>
        <Col md={12}>
          <CustomerForm />
        </Col>
      </Row>
    </div>
  );
};
export default Content;
