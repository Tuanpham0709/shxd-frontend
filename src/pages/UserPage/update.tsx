import React from 'react';
import { Form, Layout, Button, Row, Col, Breadcrumb } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Styled from './indexStyled';
import FormDetail from './components/formDetail';
import { UPDATE_USER_GROUP, GET_USER } from '../../graphql/user/users';
import {
  UpdateUserGroup,
  UpdateUserGroupVariables,
  GetUser,
  GetUserVariables,
} from '../../graphql/types';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ToastError, ToastSuccess } from '../../components/Toast';
import history from '../../history';

const { Content } = Layout;

interface IEditProps extends FormComponentProps {
  match?: any;
}

const UserFormImpl = (props: IEditProps) => {
  const { match } = props;
  const _id = match.params.id;
  const [updateUserGroup, { data: updateStatusData }] = useMutation<UpdateUserGroup, UpdateUserGroupVariables>(UPDATE_USER_GROUP, {
    refetchQueries: ['searchUser'],
  });
  const { data: dataUser } = useQuery<GetUser, GetUserVariables>(GET_USER, {
    variables: {
      userId: _id,
    },
  });

  let data = {};
  if (dataUser) {
    data = {
      _id: _id,
      fullName: dataUser.cmsGetUser.fullName,
      phoneNumber: dataUser.cmsGetUser.phoneNumber,
      email: dataUser.cmsGetUser.email,
      group: dataUser.cmsGetUser.group,
      status: dataUser.cmsGetUser.termStatus,
    };
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };
  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 6 },
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values.group != dataUser.cmsGetUser.group) {
          updateUserGroup({
            variables: {
              userId: _id,
              group: values.group,
            },
          }).catch((e) => {
            ToastError({ message: 'Error', description: e.toString() });
          });
        } else {
          history.push('/users');
        }
      }
    });
  };

  if (updateStatusData) {
    history.push('/users');
    ToastSuccess({ message: 'Updated', description: 'User update success' });
  }

  return <Styled.Container>
    <Content className="content">

      <Breadcrumb>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Edit</Breadcrumb.Item>
      </Breadcrumb>

      <Row type="flex" justify="center">
        <Col span={12}>
          <Form {...formItemLayout} onSubmit={handleSubmit}>

            <FormDetail form={props.form} defaultData={data}/>

            <Form.Item {...buttonItemLayout} >
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>

    </Content>
  </Styled.Container>;
};

const UserUpdate = Form.create()(UserFormImpl);
export default UserUpdate;
