module.exports = {
  errors_db: {
    REQUIRED: '{PATH} is required',
    UNIQUE: 'This {PATH} already exists',
    VALIDATION: 'Please set a valid {PATH}',
    VALIDATIONENUM: 'Please set a valid {PATH}, should not be {VALUE}',
    VALIDATIONMIN: 'Please set a valid {PATH}, too short',
    VALIDATIONMAX: 'Please set a valid {PATH}, too long'
  },
  http_errors: {
    default: {
      message: 'An error has occurred. Please try again',
      code: 'default_error',
    },
    missing_information: {
      message: 'Informations manquantes',
      code: 'missing_information'
    },
    bad_authentication: {
      message: 'Mauvaise authentification',
      code: 'bad_authentication'
    },
    bad_signin_method: {
      message: 'Mauvaise méthode de connexion',
      code: 'bad_signin_method'
    },
    expired_token: {
      message: 'Session expirée, essayez de vous connecter à nouveau',
      code: 'expired_token'
    },
  }
}
