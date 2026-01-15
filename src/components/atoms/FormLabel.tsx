import {useEffect, useId} from 'react'
import { useFormContext, type RegisterOptions} from 'react-hook-form';
interface Validator{
    
    required?:boolean|string;
    min?:number;
    max?:number;
    minLength?:number;
    maxLength?:number;
    // Changed to handle both raw string or RHF pattern object
    pattern?: string | { value: RegExp; message: string };
}
interface FormLabelProp{
    name:string;
    label:string;
    type:"text"|"password"|"email"|"select"|"text-area";
    value?:Array<string>
    rows?:number    
    cols?:number
    validator?: Validator
    dataForFormView?:string    
}



function FormLabel({name,label,type,value=[],rows,cols,validator={},dataForFormView}:FormLabelProp){
    const {register,setValue}=useFormContext();
    const id=useId();
    
    const validationRules = validator as RegisterOptions;

    useEffect(() => {
        if (dataForFormView) {
            setValue(name, dataForFormView);
        }
    }, [dataForFormView, name, setValue])

    if(type=="text"||type=="password"||type=="email")
    return(
        <div className='flex flex-col gap-1 pl-3 pr-3'>
            <label  htmlFor={id} className='font-bold text-lg'>{label}: </label>
            <input {...register(name,validationRules)} type={type} id={id} placeholder={`Enter ${name}...`}    
            className='border-2 pl-3 pr-3 p-1' />
        </div>)
    
    else if(type=="select"&&value){
        return (
            <div className='flex flex-col gap-1 pl-3 pr-3'>
                <label htmlFor={id} className='font-bold text-lg'>{label}: </label>
                <select {...register(name,validationRules)} id={id}  className={`cursor-pointer border-2}`}>
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
            <textarea {...register(name,validationRules)} id={id}  rows={rows||3} cols={cols||20} className='border-2 pl-3 pr-3 p-1' placeholder={`Enter Data ...`} />
            </div>
        )
    }
    else return null;

}
export default FormLabel