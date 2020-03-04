import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
// import { Button, Layout } from 'antd';
import styles from './style.module.less';
import ProjectInfo from './ProjectInfo';
import HeaderBar from './HeaderBar';
import ShowProject from './ShowProject/index';
import { UpdateTreeNode, UpdateTreeNodeVariables, NodeInput, UpdateTreeNode_updateTreeNode_treeNode, Upload_file, Upload_fileVariables } from '../../graphql/types';
import { UPDATE_TREE_NODE } from '../../graphql/document/updateTreeNode'
// import { GET_DOCUMENT } from '../../graphql/document/getDocuments';
import EmptyFiles from './components/EmptyFiles';
import { Col, Row, Tree, Checkbox, Button, Input, Spin, Icon } from 'antd';
import { AppContext } from '../../contexts/AppContext';
import FlatToNested from 'flat-to-nested';
import { UPLOAD_FILE } from '../../graphql/media/createMedia';
const BUTTON_TYPE = {
  addNode: 0,
  addMedia: 1,
  share: 2,
  message: 3,
  copy: 4
}

const { TreeNode } = Tree;
export const WITHOUT_URI = "WITHOUT_URI";

export const useUpdateTreeNode = () => {
  const [updateTreeNode, { loading, error }] = useMutation<UpdateTreeNode, UpdateTreeNodeVariables>(UPDATE_TREE_NODE);
  return { updateTreeNode, loading, error }
}
// const useGetDocument = (documentId: string) => {
//   const { data, error, loading, refetch } = useQuery<GetDocument, GetDocumentVariables>(GET_DOCUMENT, {
//     variables: {
//       _id: documentId
//     }
//   })
//   return { data, error, loading, refetch }
// }
interface TreeState {
  checkedKeys: Array<string>;
  isCheckedAll: boolean;
  gData: any;
  treeNode: any[]
}
const initTreeData: TreeState = {
  checkedKeys: [],
  isCheckedAll: false,
  gData: [],
  treeNode: []

}
interface FileUploaded {
  nodeMediaId: string;
  documentName: string;
}
const useTreeViewerState = () => {
  const [treeState, setTreeState] = useState(initTreeData);
  return { treeState, setTreeState }
}
interface NodeObject extends UpdateTreeNode_updateTreeNode_treeNode {
  id?: string;
  title?: string;
  children?: Array<NodeObject>;
}
// const useGetDocument = (documentId: string) => {
//   const { data, error, loading, refetch } = useQuery<GetDocument, GetDocumentVariables>(GET_DOCUMENT, {
//     variables: {
//       _id: documentId
//     }
//   })
//   return {
//     data, error, loading, refetch
//   }

// }
const _onHandleNodesUpdate = (flatenData) => {
  const nodesUpdate = flatenData.map((item) => {
    const node: NodeInput = {
      key: item.key,
      parent: item.parent,
      documentName: item.documentName,
      agencyIssued: item.agencyIssued,
      issuedDate: item.issuedDate,
      note: item.note,
      filesPosition: item.filesPosition && item.filesPosition.map((item) => ({ filesPositionMediaId: item.filesPositionMediaId, note: item.node })),
      nodeMediaId: item.nodeMediaId,
    }
    return node;
  })
  return nodesUpdate
}

const handleTreeData = (treeData) => {
  let nestedData = flatToNested.convert(treeData);
  if (!Array.isArray(nestedData)) {
    if (nestedData.children && nestedData.key) {
      return [nestedData];
    }
    if (nestedData.children && !nestedData.key) {
      return nestedData.children
    }
    return [nestedData];
  }
  return nestedData;
}
export const _onHandleNestedToFlat = (gData: Array<NodeObject>) => {
  let newData: any[] = []
  const onCallbackHandleData = (children: Array<NodeObject>, parentKey: string) => {
    return children.map((item, index) => {
      if (item.children && item.children.length > 0) {
        onCallbackHandleData(item.children, item.key);
      }
      let node = {
        key: item.key,
        parent: parentKey,
        documentName: item.documentName,
        agencyIssued: item.agencyIssued,
        issuedDate: item.issuedDate,
        note: item.note,
        filesPosition: item.filesPosition,
        nodeMediaId: item.nodeMediaId,
        nodeMedia: item.nodeMedia
      }
      newData.push(node)
    })
  }

  gData.map((item) => {
    if (item.children && item.children.length > 0) {
      onCallbackHandleData(item.children, item.key);
    }
    let node = {
      key: item.key,
      parent: null,
      documentName: item.documentName,
      agencyIssued: item.agencyIssued,
      issuedDate: item.issuedDate,
      note: item.note,
      filesPosition: item.filesPosition,
      nodeMediaId: item.nodeMediaId,
      nodeMedia: item.nodeMedia
    }
    newData.push(node)
  })

  return newData;
}
const _onFindParentKeyCheckedNodes = (checkedKeys: string[], gData: Array<NodeObject>) => {
  let flatData = _onHandleNestedToFlat(gData);
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

  return {
    nodesParent,
    nodesChecked
  }
}
const _onHandleDrop = (info: any, gData: Array<NodeObject>) => {
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
        return loop(item.children, key, callback);
      }
    });
  };
  const data = [...gData];

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
      item.children.push(dragObj);
    });
  } else if (
    (info.node.props.children || []).length > 0 && // Has children
    info.node.props.expanded && // Is expanded
    dropPosition === 1 // On the bottom gap
  ) {
    loop(data, dropKey, item => {
      item.children = item.children || [];
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
  return data;
};
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
const useUploadFile = () => {
  const [uploadFile, { loading, error, data }] = useMutation<Upload_file, Upload_fileVariables>(UPLOAD_FILE);
  return { uploadFile, loading, error, data }
}
const flatToNested = new FlatToNested({ id: "key", parent: "parent", children: 'children' });
const Files = ({ location }) => {
  console.log("location ", location)
  const { uploadFile } = useUploadFile();
  const { treeState, setTreeState } = useTreeViewerState();
  const { onUpdateContext, filesUploaded } = useContext(AppContext)
  const { updateTreeNode } = useUpdateTreeNode();
  const [addMoreLoading, setAddMoreLoading] = useState(false);
  useEffect(() => {
    if (location.state.document.treeNode) {
      const { treeNode } = location.state.document;
      const newTreeNode = treeNode.map((item) => {
        let node = {
          key: item.key,
          parent: item.parent,
          documentName: item.documentName,
          agencyIssued: item.agencyIssued,
          issuedDate: item.issuedDate,
          note: item.note,
          filesPosition: item.filesPosition,
          nodeMediaId: item.nodeMediaId,
          nodeMedia: item.nodeMedia
        }
        return node;
      });
      const nestedData = handleTreeData(newTreeNode);
      setTreeState({ ...treeState, gData: nestedData, treeNode: treeNode })
      onUpdateContext({ onUpdateTreeNode: onUpdateDocument, treeNode: treeNode, mediaUri: newTreeNode[0].nodeMedia.uri, nodeInfo: newTreeNode[0] })
    }
    return () => {
      setTreeState({ ...treeState, gData: null, treeNode: [] })
      onUpdateContext({ onUpdateTreeNode: null, treeNode: null })
    }
  }, [location.state.document]);

  // const onRefetchDocument = () => {
  //   refetch();
  // }
  // const { data, refetch } = useGetDocument(location.state.document._id);
  // useEffect(() => {
  //   if (window.performance) {
  //     if (performance.navigation.type == 1) {
  //       refetch();
  //       if (data && data.getDocument.treeNode) {
  //         const nestedData = handleTreeData(data.getDocument.treeNode);
  //         setTreeState({ ...treeState, gData: nestedData, treeNode: data.getDocument.treeNode })
  //         onUpdateContext({ onUpdateTreeNode: onUpdateDocument, treeNode: data.getDocument.treeNode })
  //       }
  //     }
  //   }
  // }, [data])
  const onUpdateDocument = (treeNode: any[]) => {
    return new Promise((resolve, reject) => {
      if (treeNode && treeNode.length > 0) {
        updateTreeNode({ variables: { data: { treeNode }, documentId: location.state.document._id } }).then((res) => {
          resolve();
          const nestedData = handleTreeData(res.data.updateTreeNode.treeNode);
          const nestedToFlat = _onHandleNestedToFlat(nestedData);
          const flattenData = nestedToFlat.map((item) => {
            let node = item;
            if (node.children) {
              delete node.children
            }
            return node;
          })
          onUpdateContext({ treeNode: flattenData })
          setTreeState({ ...treeState, treeNode: flattenData, gData: nestedData });

        }).catch((error) => {
          reject();
          console.log("error update tree node", error);
        })
      }
    })

  }
  const onAddNode = (checkedKeys) => {
    if (checkedKeys.length > 0) {
      const { nodesChecked, nodesParent } = _onFindParentKeyCheckedNodes(checkedKeys, treeState.gData);
      let flatData = _onHandleNestedToFlat(treeState.gData);
      const newKey = flatData.length + 1
      const newNode = {
        key: `${newKey}`,
        parent: nodesParent[0] ? nodesParent[0].key : null,
        documentName: "Đầu mục",
      }
      const newNodePosition = flatData.findIndex((node) => node.key === nodesChecked[0].key);

      nodesChecked.forEach((nodeChecked) => {
        const index = flatData.findIndex((node) => node.key === nodeChecked.key);
        if (index > -1) {
          flatData.splice(index, 1);
        }
      })
      let newNodesChecked = nodesChecked.map((item) => {
        if (!item.parent || item.parent === null || nodesParent[0] && (item.parent === nodesParent[0].key)) {
          return {
            ...item, parent: `${newKey + ""}`
          }
        }
        return { ...item }
      });

      if (newNodePosition < 1) {
        flatData.unshift(newNode);
      } else {
        flatData.splice(newNodePosition, 0, newNode);
      }


      const newFlattenData = [...flatData, ...newNodesChecked];
      const nodesUpdate = _onHandleNodesUpdate(newFlattenData);
      onUpdateDocument(nodesUpdate);
    }
  }
  const onSuccessUpload = () => {
    // console.log("Nodes : : : : :: : : : :", nodes)
    const nodesHandled = filesUploaded.map((item, index) => ({
      ...item, key: `${index}`
    }))
    updateTreeNode({ variables: { data: { treeNode: nodesHandled }, documentId: location.state.document._id } }).then((res) => {
      const nestedData = handleTreeData(res.data.updateTreeNode.treeNode);
      setTreeState({ ...treeState, treeNode: res.data.updateTreeNode.treeNode, gData: nestedData });
      onUpdateContext({ loadingUploadFile: false, filesUploaded: [] });
    }).catch((error) => {
      onUpdateContext({ loadingUploadFile: false, filesUploaded: [] });
    })
  }
  const onDropNode = (info) => {
    const dropData = _onHandleDrop(info, treeState.gData);
    setTreeState({ ...treeState, gData: dropData })
    const flattenData = _onHandleNestedToFlat(dropData);
    const nodesUpdate = _onHandleNodesUpdate(flattenData);
    onUpdateDocument(nodesUpdate);

  }

  const onCheckAll = (event) => {
    const { checked } = event.target;
    if (checked) {
      const flatData = _onHandleNestedToFlat(treeState.gData);
      setTreeState({ ...treeState, checkedKeys: flatData.map((item) => (item.key)), isCheckedAll: true });
      return;
    }
    setTreeState({ ...treeState, checkedKeys: [], isCheckedAll: false });
  }
  const onClickBtnBar = (index) => {
    if (BUTTON_TYPE.addNode === index) {
      onAddNode(treeState.checkedKeys);
    }
  }
  const _handleSelectItem = (selectedKeys, event) => {
    if (event.selected) {
      const data = _onHandleNestedToFlat(treeState.gData);

      const flattenData = data.map((item) => {
        let node = item;
        if (node.children) {
          delete node.children
        }
        return node;
      })
      let nodeSelected = flattenData.find((item) => (selectedKeys[0] === item.key));
      if (nodeSelected.children) {
        delete nodeSelected.children
      }
      const nodeInfo = nodeSelected;
      onUpdateContext({ nodeInfo, treeNode: flattenData, mediaUri: nodeInfo.nodeMedia && nodeInfo.nodeMedia.uri });
    }
    // let index = gData.findIndex(item);
  };
  const onChecked = async (keys: any, event) => {
    const flatData = _onHandleNestedToFlat(treeState.gData);
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
  };
  const nodesShortened = treeState.treeNode && treeState.treeNode.map((item) => {
    if (item.nodeMedia) {
      return {
        key: item.key,
        uri: item.nodeMedia.uri
      }
    }
    return {
      key: item.key,
      uri: null
    }
  })
  const onHandleAddMoreNodes = (nodes: FileUploaded[]) => {
    if (!nodes || nodes.length === 0) {
      return;
    }
    const { treeNode } = treeState;
    const nodesInput = treeNode.map((item) => {
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
      return node;
    });
    const totalNodes = treeNode.length;
    const newNodes = nodes.map((item, index) => {
      return {
        ...item, key: `${totalNodes + index}`
      }
    })
    const newTreeNode = [...nodesInput, ...newNodes];
    console.log("log new trendoe ", newTreeNode);
    onUpdateDocument(newTreeNode).then(() => {
      setAddMoreLoading(false);
    }).catch(() => {
      setAddMoreLoading(false);
    })
  }
  const onAddMoreFile = (e) => {
    let fileCount = 0;
    let { files } = e.target;
    if (!files) return;
    let filesList = [...files];
    let fileNodeInput: FileUploaded[] = []
    setAddMoreLoading(true);
    filesList.forEach((file, index) => {
      uploadFile({
        variables: {
          dimensions: {
            width: 0, height: 0
          },
          file
        }
      }).then((response) => {
        fileCount++;
        fileNodeInput.push({ nodeMediaId: response.data.uploadPhoto._id, documentName: file.name });
        if (fileCount === files.length) {
          onHandleAddMoreNodes(fileNodeInput)
        }
      }).catch((err) => {
        fileCount++;
        if (fileCount === files.length) {
          onHandleAddMoreNodes(fileNodeInput)
        }
      })
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
              <div className={styles.filterContainer}>
                <div className={styles.searchContainer}>
                  <Search className={styles.search} size="small" />
                </div>
                <div className={styles.miniToolbar}>
                  {toolBtnDataProps.map((item: any, index: number) => {
                    if (index === 1) {
                      return (<div className={styles.btnIcon} key={index + ''} style={{ position: "relative", display: "flex", justifyContent: "center" }} >
                        {addMoreLoading ? <Spin style={{ alignSelf: "center" }} indicator={<Icon type="loading" style={{ fontSize: 20, color: "#007BD7" }} spin />} /> :
                          (<div style={{ position: "relative", display: "flex", justifyContent: "center", flex: 1 }}>   <input
                            multiple
                            type="file"
                            accept="application/pdf"
                            className={styles.inputUpload}
                            onChange={onAddMoreFile}
                            key={index + ''} />
                            <i className={item.icon} style={{ alignSelf: "center" }}></i></div>)}

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
                        onDrop={onDropNode}
                      >
                        {_renderTreeNode(treeState.gData)}
                      </Tree>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xl={17}>
              {!treeState.treeNode || treeState.treeNode.length === 0 ? <EmptyFiles onUploadSuccess={onSuccessUpload} /> : <ShowProject nodesShortened={nodesShortened} />}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default Files;