import React from 'react';
import { Form, Input, Select, Button, Row, Col, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styled from 'styled-components';
import styles from '../style.module.less';

const { Option } = Select;

const TitleForm = styled.div`
  padding: 1em;
  margin-bottom: 30px;
  background: #ebebeb;
  font-weight: Bold;
`;

const ModalForm: React.FC<FormComponentProps> = ({ form }) => {
  // handleChange = e => {
  //   this.setState(
  //     {
  //       checkNick: e.target.checked,
  //     }
  //   );
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
  return (
    <div>
      <Form>
        <TitleForm>Thông tin cơ bản</TitleForm>
        <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Col md={12} className={styles.pr1}>
            <Form.Item label="Họ và Tên">
              {getFieldDecorator('user-name', {
                rules: [
                  {
                    message: 'Nhập tên đầy đủ của bạn',
                    required: true,
                  },
                ],
              })(<Input placeholder="Nhập tên đầy đủ của bạn" />)}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pl1}>
            <Form.Item label="Số điện thoại">
              {getFieldDecorator('hotline', {
                rules: [
                  {
                    message: 'Chỉ nhập số',
                    required: true,
                  },
                ],
              })(<Input type="number" placeholder="84-8-38410088" />)}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pr1}>
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'Nhập địa chỉ E-mail!',
                  },
                  {
                    required: true,
                    message: 'Nhập địa chỉ E-mail!',
                  },
                ],
              })(<Input placeholder="E-mail" />)}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pl1}>
            <Form.Item label="Địa chỉ">
              {getFieldDecorator('address', {
                rules: [
                  {
                    message: 'Nhập địa chỉ',
                    required: true,
                  },
                ],
              })(<Input placeholder="Nhập địa chỉ" />)}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pr1}>
            <Form.Item label="Tên đăng nhập vào hệ thống">
              {getFieldDecorator('username', {
                rules: [
                  {
                    message: 'Tên đăng nhập vào hệ thống',
                    required: true,
                  },
                ],
              })(<Input placeholder="Nhập tên đăng nhập vào hệ thống" />)}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pl1}>
            <Form.Item label="Mật khẩu" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Nhập mật khẩu',
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pr1}>
            <Form.Item label="Loại người dùng" hasFeedback>
              {getFieldDecorator('user-type', {
                rules: [
                  {
                    message: 'Chọn loại kiểu người dùng',
                    required: true,
                  },
                ],
              })(
                <Select placeholder="Chọn">
                  <Option value="Quản ký">Quản lý</Option>
                  <Option value="Nhân viên">Nhân viên</Option>
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
                    required: true,
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
                    required: true,
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
              {getFieldDecorator('year-of-birth', {
                rules: [
                  {
                    message: 'Chọn ngày sinh',
                    required: true,
                  },
                ],
              })(<DatePicker placeholder="Chọn ngày sinh" style={{ width: '100%' }} />)}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pl1}>
            <Form.Item label="Học vấn" hasFeedback>
              {getFieldDecorator('matrimony', {
                rules: [
                  {
                    message: 'Chọn học vấn',
                    required: true,
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
const WrappedModalForm = Form.create({})(ModalForm);
export default WrappedModalForm;
