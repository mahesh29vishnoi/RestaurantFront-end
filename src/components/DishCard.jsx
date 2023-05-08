import React from "react";

function DishCard(props)
{
    console.log("hello");
    return <div className = "dish-card">
        <img src = {props.dishImage} alt = {props.dishName}
            className = "dish-card-img"
        />
        <h2 className="Dish-card-Heading">{props.dishName}</h2>
        <h3>Price : &#8377;{props.dishPrice}</h3>
        <h3>{props.dishNature}</h3>
        <p>{props.dishDescription}</p>
    </div>
}

export default DishCard;