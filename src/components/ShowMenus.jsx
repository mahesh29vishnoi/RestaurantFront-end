import React, { useState, useEffect } from "react";
import MenuCard from "./MenuCard";
import CategoriesByMenuId from "./CategoriesByMenuId";

function ShowMenus()
{
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
    
    const menus = useFetchAllMenus();
    const [menuId, setMenuId] = useState(null);
    function onClickHandeler(menuId)
    {
        setMenuId(menuId)
    }
    return menuId === null ? <div className = "show-menus">
    {
        menus.length === 0 ? <h2 className = "show-menus-no-menu">No data found</h2> :
        
            menus.map(menu =>  <MenuCard
                menuId = {menu.menuId}
                menuName = {menu.menuName}
                menuImage = {menu.menuImage}
                key = {menu.menuId}
                onClickHandeler = {onClickHandeler}
            />
            )

        
    }
</div> : <CategoriesByMenuId menuId = {menuId}/>
}

export default ShowMenus;