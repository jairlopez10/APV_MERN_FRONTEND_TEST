import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteaxios from '../config/axios';

const Olvidepassword = () => {

    const [email, setemail] = useState('');
    const [alerta, setalerta] = useState({});

    const handlesubmit = async e => {
        e.preventDefault();

        if(email === '' || email.length < 5){
            setalerta({msg: 'El email es obligatorio', error: true});
            return;
        }

        try {
            const { data } = await clienteaxios.post('/veterinarios/olvide-password', { email })

            setalerta({
                msg: data.msg
            })
        } catch (error) {
            setalerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta

  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Recupera tu Acceso y no Pierdas
                <span className="text-black"> tus Pacientes</span>
            </h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white '>
            {
                msg && < Alerta 
                alerta={alerta}
            />
            }
            <form onSubmit={handlesubmit}>
                
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                    <input type="email" placeholder="Email de registro" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={email} onChange={e => setemail(e.target.value)} />
                </div>
                
                <input type="submit" value="Enviar instrucciones" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />

            </form>

            <nav className='mt-10 lg:flex lg:justify-between'>
                <Link to="/" className='block text-center my-5 text-gray-500'>¿Ya tienes una cuenta? Inicia Sesión</Link>
                <Link to="/registrar" className='block text-center my-5 text-gray-500'>¿No tienes una cuenta? Registrate</Link>
            </nav>

        </div>
    </>
  )
}

export default Olvidepassword