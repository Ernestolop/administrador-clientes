import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Cliente from '../components/Cliente';
import Spinner from '../components/Spinner';

const VerCliente = () => {
  const {id} = useParams();

  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(false);
  
  useEffect(() => {
    setCargando(!cargando);
    const obtenerCliente = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    obtenerCliente();
  }, [])


  return (

    cargando? (<Spinner/>) : (
      Object.keys(cliente).length === 0 ? (<p>No hay resultado</p>) : (  
      <>
        <h2 className=" font-black text-4xl text-blue-900">Ver cliente</h2>
        <p className=" mt-3 ">Informacion sobre el cliente</p>

          <div className='w-full mt-5 shadow bg-white p-5'>
            <p className='text-4xl text-gray-800'><span className='text-gray-800 uppercase font-bold'>Cliente:</span> {cliente.nombre}</p>
            <p className='text-2xl mt-4 text-gray-800'><span className='text-gray-800 uppercase font-bold'>Empresa:</span> {cliente.empresa}</p>
            <p className='text-2xl mt-4 text-gray-800'><span className='text-gray-800 uppercase font-bold'>Email:</span> {cliente.email}</p>
            <p className={`${cliente.telefono? 'text-gray-800': 'text-gray-500'} text-2xl mt-4`}><span className='text-gray-800 uppercase font-bold'>Telefono:</span>{cliente.telefono? (` ${cliente.telefono}`) : ' No has agregado su telefono'}</p>
            <p className={`${cliente.notas? 'text-gray-800': 'text-gray-500'} text-2xl mt-4`}><span className='text-gray-800 uppercase font-bold'>Notas:</span>{cliente.notas? (` ${cliente.notas}`) : ' No hay notas sobre este cliente'}</p>
        </div>
      </>
      )
    )
  )
}

export default VerCliente