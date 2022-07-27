import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: calc(100vh - 100px);
`;

const StyledImg = styled.img`
  width: ${({ width }) => width ?? '100%'};
  height: auto;
`;
const Guide = () => {
  return (
    <Wrapper>
      {[...Array(21).keys()].map((n) => (
        <StyledImg key={n} src={`/guide/${n + 1}.jpg`}  />
      ))}
    </Wrapper>
  );
};

export default Guide;
