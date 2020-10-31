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

const Select = React.forwardRef(({ label , number }) => ( 
    <>
      <label style={{display:"block"}}>{label + ":"}</label>
      <select style={{display:"block",margin:"10px auto"}} name={label} ref={register({required: true})}>
      {number.map((elem ,id)=>{ return  <option key={id} value={elem}>{elem} pessoas</option>})}
      </select>
    </>
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
    data.filter((elem)=> {return (elem.visitDate === "2020-10-31")});
    const number = data.map((elem) => parseInt(elem.number));
    console.log(number);  
    setnumero(40 - number.reduce(function(total, val) { return total + val; }, 0));
})();
 
}, [])

const createarray = (e)=>{
 return Array.from({length:e},(v,k)=>k+1)
}

return(
  
    <div>
  <div style={{marginBottom:"40px"}}>
    {numero + " reservas disponiveis"}
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
    {/* register your input into the hook by invoking the "register" function */}
    <label>Telemóvel:</label>
      
      {/* imput number */}
      <input style={{margin:"10px auto"}} name="datatime" ref={register({ required: true , minLength:9,maxLength:9 })} />
      {errors.datatime && <p style={{color:"red",fontSize:"12px"}}>This field is required</p>}

        {/* number of people in the reservation */}
      <Select label="number" number={ (numero >= 6) ? createarray(6) : createarray(numero)} />
      <label>Data:</label>
        {/*  time of the reservation */}
      <input style={{margin:"15px auto"}} name="visitDate" type="date" onChange={handlechange}  required ref={register} />
      {/* errors will return when field validation fails  */}
      {sended && <p style={{color:"red",fontSize:"12px"}}>Pedido Enviado</p>}
      {loading && <p style={{color:"red",fontSize:"12px"}}>Carregar...</p>}
      {numero !== 0 &&  <input style={{margin:"auto"}} type="submit" />}
    </form>
    </div>
);

}