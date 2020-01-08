import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styled from 'styled-components';
import styles from '../style.module.less';
import { useMutation } from '@apollo/react-hooks';
import { CreatePartner, CreatePartnerVariables, CreatePartnerInput } from '../../../../graphql/types';
import { CREATE_PARTNER } from '../../../../graphql/partner/createPartner'
// import { any } from 'prop-types';

const TitleForm = styled.div`
  padding: 1em;
  margin-bottom: 30px;
  background: #ebebeb;
  font-weight: Bold;
`;
// const initialState = {
//   checkNick: any,
// };
const ModalForm: React.FC<FormComponentProps> = ({ form }) => {
  // const [state, setState] = useState(initialState);
  // const handleChange = e => {
  //   setState({ checkNick: e.target.checked });
  // };
  const [createPartner] = useMutation<CreatePartner, CreatePartnerVariables>(CREATE_PARTNER);
  const handleReset = () => {
    form.resetFields();
  };
  const check = () => {
    form.validateFieldsAndScroll((err, value) => {
      if (!err) {
        console.log("valune able", value);
        const infoPartner: CreatePartnerInput = {
          name: value.name,
          code: value.code,
          address: value.address,
          phone: value.phone,
          fax: value.room,
          admin: {
            adminName: value.username,
            adminPhoneNumber: value.phone,
            adminPassword: value.password
          }
        }

        createPartner({
          variables: {
            data: infoPartner
          }
        }).then((data) => {
          console.log("created", data);

        }).catch((error) => {
          console.log("error", error);

        })
      }


    });
    form.getFieldsValue()
  };
  const { getFieldDecorator } = form;
  return (
    <div>
      <TitleForm>Thông tin cơ bản</TitleForm>
      <Form>
        <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Col md={12} className={styles.pr1}>
            <Form.Item label="Tên khách hàng">
              {getFieldDecorator('name', {
                rules: [
                  {
                    message: 'Nhập tên của bạn',
                    required: true,
                  },
                ],
              })(<Input placeholder="Nhập tên của bạn" />)}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pl1}>
            <Form.Item label="Mã khách hàng">
              {getFieldDecorator('code', {
                rules: [
                  {
                    message: 'Nhập mã khách hàng của bạn',
                    required: true,
                  },
                ],
              })(<Input placeholder="Nhập mã khách hàng của bạn" />)}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pr1}>
            <Form.Item label="Tên công trình">
              {getFieldDecorator('projectName', {
                rules: [
                  {
                    message: 'Nhập tên công trình',
                    required: true,
                  },
                ],
              })(<Input placeholder="Nhập tên công trình" />)}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pl1}>
            <Form.Item label="Mã công trình">
              {getFieldDecorator('projectCode', {
                rules: [
                  {
                    message: 'Nhập mã công trình',
                    required: true,
                  },
                ],
              })(<Input placeholder="Nhập mã công trình" />)}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pr1}>
            <Form.Item label="Chủ tịch">
              {getFieldDecorator('chairman', {
                rules: [
                  {
                    message: 'Nhập tên chủ tịch',
                    required: true,
                  },
                ],
              })(<Input placeholder="Nhập tên chủ tich" />)}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pl1}>
            <Form.Item label="Giám đốc">
              {getFieldDecorator('manager', {
                rules: [
                  {
                    message: 'Nhập tên giám đốc',
                    required: true,
                  },
                ],
              })(<Input placeholder="Nhập tên giám đốc" />)}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pr1}>
            <Form.Item label="Phòng/CN/VP QL">
              {getFieldDecorator('room', {
                rules: [
                  {
                    message: 'Nhập tên Phòng/CN/VP QL',
                    required: true,
                  },
                ],
              })(<Input placeholder="Nhập tên Phòng/CN/VP QL" />)}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pl1}>
            <Form.Item label="Kế toán trưởng">
              {getFieldDecorator('accountant', {
                rules: [
                  {
                    message: 'Nhập tên Kế toán trưởng',
                    required: true,
                  },
                ],
              })(<Input placeholder="Nhập tên Kế toán trưởng" />)}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pr1}>
            <Form.Item label="Hotline">
              {getFieldDecorator('phone', {
                rules: [
                  {
                    message: 'Chỉ nhập số',
                    required: true,

                  },
                ],
              })(<Input type="number" placeholder="84-8-38410088" />)}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pl1}>
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

          <Col md={12} className={styles.pr1}>
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

          <Col md={12} className={styles.pl1}>
            <Form.Item label="Số lượng tài liệu">
              <Input type="number" disabled placeholder="0" />
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
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ],
              })(<Input.Password />)}
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
