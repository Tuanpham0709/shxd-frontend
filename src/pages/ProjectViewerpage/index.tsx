import React from 'react';
// import { Button, Layout } from 'antd';
import styles from './style.module.less'
import ProjectInfo from './ProjectInfo';
import HeaderBar from './HeaderBar'
import WorkingTree from './WorkingTree/index'
import ShowProject from './ShowProject/index'
import { Col, Row } from 'antd'
const infoClient = [
  { type: 'Mã công trình', content: 'NQ 307 NPCP' },
  { type: 'Tên khách hàng', content: 'Ban QLDA thành phố Đồng Hới' },
  { type: 'Người thực hiện', content: 'Nguyễn Văn A' },
  { type: 'Ngày bắt đầu lập hồ sơ', content: '03/12/2019' },
];

const Files = () => {
  return (
    <div>
      <ProjectInfo {...infoClient} />
      <div className={styles.container}>
        <HeaderBar />
        <div>
          <Row>
            <Col xl={7}>
              <WorkingTree />
            </Col>
            <Col xl={17}>
              <ShowProject />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default Files;
