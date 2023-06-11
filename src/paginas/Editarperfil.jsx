import Adminnav from "../components/Adminnav"
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import Alerta from "../components/Alerta";

const Editarperfil = () => {

    const { auth, actualizarperfil } = useAuth();
    const [perfil, setPerfil] = useState({});
    const [alerta, setalerta] = useState({});

    useEffect( ( ) => {
        setPerfil(auth);
    }, [auth])

    const handlesubmit = async e => {
        e.preventDefault();

        const { nombre, email } = perfil;

        if (nombre === '' || email === ''){
            setalerta({msg: 'Nombre e Email son obligatorios', error: true});
            return;
        }

        const resultado = await actualizarperfil(perfil);
        setalerta(resultado);

    }

    const { msg } = alerta;

  return (
    <>
        <Adminnav />

        <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu <span className="text-indigo-600 font-bold">Informacion aqui</span></p>

        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                {msg && <Alerta alerta={alerta} />}
                <form onSubmit={handlesubmit}>
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Nombre</label>
                        <input type="text" value={perfil.nombre || ''} className="border bg-gray-50 w-full p-2 mt-3 rounded-md" name="nombre" onChange={e => setPerfil({...perfil, [e.target.name]: e.target.value})}/>
                    </div>
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Sitio web</label>
                        <input type="text" className="border bg-gray-50 w-full p-2 mt-3 rounded-md" name="web" value={perfil.web || ''} onChange={e => setPerfil({...perfil, [e.target.name]: e.target.value})}/>
                    </div>
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Telefono</label>
                        <input type="tel" className="border bg-gray-50 w-full p-2 mt-3 rounded-md" value={perfil.telefono || ''} onChange={e => setPerfil({...perfil, [e.target.name]: e.target.value})} name="telefono"/>
                    </div>
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Email</label>
                        <input type="email" className="border bg-gray-50 w-full p-2 mt-3 rounded-md" value={perfil.email || ''} onChange={e => setPerfil({...perfil, [e.target.name]: e.target.value})} name="email"/>
                    </div>
                    <input type="submit" value="Guardar cambios" className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 cursor-pointer" />
                </form>
            </div>
        </div>
    </>
  )
}

export default Editarperfil