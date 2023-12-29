import "./button.css"
function Button({text,loading,onClick,blue}) {
    return (  
          <div className={blue?"btn btn-blue":"btn"} onClick={onClick} > 
          {/* {console.log(loading)} */}
                    {loading===true ? "Loading....." : text }
           </div>
         )
  }
  
  export default Button;