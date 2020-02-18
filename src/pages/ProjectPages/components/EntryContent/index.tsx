import React from 'react';
import { Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { documentColumnProps } from '../../../DefinePropsTable';
import { GetDocuments_getDocuments_documents } from '../../../../graphql/types';
import './style.module.less';
import moment from 'moment';
interface IProps {
  data: GetDocuments_getDocuments_documents[];
}
const STATUS = {
  "PENDING": { color: '#E65A4D66', text: 'Chờ phê duyêt' },
  "COMPLETED": { color: ' #00B89466 ', text: 'Hoàn thành' },
  "IN_PROGRESSING": { color: '#007BD766', text: 'Đang thực hiên ' },
};
const statusComponent = (status) => {
  const sta = STATUS[status];
  return (<span>
    <Tag style={{ width: '100%', textAlign: "center" }} color={sta.color}>
      {sta.text}
    </Tag>
  </span>)
}
const linkToDetailComponent = (text: string, record: any) => (<Link to={{
  pathname: "/project/detail",
  state: {
    document: record
  }
}} style={{ textDecoration: "underline", color: "#333132" }}>Xem chi tiết </Link>)
const missingFileComponent = (text: string, record: any) => (<Link to="/project" style={{ textDecoration: "underline", color: "#333132" }}>Xem chi tiết</Link>)
const columnProps = documentColumnProps.map((item, index) => {
  if (index === documentColumnProps.length - 2) return { ...item, render: missingFileComponent };
  if (index === documentColumnProps.length - 3) return { ...item, render: linkToDetailComponent };
  if (index === documentColumnProps.length - 4) {
    return { ...item, render: statusComponent }
  }
  return { ...item }
});
const EditableTable: React.FC<IProps> = ({ data }) => {
  const handleData = data.map((dataItem, index) => {
    return {
      ...dataItem, reviewer: dataItem.reviewer.fullName, implementer: dataItem.cmsUser.fullName,
      createdAt: moment(dataItem.createdAt).format("DD-MM-YYYY")
    }
  });
  console.log("handle data", handleData);
  return <Table dataSource={handleData} columns={columnProps} />;
};
export default EditableTable;
