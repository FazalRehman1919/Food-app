import React, { useEffect, useState } from "react";
import { DLT, ADD, REMOVE } from "../redux/actions/action";

//IMPORT THE TABLE FROM REACT BOOTSTRAP TO LOOK THE DATA IN FOMR OF TABLE IN SECTION
import Table from "react-bootstrap/Table";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

const CardsDetails = () => {
  //TO SET DATA FOR RENDER ON PAGE
  const [data, setData] = useState([]);

  //TO GET THE PARTICULAR ID OF DATA HERE
  const { id } = useParams();

  //TO DISPATCHT THE DELETE FUNCTION
  const dispatch = useDispatch();

  //TO NAVIGATE THE PAGE
  const histor = useNavigate();

  //TO GET ALL THE DATA FROM STOR FOR COMPARISON
  const getdata = useSelector((state) => state.cartreducer.carts);

  //TO COMPARE THE ID OF CURRENT WITH THE WHOLE DATA TO FILTER THAT DATA INFORMATION
  const compare = () => {
    let comparedata = getdata.filter((e) => {
      return e.id == id;
    });
    setData(comparedata);
  };

  //TO ADD THE ITEM
  const send = (e) => {
    // console.log(e);
    dispatch(ADD(e));
  };


  //TO DELETE THE ITEM AND NAVIGATE
  const dlt = (e) => {
    dispatch(DLT(e));
    histor("/");
  };

  //TO DECREMENT THE ITEMS QUANTITY
  const remove = (item) => {
    dispatch(REMOVE(item))
  }


  useEffect(() => {
    compare();
  }, [id]);

  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center">Items Detail Page</h2>
        <section className="container mt-3">
          <div className="itemsdetails">
            {data.map((ele) => {
              return (
                <>
                  <div className="items_img">
                    <img src={ele.imgdata} alt="" />
                  </div>
                  <div className="details">
                    <Table>
                      <tr>
                        <td>
                          <p>
                            <strong>Restaurant</strong>:{ele.rname}
                          </p>
                          <p>
                            <strong>Price</strong>: Rs.{ele.price}
                          </p>
                          <p>
                            <strong>Dishes</strong>:{ele.address}
                          </p>
                          <p>
                            <strong>Total</strong>: Rs.{ele.price * ele.qnty}
                          </p>
                          <div
                            className="mt-5 d-flex justify-content-between align-items-center"
                            style={{
                              width: 100,
                              cursor: "pointer",
                              background: "#ddd",
                              color: "#111",
                            }}
                          >
                            <span style={{ fontSize: 24 }} onClick={ele.qnty <= 1 ? () => dlt(ele.id) : () => remove(ele)}>-</span>
                            <span style={{ fontSize: 22 }}>{ele.qnty}</span>
                            <span style={{ fontSize: 24 }} onClick={() => send(ele)}>+</span>
                          </div>
                        </td>
                        <td>
                          <p>
                            <strong>Rating</strong>:
                            <span
                              style={{
                                background: "green",
                                color: "#fff",
                                padding: "2px 5px",
                                borderRadius: "5px",
                              }}
                            >
                              {ele.rating}★
                            </span>
                          </p>
                          <p>
                            <strong>Order Reviews</strong>:
                            <span>{ele.somedata}</span>
                          </p>
                          <p>
                            <strong>Remove:</strong>
                            <span>
                              <i
                                className="fas fa-trash"
                                style={{
                                  color: "red",
                                  fontSize: 20,
                                  cursor: "pointer",
                                }}
                                onClick={() => dlt(ele.id)}
                              ></i>
                            </span>
                          </p>
                        </td>
                      </tr>
                    </Table>
                  </div>
                </>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default CardsDetails;
