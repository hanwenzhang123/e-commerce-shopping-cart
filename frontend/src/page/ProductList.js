import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Input from "../component/Input.js";

import Card from "../UI/Card.js";
import { Container, ProductFormContainer } from "../UI/CommonStyle.js";
import Spinner from "../UI/Spinner.js";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function ProductList() {
  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(false);
  const [showEditForm, isShowEditForm] = useState(false);
  const [productInfo, setProductInfo] = useState({});
  const [tempInfo, setTempInfo] = useState({});

  const fetchData = async (id) => {
    try {
      const result = await fetch("/api/product/" + id).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("not able to fetch data correctly");
        }
      });
      setProductInfo(result);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    const loadData = async () => {
      await fetchData(id);
      if (isMounted) {
        setLoading(false);
        isMounted = false;
      }
    };
    loadData();
  }, [id]);

  useEffect(() => {
    console.log("productInfo", productInfo);
    if (productInfo) {
      const clone = JSON.parse(JSON.stringify(productInfo));
      setTempInfo(clone);
    }
  }, [productInfo]);

  useEffect(() => {
    console.log("tempInfo", tempInfo);
  }, [tempInfo]);

  const editProduct = (id) => {
    isShowEditForm(!showEditForm);
  };

  const handleCancel = () => {
    isShowEditForm(false);
  };

  const handleChange = (e) => {
    const newData = { ...tempInfo };
    newData[e.target.id] = e.target.value;
    setTempInfo(newData);
  };

  const handleSubmit = async (e) => {
    // try {
    //   const url = "/api/product";
    //   await fetch(url, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log("Success:", data);
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    //   alert("You have created a new product successfully");
    //   setData(ProductConstant);
    //   window.location.href = "/";
    // } catch (e) {
    //   console.log(e);
    // }
  };

  const deleteProduct = (id) => {
    console.log(id);
  };

  return (
    <React.Fragment>
      <Container>
        <div style={{ textAlign: "center", lineHeight: "30px" }}>
          <p>Below is the product info you clicked on.</p>
          <p>Click the icon to edit or delete the product.</p>
        </div>
        {productInfo && (
          <Card>
            <div
              style={{
                fontSize: "25px",
                textAlign: "center",
                lineHeight: "150%",
              }}
            >
              <h2 style={{ marginBottom: "10px" }}>
                Title: <b>{productInfo.title}</b>
              </h2>
              <p>
                Description: <b>{productInfo.description}</b>
              </p>
              <p>
                Quantity: <b>{productInfo.quantity}</b>
              </p>
              <p>
                Price: <b>{productInfo.price}</b>
              </p>
            </div>
            <EditIcon
              style={{
                position: "relative",
                left: "70%",
                top: "15px",
              }}
              onClick={() => editProduct(id)}
            />
            <DeleteForeverIcon
              style={{
                position: "relative",
                left: "75%",
                top: "15px",
              }}
              onClick={() => deleteProduct(id)}
            />
          </Card>
        )}
        {showEditForm && (
          <ProductFormContainer>
            <form onSubmit={handleSubmit}>
              <Input
                label="Title"
                id="title"
                type="text"
                value={tempInfo["title"]}
                handleChange={(e) => handleChange(e)}
              />
              <Input
                label="Description"
                id="description"
                type="text"
                value={tempInfo["description"]}
                handleChange={(e) => handleChange(e)}
              />
              <Input
                label="Quantity"
                id="quantity"
                type="number"
                min="1"
                step="1"
                value={tempInfo["quantity"]}
                handleChange={(e) => handleChange(e)}
              />
              <Input
                label="Price"
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={tempInfo["price"]}
                handleChange={(e) => handleChange(e)}
              />

              <span>
                <button onClick={handleCancel}>Cancel</button>
                <input type="submit" value="Save" />
              </span>
            </form>
          </ProductFormContainer>
        )}

        {loading && <Spinner />}
        <Link to="/" style={{ marginTop: "20px" }}>
          Go to Home Page
        </Link>
      </Container>
    </React.Fragment>
  );
}
