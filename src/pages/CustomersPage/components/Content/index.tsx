import React, { Component } from 'react';
// import CustomerManage from './CustomerManage';
import EditableTable from './EditableTable';
import HeaderBar from './HeaderBar';
import styles from './style.module.less';

class ProjectCustomer extends Component {
  render() {
    return (
      <div className={styles.container}>
        <HeaderBar />
        <EditableTable />
      </div>
    );
  }
}
export default ProjectCustomer;
