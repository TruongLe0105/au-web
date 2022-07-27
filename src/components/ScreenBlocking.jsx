import React from "react";
import styled, { keyframes } from "styled-components";

const OverLay = styled.div`
  position: fixed;
  z-index: 100000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
`;

const SpinnerWrapper = styled.div`
  margin: auto;
  text-align: center;
`;

const SpinnerLoader = styled.div`
  width: 2rem;
  height: 2rem;
`;

const dots = keyframes`
  0%, 20% {
    color: rgba(0,0,0,0);
    text-shadow:
      .25em 0 0 rgba(0,0,0,0),
      .5em 0 0 rgba(0,0,0,0);}
  40% {
    color: #000;
    text-shadow:
      .25em 0 0 rgba(0,0,0,0),
      .5em 0 0 rgba(0,0,0,0);}
  60% {
    text-shadow:
      .25em 0 0 #000,
      .5em 0 0 rgba(0,0,0,0);}
  80%, 100% {
    text-shadow:
      .25em 0 0 #000
      .5em 0 0 #000;}

`;

const LoadingText = styled.div`
  :after {
    content: " .";
    animation: ${dots} 2s steps(5, end) infinite;
  }
`;

const ScreenBlocking = ({ isLoading }) => {
  return (
    isLoading && (
      <OverLay>
        <SpinnerWrapper>
          <SpinnerLoader className="spinner-border text-primary" />
          <LoadingText className="text-center mt-2" style={{ color: "white", fontSize: 26 }}>
            Please wait for transaction
            <br />
          </LoadingText>
        </SpinnerWrapper>
      </OverLay>
    )
  );
};

export default ScreenBlocking;
