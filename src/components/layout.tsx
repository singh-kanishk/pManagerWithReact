import Folder from "./organism/Folder";
import Header from "./organism/Header";
import ItemArea from "./organism/ItemArea";
import Form from "./organism/Form";
function Layout(){
    return(
        <>
        <div className="grid min-h-screen grid-cols-[250px_1fr] grid-rows-[auto_1fr]">
            <div className="col-span-2">
                <Header></Header>
            </div>      
            <div>
                <Folder></Folder>
            </div>
            <div>
                <ItemArea boxNames={[]}></ItemArea>
            </div>
        </div>
        <Form buttonsInForm={[{name:"Save",width:"50px",height:"30px",onClick:()=>console.log("hello")}]}></Form>
        </>
    )
}
export default Layout