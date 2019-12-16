import React, { Component } from 'react';
import { Row, Col } from 'antd';
import WorkingTree from './WorkingTree/index';
import ShowProject from './ShowProject/index';
import styles from './style.module.less';
import HeaderBar from './HeaderBar';
class ProjectContent extends Component {
  render() {
    return (
      <div className={styles.container}>
        <HeaderBar />
        <div className={styles.container}>
          <Row>
            <Col xl={7}>
              <WorkingTree />
            </Col>
            <Col xl={17}>
              <ShowProject />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default ProjectContent;
