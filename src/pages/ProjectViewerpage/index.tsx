import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
// import { Button, Layout } from 'antd';
import styles from './style.module.less';
import ProjectInfo from './ProjectInfo';
import HeaderBar from './HeaderBar';
import WorkingTree from './WorkingTree/index';
import ShowProject from './ShowProject/index';
import { UpdateTreeNode, UpdateTreeNodeVariables, UpdateTreeNode_updateTreeNode } from '../../graphql/types';
import { UPDATE_TREE_NODE } from '../../graphql/document/updateTreeNode'
import EmptyFiles from './components/EmptyFiles';
import { Col, Row } from 'antd';
import { AppContext } from '../../contexts/AppContext';
const infoClient = [
  { type: 'Mã công trình', content: 'NQ 307 NPCP' },
  { type: 'Tên khách hàng', content: 'Ban QLDA thành phố Đồng Hới' },
  { type: 'Người thực hiện', content: 'Nguyễn Văn A' },
  { type: 'Ngày bắt đầu lập hồ sơ', content: '03/12/2019' },
];
interface Node {
  documentName: string;
  nodeMediaId: string;
}
interface IState extends UpdateTreeNode_updateTreeNode {

}
const useUpdateTreeNode = () => {
  const [updateTreeNode, { loading, error }] = useMutation<UpdateTreeNode, UpdateTreeNodeVariables>(UPDATE_TREE_NODE);
  return { updateTreeNode, loading, error }
}
const initState: IState = {
  __typename: null,
  _id: null,
  treeNode: []
}
const useStateDocumentDetail = () => {
  const [documentDetail, setDocumentDetail] = useState(initState);
  return {
    documentDetail, setDocumentDetail
  }
}
const Files = ({ location }) => {
  const { onUpdateContext } = useContext(AppContext)
  const { updateTreeNode } = useUpdateTreeNode();
  // console.log("location", location)
  const { documentDetail, setDocumentDetail } = useStateDocumentDetail();
  // console.log("docm ent detai ", documentDetail);
  const onSuccessUpload = (nodes: Node[]) => {
    // console.log("Nodes : : : : :: : : : :", nodes)
    const nodesHandled = nodes.map((item, index) => ({
      ...item, key: `${index}`
    }))
    updateTreeNode({ variables: { data: { treeNode: nodesHandled }, documentId: location.state.document._id } }).then((res) => {
      console.log("node response", res.data);
      onUpdateContext({ loadingUploadFile: false })
      setDocumentDetail(res.data.updateTreeNode);
    }).catch((error) => {
      console.log("error update tree node", error);
    })
  }

  return (
    <div>
      <ProjectInfo {...infoClient} />
      <div className={styles.container}>
        <HeaderBar />
        <div>
          <Row>
            <Col xl={7}>
              <WorkingTree treeNode={documentDetail.treeNode} />
            </Col>
            <Col xl={17}>
              {documentDetail.treeNode.length === 0 ? <EmptyFiles onUploadSuccess={onSuccessUpload} /> : <ShowProject />}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default Files;
