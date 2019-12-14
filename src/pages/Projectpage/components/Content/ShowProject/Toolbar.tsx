import React from 'react';
import { Row, Col, Input, Button } from 'antd';
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
            <Button className={`${styles.imageBtn} ${styles.btnSmall}`} type="primary" size="small" icon="file-image" />
            <Button className={`${styles.fileBtn} ${styles.btnSmall}`} type="default" size="small" icon="file"></Button>
            <div className={styles.doubleBtn}>
              <Button className={styles.editBtn} type="default" size="small" icon="edit"></Button>
              <Button className={styles.completedBtn} disabled type="default" size="small" icon="check"></Button>
            </div>
          </div>
        </Col>
      </Row>
      <div className={styles.docsContainer}></div>
    </div>
  );
};
export default Toolbar;
