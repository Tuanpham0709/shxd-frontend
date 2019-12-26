import React, { PureComponent } from 'react';
// import pdfjs from 'pdfjs-dist';
interface IState {
  svg: any;
}
interface IProps {
  page: any;
  scale: number;
}
// const CMAP_URL = require('../../../../../../node_modules/pdfjs-dist/cmaps/');
export class PageSVG extends PureComponent<IProps, IState> {
  state: IState = {
    svg: null,
  };
  refContainer: null;
  renderer: null;
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return <div ref={this.refContainer}></div>;
  }
}
