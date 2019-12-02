import styled from 'styled-components';

const Styled = {
  Container: styled.div`
    .content{
      background: #fff;
      padding: 15px;
      box-sizing: border-box;
      min-height: 80vh;
    }
   
    .ant-btn-sm {
      padding: 0;
      height: auto;
      &.btn-rectangle{
        padding: 2px 5px;
      }
    }
  `,
};
export default Styled;
