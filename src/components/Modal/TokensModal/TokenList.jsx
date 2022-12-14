import React, { useEffect } from 'react';
import styled from 'styled-components';
import TokenInfor from './TokenInfor';

const Wrapper = styled.div`
  /* overflow: scroll; */
`;

const TokenList = ({ searchInput, handleClose, tokenList, onTokenChoose }) => {
  const [tokensArr, setTokensArr] = React.useState([]);

  useEffect(() => setTokensArr(tokenList), [tokenList]);

  useEffect(() => {
    if (searchInput) {
      setTokensArr(
        tokenList.filter(
          (element) =>
            element.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            element.address === searchInput,
        ),
      );
    } else setTokensArr(tokenList);
  }, [searchInput,tokenList]);
  return (
    <Wrapper>
      {tokensArr.map((token) => (
        <TokenInfor
          key={token.name}
          data={token}
          onTokenChoose={onTokenChoose}
          handleClose={handleClose}
        />
      ))}
    </Wrapper>
  );
};

export default TokenList;
