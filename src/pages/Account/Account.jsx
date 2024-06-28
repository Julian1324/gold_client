import { useEffect, useState } from 'react';
import './Account.css';
import { getUser, setUser } from '../../helpers/axiosHelper';
import { getUserSlice } from '../../context/store/store.js';
import { AlertModal } from '../../shared/Modal/AlertModal';
import { constants } from '../../context/constants';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { PasswordForm } from '../../components/Forms/PasswordForm.jsx';

const Account = () => {
    const navigator = useNavigate();
    const { updateUserName, headers, updateHeaders } = getUserSlice();
    const [alertModalShow, setAlertModalShow] = useState(false);
    const [loadingReq, setLoadingReq] = useState(false);
    const [messagesToModal, setMessagesToModal] = useState({ title: '', body: '' });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                setLoadingReq(true);
                const response = await getUser({ headers });
                setValue('name', response.data.name);
                setValue('email', response.data.email);
                setLoadingReq(response.loadingReq);
            } catch (error) {
                console.log('error:', error);
                let myMessage = error?.response?.data;
                if (error?.response?.data.includes('jwt')) myMessage = constants.USER_SESSION_EXPIRED;
                setMessagesToModal({ title: constants.MODAL_TITLE_ERROR, body: myMessage });
                localStorage.clear();
                setAlertModalShow(true);
            }
        }
        getUserInfo();
    }, [headers, setValue]);

    const onSubmitInfo = async ({ name, email }) => {
        try {
            setLoadingReq(true);
            const response = await setUser({ name, email, headers });
            setMessagesToModal({ title: constants.MODAL_TITLE_SUCCCESS, body: response?.data });
            setAlertModalShow(true);
            updateUserName(name);
        } catch (error) {
            console.log('error:', error);
            setMessagesToModal({ title: constants.MODAL_TITLE_ERROR, body: error?.response?.data });
            setAlertModalShow(true);
        }
    }

    const onCloseModal = () => {
        setAlertModalShow(false);
        setLoadingReq(false);
        if (messagesToModal.title === constants.MODAL_TITLE_ERROR) {
            updateHeaders('');
            updateUserName('');
            navigator('/');
        }
    }

    return (
        <>
            <main id="main" className="main vh-100">
                <div className="pagetitle">
                    <h1>Información de la cuenta</h1>
                </div>
                <section className="container d-flex justify-content-center">
                    <div className="card w-100">
                        <div className="card-body d-flex">
                            <form className='d-flex flex-column align-items-center justify-content-center w-100 mt-5' onSubmit={handleSubmit(onSubmitInfo)}>
                                <div className="col-lg-8">
                                    <label htmlFor="inputName" className="form-label">Nombre</label>
                                    <div className='d-flex'>
                                        <input
                                            type="name"
                                            name="name"
                                            className="form-control w-100"
                                            id="name"
                                            disabled={loadingReq}
                                            {...register('name', {
                                                required: 'El nombre es requerido.',
                                                minLength: {
                                                    value: 3,
                                                    message: 'El nombre debe tener mínimo 3 caracteres.'
                                                }
                                            })}
                                        />
                                        {loadingReq && <div className="spinner-border text-warning ms-2" role="status">
                                        </div>}
                                    </div>
                                    {errors.name && <p className='text-danger'>{errors.name.message}</p>}
                                </div>

                                <div className="col-lg-8 mt-3">
                                    <label htmlFor="inputName" className="form-label">Email</label>
                                    <div className='d-flex'>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control w-100"
                                            id="email"
                                            disabled={loadingReq}
                                            {...register('email', {
                                                required: 'El email es requerido.',
                                                pattern: {
                                                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                                    message: 'El email es inválido.'
                                                }
                                            })}
                                        />
                                        {loadingReq && <div className="spinner-border text-warning ms-2" role="status">
                                        </div>}
                                    </div>
                                    {errors.email && <p className='text-danger'>{errors.email.message}</p>}
                                </div>

                                <button
                                    className="d-flex justify-content-center align-items-center btn btn-warning w-50 mt-4"
                                    disabled={loadingReq}
                                    type="submit"
                                >
                                    {
                                        loadingReq ? <div className="spinner-border spinner-border-sm text-dark ms-2" role="status"> </div>
                                            : 'Guardar cambios'
                                    }
                                </button>
                            </form>

                            <div className='lineDiv'></div>

                            <PasswordForm />
                        </div>
                    </div>
                </section>
            </main>
            <AlertModal
                show={alertModalShow}
                onHide={() => onCloseModal()}
                title={messagesToModal.title}
                bodyText={messagesToModal.body}
            />
        </>
    );
}

export default Account;