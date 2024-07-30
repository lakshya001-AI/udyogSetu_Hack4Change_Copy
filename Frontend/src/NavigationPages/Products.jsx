import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Style from "../App.module.css";
import axios from "axios";
import GoogleTranslate from "../Components/googleTranslate";

function ProductsPage() {
  const navigate = useNavigate();

  // Product Details State
  const [productDetails, setProductDetails] = useState([]);

  function logoutUser() {
    navigate("/");
  }

  const userAadhaarNumber = localStorage.getItem("userAadhaarNumber");

  useEffect(() => {
    async function getProductData() {
      try {
        const res = await axios.post(
          "http://localhost:5000/getProductDetails",
          {
            userAadhaarNumber,
          }
        );
        const userProductDetails = res.data.productDetails;
        // console.log('User Product Details:', userProductDetails); // Log the specific data
        setProductDetails(userProductDetails);
      } catch (error) {
        console.log("Error:", error);
      }
    }
    getProductData();
  }, [userAadhaarNumber]);

  function BuyProduct(){
    toast.error("Access Denied! Please try again later", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }
  function ContactSeller(){
    toast.success("Request Sended!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  }

  return (
    <>
      <div className={Style.mainPageDiv}>
        <div className={Style.navBarDiv}>
          <div className={Style.logoDiv}>
            {/* logo div */}
            <p className={Style.logoPara}>
              udyog<span className={Style.setuSpan}>Setu</span>
            </p>
          </div>

          <div className={Style.navigationBtnDiv}>
            {/* navigation Div */}
            <Link className={Style.navigationLinks} to="/mainPage">
              Home
            </Link>
            <Link className={Style.navigationLinks} to="/productPage">
              Products
            </Link>
            <Link className={Style.navigationLinks} to="/mentorsPage">
              Mentors
            </Link>
            <Link className={Style.navigationLinks} to="/financePage">
              Finance
            </Link>
            <Link className={Style.navigationLinks} to="/buyersPage">
              Buyers
            </Link>
          </div>

          <div className={Style.registerAndLoginDiv}>
            {/* login and logout buttons */}
            <GoogleTranslate/>
            <Link className={Style.registerLink} to="/registerPage">
              Register
            </Link>
            <button className={Style.logoutBtn} onClick={logoutUser}>
              logout
            </button>
          </div>
        </div>
        {/* ------------ product List ---------------- */}
        <div className={Style.productDetailsMainDiv}>
          {productDetails.length > 0 ? (
            <div className={Style.productMapDiv}>
              {productDetails.map((ele,index) => (
                <div className={Style.productDiv} key={ele.id || index}>
                  <div className={Style.imgDiv}>
                    <img src={`http://localhost:5000/uploads/${ele.photo}`} alt="" />
                    <div className={Style.productNameDiv}>
                      <p className={Style.productNamePara}>{ele.ProductName}</p>
                    </div>
                    <div className={Style.productNameDiv}>
                      <p
                        className={Style.sellerInfoPara}
                      >{`Seller:${ele.userName} | City:${ele.City} | State:${ele.State}`}</p>
                    </div>
                    <div className={Style.productNameDiv}>
                      <p className={Style.productPricePara}>{`₹${ele.ProductPrice}`}</p>
                    </div>
                    <div className={Style.productSellBtnDiv}>
                      <button className={Style.contactSellerBtn} onClick={ContactSeller}>
                        Contact Seller
                      </button>
                      <button className={Style.buyNowBtn} onClick={BuyProduct}>Buy Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h1>No products</h1>
          )}
        </div>
        <ToastContainer/>
      </div>
    </>
  );
}

export default ProductsPage;
