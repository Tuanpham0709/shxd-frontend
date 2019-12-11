import React, { Component } from 'react';
import CustomerForm from './CustomerForm';
import CustomerVisual from './CustomerVisual';
import { Col, Row } from 'antd';
import styles from './style.module.less';

class EditCustomer extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Row>
          <Col md={12}><CustomerVisual /></Col>
          <Col md={12}><CustomerForm /></Col>
        </Row>
      </div>
    );
  }
}
export default EditCustomer;
