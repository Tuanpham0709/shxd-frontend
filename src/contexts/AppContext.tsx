import React, { Component } from 'react';

export interface AppContextInterface {
  dummy: any;
  collapsedSidebar: boolean;
  onUpdateContext: (...params: any) => void;
  pdfUrl: string;
}

export const AppContext = React.createContext<AppContextInterface>({
  dummy: null,
  collapsedSidebar: false,
  onUpdateContext: context => context,
  pdfUrl: '/file-sample_150kB.pdf',
});

export class AppProvider extends Component {
  onUpdateContext = context => {
    const newContext = { ...this.state, ...context };
    this.setState(newContext);
  };
  state = {
    dummy: null,
    collapsedSidebar: false,
    onUpdateContext: this.onUpdateContext,
    pdfUrl: '/file-sample_150kB.pdf',
  };
  render() {
    return <AppContext.Provider value={{ ...this.state }}>{this.props.children}</AppContext.Provider>;
  }
}

export default AppProvider;
