import React from 'react';
import { Input, Button } from 'antd';
import styles from './style.module.less';
import { UpdateTreeNode_updateTreeNode_treeNode } from '../../../graphql/types'
import TreeViewer from './TreeViewer';
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
export interface ITreeNode extends UpdateTreeNode_updateTreeNode_treeNode {

}
interface TreeProps {
  treeNode: ITreeNode[],
  documentId: string
}
const WorkingTree: React.FC<TreeProps> = ({ treeNode, documentId }) => {
  console.log("working tre e", documentId)

  return (
    <div className={styles.filterContainer}>
      <div className={styles.searchContainer}>
        <Search className={styles.search} size="small" />
      </div>
      <div className={styles.miniToolbar}>
        {toolBtnDataProps.map((item: any, index: number) => (
          <Button key={index + ''} className={styles.btnIcon}>
            <i className={item.icon}></i>
          </Button>
        ))}
      </div>
      <div>
        <div className={`${styles.treeContainer} ${styles.scrollbar}`}>
          <TreeViewer treeNode={treeNode} documentId={documentId} />
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
