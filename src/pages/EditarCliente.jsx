import Formulario from '../components/Formulario'
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Spinner from '../components/Spinner';

const EditarCliente = () => {
  const {id} = useParams();

  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
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
    <>
    <h2 className=" font-black text-4xl text-blue-900">Editar cliente</h2>
    <p className=" mt-3 ">Utiliza este formulario para editar los datos</p>
    {cliente.nombre ? (
      <Formulario
      cliente={cliente}
      cargando={cargando}
      />
    ): cargando ? <Spinner/> : (<p>No hay cliente</p>)}
    
  </>
  )
}

export default EditarCliente