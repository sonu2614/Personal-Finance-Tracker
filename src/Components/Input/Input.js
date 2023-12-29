import "./input.css"

function Input({label ,state,setState,placeholder,type}){
    return(
        <div className="input-wrapper">
            <p className="label-input">{label}</p>
            {/* Original input */}
            <input className="custom-input" placeholder={placeholder} value={state} onChange={(e)=>setState(e.target.value) } type={type}/>
        </div>
    )
}
export default Input