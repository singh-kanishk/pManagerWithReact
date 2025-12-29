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
    <div className="flex flex-col gap-4 border-2 w-1/3 p-4 overflow-y-auto min-w-100">
        <FieldSet fieldSetName="Item Details" objectOfLabel={[{name:"Item Name",type:"text"},{name:"Folder",type:"select",value:["No Folder"]}]}></FieldSet>
        <FieldSet fieldSetName="Login Credentials" objectOfLabel={[{name:"URL",type:"text"},{name:"UserName",type:"text"},{name:"Password",type:"password"}]}></FieldSet>
        <FieldSet fieldSetName="Note" objectOfLabel={[{name:"",type:"text-area",rows:5,cols:35}]}></FieldSet>
        <ButtonSection buttonInSection={buttonsInForm}></ButtonSection>
    </div>
    </div>)
}
export default Form