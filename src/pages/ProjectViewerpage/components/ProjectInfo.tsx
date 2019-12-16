import React from 'react';
import styles from '../style.module.less';
interface Info {
  type: string;
  content: string;
}
const ProjectInfo = (props: any) => {
  const infoClient = [
    { type: 'Mã công trình', content: 'NQ 307 NPCP' },
    { type: 'Tên khách hàng', content: 'Ban QLDA thành phố Đồng Hới' },
    { type: 'Người thực hiện', content: 'Nguyễn Văn A' },
    { type: 'Ngày bắt đầu lập hồ sơ', content: '03/12/2019' },
  ];
  return (
    <div className={styles.titleContainer}>
      <span className={styles.title}>Cải thiện chụ sở UBND tỉnh Quảng Bình</span>
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
