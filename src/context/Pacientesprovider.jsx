import { createContext, useState, useEffect } from 'react';
import clienteaxios from '../config/axios';
import useAuth from '../hooks/useAuth';

const Pacientescontext = createContext();

export const Pacientesprovider = ({children}) => {
    
    const [pacientes, setpacientes] = useState([]);
    const [paciente, setPaciente] = useState({});
    const { auth } = useAuth();

    useEffect(() => {
        const obtenerpacientes = async () => {
            try {
                const token = localStorage.getItem('token');
                if(!token) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteaxios('/pacientes', config);
                setpacientes(data);

            } catch (error) {
                console.log(error);
            }
        }
        obtenerpacientes();
    }, [auth])

    const guardarpaciente = async (paciente) => {

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (paciente.id){
            try {
                const { data } = await clienteaxios.put(`/pacientes/${paciente.id}`, paciente, config);

                const pacientesactualizados = pacientes.map(pacientestate => pacientestate._id === data._id ? data : pacientestate);
                setpacientes(pacientesactualizados);

            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const { data } = await clienteaxios.post('/pacientes', paciente, config);
                const { createdAt, updatedAt, __v, ...pacientealmacenado } = data;
                
                setpacientes([pacientealmacenado, ...pacientes]);
    
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }

        
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente);
    }

    const eliminarpaciente = async id => {
        const confirmar = confirm(`¿Quierer eliminar el paciente?`);

        if (confirmar){
            
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteaxios.delete(`/pacientes/${id}`, config);

                const pacientesactualizados = pacientes.filter(pacientestate => pacientestate._id !== id);

                setpacientes(pacientesactualizados);

            } catch (error) {
                console.log(error);
            }
        }

    }

    return(
        <Pacientescontext.Provider value={{
            pacientes,
            guardarpaciente,
            setEdicion,
            paciente,
            eliminarpaciente
        }}>
            {children}
        </Pacientescontext.Provider>
    )
}


export default Pacientescontext;