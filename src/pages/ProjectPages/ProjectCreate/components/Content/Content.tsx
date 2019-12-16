import React from 'react';
import WorkingTree from './WorkingTree/index';
import ShowProject from './ShowProject/index';
import { Col, Row } from 'antd';
import styles from './style.module.less';
const Content = () => {
  return (
    <div className={styles.contentContainer}>
      <Row>
        <Col xl={7}>
          <WorkingTree />
        </Col>
        <Col xl={17}>
          <ShowProject />
        </Col>
      </Row>
    </div>
  );
};
export default Content;
