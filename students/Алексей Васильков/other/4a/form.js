'use strict';

// 3. *Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить. При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
// a. Имя содержит только буквы.
// b. Телефон имеет вид +7(000)000-0000.
// c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
// d. Текст произвольный.
// e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.

function check() {
    let errorForm = [null];
    const
        inputName = document.forms.form.form_name.value,
        inputPhone = document.forms.form.form_phone.value,
        inputEmail = document.forms.form.form_email.value,
        nameCheck = /^[aA-zZ-аА-яЯ]+$/g,
        phoneCheck = /^[+7]+[(]+\d{3}[)]+\d{3}\-\d{4}$/g,
        emailCheck = /^([a-z0-9.-]+)@([a-z]{4,5}).([a-z]{2,3})$/g;
        

    if (!inputName.match(nameCheck)) {
        errorForm = document.getElementById('input_name').style.display='block';
        alert('Имя, должно состоять только из букв!');
        errorForm = document.getElementById('input_name').style.display='none';
        return false;
    } else if (!inputPhone.match(phoneCheck)) {
        errorForm = document.getElementById('input_phone').style.display='block';
        alert('Телефон, должен быть в формате: +7(000)000-0000!');
        errorForm = document.getElementById('input_phone').style.display='none';
        return false;
    } else if (!inputEmail.match(emailCheck)) {
        errorForm = document.getElementById('input_email').style.display='block';
        alert('Введите, корректную форму e-mail!');
        errorForm = document.getElementById('input_email').style.display='none';
        return false;
    } else {
        alert('Ваше сообщение, отправлено!');
    }
    return false;
}
