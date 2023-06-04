import {body} from 'express-validator'

export const loginValidation = [
    body('email', 'Невірний формат пошти').isEmail(),
    body('password', 'Пароль не менше 5-ти символів').isLength({min: 5}),
]

export const registerValidation = [
    body('email', 'Невірний формат пошти').isEmail(),
    body('password', 'Пароль не менше 5-ти символів').isLength({min: 5}),
    body('fullName', 'Вкажіть імя').isLength({min: 3}),
    body('avatarUrl', 'Невірне посилання на аватарку').optional().isURL()
]

export const postCreateValidation = [
    body('title', 'Введіть заголовок поста').isLength({min: 3}).isString(),
    body('text', 'Введіть текст поста').isLength({min: 3}).isString(),
    body('tags', 'Неправильний формат тегів (вкажіть масив)').optional().isString(),
    body('imageUrl', 'Невірне посилання на фото').optional().isString()
]