import React, { Component } from 'react';
import { Tree, Checkbox, Icon } from 'antd';
const { TreeNode } = Tree;
import { AppContext } from '../../../../../contexts/AppContext';
import styles from './style.module.less';
import 'antd/dist/antd.css';
const gData = [
  {
    title: 'Bảng xác định giá trị khối',
    key: '0-0',
    children: [],
    pdfUrl: '/pdf_sample_abc.pdf',
  },
  { title: 'Gói thầu tư', key: '0-1', children: [], pdfUrl: '/sample.pdf' },
  { title: '25/2016/HĐ/TVGS', key: '0-2', children: [], pdfUrl: '/file-sample_150kB.pdf' },
  { title: 'Biên bản thanh lý hợp đồng giám sát', key: '0-3', children: [], pdfUrl: '/sample.pdf' },
  { title: 'Biên bản thanh lý hợp đồng', key: '0-4', children: [], pdfUrl: '/pdf_sample_abc.pdf' },
  { title: '301/QĐ-UBND', key: '0-5', children: [], pdfUrl: '/file-sample_150kB.pdf' },
  { title: 'Hợp đồng kiểm toán', key: '0-6', children: [], pdfUrl: '/sample.pdf' },
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
// const generateData = (_level, _preKey, _tns) => {
//   const preKey = _preKey || '0';
//   const tns = _tns || gData;

//   const children = [];
//   for (let i = 0; i < x; i++) {
//     const key = `${preKey}-${i}`;
//     tns.push({ title: key, key });
//     if (i < y) {
//       children.push(key);
//     }
//   }
//   if (_level < 0) {
//     console.log('tns generate,', tns);

//     return tns;
//   }
//   const level = _level - 1;
//   children.forEach((key, index) => {
//     tns[index].children = [];
//     return generateData(level, key, tns[index].children);
//   });
// };
// generateData(1, '0', []);
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
  componentDidMount() {}
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
    // console.log('dataa after handle', data);

    this.setState({
      gData: data,
    });
  };
  _handleSelectItem = (keyItem, onUpdateContext: any) => {
    if (keyItem.length < 1) {
      return;
    }
    let index = gData.findIndex(item => item.key == keyItem[0]);
    console.log('item', gData[index]);

    let pdfUrl = gData[index].pdfUrl;
    onUpdateContext({ pdfUrl });
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
          <TreeNode key={item.key} icon={this._renderAvatar(item)} title={item.title}>
            {this._renderTreeNode(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode style={{ height: 40 }} icon={this._renderAvatar(item)} key={item.key} title={item.title} />
        //   {/* <img src={'https://img.icons8.com/plasticine/344/user.png'} style={{ width: 20, height: 20 }}></img>
        // </div> */}
      );
    });
  render() {
    const { gData, checkedKeys, isCheckedAll } = this.state;
    return (
      <AppContext.Consumer>
        {({ onUpdateContext }) => (
          <div>
            <div className={styles.hozLine}>
              <div className={styles.chooseAll}>
                <Checkbox checked={isCheckedAll} onChange={this._onCheckedAll}>
                  Chọn tất cả
                </Checkbox>
              </div>
            </div>
            <Tree
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
