import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";

const Listadopacientes = () => {

  const { pacientes } = usePacientes();


  return (
    <>
      {pacientes.length ? 
      (
        <>
          <h2 className="font-black text-3xl text-center">Listado de pacientes</h2>

          <p className="text-xl mt-5 text-center mb-10">Administra tus <span className="text-indigo-600 font-bold">pacientes y citas</span> </p>

          {pacientes.map( paciente => (
            <Paciente 
              key={paciente._id}
              paciente={paciente}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>

          <p className="text-xl mt-5 text-center mb-10">Comienza agregando pacientes <span className="text-indigo-600 font-bold">y apareceran en este lugar</span> </p>
        </>
      )}
    </>
  )
}

export default Listadopacientes