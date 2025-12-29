import Folder from "./organism/Folder";
import Header from "./organism/Header";
import ItemArea from "./organism/ItemArea";
function Layout(){
    return(
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
    
    )
}
export default Layout