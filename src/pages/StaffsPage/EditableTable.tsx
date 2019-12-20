import React, { useState } from 'react';
import { Popconfirm, Table, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { ColumnProps } from 'antd/lib/table';

export const EditableContext = React.createContext({ form: {} });

interface DataSource {
  key: string;
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  userType: string;
  startDate: string;
  updateDate: string;
  username: string;
  password: string;
}
const dataSource: Array<DataSource> = [
  {
    key: '1',
    id: '00001',
    name: 'Trương Ánh Tuyết',
    phone: '0989975234',
    email: `nam.nguyen@tomochain.com`,
    address: 'Số nhà 089, đường Nhạc Sơn, Phường Kim Tân, Thành phố Lào Cai, Lào Cai',
    userType: 'Quản lý',
    startDate: '22/10/2019',
    updateDate: '28/12/2019',
    username: 'truongtuyetanh',
    password: 'tuyenanh0935',
  },
  {
    key: '2',
    id: '00002',
    name: 'Nguyên Quốc Oai',
    phone: '0382452461',
    email: `quoc.nguyen@gmail.com`,
    address: 'Số nhà 23, An Trạch,phường Cát Linh,quận Đống Đa,thành phố Hà Nội',
    userType: 'Quản lý',
    startDate: '24/11/2019',
    updateDate: '30/12/2019',
    username: 'truongtuyetanh',
    password: 'tuyenanh0935',
  },
  {
    key: '3',
    id: '00003',
    name: 'Hà Quang Dự',
    phone: '0987734856',
    email: 'du.quang@gmail.com',
    address: 'Số nhà 29, Hàm Long, Phường Kim Tân, thành phố Bắc Cạn',
    userType: 'Nhân viên',
    startDate: '13/8/2019',
    updateDate: '30/12/2019',
    username: 'truongtuyetanh',
    password: 'tuyenanh0935',
  },
  {
    key: '4',
    id: '00004',
    name: 'Nguyễn Huy Hải',
    phone: '0989974256',
    email: `hai.huy@gmail.com`,
    address: 'Số 45A, phố Khâm Thiên, quận Đống Đa, thành phố Hà Nội',
    userType: 'Nhân viên',
    startDate: '03/82018',
    updateDate: '28/12/2019',
    username: 'truongtuyetanh',
    password: 'tuyenanh0935',
  },
  {
    key: '5',
    id: '00006',
    name: 'Hoàng Thuý Kiều',
    phone: '0987758647',
    email: `thuykieu34@gmail.com`,
    address: 'Số nhà 069, đường Nhạc Mẫu, phường Hà Tân, thành phố Đắk Lak',
    userType: 'Nhân viên',
    startDate: '05/20/2017',
    updateDate: '20/12/2019',
    username: 'truongtuyetanh',
    password: 'tuyenanh0935',
  },
  {
    key: '6',
    id: '00006',
    name: 'Hoàng Thuý Kiều',
    phone: '0987758647',
    email: `thuykieu34@gmail.com`,
    address: 'Số nhà 069, đường Nhạc Mẫu, phường Hà Tân, thành phố Đắk Lak',
    userType: 'Nhân viên',
    startDate: '05/20/2017',
    updateDate: '20/12/2019',
    username: 'truongtuyetanh',
    password: 'tuyenanh0935',
  },
  {
    key: '7',
    id: '00007',
    name: 'Nguyễn Quốc Việt',
    phone: '0985567849',
    email: `quocviet@gmail.com`,
    address: 'Số nhà 5, ngõ 419, phường Bạch Mai, quận Ha Bà Trương, thành phố Hà Nội',
    userType: 'Quản lý',
    startDate: '05/09/2018',
    updateDate: '20/12/2019',
    username: 'truongtuyetanh',
    password: 'tuyenanh0935',
  },
  {
    key: '8',
    id: '00008',
    name: 'Trịnh Quang Hào',
    phone: '0987332356',
    email: `quang.hao@gmail.com`,
    address: 'Số nhà 23, phường Nhân Hà, thành phố Hải Dương',
    userType: 'Nhân viên',
    startDate: '05/22/2018',
    updateDate: '20/12/2019',
    username: 'truongtuyetanh',
    password: 'tuyenanh0935',
  },
  {
    key: '9',
    id: '00009',
    name: 'Nguyễn Văn Quang',
    phone: '0344234175',
    email: `vanquang245@gmail.com`,
    address: 'Số nhà 35, phường Hải Hậu, quận Từ Liêm, thành phố Hà Nội',
    userType: 'Nhân viên',
    startDate: '05/20/2017',
    updateDate: '20/12/2019',
    username: 'truongtuyetanh',
    password: 'tuyenanh0935',
  },
  {
    key: '10',
    id: '00010',
    name: 'Phạm Hữu Thành',
    phone: '0325662565',
    email: `thanh245@gmail.com`,
    address: 'Số nhà 069, đường Nhạc Mẫu, phường Hà Tân, thành phố Đắk Lak',
    userType: 'Nhân viên',
    startDate: '05/20/2017',
    updateDate: '20/12/2019',
    username: 'truongtuyetanh',
    password: 'tuyenanh0935',
  },
  {
    key: '11',
    id: '00011',
    name: 'Trương Ánh Tuyết',
    phone: '0989975234',
    email: `nam.nguyen@tomochain.com`,
    address: 'Số nhà 089, đường Nhạc Sơn, Phường Kim Tân, Thành phố Lào Cai, Lào Cai',
    userType: 'Nhân viên',
    startDate: '22/10/2019',
    updateDate: '28/12/2019',
    username: 'truongtuyetanh',
    password: 'tuyenanh0935',
  },
  {
    key: '12',
    id: '00012',
    name: 'Nguyên Quốc Oai',
    phone: '0382452461',
    email: `quoc.nguyen@gmail.com`,
    address: 'Số nhà 23, An Trạch,phường Cát Linh,quận Đống Đa,thành phố Hà Nội',
    userType: 'Nhân viên',
    startDate: '24/11/2019',
    updateDate: '30/12/2019',
    username: 'truongtuyetanh',
    password: 'tuyenanh0935',
  },
  {
    key: '13',
    id: '00013',
    name: 'Hà Quang Dự',
    phone: '0987734856',
    email: 'du.quang@gmail.com',
    address: 'Số nhà 29, Hàm Long, Phường Kim Tân, thành phố Bắc Cạn',
    userType: 'Nhân viên',
    startDate: '13/8/2019',
    updateDate: '30/12/2019',
    username: 'truongtuyetanh',
    password: 'tuyenanh0935',
  },
  {
    key: '14',
    id: '00014',
    name: 'Nguyễn Huy Hải',
    phone: '0989974256',
    email: `hai.huy@gmail.com`,
    address: 'Số 45A, phố Khâm Thiên, quận Đống Đa, thành phố Hà Nội',
    userType: 'Nhân viên',
    startDate: '03/82018',
    updateDate: '28/12/2019',
    username: 'truongtuyetanh',
    password: 'tuyenanh0935',
  },
  {
    key: '15',
    id: '00015',
    name: 'Hoàng Thuý Kiều',
    phone: '0987758647',
    email: `thuykieu34@gmail.com`,
    address: 'Số nhà 069, đường Nhạc Mẫu, phường Hà Tân, thành phố Đắk Lak',
    userType: 'Nhân viên',
    startDate: '05/20/2017',
    updateDate: '20/12/2019',
    username: 'truongtuyetanh',
    password: 'tuyenanh0935',
  },
];
interface State {
  data?: Array<DataSource>;
  editingKey?: string;
  deleteKey?: string;
}
interface ColumnPropsEditable<T> extends ColumnProps<T> {
  editable?: boolean;
}
const COLUMN_PROPS: Array<ColumnPropsEditable<any>> = [
  {
    title: 'ID',
    dataIndex: 'id',
    editable: true,
  },
  {
    title: 'Tên nhân viên',
    dataIndex: 'name',
    editable: true,
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    editable: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    editable: true,
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    editable: true,
  },
  {
    title: 'Loại người dùng',
    dataIndex: 'userType',
    editable: true,
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'startDate',
    editable: true,
  },
  {
    title: 'Ngày cập nhật',
    dataIndex: 'updateDate',
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
const initialState: State = {
  data: dataSource,
  editingKey: '',
  deleteKey: '',
};
const EditableTable = () => {
  const [state, setState] = useState(initialState);
  const linkToComponent = (text: string, record) => (
    <div>
      <Link
        to={{
          pathname: '/staffs/edit',
          state: {
            item: dataSource.filter((item, index) => record.key === item.key),
          },
        }}
      >
        <Icon type="edit" />
      </Link>
    </div>
  );
  const deleteComponent = (text: string, record: any) => (
    <div>
      <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
        <Icon type="delete" />
      </Popconfirm>
    </div>
  );
  const handleDelete = key => {
    let newData = [...state.data].filter(item => item.key !== key);
    setState({ data: newData });
  };
  const handleColumnProps = COLUMN_PROPS.map((item: any, index: number) => {
    const columnLength = COLUMN_PROPS.length;
    if (index === columnLength - 1) {
      return { ...item, render: deleteComponent };
    } else if (index === columnLength - 2) {
      return { ...item, render: linkToComponent };
    }
    return { ...item };
  });
  return <Table bordered dataSource={state.data} columns={handleColumnProps} />;
};
export default EditableTable;
