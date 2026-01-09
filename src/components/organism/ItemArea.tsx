import ItemBox from "../atoms/ItemBox";

interface boxDetail{
    itemName:string;
    createdAt:Date;
}
interface ItemAreaProp{
    boxNames:Array<boxDetail>
}
function ItemArea({boxNames}:ItemAreaProp){
    return (
    <main className="flex flex-col gap-4">
        <div className="pt-4 flex border-2 justify-between min-w-100 border-black  mr-6 ml-6 pr-4 pl-4 pb-2">
        <div className="flex gap-5">
            <input type="checkbox"></input>
            <p>Name</p>
        </div>
        </div>
        <hr></hr>
        <div className="flex flex-col gap-3">
        {boxNames.map((box,index)=>(
            <ItemBox key={index} date={new Date (box.createdAt)} itemName={box.itemName}></ItemBox>
        )   )}
        </div>
    </main>
    );
}
export default ItemArea