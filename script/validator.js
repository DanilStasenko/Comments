const REGEXP_NAME_RULE = /^[a-zA-Zа-яА-ЯЁё]{2,32}$/;
const REGEXP_COMMENT_RULE = /[^\s]/;

const form = document.querySelector('.form');
const inputs = form.querySelectorAll('.check');

const validator = {
    name: {
        pattern: REGEXP_NAME_RULE,
        msgError: "Буквы в кол-ве от 2 до 32"
    },
    comment: {
        pattern: REGEXP_COMMENT_RULE,
        msgError: "Не должен быть пустым"
    },
}

function hasError() {
    let hasErr = false;
    
    inputs.forEach( (el) => {
        let rule = validator[el.dataset.rule];
        if (!rule.pattern.test(el.value)) {
            hasErr = true;
            el.classList.add('err');
            setErrorMsg(el, rule.msgError);
        } 
    });

    return hasErr;
}

form.addEventListener('focusin', function(event) {
    if (event.target.classList.contains('check')) {
        event.target.classList.remove('err');
        setErrorMsg(event.target, '');
    }
})

function setErrorMsg(input, msg) {
    let box = input.closest('.box-input');
    let msgBox = box.querySelector('.msgError');
    msgBox.innerHTML = msg;
}