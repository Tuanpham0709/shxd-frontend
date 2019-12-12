import React, {Component} from 'react';
import { Icon, Col, Row, Modal } from 'antd';
import FormCreate from './FormCreate';
import styles from '../style.module.less';

class CustomerHeader extends Component {
  state = {
    BtnText: 'Tạo hồ sơ',
    visible: false,
    confirmLoading: false,
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };
  render() {
    const { visible, BtnText } = this.state;
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
                {BtnText}
              </div>
              <Modal
                title="Tạo hồ sơ"
                visible={visible}
                onCancel={this.handleCancel}
                footer={null}
                width={960}
              >
                <FormCreate />
              </Modal>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
};
export default CustomerHeader;