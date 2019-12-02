import React, { useContext } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../../graphql/authentication/login';
import { Login, LoginVariables } from '../../graphql/types';
import Styled from './indexStyled';
import { AuthContext } from '../../contexts/AuthContext';
import { getToken, setToken } from '../../helpers/tokenHelpers';
import history from '../../history';


const LoginFormImpl = (props: FormComponentProps) => {
  const { getFieldDecorator } = props.form;
  let errorMessages = [];

  const authContext = useContext(AuthContext);

  const [login, { data, error }] = useMutation<Login, LoginVariables>(LOGIN);

  if (getToken()) {
    history.push('/');
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      if (!err) {
        login({
          variables: {
            data: {
              phoneNumber: values.phoneNumber,
              password: values.password,
            },
          },
        }).catch(error => {
          console.log(error);
        });
      }
    });
  };
  if (data) {
    localStorage.setItem('_refreshToken', data.login.refreshToken);
    localStorage.setItem('expiresAt', data.login.expiresAt);
    setToken(data.login.idToken);
    authContext.actions.setToken(data.login.idToken);
    history.push('/');
  }

  if (error) {
    error.graphQLErrors.map((el) => {
      errorMessages.push(el.message);
    })
  }

  return <Styled.Container>
    <div className="container">
      <h3 className="title">Login</h3>
      <ul className="text-danger">
        {
          errorMessages.map((el, i) => {
            return <li key={i}>{el}</li>
          })
        }
      </ul>
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('phoneNumber', {
            rules: [{ required: true, message: 'Please input your username!' }],
            initialValue: '',
          })(
            <Input
              autoFocus={true}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
              placeholder="Phone number"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Please input your Password!' },
              { min: 6, message: 'Please Enter more than 6 character' },
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  </Styled.Container>;
};

const LoginPage = Form.create()(LoginFormImpl);
export default LoginPage;
