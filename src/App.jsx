import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Authlayout from './layout/Authlayout';
import Rutaprotegida from './layout/Rutaprotegida';

import Login from './paginas/Login';
import Registrar from './paginas/Registrar';
import Confirmarcuenta from './paginas/Confirmarcuenta';
import Olvidepassword from './paginas/Olvidepassword';
import Nuevopassword from './paginas/Nuevopassword';
import Administrarpacientes from './paginas/Administrarpacientes';
import Editarperfil from './paginas/Editarperfil';
import Cambiarpassword from './paginas/Cambiarpassword';

import { Authprovider } from './context/Authprovider';
import { Pacientesprovider } from './context/Pacientesprovider';


function App() {

  return (
    <BrowserRouter>
      <Authprovider>
        <Pacientesprovider>
          <Routes>
            <Route path='/' element={<Authlayout />}>
              <Route index element={<Login />} />
              <Route path='registrar' element={<Registrar />} />
              <Route path='olvide-password' element={<Olvidepassword />} />
              <Route path='olvide-password/:token' element={<Nuevopassword />} />
              <Route path='confirmar/:id' element={<Confirmarcuenta />} />
            </Route>

            <Route path='/admin' element={<Rutaprotegida />}>
              <Route index element={<Administrarpacientes />} />
              <Route path='perfil' element={<Editarperfil />}/>
              <Route path='cambiar-password' element={<Cambiarpassword />}/>

            </Route>
          </Routes>
        </Pacientesprovider>
      </Authprovider>
      
    </BrowserRouter>
  )
}

export default App
