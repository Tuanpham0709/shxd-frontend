import React from 'react';
import EntryHeader from './components/EntryHeader';
import EditableTable from './components/EntryContent/EditableTable';
import HeaderBar from './components/EntryContent/HeaderBar';
import styles from './style.module.less'
const Staffs = () => {
  return (
    <div style={{ flex: 1 }}>
      <EntryHeader />
      <div className = {styles.border}>
        <HeaderBar />
        <EditableTable />
      </div>
    </div>
  );
};
export default Staffs;
