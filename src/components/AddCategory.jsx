import React, { useEffect, useState } from "react";




function AddCategory()
{
    const [selectedMenuId, setSelectedMenuId] = useState(null);
    const [categoryName, setCategoryName] = useState("");
    const [categoryImage, setCategoryImage] = useState("");
    const [hasError, setHasError] = useState(false);
    function useFetchAllMenus() {
        const [menuList, setMenuList] = useState([]);
        useEffect(() => {
            fetch("https://localhost:7294/api/Menus").then(response => response.json()).then(data => {
                setMenuList(prevData => {
                    const currMenuList = [];
                    for (var i = 0; i < data.length; i++) {
                        const menu = data[i];
                        const currMenu = {};
                        currMenu.menuId = menu.menuId;
                        currMenu.menuName = menu.menuName;
                        currMenu.menuImage = menu.menuImage;
    
                        currMenuList.push(currMenu);
                    }
    
                    return currMenuList;
                })
            });
        }, []);
        return menuList;
    }
    const data = useFetchAllMenus();

    function onClickHandeler()
    {
        if(categoryName === "" || selectedMenuId === null)
        {
            setHasError(true);
        }
        else
        {
            const data = {
                catName : categoryName,
                catImage : categoryImage
            }
            fetch("https://localhost:7294/api/Categories/" + selectedMenuId, {
            headers : {
                'Accept' : "application/json",
                'Content-Type' : "application/json"
            },
            method : "POST",
            mode : "cors",
            body : JSON.stringify(data)
        })

        setHasError(false);
        setCategoryImage("");
        setCategoryName("");
        }
    }

    return <div>
    <form>
    <fieldset>
    <legend className="Details-Heading">
        Enter category
    </legend>
        <select className ="DropDown" onChange={(event) => {setSelectedMenuId(event.target.value); }} required>
            <option hidden>select a menu</option>
            {
                data.map((menu,index) => <option key = {index} value = {menu.menuId}>{menu.menuName}</option>)
            }
        </select>
        <br/>
        <input className="AllInputs"
            placeholder="Enter category name"
            value = {categoryName}
            onChange = {(event) => setCategoryName(event.target.value)}
        />
        <br/>
        <input className="AllInputs"
            placeholder="Enter category image"
            value = {categoryImage}
            onChange = {(event)=> setCategoryImage(event.target.value)}
        />
        <br/>
        <button className="Submit-button"
            onClick={onClickHandeler}
            type = "button"
        >Submit</button>
        {
            hasError ? <p>Enter all fields</p> : null
        }
        </fieldset>
    </form>
    </div>
}

export default AddCategory;