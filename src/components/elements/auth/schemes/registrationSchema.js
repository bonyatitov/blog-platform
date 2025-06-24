// Схема валидации 
import * as yup from 'yup';


export const schema = yup.object().shape({
  username: yup.string().min(3, 'Имя пользователя должно быть не меньше 3-х символов').max(20)
  .required('Поле обязательное')
  .test( // Асинхронная проверка имени на уникальность 
    'unique-username',
    'username занят',
    async () => 'h'
  ),
  email: yup.string().email('Не корректный емайл').required('Поле обязательное'),
  password: yup.string().min(6, 'Должен быть не меньше 6-ти символов')
  .max(40, 'Должен быть не больше 40 сивлов').required(),
  repeat: yup.string().oneOf([yup.ref('password'), null], 'Пароли должны совпадать').required('Поддтвердите пароль'),
  checkbox: yup.boolean().oneOf([true], 'Необходимо согласие на обработку данных').required('Обязательно нажми :)')
})