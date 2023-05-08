import React, { useState, useEffect } from "react";

function DeleteDish()
{
    const [selectedDishId, setSelectedDishId] = useState(null);

    function useFetchAllDishes()
{
    const [dishes, setDishes] = useState([]);
    useEffect(() => {
        console.log("hey");
        fetch("https://localhost:7294/api/Dishes").then(response => response.json()).then(data => {
            setDishes(prev => {
                const currDishes = [];
                data.forEach(dish=> {
                    const currDish = {};
                    currDish.dishId = dish.dishId;
                    currDish.dishPrice = dish.dishPrice;
                    currDish.dishName = dish.dishName;
                    currDish.dishDescription = dish.dishDescription;
                    currDish.dishNature = dish.dishNature;
                    currDish.dishImage = dish.dishImage;
                    currDishes.push(currDish);
                });
                return currDishes;
            })
        },)
    },[])
    return dishes;
}
    const dishes = useFetchAllDishes();

    function onClickHandeler()
    {
        if(selectedDishId === null)
        {
            alert("Please! Select a dish");
            return;
        }
        const dishName = dishes.find(dish => dish.dishId == selectedDishId).dishName;
        const consent = window.confirm("Are you sure? \n" + dishName + " will be deleted!");

        if(consent == false)
        return;

        fetch("https://localhost:7294/api/Dishes/" + selectedDishId, {
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            mode : 'cors',
            method : 'DELETE'
        })
    }

    return <div>
        <form>
            <fieldset>
                <legend className="Details-Heading">
                    Delete Dish
                </legend>
                <select className ="DropDown" onChange = {(event) => setSelectedDishId(event.target.value)}>
                    <option hidden>Select a dish</option>
                    {
                        dishes.map(dish => <option value = {dish.dishId} key = {dish.dishId}>{dish.dishName}</option>)
                    }
                </select>
                <br/>
                <button type = "button" className="Submit-button"
                onClick = {onClickHandeler}
                >Delete</button>
            </fieldset>
        </form>
    </div>
}

export default DeleteDish;