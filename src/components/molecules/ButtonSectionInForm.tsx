import Button from "../atoms/Button"
interface objectOfButtons{
    name?:string;
    buttonClassName?:string;
    width:string;
    height:string;
    onClick?:()=>void;    
}
interface ButtonSectionProp{
    buttonInSection:Array<objectOfButtons>
}
function ButtonSection(
{buttonInSection}:ButtonSectionProp
){
return(
<div className="flex gap-4 p-2 border-2">
{buttonInSection.map((obj,index)=>(
    <Button key={index} name={obj.name} buttonClassName={obj.buttonClassName} width={obj.width} height={obj.height} onClick={obj.onClick}></Button>
))}
</div>)
}
export default ButtonSection