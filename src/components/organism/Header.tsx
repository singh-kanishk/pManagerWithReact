import { useState } from "react";
import Button from "../atoms/Button";
import logo from "../../assets/logo.png";
import Form from "./Form";
interface dataForItemBox{
    itemId:number;
    itemName:string;
    createdAt:Date;    
}
interface headerProp {
    newItem:(data:dataForItemBox)=>void
}
function Header({newItem}:headerProp){
    const [isOpen,setIsOpen]=useState(false)
    function onClick():void{
    setIsOpen(!isOpen);
    }
return(

<header>
    <ul className="border-2 border-black m-4 pl-3 pr-3 pt-1 pb-1 flex items-center">
        <li className="mr-auto">
            <a href="http://localhost:5175/"> <img src={logo} alt="pManager Logo" width={'100px'} height={'33px'}/> </a>
        </li>
        <li>
        <Button name="New" buttonClassName="fi fi-rr-plus" onClick={onClick} width="50px" height="50px"></Button>
        </li>
    </ul>
    {isOpen&&<Form newItem={newItem} type="Add" buttonsInForm={[{name:"Save",width:"50px",height:"30px",type:"save"},{name:"Cancel",width:"50px",height:"30px",type:"cancel"}]}/>}
</header>
);
}
export default Header