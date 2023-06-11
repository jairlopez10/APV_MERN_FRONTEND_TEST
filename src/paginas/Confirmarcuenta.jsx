import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import clienteaxios from '../config/axios'
import Alerta from '../components/Alerta';

const Confirmarcuenta = () => {

    const [cuentaconfirmada, setcuentaconfirmada] = useState(false);
    const [cargando, setcargando] = useState(true);
    const [alerta, setalerta] = useState({})

    const params = useParams();
    const { id } = params

    useEffect(() => {
        const confirmarcuenta = async () => {
            try {
                const url = `/veterinarios/confirmar/${id}`;
                const { data } = await clienteaxios(url)
                
                setcuentaconfirmada(true);
                setalerta({
                    msg: data.msg
                })

            } catch (error) {
                setalerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }

            setcargando(false);
        }

        confirmarcuenta();
    }, [])

    return(
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">Confirma tu cuenta y empieza a Administra tus
                    <span className="text-black"> Pacientes</span>
                </h1>
            </div>
            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white '>
                {!cargando && < Alerta 
                    alerta={alerta}
                />}

                {cuentaconfirmada && (
                    <Link to="/" className='block text-center my-5 text-gray-500'>Iniciar Sesión</Link>
                )}
            </div>
        </>
    )
}

export default Confirmarcuenta;