import React, { useState, useEffect } from "react";
import axios from "axios";

const Sum = () => {
  const [sum, setSum] = useState({
    sumList: [],
  });
  const { sumList } = sum;
  const getSum = async () => {
    var res = await axios.get("http://127.0.0.1:8000/api/sum");
    setSum({ sumList: res.data.data });
  };
  useEffect(() => {
    getSum(); // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="container">
        <h3>Danh sách Fruit</h3>
        {sumList.map((sum) => {
          return (
            <div>
              {sum.type} có: {sum.quantity} sản phẩm
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Sum;
