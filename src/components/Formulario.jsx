import { useState, useEffect } from "react";
import Alerta from '../components/Alerta';
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {

  const [nombre, setnombre] = useState('');
  const [propietario, setpropietario] = useState('');
  const [email, setemail] = useState('');
  const [fecha, setfecha] = useState('');
  const [sintomas, setsintomas] = useState('');
  const [id, setId] = useState(null);

  const [alerta, setalerta] = useState({})

  const { guardarpaciente, paciente } = usePacientes()

  useEffect( () => {
  
    //Determina si hay algo en paciente.nombre si hay entonces coloquelo en el formulario para editar
    if (paciente?.nombre){
      setnombre(paciente.nombre);
      setpropietario(paciente.propietario);
      setemail(paciente.email);
      setfecha(paciente.fecha);
      setsintomas(paciente.sintomas);
      setId(paciente._id);
    }
    
  }, [paciente])


  const handlesubmit = e => {
    e.preventDefault();

    if([nombre, propietario, email, fecha, sintomas].includes('')){
      setalerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return;
    }

    
    guardarpaciente({nombre, propietario, email, fecha, sintomas, id});
    setalerta({
      msg: 'Guardado correctamente'
    });

    setnombre('');
    setpropietario('');
    setemail('');
    setfecha('');
    setsintomas('');
    setId('')

  }

  const { msg } = alerta;



  return (
    <>
      <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>

      <p className="text-xl mt-5 text-center mb-10">Añade y administra tus <span className="text-indigo-600 font-bold">pacientes y citas</span> </p>

      {msg && <Alerta 
        alerta={alerta}
      />}

      <form className="bg-white py-10 px-5 rounded-xl mb-10 lg:mb-0 shadow-md" onSubmit={handlesubmit}>
        <div className="mb-5">
          <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">Nombre Mascota</label>
          <input type="text" id="nombre" placeholder="Nombre de la mascota" className="border-2 w-full p-2 rounded-xl mt-2 placeholder-gray-400" value={nombre} onChange={e => setnombre(e.target.value)} />
        </div>
        <div className="mb-5">
          <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">Nombre Propietario</label>
          <input type="text" id="propietario" placeholder="Nombre del propietario" className="border-2 w-full p-2 rounded-xl mt-2 placeholder-gray-400" value={propietario} onChange={e => setpropietario(e.target.value)} />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 uppercase font-bold">Email Propietario</label>
          <input type="email" id="email" placeholder="Email del propietario" className="border-2 w-full p-2 rounded-xl mt-2 placeholder-gray-400" value={email} onChange={e => setemail(e.target.value)} />
        </div>
        <div className="mb-5">
          <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">Fecha Alta</label>
          <input type="date" id="fecha" className="border-2 w-full p-2 rounded-xl mt-2 placeholder-gray-400" value={fecha} onChange={e => setfecha(e.target.value)}/>
        </div>
        <div className="mb-5">
          <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold">Sintomas</label>
          <textarea id="sintomas" placeholder="Describe los sintomas" className="border-2 w-full p-2 rounded-xl mt-2 placeholder-gray-400" value={sintomas} onChange={e => setsintomas(e.target.value)} />
        </div>
        <input type="submit" value={id ? 'Guardar cambios' : 'Agregar Paciente'} className="bg-indigo-600 p-3 w-full text-white font-bold rounded-xl uppercase hover:bg-indigo-800 hover:cursor-pointer transition-colors" />
      </form>
    </>
    
  )
}

export default Formulario