import React, { useContext } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styled from 'styled-components';
import styles from '../style.module.less';
import { useMutation } from '@apollo/react-hooks';
import {
  CreatePartner, CreatePartnerVariables,
  UpdatePartner, UpdatePartnerVariables,
  CreatePartnerInput, UpdatePartnerInput
} from '../../../../graphql/types';
import { CREATE_PARTNER } from '../../../../graphql/partner/createPartner'
import { AppContext } from '../../../../contexts/AppContext';
import { UPDATE_PARTNER } from '../../../../graphql/partner/updatePartner';
import history from '../../../../history'
import { ToastError } from '../../../../components/Toast/index'
// import { any } from 'prop-types';

const TitleForm = styled.div`
  padding: 1em;
  margin-bottom: 30px;
  background: #ebebeb;
  font-weight: Bold;
`;
enum MutationType {
  edit = "edit",
  add = "add"
}
const phoneRegExp = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);

const handleCreatePartnerInput = (value) => {
  if (!value) {
    return null;
  }
  const partner: CreatePartnerInput = {
    name: value.name,
    partnerCode: value.code,
    projectName: value.projectName,
    projectCode: value.projectCode,
    chairmanName: value.chairman,
    ceoName: value.manager,
    departmentName: value.room,
    accountantName: value.accountant,
    address: value.address,
    phone: value.phone,
    fax: value.room,
    email: value.email,
    admin: {
      adminName: value.username,
      adminPhoneNumber: value.phone,
      adminPassword: value.password
    }
  }
  return { partner };
}
const handleUpdatePartnerInput = (value, _id: string) => {
  console.log("value .code ", value.code);
  const partner: UpdatePartnerInput = {
    _id,
    name: value.name,
    partnerCode: value.code,
    projectName: value.projectName,
    projectCode: value.projectCode,
    chairmanName: value.chairman,
    ceoName: value.manager,
    departmentName: value.room,
    accountantName: value.accountant,
    address: value.address,
    phone: value.phone,
    fax: value.room,
    email: value.email,
  }
  console.log("parnet ", partner);

  return { partner };
}
const handleMutationAPI = (mutationType: MutationType) => {
  let requestPartner: any;
  let loading: boolean;
  if (mutationType === MutationType.add) {
    const [createPartner, options] = useMutation<CreatePartner, CreatePartnerVariables>(CREATE_PARTNER);
    requestPartner = createPartner;
    loading = options.loading;
    return {
      requestPartner,
      loading
    }
  }
  const [updatePartner, options] = useMutation<UpdatePartner, UpdatePartnerVariables>(UPDATE_PARTNER);
  requestPartner = updatePartner;
  loading = options.loading
  return {
    requestPartner,
    loading
  }
}

const ModalForm: React.FC<FormComponentProps> = ({ form }) => {

  let mutationType: MutationType = MutationType.add;
  const { partnerContext } = useContext(AppContext);

  if (partnerContext) {
    mutationType = MutationType.edit
  }
  const { requestPartner, loading } = handleMutationAPI(mutationType);
  const handleReset = () => {
    form.resetFields();
  };
  const checkAndRequest = () => {
    form.validateFieldsAndScroll((err, value) => {
      if (!err) {
        if (mutationType === MutationType.add) {
          const { partner } = handleCreatePartnerInput(value);
          requestPartner({ variables: { data: partner } })
            .then((data) => { handleReset() })
            .catch((error) => { ToastError({ message: "Có lỗi xảy ra, vui lòng thử lại sau" }) });
          return;
        }
        const { partner } = handleUpdatePartnerInput(value, partnerContext.id);
        requestPartner({ variables: { data: partner } })
          .then((data) => {
            history.goBack();
          })
          .catch((error) => {
            ToastError({ message: "Có lỗi xảy ra, vui lòng thử lại sau" });
          });
      }
    });
    form.getFieldsValue()
  };
  const validatorPhoneNumber = (rule, value, callback) => {
    if (value && !phoneRegExp.test(value)) {
      callback("PhoneNumber is not valid ")
    }
    callback();
  }
  const { getFieldDecorator } = form;
  return (
    <div>
      <TitleForm>Thông tin cơ bản</TitleForm>
      <Form>
        <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Col md={12} className={styles.pr1}>
            <Form.Item label="Tên khách hàng">
              {getFieldDecorator('name', {
                initialValue: partnerContext && partnerContext.name,
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
                initialValue: partnerContext && partnerContext.code,
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
                initialValue: partnerContext && partnerContext.projectName,
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
                initialValue: partnerContext && partnerContext.projectCode,
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
                initialValue: partnerContext && partnerContext.chairman,
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
                initialValue: partnerContext && partnerContext.manager,
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
                initialValue: partnerContext && partnerContext.room,
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
                initialValue: partnerContext && partnerContext.accountant,
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
                initialValue: partnerContext && partnerContext.phone,
                rules: [
                  {
                    required: true,
                    message: "Nhập số điện thoại"
                  },
                  {
                    validator: validatorPhoneNumber,
                  }
                ],
              })(<Input type="number" placeholder="84-8-38410088" />)}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pl1}>
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                initialValue: partnerContext && partnerContext.email,
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
                initialValue: partnerContext && partnerContext.address,
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
          <Button disabled={loading} className={`${styles.redBtn} ${styles.btnSmall}`} onClick={handleReset}>
            Huỷ bỏ
          </Button>
          <Button disabled={loading} className={`${styles.imageBtn} ${styles.btnSmall}`} onClick={checkAndRequest}>
            Đồng ý
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
const WrappedModalForm = Form.create({})(ModalForm);
export default WrappedModalForm;
