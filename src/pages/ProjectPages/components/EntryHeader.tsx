import React, { useState } from 'react';
import { Icon, Col, Row } from 'antd';
import CollectionCreateForm from './FormCreateProject/CollectionCreateForm';
import styles from '../style.module.less';
const initialState = {
  visible: false,
};
const CollectionsPage = () => {
  const [state, setState] = useState(initialState);
  let formRef = null;
  const showModal = () => {
    setState({ visible: true });
  };

  const handleCancel = () => {
    setState({ visible: false });
  };

  const handleCreate = () => {
    const { form } = formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      setState({ visible: false });
    });
  };

  const saveFormRef = formRef => {
    formRef = formRef;
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
            <CollectionCreateForm
              wrappedComponentRef={saveFormRef}
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
