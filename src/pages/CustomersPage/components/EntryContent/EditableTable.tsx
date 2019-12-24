import React from 'react';
import { Popconfirm, Table } from 'antd';
import { Link } from 'react-router-dom'
import { ColumnProps } from 'antd/lib/table';
import styles from './style.module.less'

export const EditableContext = React.createContext({ form: {} });
const data: any[] = [];
for (let i = 0; i < 50; i++) {
    data.push({
        key: i.toString(),
        code: `${i + 1}`,
        name: `Tổng Công ty Kinh doanh và đầu tư vốn nhà nước ${i + 1}`,
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

interface State {
    data: any;
    editingKey: any;
    deleteKey: any;
}
interface ColumnPropsEditable<T> extends ColumnProps<T> {
    editable?: boolean;
}

export default class EditableTable extends React.Component<{}, State> {
    private columns: Array<ColumnPropsEditable<any>>;
    constructor(props: {}) {
        super(props);
        this.state = { data, editingKey: '', deleteKey: '' };
        this.columns = [
            {
                title: 'Mã KH',
                dataIndex: 'code',
                width: '5%',
                editable: true
            },
            {
                title: 'Tên khách hàng',
                dataIndex: 'name',
                width: '10%',
                editable: true
            },
            {
                title: 'Số điện thoại',
                dataIndex: 'phone',
                width: '10%',
                editable: true
            },
            {
                title: 'Email',
                dataIndex: 'email',
                width: '10%',
                editable: true
            },
            {
                title: 'Địa chỉ',
                dataIndex: 'address',
                editable: true
            },
            {
                title: 'Phòng/ CN/ VP QL',
                dataIndex: 'room',
                width: '7%',
                editable: true
            },
            {
                title: 'Giám đốc',
                dataIndex: 'manager',
                width: '10%',
                editable: true
            },
            {
                title: 'Chủ tịch',
                dataIndex: 'chairman',
                width: '10%',
                editable: true
            },
            {
                title: 'Kế toán trưởng',
                dataIndex: 'accountant',
                width: '10%',
                editable: true
            },
            {
                title: '',
                dataIndex: 'edit',
                width: '3%',
                render: (text: string, record: any) => {
                    return (
                        <div>
                            <Link className={styles.colorBlue} to="/customers/edit"><i className="icon-edit"></i></Link>
                        </div>
                    );
                }
            },
            {
                title: '',
                dataIndex: 'delete',
                width: '3%',
                render: (text: string, record: any) => {
                    return (
                        <div>
                            <Popconfirm className={styles.colorRed} title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                                <i className="icon-delete"></i>
                            </Popconfirm>
                        </div>
                    );
                }
            }
        ];
    }

    public handleDelete = key => {
        let data = [...this.state.data];
        this.setState({ data: data.filter(item => item.key !== key) });
    }

    public render() {

        const columns = this.columns.map((col: any) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col
            };
        });

        return (
            <Table
                // bordered
                dataSource={this.state.data}
                columns={columns}
            />
        );
    }
}