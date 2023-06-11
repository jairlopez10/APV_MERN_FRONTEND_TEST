import { useState, useEffect, createContext } from "react";
import clienteaxios from "../config/axios";

const Authcontext = createContext();

const Authprovider = ({children}) => {

    const [auth, setauth] = useState({});
    const [cargando, setcargando] = useState(true);
    
    useEffect(() => {
        const autenticarusuario = async () => {
            const token = localStorage.getItem('token');

            if(!token) {
                setcargando(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteaxios('/veterinarios/perfil', config);

                setauth(data);
            } catch (error) {
                console.log(error.response.data.msg);
                setauth({});
            }

            setcargando(false);
            
        }
        autenticarusuario();
    }, [])

    const cerrarsesion = () =>{
        localStorage.removeItem('token');
        setauth({});
    }

    const actualizarperfil = async datos => {

        const token = localStorage.getItem('token');

        if(!token) {
            setcargando(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`;
            const { data } = await clienteaxios.put(url, datos, config);

            return {
                msg: 'Guardado Correctamente'
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
        
    }

    const guardarpassword = async datos => {
        

        const token = localStorage.getItem('token');

        if(!token) {
            setcargando(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/actualizar-password`;
            const { data } = await clienteaxios.put(url, datos, config);
            return {msg: data.msg}
        } catch (error) {
            return {msg: error.response.data.msg, error: true};
        }

    }

    return (
        <Authcontext.Provider value={{
            auth,
            setauth,
            cargando,
            cerrarsesion,
            actualizarperfil,
            guardarpassword
        }}>
            {children}
        </Authcontext.Provider>
    )

}

export {
    Authprovider
}

export default Authcontext;