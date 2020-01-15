import React, { useState } from 'react';
import { Row, Col, Input, Button } from 'antd';
import styles from './style.module.less';
import UploadFile from '../components/UploadFile';
const initialState = {
  visible: false
}
const Toolbar = () => {
  const [state, setState] = useState(initialState);
  const showModal = () => {
    setState({ visible: !state.visible });
  }
  const onDismiss = () => {
    setState({ visible: false })
  }
  const onSubmit = () => {
    setState({ visible: false })
  }
  return (
    <div className={styles.toolbar}>
      <Row>
        <Col xl={8} lg={8}>
          <span>Tên văn bản</span>
        </Col>
        <Col xl={7} lg={7}>
          <span>Ký hiệu, ngày tháng năm ban hành</span>
        </Col>
        <Col xl={5} lg={5}>
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
        <Col xl={7}>
          <div className={styles.marginRight}>
            <Input placeholder="Nhập ký hiệu, ngày tháng năm ban hành" className={styles.inputHeight}></Input>
          </div>
        </Col>
        <Col xl={5}>
          <div className={styles.marginRight}>
            <Input placeholder="Nhập cơ quan ban hành" className={styles.inputHeight}></Input>
          </div>
        </Col>
        <Col xl={4}>
          <div className={styles.btnContainer}>
            <Button
              onClick={showModal}
              className={`${styles.imageBtn} ${styles.btnSmall}`} type="primary">
              <i className="icon-image"></i>
            </Button>
            <Button className={`${styles.fileBtn} ${styles.btnSmall}`} type="default">
              <i className="icon-note"></i>
            </Button>
            <div className={styles.doubleBtn}>
              <Button className={styles.editBtn} type="default">
                <i className="icon-edit"></i>
              </Button>
              <Button className={styles.completedBtn} disabled type="default">
                <i className="icon-done"></i>
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <div className={styles.docsContainer}></div>
      <UploadFile onDismiss={onDismiss} onSubmit={onSubmit} visible={state.visible}></UploadFile>
    </div>
  );
};
export default Toolbar;
