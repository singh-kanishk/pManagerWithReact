interface buttonProp{
    name?:string;
    buttonClassName?:string;
    width:string;
    height:string;
    onClick?: () => void;
}

function Button(prop:buttonProp){
    if(prop.name)
    return (
<div className={`border-2 border-black rounded-2xl inline-flex flex-col justify-center items-center cursor-pointer`} style={{height:prop.height,width:prop.width}} onClick={prop.onClick} role="button">
    <i className={`${prop.buttonClassName} text-sm`}> </i>
    <div className="text-xs">
        {prop.name}
    </div>
</div>
    )
    else{
        return (
<div className={`border-2 border-black rounded-2xl inline-flex flex-col justify-center items-center cursor-pointer`} style={{height:prop.height,width:prop.width}} onClick={prop.onClick} role="button">
    <i className={`${prop.buttonClassName} text-sm`}> </i>    
</div>
    )
    }
}
export default Button