import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import styles from './style.module.less';
import { UpdateTreeNode_updateTreeNode_treeNode } from '../../../graphql/types'
import TreeViewer from './TreeViewer';
import { useUpdateTreeNode } from '../index'
import FlatToNested from 'flat-to-nested'
const toolBtnDataProps = [
  { icon: 'icon-them-dau-muc' },
  { icon: 'icon-them-tai-lieu' },
  { icon: 'icon-share' },
  { icon: 'icon-send-mail' },
  { icon: 'icon-copy' },
  { icon: 'icon-vi-tri-luu' },
  { icon: 'icon-tai-lieu-thieu' },
];
const { Search } = Input;
const BUTTON_TYPE = {
  addNode: 0,
  addMedia: 1,
  share: 2,
  message: 3,
  copy: 4
}
const flatToNested = new FlatToNested({
  id: 'id',
  // The name of the property with the parent node id in the flat representation
  parent: 'parent',
  // The name of the property that will hold the children nodes in the nested representation
  children: 'children'
})
export interface ITreeNode extends UpdateTreeNode_updateTreeNode_treeNode {

}
const initNodes: ITreeNode[] = []
const useUpdateState = () => {
  const [nodes, setNodes] = useState(initNodes)
  return {
    nodes, setNodes
  }
}
interface TreeProps {
  treeNode?: ITreeNode[],
  documentId: string
}
interface CheckedNodes {
  nodesChecked: ITreeNode[];
  nodesParent: ITreeNode;
}
export interface ParamUpdateNode {
  nodesChecked?: ITreeNode[];
  nodesParent?: ITreeNode;
  hasChecked: boolean;
}
const WorkingTree: React.FC<TreeProps> = ({ treeNode, documentId }) => {
  let checkedNodes: CheckedNodes;
  const { nodes, setNodes } = useUpdateState();
  const { updateTreeNode } = useUpdateTreeNode();
  useEffect(() => {
    setNodes(treeNode)
  }, [treeNode])
  const onUpdateTreeViewer = (params: ParamUpdateNode) => {
    if (!params.hasChecked) {
      checkedNodes = null;
      return;
    }
    checkedNodes = {
      nodesChecked: params.nodesChecked,
      nodesParent: params.nodesParent
    }
  }
  const onUpdateNodesAfterDrop = (nodes: ITreeNode[]) => {
    if (nodes) {
      const newData = nodes.map((item) => {
        return {
          key: item.key,
          parent: item.parent,
          documentName: item.documentName,
          agencyIssued: item.agencyIssued,
          issuedDate: item.issuedDate,
          note: item.note,
          nodeMediaId: item.nodeMediaId,
        }
      })
      updateTreeNode({
        variables: {
          data: {
            treeNode: newData
          },
          documentId: documentId
        }
      }).then((data) => {
        console.log("updatae sucesnt data", data)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
  const onClickBtnBar = (index) => {
    if (index === BUTTON_TYPE.addNode) {
      if (checkedNodes === null) {
        return;
      }
      onAddNodes();
    }
  }
  const onAddNodes = () => {
    if (!checkedNodes.nodesParent) {
      const { nodesChecked } = checkedNodes;
      nodesChecked.map((nodeChecked) => {
        const index = nodes.findIndex((node) => nodeChecked.key === node.key);
        if (index > -1) {
          nodes.splice(index, 1);
        }
      })

      const nodesCheckedNested = flatToNested.convert(nodesChecked);
      const newParentNode = {
        documentName: "Đầu mục 1",
        key: `${nodes.length + 1}`,
        parent: null,
        children: nodesCheckedNested.children
      }
      console.log("-----------------", nodesCheckedNested);
      console.log("newParent coe", newParentNode);

    }
  }
  console.log(" tre ndoes  ss ", nodes)
  return (
    <div className={styles.filterContainer}>
      <div className={styles.searchContainer}>
        <Search className={styles.search} size="small" />
      </div>
      <div className={styles.miniToolbar}>
        {toolBtnDataProps.map((item: any, index: number) => (
          <Button
            onClick={() => {
              onClickBtnBar(index)
            }}
            key={index + ''} className={styles.btnIcon}>
            <i className={item.icon}></i>
          </Button>
        ))}
      </div>
      <div>
        <div className={`${styles.treeContainer} ${styles.scrollbar}`}>
          <TreeViewer
            onUpdateAfterDrop={onUpdateNodesAfterDrop}
            onUpdateTreeViewer={onUpdateTreeViewer} treeNode={nodes} documentId={documentId} />
        </div>
      </div>
    </div>
  );
};
// {filterDataProps.map((item: any, index: number) => (
//   <div style={{ width: '100%', marginBottom: 10 }}>
//     <span className={styles.left}>{item.label}</span>
//     <Checkbox className={styles.right} />
//   </div>
// ))}
export default WorkingTree;
