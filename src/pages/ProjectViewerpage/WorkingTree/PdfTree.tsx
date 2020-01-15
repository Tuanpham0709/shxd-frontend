import React, { Component } from 'react';
import { Tree, Checkbox, Icon } from 'antd';
const { TreeNode } = Tree;
import { AppContext } from '../../../contexts/AppContext';
import styles from './style.module.less';
import 'antd/dist/antd.css';
const child = [
  { title: '1.1. QĐ 783/QĐ-UBND ngày 17/02/2016', key: '0-1', pages: [3, 4, 5] },
  { title: '1.2. QĐ 76/QĐ-UBND ngày 12/03/2016', key: '0-2', pages: [11, 12] },
  { title: '1.3. QĐ 46/QĐ-UBND ngày 19/02/2016', key: '0-3', pages: [1, 2] },
  { title: '1.4. QĐ 873/QĐ-UBND ngày 29/02/2016', key: '0-4', pages: [8, 9] },
  { title: '1.5. VB 31/BC-UBND ngày 17/03/2016', key: '0-5', pages: [13, 14, 15, 16] },
  { title: '1.6. VB 51/QLĐT-TĐ ngày 23/03/2016', key: '0-6', pages: [17, 18, 19, 20] },
  { title: '1.7. VB 41/BC-UBND ngày 30/03/2016', key: '0-7', pages: [21, 22, 23, 24] },
  { title: '1.8. QĐ 1233/QĐ-UBND ngày 31/03/2016', key: '0-8', pages: [25, 26, 27, 28] },
  { title: '1.9. Biên bản họp ngày 6/5/2016', key: '0-9', pages: [29, 30, 31] },
];
const child2 = [
  { title: '2.1. QĐ 142B', key: '0-11', pages: [40] },
  { title: '2.2. QĐ 125/TB-UBND ngày 23/06/2016', key: '0-12', pages: [42] },
  { title: '2.3. 06/2016/HĐXD ngày 23/06/2016', key: '0-13', pages: [43, 44] },
  { title: '2.4. Untitled', key: '0-14', pages: [46, 47, 48, 50, 51] },
  { title: '2.5. 158/QĐ-UBND ngày 23/06/2016', key: '0-15', pages: [52, 53] },
  { title: '2.6. Phụ lục hợp đồng, cải tạo trụ sở UBND phường thanh nhàn', key: '0-16', pages: [74, 75, 76] },
];
const gData = [
  {
    title: '1. Hồ sơ pháp lý chung',
    key: '0-0',
    children: [...child],
    pages: [2],
  },
  { title: '2. Gói thầu xây lắp', key: '0-10', children: [...child2], pages: [40] },
];
const users = [
  { treeNodeId: '0-0', avatar: 'https://img.icons8.com/doodle/344/user-male--v1.png' },
  { treeNodeId: '0-4', avatar: 'https://img.icons8.com/plasticine/344/user.png' },
  { treeNodeId: '0-6', avatar: 'https://img.icons8.com/officel/344/user-male.png' },
];
const chooseAllTree = gData.map((item, index) => {
  return item.key;
});
for (let i = 0; i < gData.length; i++) {
  for (let j = 0; j < users.length; j++) {
    if (gData[i].key === users[j].treeNodeId) {
      const ojb = { ...gData[i], avatar: users[j].avatar };
      gData[i] = { ...ojb };
      console.log('ddd', gData[i]);
    }
  }
}
interface NodeObject {
  title: string;
  key: string;
  children?: Array<NodeObject>;
}
interface TreeState {
  gData?: Array<NodeObject>;
  expandedKeys: Array<string>;
  checkedKeys: Array<string>;
  isCheckedAll: boolean;
}
class PdfTree extends Component {
  state: TreeState = {
    gData,
    expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],
    checkedKeys: [],
    isCheckedAll: false,
  };
  componentDidMount() { }
  _onChecked = (keys: any) => {
    console.log('checked key', typeof keys);
    console.log('checked key', keys);
    if (keys.length < gData.length) {
      this.setState((...preState) => ({
        isCheckedAll: false,
      }));
    } else {
      this.setState((...preState) => ({
        isCheckedAll: true,
      }));
    }
    this.setState((...preState) => ({
      checkedKeys: keys,
    }));
  };
  _onCheckedAll = e => {
    console.log('choosalltree', chooseAllTree);
    this.setState((...preState) => ({ isCheckedAll: e.target.checked }));
    if (e.target.checked) {
      this.setState({
        checkedKeys: chooseAllTree,
      });
      return;
    }
    this.setState((...preState) => ({
      checkedKeys: [],
    }));
  };
  _onDrop = info => {
    console.log(info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          console.log('flow1');
          return callback(item, index, arr);
        }
        if (item.children) {
          console.log('flow2');
          return loop(item.children, key, callback);
        }
      });
    };
    const data = [...this.state.gData];
    // find drag obj
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      console.log('flow 3');
      console.log('ffind drag obj', item);
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // drop content to children
      loop(data, dropKey, item => {
        item.children = item.children || [];
        /// where  to insert dragObj
        console.log('insert to children, ');

        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // has children
      info.node.props.expanded && // is expanded
      dropPosition === 1 //on bottog gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to  insert dragObj
        console.log('insert to children, ');
        item.children.unshift(dragObj);
      });
    } else {
      let ar: Array<Object>;
      let i: number;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
        console.log('define index and array of insert gap');
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
        console.log('add to data of insert parent');
      } else {
        ar.splice(i + 1, 0, dragObj);
        console.log('add to data of insert parent');
      }
    }
    console.log('dataa after handle', data);

    this.setState({
      gData: data,
    });
  };
  _handleSelectItem = (keyItem, onUpdateContext: any) => {
    if (keyItem.length < 1) {
      return;
    }
    let index;
    let pages;
    if (keyItem[0].length < 4) {
      index = gData.findIndex(item => item.key == keyItem[0]);
      if (index < 0) {
        index = gData[0].children.findIndex(item => item.key == keyItem[0]);
        pages = gData[0].children[index].pages;
        console.log('pages ind < 0 ', pages);
        onUpdateContext({ pages, loading: true });
        return;
      }
      pages = gData[0].pages;
      console.log('obje', gData[index]);
      onUpdateContext({ pages, loading: true });

      return;
    }
    index = gData.findIndex(item => item.key == keyItem[0]);

    if (index < 0) {
      index = gData[1].children.findIndex(item => item.key == keyItem[0]);
      pages = gData[1].children[index].pages;
      onUpdateContext({ pages, loading: true });
      return;
    }
    pages = gData[1].pages;
    console.log('pages parent 4', pages);
    onUpdateContext({ pages, loading: true });

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
          <TreeNode key={item.key} title={item.title}>
            {this._renderTreeNode(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode style={{ height: 40 }} key={item.key} title={item.title} />
        //   {/* <img src={'https://img.icons8.com/plasticine/344/user.png'} style={{ width: 20, height: 20 }}></img>
        // </div> */}
      );
    });
  render() {
    const { gData, checkedKeys, isCheckedAll } = this.state;
    return (
      <AppContext.Consumer>
        {({ onUpdateContext, loading }) => (
          <div className={styles.treeContainer}>
            <div className={styles.hozLine}>
              <div className={styles.chooseAll}>
                <Checkbox checked={isCheckedAll} onChange={this._onCheckedAll}>
                  Chọn tất cả
                </Checkbox>
              </div>
            </div>
            <Tree
              disabled={loading}
              showIcon
              checkable
              className="draggable-tree"
              defaultExpandedKeys={this.state.expandedKeys}
              draggable
              blockNode
              defaultSelectedKeys={['0-0']}
              checkedKeys={checkedKeys}
              onSelect={item => {
                this._handleSelectItem(item, onUpdateContext);
              }}
              onCheck={this._onChecked}
              // onDragEnter={this.onDragEnter}
              onDrop={this._onDrop}
            >
              {this._renderTreeNode(gData)}
            </Tree>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}
export default PdfTree;
