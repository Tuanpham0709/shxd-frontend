import React, { Component } from 'react';
import Content from './Content';
import styles from './style.module.less';
import HeaderBar from './HeaderBar';
class ProjectContent extends Component {
  render() {
    return (
      <div className={styles.container}>
        <HeaderBar />
        <Content />
      </div>
    );
  }
}
export default ProjectContent;
