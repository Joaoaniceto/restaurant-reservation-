import React, {useState,useEffect} from 'react';
import { useForm } from "react-hook-form";
import { sendmessage } from './api';






export default function Reservation(){
    const { register, handleSubmit, watch, errors} = useForm();
    
   async function onSubmit(data){
    alert(data);
        setloading(true);
        try{
         await sendmessage(data);
         setloading(false);
         setsended(true);
        } catch (err){
            console.log(err);
        }
    }
  


const [sended, setsended] = useState(false);
const [loading, setloading] = useState(false);

const Select = React.forwardRef(({ label }) => ( 
    <>
      <label style={{display:"block"}}>{label + ":"}</label>
      <select style={{display:"block",margin:"10px auto"}} name={label} ref={register({required: true})}>
        <option value="2">2 pessoas</option>
        <option value="3">3 pessoas</option>
        <option value="4">4 pessoas</option>
        <option value="5">5 pessoas</option>      
        <option value="6">6 pessoas</option>
      </select>
    </>
  ));

const handlechange = (e) =>{
console.log(e.target.value);
}


return(
    <div>
    <form onSubmit={handleSubmit(onSubmit)}>
    {/* register your input into the hook by invoking the "register" function */}
    <label>Telemóvel:</label>
      
      {/* include validation with required or other standard HTML validation rules */}
      <input name="datatime" ref={register({ required: true , minLength:9,maxLength:9 })} />
      {errors.datatime && <p style={{color:"red",fontSize:"12px"}}>This field is required</p>}
      <Select label="number"  />
      <label>Data:</label>
      <input style={{margin:"15px auto"}} name="visitDate" type="date" onChange={handlechange}  required ref={register} />
      {/* errors will return when field validation fails  */}
      {sended && <p style={{color:"red",fontSize:"12px"}}>Pedido Enviado</p>}
      {loading && <p style={{color:"red",fontSize:"12px"}}>Carregar...</p>}
      
      <input style={{margin:"auto"}} type="submit" />
    </form>
    </div>
);

}