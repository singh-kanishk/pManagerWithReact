interface itemBoxProp{
 itemName:string;
 date:Date;
};

function ItemBox(prop:itemBoxProp){
    
    return (
    
        <ul className="flex border-2 justify-between min-w-100 border-black  mr-6 ml-6 pr-4 pl-4 pt-2 pb-2">
        <li className="flex gap-5">
            <input type="checkbox"></input>
            <p>{prop.itemName}</p>
        </li>
        <li className="flex items-center">

            <p className="text-xs">{prop.date.toLocaleDateString()} at {prop.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </li>
        
        </ul>
    )
}
export default ItemBox