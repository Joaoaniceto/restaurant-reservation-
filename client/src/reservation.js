import React, {useState,useEffect} from 'react';
import { useForm } from "react-hook-form";
import { sendmessage , receive} from './api';






export default function Reservation(){
    const { register, handleSubmit, watch, errors} = useForm();
    
    
   async function onSubmit(data){
        setloading(true);
        try{
         await sendmessage(data);
         setloading(false);
         setsended(true);
        } catch (err){
            console.log(err);
        }
    }
  

const [numero, setnumero] = useState(null);
const [sended, setsended] = useState(false);
const [loading, setloading] = useState(false);

const Select = React.forwardRef(({ label , number ,attribute}) => ( 
    <div style={{}}>
      <label style={{display:"block"}}>{label + ":"}</label>
      <select style={{display:"block",margin:"10px auto",border:"none",borderBottom:"2px solid black"}} name={label} ref={register({required: true})}>
      {number.map((elem ,id)=>{ return  <option key={id} value={elem}>{elem}{attribute}</option>})}
      </select>
    </div>
  ));



const handlechange = async (e) =>{
  const data = await receive();
 var a = data.filter((elem)=> {return (elem.visitDate === e.target.value)});
 const number = a.map((elem) => parseInt(elem.number));
 console.log(a);
return setnumero(40 - number.reduce(function(total, val) { return total + val; }, 0));
}

useEffect(() => {
  document.title = numero;
})


useEffect(() => {( async () =>{
    const data = await receive();
    var today = new Date();
     var date = today.getFullYear()+'-'+(today.getMonth()+1)+ '-' + ( today.getDate()<10 ? "0" + today.getDate() : today.getDate()  );
   var a =data.filter(elem => elem.visitDate === date);
    const number = a.map((elem) => parseInt(elem.number));
    console.log(number);  
    setnumero(40 - number.reduce(function(total, val) { return total + val; }, 0));
})();
 
}, [])

const createarray = (e)=>{
 return Array.from({length:e},(v,k)=>k+1)
}

const gethours = ()=>{
  var timeArray = [];
  var d = new Date();
  var h = 18;
  var m = 30;
  
  for (var i = h; i <= 22; i++) {
     for (var j = m; j <= 60; j++) {

         if (j % 30 === 0  && 60 !== j) {
              j = j === 0 ? '00' : j;
              timeArray.push(i + ':30')
              
          }
         if (j === 60) timeArray.push(i+1   + ':00');
      }
 }
 console.log(timeArray);
 return timeArray;
}
 

return(
    <div style={{border:"2px solid white",width:"20%",margin:"0% auto",padding:"20px",borderRadius:"10px",webkitBoxShadow:"8px 19px 22px 0px rgba(0,0,0,0.66)", 
    boxShadow: "8px 19px 22px 0px rgba(0,0,0,0.66)"}}>
  <div style={{marginBottom:"40px"}}>
    {numero + " reservas disponiveis"}
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
    {/* register your input into the hook by invoking the "register" function */}
    <label>Telemóvel:</label>
      
      {/* imput number */}
      <input style={{margin:"10px auto",border:"none",borderBottom:"2px solid black",}} name="datatime" ref={register({ required: true , minLength:9,maxLength:9 })} />
      {errors.datatime && <p style={{color:"red",fontSize:"12px"}}>This field is required</p>}
<div style={{display:"flex",justifyContent:"space-evenly", margin:"auto"}}>
        {/* number of people in the reservation */}
      <Select  label="numero" attribute={" pessoas"} number={ (numero >= 6) ? createarray(6) : createarray(numero)} />
          {/*  time of the reservation */}
          <Select label="hora" attribute={""} number={gethours()} />
          </div>
          {/*  day of the reservation */}
      <label>Data:</label>
      <input style={{margin:"15px auto",border:"none",borderBottom:"2px solid black"}} defaultValue={1/10/2020}  name="visitDate" type="date" onChange={handlechange}  required ref={register} />
      {/* errors will return when field validation fails  */}
      {sended && <p style={{color:"red",fontSize:"12px"}}>Pedido Enviado</p>}
      {loading && <p style={{color:"red",fontSize:"12px"}}>Carregar...</p>}
      {numero !== 0 &&  <input style={{margin:"auto"}} type="submit" />}
    </form>
    </div>
);

}