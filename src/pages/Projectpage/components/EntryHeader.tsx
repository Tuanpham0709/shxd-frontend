import React from 'react';
import { Icon, Col, Row } from 'antd';
import CollectionCreateForm from './FormCreateProject/CollectionCreateForm';
import styles from '../style.module.less';

class CollectionsPage extends React.Component<any,any> {
  state = {
    visible: false,
  };
  formRef = null

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div className={styles.titleContainer}>
        <Row>
          <Col md={18}>
            <span className={styles.title}>Quản lý hồ sơ</span>
          </Col>
          <Col md={6}>
            <div className={styles.textRight}>
              <div className={`${styles.linkBtn}`} onClick={this.showModal}>
                <Icon
                  className={styles.mr1}
                  type="plus-circle" theme="filled"
                />
                Tạo hồ sơ
              </div>
              <CollectionCreateForm
                wrappedComponentRef={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                onCreate={this.handleCreate}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default CollectionsPage;