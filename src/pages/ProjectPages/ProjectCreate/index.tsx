import React, { Component } from 'react';
// import { Button, Layout } from 'antd';
// import styles from './style.module.less';
import ProjectInfo from './components/ProjectInfo';
import ProjectContent from './components/Content/index';

const infoClient = [
  { type: 'Mã công trình', content: 'NQ 307 NPCP' },
  { type: 'Tên khách hàng', content: 'Ban QLDA thành phố Đồng Hới' },
  { type: 'Người thực hiện', content: 'Nguyễn Văn A' },
  { type: 'Ngày bắt đầu lập hồ sơ', content: '03/12/2019' },
];

class Files extends Component {
  render() {
    return (
      <div>
        <ProjectInfo {...infoClient} />
        <ProjectContent />
      </div>
    );
  }
}
export default Files;
