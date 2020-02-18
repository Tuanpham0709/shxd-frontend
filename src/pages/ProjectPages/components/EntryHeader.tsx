import React, { useState, createRef, useEffect } from 'react';
import { Icon, Col, Row } from 'antd';
import CreateFileModal from './FormCreateProject/CreateFileModal';
import styles from '../style.module.less';
import { FormComponentProps } from 'antd/lib/form';
import { CreateDocument, CreateDocumentVariables } from '../../../graphql/types';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_DOCUMENT } from '../../../graphql/document/createDocument'
import { ToastSuccess } from '../../../components/Toast';
const initVisible: boolean = false;
export enum CreateDocumentResponse {
  success = "success",
  error = "error"
}
const useCreateDocument = () => {
  const [createDocument, { loading }] = useMutation<CreateDocument, CreateDocumentVariables>(CREATE_DOCUMENT);
  return {
    createDocument,
    loading
  }
}
const useStates = () => {
  const [visible, setVisible] = useState(initVisible);
  const [reviewerId, setReviewerId] = useState("");
  const [implementerId, setImplementerId] = useState("");
  return { visible, setVisible, reviewerId, setReviewerId, implementerId, setImplementerId }
}
interface IProps {
  visibleModal: boolean;
  onHideModal: () => void;
  onRefreshQuery: () => void;
}
const CollectionsPage: React.FC<IProps> = ({ visibleModal, onHideModal, onRefreshQuery }) => {
  const { visible, setVisible, reviewerId, setReviewerId, implementerId, setImplementerId } = useStates();
  const formRef = createRef<FormComponentProps>();
  const { createDocument, loading } = useCreateDocument();
  // const { createDocument, loading } = useCreateDocument();
  const onShowModal = () => {
    setVisible(!visible)
  }
  useEffect(() => {
    if (visibleModal === true) {
      onShowModal();
    }
    if (!visible && visibleModal === true) {
      onHideModal();
    }

  }, [visibleModal])
  const handleCreate = () => {
    return new Promise<CreateDocumentResponse>((resolve, reject) => {
      const { form } = formRef.current
      form.validateFields((err, values) => {
        if (err) {
          return;
        } console.log("valuessss", values)
        const documentInput = { ...values, reviewerId, cmsUserId: implementerId };
        delete documentInput.implementer
        delete documentInput.approver
        createDocument({ variables: { data: documentInput } }).then(() => {
          resolve(CreateDocumentResponse.success);
          ToastSuccess({ message: "Tạo hồ sơ thành công" });
          onRefreshQuery();
          onShowModal();
          form.resetFields();
        }).catch((error) => {
          reject(error);
        })

      });
    })
  };
  return (
    <div className={styles.titleContainer}>
      <Row>
        <Col md={18}>
          <span className={styles.title}>Quản lý hồ sơ</span>
        </Col>
        <Col md={6}>
          <div className={styles.textRight}>
            <div className={`${styles.linkBtn}`} onClick={onShowModal}>
              <Icon className={styles.mr1} type="plus-circle" theme="filled" />
              Tạo hồ sơ
            </div>
            <CreateFileModal
              onSetImplementerId={setImplementerId}
              onSetReviewerId={setReviewerId}
              confirmLoading={loading}
              wrappedComponentRef={formRef}
              visible={visible}
              onCancel={onShowModal}
              onCreate={handleCreate}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default CollectionsPage;
