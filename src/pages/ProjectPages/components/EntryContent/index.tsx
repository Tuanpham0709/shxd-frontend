import React from 'react';
import { Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { ColumnProps } from 'antd/lib/table';
import './style.module.less'
export const EditableContext = React.createContext({ form: {} });
const STATUS = {
  await: { color: '#E65A4D66', text: 'Chờ phê duyêt' },
  done: { color: ' #00B89466 ', text: 'Hoàn thành' },
  processing: { color: '#007BD766', text: 'Đang thực hiên ' },
};
const DATA = [
  {
    key: '0',
    code: 'NQ 307 NPCP',
    project: 'Cải tạo trụ sở UBND tỉnh Quảng Bình',
    namecustomer: `Nguyễn văn B`,
    manager: `Nguyễn Văn Quản`,
    startdate: `12/03/2020`,
    submitdate: `12/03/2020`,
    status: 'processing',
    note: `Đang thực hiện`,
  },
  {
    key: '1',
    code: 'NQ 307 NPCP',
    project: 'Cải tạo trụ sở UBND tỉnh Quảng Bình',
    namecustomer: `Nguyễn văn B`,
    manager: `Nguyễn Văn Quản`,
    startdate: `12/03/2020`,
    submitdate: `12/03/2020`,
    status: 'await',
    note: `chờ phê duyệt`,
  },
  {
    key: '2',
    code: 'NQ 307 NPCP',
    project: 'Cải tạo trụ sở UBND tỉnh Quảng Bình',
    namecustomer: `Nguyễn văn B`,
    manager: `Nguyễn Văn Quản`,
    startdate: `12/03/2020`,
    submitdate: `12/03/2020`,
    status: 'done',
    note: `Đã hoàn thành`,
  },
  {
    key: '3',
    code: 'NQ 307 NPCP',
    project: 'Cải tạo trụ sở UBND tỉnh Quảng Bình',
    namecustomer: `Nguyễn văn B`,
    manager: `Nguyễn Văn Quản`,
    startdate: `12/03/2020`,
    submitdate: `12/03/2020`,
    status: 'processing',
    note: `Đang thực hiện`,
  },
  {
    key: '4',
    code: 'NQ 307 NPCP',
    project: 'Cải tạo trụ sở UBND tỉnh Quảng Bình',
    namecustomer: `Nguyễn văn B`,
    manager: `Nguyễn Văn Quản`,
    startdate: `12/03/2020`,
    submitdate: `12/03/2020`,
    status: 'processing',
    note: `đang thực hiện`,
  },
  {
    key: '5',
    code: 'NQ 307 NPCP',
    project: 'Cải tạo trụ sở UBND tỉnh Quảng Bình',
    namecustomer: `Nguyễn văn B`,
    manager: `Nguyễn Văn Quản`,
    startdate: `12/03/2020`,
    submitdate: `12/03/2020`,
    status: 'processing',
    note: `đang thực hiện`,
  },
  {
    key: '6',
    code: 'NQ 307 NPCP',
    project: 'Cải tạo trụ sở UBND tỉnh Quảng Bình',
    namecustomer: `Nguyễn văn B`,
    manager: `Nguyễn Văn Quản`,
    startdate: `12/03/2020`,
    submitdate: `12/03/2020`,
    status: 'await',
    note: `chờ phê duyệt`,
  },
  {
    key: '7',
    code: 'NQ 307 NPCP',
    project: 'Cải tạo trụ sở UBND tỉnh Quảng Bình',
    namecustomer: `Nguyễn văn B`,
    manager: `Nguyễn Văn Quản`,
    startdate: `12/03/2020`,
    submitdate: `12/03/2020`,
    status: 'done',
    note: `Đã hoàn thành`,
  },
  {
    key: '8',
    code: 'NQ 307 NPCP',
    project: 'Cải tạo trụ sở UBND tỉnh Quảng Bình',
    namecustomer: `Nguyễn văn B`,
    manager: `Nguyễn Văn Quản`,
    startdate: `12/03/2020`,
    submitdate: `12/03/2020`,
    status: 'processing',
    note: `Đã hoàn thành`,
  },
  {
    key: '9',
    code: 'NQ 307 NPCP',
    project: 'Cải tạo trụ sở UBND tỉnh Quảng Bình',
    namecustomer: `Nguyễn văn B`,
    manager: `Nguyễn Văn Quản`,
    startdate: `12/03/2020`,
    submitdate: `12/03/2020`,
    status: 'await',
    note: `Đã hoàn thành`,
  },
  {
    key: '10',
    code: 'NQ 307 NPCP',
    project: 'Cải tạo trụ sở UBND tỉnh Quảng Bình',
    namecustomer: `Nguyễn văn B`,
    manager: `Nguyễn Văn Quản`,
    startdate: `12/03/2020`,
    submitdate: `12/03/2020`,
    status: 'done',
    note: `Đã hoàn thành`,
  },
  {
    key: '3',
    code: 'NQ 307 NPCP',
    project: 'Cải tạo trụ sở UBND tỉnh Quảng Bình',
    namecustomer: `Nguyễn văn B`,
    manager: `Nguyễn Văn Quản`,
    startdate: `12/03/2020`,
    submitdate: `12/03/2020`,
    status: 'processing',
    note: `Đã hoàn thành`,
  },
];
const COLUMNS = [
  {
    title: 'Mã công trình',
    dataIndex: 'code',
    width: "6%",
  },
  {
    title: 'Tên công trình',
    dataIndex: 'project',
    width: "10%",
  },
  {
    title: 'Tên khách hàng',
    dataIndex: 'namecustomer',
    width: "9%",
  },
  {
    title: 'Người thực hiện',
    dataIndex: 'confectioner',
    width: "9%",
  },
  {
    title: 'Người phê duyệt',
    dataIndex: 'manager',
    width: "9%",
  },
  {
    title: 'Ngày bắt đầu lập Hs',
    dataIndex: 'startdate',
    width: "9%",
  },
  {
    title: 'Ngày gửi duyệt',
    dataIndex: 'submitdate',
    width: "9%",
  },
  {
    title: 'Tình trạng',
    dataIndex: 'status',
    width: "9%",
    render: status => {
      const sta = STATUS[status];
      return (
        <span>
          <Tag style={{ width: '100%', textAlign: "center" }} color={sta.color}>{sta.text}</Tag>
        </span>
      );
    },
  },
  {
    title: 'Số hóa tài liệu',
    width: "9%",
    render: (text: string, record: any) => {
      return <Link to="/project/detail" style={{ textDecoration: "underline", color: "#333132" }}>Xem chi tiết</Link>;
    },
  },
  {
    title: 'Hồ sơ tài liệu còn thiếu hoặc tồn tại',
    width: "9%",
    render: (text: string, record: any) => {
      return <Link to="/project/detail" style={{ textDecoration: "underline", color: "#333132" }}>Xem chi tiết</Link>;
    },
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
    width: "9%",
  },
];
// interface DataObject {
//   key: string;
//   code: string;
//   project: string;
//   namecustomer: string;
//   manager: string;
//   startdate: string;
//   submitdate: string;
//   status: string;
//   note: string;
// }
// interface State {
//   data?: Array<DataObject>;
//   editingKey?: string;
//   deleteKey?: string;
// }
interface ColumnPropsEditable<T> extends ColumnProps<T> {
  editable?: boolean;
}
// const initialState: State = {
//   data: DATA,
//   editingKey: '',
//   deleteKey: '',
// };
const EditableTable: React.FC = () => {
  let format_col: Array<ColumnPropsEditable<any>>;
  // const [state, setState] = useState(initialState);

  format_col = COLUMNS.map((col: any) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
    };
  });

  return <Table dataSource={DATA} columns={format_col} />;
};
export default EditableTable;
