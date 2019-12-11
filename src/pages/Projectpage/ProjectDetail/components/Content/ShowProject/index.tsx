import React from 'react';
import Toolbar from './Toolbar';
import ViewPdf from './ViewPdf.';
import styles from './style.module.less';
class ShowProject extends React.Component {
  state: {};

  render() {
    return (
      <div className={styles.showProject}>
        <Toolbar />
        <ViewPdf />
      </div>
    );
  }
}
export default ShowProject;
