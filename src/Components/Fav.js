import React, { useState, useEffect } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import "./Index.css";
import { Row, Col } from "reactstrap";
import { useHistory } from "react-router";
import {Dropdown,DropdownToggle,DropdownMenu,DropdownItem} from "reactstrap";


const Fav = () => {
  // const [arr, setarr] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [search, setSearch] = useState("Fav_Breed");
  const [favArr, setFavArr] = useState([]);
  const [likeBreads, setlikebreeds] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setFavArr(JSON.parse(localStorage.getItem("favArr")));
    setlikebreeds(JSON.parse(localStorage.getItem("likeBreads")));
  }, []);

  const handleSelect = (event) => {
    setSearch(event.currentTarget.textContent);
  };

  return (
    <div>
      
      <div className="dropdown-newpage-container">
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle className="dropdown-container-size" caret>
              {search || "Breeds Name"}
            </DropdownToggle>
            <DropdownMenu
              className="breed-list-body-container"
              container="body"
            >
              {likeBreads.length > 0 &&
                likeBreads.map((breed) => (
                  <DropdownItem onClick={handleSelect}>{breed}</DropdownItem>
                ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      <div className="Fav-image-contanier">
        <Row>
          {favArr.length > 0 &&
            favArr.map((breed) => (
              <Col lg="3" sm="3" xs="3">
                <div> 
                  <img
                    src={breed}
                    className={breed.includes(search) && 'highlight'}
                    style={{
                      height: 200,
                      width: "100%",
                      marginBottom: "12px",
                      marginTop: "12px",
                    }}
                    alt="img"
                  />
                  <div
                    onClick={() => {
                        setFavArr((prevState) =>{
                          let count = 0;
                          console.log(breed.split('/'));
                          let removeBreed = breed.split('/')[4];
                          console.log(removeBreed);
                          if(removeBreed.includes('-')){
                            removeBreed = removeBreed.split('-')[0];  
                          }
                         const data = prevState.filter((item) => item !== breed);
                         for(let i = 0; i < data.length; i++){
                           if(data[i].includes(removeBreed)){
                             count++;
                             break;
                           }
                         }
                         if(count === 0){
                          setlikebreeds(likeBreads.filter(item => item !== removeBreed));
                         }
                         return data;
                         }
                        );
                    }}
                  >
                    <BsFillHeartFill 
                      style={{
                        color: favArr.includes(breed) ? "red" : "white",
                      }}
                    ></BsFillHeartFill>
                  </div>
                </div>
              </Col>
            ))}
        </Row>
        <button
          className="Remove-btn-container"
          onClick={() => history.push("/Home")}
        >
          Remove Favourites
        </button>
      </div>
    </div>
  );
};

export default Fav;
