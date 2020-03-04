import { ColumnProps } from 'antd/lib/table';
import { GetCMSUser_cmsGetUsers_users, GetPartners_getPartners_partners } from '../../graphql/types'
interface ColumnPropsEditable<T> extends ColumnProps<T> {
    editable?: boolean;
}
export const partnerColumnProps: Array<ColumnPropsEditable<GetPartners_getPartners_partners>> = [
    {
        title: 'Mã KH',
        dataIndex: 'partnerCode',
        editable: true,
    },
    {
        title: 'Tên khách hàng',
        dataIndex: 'name',
        editable: true,
        width: "10%",
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        width: "10%",
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
        width: "15%",
        editable: true,
    },
    {
        title: 'Phòng/ CN/ VP QL',
        dataIndex: 'departmentName',
        width: "7%",
        editable: true,
    },
    {
        title: 'Giám đốc',
        dataIndex: 'ceoName',
        width: "11%",
        editable: true,
    },
    {
        title: 'Chủ tịch',
        dataIndex: 'chairmanName',
        width: "11%",
        editable: true,
    },
    {
        title: 'Kế toán trưởng',
        dataIndex: 'accountantName',
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
export const staffColumnProp: Array<ColumnPropsEditable<GetCMSUser_cmsGetUsers_users>> = [
    {
        title: 'ID',
        dataIndex: 'id',
        editable: true,
    },
    {
        title: 'Tên nhân viên',
        dataIndex: "fullName",
        editable: true,
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phoneNumber',
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
        dataIndex: 'group',
        editable: true,
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        editable: true,
    },
    {
        title: 'Ngày cập nhật',
        dataIndex: 'updatedAt',
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

]
export const documentColumnProps = [
    {
        title: 'Mã công trình',
        dataIndex: 'projectCode',
        width: "6%",
    },
    {
        title: 'Tên công trình',
        dataIndex: 'projectName',
        width: "10%",
    },
    {
        title: 'Tên khách hàng',
        dataIndex: 'partnerName',
        width: "9%",
    },
    {
        title: 'Người thực hiện',
        dataIndex: 'implementer',
        width: "9%",
    },
    {
        title: 'Người phê duyệt',
        dataIndex: 'reviewer',
        width: "9%",
    },
    {
        title: 'Ngày bắt đầu lập Hs',
        dataIndex: 'createdAt',
        width: "9%",
    },
    {
        title: 'Ngày gửi duyệt',
        dataIndex: 'approvalDate',
        width: "9%",
    },
    {
        title: 'Tình trạng',
        dataIndex: 'status',
        width: "9%",
    },
    {
        title: 'Số hóa tài liệu',
        width: "9%",
    },
    {
        title: 'Hồ sơ tài liệu còn thiếu hoặc tồn tại',
        width: "9%",
    },
    {
        title: 'Ghi chú',
        dataIndex: 'note',
        width: "9%",
    },
];