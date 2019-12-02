import React, { useEffect, useState } from 'react';
import { Form, Layout, Table, Button, Breadcrumb, Skeleton, Input, Row, Col } from 'antd';

import { FormComponentProps } from 'antd/lib/form';
import Styled from './indexStyled';
import { GET_USERS } from '../../graphql/user/users';
import { GetUsers, GetUsersVariables } from '../../graphql/types';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

const { Search } = Input;

const columns = [
  {
    title: 'Name',
    dataIndex: 'fullName',
    sorter: false,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: false,
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    sorter: false,
  },
  {
    title: 'Phone number',
    dataIndex: 'phoneNumber',
    sorter: false,
  },
  {
    title: 'Group',
    dataIndex: 'group',
    sorter: false,
  },
  {
    title: 'Status',
    dataIndex: 'termStatus',
    sorter: false,
  },
  {
    title: 'Created at',
    dataIndex: 'createdAt',
    sorter: false,
  },
  {
    title: 'Action',
    key: 'operation',
    render: (row) => {
      return (
        <div>
          <Link to={'/users/' + (row._id) + '/edit'}>
            <Button className="btn-rectangle" type="primary" icon="edit" size="small" onClick={(e) => console.log(row._id)}/>
          </Link>
        </div>
      );
    },
  },
];

const { Content } = Layout;

// const text = 'Are you sure to delete this task?';
//
// function confirm() {
//   notification.open({
//     placement: 'bottomRight',
//     type: 'success',
//     message: 'Deleted',
//     description:
//       'Record has been deleted.',
//   });
// }

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

interface IEditProps extends FormComponentProps {
  match?: any;
}

const UserFormImpl = (props: IEditProps) => {
  const { params } = props.match;
  console.log(params.type && params.type);
  const [isLoading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const getUser = () => {
    return useQuery<GetUsers, GetUsersVariables>(GET_USERS, {
      fetchPolicy: 'network-only',
      variables: {
        query: query,
        limit: 30,
        termStatus: params.type && params.type || null
      },
    });
  };

  const search = (q) => {
    setQuery(q);
  };

  const { data, error, loading } = getUser();

  useEffect(() => {
    if (loading) {
      setLoading(true);
    }

    if (!loading) {
      setLoading(false);
    }
  }, [loading]);

  if (error) return <Content className="content">Error</Content>;
  return <Styled.Container>
    <Content className="content">
      <Breadcrumb>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="mt-10 mb-10">
        <Col span={6}>
          <Search
            placeholder="Enter name"
            enterButton="Search"
            size="large"
            onSearch={value => search(value)}
          />
        </Col>
      </Row>
      {isLoading ? <Skeleton loading={isLoading} paragraph={{ rows: 5 }}>
      </Skeleton> : <Table rowKey="_id" columns={columns} dataSource={data.cmsGetUsers} onChange={onChange}/>}
    </Content>
  </Styled.Container>;
};

const UserPage = Form.create()(UserFormImpl);
export default UserPage;
