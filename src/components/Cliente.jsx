import {useNavigate} from 'react-router-dom'

const Cliente = ({cliente, handleEliminar}) => {
    const navigate = useNavigate();
    const {nombre, email, telefono, empresa, id} = cliente;
  return (
    <tr className='border-b hover:bg-gray-100'>
        <td className='p-2 hover:bg-gray-200'>{nombre}</td>
        <td className='p-2 hover:bg-gray-200'>
            <p><span className='text-gray-800 font-bold uppercase'>Email:</span> {email}</p>
            {cliente.telefono? (<p><span className='text-gray-800 font-bold uppercase'>Tel:</span> {telefono}</p>) : null}
        </td>
        <td className='p-2 hover:bg-gray-200'>{empresa}</td>
        <td className='p-2 hover:bg-gray-200'>
            <button type='button'  className='text-white bg-yellow-600 hover:bg-yellow-700 block w-full p-2 uppercase font-bold text-xs'
            onClick={() => {navigate(`/${id}`)}}
            >Ver cliente</button>
            <button type='button'  className='text-white bg-blue-600 hover:bg-blue-700 block w-full p-2 uppercase font-bold text-xs mt-2'
            onClick={() => {navigate(`/editar/${id}`)}}
            >Editar</button>
            <button type='button'  className='text-white bg-red-800 hover:bg-red-700 block w-full p-2 uppercase font-bold text-xs mt-2'
            onClick={() => handleEliminar(id)}
            >Eliminar</button>
        </td>
    </tr>
  )
}

export default Cliente