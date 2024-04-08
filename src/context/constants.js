const API_URL = process.env.REACT_APP_API_URL;
const USER_SIGNUP = '/user/signup';
const USER_SIGNIN = '/user/signin';
const USER_INFO = '/user';
const USER_SETPASSWORD = '/userPassword';
const USER_CREATED = '¡Usuario creado con éxito! Bienvenido a nuestra comunidad. A continuación puedes ingresar con tu cuenta.';
const USER_LOGGED = '¡Bienvenid@ a Gold Service!';
const USER_SESSION_EXPIRED = 'Sesión caducada, por favor inicia sesión otra vez.';
const MODAL_TITLE_SUCCCESS = '¡Se ha realizado con éxito!';
const MODAL_TITLE_ERROR = '¡Oops, error en la solicitud!';
const MODAL_TITLE_SIGNOUT= 'Desconexión exitosa.';
const MODAL_BODY_SIGNOUT = 'Hasta luego, vuelve pronto...';
const KEY_STORAGE_BASE = 'GLDST0';

export const constants = {
    API_URL,
    USER_SIGNUP,
    USER_SIGNIN,
    USER_INFO,
    USER_SETPASSWORD,
    USER_CREATED,
    USER_LOGGED,
    USER_SESSION_EXPIRED,
    MODAL_TITLE_SUCCCESS,
    MODAL_TITLE_ERROR,
    MODAL_TITLE_SIGNOUT,
    MODAL_BODY_SIGNOUT,
    KEY_STORAGE_BASE
};