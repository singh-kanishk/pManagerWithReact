
interface eachLabel{
    name:string;
    data:string;
}
interface FormOnViewProp{
    arrayOfForms:Array<eachLabel>
}

function FormOnView({arrayOfForms}:FormOnViewProp){

    return (
        arrayOfForms.map( (obj) =>(
            <div key={obj.name}>
                <label>{obj.name}</label>
                <p>{obj.data}</p>
            </div>
        ))
    )
}

export default FormOnView