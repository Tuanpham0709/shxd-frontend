import React from 'react';
import styled from 'styled-components';
import styles from '../style.module.less';

const VisualImage = styled.div`
  text-align: center;
  img {
    display: inline-block;
  }
`;
const Title = styled.h2`
  margin: 100px 0;
`;
class WorkingTree extends React.Component {
  render() {
    return (
      <div className={styles.filterContainer}>
        <Title className={`${styles.textCenter}`}>THÔNG TIN NHÂN VIÊN</Title>
        <VisualImage>
          <img src={require('./img/visualphoto.png')} alt="Tông tin nhân viên" />
        </VisualImage>
      </div>
    );
  }
}
export default WorkingTree;