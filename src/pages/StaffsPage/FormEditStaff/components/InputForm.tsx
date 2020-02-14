import React, { useContext } from 'react';
import { Form, Input, Button, Row, Col, Select, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styled from 'styled-components';
import styles from '../style.module.less';
import { AppContext } from '../../../../contexts/AppContext';
import { RelationshipStatus, CreateCMSUser, CreateCMSUserVariables, UpdateUserInfo, UpdateUserInfoVariables, GetCMSUser_cmsGetUsers_users, Level, UserGroup } from '../../../../graphql/types';
import { CREATE_CMS_USER } from '../../../../graphql/cmsUser/createCMSUser'
import { UPDATE_CMS_USER } from '../../../../graphql/cmsUser/updateCMSUser'
import { useMutation } from '@apollo/react-hooks';
import { ToastError, ToastSuccess } from '../../../../components/Toast';
import history from '../../../../history';
import moment from 'moment';
const { Option } = Select;
const TitleForm = styled.div`
  padding: 1em;
  margin-top: 20px;
  margin-bottom: 20px;
  background: #ebebeb;
  font-weight: Bold;
  display: block
`;
enum MutationType {
  update = "update",
  create = "create"
}
const handleMutationAPI = (mutationType: MutationType) => {
  let requestCMSUser: any;
  let loading: boolean;
  if (mutationType === MutationType.create) {
    const [createCMSUser, options] = useMutation<CreateCMSUser, CreateCMSUserVariables>(CREATE_CMS_USER);
    requestCMSUser = createCMSUser;
    loading = options.loading;
    return {
      requestCMSUser,
      loading
    }
  }
  const [updateUserInfo, options] = useMutation<UpdateUserInfo, UpdateUserInfoVariables>(UPDATE_CMS_USER);
  requestCMSUser = updateUserInfo;
  loading = options.loading
  return {
    requestCMSUser,
    loading
  }
}
const validatorPhoneNumber = (rule, value, callback) => {
  if (value && !phoneRegExp.test(value)) callback("PhoneNumber is not valid");
  callback();
}
const phoneRegExp = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
const ModalForm: React.FC<FormComponentProps> = ({ form }) => {
  let mutationType: MutationType = MutationType.create;
  const { staffContext } = useContext(AppContext);
  if (staffContext) {
    mutationType = MutationType.update
  }
  console.log("staffContext", staffContext);

  const { requestCMSUser, loading } = handleMutationAPI(mutationType);
  const handleReset = () => {
    form.resetFields();
  };
  const check = () => {
    form.validateFieldsAndScroll((err, cmsUser: GetCMSUser_cmsGetUsers_users) => {
      if (!err) {

        console.log("cmsUserInfp", cmsUser);

        if (mutationType === MutationType.create) {
          requestCMSUser({ variables: { data: cmsUser } }).then(() => {
            handleReset();
            ToastSuccess({ message: "Thêm nhân viên thành công!" })
          }).catch((errre) => {
            ToastError({ message: "Có lỗi xảy ra, vui lòng thử lại sau!" })
            console.log("errre", errre);

          });
          return;
        }
        delete cmsUser.phoneNumber;
        requestCMSUser({ variables: { id: staffContext._id, data: cmsUser } })
          .then(() => {
            ToastSuccess({ message: "Cập nhật nhân viên thành công !" });
            history.goBack();
          })
          .catch((error) => {
            console.log("error", error);
            ToastError({ message: "Có lỗi xảy ra, vui lòng thử lại sau !" });
          })
      }
    });
    form.getFieldsValue();
  };
  const { getFieldDecorator } = form;
  return (
    <div>
      <TitleForm>Thông tin cơ bản</TitleForm>
      <Form>
        <Row>
          <Col md={12} className={styles.pr1}>
            <Form.Item label="Họ và tên">
              {getFieldDecorator('fullName', {
                initialValue: staffContext && staffContext.fullName,
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
            <Form.Item label="Số điện thoại">
              {getFieldDecorator('phoneNumber', {
                initialValue: staffContext && staffContext.phoneNumber,
                rules: [
                  {
                    message: 'Nhập số điện thoại của bạn',
                    required: true,
                  },
                  { validator: validatorPhoneNumber, }
                ],
              })(<Input placeholder="Nhập số điện thoại của bạn" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={12} className={styles.pr1}>
            <Form.Item label="Email">
              {getFieldDecorator('email', {
                initialValue: staffContext && staffContext.email,
                rules: [
                  {
                    message: 'Nhập email của bạn',
                    required: true,
                    type: "email"
                  },
                ],
              })(<Input placeholder="Nhập email của bạn" />)}
            </Form.Item>
          </Col>
          <Col md={12} className={styles.pl1}>
            <Form.Item label="Địa chỉ">
              {getFieldDecorator('address', {
                initialValue: staffContext && staffContext.address,
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
                initialValue: staffContext && staffContext.username,
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
                rules: [
                  {
                    message: 'Nhập mật khẩu của bạn',
                    required: true,
                  },
                ],
              })(<Input.Password placeholder="Nhập mật khẩu của bạn" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={12} className={styles.pr1}>
            <Form.Item label="Loại người đùng" hasFeedback>
              {getFieldDecorator('group', {
                initialValue: staffContext ? staffContext.group : undefined,
                rules: [{ required: true, message: 'Chọn loại người dùng' }],
              })(
                <Select placeholder="Chọn">
                  <Option value={UserGroup.MANAGER}>Quản lý</Option>
                  <Option value={UserGroup.STAFF}>Nhân viên</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>

        <TitleForm>Thông tin mở rộng</TitleForm>
        <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Col md={12} className={styles.pr1}>
            <Form.Item label="Chứng minh nhân dân">
              {getFieldDecorator('identityNumber', {
                initialValue: staffContext && staffContext.identityNumber,
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
              {getFieldDecorator('relationshipStatus', {
                initialValue: staffContext ? staffContext.relationshipStatus : undefined,
              })(
                <Select placeholder="Chọn">
                  <Option value={RelationshipStatus.SINGLE}>Độc thân</Option>
                  <Option value={RelationshipStatus.MARRIED}>Đã kết hôn</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pr1}>
            <Form.Item label="Ngày sinh" hasFeedback>
              {
                getFieldDecorator('dateOfBirth', {
                  initialValue: staffContext && moment(staffContext.dateOfBirth, "DD-MM-YYYY")
                })(
                  <DatePicker placeholder="Chọn ngày sinh" format="DD-MM-YYYY" style={{ width: '100%' }} />
                )
              }

            </Form.Item>
          </Col>

          <Col md={12} className={styles.pl1}>
            <Form.Item label="Học vấn" hasFeedback>
              {getFieldDecorator('level', {
                initialValue: staffContext ? staffContext.level : undefined,
                rules: [
                  {
                    message: 'Chọn học vấn',
                  },
                ],
              })(
                <Select placeholder="Chọn">
                  <Option value={Level.HIGHSCHOOL}>THPT</Option>
                  <Option value={Level.MIDDLE}>Trung cấp</Option>
                  <Option value={Level.COLLEGE}>Cao đẳng</Option>
                  <Option value={Level.BACHELOR}>Đại học</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>

        <Form.Item className={styles.textRight}>
          <Button disabled={loading} className={`${styles.redBtn} ${styles.btnSmall}`} onClick={handleReset}>
            Huỷ bỏ
          </Button>
          <Button disabled={loading} className={`${styles.imageBtn} ${styles.btnSmall}`} onClick={check}>
            Đồng ý
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
const WrappedModalForm = Form.create<FormComponentProps>({})(ModalForm);
export default WrappedModalForm;
