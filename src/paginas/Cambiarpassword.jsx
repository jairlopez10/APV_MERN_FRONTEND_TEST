import Adminnav from "../components/Adminnav"
import Alerta from "../components/Alerta";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

//Cambiar password dentro del admin
const Cambiarpassword = () => {

    const [alerta, setAlerta] = useState({});
    const [password, setPassword] = useState({
        pwd_actual: '',
        pwd_nuevo: ''
    });
    const { guardarpassword } = useAuth();

    const handlesubmit = async e => {
        e.preventDefault();

        if (Object.values(password).some(campo => campo === '')){
            setAlerta({msg: 'Todos los campos son obligatorios', error: true});
            return;
        }

        if (password.pwd_nuevo.length < 6){
            setAlerta({msg: 'El Password debe tener almenos 6 caracteres', error: true});
            return;
        }

        const respuesta = await guardarpassword(password);
        setAlerta(respuesta);

    }

    const { msg } = alerta;

  return (
    <>
        <Adminnav />

        <h2 className="font-black text-3xl text-center mt-10">Cambiar password</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu <span className="text-indigo-600 font-bold">Password aqui</span></p>

        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                {msg && <Alerta alerta={alerta} />}
                <form onSubmit={handlesubmit}>
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Password actual</label>
                        <input type="password" placeholder="Escribe tu password actual" className="border bg-gray-50 w-full p-2 mt-3 rounded-md" name="pwd_actual" onChange={e => setPassword({...password, [e.target.name]: e.target.value})}/>
                    </div>
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Password Nuevo</label>
                        <input type="password" placeholder="Escribe tu nuevo password" className="border bg-gray-50 w-full p-2 mt-3 rounded-md" name="pwd_nuevo" onChange={e => setPassword({...password, [e.target.name]: e.target.value})}/>
                    </div>
                    
                    <input type="submit" value="Actualizar password" className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 cursor-pointer" />
                </form>
            </div>
        </div>  
        
    </>
  )
}

export default Cambiarpassword