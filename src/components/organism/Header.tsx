import Button from "../atoms/Button";
import logo from "../../assets/logo.png";

function Header(){
return(
<header>
    <ul className="border-2 border-black m-4 pl-3 pr-3 pt-1 pb-1 flex items-center ">
        <li className="mr-auto">
            <a href="http://localhost:5175/"> <img src={logo} alt="pManager Logo" width={'100px'} height={'33px'}/> </a>
        </li>
        <li>
        <Button name="New" buttonClassName="fi fi-rr-plus" width="50px" height="50px"></Button>
        </li>
    </ul>
</header>
);
}
export default Header