import React, { useState, useEffect } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import {Dropdown,DropdownToggle,DropdownMenu,DropdownItem,Row,Col,ModalHeader,ModalBody,ModalFooter,Modal,Button, } from "reactstrap";

const Newpage = () => {
  const [arr, setarr] = useState([]);
  const history = useHistory();
  const [breedimages, setbreedimages] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [search, setSearch] = useState("");
  const [modal, setmodal] = useState(false);
  const [curr_image_url, setImgURL] = useState("");
  const togglemodal = () => setmodal(!modal);
  const [favArr, setFavArr] = useState([]);
  const [likebreeds] =useState([]);


  const getUsers = async () => {
    let resp = await fetch("https://dog.ceo/api/breeds/list/all", {
      method: "Get",
    });
    const UData = await resp.json();
    console.log("show data", UData.message);
    setarr(Object.keys(UData.message));
  };
  useEffect(() => {
    getUsers();
  }, []);

  const Searchbreed = async (breedName) => {
    console.log("running !!");
    let resp = await fetch(`https://dog.ceo/api/breed/${breedName}/images`, {
      method: "Get",
    }).catch((error) => {
      console.log(error);
      if (error.response.code === "404") {
        console.log(error.message);
      }
    });
    console.log(resp);
    if (resp.status === 200) {
      const UIData = await resp.json();
      console.log("show data", UIData.message);
      setbreedimages(UIData.message);
    }
  };

  const handleSelect = (event) => {
    console.log("Selected String ::", event.currentTarget.textContent);
    setSearch(event.currentTarget.textContent);
    Searchbreed(event.currentTarget.textContent);
  };

  return (
    <div className="main-block-container">
      <div>
        <header className="header-newpage">
          <div>
            <img
              className="picture-newpage-container"
              src="https://dog.ceo/img/dog-api-logo.svg"
              alt="Newpage"
            ></img>
          </div>
          <input
            className="input-field-newpage"
            type="search"
            name="input"
            value={search}
            placeholder="Search...."
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                Searchbreed(search);
              }
            }}
            required
          />
          <div>
            <button
              className="history-button-container"
              onClick={() => {
                localStorage.setItem('favArr', JSON.stringify(favArr));
                localStorage.setItem('likeBreads', JSON.stringify(likebreeds))
                history.push("/Favourite");
                }}
            >
              Favourite
            </button>
          </div>
        </header>
        <div className="dropdown-newpage-container">
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle className="dropdown-container-size" caret>
              {search || "List of breeds"}
            </DropdownToggle>
            <DropdownMenu
              className="breed-list-body-container"
              container="body"
            >
              {arr.length > 0 &&
                arr.map((breed) => (
                  <DropdownItem onClick={handleSelect}>{breed}</DropdownItem>
                ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div>
          <Row>
            {breedimages.length > 0 &&
              breedimages.map((breed) => (
                <Col lg="3" sm="3" xs="3">
                  <div>
                    <img
                      src={breed}
                      style={{
                        height: 200,
                        width: "100%",
                        marginBottom: "12px",
                        marginTop: "12px",
                      }}
                      onClick={() => {
                        setImgURL(breed);
                        togglemodal();
                      }}
                      alt="img"
                    />
                    <div
                      onClick={() => {
                        if (favArr.includes(breed)) {
                          setFavArr((prevState) =>
                            prevState.filter((item) => item !== breed)
                          );
                        } else {
                          setFavArr([...favArr, breed]);
                          !likebreeds.includes(search) && likebreeds.push(search);
                        }
                      }}
                    >
                      <BsFillHeartFill
                        style={{
                          color: favArr.includes(breed)
                            ? "rgba(150, 1, 1, 0.842)"
                            : "white",
                        }}
                      ></BsFillHeartFill>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </div>
      </div>
      <Modal isOpen={modal} toggle={togglemodal}>
        <ModalHeader toggle={togglemodal}>Breed Images</ModalHeader>
        <ModalBody>
          <img
            className="modal-image-contanier"
            src={curr_image_url}
            height="400"
            width="400"
            alt=""
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={togglemodal}>
            Done
          </Button>{" "}
          <Button color="secondary" onClick={togglemodal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Newpage;
