const { validationResult, body, check } = require("express-validator");

//separamos las reglas por un lado
const rulesUser = () => [
    body('mail')
        .notEmpty().withMessage('el mail no puede estar vacio')
        .isEmail().withMessage('por favor ingrese un mail valido')
        .normalizeEmail(),
    body('pass')
        .notEmpty().withMessage('la contraseña no puede estar vacia')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        .isLength({ max: 16 }).withMessage('La contraseña debe tener menos 16 caracteres')
]


const personaRules = () => [
    // Validación para DNI (ej. Argentina: 8 dígitos, sin puntos ni guiones)
    check('dni')
        .isInt({ min: 1000000, max: 99999999 })
        .withMessage('DNI debe ser un número de 7 a 8 dígitos'),

    // Validación para nombre (solo letras, mínimo 2 caracteres)
    check('nombre')
        .isAlpha('es-ES', { ignore: ' ' })
        .withMessage('El nombre debe contener solo letras')
        .isLength({ min: 2, max: 50 })
        .withMessage('El nombre debe tener entre 2 y 50 caracteres'),

    // Validación para apellido (solo letras, mínimo 2 caracteres)
    check('apellido')
        .isAlpha('es-ES', { ignore: ' ' })
        .withMessage('El apellido debe contener solo letras')
        .isLength({ min: 2, max: 50 })
        .withMessage('El apellido debe tener entre 2 y 50 caracteres'),

    // Validación para teléfono (formato de número telefónico internacional o local)
    check('telefono')
        .matches(/^[+]?[0-9\s-]{7,15}$/)
        .withMessage('El teléfono debe ser un número válido con entre 7 y 15 dígitos'),

    // Validación para dirección (mínimo 5 caracteres, letras y números)
    check('direccion')
        .isLength({ min: 5, max: 100 })
        .withMessage('La dirección debe tener entre 5 y 100 caracteres')
        .matches(/^[a-zA-Z0-9\s,.-áéíóúÁÉÍÓÚñÑ]+$/)
        .withMessage('La dirección solo puede contener letras, números y los caracteres: , . -')
];




// y el atrapador de errores por otro lado
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = { validate, rulesUser, personaRules };
