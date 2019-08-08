'use strict';

// Код валидации формы
(function () {
    function isValidInput (input) {
        if (input.dataset.hasOwnProperty('required') && !input.value) {
            return false;
        }
        return Value_validator(input.value, input.dataset);
    }
    function isRegValid (value, reg) {
        var re = new RegExp(reg);
        return re.test(value);
    }
    function isNumberValid (value, min_valid, max_valid) {
        var number = parseInt(value);
        if (number < min_valid) {
            return false;
        }
        if (number > max_valid) {
            return false;
        }
        if (isNaN(number)) {
            return false;
        }
        return true;
    }
    function isLetterValid (value) {
        var re_letter = new RegExp('^[a-zа-яё]+$', 'i')
        return re_letter.test(value)
    }
    function Value_validator (value, dataset) {
        if (dataset.validator =='number') {
            return isNumberValid(value, dataset.validatorMin, dataset.validatorMax);
        }
        if (dataset.validator == 'letters') {
            return isLetterValid(value);
        }
        if (dataset.validator == 'regexp') {
            return isRegValid (value, dataset.validatorPattern);
        }
    }
    window.validateForm = function (set) {
        var form = document.getElementById(set.formId);
        var inputs = Array.from(document.querySelectorAll('#' + set.formId + ' input'));
        form.addEventListener('blur', function(event) {
            var onTarget = event.target;
            if (onTarget.tagName == 'INPUT') {
                if (!isValidInput(onTarget)) {
                    onTarget.classList.add(set.inputErrorClass)
                }
            }
        }, true)
        form.addEventListener('focus', function(event) {
            var onTarget = event.target;
            if (onTarget.tagName == 'INPUT') {
                onTarget.classList.remove(set.inputErrorClass);
            }
        }, true)
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            form.classList.remove(set.formValidClass);
            form.classList.remove(set.formInvalidClass);
            var err = false;
            for (var i = 0; i < inputs.length; i++) {
                if (!isValidInput(inputs[i])) {
                    inputs[i].classList.add(set.inputErrorClass);
                    err = true;
                }
            }
            if (!err) {
                form.classList.add(set.formValidClass);
            } else {
                form.classList.add(set.formInvalidClass);
            }
        })
    }
}())
