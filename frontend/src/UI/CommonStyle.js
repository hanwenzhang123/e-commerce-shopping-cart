import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 30px 50px 30px 50px;
  flex-direction: column;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 60px;
  flex-direction: column;
  input {
    margin: 20px;
    width: 30%;
    height: 30px;
  }
  input[type="submit"] {
    background-color: turquoise;
    font-size: large;
    border: 1px solid lightblue;
    border-radius: 8px;
    width: 20%;
    cursor: pointer;
  }
`;

export { Container, FormContainer };
