const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g

const PHONE_REGEX = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/g

export const validatePhone = phone => {
  if (!phone.length) {
    return { valid: false, error: 'Este campo es requerido' }
  }

  if (!phone.match(PHONE_REGEX)) {
    return { valid: false, error: 'Por favor, ingrese un número válido' }
  }

  return { valid: true, error: null }
}

export const validateField = field => {
  if (!field.length) {
    return { valid: false, error: 'Este campo es requerido' }
  }

  return { valid: true, error: null }
}

export const validateCi = ci => {
  if (!ci.length) {
    return { valid: false, error: 'Este campo es requerido' }
  }

  if (!ci.match(/[0-9]+/)) {
    return { valid: false, error: 'Por favor, ingrese un CI válido' }
  }

  return { valid: true, error: null };
}

export const validateNumberField = field => {
  if (!field.length) {
    return { valid: false, error: 'Este campo es requerido' }
  }

  if (!field.match(/[0-9]+/)) {
    return { valid: false, error: 'Por favor, ingrese un número válido' }
  }

  return { valid: true, error: null };
}

export const validateEmail = email => {
  if (!email.length) {
    return { valid: false, error: 'Este campo es requerido' }
  }
  if (!email.match(EMAIL_REGEX)) {
    return { valid: false, error: 'Por favor, ingrese una dirección de correo válido' }
  }
  return { valid: true, error: null }
}
