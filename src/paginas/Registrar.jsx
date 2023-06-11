import { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Alerta from '../components/Alerta';
import clienteaxios from '../config/axios';

const Registrar = () => {

    const [nombre, setnombre] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [repetirpassword, setrepetirpassword] = useState('');

    const [alerta, setalerta] = useState({});

    const handlesubmit = async e => {
        e.preventDefault();

        if ([nombre, email, password, repetirpassword].includes('')){
            setalerta({msg: 'Hay campos vacios', error: true});
            return;
        }

        if (password !== repetirpassword) {
            setalerta({msg: 'Los passwords no son iguales', error: true});
            return;
        }

        if (password.length < 6) {
            setalerta({msg: 'El password es muy corto, agrega minimo 6 caracteres', error: true});
            return;
        }

        setalerta({})

        //Crear el usuario en la API
        
        try {
            const url = `/veterinarios`;
            await clienteaxios.post(url, { nombre, email, password})

            setalerta({
                msg: 'Creado correctamente! Revisa tu email',
                error: false
            })

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
            <h1 className="text-indigo-600 font-black text-6xl">Crea tu cuenta y Administra tus
                <span className="text-black"> Pacientes</span>
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
                    <label className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
                    <input type="text" placeholder="Tu nombre" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={nombre} onChange={ e => setnombre(e.target.value)} />
                </div>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                    <input type="email" placeholder="Email de registro" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={email} onChange={ e => setemail(e.target.value)}  />
                </div>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                    <input type="password" placeholder="Tu password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={password} onChange={ e => setpassword(e.target.value)}  />
                </div>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold">Repetir Password</label>
                    <input type="password" placeholder="Repite tu password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={repetirpassword} onChange={ e => setrepetirpassword(e.target.value)}  />
                </div>

                
                <input type="submit" value="Crear cuenta" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />

            </form>

            <nav className='mt-10 lg:flex lg:justify-between'>
                <Link to="/" className='block text-center my-5 text-gray-500'>¿Ya tienes una cuenta? Inicia Sesión</Link>
                <Link to="/olvide-password" className='block text-center my-5 text-gray-500'>Olvide mi password</Link>
            </nav>

        </div>
        
    </>
  )
}

export default Registrar