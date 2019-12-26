import React, { useState } from 'react';
import { Popconfirm, Table } from 'antd';
import { Link } from 'react-router-dom';
import { ColumnProps } from 'antd/lib/table';
// import styles from './style.module.less';

export const EditableContext = React.createContext({ form: {} });
const DATA: DataObject[] = [];
for (let i = 0; i < 50; i++) {
  DATA.push({
    key: i.toString(),
    code: `${i + 1}`,
    name: `Chris ${i + 1}`,
    phone: `(+84)3 123456${i}`,
    email: `xiemnguyen${i + 1}@tomochain.com`,
    address: `Số 97, Trần Quốc Toản, Quận Hoàn Kiếm, Hà Nội ${i + 1}`,
    room: `XD${i + 1}`,
    manager: `Trần Văn Thi ${i + 1}`,
    chairman: `Nguyễn Ngọc Quang ${i + 1}`,
    accountant: `Nguyễn Thị Hà ${i + 1}`,
    operation: ``,
  });
}

interface DataObject {
  key: string;
  code: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  room: string;
  manager: string;
  chairman: string;
  accountant: string;
  operation: ``;
}
interface State {
  data?: Array<DataObject>;
  editingKey?: string;
  deleteKey?: string;
}
interface ColumnPropsEditable<T> extends ColumnProps<T> {
  editable?: boolean;
}
const initialState: State = {
  data: DATA,
  editingKey: '',
  deleteKey: '',
};
const columnsProps: Array<ColumnPropsEditable<any>> = [
  {
    title: 'Mã KH',
    dataIndex: 'code',
    editable: true,
  },
  {
    title: 'Tên khách hàng',
    dataIndex: 'name',
    editable: true,
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    // width: '40%',
    editable: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    // width: '40%',
    editable: true,
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    // width: '40%',
    editable: true,
  },
  {
    title: 'Phòng/ CN/ VP QL',
    dataIndex: 'room',
    // width: '40%',
    editable: true,
  },
  {
    title: 'Giám đốc',
    dataIndex: 'manager',
    // width: '40%',
    editable: true,
  },
  {
    title: 'Chủ tịch',
    dataIndex: 'chairman',
    // width: '40%',
    editable: true,
  },
  {
    title: 'Kế toán trưởng',
    dataIndex: 'accountant',
    // width: '40%',
    editable: true,
  },
  {
    title: '',
    dataIndex: 'edit',
  },
  {
    title: '',
    dataIndex: 'delete',
  },
];
const EditableTable = () => {
  const [state, setState] = useState(initialState);

  const handleDelete = key => {
    let newData = [...state.data].filter(item => item.key !== key);
    setState({ data: newData });
  };
  const linkToComponent = () => (
    <div>
      <Link to="/customers/edit">
        <i style={{ color: '#007BD7' }} className="icon-edit" />
      </Link>
    </div>
  );
  const deleteComponent = (text: string, record: any) => (
    <div>
      <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
        <i style={{ color: '#FF4D4F' }} className="icon-delete" />
      </Popconfirm>
    </div>
  );
  const handleColomnProps = columnsProps.map((item, index) => {
    if (index == columnsProps.length - 1) {
      return { ...item, render: deleteComponent };
    } else if (index == columnsProps.length - 2) {
      return { ...item, render: linkToComponent };
    }
    return { ...item };
  });

  return <Table bordered dataSource={state.data} columns={handleColomnProps} />;
};
export default EditableTable;
