import ItemBox from "../atoms/ItemBox";

interface boxDetail{
    itemId:number;
    itemName:string;
    createdAt:string | Date;
}
interface ItemAreaProp{
    boxNames:Array<boxDetail>
}
function ItemArea({boxNames}:ItemAreaProp){
    return (
    <main className="flex flex-col gap-4">
        <div className=" sticky top-[93.2px] z-1 bg-white pt-4 flex border-2 justify-between min-w-100 border-black  mr-6 ml-6 pr-4 pl-4 pb-2">
        <div className="flex gap-5">
            <input type="checkbox"></input>
            <p>Name</p>
        </div>
        
        </div>
        <hr></hr>
        <div className="flex flex-col gap-3">
        {boxNames.map((box)=>(
            <ItemBox key={box.itemId} date={box.createdAt?new Date(box.createdAt):new Date()} itemName={box.itemName}></ItemBox>
        )   )}
        </div>
    </main>
    );
}
export default ItemArea