import React, { useState, useEffect } from "react";
function AddMenu()
{
    const [menuName, setMenuName] = useState("");
    const [menuImageLink, setMenuImageLink] = useState("");

    function onClickHandeler()
    {
        const data = {
            menuName : menuName,
            menuImage : menuImageLink
        }
        fetch("https://localhost:7294/api/Menus", {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
          method : 'POST',
          mode : 'cors',
          body : JSON.stringify(data)
        })

        setMenuImageLink("");
        setMenuName("");
    }
    return <div>
        <form>
            <fieldset>
                <legend className="Details-Heading">Add Menu Details</legend>
                <input className="AllInputs"
                    placeholder="Enter Menu Name"
                    value = {menuName}
                    onChange = {
                        (event) => {setMenuName(event.target.value)}
                    }
                />
                <br/>
                <input className="AllInputs"
                    placeholder="Enter Menu Image link"
                    value = {menuImageLink}
                    onChange = {
                        (event) => {setMenuImageLink(event.target.value)}
                    }
                />
                <br/>
                <button className="Submit-button"
                    type = "button"
                    onClick = {
                        onClickHandeler
                    }
                >Submit</button>
            </fieldset>
        </form>
    </div>
}

export default AddMenu;