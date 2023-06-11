import { useState } from 'react';
import Formulario from "../components/Formulario"
import Listadopacientes from "../components/Listadopacientes";

const Administrarpacientes = () => {

  const [mostrarform, setmostrarform] = useState(false);

  return (
    <div className="flex flex-col md:flex-row">
      <button type='button' onClick={() => setmostrarform(!mostrarform)} className='bg-indigo-600 text-white font-bold uppercase mx-10 p-3 mb-10 rounded-xl md:hidden'>{mostrarform ? 'Ocultar formulario' : 'Mostrar formulario'}</button>
      <div className={`${mostrarform ? 'block' : 'hidden' } md:block md:w-1/2 lg:w-2/5`}>
        <Formulario />
      </div>
      <div className="md:w-1/2 lg:w-3/5">
        <Listadopacientes />
      </div>
    </div>
  )
}

export default Administrarpacientes