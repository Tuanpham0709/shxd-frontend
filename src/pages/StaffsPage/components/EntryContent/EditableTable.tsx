import React from 'react';
import { Popconfirm, Table, Icon } from 'antd';
import { Link } from 'react-router-dom'
import { ColumnProps } from 'antd/lib/table';

export const EditableContext = React.createContext({ form: {} });
const data: any[] = [];
for (let i = 0; i < 50; i++) {
    data.push({
        key: i.toString(),
        id: `${i + 1}`,
        name: `Trương Ánh Tuyết ${i + 1}`,
        phone: `(+84)3 123456${i}`,
        email: `nam.nguyen-${i + 1}@tomochain.com`,
        address: `Số nhà 089, đường Nhạc Sơn, Phường Kim Tân, Thành phố Lào Cai, Lào Cai ${i + 1}`,
        usertype: `Quản lý ${i + 1}`,
        startdate: `22/10/2019 ${i + 1}`,
        updatedate: `28/08/2019 ${i + 1}`,
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
                title: 'ID',
                dataIndex: 'id',
                editable: true
            },
            {
                title: 'Tên nhân viên',
                dataIndex: 'name',
                editable: true
            },
            {
                title: 'Số điện thoại',
                dataIndex: 'phone',
                editable: true
            },
            {
                title: 'Email',
                dataIndex: 'email',
                editable: true
            },
            {
                title: 'Địa chỉ',
                dataIndex: 'address',
                editable: true
            },
            {
                title: 'Loại người dùng',
                dataIndex: 'usertype',
                editable: true
            },
            {
                title: 'Ngày tạo',
                dataIndex: 'startdate',
                editable: true
            },
            {
                title: 'Ngày cập nhật',
                dataIndex: 'updatedate',
                editable: true
            },
            {
                title: '',
                dataIndex: 'edit',
                render: (text: string, record: any) => {
                    return (
                        <div>
                            <Link to="/staffs/edit"><Icon type="edit" /></Link>
                        </div>
                    );
                }
            },
            {
                title: '',
                dataIndex: 'delete',
                render: (text: string, record: any) => {
                    return (
                        <div>
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                                <Icon type="delete" />
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