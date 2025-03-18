import { constants } from '../../context/constants.js';
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { getUserSlice } from '../../context/store/store.js';
import { AlertModal } from '../../shared/Modal/AlertModal.jsx';
import { setPassword } from '../../helpers/axiosHelper.js';

const PasswordForm = () => {
    const { headers } = getUserSlice();
    const [alertModalShow, setAlertModalShow] = useState(false);
    const [loadingReq, setLoadingReq] = useState(false);
    const [messagesToModal, setMessagesToModal] = useState({ title: '', body: '' });

    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmitPassword = async ({ currentPassword, newPassword, passwordConfirm }) => {
        if (newPassword === passwordConfirm) {
            try {
                setLoadingReq(true);
                const response = await setPassword({ currentPassword, newPassword, headers });
                setMessagesToModal({ title: constants.MODAL_TITLE_SUCCCESS, body: response?.data });
                setAlertModalShow(true);
                reset();
            } catch (error) {
                console.log('error:', error);
                setMessagesToModal({ title: constants.MODAL_TITLE_ERROR, body: error?.response?.data });
                setAlertModalShow(true);
            }
        } else {
            setError('passwordConfirm', {
                message: 'Las contraseñas no son iguales.'
            });
        }
    }

    const onCloseModal = () => {
        setAlertModalShow(false);
        setLoadingReq(false);
    }

    return (
        <>
            <form className='d-flex flex-column align-items-center w-100 mt-3' onSubmit={handleSubmit(onSubmitPassword)}>
                <div className="col-lg-8">
                    <label htmlFor="password1" className="form-label">Contraseña actual</label>
                    <input
                        type="password"
                        name="currentPassword"
                        className="form-control w-100"
                        id="password"
                        disabled= {loadingReq}
                        {...register('currentPassword', {
                            required: 'La contraseña es requerida.',
                            minLength: {
                                value: 8,
                                message: 'La contraseña debe tener mínimo 8 caracteres.'
                            }
                        })}
                    />
                    {errors.currentPassword && <p className='text-danger'>{errors.currentPassword.message}</p>}
                </div>

                <div className="col-lg-8 mt-3">
                    <label htmlFor="password2" className="form-label">Contraseña nueva</label>
                    <input
                        type="password"
                        name="passwordNew"
                        className="form-control w-100"
                        id="passwordNew"
                        disabled= {loadingReq}
                        {...register('newPassword', {
                            required: 'La contraseña es requerida.',
                            minLength: {
                                value: 8,
                                message: 'La contraseña debe tener mínimo 8 caracteres.'
                            }
                        })}
                    />
                    {errors.newPassword && <p className='text-danger'>{errors.newPassword.message}</p>}
                </div>

                <div className="col-lg-8 mt-3">
                    <label htmlFor="password3" className="form-label">Confirmar contraseña nueva</label>
                    <input
                        type="password"
                        name="passwordConfirm"
                        className="form-control w-100"
                        id="passwordConfirm"
                        disabled= {loadingReq}
                        {...register('passwordConfirm', {
                            required: 'La contraseña es requerida.',
                            minLength: {
                                value: 8,
                                message: 'La contraseña debe tener mínimo 8 caracteres.'
                            }
                        })}
                    />
                    {errors.passwordConfirm && <p className='text-danger'>{errors.passwordConfirm.message}</p>}
                </div>

                <button className="d-flex justify-content-center align-items-center btn btn-warning w-50 mt-4" type="submit">
                    {
                        loadingReq ? <div className="spinner-border spinner-border-sm text-dark ms-2" role="status"> </div>
                            : 'Actualizar contraseña'
                    }
                </button>
            </form>
            <AlertModal
                show={alertModalShow}
                onHide={() => onCloseModal()}
                title={messagesToModal.title}
                bodyText={messagesToModal.body}
            />
        </>
    );
}

export { PasswordForm };