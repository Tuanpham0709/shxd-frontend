import React from 'react';
import InputForm from './InputForm';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import styles from '../style.module.less';
const VisualImage = styled.div`
  text-align: center;
  img {
    display: inline-block;
  }
`;
const Title = styled.h2`
  margin: 100px 0;
`;
const EditCustomer = () => {
  return (
    <div className={`${styles.bgWhite} ${styles.pd3}`}>
      <Row>
        <Col md={12}>
          <div className={styles.filterContainer}>
            <Title className={`${styles.textCenter}`}>THÔNG TIN KHÁCH HÀNG</Title>
            <VisualImage>
              <img src={require('./img/visualphoto.png')} alt="THÔNG TIN KHÁCH HÀNG" />
            </VisualImage>
          </div>
        </Col>
        <Col md={12}>
          <InputForm />
        </Col>
      </Row>
    </div>
  );
};
export default EditCustomer;
