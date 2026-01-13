interface FormViewInterface{
       label:string;
       dataForLabel:string; 
}

function FormView({label,dataForLabel}:FormViewInterface){
    if(label!=="Folder")
    return (
    <div className="flex gap-2 items-center m-2">
        <label>{label}:-</label>
        <p className=" p-1 text-blue-500">{dataForLabel}</p>
    </div>)
    else{
        return null;
    }
}

export default FormView