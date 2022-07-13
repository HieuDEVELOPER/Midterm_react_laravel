import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function ProductsList() {
  const [products, setproducts] = useState([]);
  const getproducts = () => {
    axios
      .get("http://127.0.0.1:8000/api/products")
      .then(function (response) {
        console.log(response.data.data);
        setproducts(response.data.data);
      })
      .catch(function (error) {
        // handle error
      })
      .then(function () {});
  };

  useEffect(() => {
    getproducts();
  }, []);

  const handlerInput = (event) => {
    const { name, value } = event.target;
    setSearch((pre) => ({ ...pre, [name]: value }));
  };
  const handlerSubmit = (event) => {
    event.preventDefault();
     axios
       .post(
         `http://127.0.0.1:8000/api/products/find`,search
       )
       .then((res) => {
        console.log(res.data.data);
        setproducts(res.data.data);
       });
  }


  
  const [search, setSearch]= useState({
    name:"",
    min:0,
    max:1000000,
  });
 

  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
    
      
      
      <form onSubmit={handlerSubmit}>
        <input onChange={handlerInput} value={search.min} name="min"></input>
        <input onChange={handlerInput} value={search.max} name="max"></input>
        <input name="name" onChange={handlerInput} value={search.name}></input>
        <button type="submit">search</button>
      </form>


      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {!!products ? (
            products
              .map((products, index) => (
                <tr key={index}>
                  <td scope="row">{products.id}</td>
                  <td>{products.name}</td>

                  <td>
                    <img
                      src={`http://localhost:8000/images/${products.img}`}
                      style={{ width: "200px" }}
                    ></img>
                  </td>
                  <td>{products.price}</td>
                  <td>{products.description}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td>No Data in API</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
          }
export default ProductsList;
