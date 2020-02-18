import React, { useState, useContext } from 'react';
import { Input, Button } from 'antd';
import styles from './style.module.less';
import { UpdateTreeNode_updateTreeNode_treeNode } from '../../../graphql/types';

import 'antd/dist/antd.css';
import { ITreeNode, ParamUpdateNode } from './index';
import { _onHandleNestedToFlat } from '../index'
import { AppContext } from '../../../contexts/AppContext'
const { TreeNode } = Tree;
import { Tree, Checkbox } from 'antd';
const BUTTON_TYPE = {
  addNode: 0,
  addMedia: 1,
  share: 2,
  message: 3,
  copy: 4
}

interface TreeState {
  checkedKeys: Array<string>;
  isCheckedAll: boolean;
}

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
// const initNodes: ITreeNode[] = []
// const useUpdateState = () => {
//   const [nodes, setNodes] = useState(initNodes)
//   return {
//     nodes, setNodes
//   }
// }
interface TreeProps {
  gData?: any[];
  onDrop?: (info) => void;
  onAddNode: (checkedKeys: string[]) => void;
}
export interface ParamUpdateNode {
  nodesChecked?: ITreeNode[];
  nodesParent?: ITreeNode;
  hasChecked: boolean;
}

const initTreeData: TreeState = {
  checkedKeys: [],
  isCheckedAll: false,

}
const useTreeViewerState = () => {
  const [treeState, setTreeState] = useState(initTreeData);
  return { treeState, setTreeState }
}

const _renderTreeNode = data => {
  if (data && data.length > 0) {
    return (data.map(item => {
      if (item.children && item.children.length) {
        return (
          <TreeNode key={item.key} title={item.documentName}>
            {_renderTreeNode(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode style={{ height: 40 }} key={item.key} title={item.documentName} />
        //   {/* <img src={'https://img.icons8.com/plasticine/344/user.png'} style={{ width: 20, height: 20 }}></img>
        // </div> */}
      );
    }))
  }

}
const WorkingTree: React.FC<TreeProps> = ({ gData, onDrop, onAddNode }) => {
  const { onUpdateContext } = useContext(AppContext)
  const { treeState, setTreeState } = useTreeViewerState();

  const onChecked = async (keys: any, event) => {
    console.log("ventevent check", event)
    const flatData = _onHandleNestedToFlat(gData);
    if (keys.length === flatData.length) {
      setTreeState({
        ...treeState,
        isCheckedAll: true,
        checkedKeys: keys,
      });
      return;
    }
    setTreeState({
      ...treeState,
      isCheckedAll: false,
      checkedKeys: keys,
    });

    // this._onFindParentKeyCheckedNodes();
  };
  const onCheckAll = (event) => {
    console.log("check ed all ", event);
    const { checked } = event.target;
    if (checked) {
      const flatData = _onHandleNestedToFlat(gData);
      setTreeState({ ...treeState, checkedKeys: flatData.map((item) => (item.key)), isCheckedAll: true });
      return;
    }
    setTreeState({ ...treeState, checkedKeys: [], isCheckedAll: false });
  }
  const onClickBtnBar = (index) => {
    if (BUTTON_TYPE === index) {
      onAddNode(treeState.checkedKeys);
    }
  }
  const _handleSelectItem = (selectedKeys, event) => {
    if (event.selected) {
      const data = _onHandleNestedToFlat(gData);
      const flattenData = data.map((item) => {
        let node = item;
        if (node.children) {
          delete node.children
        }
        return node
      })
      const nodeSelected = flattenData.find((item) => (selectedKeys[0] === item.key));
      const nodeInfo = {
        ...nodeSelected
      }
      onUpdateContext({ nodeInfo })


      // onUpdateContext({ nodeInfo: nodeInfo, treeNodeEdits: flatData });
    }
    // let index = gData.findIndex(item);
  };
  return (
    <div className={styles.filterContainer}>
      <div className={styles.searchContainer}>
        <Search className={styles.search} size="small" />
      </div>
      <div className={styles.miniToolbar}>
        {toolBtnDataProps.map((item: any, index: number) => {
          if (index === 1) {
            return (<div className={styles.btnIcon} style={{ position: "relative", display: "flex", justifyContent: "center" }} >
              <input
                type="file"
                className={styles.inputUpload}
                // onClick={() => {
                //   onClickBtnBar(index);
                // }}s
                key={index + ''} >
              </input>
              <i className={item.icon} style={{ alignSelf: "center" }}></i>
            </div>
            )
          }
          return (
            <Button
              style={{ display: "flex", justifyContent: "center" }}
              onClick={() => {
                onClickBtnBar(index)
              }}
              key={index + ''} className={styles.btnIcon}>
              <i className={item.icon} style={{ alignSelf: "center" }}></i>
            </Button>)
        })}
      </div>
      <div>
        <div className={`${styles.treeContainer} ${styles.scrollbar}`}>
          <div
            className={styles.treeContainer}>
            <div className={styles.hozLine}>
              <div className={styles.chooseAll}>
                <Checkbox
                  checked={treeState.isCheckedAll}
                  onChange={onCheckAll}
                >
                  Chọn tất cả
                </Checkbox>
              </div>
            </div>
            <Tree
              // disabled={loading}
              showIcon
              checkable
              className="draggable-tree"
              draggable
              blockNode
              checkedKeys={treeState.checkedKeys}
              onSelect={(selectedKeys, event) => {
                _handleSelectItem(selectedKeys, event)
              }}
              onCheck={onChecked}
              // onDragEnter={this.onDragEnter}
              onDrop={onDrop}
            >
              {_renderTreeNode(gData)}
            </Tree>
          </div>
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
