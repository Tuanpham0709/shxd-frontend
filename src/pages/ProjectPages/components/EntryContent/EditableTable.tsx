import React from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom'
import { ColumnProps } from 'antd/lib/table';

export const EditableContext = React.createContext({ form: {} });
const data: any[] = [];
for (let i = 0; i < 50; i++) {
    data.push({
        key: i.toString(),
        code: `NQ 307 NPCP${i + 1}`,
        project: `Cải tạo trụ sở UBND tỉnh Quảng Bình${i + 1}`,
        namecustomer: `Nguyễn Văn A${i + 1}`,
        manager: `Nguyen B${i + 1}`,
        startdate: `12/03/201${i + 1}`,
        submitdate: `12/03/203${i + 1}`,
        status: `Đang thực hiện ${i + 1}`,
        note: `Đã hoàn thành`,
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
                title: 'Mã công trình',
                dataIndex: 'code',
            },
            {
                title: 'Tên công trình',
                dataIndex: 'project',
            },
            {
                title: 'Tên khách hàng',
                dataIndex: 'namecustomer',
            },
            {
                title: 'Người thực hiện',
                dataIndex: 'confectioner',
            },
            {
                title: 'Người phê duyệt',
                dataIndex: 'manager',
            },
            {
                title: 'Ngày bắt đầu lập Hs',
                dataIndex: 'startdate',
            },
            {
                title: 'Ngày gửi duyệt',
                dataIndex: 'submitdate',
            },
            {
                title: 'Tình trạng',
                dataIndex: 'status',
            },
            {
                title: 'Số hóa tài liệu',
                render: (text: string, record: any) => {
                    return (
                        <Link to="/projects/detail">Xem chi tiết</Link>
                    );
                }
            },
            {
                title: 'Hồ sơ tài liệu còn thiếu hoặc tồn tại',
                render: (text: string, record: any) => {
                    return (
                        <Link to="/projects/detail">Xem chi tiết</Link>
                    );
                }
            },
            {
                title: 'Ghi chú',
                dataIndex: 'note',
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
                bordered
                dataSource={this.state.data}
                columns={columns}
            />
        );
    }
}