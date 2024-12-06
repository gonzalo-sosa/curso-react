import { useContext } from "react";
import UserContext from "./userContext";
import CartContext from "./cartContext";

const MovieRow = () => {
  const userContext = useContext(UserContext);
  const cartContext = useContext(CartContext);

  console.log({ cartContext });

  return <div>Movie Row {userContext?.currentUser?.name ?? ""}</div>;
};

export default MovieRow;
