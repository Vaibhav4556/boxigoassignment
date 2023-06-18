import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import {
  BsArrowRight,
  BsFillHospitalFill,
  BsFillCalendar2DateFill,
} from "react-icons/bs";
import { TfiPencil } from "react-icons/tfi";
import { IoWarning } from "react-icons/io5";
// import { AiOutlineDown } from "react-icons/ai";
import { GiPathDistance } from "react-icons/gi";
import { AiFillHome } from "react-icons/ai";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
function Dashboard() {
  const [data, setData] = useState([]);
  // const [data1, setData1] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://test.api.boxigo.in/sample-data/")
      .then((response) => {
        // Save the data in the state
        setData(
          response.data.Customer_Estimate_Flow.map((item) => ({
            ...item,
            showDetails: false,
          }))
        );
        // setData1(
        //   response.data.Customer_Estimate_Flow[0].items.inventory[0].displayName
        // );
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleToggleDetails = (index) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        showDetails: !newData[index].showDetails,
      };
      return newData;
    });
  };

  const [showDetails, setShowDetails] = useState(false);

  const handleButtonClick = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="">
      <div className="heading">My Moves</div>

      {data.map((item, index) => (
        <div className="subcontainer" key={index}>
          <div className="locationInfo">
            <div className="startingPlace">
              <p className="subheading">From</p>
              <p className="location">{item.moving_from}</p>
            </div>
            <div className="icon1 shadow p-2 bg-white ">
              <BsArrowRight
                size={25}
                style={{ color: "#ec5642" }}

                
              />
            </div>
            {/* {console.log(
              item.items.inventory[index].category[0].items.map((abc, index) => abc.displayName)
            )} */}

            {/* {console.log(item.items.inventory.map((name) => name))} */}
            <div className="endPlace">
              <p className="subheading">To</p>
              <p className="location">{item.moving_to}</p>
            </div>
            <div className="requestno">
              <p>Request#</p>
              <p className="reqno">{item.estimate_id}</p>
            </div>
          </div>
          <div className="placedetails">
            <div className="home">
              <AiFillHome style={{ color: "#ec5642" }} />
              <p>{item.property_size}</p>
            </div>
            <div className="home">
              <BsFillHospitalFill style={{ color: "#ec5642" }} />
              <p>{item.total_items}</p>
            </div>
            <div className="home">
              <GiPathDistance style={{ color: "#ec5642" }} />
              <p>{item.distance}</p>
            </div>
            <div className="dates">
              <BsFillCalendar2DateFill style={{ color: "#ec5642" }} />
              <p>{item.moving_on} <span><TfiPencil/></span></p>
            </div>
            <div className="labelcheck">
              <input type="checkbox" defaultChecked className="checkbox" />
              <label>is flexible</label>
            </div>
            <button
              onClick={() => handleToggleDetails(index)}
              className="viewmorebtn"
            >
              {item.showDetails ? "Collapse Details" : "View More Details"}
            </button>
            <button className="quotebtn">Quote awaiting</button>
          </div>
          <div className="desclaimer">
          <IoWarning style={{color:"#ec5642", marginRight:"0.5rem"}}/>
            <span style={{ fontWeight: "700" }}> Desclaimer:</span>Please update
            your move date before two days of shifting
          </div>
          <hr/>
          {item.showDetails && (
            <div className="move-details">
              {/* Load and display the items from the API data here */}
              {/* Example: */}
              <div className="items-section">
                <ul>
                  <div className="addinfo">
                    <p>Additional Information</p>
                    <button className="editaddinfo">
                      Edit Additional Info
                    </button>
                  </div>
                  <div className="addinfo">
                    <p>House Details</p>
                    <button className="edithousedetail">
                      Edit House Details
                    </button>
                  </div>
                  <div className="exhouse">
                    <p>Existing House Details</p>
                  </div>
                  <table className="table table-borderless reduced-spacing">
                    <thead>
                      <tr>
                        <th scope="col">Floor No.</th>
                        <th scope="col">Elevator Available</th>
                        <th scope="col">
                          Distance from Elevator / Staircase to Truck
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{item.old_floor_no}</td>
                        <td>{item.old_elevator_availability}</td>
                        <td>{item.old_parking_distance}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="newhouse">
                    <p>New House Details</p>
                  </div>
                  <table className="table table-borderless reduced-spacing">
                    <thead>
                      <tr>
                        <th scope="col">Floor No.</th>
                        <th scope="col">Elevator Available</th>
                        <th scope="col">
                          Distance from Elevator / Staircase to Truck
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{item.new_floor_no}</td>
                        <td>{item.new_elevator_availability}</td>
                        <td>{item.new_parking_distance}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="addinfo">
                    <p>Inventory Details</p>
                    <button className="editinventory">Edit Inventory</button>
                  </div>
                  {/* {item.items.inventory[0].category[0].items.map((abc)=>( <p>{abc.displayName}</p>))}
                   */}

                  {/* <button className="inventorybtn" style={{ width: "100%" }} >
                      <div className="inventorylist">
                      Furniture <span ><AiOutlineDown/></span>
                      </div>
                    </button> */}

                  <div>
                    <button
                      className="inventorybtn"
                      style={{ width: "100%" }}
                      onClick={handleButtonClick}
                    >
                      <div className="inventorylist">
                        Furniture{" "}
                        <span>
                          {showDetails ? <AiOutlineUp /> : <AiOutlineDown />}
                        </span>
                      </div>
                    </button>
                    {showDetails && (
                      <div className="detailed-data">
                       
                        <div style={{ display: "flex" }}>
                          {item.items.inventory[0].category
                            .slice(0, 4)
                            .map((category, categoryIndex) => (
                              <div key={categoryIndex}>
                                <table className="table table-borderless reduced-spacing">
                                  <thead>
                                    <tr>
                                      <th
                                        scope="col"
                                        style={{ textAlign: "start" }}
                                      >
                                        {category.displayName}
                                      </th>
                                      <th
                                        scope="col"
                                        style={{ textAlign: "center" }}
                                      >
                                        Quantity
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {category.items.map((item, index) => (
                                      <tr key={index}>
                                        <td style={{ textAlign: "start" }}>
                                          {item.displayName}
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                          {item.qty}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <button
                      className="inventorybtn"
                      style={{ width: "100%" }}
                      onClick={handleButtonClick}
                    >
                      <div className="inventorylist">
                        Electronics{" "}
                        <span>
                          {showDetails ? <AiOutlineUp /> : <AiOutlineDown />}
                        </span>
                      </div>
                    </button>
                    {showDetails && (
                      <div className="detailed-data">
                       
                        <div style={{ display: "flex" }}>
                          {item.items.inventory[1].category
                            .slice(0, 4)
                            .map((category, categoryIndex) => (
                              <div key={categoryIndex}>
                                <table className="table table-borderless reduced-spacing">
                                  <thead>
                                    <tr>
                                      <th
                                        scope="col"
                                        style={{ textAlign: "start" }}
                                      >
                                        {category.displayName}
                                      </th>
                                      <th
                                        scope="col"
                                        style={{ textAlign: "center" }}
                                      >
                                        Quantity
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {category.items.map((item, index) => (
                                      <tr key={index}>
                                        <td style={{ textAlign: "start" }}>
                                          {item.displayName}
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                          {item.qty}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <button
                      className="inventorybtn"
                      style={{ width: "100%" }}
                      onClick={handleButtonClick}
                    >
                      <div className="inventorylist">
                        Vehicle{" "}
                        <span>
                          {showDetails ? <AiOutlineUp /> : <AiOutlineDown />}
                        </span>
                      </div>
                    </button>
                    {showDetails && (
                      <div className="detailed-data">
                       
                        <div style={{ display: "flex" }}>
                          {item.items.inventory[2].category
                            .slice(0, 4)
                            .map((category, categoryIndex) => (
                              <div key={categoryIndex}>
                                <table className="table table-borderless reduced-spacing">
                                  <thead>
                                    <tr>
                                      <th
                                        scope="col"
                                        style={{ textAlign: "start" }}
                                      >
                                        {category.displayName}
                                      </th>
                                      <th
                                        scope="col"
                                        style={{ textAlign: "center" }}
                                      >
                                        Quantity
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {category.items.map((item, index) => (
                                      <tr key={index}>
                                        <td style={{ textAlign: "start" }}>
                                          {item.displayName}
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                          {item.qty}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <button
                      className="inventorybtn"
                      style={{ width: "100%" }}
                      onClick={handleButtonClick}
                    >
                      <div className="inventorylist">
                        Other appliances{" "}
                        <span>
                          {showDetails ? <AiOutlineUp /> : <AiOutlineDown />}
                        </span>
                      </div>
                    </button>
                    {showDetails && (
                      <div className="detailed-data">
                       
                        <div style={{ display: "flex" }}>
                          {item.items.inventory[3].category
                            .slice(0, 4)
                            .map((category, categoryIndex) => (
                              <div key={categoryIndex}>
                                <table className="table table-borderless reduced-spacing">
                                  <thead>
                                    <tr>
                                      <th
                                        scope="col"
                                        style={{ textAlign: "start" }}
                                      >
                                        {category.displayName}
                                      </th>
                                      <th
                                        scope="col"
                                        style={{ textAlign: "center" }}
                                      >
                                        Quantity
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {category.items.map((item, index) => (
                                      <tr key={index}>
                                        <td style={{ textAlign: "start" }}>
                                          {item.displayName}
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                          {item.qty}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <button
                      className="inventorybtn"
                      style={{ width: "100%" }}
                      onClick={handleButtonClick}
                    >
                      <div className="inventorylist">
                        Boxes / Trolly{" "}
                        <span>
                          {showDetails ? <AiOutlineUp /> : <AiOutlineDown />}
                        </span>
                      </div>
                    </button>
                    {showDetails && (
                      <div className="detailed-data">
                       
                        <div style={{ display: "flex" }}>
                          {item.items.inventory[4].category
                            .slice(0, 4)
                            .map((category, categoryIndex) => (
                              <div key={categoryIndex}>
                                <table className="table table-borderless reduced-spacing">
                                  <thead>
                                    <tr>
                                      <th
                                        scope="col"
                                        style={{ textAlign: "start" }}
                                      >
                                        {category.displayName}
                                      </th>
                                      <th
                                        scope="col"
                                        style={{ textAlign: "center" }}
                                      >
                                        Quantity
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {category.items.map((item, index) => (
                                      <tr key={index}>
                                        <td style={{ textAlign: "start" }}>
                                          {item.displayName}
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                          {item.qty}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </ul>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
