import React from 'react';
import { Popconfirm, Table } from 'antd';
import { Link } from 'react-router-dom';
// import styles from './style.module.less';
import { staffColumnProp } from '../../../DefinePropsTable'
import { GetCMSUser_cmsGetUsers_users, RemoveCMSUser, RemoveCMSUserVariables } from '../../../../graphql/types'
import { useMutation } from 'react-apollo';
import { REMOVE_CMS_USER } from '../../../../graphql/cmsUser/removeCMSUser';
import { ToastSuccess, ToastError } from '../../../../components/Toast';
export const EditableContext = React.createContext({ form: {} });
interface IProps {
  data: GetCMSUser_cmsGetUsers_users[],
  onRefreshData: () => void;
}
const useRemoveCMSUser = () => {
  const [removeCMSUser, { loading }] = useMutation<RemoveCMSUser, RemoveCMSUserVariables>(REMOVE_CMS_USER);
  return { removeCMSUser, loading };
}
const EditableTable: React.FC<IProps> = ({ data, onRefreshData }) => {
  const { removeCMSUser } = useRemoveCMSUser()
  const linkToComponent = (text: string, record) => (
    <div>
      <Link
        to={{
          pathname: '/staffs/edit',
          state: {
            staff: record
          },
        }}
      >
        <i style={{ color: '#007BD7' }} className="icon-edit" />
      </Link>
    </div>
  );
  const deleteComponent = (text: string, record: GetCMSUser_cmsGetUsers_users) => (
    <div>
      <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
        <i style={{ color: '#FF4D4F' }} className="icon-delete" />
      </Popconfirm>
    </div>
  );
  const handleDelete = userId => {
    removeCMSUser({ variables: { id: userId } }).then(() => {
      onRefreshData && onRefreshData();
      ToastSuccess({ message: "Xoá người dùng thành công" });
    }).catch(() => {
      ToastError({ message: "Có lỗi xảy ra, vui lòng thử lại sau !" })
    })
  };

  const handleColumnProps = staffColumnProp.map((item: any, index: number) => {
    const columnLength = staffColumnProp.length;
    if (index === columnLength - 1) {
      return { ...item, render: deleteComponent };
    } else if (index === columnLength - 2) {
      return { ...item, render: linkToComponent };
    }
    return { ...item };
  });
  return <Table dataSource={data} columns={handleColumnProps} />;
};
export default EditableTable;
