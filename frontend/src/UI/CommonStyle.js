import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 30px 50px 30px 50px;
  flex-direction: column;
  margin-bottom: 50px;
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

const ProductFormContainer = styled.div`
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
  input {
    text-align: center;
    display: block;
    margin-bottom: 10px;
    width: 100%;
    height: 30px;
  }
  span {
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
  }
  button,
  input[type="submit"] {
    background-color: turquoise;
    font-size: large;
    border: 1px solid lightblue;
    border-radius: 8px;
    width: 45%;
    height: 45%;
    cursor: pointer;
  }
`;

const Button = styled.button`
  background-color: turquoise;
  font-size: large;
  border: 1px solid lightblue;
  border-radius: 8px;
  width: 40%;
  margin: 10px;
  height: 0%;
  cursor: pointer;
  font-size: 16px;
  padding: 5px;
  color: black;
`;

export { Container, FormContainer, ProductFormContainer, Button };
