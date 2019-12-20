import React, { Component } from 'react';

export interface AppContextInterface {
  dummy: any;
  collapsedSidebar: boolean;
  onUpdateContext: (...params: any) => void;
  pages: number[];
  loading: boolean;
}

export const AppContext = React.createContext<AppContextInterface>({
  dummy: null,
  collapsedSidebar: false,
  onUpdateContext: context => context,
  pages: [2],
  loading: false,
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
    pages: [2],
    loading: false,
  };
  render() {
    return <AppContext.Provider value={{ ...this.state }}>{this.props.children}</AppContext.Provider>;
  }
}

export default AppProvider;
