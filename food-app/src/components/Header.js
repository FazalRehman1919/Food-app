import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { DLT } from "../redux/actions/action";

/**!--------------PROJECT REQUIRED TO IMPORT   START---------!*/
//FOR THE BADGE WHICH SHOW ON CART ICON THAT IS 1,2,3 SO ON...
import Badge from "@mui/material/Badge";
import Navbar from "react-bootstrap/Navbar";

import { NavLink } from "react-router-dom";

//FOR THE MENU WHEN WE CLICK THE ICON THAT SHOW THAT YOUR CART IS EMPTY OR NOT
import Menu from "@mui/material/Menu";
import { useDispatch, useSelector } from "react-redux";

import Table from "react-bootstrap/Table";
import { elementAcceptingRef } from "@mui/utils";
// import MenuItem from "@mui/material/MenuItem";

/**!--------------PROJECT REQUIRED TO IMPORT   END---------!*/

const Header = () => {
  //TO SET THE PRICE AND IT WILL CHANGE THE ORIGINAL STATE
  const [price, setPrice] = useState(0);
  console.log(price);
  //Get the data from reducer with the help of useSelector
  const getdata = useSelector((state) => state.cartreducer.carts);
  console.log(getdata);

  //TO DIPATCH THE DELETE FUNCTION
  const dispatch = useDispatch();

  //TO DELETE THE ITEM FROM LIST
  const dlt = (e) => {
    dispatch(DLT(e));
  };

  //TO ADD THE PRICE OF ALL CART WHICH WE ADD TO CART
  const total = () => {
    let price = 0;
    getdata.map((ele) => {
      price = ele.price * ele.qnty + price;
    });
    setPrice(price);
  };

  //TO RENDER ONLY ONCE FOR RENDERING
  useEffect(() => {
    total();
  }, [total]);

  //TO HANDLE THE MENU ON CART
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-3">
            Add To Cart
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light">
              Home
            </NavLink>
          </Nav>
          <Badge /**BADGE OVER THE CART */
            badgeContent={getdata.length}
            color="primary"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <i
              class="fa-solid fa-cart-shopping text-light"
              style={{ fontSize: 25, cursor: "pointer" }}
            ></i>
          </Badge>
        </Container>

        <Menu /**MENU ON CART STYLE  CLOSE OPTION ON MENU */
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {/**If the Length is greater than 0 than make a head of table */}
          {getdata.length ? (
            <div
              className="card_details"
              style={{ width: "24rem", padding: 10 }}
            >
              <Table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Restaurant Name</th>
                  </tr>
                </thead>
                <tbody>
                  {/**map the data and make from it into data and show them */}
                  {getdata.map((e) => {
                    return (
                      <>
                        <tr>
                          <td>
                            <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                              <img
                                src={e.imgdata}
                                style={{ width: "5rem", height: "5rem" }}
                                alte=" "
                              />
                            </NavLink>
                          </td>
                          <td>
                            <p>{e.rname}</p>
                            <p>Price: Rs {e.price}</p>
                            <p>Quantity: {e.qnty}</p>
                            <p
                              style={{
                                color: "red",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                              onClick={() => dlt(e.id)}
                            >
                              <i className="fas fa-trash smalltrash"></i>
                            </p>
                          </td>
                          <td
                            className="mt-5"
                            style={{
                              color: "red",
                              fontSize: 20,
                              cursor: "pointer",
                            }}
                            onClick={() => dlt(e.id)}
                          >
                            <i className="fas fa-trash largetrash"></i>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
                <p className="text-center">Total: Rs {price}</p>
              </Table>
            </div>
          ) : (
            <div
              className="card_details d-flex justify-content-center align-items-center"
              style={{ width: "18rem", padding: 10, position: "relative" }}
            >
              <i
                className="fas fa-close smallclose"
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: 2,
                  right: 20,
                  fontSize: 23,
                  cursor: "pointer",
                }}
              ></i>
              <p style={{ fontSize: 22 }}>Your Cart is Empty</p>
              <img
                src="./cart1.gif"
                alt="Cart Image"
                className="emptycart_img"
                style={{ width: "5rem", padding: 10 }}
              />
              {/**GIF WHEN THE CART IS EMPTY */}
            </div>
          )}
        </Menu>
      </Navbar>
    </>
  );
};

export default Header;
