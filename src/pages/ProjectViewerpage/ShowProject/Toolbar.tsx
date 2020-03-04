import React, { useState, useContext, createRef, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import styles from './style.module.less';
import EditNodeInfo from '../components/EditNodeInfo';
import UploadFile from '../components/UploadFile';
import Note from '../components/NoteModal';
import { FormComponentProps } from 'antd/lib/form';
import { UpdateTreeNode_updateTreeNode_treeNode, FilesPositionInput } from '../../../graphql/types';
import { AppContext } from '../../../contexts/AppContext'
import { ToastSuccess, ToastError } from '../../../components/Toast';

interface NodeInfo extends UpdateTreeNode_updateTreeNode_treeNode { };

const useStateVisible = (nodeInfo: NodeInfo = null) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isAddImageModal, setAddImageModal] = useState(false);
  const [isAddNoteModal, setAddNoteModal] = useState(false);
  return {
    isEdit, isAddImageModal, isAddNoteModal,
    setIsEdit, setAddImageModal, setAddNoteModal,
  }
}

const Toolbar: React.FC = () => {
  const { treeNode, nodeInfo, onUpdateTreeNode, onUpdateContext, filesLocation } = useContext(AppContext);
  const { isEdit, isAddImageModal, isAddNoteModal, setIsEdit, setAddImageModal, setAddNoteModal } = useStateVisible();
  const formRef = createRef<FormComponentProps>();
  const showAddImageModal = () => {
    setAddImageModal(!isAddImageModal);
  }
  const onEdit = () => {
    setIsEdit(!isEdit);
  }
  const onEditDone = () => {
    const { form } = formRef.current;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const nodesUpdate = treeNode.map((item) => {
        let node = item
        delete node.nodeMedia
        if (node.__typename) {
          delete node.__typename
        }
        if (node.filesPosition) {
          node.filesPosition.forEach((item) => {
            delete item.__typename
            delete item.filesPositionMedia
          });
        }
        if (node.key === nodeInfo.key) {
          return {
            ...node, agencyIssued: values.agencyIssued,
            issuedDate: values.issuedDate,
            documentName: values.documentName
          }
        }
        return node;
      })
      console.log("nodes update ", nodesUpdate)
      setIsEdit(false);
      onUpdateTreeNode(nodesUpdate).then(() => {
        ToastSuccess({ message: "Cập nhật thành công!" });
        onUpdateContext({ nodeInfo: { ...nodeInfo, ...values } })
        // form.resetFields();
        form.resetFields();

      }).catch(() => {
        ToastError({ message: "Có lỗi sảy ra, vui lòng thử lại !" })
      })
    })
  }
  const onNote = () => {
    setAddNoteModal(!isAddNoteModal)
  }
  const onNoteSubmit = (note: string) => {

    const nodesUpdate = treeNode.map((item) => {
      let node = item
      delete node.nodeMedia;
      if (node.__typename) {
        delete node.__typename;
      }
      if (node.filesPosition) {
        node.filesPosition.map((fileP) => {
          if (fileP.__typename) {
            delete fileP.__typename;
          }
          if (fileP.filesPositionMedia) {
            delete fileP.filesPositionMedia;
          }
        });
      }
      if (node.key === nodeInfo.key) {
        return {
          ...node, note: note
        }
      }
      return node;
    });

    onUpdateTreeNode(nodesUpdate).then(() => {
      ToastSuccess({ message: "Cập nhật thành công!" });
      onUpdateContext({ nodeInfo: { ...nodeInfo, note } })
      onNote();
    }).catch(() => {
      ToastError({ message: "Có lỗi sảy ra, vui lòng thử lại !" })
    })
  }
  useEffect(() => {
    setIsEdit(false);
  }, [nodeInfo])
  const nodeBaseInfo = {
    documentName: nodeInfo && nodeInfo.documentName,
    agencyIssued: nodeInfo && nodeInfo.agencyIssued,
    issuedDate: nodeInfo && nodeInfo.issuedDate,
  }
  const onSubmitUploadImage = (mediaIds: string[]) => {

  }

  if (!nodeInfo) {
    return <div style={{ height: 100 }} />
  }
  const onUpload = () => {
    const filesPosition: FilesPositionInput[] = filesLocation.map((item) => {
      const node: FilesPositionInput = {
        filesPositionMediaId: item.mediaId,
        filesNote: item.note
      }
      return node;
    })

    const nodesUpdate = treeNode.map((item) => {
      let node = item
      if (node.filesPosition) {
        node.filesPosition.map((item, index) => {
          if (item.__typename) {
            delete item.__typename
          }
          if (item.filesPositionMedia) {
            delete item.filesPositionMedia
          }
        })
      }
      delete node.nodeMedia;
      if (node.__typename) {
        delete node.__typename;
      }

      if (node.key === nodeInfo.key) {
        return {
          ...node, filesPosition: filesPosition
        }
      }
      return node;
    });
    console.log("???> > > > > > >  > >", nodesUpdate)
    onUpdateTreeNode(nodesUpdate).then(() => {
      showAddImageModal();
      ToastSuccess({ message: "Cập nhật thành công!" });
    }).catch(() => {
      ToastError({ message: "Có lỗi sảy ra, vui lòng thử lại !" })
    })


  }
  return (
    <div className={styles.toolbar}>
      <Row style={{ marginTop: 10 }}>
        <Col xl={19} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <div className={styles.nodeInfoContainer}>
            <div >
              <p>Tên văn bản </p>
              {nodeInfo && <p>{nodeInfo.documentName}</p>}
            </div>
            <div >
              <p>Ký kiệu, ngày tháng năm ban hành</p>
              {nodeInfo && <p>{nodeInfo.issuedDate}</p>}
            </div>
            <div >
              <p>Cơ quan ban hành</p>
              {nodeInfo && <p>{nodeInfo.agencyIssued}</p>}
            </div>
          </div>

        </Col>
        <Col xl={5}>
          <div className={styles.btnContainer}>
            {!isEdit ? <Button
              style={{ backgroundColor: "#16A085" }}
              onClick={onEdit}
              className={`${styles.editBtn} ${styles.btnSmall}`} >
              <i className="icon-edit"></i>
            </Button> :
              <Button
                style={{ backgroundColor: "#16A085" }}
                className={`${styles.editBtn} ${styles.btnSmall}`} type="primary">
                <i className="icon-done"></i>
              </Button>
            }
            <Button
              onClick={showAddImageModal}
              className={`${styles.imageBtn} ${styles.btnSmall}`} type="primary">
              <i className="icon-image"></i>
            </Button>
            <Button
              onClick={onNote}
              className={`${styles.fileBtn} ${styles.btnSmall}`} type="default">
              <i className="icon-note"></i>
            </Button>

          </div>
        </Col>
      </Row>
      <div className={styles.docsContainer}></div>
      <UploadFile
        onUpload={onUpload}
        filesPosition={nodeInfo.filesPosition}
        onDismiss={showAddImageModal} onSubmit={onSubmitUploadImage} visible={isAddImageModal}></UploadFile>
      <Note onSubmit={onNoteSubmit} onDismiss={onNote} visible={isAddNoteModal} initValue={nodeInfo.note} />
      <EditNodeInfo
        nodeInfo={nodeBaseInfo}
        onCreate={onEditDone}
        onCancel={onEdit}
        visible={isEdit}
        wrappedComponentRef={formRef}>
      </EditNodeInfo>
    </div>
  );
}
export default Toolbar;
