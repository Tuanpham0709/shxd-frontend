import React, { Component } from 'react';
import { PartnerInterface } from './type';
import { GetCMSUser_cmsGetUsers_users } from '../graphql/types'
import { UpdateTreeNode_updateTreeNode_treeNode } from '../graphql/types'
interface NodeInfo extends UpdateTreeNode_updateTreeNode_treeNode {
  children?: Array<NodeInfo>;
  documentId: string;
}
interface NodeBaseInfo {
  documentName: string;
  agencyIssued: string;
  issuedDate: string;
}
export interface ParamsContext {
  loading?: boolean;
  partnerContext?: PartnerInterface;
  staffContext?: GetCMSUser_cmsGetUsers_users;
  pdfRenderedContext?: any[];
  loadingUploadFile?: boolean;
  nodeInfo?: NodeInfo;
  treeNode?: UpdateTreeNode_updateTreeNode_treeNode[];
  nodeChecked?: NodeInfo[];
  nodeBaseInfo?: NodeBaseInfo;
  onUpdateTreeNode?: () => void;
}
export interface AppContextInterface extends ParamsContext {
  dummy: any;
  collapsedSidebar: boolean;
  onUpdateContext: (params: ParamsContext) => void;
}
export const AppContext = React.createContext<AppContextInterface>({
  dummy: null,
  collapsedSidebar: false,
  onUpdateContext: context => context,
  loading: false,
  partnerContext: null,
  staffContext: null,
  pdfRenderedContext: [],
  loadingUploadFile: null,
  nodeInfo: null,
  nodeChecked: null,
  nodeBaseInfo: null,
  treeNode: null
});
export class AppProvider extends Component {
  onUpdateContext = context => {
    const newContext = { ...this.state, ...context };
    this.setState(newContext);
  };
  state: AppContextInterface = {
    dummy: null,
    collapsedSidebar: false,
    onUpdateContext: this.onUpdateContext,
    nodeInfo: null,
    loading: false,
    partnerContext: null,
    staffContext: null,
    pdfRenderedContext: [],
    loadingUploadFile: null,
    nodeChecked: null,
    nodeBaseInfo: null,
    treeNode: null
  };
  render() {
    return <AppContext.Provider value={{ ...this.state }}>{this.props.children}</AppContext.Provider>;
  }
}

export default AppProvider;
