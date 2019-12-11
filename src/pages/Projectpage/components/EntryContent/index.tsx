import React, { Component } from 'react';
import EditableTable from './EditableTable';
import styles from './style.module.less';

class ProjectCustomer extends Component {
  render() {
    return (
      <div className={styles.container}>
        <EditableTable />
      </div>
    );
  }
}
export default ProjectCustomer;
