import React , {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Style from "../App.module.css";
import GoogleTranslate from "../Components/googleTranslate";

function BuyersPage() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone , setPhone] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [location , setlocation] = useState("");

  function logoutUser() {
    navigate("/");
  }

  function getMentorShip() {
    setShowPopup(true);
  }

  function closePopup() {
    setShowPopup(false);
  }

  function submitMentorInformation(event){
    event.preventDefault();

    if(name && email && phone && productName && productPrice && location){

      toast.success("Request Sended! Please wait for the response", {
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

      setTimeout(()=>{
        setShowPopup(false);
      },5000);

    }else{

      toast.error("All fields are required", {
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

        <div className={Style.mainFinanceDiv}>
          <div className={Style.financeHeading}>
            <h1>
              Potential <span className={Style.setuSpan}>Buyers</span>
            </h1>
          </div>
          <div className={Style.financeHeading}>
            <p>Connecting Entrepreneurs with Potential Business Partners</p>
          </div>

          <div className={Style.financelistingDiv}>
            <div className={Style.buyersProfileDiv}>
              <h1 className={Style.buyersName}>Sachin Bansal</h1>
              <p className={Style.buyersInterestPara}>
                Product Interest : Wooden Chairs
              </p>
              <p className={Style.buyersInterestPara}>
                Product Quantities : 20
              </p>
              <p className={Style.buyersInterestPara}>
                location: Pune | Maharashtra
              </p>

              <div className={Style.sendRequestDiv}>
                <button className={Style.sendRequestBtn} onClick={getMentorShip}>Send Request</button>
              </div>
            </div>

            <div className={Style.buyersProfileDiv}>
              <h1 className={Style.buyersName}>Avyaan M</h1>
              <p className={Style.buyersInterestPara}>
                Product Interest : Handmade Bags
              </p>
              <p className={Style.buyersInterestPara}>
                Product Quantities : 50
              </p>
              <p className={Style.buyersInterestPara}>
                location: Mumbai | Maharashtra
              </p>

              <div className={Style.sendRequestDiv}>
                <button className={Style.sendRequestBtn} onClick={getMentorShip}>Send Request</button>
              </div>
            </div>

            <div className={Style.buyersProfileDiv}>
              <h1 className={Style.buyersName}>Bhumika Malviya</h1>
              <p className={Style.buyersInterestPara}>
                Product Interest : Diyas
              </p>
              <p className={Style.buyersInterestPara}>
                Product Quantities : 100
              </p>
              <p className={Style.buyersInterestPara}>
                location: Betul | Madhya Pradesh
              </p>

              <div className={Style.sendRequestDiv}>
                <button className={Style.sendRequestBtn} onClick={getMentorShip}>Send Request</button>
              </div>
            </div>

            <div className={Style.buyersProfileDiv}>
              <h1 className={Style.buyersName}>Pravin K</h1>
              <p className={Style.buyersInterestPara}>
                Product Interest : Bamboo Chairs
              </p>
              <p className={Style.buyersInterestPara}>
                Product Quantities : 10
              </p>
              <p className={Style.buyersInterestPara}>
                location: Chennai | Tamil Nadu
              </p>

              <div className={Style.sendRequestDiv}>
                <button className={Style.sendRequestBtn} onClick={getMentorShip}>Send Request</button>
              </div>
            </div>
          </div>
        </div>
        {showPopup && (
          <div className={Style.popup}>
            <div className={Style.popupInnerBuyers}>
              <h2>Please enter your Details</h2>
              <form className={Style.formDivMentor} onSubmit={submitMentorInformation}>
                <div className={Style.inputMentorField}>
                  <div className={Style.inputFieldParaDiv}>
                    <p>Name</p>
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                  />
                </div>

                <div className={Style.inputMentorField}>
                  <div className={Style.inputFieldParaDiv}>
                    <p>Email (optional)</p>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>

                <div className={Style.inputMentorField}>
                  <div className={Style.inputFieldParaDiv}>
                    <p>Phone</p>
                  </div>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                  />
                </div>

                <div className={Style.inputMentorField}>
                  <div className={Style.inputFieldParaDiv}>
                    <p>Product Name</p>
                  </div>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e)=>setProductName(e.target.value)}
                  />
                </div>

                <div className={Style.inputMentorField}>
                  <div className={Style.inputFieldParaDiv}>
                    <p>Product Price</p>
                  </div>
                  <input
                    type="text"
                    value={productPrice}
                    onChange={(e)=>setProductPrice(e.target.value)}
                  />
                </div>

                <div className={Style.inputMentorField}>
                  <div className={Style.inputFieldParaDiv}>
                    <p>location</p>
                  </div>
                  <input
                    type="text"
                    value={location}
                    onChange={(e)=>setlocation(e.target.value)}
                  />
                </div>

                <div className={Style.inputMentorField}>
                  <div className={Style.inputFieldParaDiv}>
                    <p>Product Image</p>
                  </div>
                  <input
                    type="file"
                    className={Style.productImageInput}
                  />
                </div>

              

                <div className={Style.submitBtnAndCloseBtnDiv}>
                  <button className={Style.submitBtnMentor} type="submit">
                    Submit
                  </button>
                  <button onClick={closePopup} className={Style.closeBtnMentor}>
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <ToastContainer/>
      </div>
    </>
  );
}

export default BuyersPage;
