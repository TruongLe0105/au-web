import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledButton, Text } from '../SwapBoard';
import { motion } from 'framer-motion';

const StyledImage = styled.img`
  width: ${({ width }) => width ?? '100%'};
  height: auto;
`;
const Wrapper = styled.div`
  min-height: calc(100vh - 100px);
  display: flex;
`;

const LeftContent = styled.div`
  max-width: 400px;
`;

const RightContent = styled.div``;

const variants = {
  hide: {
    x: '-20%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

const StyledLinkBtn = styled(StyledButton)`
  :hover {
    color:#fff;
  }
`

const Home = () => {
  return (
    <Wrapper
      as={motion.div}
      className="container py-2 py-md-0"
      variants={variants}
      initial="hide"
      animate="visible"
      exit="hide"
    >
      <div className="my-auto d-flex justify-content-between w-100 flex-column-reverse flex-md-row align-items-center">
        <LeftContent>
          <Text fontFamily="Playfair" textTransform="uppercase" color="#000" mb="2rem">
            Swap Tokens Easily and Securely
          </Text>
          <Text color="#141414" lineHeight="32px" fontWeight="400" fontSize="17px" mb="1rem">
            Snail House Token Swap makes it simple to exchange old tokens for new tokens. Snail House tokens can be
            exchanged for Stargram tokens (ERC20) and GSMT tokens (ERC20).
          </Text>
          <Text color="#8b8b8b" lineHeight="24px" fontWeight="400" fontSize="15px" mb="2rem" style={{fontStyle:'italic'}}>
            <span style={{ color: 'red' }}>Note: </span>
            The converted tokens will be locked within 1 year. The GAS fee will be charged, and the transaction will be
            canceled when the token is locked at Metamask.
          </Text>
          <StyledLinkBtn as={Link} to="/swap" style={{ textDecoration: 'unset' }}>
            Swap now
          </StyledLinkBtn>
        </LeftContent>
        <RightContent className="mb-5 mb-md-0">
          <StyledImage src="/images/home-image.png" alt="home-art" />
        </RightContent>
      </div>
    </Wrapper>
  );
};
export default Home;
