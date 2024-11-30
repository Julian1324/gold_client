const API_URL = process.env.REACT_APP_API_URL;
const USER_SIGNUP = '/user/signup';
const USER_SIGNIN = '/user/signin';
const USER_INFO = '/user';
const USER_SETPASSWORD = '/userPassword';
const USER_CREATED = '\u00A1Usuario creado con \u00E9xito! Bienvenido a nuestra comunidad. A continuación puedes ingresar con tu cuenta.';
const USER_LOGGED = '\u00A1Bienvenid@ a Gold Service!';
const USER_SESSION_EXPIRED = 'Sesión caducada, por favor inicia sesión otra vez.';
const USER_UPDATE_CART = '/setCart';
const USER_PURCHASE = '/purchaseItems';
const USER_MOVEMENTS = '/myMovements';
const GET_CATEGORIES = '/categories';
const GET_PRODUCTS_BY_CATEGORY = '/productsByCategory';
const GET_PRODUCT_BY_ID = '/product';
const GET_ALL_PRODUCTS = '/products';
const GET_CART_PRODUCTS = '/cartProducts';
const QUERY_PRODUCTS = '/queryProducts';
const MODAL_TITLE_SUCCCESS = '\u00A1Se ha realizado con \u00E9xito!';
const MODAL_TITLE_ERROR = '\u00A1Oops, error en la solicitud!';
const MODAL_TITLE_SIGNOUT = 'Desconexión exitosa.';
const MODAL_BODY_SIGNOUT = 'Hasta luego, vuelve pronto...';
const MODAL_ITEM_ADDED = 'Se ha agregado el item al carrito.';
const PARAMS_CATEGORY_ID = 'category_id=';
const PARAMS_PAGE = 'page=';
const PARAMS_PRODUCT = 'product=';
const PARAMS_QUERY_PRODUCT = 'productQuery=';
const PRODUCT_STATUS_ACTIVE = 'active';
const PRODUCT_STATUS_INACTIVE = 'inactive';
const LANGUAGE_TAG = 'es-CO';
const CURRENCY_NAME = 'COP';
const COUNTRY_PREFIX = '57'
const WHATSAPP_NUMBER = `${COUNTRY_PREFIX}3184831432`;
const PAYMENT_STATE = {
    Completed: 'Completado',
    Pending: 'Pendiente',
    Cancelled: 'Cancelado'
};
const WIDTH_MOBILE = 500;
const FACEBOOK_PAGE = 'https://facebook.com';
const INSTAGRAM_PAGE = 'https://instagram.com';
const KEY_STORAGE_BASE = 'GLDST0';

export const constants = Object.freeze({
    API_URL,
    USER_SIGNUP,
    USER_SIGNIN,
    USER_INFO,
    USER_SETPASSWORD,
    USER_CREATED,
    USER_LOGGED,
    USER_SESSION_EXPIRED,
    GET_CATEGORIES,
    GET_PRODUCTS_BY_CATEGORY,
    GET_PRODUCT_BY_ID,
    GET_ALL_PRODUCTS,
    GET_CART_PRODUCTS,
    QUERY_PRODUCTS,
    MODAL_TITLE_SUCCCESS,
    MODAL_TITLE_ERROR,
    MODAL_TITLE_SIGNOUT,
    MODAL_BODY_SIGNOUT,
    MODAL_ITEM_ADDED,
    PARAMS_CATEGORY_ID,
    PARAMS_PAGE,
    PARAMS_PRODUCT,
    PARAMS_QUERY_PRODUCT,
    PRODUCT_STATUS_ACTIVE,
    PRODUCT_STATUS_INACTIVE,
    LANGUAGE_TAG,
    CURRENCY_NAME,
    WHATSAPP_NUMBER,
    PAYMENT_STATE,
    USER_UPDATE_CART,
    USER_PURCHASE,
    USER_MOVEMENTS,
    WIDTH_MOBILE,
    FACEBOOK_PAGE,
    INSTAGRAM_PAGE,
    KEY_STORAGE_BASE
});