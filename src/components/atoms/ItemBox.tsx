interface itemBoxProp{

 itemName:string;
};

function ItemBox(prop:itemBoxProp){
    return (
    <div className="flex border-2 border-black gap-5 mr-6 ml-6 pr-4 pl-4 pt-2 pb-2">
        <input type="checkbox"></input>
        <p>{prop.itemName}</p>
    </div>)
}
export default ItemBox