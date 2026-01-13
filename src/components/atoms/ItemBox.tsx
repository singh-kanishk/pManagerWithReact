import { useState } from "react";
import Form from "../organism/Form";
import { ItemBoxContext } from "../../hooks/ItemBoxContext";

interface itemBoxProp{
 itemId:number;
 itemName:string;
 date:Date;
};
export interface itemDataFromServer{
    itemName:string;
    url:string;
    userName:string;
    password:string;
    note?:string;
}


function ItemBox(prop:itemBoxProp){

const [isClicked,setIsClicked]=useState(false)
const [itemData,setItemData]= useState<itemDataFromServer|undefined>(undefined)

const onClick= async function(){
    try{
        const response = await fetch(`http://localhost:2995/api/view/${prop.itemId}`)
        if(!response.ok){
            console.error ("Bad Server Response")
            return;
        }
        const responseJson= await response.json()
        setItemData(responseJson.body)
        setIsClicked(true)
    }
    catch{
        console.error("Error while fetching data")
        
        setItemData(undefined)
    }
}

    return (   
        <ItemBoxContext.Provider value={itemData}>
        <> 
        <ul onClick={() => isClicked ? setIsClicked(false) : onClick()} className="flex border-2 justify-between min-w-100 border-black  mr-6 ml-6 pr-4 pl-4 pt-2 pb-2">
        <li className="flex gap-5">
            <input type="checkbox" onClick={(e) => e.stopPropagation()} />
            <p>{prop.itemName}</p>
        </li>
        <li className="flex items-center">

            <p className="text-xs">{prop.date.toLocaleDateString()} at {prop.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </li>        
        </ul>
        {isClicked && itemData && <Form type="View" buttonsInForm={[{name:"Edit",width:"50px",height:"30px",type:"save"},{name:"Cancel",width:"50px",height:"30px",type:"cancel"}]}/>}
        </>
        </ItemBoxContext.Provider>
    )
}
export default ItemBox