import React, { useState } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Styled from '../indexStyled';
import { useMutation } from '@apollo/react-hooks';
import { CmsSetUserStatus, CmsSetUserStatusVariables, ReportFor } from '../../../graphql/types';
import { CMS_SET_USER_STATUS } from '../../../graphql/user/users';
import { ToastSuccess } from '../../../components/Toast';

const { Option } = Select;

interface defaultData {
  _id?: any,
  fullName?: string,
  phoneNumber?: string,
  email?: string,
  password?: string,
  gender?: string,
  group?: string,
  status?: string,
}

interface defaultProps extends FormComponentProps {
  defaultData?: defaultData
  form: any
}

const FormDetail = (props: defaultProps) => {
  const { getFieldDecorator } = props.form;
  const [showModal, setShowModal]  = useState(false);
  const [statusValue, setStatusValue]  = useState('');
  const [inputValue, setInputValue]  = useState('');
  const genders = ['male', 'female'];
  const groups = ['ADMIN', 'STAFF', 'PROVIDER', 'MEMBER'];
  const statuses = ['NORMAL', 'BLOCKED', 'SUSPENDING'];

  const [updateUserStatus, {data}] = useMutation<CmsSetUserStatus, CmsSetUserStatusVariables>(CMS_SET_USER_STATUS);

  const handleSelectChange = () => {

  };

  const changeStatus = (value) => {
    setShowModal(true);
    setStatusValue(value);
  };

  const handleOk = () => {

    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        setShowModal(false);
        updateUserStatus({
          variables: {
            _id: props.defaultData._id,
            termStatus: props.form.getFieldValue('status'),
            model: ReportFor.USER,
            reason: ''
          },
        }).catch((er) => {

        })
      }
    });
  };

  const handleCancel = () => {
    props.form.setFieldsValue({
      status: props.defaultData.status,
    });
    setShowModal(false);
  };

  if (data) {
    ToastSuccess({message: 'Success', description: 'Update status success'})
  }

  return (
    <Styled.Container>
      <Form.Item label="Full name">
        {getFieldDecorator('fullName', {
          initialValue: props.defaultData && props.defaultData.fullName || '',
        })(<Input placeholder="Please input your name" readOnly={true}/>)}
      </Form.Item>

      <Form.Item label="E-mail">
        {getFieldDecorator('email', {
          initialValue: props.defaultData && props.defaultData.email || '',
        })(<Input readOnly={true}/>)}
      </Form.Item>

      <Form.Item label="Phone number">
        {getFieldDecorator('phoneNumber', {
          initialValue: props.defaultData && props.defaultData.phoneNumber || '',
        })(<Input readOnly={true}/>)}
      </Form.Item>

      <Form.Item label="Gender">
        {getFieldDecorator('gender', {
          initialValue: props.defaultData && props.defaultData.gender || 'male',
        })(
          <Select
            placeholder="Select a option and change input text above"
            onChange={handleSelectChange}
            disabled={true}
          >
            {genders.map((r, i) => {
              return <Option key={i} value={r}>{r}</Option>;
            })}
          </Select>
        )}
      </Form.Item>

      <Form.Item label="Group">
        {getFieldDecorator('group', {
          initialValue: props.defaultData && props.defaultData.group || 'MEMBER',
          rules: [{ required: true, message: 'Please select your group!' }],
        })(
          <Select
            placeholder="Select a option and change input text above"
            onChange={handleSelectChange}
          >
            {groups.map((r, i) => {
              return <Option key={i} value={r}>{r}</Option>;
            })}
          </Select>,
        )}
      </Form.Item>

      <Form.Item label="Status">
        {getFieldDecorator('status', {
          initialValue: props.defaultData && props.defaultData.status || '',
          rules: [{ required: true, message: 'Please select your status!' }],
        })(
          <Select
            placeholder="Select a option and change input text above"
            onChange={(value) => changeStatus(value)}
          >
            {statuses.map((r, i) => {
              return <Option key={`status-${i}`} value={r}>{r}</Option>;
            })}
          </Select>
        )}
      </Form.Item>

      <Modal
        title="Change user status"
        visible={showModal}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
      >
        <p>Would you like to change the status to <strong>{statusValue}</strong></p>
        {
          statusValue == 'BLOCKED' ?
            <Form.Item>
              {getFieldDecorator('reason', {
                initialValue: '',
                rules: [{ required: true, message: 'Please select your reason!' }],
              })(
                <Input placeholder="Reason to blocked" value={inputValue} onChange={(e) => setInputValue(e.target.value) } />
              )}
            </Form.Item>
            : ''
        }
      </Modal>
    </Styled.Container>
  );
};
export default FormDetail;
