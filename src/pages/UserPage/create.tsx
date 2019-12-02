import React from 'react';
import { Form, Layout, Button, Row, Col, Breadcrumb } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Styled from './indexStyled';
import FormDetail from './components/formDetail';

const { Content } = Layout;

interface IEditProps extends FormComponentProps {
  match?: any;
}

const UserFormImpl = (props: IEditProps) => {

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
        console.log('Received values of form: ', values);
      }
    });
  };

  return <Styled.Container>
    <Content className="content">

      <Breadcrumb>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Create</Breadcrumb.Item>
      </Breadcrumb>

      <Row type="flex" justify="center">
        <Col span={12}>
          <Form {...formItemLayout} onSubmit={handleSubmit}>

            <FormDetail form={props.form} />

            <Form.Item {...buttonItemLayout} >
              <Button type="primary">Submit</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>

    </Content>
  </Styled.Container>;
};

const UserPage = Form.create()(UserFormImpl);
export default UserPage;
