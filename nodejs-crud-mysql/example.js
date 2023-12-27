import React, { useState, useEffect } from "react";


import axios from 'axios';


const MyForm = () => {
  const [formData, setformData] = useState({
    title: '',
    submenuItem: '',
  });


  const [menuData,setMenuData]=useState([]);


 


  const handleData = (e) => {


    // console.log("Before",formData);
    // console.log("After",[{...formData}]);


    setformData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
   
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    savedata();
  }


    useEffect(() => {
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
    axios
        .get("http://127.0.0.1:8000/api/submenuitem", { headers: headers })
        .then((response) => {
          const subMenuItemData = response.data;
          setMenuData(subMenuItemData);
          console.log("subMenuItem", subMenuItemData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);


    function savedata(){
    axios.post('http://127.0.0.1:8000/api/create_sub_menu_item', formData)
      .then((response) => {
        console.log('SubMenuItem created:', response.data);
      })
      .catch((error) => {
        console.error('Error creating SubMenuItem:', error);
      });
    }


  return (
   



    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input className="Textform"
        type="text"
        id="title"
        name="title"
        // value={selectedMenuItem.title}
        onChange={handleData}
      /><br></br>


      <label htmlFor="submenuItem">Submenu Item:</label>
       <select
        className="select-selected Textsize"
        onChange={handleData}
        name="submenuItem"
      >
        <option> select menu</option>


        {menuData.map((item,i) => (
          <option
            key={item.id}
            value={i}
          >
            {item.title}
          </option>
        ))}
      </select> <br></br>
       {/* <select
        id="submenuItem"
        name="submenuItem"
        // value={selectedMenuItem.submenuItem}
        onChange={handleChange}
      >
       
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
       
      </select><br></br>  */}




      <button type="submit">Submit</button>
    </form>
  );
};


export default MyForm;