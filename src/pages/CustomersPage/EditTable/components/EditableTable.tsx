import React, { useState } from 'react';
import { Popconfirm, Table } from 'antd';
import { Link } from 'react-router-dom';
// import styles from './style.module.less';
import { partnerColumnProps } from '../../../DefinePropsTable'
import { useMutation } from '@apollo/react-hooks';
import { REMOVE_PARTNER } from '../../../../graphql/partner/removePartner';
import { DeletePartner, DeletePartnerVariables, GetPartners_getPartners_partners } from '../../../../graphql/types'
import { ToastError } from '../../../../components/Toast'
interface State {
  data?: Array<GetPartners_getPartners_partners>;
  editingKey?: string;
  deleteKey?: string;
}
interface IProps {
  data: GetPartners_getPartners_partners[],
  onRefreshData: () => void;
}
const mutationRemovePartner = () => {
  const [removePartner, { loading }] = useMutation<DeletePartner, DeletePartnerVariables>(REMOVE_PARTNER);
  return { removePartner, loading };
}
const EditableTable: React.FC<IProps> = ({ data, onRefreshData }) => {
  const initialState: State = {
    data,
  }
  const [state, setState] = useState(initialState);
  const { removePartner } = mutationRemovePartner();
  const handleDelete = id => {
    if (id) {
      removePartner({ variables: { id } }).then(() => {
        onRefreshData && onRefreshData();
      }).catch(() => {
        ToastError({ message: "Có lỗi xảy ra, vui lòng thử lại sau!" })
      })
    }
    let newData = [...state.data].filter(item => item._id !== id);
    setState({ data: newData });
  };
  const linkToComponent = (_, record) => (
    <div>
      <Link to={{
        pathname: "/customers/edit",
        state: {
          partner: record
        }
      }}>
        <i style={{ color: '#007BD7' }} className="icon-edit" />
      </Link>
    </div>
  );
  const deleteComponent = (text: string, record: any) => (
    <div>
      <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
        <i style={{ color: '#FF4D4F' }} className="icon-delete" />
      </Popconfirm>
    </div>
  );
  const handleColumnProps = partnerColumnProps.map((item, index) => {
    if (index == partnerColumnProps.length - 1) {
      return { ...item, render: deleteComponent };
    } else if (index == partnerColumnProps.length - 2) {
      return { ...item, render: linkToComponent };
    }
    return { ...item };
  });

  return <Table dataSource={data} rowKey={record => record._id} columns={handleColumnProps} />;
};
export default EditableTable;
