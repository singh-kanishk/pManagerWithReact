
import FormLabel from "../atoms/FormLabel"
interface Validator{
    
    required?:boolean;
    min?:number;
    max?:number;
    minLength?:number;
    maxLength?:number;
    pattern?:string;
}
interface objectForLabel{
    label:string
    name:string;
    type:"text"|"password"|"email"|"select"|"text-area";
    value?:Array<string>;
    rows?:number;
    cols?:number;
    validator:Validator
}

interface FieldSetProp{
    fieldSetName:string;
    objectOfLabel:Array<objectForLabel>
}
function FieldSet({fieldSetName,objectOfLabel}:FieldSetProp){

    
    return(
    <fieldset className="border-2 p-3">
        <legend className="text-blue-400 font-bold">{fieldSetName}:</legend>
        {objectOfLabel.map((obj)=>(
            <FormLabel key={obj.name} name={obj.name} type={obj.type} label={obj.label} value={obj.value} rows={obj.rows} cols={obj.cols} validator={obj.validator}></FormLabel>            
        ))}
    </fieldset>
    )
}
export default FieldSet