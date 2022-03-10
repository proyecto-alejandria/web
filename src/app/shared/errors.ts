export const DEFAULT_ERRORS: { [key: string]: string } = {
  'email': 'Debe ser una dirección de e-mail válida',
  'required': 'Este campo es obligatorio',
};

export const DEFAULT_PARAM_ERRORS: { [key: string]: (err: any) => string } = {
  'max': err => `Debe ser como máximo ${err.max}`,
  'min': err => `Debe ser al menos ${err.min}`,
  'maxlength': err => `Debe tener como máximo ${err.requiredLength} caracteres`,
  'minlength': err => `Debe tener al menos ${err.requiredLength} caracteres`,
};

export const ACCESS_DENIED_ERROR = 'Se ha denegado el acceso';
export const CONNECTION_ERROR = 'No se pudo conectar con el servidor';
export const DEFAULT_PATTERN_ERROR = 'Formato inválido';
export const FATAL_LOAD_ERROR = 'Ha ocurrido un error inesperado y la aplicación no pudo iniciarse';
export const NOT_FOUND_ERROR = 'No se ha encontrado el elemento indicado';
export const SERVER_ERROR = 'El servidor ha devuelto un código de error';
export const UNKNOWN_ERROR = 'Error desconocido';
