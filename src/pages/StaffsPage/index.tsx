import React from 'react';
import EntryHeader from './components/EntryHeader';
import EditableTable from './EditableTable';
import HeaderBar from './HeaderBar';
const Staffs = () => {
  return (
    <div style={{ flex: 1 }}>
      <EntryHeader />
      <div>
        <HeaderBar />
        <EditableTable />
      </div>
    </div>
  );
};
export default Staffs;
