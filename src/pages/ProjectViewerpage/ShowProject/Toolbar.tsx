import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Input, Button } from 'antd';
import styles from './style.module.less';
import UploadFile from '../components/UploadFile';
import Note from '../components/NoteModal';
import { useMutation } from '@apollo/react-hooks'
import { UpdateTreeNode_updateTreeNode_treeNode } from '../../../graphql/types'
import { UpdateTreeNode, UpdateTreeNodeVariables } from '../../../graphql/types';
import { UPDATE_TREE_NODE } from '../../../graphql/document/updateTreeNode'
import { AppContext } from '../../../contexts/AppContext'

const useUpdateTreeNode = () => {
  const [updateTreeNode, { loading, error }] = useMutation<UpdateTreeNode, UpdateTreeNodeVariables>(UPDATE_TREE_NODE);
  return { updateTreeNode, loading, error }
}
// const useStateDocumentDetail = (initState: GetDocument_getDocument_treeNode[] = []) => {
//   const [documentDetail, setDocumentDetail] = useState(initState);
//   return {
//     documentDetail, setDocumentDetail
//   }
// }
interface NodeInfo extends UpdateTreeNode_updateTreeNode_treeNode { };
interface InputState {
  documentName: string;
  agencyIssued: string;
  issuedDate: string;
}


const useStateVisible = (nodeInfo: NodeInfo) => {
  console.log("nodeInfoo", nodeInfo)
  const initNodeInfo: InputState = {
    documentName: nodeInfo && nodeInfo.documentName,
    issuedDate: nodeInfo && nodeInfo.issuedDate,
    agencyIssued: nodeInfo && nodeInfo.agencyIssued
  }
  const [isEdit, setIsEdit] = useState(false);
  const [isAddImageModal, setAddImageModal] = useState(false);
  const [isAddNoteModal, setAddNoteModal] = useState(false);
  const [inputState, setInputState] = useState(initNodeInfo);
  return {
    isEdit, isAddImageModal, isAddNoteModal,
    setIsEdit, setAddImageModal, setAddNoteModal,
    inputState, setInputState
  }
}

const Toolbar: React.FC = () => {
  const { nodeInfo, treeNode, onUpdateContext } = useContext(AppContext)
  const { isEdit, isAddImageModal, isAddNoteModal, setIsEdit, setAddImageModal, setAddNoteModal, inputState, setInputState } = useStateVisible(nodeInfo);
  const { updateTreeNode } = useUpdateTreeNode();

  const showAddImageModal = () => {
    setAddImageModal(!isAddImageModal);
  }
  const onEdit = () => {
    setIsEdit(!isEdit);
  }
  const onUpdateEdit = () => {
    // key?: string | null;
    // parent?: string | null;
    // agencyIssued?: string | null;
    // issuedDate?: any | null;
    // documentName: string;
    // note?: string | null;
    // nodeMediaId?: string | null;
    // filesPosition?: FilesPositionInput | null;
    if (nodeInfo !== null && treeNode !== null) {

      const newTreeNode = treeNode.map((item) => {
        if (item.key === nodeInfo.key) {
          return {
            ...item, ...inputState
          }

        }
        return {
          ...item
        }
      })
      onUpdateContext({ treeNode: newTreeNode })
      console.log("newTreeNode", nodeInfo.documentId);
      updateTreeNode({
        variables: {
          data: {
            treeNode: newTreeNode
          },
          documentId: nodeInfo.documentId
        }
      }).then(() => {
        console.log("sucrss edit")
      }).catch((error) => {
        console.log("roror ", error)
      })
    }

    setIsEdit(!isEdit);

  }
  const onNote = () => {
    setAddNoteModal(!isAddNoteModal)
  }
  useEffect(() => {
    if (nodeInfo) {
      setInputState(({
        documentName: nodeInfo.documentName,
        issuedDate: nodeInfo.issuedDate,
        agencyIssued: nodeInfo.agencyIssued
      }))
    }

  }, [nodeInfo])
  const onChangeAgencyIssued = ({ target: { value } }) => {
    console.log(value)
    setInputState({ ...inputState, agencyIssued: value })
  }
  const onChangeDocumentName = ({ target: { value } }) => {
    setInputState({ ...inputState, documentName: value })
  }
  const onChangeIssuedDate = ({ target: { value } }) => {
    setInputState({ ...inputState, issuedDate: value })
  }
  return (
    <div className={styles.toolbar}>
      <Row>
        <Col xl={8} lg={8}>
          <span>Tên văn bản</span>
        </Col>
        <Col xl={7} lg={7}>
          <span>Ký hiệu, ngày tháng năm ban hành</span>
        </Col>
        <Col xl={5} lg={5}>
          <span>Cơ quan ban hành</span>
        </Col>
        <Col xl={4} lg={4} />
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col xl={8}>
          <div className={styles.marginRight}>
            <Input placeholder="Nhập tên văn bản"
              disabled={!isEdit}
              value={inputState.documentName}
              onChange={onChangeDocumentName}
              className={styles.inputHeight} style={{ marginRight: 10 }}></Input>
          </div>
        </Col>
        <Col xl={7}>
          <div className={styles.marginRight}>
            <Input
              disabled={!isEdit}
              value={inputState.issuedDate}
              onChange={onChangeIssuedDate}
              placeholder="Nhập ký hiệu, ngày tháng năm ban hành" className={styles.inputHeight}></Input>
          </div>
        </Col>
        <Col xl={5}>
          <div className={styles.marginRight}>
            <Input
              disabled={!isEdit}
              value={inputState.agencyIssued}
              onChange={onChangeAgencyIssued}
              placeholder="Nhập cơ quan ban hành" className={styles.inputHeight}></Input>
          </div>
        </Col>
        <Col xl={4}>
          <div className={styles.btnContainer}>
            <Button
              disabled={!isEdit}
              onClick={showAddImageModal}
              className={`${styles.imageBtn} ${styles.btnSmall}`} type="primary">
              <i className="icon-image"></i>
            </Button>
            <Button
              disabled={!isEdit}
              onClick={onNote}
              className={`${styles.fileBtn} ${styles.btnSmall}`} type="default">
              <i className="icon-note"></i>
            </Button>
            <div className={styles.doubleBtn}>
              <Button
                disabled={isEdit}
                style={{ backgroundColor: isEdit ? "#CCCCCC" : "#16A085" }}
                onClick={onEdit}
                className={styles.editBtn} type="default">
                <i className="icon-edit"></i>
              </Button>
              <Button
                style={{ backgroundColor: isEdit ? "#16A085" : "#CCCCCC" }}
                onClick={onUpdateEdit}
                className={styles.completedBtn} disabled={!isEdit} type="default">
                <i className="icon-done"></i>
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <div className={styles.docsContainer}></div>
      <UploadFile onDismiss={showAddImageModal} onSubmit={showAddImageModal} visible={isAddImageModal}></UploadFile>
      <Note onSubmit={onNote} onDismiss={onNote} visible={isAddNoteModal} />
    </div>
  );
};
export default Toolbar;
