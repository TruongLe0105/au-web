import { motion } from 'framer-motion';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../AppContext';
import { GradientText, Text } from '../SwapBoard';


const toDate = (unixTime) => {
  const milliseconds = +unixTime * 1000;
  const dateObject = new Date(milliseconds);
  return dateObject;
};

const DaysMinus = (dateEnd) => {
  const currentDate = new Date();
  const difference = Math.abs(dateEnd - currentDate);
  const days = Math.floor(difference / (1000 * 3600 * 24));
  if (days > 2) {
    return `${days} days left`;
  }
  if (days === 1) return `${days} day left`;
  return days;
};

const Wrapper = styled.div`
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  min-height: calc(100vh - 100px);
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Table = styled.table`
  border: 1px solid #e7eaf3;
  width: 100%;
  height: 100%;
  box-shadow: 0 5px 8px rgb(0 0 0 / 20%);
  margin-bottom: 0;
  transition: 0.2s ease-in-out;
`;

const THead = styled.thead`
  border-top: 1px solid #e7eaf3 !important;
  border-radius: 10px;
`;
const TBody = styled.tbody`
  height: 100%;
  overflow: scroll;
  border-top: 1px solid #e7eaf3 !important;
`;

const StyledImg = styled.img`
  width: ${({ width }) => width ?? '100%'};
  height: auto;
`;

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const LockList = () => {
  const { lockList } = useContext(AppContext);
  return (
    <Wrapper
      as={motion.div}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="container position-relative mb-5"
    >
      <div className="w-100 " style={{ marginTop: 100 }}>
        <Text
          className="mb-3 ms-0 text-uppercase text-center"
          fontFamily="Playfair"
        >
          Your Tokens Lock Time
        </Text>
        <Table className="table table-striped">
          <THead>
            <tr>
              <th scope="col">
                <Text
                  fontSize="16px"
                  color="#606060"
                  fontWeight={500}
                  className="ms-0"
                >
                  #
                </Text>
              </th>
              <th scope="col">
                <Text
                  fontSize="16px"
                  color="#606060"
                  fontWeight={500}
                  className="ms-0"
                >
                  Lock Time Start
                </Text>
              </th>
              <th scope="col">
                <Text
                  fontSize="16px"
                  color="#606060"
                  fontWeight={500}
                  className="ms-0"
                >
                  Lock Time End
                </Text>
              </th>
              <th scope="col">
                <Text
                  fontSize="16px"
                  color="#606060"
                  fontWeight={500}
                  className="ms-0"
                >
                  Amount
                </Text>
              </th>
            </tr>
          </THead>

          <TBody className="position-relative">
            {lockList?.map((token, index) => (
              <tr key={token.locktimeStart}>
                <th scope="row">
                  <GradientText fontSize="16px" className="ms-0 d-inline-block">
                    {index + 1}
                  </GradientText>
                </th>
                <td>
                  <GradientText fontSize="16px" className="ms-0 d-inline-block">
                    {toDate(token.locktimeStart).toLocaleString()}
                  </GradientText>
                </td>
                <td>
                  <GradientText
                    className="text-capitalize ms-0 d-inline-block"
                    fontSize="16px"
                  >
                    {DaysMinus(toDate(token.locktimeEnd))}
                  </GradientText>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <GradientText fontSize="16px" className="ms-0">
                      {(token.lockAmount * 10 ** -18).toFixed(2)}{' '}
                    </GradientText>
                    <StyledImg
                      src="/tokens/SHT.svg"
                      width="24px"
                      className="ms-2"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </TBody>
        </Table>
      </div>
    </Wrapper>
  );
};

export default React.memo(LockList);
