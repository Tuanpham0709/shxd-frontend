import React, { useState, useContext, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
// import { Button, Layout } from 'antd';
import styles from './style.module.less';
import ProjectInfo from './ProjectInfo';
import HeaderBar from './HeaderBar';
import WorkingTree from './WorkingTree/index';
import ShowProject from './ShowProject/index';
import { UpdateTreeNode, UpdateTreeNodeVariables, GetDocument_getDocument_treeNode } from '../../graphql/types';
import { UPDATE_TREE_NODE } from '../../graphql/document/updateTreeNode'
import EmptyFiles from './components/EmptyFiles';
import { Col, Row } from 'antd';
import { AppContext } from '../../contexts/AppContext';
interface Node {
  documentName: string;
  nodeMediaId: string;
}
export const useUpdateTreeNode = () => {
  const [updateTreeNode, { loading, error }] = useMutation<UpdateTreeNode, UpdateTreeNodeVariables>(UPDATE_TREE_NODE);
  return { updateTreeNode, loading, error }
}
const useStateDocumentDetail = (initState: GetDocument_getDocument_treeNode[] = []) => {
  const [documentDetail, setDocumentDetail] = useState(initState);
  return {
    documentDetail, setDocumentDetail
  }
}
const Files = ({ location }) => {
  console.log("location ", location)
  const { onUpdateContext, treeNodeEdits } = useContext(AppContext)
  const { updateTreeNode } = useUpdateTreeNode();

  // console.log("location", location)
  const { documentDetail, setDocumentDetail } = useStateDocumentDetail(location.state.document.treeNode && location.state.document.treeNode);
  useEffect(() => {
    if (location.state.document.treeNode) {
      setDocumentDetail(location.state.document.treeNode);
    }
  }, [location.state.document]);
  useEffect(() => {
    return () => {
      setDocumentDetail(null);
    }
  }, [])
  useEffect(() => {
    if (treeNodeEdits && treeNodeEdits.length > 0) {
      const newData = treeNodeEdits.map((item) => {
        return {
          key: item.key,
          parent: item.parent,
          documentName: item.documentName,
          agencyIssued: item.agencyIssued,
          issuedDate: item.issuedDate,
          note: item.note,
          nodeMediaId: item.nodeMediaId,
          filesPosition: null
        }
      })
      updateTreeNode({ variables: { data: { treeNode: newData }, documentId: location.state.document._id } }).then((res) => {
        console.log("node response", res.data);
        onUpdateContext({ loadingUploadFile: false })
        setDocumentDetail(res.data.updateTreeNode.treeNode);
      }).catch((error) => {
        console.log("error update tree node", error);
      })
    }

  }, [treeNodeEdits])
  const onSuccessUpload = (nodes: Node[]) => {
    // console.log("Nodes : : : : :: : : : :", nodes)
    const nodesHandled = nodes.map((item, index) => ({
      ...item, key: `${index}`
    }))
    updateTreeNode({ variables: { data: { treeNode: nodesHandled }, documentId: location.state.document._id } }).then((res) => {
      console.log("node response", res.data);
      onUpdateContext({ loadingUploadFile: false })
      setDocumentDetail(res.data.updateTreeNode.treeNode);
    }).catch((error) => {
      console.log("error update tree node", error);
    })
  }

  return (
    <div>
      <ProjectInfo document={location.state.document} />
      <div className={styles.container}>
        <HeaderBar />
        <div>
          <Row>
            <Col xl={7}>
              <WorkingTree documentId={location.state.document._id} treeNode={documentDetail} />
            </Col>
            <Col xl={17}>
              {!documentDetail ? <EmptyFiles onUploadSuccess={onSuccessUpload} /> : <ShowProject uriList={documentDetail.map((item) => (item.nodeMedia.uri))} />}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default Files;
