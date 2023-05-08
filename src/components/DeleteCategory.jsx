import React, { useState, useEffect } from "react";

function DeleteCategory() {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
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
        if(selectedCategoryId === null)
        {
            alert("Please! Select a category!");
            return;
        }
        const categoryName = categories.find(cat => cat.catId == selectedCategoryId).catName;
        
        const consent = window.confirm("Are you sure?\n" + categoryName + " will be deleted!");
        if(consent === false)
        return;

        fetch("https://localhost:7294/api/Categories/" + selectedCategoryId, {
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            method : 'DELETE',
            mode : 'cors'
        })
    }
    return <div>
        <form>
            <fieldset>
                <legend className="Details-Heading">
                    Delete Category
                </legend>
                <select className ="DropDown" onChange={(event) => setSelectedCategoryId(event.target.value)}>
                    <option hidden>Select a category</option>
                    {
                        categories.map(category => <option value={category.catId} key={category.catId}>{category.catName}</option>)
                    }
                </select>
                <br />
                <button className="Submit-button" type="button" onClick={onClickHandeler}>Delete</button>
            </fieldset>
        </form>

    </div>
}

export default DeleteCategory;