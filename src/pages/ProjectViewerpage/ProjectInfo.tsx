import React from 'react';
import styles from './style.module.less';
interface Info {
  type: string;
  content: string;
}
interface IProps {
  document: any
}
const ProjectInfo: React.FC<IProps> = ({ document }) => {
  const infos = () => {
    let infoPs = [];
    infoPs.push({
      type: "Mã công trình",
      content: document && document.projectCode
    })
    infoPs.push({
      type: 'Tên khách hàng',
      content: document && document.partnerName
    })
    infoPs.push({
      type: 'Người thực hiện',
      content: document && document.implementer
    })
    infoPs.push({
      type: 'Ngày bắt đầu lập hồ sơ',
      content: document && document.createdAt
    })
    return infoPs
  }
  return (
    <div className={styles.titleContainer}>
      <span className={styles.title}>{document && document.projectName}</span>
      <div className={styles.flRight}>
        {infos().map((item: Info, index: number) => {
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
