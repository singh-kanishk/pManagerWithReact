import { createContext, useContext } from "react";
import {type dataForItemBox } from "../components/layout";

interface dataForItemInterface{
    funcForDataForItem:(data:dataForItemBox)=>Promise<void>
}

export const LayoutContext= createContext<dataForItemInterface|undefined>(undefined)

export const useLayoutContext = function(){
    const data= useContext(LayoutContext);
    if(data===undefined){
        console.error ('undefined in context')
        return;
    }
    return data.funcForDataForItem;
}
