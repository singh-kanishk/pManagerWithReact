import { useForm , FormProvider} from "react-hook-form";

import FieldSet from "../molecules/FieldsetInForm"
import ButtonSection from "../molecules/ButtonSectionInForm"
interface buttonProp{
    name?:string;
    buttonClassName?:string;
    type:"save"|"cancel"|"edit";
    width:string;
    height:string;
    onClick?:()=>void;
}
interface FormProp{
    type:"Add"|"View";
    buttonsInForm:Array<buttonProp>
};
interface FormData{
    itemName:string;
    folder:string;
    url:string;
    userName:string;
    password:string;
    note:string;
}

function Form({ type ,buttonsInForm}:FormProp){
    
    const methods= useForm<FormData>();

    async function onSave(data:FormData){
    
try {
    const response=await fetch ("http://localhost:2995/api/save",        
        {
        method:"POST",
        headers:{
                'Content-Type': 'application/json'
                },
        body:JSON.stringify(data)
        }
    )
    if(!response.ok){
        throw new Error("Bad Server Response")
    }
    console.log(data)
    alert(`Data Submitted`);
}
catch(error){
    console.error('Error:', error);
    
      alert('Submission failed.');
}

}
    
    if (type==="Add")
    return (  
<FormProvider {...methods}>     
<div className="fixed inset-0 flex items-center justify-center bg-gray-100">
    <form 
    onSubmit={methods.handleSubmit(onSave)}
    className="flex flex-col gap-4 border-2 w-1/3 p-4 overflow-y-auto min-w-100">
        <FieldSet fieldSetName="Item Details" objectOfLabel={[{label:"Item Name",name:"itemName" ,type:"text",validator:{required:true}},{name:"folder", label:"Folder",type:"select",value:["No Folder"],validator:{required:true}}]}></FieldSet>
        <FieldSet fieldSetName="Login Credentials" objectOfLabel={[{name:"url",validator:{},label:"URL",type:"text"},{label:"User Name",name:"userName",type:"text",validator:{required:true}},{name:"password",label:"Password",type:"password",validator:{required:true}}]}></FieldSet>
        <FieldSet fieldSetName="Note" objectOfLabel={[{name:"note",label:"",type:"text-area",validator:{},rows:5,cols:35}]}></FieldSet>
        <ButtonSection  buttonInSection={buttonsInForm}></ButtonSection>
    </form>
   
    </div>
     </FormProvider>
     )
     return null;
}
export default Form