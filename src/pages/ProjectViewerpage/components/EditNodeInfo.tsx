import React, { forwardRef, useImperativeHandle } from 'react';
import { Form, Input, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

interface NodeInfo {
    documentName: string;
    agencyIssued: string;
    issuedDate: string;

}
interface IProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    onCreate: () => any;
    nodeInfo: NodeInfo
}

type Ref = FormComponentProps;

// eslint-disable-next-line
const EditNodeInfo = forwardRef<Ref, IProps>(({ form, onCreate, onCancel, visible, nodeInfo }: IProps, ref) => {
    useImperativeHandle(ref, () => ({ form }));
    // console.log("data state", dataCmsUserSearch);
    const { getFieldDecorator } = form;
    // useEffect(() => {
    //     form.setFieldsValue({ documentName: nodeInfo.documentName, issuedDate: nodeInfo.issuedDate, agencyIssued: nodeInfo.agencyIssued })
    // }, [nodeInfo])
    return (
        <Modal
            visible={visible}
            title="Sửa thông tin"
            okText="Đồng ý"
            cancelText="Huỷ bỏ"
            onCancel={onCancel}
            onOk={onCreate}
        >
            <Form>
                <Form.Item label="Tên văn bản" hasFeedback>
                    {getFieldDecorator('documentName', {
                        initialValue: nodeInfo.documentName
                    })(
                        <Input
                        />,
                    )}
                </Form.Item>
                <Form.Item label="Ký hiệu, ngày tháng năm ban hành" hasFeedback>
                    {getFieldDecorator('issuedDate', {
                        initialValue: nodeInfo.issuedDate
                    })(
                        <Input
                        />,
                    )}
                </Form.Item>
                <Form.Item label="Cơ quan ban hành" hasFeedback>
                    {getFieldDecorator('agencyIssued', {
                        initialValue: nodeInfo.agencyIssued
                    })(
                        <Input
                        />,
                    )}
                </Form.Item>
            </Form>
        </Modal>
    );
}

)
const EditFrom = Form.create<IProps>({})(EditNodeInfo);
export default EditFrom;
