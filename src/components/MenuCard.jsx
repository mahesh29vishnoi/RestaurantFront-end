import React from "react";

function MenuCard(props)
{
    return <div className = "menu-card">
        <h2 className = "menu-card-heading">{props.menuName}</h2>
        <button className = "menu-card-btn" onClick = {() => props.onClickHandeler(props.menuId)} >Get Categories</button>
        <img src = {props.menuImage} alt = {props.menuName} className = "menu-card-img"/>
    </div>
}

export default MenuCard;