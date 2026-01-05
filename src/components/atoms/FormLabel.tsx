import {useId} from 'react'
interface FormLabelProp{
    name:string;
    label:string;
    type:"text"|"password"|"email"|"select"|"text-area";
    value?:Array<string>
    rows?:number    
    cols?:number
}



function FormLabel({name,label,type,value,rows,cols}:FormLabelProp){
    const id=useId();
    if(type=="text"||type=="password"||type=="email")
    return(
        <div className='flex flex-col gap-1 pl-3 pr-3'>
            <label htmlFor={id} className='font-bold text-lg'>{label}: </label>
            <input type={type} id={id} name={name} placeholder={`Enter ${name}...`} 
            className='border-2 pl-3 pr-3 p-1' />
        </div>)
    
    else if(type=="select"&&value){
        return (
            <div className='flex flex-col gap-1 pl-3 pr-3'>
                <label htmlFor={id} className='font-bold text-lg'>{label}: </label>
                <select id={id} name={name} className='cursor-pointer '>
                    {
                    value.map((item,index)=>(
                        <option key={index} value={item}>{item}</option>
                    ))
                    }
                </select>
            </div>
        )
    }
    
    else if(type=="text-area"){
        return(
            <div className='flex flex-col gap-1 pl-3 pr-3'>
                <label htmlFor={id} className='font-bold text-lg'>{label} </label>
            <textarea id={id} name={name} rows={rows||3} cols={cols||20} className='border-2 pl-3 pr-3 p-1' placeholder={`Enter Data ...`}/>
            </div>
        )
    }
    else return null;

}
export default FormLabel