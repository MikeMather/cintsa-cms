import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingAnimation = keyframes`
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`;

const LoaderContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  div {
    position: absolute;
    border: 4px solid ${props => props.theme.colors.secondary};
    opacity: 1;
    border-radius: 50%;
    animation: ${LoadingAnimation} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  div:nth-child(2) {
    animation-delay: -0.5s;
  }
`;

const Loading = (): JSX.Element => (
  <LoaderContainer>
    <div></div>
    <div></div>
  </LoaderContainer>
);

export default Loading;