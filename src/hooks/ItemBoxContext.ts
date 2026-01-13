import { createContext, useContext } from "react";
import {type itemDataFromServer } from "../components/atoms/ItemBox";

export const ItemBoxContext = createContext<itemDataFromServer|undefined>(undefined)
export function useItemBoxContext() {
    const data= useContext(ItemBoxContext)
    if(ItemBoxContext===undefined){
        console.error("undefined context")
        return;
    }    
    return data;
}