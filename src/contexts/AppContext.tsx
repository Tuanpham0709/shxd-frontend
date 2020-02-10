import React, { Component } from 'react';
import { PartnerInterface } from './type';
import { GetCMSUser_cmsGetUsers_users } from '../graphql/types'
export interface ParamsContext {
  pages?: number[];
  loading?: boolean;
  partnerContext?: PartnerInterface;
  staffContext?: GetCMSUser_cmsGetUsers_users;
  pdfRenderedContext?: any[];
  loadingUploadFile?: boolean;
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
  pages: [2],
  loading: false,
  partnerContext: null,
  staffContext: null,
  pdfRenderedContext: [],
  loadingUploadFile: null
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
    pages: [2],
    loading: false,
    partnerContext: null,
    staffContext: null,
    pdfRenderedContext: [],
    loadingUploadFile: null
  };
  render() {
    return <AppContext.Provider value={{ ...this.state }}>{this.props.children}</AppContext.Provider>;
  }
}

export default AppProvider;
