import styled from "styled-components";

export const MainButton = styled.button`
  --main-color: linear-gradient(-90deg, rgb(136, 3, 47), rgb(238, 21, 66));
  text-decoration: none;
  outline: none;
  border: none;

  background: var(--main-color);
  color: #fff;
  text-transform: capitalize;
  font-weight: 600;
  padding: 1rem;
  transition: 0.1s ease-out;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 30px;
  font-size: ${({ fontSize }) => fontSize ?? "16px"};
  &.success {
    background: var(--main-color);
    border-radius: 10px;
  }
  :disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  &:hover {
    filter: brightness(1.1);
  }
`;

export const OutlineButton = styled(MainButton)`
  border-radius: 30px;
  background: rgb(247, 248, 250);
  position: relative;
  color: #ed1c51;
  :hover {
    color: #fff;
  }
  :before {
    border-radius: 30px;
    position: absolute;
    content: "";
    background: linear-gradient(-90deg, rgb(136, 3, 47), rgb(238, 21, 66));
    top: -2px;
    left: -2px;
    bottom: -2px;
    right: -2px;
    position: absolute;
    z-index: -1;
  }
`;

export const Text = styled.p`
  margin-left: 8px;
  color: ${({ color }) => color ?? "#000"};
  font-weight: ${({ fontWeight }) => fontWeight ?? "700"};
  font-size: ${({ fontSize }) => fontSize ?? "34px"};
  ${({ textTransform }) => textTransform && `text-transform:${textTransform};`}
  ${({ fontFamily }) =>
    fontFamily === "Playfair" && "font-family: Playfair Display SC;"}
  line-height: ${({ lineHeight }) => lineHeight ?? 1};
  text-align: ${({ textAlign }) => textAlign ?? "start"};
  ${({ mb }) => mb && `margin-bottom: ${mb};`}
  ${({ truncate }) =>
    truncate &&
    `
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
    width:150px;
    `}
    ${({ linear }) =>
    linear &&
    `
    background: linear-gradient(-90deg, rgb(136, 3, 47), rgb(238, 21, 66));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
    `}
`;

const StyledImg = styled.img`
  width: ${({ width }) => width ?? "100%"};
  height: auto;
`;

export const GradientText = styled(Text)`
  background: -webkit-linear-gradient(-90deg, rgb(136, 3, 47), rgb(238, 21, 66));
  //linear-gradient(214.02deg, #d71479 6.04%, #f87421 92.95%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
