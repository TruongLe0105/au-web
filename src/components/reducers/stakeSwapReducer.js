import {
  SET_AMOUNT,
  SET_APPROVE,
  SET_SWAPABLE,
  SET_BALANCE,
  SET_MODAL_LOADING,
  SET_BOARD_LOADING,
  SET_PKG,
  SET_HISTORY,
  SET_DETAIL_SHOW,
  SET_FEE_TX,
  SET_LOCK_LIST,
} from './type';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_AMOUNT:
      return {
        ...state,
        amount: action.payload,
      };
    case SET_SWAPABLE:
      return {
        ...state,
        isSwapable: action.payload,
      };
    case SET_APPROVE:
      return {
        ...state,
        isApprove: action.payload,
      };
    case SET_BALANCE:
      return {
        ...state,
        [action.key]: action.payload,
      };
    case SET_MODAL_LOADING:
      return {
        ...state,
        modalLoading: action.payload,
      };
    case SET_BOARD_LOADING:
      return {
        ...state,
        boardLoading: action.payload,
      };
    case SET_HISTORY:
      return {
        ...state,
        historyStake: action.payload,
      };
    case SET_PKG:
      return {
        ...state,
        stakingPkg: action.payload,
      };
    case SET_DETAIL_SHOW:
      return {
        ...state,
        isDetailShow: action.payload,
      };

    case SET_FEE_TX:
      return {
        ...state,
        feeTx: action.payload,
      };

    case SET_LOCK_LIST:
      return {
        ...state,
        lockList: action.payload,
      };

    default:
      break;
  }
};

export default reducer;
