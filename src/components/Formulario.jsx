import Error from '../components/Error';
import { Formik, Form , Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import * as Yup from 'yup'
import Spinner from '../components/Spinner'


const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate();

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string().min(3, 'Este campo debe contener minimo 3 caracteres').max(40, 'Este campo no debe contener mas de 40 caracteres').required('este campo es obligatorio'),
        empresa: Yup.string().max(40, 'Este campo no debe contener mas de 40 caracteres').required('este campo es obligatorio'),
        email: Yup.string().email('email no valido').required('este campo es obligatorio'),
        telefono: Yup.number().integer('Numero no valido').positive('Numero no valido').typeError('Numero no valido'),
        notas: Yup.string().max(1000, 'La nota no debe tener mas de 1000 caracteres'),
    })

    const handleSubmit = async values => {
        try {
            if (cliente.id) {
                const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`;
                await fetch(url, {
                    method: 'PUT',
                    body : JSON.stringify(values),
                    headers : {
                        'Content-Type' : 'application/json'
                    }
               });
            } else {
                const url = `${import.meta.env.VITE_API_URL}/clientes`;
                await fetch(url, {
                    method: 'POST',
                    body : JSON.stringify(values),
                    headers : {
                        'Content-Type' : 'application/json'
                    }
               });
            };
        } catch (error) {
            console.log(error);
        };
    };

  return (
    cargando ? <Spinner /> : (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow md:w-3/4 mx-auto'>
        <h2 className=' text-gray-600 font-bold text-xl uppercase text-center'>{cliente.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h2>
        <Formik 
        initialValues={{
            nombre: cliente.nombre ?? '',
            empresa: cliente.empresa ?? '',
            email: cliente.email ?? '',
            telefono: cliente.telefono ?? '',
            notas: cliente.notas ?? '',
        }}
        enableReinitialize={true}
        onSubmit={async (values, {resetForm} ) => {
            await handleSubmit(values);
            await resetForm();
            navigate('/cLientes');
        }}
        validationSchema={nuevoClienteSchema}
        >
            {({errors, touched}) => {
            return (
                <Form className='mt-10'>
                    <div className=' mb-4 '>
                        <label htmlFor="nombre" className=' text-gray-800 '>Nombre:</label>
                        <Field type='text'
                            id='nombre'
                            name='nombre'
                            placeholder='Nombre del cliente'
                            className=' mt-2 block w-full p-3 bg-gray-100 '
                        />
                        {errors.nombre && touched.nombre ? 
                        (<Error>{errors.nombre}</Error>) : null}
                    </div>
                    <div className=' mb-4 '>
                        <label htmlFor="empresa" className=' text-gray-800 '>Empresa:</label>
                        <Field type='text'
                            id='empresa'
                            name='empresa'
                            placeholder='Empresa del cliente'
                            className=' mt-2 block w-full p-3 bg-gray-100 '
                        />
                        {errors.empresa && touched.empresa ? 
                        (<Error>{errors.empresa}</Error>) : null}
                    </div>
                    <div className=' mb-4 '>
                        <label htmlFor="email" className=' text-gray-800 '>Email:</label>
                        <Field type='email'
                            id='email'
                            name='email'
                            placeholder='Email del cliente'
                            className=' mt-2 block w-full p-3 bg-gray-100 '
                        />
                        {errors.email && touched.email ? 
                        (<Error>{errors.email}</Error>) : null}
                    </div>
                    <div className=' mb-4 '>
                        <label htmlFor="telefono" className=' text-gray-800 '>Telefono:</label>
                        <Field type='tel'
                            id='telefono'
                            name='telefono'
                            placeholder='Telefono del cliente'
                            className=' mt-2 block w-full p-3 bg-gray-100 '
                        />
                        {errors.telefono && touched.telefono ? 
                        (<Error>{errors.telefono}</Error>) : null}
                    </div>
                    <div className=' mb-4 '>
                        <label htmlFor="notas" className=' text-gray-800 '>Notas:</label>
                        <Field as='textarea'
                            id='notas'
                            name='notas'
                            placeholder='Notas sobre el cliente'
                            className=' mt-2 block w-full p-3 bg-gray-100 '
                        />
                        {errors.notas && touched.notas ? 
                        (<Error>{errors.notas}</Error>) : null}
                    </div>
                    <input type="submit" value={cliente.nombre ? 'Guardar Cambios' : 'Agregar Cliente'} className=' mt-5 w-full bg-blue-800 p-3 text-white uppercase font-blod text-lg'/>
                </Form>
            )}} 
        </Formik>
    </div>
    )
  )
}

Formulario.defaultProps = {
    cliente : {},
    cargando : false,
}

export default Formulario