import React from 'react';
import { Form, Input, Button, Row, Col, Select, DatePicker } from 'antd';
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

const ModalForm: React.FC<IProps> = ({ userInfo, form }) => {
  // const [state, setState]  = useState()
  // const handleChange = e => {
  //   setState({
  //     checkNick: e.target.checked,
  //   });
  // };
  const handleReset = () => {
    form.resetFields();
  };
  const check = () => {
    form.validateFields(err => {
      if (!err) {
        console.info('success');
      }
    });
  };
  const { getFieldDecorator } = form;
  console.log('userInfo', userInfo);

  return (
    <div>
      <TitleForm>Thông tin cơ bản</TitleForm>
      <Form>
        <Row>
          <Col md={12} className={styles.pr1}>
            <Form.Item label="Họ và tên">
              {getFieldDecorator('name', {
                initialValue: userInfo && userInfo.name,

                rules: [
                  {
                    message: 'Nhập tên của bạn',
                    required: true,
                  },
                ],
              })(<Input defaultValue={userInfo && userInfo.username} placeholder="Nhập tên của bạn" />)}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pl1}>
            <Form.Item label="Số điện thoại">
              {getFieldDecorator('phone-number', {
                initialValue: userInfo && userInfo.phone,
                rules: [
                  {
                    message: 'Nhập số điện thoại của bạn',
                    required: true,
                  },
                ],
              })(<Input defaultValue={userInfo && userInfo.phone} placeholder="Nhập số điện thoại của bạn" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={12} className={styles.pr1}>
            <Form.Item label="Email">
              {getFieldDecorator('email', {
                initialValue: userInfo && userInfo.email,
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
                initialValue: userInfo && userInfo.address,
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
                initialValue: userInfo && userInfo.username,
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
                initialValue: userInfo && userInfo.password,
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
                initialValue: userInfo ? userInfo.userType : '',
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

        <TitleForm>Thông tin mở rộng</TitleForm>
        <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Col md={12} className={styles.pr1}>
            <Form.Item label="Chứng minh nhân dân">
              {getFieldDecorator('passport', {
                rules: [
                  {
                    message: 'Nhập CMTND',
                  },
                ],
              })(<Input placeholder="Nhập CMTND" />)}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pl1}>
            <Form.Item label="Tình trạng hôn nhân" hasFeedback>
              {getFieldDecorator('matrimony', {
                rules: [
                  {
                    message: 'Chọn tình trạng hôn nhân',
                  },
                ],
              })(
                <Select placeholder="Chọn">
                  <Option value="Độc thân">Độc thân</Option>
                  <Option value="Đã kết hôn">Đã kết hôn</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pr1}>
            <Form.Item label="Ngày sinh" hasFeedback>
              <DatePicker placeholder="Chọn ngày sinh" style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pl1}>
            <Form.Item label="Học vấn" hasFeedback>
              {getFieldDecorator('edu', {
                rules: [
                  {
                    message: 'Chọn học vấn',
                  },
                ],
              })(
                <Select placeholder="Chọn">
                  <Option value="THPT">THPT</Option>
                  <Option value="Trung cấp">Trung cấp</Option>
                  <Option value="Cao đẳng">Cao đẳng</Option>
                  <Option value="Đại học">Đại học</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>

        <Form.Item className={styles.textRight}>
          <Button className={`${styles.redBtn} ${styles.btnSmall}`} onClick={handleReset}>
            Huỷ bỏ
          </Button>
          <Button className={`${styles.imageBtn} ${styles.btnSmall}`} onClick={check}>
            Đồng ý
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
const WrappedModalForm = Form.create<IProps>({})(ModalForm);
export default WrappedModalForm;
