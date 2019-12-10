import { Popconfirm, Table, Icon } from 'antd';
import React from 'react';
import { EditableCell } from './EditableCell';
import { EditableFormRow } from './EditableRow';
import { ColumnProps } from 'antd/lib/table';

export const EditableContext = React.createContext({ form: {} });
const data: any[] = [];
for (let i = 0; i < 50; i++) {
    data.push({
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
                // width: '25%',
                editable: true
            },
            {
                title: 'Tên khách hàng',
                dataIndex: 'name',
                // width: '15%',
                editable: true
            },
            {
                title: 'Số điện thoại',
                dataIndex: 'phone',
                // width: '40%',
                editable: true
            },
            {
                title: 'Email',
                dataIndex: 'email',
                // width: '40%',
                editable: true
            },
            {
                title: 'Địa chỉ',
                dataIndex: 'address',
                // width: '40%',
                editable: true
            },
            {
                title: 'Phòng/ CN/ VP QL',
                dataIndex: 'room',
                // width: '40%',
                editable: true
            },
            {
                title: 'Giám đốc',
                dataIndex: 'manager',
                // width: '40%',
                editable: true
            },
            {
                title: 'Chủ tịch',
                dataIndex: 'chairman',
                // width: '40%',
                editable: true
            },
            {
                title: 'Kế toán trưởng',
                dataIndex: 'accountant',
                // width: '40%',
                editable: true
            },
            {
                title: '',
                dataIndex: 'operation',
                render: (text: string, record: any) => {
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {editable ? (
                                <span>
                                    <EditableContext.Consumer>
                                        {form => (
                                            <a
                                                href="javascript:;"
                                                onClick={() => this.save(form, record.key)}
                                                style={{ marginRight: 8 }}
                                                >
                                                Save
                                            </a>
                                        )}
                                    </EditableContext.Consumer>
                                    <Popconfirm
                                        title="Sure to cancel?"
                                        onConfirm={() => this.cancel()}
                                        >
                                        <a>Cancel</a>
                                    </Popconfirm>
                                </span>
                            ):(
                                <div>
                                    <a onClick={() => this.edit(record.key)}><Icon type="edit" /></a>
                                    <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                                        <Icon type="delete" />
                                    </Popconfirm>
                                </div>
                            )}
                        </div>
                    );
                }
            }
        ];
    }

    public isEditing = (record: any) => record.key === this.state.editingKey;

    public cancel = () => {
        this.setState({ editingKey: '' });
    }

    public save(form: any, key: any) {
        form.validateFields((error: any, row: any) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row
                });
                this.setState({ data: newData, editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
        });
    }

    public edit(key: any) {
        this.setState({ editingKey: key });
    }

    public handleDelete = key => {
        let data = [...this.state.data];
        this.setState({ data: data.filter(item => item.key !== key) });
    }

    public render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell
            }
        };

        const columns = this.columns.map((col: any) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: (record: any) => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record)
                })
            };
        });

        return (
            <Table
                components={components}
                bordered
                dataSource={this.state.data}
                columns={columns}
            // rowClassName="editable-row"
            />
        );
    }
}