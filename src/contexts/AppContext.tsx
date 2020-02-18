import React, { Component } from 'react';
import { PartnerInterface } from './type';
import { GetCMSUser_cmsGetUsers_users, GetDocuments_getDocuments_documents_treeNode } from '../graphql/types'
import { NodeInput } from '../graphql/types'
interface FilesPosition {
  filesNote?: (string | null)[] | null;
  filesPositionMediaId?: (string | null)[] | null;
  filesPositionMedia?: {
    _id: string;
    uri: string;
  }
}
interface NodeInfo {
  key?: string | null;
  parent?: string | null;
  documentName?: string;
  agencyIssued?: string | null;
  issuedDate?: any | null;
  note?: string | null;
  filesPosition?: FilesPosition[];
  nodeMediaId?: string | null;
  nodeMedia?: {
    _id: string;
    uri: string;
  }
}
export interface ParamsContext {
  partnerContext?: PartnerInterface;
  staffContext?: GetCMSUser_cmsGetUsers_users;
  pdfRenderedContext?: any[];
  loadingUploadFile?: boolean;
  nodeInfo?: NodeInfo;
  nodeChecked?: NodeInfo[];
  treeNode?: GetDocuments_getDocuments_documents_treeNode[];
  onUpdateTreeNode?: (treeNode: NodeInput[]) => Promise<any>;
  onUpdateNodeInfo?: (nodeInfo: NodeInput) => void;

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
  partnerContext: null,
  staffContext: null,
  pdfRenderedContext: [],
  loadingUploadFile: null,
  nodeInfo: null,
  nodeChecked: null,
  treeNode: []
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
    partnerContext: null,
    staffContext: null,
    pdfRenderedContext: [],
    loadingUploadFile: null,
    nodeChecked: null,
    treeNode: null
  };
  render() {
    return <AppContext.Provider value={{ ...this.state }}>{this.props.children}</AppContext.Provider>;
  }
}

export default AppProvider;
