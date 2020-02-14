import React, { Component } from 'react';
import { Tree, Checkbox, Icon, } from 'antd';
import { AppContext } from '../../../contexts/AppContext';
import styles from './style.module.less';
import 'antd/dist/antd.css';
import { UpdateTreeNode_updateTreeNode_treeNode } from '../../../graphql/types';
import { ITreeNode, ParamUpdateNode } from './index';
import FlatToNested from 'flat-to-nested';
const { TreeNode } = Tree;
interface NodeObject extends UpdateTreeNode_updateTreeNode_treeNode {
  id?: string;
  title?: string;
  children?: Array<NodeObject>;
}

interface TreeState {
  gData?: Array<NodeObject>;
  checkedKeys: Array<string>;
  isCheckedAll: boolean;
  treeNode: ITreeNode[];
}
interface IProps {
  treeNode: ITreeNode[];
  documentId: string;
  onUpdateTreeViewer: (params: ParamUpdateNode) => void;
  onUpdateAfterDrop: (nodes: ITreeNode[]) => void;
}

const flatToNested = new FlatToNested({ id: "id", parent: "parent", children: 'children' });
class TreeViewer extends Component<IProps, TreeState> {
  state: TreeState = {
    gData: [],
    checkedKeys: [],
    isCheckedAll: false,
    treeNode: []
  };
  componentWillReceiveProps(nextProps) {
    console.log("this re - - - - - ", nextProps)
    if (nextProps.treeNode !== this.props.treeNode) {
      if (nextProps.treeNode) {
        this._onHandleTreeData(nextProps.treeNode);
      }

    }
  }
  componentDidMount() {
    this._onHandleTreeData(this.props.treeNode);
  }
  _onHandleTreeData = (treeNode) => {
    let treeNested = flatToNested.convert(treeNode.map((item) => ({ ...item, id: item.key })));
    if (!treeNested.children) {
      this._onHandleExpandedKeyData({ children: [treeNested] });
      return;
    }
    this._onHandleExpandedKeyData(treeNested);
    // console.log("treeNested convert ", treeNested)
  }
  _onHandleNestedToFlat = () => {
    let newData: any[] = []
    const onCallbackHandleData = (children: Array<NodeObject>) => {
      return children.map((item, index) => {
        if (item.children && item.children.length > 0) {
          onCallbackHandleData(item.children);
        }
        newData.push(item)
      })
    }
    const { gData } = this.state;
    console.log("gData before", gData);
    gData.map((item) => {
      if (item.children && item.children.length > 0) {
        onCallbackHandleData(item.children);
      }
      newData.push(item)
    })
    console.log("dataNested handle", newData);
    return newData;
  }
  _onLoop = (data: any[], parentKey: string) => {
    return data.map((item, index) => {
      if (item.children) {
        return {
          ...item, children: this._onLoop(item.children, `${parentKey}-${index}`),
          title: item.documentName
        }
      }
      return {
        ...item, title: item.documentName
      }
    })
  }
  _onFindParentKeyCheckedNodes = () => {
    const { checkedKeys } = this.state;
    const { onUpdateTreeViewer } = this.props;
    if (checkedKeys.length === 0) {
      onUpdateTreeViewer({ hasChecked: false });
      return;
    }
    let flatData = this._onHandleNestedToFlat();
    let nodesChecked = [];
    checkedKeys.forEach((key) => {
      const nodeChecked = flatData.find((node) => node.key === key);
      nodesChecked.push(nodeChecked);
    });
    const nodesUnchecked = flatData.filter((item) => {
      return checkedKeys.find((key) => (item.key === key)) !== item.key
    });

    let nodesParent = [];
    nodesChecked.forEach((node) => {
      const nodeParent = nodesUnchecked.find((nodeUn) => {
        return (node.parent === nodeUn.key)
      });
      if (nodeParent) {
        nodesParent.push(nodeParent);
      }
    })
    console.log("node checked", nodesChecked)
    onUpdateTreeViewer({ nodesChecked: nodesChecked, nodesParent: nodesParent[0], hasChecked: true })
  }
  _onHandleExpandedKeyData = (treeData: any) => {
    // console.log("------------", treeData)
    if (!treeData.children) {
      return;
    }
    const newData = treeData.children.map((item, index) => {

      if (item.children) {
        return {
          ...item, children: this._onLoop(item.children, `0-${index}`), title: item.documentName
        }
      }
      return {
        ...item, title: item.documentName
      }
    })
    // console.log("new Data ta ", newData);
    this.setState({ gData: newData })
  }
  _onCheckAll = () => {
    return this.state.gData.map((item) => (item.key));
  }
  _onChecked = async (keys: any, event) => {
    console.log("ventevent check", event)
    const { gData } = this.state;
    if (keys.length < gData.length) {
      this.setState((...preState) => ({
        isCheckedAll: false,
      }));
    } else {
      this.setState((...preState) => ({
        isCheckedAll: true,
      }));
    }
    await this.setState((...preState) => ({
      checkedKeys: keys,
    }));
    this._onFindParentKeyCheckedNodes();
  };
  _onCheckedAll = e => {
    this.setState((...preState) => ({ isCheckedAll: e.target.checked }));
    if (e.target.checked) {
      this.setState({
        checkedKeys: this._onCheckAll(),
      });
      return;
    }
    this.setState((...preState) => ({
      checkedKeys: [],
    }));
  };
  _onDrop = async info => {
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split("-");
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    let dragObj = {
      parent: null
    };
    const loop = (data, key, callback) => {

      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          dragObj.parent = item.id
          return loop(item.children, key, callback);
        }
      });
    };
    const data = [...this.state.gData];

    // Find dragObject

    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        dragObj.parent = item.id
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        dragObj.parent = item.id;
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    await this.setState({
      gData: data
    });
    console.log("parent data", data)
    const newData = this._onHandleNestedToFlat();
    this.props.onUpdateAfterDrop(newData)

  };
  _handleSelectItem = (selectedKeys, event, onUpdateContext) => {
    if (event.selected) {
      const flatData = this._onHandleNestedToFlat();
      const nodeSelected = flatData.find((item) => (selectedKeys[0] === item.key));
      const nodeInfo = {
        ...nodeSelected, documentId: this.props.documentId
      }
      onUpdateContext({ nodeInfo: nodeInfo, treeNode: flatData });
    }
    // let index = gData.findIndex(item);
  };
  _renderAvatar = item => {
    if (item.avatar) {
      return (
        <Icon
          style={{ position: 'absolute', right: 15 }}
          component={() => (
            <img
              src={`${item.avatar}`}
              style={{ width: 20, height: 20, borderRadius: 20 / 2, backgroundColor: '#fff' }}
            ></img>
          )}
        ></Icon>
      );
    }
    return null;
  };
  _renderTreeNode = data =>
    data.map(item => {
      if (item.children && item.children.length) {
        return (
          <TreeNode key={item.key} title={item.documentName}>
            {this._renderTreeNode(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode style={{ height: 40 }} key={item.key} title={item.documentName} />
        //   {/* <img src={'https://img.icons8.com/plasticine/344/user.png'} style={{ width: 20, height: 20 }}></img>
        // </div> */}
      );
    });
  render() {
    const { gData, checkedKeys, isCheckedAll } = this.state;
    console.log("checked key  check", checkedKeys);
    return (
      <AppContext.Consumer>
        {({ onUpdateContext }) => (<div
          className={styles.treeContainer}>
          <div className={styles.hozLine}>
            <div className={styles.chooseAll}>
              <Checkbox checked={isCheckedAll} onChange={this._onCheckedAll}>
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
            checkedKeys={checkedKeys}
            onSelect={(selectedKeys, event) => {
              this._handleSelectItem(selectedKeys, event, onUpdateContext)
            }}
            onCheck={this._onChecked}
            // onDragEnter={this.onDragEnter}
            onDrop={this._onDrop}
          >
            {this._renderTreeNode(gData)}
          </Tree>
        </div>)}
      </AppContext.Consumer>
    );
  }
}
export default TreeViewer;