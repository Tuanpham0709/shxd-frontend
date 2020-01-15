import React from 'react';
import styles from './style.module.less';
interface Info {
  type: string;
  content: string;
}
const ProjectInfo = (props: any) => {
  const infoClient = [
    { type: 'Mã công trình', content: 'QĐ 783/QĐ-UBND' },
    { type: 'Tên khách hàng', content: 'UBND phường Thanh Nhàn' },
    { type: 'Người thực hiện', content: 'Nguyễn Văn B' },
    { type: 'Ngày bắt đầu lập hồ sơ', content: '03/12/2016' },
  ];
  return (
    <div className={styles.titleContainer}>
      <span className={styles.title}>HỒ SƠ QUYẾT TOÁN DỰ ÁN HOÀN THÀNH</span>
      <div className={styles.flRight}>
        {infoClient.map((item: Info, index: number) => {
          return (
            <div key={index + ''} className={styles.col}>
              <span className={styles.textInfo}>{item.content}</span>
              <br />
              <span className={styles.textType}>{item.type}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ProjectInfo;
