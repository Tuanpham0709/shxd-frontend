import React, { useState, createRef } from 'react';
import { Icon, Col, Row } from 'antd';
import CreateFileModal from './FormCreateProject/CreateFileModal';
import styles from '../style.module.less';
import { FormComponentProps } from 'antd/lib/form';
interface IState {
  visible: boolean
}
const initialState: IState = {
  visible: false,
};
const CollectionsPage = () => {
  const [state, setState] = useState(initialState);
  const formRef = createRef<FormComponentProps>();
  const showModal = () => {
    setState({ visible: true });
  };

  const handleCancel = () => {
    setState({ visible: false });
  };

  const handleCreate = () => {
    console.log("inhearn");

    const { form } = formRef.current
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      form.resetFields();
      setState({ visible: false });
    });
  };

  return (
    <div className={styles.titleContainer}>
      <Row>
        <Col md={18}>
          <span className={styles.title}>Quản lý hồ sơ</span>
        </Col>
        <Col md={6}>
          <div className={styles.textRight}>
            <div className={`${styles.linkBtn}`} onClick={showModal}>
              <Icon className={styles.mr1} type="plus-circle" theme="filled" />
              Tạo hồ sơ
            </div>
            <CreateFileModal
              wrappedComponentRef={formRef}
              visible={state.visible}
              onCancel={handleCancel}
              onCreate={handleCreate}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default CollectionsPage;
