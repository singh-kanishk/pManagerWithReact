import { useState,useEffect } from "react";
import Folder from "./organism/Folder";
import Header from "./organism/Header";
import ItemArea from "./organism/ItemArea";


interface dataForItemBox{
    itemId:number;
    itemName:string;
    createdAt:Date;    
}
function Layout(){

const[items,setItems]=useState<dataForItemBox[]>([]);


// async function fetchItems(){  
//     try{
//         const response= await fetch("http://localhost:2995/api")
//         if(!response.ok){
//             throw new Error ("Error while fetching data")
//         }
//         const data =await response.json
        
//         setItems(data);
//  }
//  catch {
//     return [];
//  } 
//  }
     
useEffect(()=>{
    async function fetchItems(){  
    try{
        const response= await fetch("http://localhost:2995/api")
        if(!response.ok){
            console.error("Error while fetching data from client")
        }
        const result =await response.json()
        
       setItems(result.data||[]);
 }
 catch {
    setItems([])
 } 
 }
 fetchItems()
},[items])
    
const addNewItem=(data:dataForItemBox)=>{
    setItems(items.concat(data))
}

    return(
        <>
        <div className="grid min-h-screen grid-cols-[250px_1fr] grid-rows-[auto_1fr]">
            <div className="col-span-2 sticky top-0 z-1 bg-white">
                <Header newItem={addNewItem}></Header>
            </div>      
            <div>
                <Folder></Folder>
            </div>
            <div>
                <ItemArea boxNames={items}></ItemArea>
            </div>
        </div>
        </>
    )
}
export default Layout