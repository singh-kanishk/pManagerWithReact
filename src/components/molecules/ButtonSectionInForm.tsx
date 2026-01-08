import Button from "../atoms/Button"

interface objectOfButtons{
    name?:string;
    buttonClassName?:string;
    width:string;
    height:string;
    type:"save"|"cancel"|"edit";
       
}
interface ButtonSectionProp{
    buttonInSection:Array<objectOfButtons>
    onSave?:()=>void
    onCancel?:()=>void
    onEdit?:()=>void
}


function ButtonSection(    
{buttonInSection,onSave,onCancel,onEdit}:ButtonSectionProp
){
    const handler :Record <objectOfButtons["type"] , (()=>void)|undefined > ={
    save:onSave,
    cancel:onCancel,
    edit:onEdit
}
return(
<div className="flex gap-4 p-2 border-2">
{buttonInSection.map((obj,index)=>(
    <Button key={index} name={obj.name} typeOfButton={obj.type=="save"?"submit":"button"} buttonClassName={obj.buttonClassName} width={obj.width} height={obj.height} onClick={handler[obj.type]}></Button>
    ))}
</div>)
}
export default ButtonSection