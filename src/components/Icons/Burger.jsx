import React from 'react';

const Burger = (props) => {
  return (
    <svg
      enableBackground="new 0 0 64 64"
      viewBox="0 0 64 64"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Burger_Menu">
        <path d="m53 21h-42c-1.7 0-3-1.3-3-3s1.3-3 3-3h42c1.7 0 3 1.3 3 3s-1.3 3-3 3z" />
        <path d="m53 35h-42c-1.7 0-3-1.3-3-3s1.3-3 3-3h42c1.7 0 3 1.3 3 3s-1.3 3-3 3z" />
        <path d="m53 49h-42c-1.7 0-3-1.3-3-3s1.3-3 3-3h42c1.7 0 3 1.3 3 3s-1.3 3-3 3z" />
      </g>
    </svg>
  );
};

export default Burger;
