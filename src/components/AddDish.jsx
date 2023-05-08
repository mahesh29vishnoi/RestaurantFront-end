import React, { useState, useEffect } from "react";

function AddDish()
{

    const [hasError, setHasError] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [dishName, setDishName] = useState("");
    const [dishPrice, setDishPrice] = useState(0);
    const [dishDescription, setDishDescription] = useState("");
    const [dishNature, setDishNature] = useState(null);
    const [dishImage, setDishImage] = useState("");
    function useFetchAllCategories() {
        const [categories, setCategories] = useState([]);
        useEffect(() => {
            fetch("https://localhost:7294/api/Categories").then(response => response.json()).then(data => {
                setCategories(prev => {
                    const currCategories = [];
                    for (var i = 0; i < data.length; i++) {
                        const cat = data[i];
                        const currCat = {};
                        currCat.catId = cat.catId;
                        currCat.catName = cat.catName;
                        currCat.catImage = cat.catImage;
                        currCategories.push(currCat);
                    }
                    return currCategories;
                })
            })
        }, []);
        return categories; 
    }
    const categories = useFetchAllCategories();

    function onClickHandeler()
    {
        if(selectedCategoryId === null || dishName === "" || dishNature === null)
        {
            setHasError(true);
        }
        else
        {
            const data = {
                dishName : dishName,
                dishPrice : dishPrice,
                dishDescription : dishDescription,
                dishNature : dishNature,
                dishImage : dishImage
            }
            fetch("https://localhost:7294/api/Dishes/" + selectedCategoryId, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method : "POST",
                mode : "cors",
                body : JSON.stringify(data)
            })

            setDishName("");
            setDishImage("");
            setDishDescription("");
            setDishPrice(0);
        }
    }

    return <div>
        <form>
            <fieldset>
                <legend className="Details-Heading">
                    Enter Dish
                </legend>
                <select className ="DropDown"  onChange = {e => setSelectedCategoryId(e.target.value)}>
                    <option hidden>Choose a category</option>
                    {
                        categories.map(category => <option value = {category.catId} key = {category.catId}>{category.catName}</option>)
                    }
                </select>
                <br/>
                <input className="AllInputs"
                    placeholder="Enter Dish Name"
                    value = {dishName}
                    onChange = {(event) => setDishName(event.target.value)}
                />
                <br/>
                <input className="AllInputs"
                    placeholder="Enter Dish Price"
                    value = {dishPrice}
                    onChange = {(event) => setDishPrice(event.target.value)}
                    type = "number"
                    min={0}
                />
                <br/>
                <select className ="DropDown" onChange = {(e) => setDishNature(e.target.value)}>
                    <option hidden>Select Dish Nature</option>
                    <option value = "veg">Veg</option>
                    <option value = "non-veg">Non-veg</option>
                </select>
                <br/>
                <input className="AllInputs"
                    placeholder = "Enter dish image"
                    value = {dishImage}
                    onChange = {(event) => setDishImage(event.target.value)}
                />
                <br/>
                <textarea className="AllInputs"
                    placeholder="Enter description of dish"
                    value={dishDescription}
                    onChange = {(e) => setDishDescription(e.target.value)}
                />
                <br/>
                <button className="Submit-button"
                type = "button"
                onClick = {onClickHandeler}
                >Submit</button>
            </fieldset>
        </form>
    </div>
}

export default AddDish;