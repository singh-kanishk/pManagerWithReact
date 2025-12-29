import ItemBox from "../atoms/ItemBox";

interface ItemAreaProp{
    boxNames:Array<string>
}
function ItemArea({boxNames}:ItemAreaProp){
    return (
    <main className="flex flex-col gap-4">
        <div className="pt-4">
        <ItemBox itemName="Name"/>
        </div>
        <hr></hr>
        <div className="flex flex-col gap-3">
        {boxNames.map((boxName,index)=>(
            <ItemBox key={index} itemName={boxName}></ItemBox>
        )   )}
        </div>
    </main>
    );
}
export default ItemArea