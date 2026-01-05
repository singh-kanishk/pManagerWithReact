
import FieldSet from "../molecules/FieldsetInForm"
import ButtonSection from "../molecules/ButtonSectionInForm"
interface buttonProp{
    name?:string;
    buttonClassName?:string;
    width:string;
    height:string;
}
interface FormProp{
    buttonsInForm:Array<buttonProp>
};
function Form({buttonsInForm}:FormProp){
     
    return (
       

<div className="fixed inset-0 flex items-center justify-center bg-gray-100">
    <form className="flex flex-col gap-4 border-2 w-1/3 p-4 overflow-y-auto min-w-100">
        <FieldSet fieldSetName="Item Details" objectOfLabel={[{name:"Item Name",label:"itemName" ,type:"text"},{name:"folder", label:"Folder",type:"select",value:["No Folder"]}]}></FieldSet>
        <FieldSet fieldSetName="Login Credentials" objectOfLabel={[{name:"url",label:"URL",type:"text"},{label:"UserName",name:"userName",type:"text"},{name:"password",label:"Password",type:"password"}]}></FieldSet>
        <FieldSet fieldSetName="Note" objectOfLabel={[{name:"note",label:"",type:"text-area",rows:5,cols:35}]}></FieldSet>
        <ButtonSection buttonInSection={buttonsInForm}></ButtonSection>
    </form>
    </div>)
}
export default Form