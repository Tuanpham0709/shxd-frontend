import React, { Component } from 'react';
import styles from './style.module.less';
// import { Button } from 'antd';
import pdfjsLib from 'pdfjs-dist/webpack';
const url = 'compressed.tracemonkey-pldi-09.pdf';
class ViewPdf extends Component {
  state: {
    doc: any;
  };
  componentDidMount() {
    let loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(
      doc => {
        console.log('Document need render', doc);
        this.setState(doc);
      },
      err => {
        console.log('Error:  ', err);
      },
    );
  }
  render() {
    return <div className={styles.fileContainer}></div>;
  }
}

export default ViewPdf;
