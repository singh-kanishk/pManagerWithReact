import { useForm , FormProvider} from "react-hook-form";
import FieldSet from "../molecules/FieldsetInForm"
import ButtonSection from "../molecules/ButtonSectionInForm"
import { useState } from "react";
import { useLayoutContext } from "../../hooks/LayoutContext";
import { useItemBoxContext } from "../../hooks/ItemBoxContext";

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
    nextState?:Array<buttonProp>
    itemId?:number;
};
interface FormData{
    itemName:string;
    folder:string;
    url:string;
    userName:string;
    password:string;
    note:string;
}

function Form({ type ,buttonsInForm,nextState,itemId}:FormProp){
    
const methods= useForm<FormData>();
const isReadOnly = type === "View";
const [isHidden,setIsHidden]=useState(false);
const [isEditting,setIsEditting]=useState(false)
const funcForNewItem= useLayoutContext();
const[isStateChanged,setIsStateChanged]=useState(false)

async function onSave(data:FormData){

if(isEditting){
   try{
        const response= await fetch(`http://localhost:2995/api/save/${itemId}`,
            {
                method:"PUT",
                headers:{
                            'Content-Type': 'application/json'
                        } ,
                body:JSON.stringify(data)
            })
        if(!response.ok){
            throw new Error("Problem While updating")
        }
        const result = await response.json()
        console.log(result.message + "->"+result.body)
        setIsHidden(true)
   }
   catch{
    console.error("Error in updating data")
   }
}
else 
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
    const result=await response.json();
    if(!response.ok){
        throw new Error("Bad Server Response")
    }
    const createdAtValue = result.time?.createdAt ?? new Date().toISOString()
    console.log("showing pushed data : "+JSON.stringify({itemName:data.itemName,createdAt:createdAtValue,itemId:result.id}))
    if(funcForNewItem!==undefined){
    funcForNewItem({itemName:data.itemName,createdAt:createdAtValue,itemId:result.id})
    }
    alert(`Data Submitted`);
    setIsHidden(true)
}
catch(error){
    console.error('Error:', error);
    
      alert('Submission failed.');
}

}
function onCancel(){
    setIsHidden(true)
}    
function onEdit(){
    setIsEditting(true)
    setIsStateChanged(true)
}
const dataForItemBox=useItemBoxContext();
return (  
<FormProvider {...methods}>     
<div className={`fixed inset-0 flex z-10 items-center justify-center bg-gray-100 ${isHidden?"hidden":""}`}>
    <form 
    onSubmit={methods.handleSubmit(onSave)}
    className={`flex flex-col gap-4 border-2 w-1/3 p-4 overflow-y-auto min-w-100`}>
        <FieldSet isReadOnly={isReadOnly} isEditting={isEditting} fieldSetName="Item Details" objectOfLabel={[{label:"Item Name",name:"itemName" ,type:"text",validator:{required:true},dataForFormView:dataForItemBox?.itemName},{name:"folder", label:"Folder",type:"select",value:["No Folder"],validator:{required:true}}]}></FieldSet>
        <FieldSet isReadOnly={isReadOnly} isEditting={isEditting} fieldSetName="Login Credentials" objectOfLabel={[{name:"url",validator:{},label:"URL",type:"text",dataForFormView:dataForItemBox?.url},{label:"User Name",name:"userName",type:"text",validator:{required:true},dataForFormView:dataForItemBox?.userName},{name:"password",label:"Password",type:"password",validator:{required:true},dataForFormView:dataForItemBox?.password}]}></FieldSet>
        <FieldSet isReadOnly={isReadOnly} isEditting={isEditting} fieldSetName="Note" objectOfLabel={[{name:"note",label:"",type:"text-area",validator:{},rows:5,cols:35,dataForFormView:dataForItemBox?.note}]}></FieldSet>
        <ButtonSection onCancel={onCancel} onEdit={onEdit} buttonInSection={buttonsInForm} isStateChanged={isStateChanged} nextState={nextState}></ButtonSection>
    </form>
   
    </div>
     </FormProvider>
     )
     
}
export default Form