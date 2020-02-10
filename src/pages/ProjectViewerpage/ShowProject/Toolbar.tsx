import React, { useState } from 'react';
import { Row, Col, Input, Button } from 'antd';
import styles from './style.module.less';
import UploadFile from '../components/UploadFile';
import Note from '../components/NoteModal';
const useStateVisible = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isAddImageModal, setAddImageModal] = useState(false);
  const [isAddNoteModal, setAddNoteModal] = useState(false);
  return {
    isEdit, isAddImageModal, isAddNoteModal, setIsEdit, setAddImageModal, setAddNoteModal
  }
}
const Toolbar = () => {
  const { isEdit, isAddImageModal, isAddNoteModal, setIsEdit, setAddImageModal, setAddNoteModal } = useStateVisible();
  const showAddImageModal = () => {
    setAddImageModal(!isAddImageModal);
  }
  const onEdit = () => {
    setIsEdit(!isEdit);
  }
  const onNote = () => {
    setAddNoteModal(!isAddNoteModal)
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
              disabled={!isEdit}
              onClick={showAddImageModal}
              className={`${styles.imageBtn} ${styles.btnSmall}`} type="primary">
              <i className="icon-image"></i>
            </Button>
            <Button
              disabled={!isEdit}
              onClick={onNote}
              className={`${styles.fileBtn} ${styles.btnSmall}`} type="default">
              <i className="icon-note"></i>
            </Button>
            <div className={styles.doubleBtn}>
              <Button
                disabled={isEdit}
                style={{ backgroundColor: isEdit ? "#CCCCCC" : "#16A085" }}
                onClick={onEdit}
                className={styles.editBtn} type="default">
                <i className="icon-edit"></i>
              </Button>
              <Button
                style={{ backgroundColor: isEdit ? "#16A085" : "#CCCCCC" }}
                onClick={onEdit}
                className={styles.completedBtn} disabled={!isEdit} type="default">
                <i className="icon-done"></i>
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <div className={styles.docsContainer}></div>
      <UploadFile onDismiss={showAddImageModal} onSubmit={showAddImageModal} visible={isAddImageModal}></UploadFile>
      <Note onSubmit={onNote} onDismiss={onNote} visible={isAddNoteModal} />
    </div>
  );
};
export default Toolbar;
