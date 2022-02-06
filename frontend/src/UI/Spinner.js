import React from "react";
import "./Spinner.css";
import styled from "styled-components";

const Container = styled.div`
  background: gray;
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1300;
  background: transparent;
`;
const ContentBox = styled.div`
  line-height: 50;
  margin-left: auto;
  margin-right: auto;
  width: 40px;
`;

export default function Spinner(props) {
  const overlayStyle = props.overlay
    ? { background: "#CCCCCC", opacity: "0.5" }
    : {};

  return (
    <Container style={overlayStyle}>
      <ContentBox>
        <div className="ispinner gray animating ispinner-large">
          <div className="ispinner-blade"></div>
          <div className="ispinner-blade"></div>
          <div className="ispinner-blade"></div>
          <div className="ispinner-blade"></div>
          <div className="ispinner-blade"></div>
          <div className="ispinner-blade"></div>
          <div className="ispinner-blade"></div>
          <div className="ispinner-blade"></div>
          <div className="ispinner-blade"></div>
          <div className="ispinner-blade"></div>
          <div className="ispinner-blade"></div>
          <div className="ispinner-blade"></div>
        </div>
      </ContentBox>
    </Container>
  );
}
