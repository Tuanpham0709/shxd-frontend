import React from 'react';
import { Row, Col, Input } from 'antd';
import styles from './style.module.less';
const Toolbar = () => {
  return (
    <div className={styles.toolbar}>
      <Row>
        <Col xl={8} lg={8}>
          <span>Tên văn bản</span>
        </Col>
        <Col xl={6} lg={6}>
          <span>Ký hiệu, ngày tháng năm ban hành</span>
        </Col>
        <Col xl={6} lg={6}>
          <span>Cơ quan ban hành</span>
        </Col>
        <Col xl={4} lg={4} />
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col xl={8}>
          <div className={styles.marginRight}>
            <Input placeholder="Nhập tên văn bản" className={styles.inputHeight} style={{ marginRight: 10 }}></Input>
          </div>
        </Col>
        <Col xl={6}>
          <div className={styles.marginRight}>
            <Input placeholder="Nhập ký hiệu, ngày tháng năm ban hành" className={styles.inputHeight}></Input>
          </div>
        </Col>
        <Col xl={5}>
          <div className={styles.marginRight}>
            <Input placeholder="Nhập cơ quan ban hành" className={styles.inputHeight}></Input>
          </div>
        </Col>
        <Col xl={5}>
          <div className={styles.btnContainer}>
            <a className={`${styles.imageBtn} ${styles.btnSmall} ${styles.btnIcon}`}> <i className  = ""></i></a>
            <a className={`${styles.fileBtn} ${styles.btnSmall} ${styles.btnIcon}`}></a>
            <div className={styles.doubleBtn}>
              <a className={`${styles.editBtn} ${styles.btnIcon}`}></a>
              <a className={`${styles.completedBtn} ${styles.btnIcon}`}></a>
            </div>
          </div>
        </Col>
      </Row>
      <div className={styles.docsContainer}></div>
    </div>
  );
};
export default Toolbar;
