// 3. *Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить. При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
// a. Имя содержит только буквы.
// b. Телефон имеет вид +7(000)000-0000.
// c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
// d. Текст произвольный.
// e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.

'use strict';

const check = () => {
    const
        nameCheck = /^[aA-zZ] +$/g,
        phoneCheck = /^\+7\(\d{3})\d{3}-\d{4}$/g,
        emailCheck = /^([aA-zZ]{6}+)@([aA-zZ]{4}+)\.([a-z]{2})$/g || /^([aA-zZ]{2}+)\.([aA-zZ]{4}+)@([aA-zZ]{4}+)\.([a-z]{2})$/g || /^([aA-zZ]{2}+)\-([aA-zZ]{4}+)@([aA-zZ]{4}+)\.([a-z]{2})$/g,
        inputName = document.form.name.value,
        inputPhone = document.form.phone.value,
        inputEmail = document.form.email.value;

    if(!inputName.match(nameCheck)) {
        alert('Имя, должно состоять только из букв!');
        return false;
    } else if(!inputPhone.match(phoneCheck)) {
        alert('Телефон, должен быть в формате: +7(000)000-0000!');
        return false;
    } else if(!inputEmail.match(emailCheck)) {
        alert('Введите, корректную форму email!');
        return false;
    } else{
        alert('Ваше сообщение, отправлено!');
    }
    return false;
};
