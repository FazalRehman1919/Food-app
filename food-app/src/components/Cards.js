import React, { useState } from "react";
//IMPORT THE TOASTIFY THAT SHOW US THE TOAST TO FOR CART THAT WE ADDED SUCCESSFULLY
import { toast } from "react-toastify";


//STYLING FOR CARD
import "./style.css";

//IMPORT BUTTON FOR REACT BOOTSTRAP BUTTON
import Button from "react-bootstrap/Button";

//IMPORT CARD FOR REACT BOOTSTRAP CARD
import Card from "react-bootstrap/Card";

//IMPORT CARD DATA FROM CardsData TO SHOW THEM IN CARD
import Cardsdata from "./CardsData";

//IMPORT THE DISPATCH TO SEND DATA WITH THE HELP OF DISPATCH
import { useDispatch } from "react-redux";

//IMPORT THE ADD FUNCTION FROM ACTION
import { ADD } from "../redux/actions/action";


const Cards = () => {
  const [data, setData] = useState(Cardsdata);
  console.log(data);

  const dispatch = useDispatch();

  const send = (e) => {
    // console.log(e);
    dispatch(ADD(e));
    toast.success("Cart Addedd SuccessFully!")
  };

  return (
    <div className="container mt-3">
      <h2 className="text-center">Add To Cart Project</h2>
      <di className="row d-flex justify-content-center align-items-center">
        {data.map((element, id) => {
          return (
            <>
              <Card
                style={{ width: "22rem", border: "none" }}
                className="mx-2 mt-3 card_style"
              >
                <Card.Img
                  className="mt-3"
                  variant="top"
                  src={element.imgdata}
                  style={{ height: "16rem" }}
                />
                <Card.Body>
                  <Card.Title>{element.rname}</Card.Title>
                  <Card.Text>Price Rs.{element.price}</Card.Text>
                  <div className="button_div d-flex justify-content-center">
                    <Button
                      variant="primary"
                      className="col-lg-12"
                      onClick={() => send(element)}
                    >
                      Add To Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </>
          );
        })}
      </di>
    </div>
  );
};

export default Cards;
