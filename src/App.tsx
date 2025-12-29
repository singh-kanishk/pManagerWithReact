
import ItemArea from "./components/organism/ItemArea"
import Form from "./components/organism/Form"
function App() {
  

  return (
    <>
    <Form buttonsInForm={[{name:"Save",height:"50px",width:"50px"},{name:"Cancel",height:"50px",width:"50px"}]}></Form>
    <ItemArea boxNames={["kanisjk","ejije","ejcned"]}></ItemArea>
    </>
  )
}

export default App