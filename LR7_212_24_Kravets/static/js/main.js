$(document).ready(function () {

    $("#myForm").submit(function (e) {

        let valid = true;
        let errorMsg = "";
        let name = $("input[name='name']").val().trim();
        let email = $("input[name='email']").val().trim();
        let password = $("input[name='password']").val().trim();
        let city = $("select[name='city']").val();
        let message = $("textarea[name='message']").val().trim();

        $(".error").html("");

        if (name === "") {
            valid = false;
            errorMsg += "Введіть ім'я<br>";
        } else if (name.length < 2) {
            valid = false;
            errorMsg += "Ім'я має бути мінімум 2 символи<br>";
        }

        let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (email === "") {
            valid = false;
            errorMsg += "Введіть email<br>";
        } else if (!emailPattern.test(email)) {
            valid = false;
            errorMsg += "Некоректний email<br>";
        }

        if (password === "") {
            valid = false;
            errorMsg += "Введіть пароль<br>";
        } else if (password.length < 6) {
            valid = false;
            errorMsg += "Пароль мінімум 6 символів<br>";
        }

        if (city === "") {
            valid = false;
            errorMsg += "Оберіть місто<br>";
        }

        if (message !== "" && message.length < 5) {
            valid = false;
            errorMsg += "Повідомлення має бути мінімум 5 символів<br>";
        }

        if (!valid) {
            e.preventDefault(); 
            $(".error").html(errorMsg);
        }

    });

});