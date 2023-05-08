import React, { useEffect, useState } from "react";

import AddMenu from "./components/AddMenu";
import AddCategory from "./components/AddCategory";
import AddDish from "./components/AddDish";
import DeleteCategory from "./components/DeleteCategory";
import DeleteDish from "./components/DeleteDish";
import DishCard from "./components/DishCard";
import MenuCard from "./components/MenuCard";
import CategoryCard from "./components/CategoryCard";
import CategoriesByMenuId from "./components/CategoriesByMenuId";
import ShowMenus from "./components/ShowMenus";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Home from "./home";
import AboutUs from "./AboutUs";
import SimpleNavbar from "./components/SimpleNavbar";
import UpdateDish from "./components/UpdateDish";
import Login from "./components/Login";


function App() {

  function isVerified()
  {
    const info = sessionStorage.getItem("isVerified");
    if(info == "true")
    {
      return true;
    }
    return false;
  }

  const navigate = useNavigate();
  function onClickHandeler(userName, password) {

    if (userName === "") {
      alert("Please enter the user-name!");
      return;
    }
    if (password === "") {
      alert("Please enter the password!");
      return;
    }
    const data = {
      userId: userName,
      password: password
    }
    fetch("https://localhost:7294/api/Users", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data)
    }).then(response => response.json()).then(dat => {
      
      // setting information in localStorage
      sessionStorage.setItem("isVerified", dat);
      if(dat == false)
      alert("user-name or password is incorrect!!");
      else
      navigate("/")
    });

  }

  return (
    <div className="App">  
    <SimpleNavbar/>
    <Routes>
    <Route path="/" element={isVerified() ? <ShowMenus /> : <Navigate to = "/login"/>} exact />
        <Route path="/login" element = {<Login  onClickHandeler = {onClickHandeler}/>}/>
        <Route path="/addCategory" element={isVerified() ? <AddCategory /> : <Navigate to = "/login"/>} />
        <Route path="/addDish" element={isVerified() ? <AddDish /> : <Navigate to = "/login"/>} />
        <Route path="/addMenu" element={isVerified() ? <AddMenu /> : <Navigate to = "/login"/>} />
        <Route path="/deleteCategory" element={isVerified() ? <DeleteCategory /> : <Navigate to = "/login"/>} />
        <Route path="/deleteDish" element={isVerified() ? <DeleteDish /> : <Navigate to = "/login"/>} />
        <Route path="/updateDish" element={isVerified() ? <UpdateDish /> : <Navigate to = "/login"/>} />
    </Routes>
    </div>
  );
}

export default App;


// login page component rendering
// {
//   isVerified === true ? <h1>You are at home page</h1> : isVerified === null ? <Login
//     userName={userName}
//     password={password}
//     onNameChangeHandeler={onNameChangeHandeler}
//     onPasswordChangeHandeler={onPasswordChangeHandeler}
//     onClickHandeler={onClickHandeler}
//     isValid={true}
//   /> : <Login
//     userName={userName}
//     password={password}
//     onNameChangeHandeler={onNameChangeHandeler}
//     onPasswordChangeHandeler={onPasswordChangeHandeler}
//     onClickHandeler={onClickHandeler}
//     isValid={false}
//   />
// }

// {
//   categories.map(cat => <CategoryCard
//     catName = {cat.catName}
//     catImage = {cat.catImage}
//     key = {cat.catId}
//   />)
// }

{/* <CategoriesByMenuId menuId = {11}/> */ }
{/* {
        data.map(dish => <DishCard
                dishName = {dish.dishName}
                dishImage = {dish.dishImage}
                dishDescription = {dish.dishDescription}
                dishNature = {dish.dishNature}
                dishPrice = {dish.dishPrice}
                key = {dish.dishId}
            />)
      } */}

{/* <CategoriesByMenuId menuId = {11}/> */ }
