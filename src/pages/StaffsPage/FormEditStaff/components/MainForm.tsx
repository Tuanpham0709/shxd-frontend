import React, { Component } from 'react';
import InputForm from './InputForm';
import VisualForm from './VisualForm';
import { Col, Row } from 'antd';
import styles from '../style.module.less';
interface UserInfo {
  key: string;
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  username: string;
  password: string;
  userType: string;
}
interface IProps {
  userInfo?: UserInfo;
}
class EditCustomer extends Component<IProps> {
  render() {
    console.log('props', this.props.userInfo);

    return (
      <div className={`${styles.bgWhite} ${styles.pd3}`}>
        <Row>
          <Col md={10}>
            <VisualForm />
          </Col>
          <Col md={2}></Col>
          <Col md={12}>
            <InputForm userInfo={this.props.userInfo} />
          </Col>
        </Row>
      </div>
    );
  }
}
export default EditCustomer;
