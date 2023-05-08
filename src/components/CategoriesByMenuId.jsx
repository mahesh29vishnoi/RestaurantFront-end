import React, { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import ShowMenus from "./ShowMenus";
import DishesByCatId from "./DishesByCatId";

function CategoriesByMenuId(props)
{
    function useFetchAllCategoriesByMenuId(menuId) {
        const [categories, setCategories] = useState([]);
        useEffect(() => {
            fetch("https://localhost:7294/api/Categories/menuId="+menuId).then(response => response.json()).then(data => {
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
    
    const categories = useFetchAllCategoriesByMenuId(props.menuId);

    const [goToMenu, setGoToMenu] = useState(false);
    const [catId, setCatId] = useState(null);
    function onClickHandeler()
    {
        setGoToMenu(true);
    }

    function onGetDishClickHandler(categoryId)
    {
        setCatId(categoryId);
    }
    
    return catId === null ?
    goToMenu === false ? <div className = "categories-menu">
        <button className = "go-to-menu-btn" onClick = {onClickHandeler}>Go to menu</button>
        {
            categories.length === 0 ? <h2 className = "categories-menu-no-cat">No Categories found</h2> :
            categories.map(category => <CategoryCard
                key = {category.catId}
                catName = {category.catName}
                catImage = {category.catImage}
                catId = {category.catId}
                onClickBtn = {onGetDishClickHandler}
            />)
        }
    </div> : <ShowMenus/> : <DishesByCatId catId = {catId} menuId = {props.menuId}/>
}
export default CategoriesByMenuId;