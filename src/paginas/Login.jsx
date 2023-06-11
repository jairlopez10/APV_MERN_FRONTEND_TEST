import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import Alerta from '../components/Alerta';
import clienteaxios from '../config/axios';

const Login = () => {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [alerta, setalerta] = useState({})

    const { setauth } = useAuth();

    const navigate = useNavigate();

    const handlesubmit = async e => {
        e.preventDefault();

        if(email === '' || password === ''){
            setalerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }

        try {
            const { data } = await clienteaxios.post('/veterinarios/login', {email, password});
            
            localStorage.setItem('token', data.token);
            setauth(data);
            navigate('/admin');

        } catch (error) {
            setalerta({
                msg: error.response.data.msg,
                error: true
            })
        }
        
        


    }


    const { msg } = alerta;

  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Inicia Sesión y Administra tus 
                <span className="text-black">Pacientes</span>
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
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                    <input type="password" placeholder="Tu password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={password} onChange={e => setpassword(e.target.value)} />
                </div>

                <input type="submit" value="Iniciar sesion" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />

            </form>

            <nav className='mt-10 lg:flex lg:justify-between'>
                <Link to="/registrar" className='block text-center my-5 text-gray-500'>¿No tienes una cuenta? Registrate</Link>
                <Link to="/olvide-password" className='block text-center my-5 text-gray-500'>Olvide mi password</Link>
            </nav>
        </div>
        
    </>
  )
}

export default Login