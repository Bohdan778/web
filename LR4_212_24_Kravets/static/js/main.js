$(document).ready(function () {

    $("#form").submit(function (e) {
        e.preventDefault();

        let data = {
            name: $("#name").val(),
            email: $("#email").val(),
            amount: $("#amount").val(),
            type: $("#type").val()
        };

        if (!data.name || !data.email || !data.amount || !data.type) {
            alert("Заповни всі поля!");
            return;
        }

        $.ajax({
            url: "/calculate",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),

            success: function (res) {
                if (res.error) {
                    alert(res.error);
                    return;
                }

                $("#result").html(`
                    Знижка: ${res.discount.toFixed(2)} грн <br>
                    До оплати: ${res.final_price.toFixed(2)} грн
                `);
            },

            error: function () {
                alert("Помилка сервера");
            }
        });

    });

});