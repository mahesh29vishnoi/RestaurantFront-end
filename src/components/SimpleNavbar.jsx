import React from "react";
import { useNavigate } from "react-router-dom";



function SimpleNavbar() {
    const navigate = useNavigate();

    

    return <div style=
        {{
            display: "flex",
            gap: "50px",
            marginTop: "-8px",
            marginBottom: "100px",
            marginLeft: "0px",
            marginRight : "-10px",
            // marginRight: "-100px",
            backgroundColor: "#FCFFB2",
            position: "sticky",
            zIndex : "1",
            width : "100%",

        }}>
        <div style={{display: "none"}}>.</div>
        <h1 style={{ color: 'blue', textAlign: "center", fontSize: "50px", fontStyle: "italic" }}>Dhaba Express</h1>
        <button className = "nav-btn" style={{ backgroundColor: '#FCFFB2', width: "100px", border: "none", fontSize: "25px", color: "Red",fontWeight: "bolder"}} onClick={() => navigate("/")}>Home</button>
        <button className = "nav-btn" style={{ backgroundColor: '#FCFFB2', width: "100px",border: "none",fontSize: "25px", color: "Red",fontWeight: "bolder"}} onClick={() => navigate("/addDish")}>Add Dish</button>
        <button className = "nav-btn" style={{ backgroundColor: '#FCFFB2', width: "100px",border: "none",fontSize: "25px", color: "Red",fontWeight: "bolder"}} onClick={() => navigate("/addCategory")}>Add Category</button>
        <button className = "nav-btn" style={{ backgroundColor: '#FCFFB2', width: "100px",border: "none",fontSize: "25px", color: "Red",fontWeight: "bolder"}} onClick={() => navigate("/addMenu")}>Add Menu</button>
        <button className = "nav-btn" style={{ backgroundColor: '#FCFFB2',width: "100px",border: "none",fontSize: "25px", color: "Red",fontWeight: "bolder"}} onClick={() => navigate("/deleteCategory")}>Delete Category</button>
        <button className = "nav-btn" style={{ backgroundColor: '#FCFFB2',width: "100px",border: "none",fontSize: "25px", color: "Red",fontWeight: "bolder"}} onClick={() => navigate("/deleteDish")}>Delete Dish</button>
        <button className = "nav-btn" style={{ backgroundColor: '#FCFFB2',width: "100px",border: "none",fontSize: "25px", color: "Red",fontWeight: "bolder"}} onClick={() => navigate("/updateDish")}>Update Dish</button>
        <button className = "nav-btn" style={{ backgroundColor: '#FCFFB2',width: "100px",border: "none",fontSize: "25px", color: "Red",fontWeight: "bolder"}} onClick={() => {
            sessionStorage.setItem("isVerified", false);
            navigate("/login");
        }}>Log out</button>
    </div>
}

export default SimpleNavbar;