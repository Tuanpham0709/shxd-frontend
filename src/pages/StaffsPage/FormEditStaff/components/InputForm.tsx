import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styled from 'styled-components';
import styles from '../style.module.less';
const { Option } = Select;
const TitleForm = styled.div`
  padding: 1em;
  margin-top: 20px
  margin-bottom: 20px;
  background: #ebebeb;
  font-weight: Bold;
  display: block
`;
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
interface IProps extends FormComponentProps<UserInfo> {
  userInfo: UserInfo;
}
class ModalForm extends Component<IProps> {
  handleChange = e => {
    this.setState({
      checkNick: e.target.checked,
    });
  };
  handleReset = () => {
    this.props.form.resetFields();
  };
  check = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        console.info('success');
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { userInfo } = this.props;
    console.log('userInfo', userInfo);

    return (
      <div>
        <TitleForm>Thông tin cơ bản</TitleForm>
        <Form>
          <Row>
            <Col md={12} className={styles.pr1}>
              <Form.Item label="Họ và tên">
                {getFieldDecorator('name', {
                  initialValue: userInfo.name,

                  rules: [
                    {
                      message: 'Nhập tên của bạn',
                      required: true,
                    },
                  ],
                })(<Input defaultValue={userInfo.address} placeholder="Nhập tên của bạn" />)}
              </Form.Item>
            </Col>

            <Col md={12} className={styles.pl1}>
              <Form.Item label="Số điện thoại">
                {getFieldDecorator('phone-number', {
                  initialValue: userInfo.phone,
                  rules: [
                    {
                      message: 'Nhập số điện thoại của bạn',
                      required: true,
                    },
                  ],
                })(<Input defaultValue={userInfo.phone} placeholder="Nhập số điện thoại của bạn" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={12} className={styles.pr1}>
              <Form.Item label="Email">
                {getFieldDecorator('email', {
                  initialValue: userInfo.email,
                  rules: [
                    {
                      message: 'Nhập email của bạn',
                      required: true,
                    },
                  ],
                })(<Input placeholder="Nhập email của bạn" />)}
              </Form.Item>
            </Col>
            <Col md={12} className={styles.pl1}>
              <Form.Item label="Địa chỉ">
                {getFieldDecorator('address', {
                  initialValue: userInfo.address,
                  rules: [
                    {
                      message: 'Nhập đỉa chỉ của bạn ',
                      required: true,
                    },
                  ],
                })(<Input placeholder="Nhập địa chỉ của bạn" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={12} className={styles.pr1}>
              <Form.Item label="Tên đăng nhập vào hệ thống">
                {getFieldDecorator('username', {
                  initialValue: userInfo.username,
                  rules: [
                    {
                      message: 'Nhập tên đăng nhập vào hệ thống',
                      required: true,
                    },
                  ],
                })(<Input placeholder="Nhận tên đăng nhập vào hệ thống" />)}
              </Form.Item>
            </Col>
            <Col md={12} className={styles.pl1}>
              <Form.Item label="Mật khẩu">
                {getFieldDecorator('password', {
                  initialValue: userInfo.password,
                  rules: [
                    {
                      message: 'Nhập mật khẩu của bạn',
                      required: true,
                    },
                  ],
                })(<Input placeholder="Nhập mật khẩu của bạn" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={12} className={styles.pr1}>
              <Form.Item label="Loại người đùng" hasFeedback>
                {getFieldDecorator('userType', {
                  initialValue: userInfo.userType,
                  rules: [{ required: true, message: 'Chọn loại người dùng' }],
                })(
                  <Select placeholder="Loại người dùng">
                    <Option value="manager">Quản lý</Option>
                    <Option value="employee">Nhân viên</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Col md={24}>
            <TitleForm>Thông tin mở rộng</TitleForm>
          </Col>
          <Row>
            <Col md={12} className={styles.pr1}>
              <Form.Item label="Chứng minh nhân dân">
                {getFieldDecorator('user-name', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input placeholder="Nhập chứng minh thư nhân dân" />)}
              </Form.Item>
            </Col>

            <Col md={12} className={styles.pl1}>
              <Form.Item label="Tình trạng quan hệ" hasFeedback>
                {getFieldDecorator('elationship-status', {
                  rules: [{ required: false }],
                })(
                  <Select placeholder="Chọn">
                    <Option value="marry">Kết hôn</Option>
                    <Option value="fa">Độc thân</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={12} className={styles.pr1}>
              <Form.Item label="Nhập ngày sinh">
                {getFieldDecorator('r', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input placeholder="Nhập ngày sinh của bạn" />)}
              </Form.Item>
            </Col>
            <Col md={12} className={styles.pl1}>
              <Form.Item label="Học vấn" hasFeedback>
                {getFieldDecorator('education', {
                  rules: [{ required: false }],
                })(
                  <Select placeholder="Chọn">
                    <Option value="university">Đại học</Option>
                    <Option value="college">Cao đẳng</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className={styles.textRight}>
            <Button className={`${styles.redBtn} ${styles.btnSmall}`} onClick={this.handleReset}>
              Huỷ bỏ
            </Button>
            <Button className={`${styles.imageBtn} ${styles.btnSmall}`} onClick={this.check}>
              Đồng ý
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const WrappedModalForm = Form.create<IProps>({})(ModalForm);
export default WrappedModalForm;
