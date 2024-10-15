import { useState } from 'react';
import goldServiceLogo from '../../assets/Crop_servicioGold.webp';
import '../Signin/Signin.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AlertModal } from '../../shared/Modal/AlertModal';
import Spinner from 'react-bootstrap/Spinner';
import { constants } from '../../context/constants';
import { signUpUser } from '../../helpers/axiosHelper';

const Signup = () => {
    const navigator = useNavigate();
    const [alertModalShow, setAlertModalShow] = useState(false);
    const [loadingRegister, setLoadingRegister] = useState(false);
    const [messagesToModal, setMessagesToModal] = useState({title: '', body: ''});
    
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setError,
        formState: { errors },
    } = useForm();
    const passwordConfirm = watch('passwordConfirm','');

    const onSubmit = async ({ name, email, password }) => {
        if(password === passwordConfirm){
            try {
                setLoadingRegister(true);
                const response = await signUpUser({name, email, password});
                setLoadingRegister(response.loadingRegister);
                if(response.alertModalShow){
                    setMessagesToModal({title: constants.MODAL_TITLE_SUCCCESS, body: constants.USER_CREATED});
                    setAlertModalShow(response.alertModalShow);
                }
                reset();
            } catch (error) {
                console.log('error:', error);
                setMessagesToModal({title: constants.MODAL_TITLE_ERROR, body: error?.response?.data});
                setAlertModalShow(true);
            }
        }else{
            setError('passwordConfirm', {
                message: 'Las contraseñas no son iguales.'
            });
        }
    };

    const onCloseModal = () => {
        if(loadingRegister){
            setAlertModalShow(false);
            setLoadingRegister(false);
        }else{
            setAlertModalShow(false);
            navigator('../signin');
        }
    }

    return (
        <div className="myBackground">
            <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                            <div className="card mb-3 bg-dark text-white myOpacity">
                                <div className="d-flex justify-content-center">
                                    <div className="logo d-flex align-items-center justify-content-center w-auto">
                                        <img src={goldServiceLogo} alt="goldServiceLogo" className='img-fluid imgLogo' />
                                    </div>
                                </div>

                                <div className="card-body">

                                    <div className="pt-4 pb-2">
                                        <h5 className="card-title text-center pb-0 fs-4">Registrate</h5>
                                        <p className="text-center small">Ingresa tu email y tu contraseña para registrarse</p>
                                    </div>

                                    <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>

                                        <div className="col-12">
                                            <label htmlFor="yourUsername" className="form-label">Nombre</label>
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    name="username"
                                                    className="form-control"
                                                    id="nameInput"
                                                    required
                                                    {...register('name', {
                                                        required: 'El nombre es requerido.',
                                                        minLength: {
                                                            value: 3,
                                                            message: 'El nombre debe tener mínimo 3 caracteres.'
                                                        }
                                                    })}
                                                />
                                            </div>
                                            {errors.name && <p className='text-danger'>{errors.name.message}</p>}
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="yourUsername" className="form-label">Email</label>
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    name="email"
                                                    className="form-control"
                                                    id="emailInput"
                                                    required
                                                    autoComplete='username'
                                                    {...register('email', {
                                                        required: 'El email es requerido.',
                                                        pattern: {
                                                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                                            message: 'El email es inválido.'
                                                        }
                                                    })}
                                                />
                                            </div>
                                            {errors.email && <p className='text-danger'>{errors.email.message}</p>}
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="yourPassword" className="form-label">Contraseña</label>
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                id="passInput"
                                                required
                                                autoComplete='current-password'
                                                {...register("password", {
                                                    required: "La contraseña es requerida.",
                                                    minLength: {
                                                        value: 8,
                                                        message: "Debe tener al menos 8 caracteres."
                                                    }
                                                })}
                                            />
                                            {errors.password && <p className='text-danger text-sm'>{errors.password.message}</p>}
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="yourPassword" className="form-label">Confirmar contraseña</label>
                                            <input
                                                type="password"
                                                name="passwordConfirm"
                                                className="form-control"
                                                id="passInput"
                                                required
                                                autoComplete='current-password'
                                                {...register("passwordConfirm", {
                                                    required: "La contraseña es requerida.",
                                                    minLength: {
                                                        value: 8,
                                                        message: "Debe tener al menos 8 caracteres."
                                                    }
                                                })}
                                            />
                                            {errors.passwordConfirm && <p className='text-danger text-sm'>{errors.passwordConfirm.message}</p>}
                                        </div>

                                        <div className="col-12">
                                            <div className="form-check"></div>
                                        </div>
                                        <div className="col-12">
                                            <button className="d-flex justify-content-center align-items-center btn btn-primary w-100" type="submit">
                                                Registrarse
                                                {loadingRegister && <Spinner animation="border" role="status" size="sm" className='ms-2' />}

                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <AlertModal
                show={alertModalShow}
                onHide={() => onCloseModal()}
                title={messagesToModal.title}
                bodyText={messagesToModal.body}
            />
        </div>
    );
}

export default Signup;