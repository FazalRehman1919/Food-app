const INIT_STATE = {
  carts: [],
};

export const cartreducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_CART":
      const ItemIndex = state.carts.findIndex((ind) => ind.id === action.payload.id)
      if (ItemIndex >= 0) {
        state.carts[ItemIndex].qnty += 1;

      } else {
        const temp = { ...action.payload, qnty: 1 }
        return {
          ...state,
          carts: [...state.carts, temp]
        }
      }


    //IT SIMPLE ADD THE ITEM INTO CART AND ALSO SHOW US ON CART ICON
    // return {
    //   ...state,
    //   carts: [...state.carts, action.payload],
    // };


    case "RMV_CART":
      const data = state.carts.filter((el) => el.id !== action.payload);
      return {
        ...state,
        carts: data,
      };

    case "RMV_ONE":
      const ItemIndex_dec = state.carts.findIndex((ind) => ind.id === action.payload.id)
      if (state.carts[ItemIndex_dec].qnty >= 1) {
        const dltitem = state.carts[ItemIndex_dec].qnty -= 1
        console.log(...state.carts, dltitem);

        return {
          ...state,
          carts: [...state.carts]
        }
      } else if (state.carts[ItemIndex_dec].qnty === 1) {
        const data = state.carts.filter((el) => el.id !== action.payload);
        return {
          ...state,
          carts: data,
        };


      }


    default:
      return state;
  }
};
