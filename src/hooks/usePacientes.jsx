import { useContext } from "react";
import Pacientescontext from "../context/Pacientesprovider";

const usePacientes = () => {
    return useContext(Pacientescontext);
}

export default usePacientes;