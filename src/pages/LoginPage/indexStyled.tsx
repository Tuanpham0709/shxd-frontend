
import styled from 'styled-components';

const Styled = {
  Container: styled.div`
  background-color: #eeeeee;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99999;
  display: flex;
  .container{
    background-color: #fff;
    align-items: center;
    width: 400px;
    min-height: 300px;
    max-width: 100vw;
    max-height: 100vh;
    margin: auto;
    box-shadow: 0 0 7px 2px rgba(0,0,0,0.1);
    padding: 0 15px;
    box-sizing: border-box;
    .title{
      box-shadow: none;
      text-align: center;
      font-size: 24px;
      font-weight: 400;
      padding: 15px 0;
      text-transform: uppercase;
      color: #444444;
      border-bottom: solid 1px #eeeeee;
    }
    .ant-form{
      box-shadow: none;
      .login-form-button {
        width: 100%;
      }
    }
    .text-danger{
      box-shadow: none;
      color: red;
    }
    ul{
      list-style: circle;
    }
  }
`,
};
export default Styled
