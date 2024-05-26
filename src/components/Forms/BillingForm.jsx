import { useForm } from 'react-hook-form';
// import Button from 'react-bootstrap/Button';

const BillingForm = () => {
    const {
        register,
        handleSubmit,
        // reset,
        formState: { errors }
    } = useForm();

    const onSubmit = async ({ name }) => {
        try {
            console.log(name);
            // reset();
        } catch (error) {
        }
    }

    return (
        <form className="row g-3 needs-validation mt-3" noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="col-4">
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
            <div className="col-7">
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
            {/* <Button variant="primary" className='d-flex ms-2 align-items-center' type="submit">
                Send
            </Button> */}
        </form>
    );
}

export default BillingForm;