import React from 'react';
import styled from 'styled-components';
import Avatar from './AvatarDropdown';
import styles from './index.less';

const StyledContainer = styled.div`
  display: flex;
  height: 48px;
  margin-top: 7px;
  align-items: center;
  .ant-dropdown-trigger {
    line-height: 48px;
  }
  .ant-avatar {
    margin: 0 20px;
  }
  i {
    font-size: 18px;
    color: #777;
  }
`;


const GlobalHeaderRight: React.SFC<any> = props => {
  let className = styles.right;

  return (
    <StyledContainer className={className}>
      <Avatar menu />
    </StyledContainer>
  );
};

export default GlobalHeaderRight;
