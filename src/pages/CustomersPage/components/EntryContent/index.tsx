import React from 'react';
import EditableTable from './EditableTable';
import HeaderBar from './HeaderBar';
import styles from './style.module.less';
const ProjectCustomer = () => {
  return (
    <div className={styles.container}>
      <HeaderBar />
      <EditableTable />
    </div>
  );
};
export default ProjectCustomer;
