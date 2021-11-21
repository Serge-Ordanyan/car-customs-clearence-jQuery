$('#power').on('input', function() {
    if ($('.result').hasClass('d-flex')) {
        $('.result').removeClass('d-flex');
        $('.result').addClass('d-none');
    }
});

function selectItem(a) {
    $(a).find('option').removeClass('active');
    $(a).find('option:selected').addClass('active');
    if ($('.result').hasClass('d-flex')) {
        $('.result').removeClass('d-flex');
        $('.result').addClass('d-none');
    }
}

function result() {
    var transportType = $('#transportType').find('option.active').attr('data-id');
    var year = $('#year').val();
    var D = new Date();
    var power = $('#power').val();

    if ($('#power').length != 0 && $('#power') != 0 && $('#power').val() !== "" && $.isNumeric($('#power').val()) && $('#power').val() >= 0) {

        var year = D.getFullYear() - year;

        if (0 <= year && year <= 3) {
            var koef = 1;
        } else if (year == 4) {
            var koef = 0.9;
        } else if (year == 5) {
            var koef = 0.8;
        } else if (year == 6) {
            var koef = 0.7;
        } else if (year == 7) {
            var koef = 0.6;
        } else if (year >= 8) {
            var koef = 0.5;
        }

        if (transportType == 0) {
            if (1 <= power && power <= 120) {
                var pay = 200 * power;
            } else if (121 <= power && power <= 250) {
                if (150 < power) {
                    var pay = 300 * power + ((power - 150) * 1000);
                } else {
                    var pay = 300 * power;
                }
            } else if (power >= 251) {
                var pay = 500 * power + ((power - 150) * 1000);
            }
        } else if (transportType == 1) {
            if (1 <= power && power <= 200) {
                var pay = 100 * power;
            } else if (200 < power) {
                var pay = 200 * power;
            }
        } else if (transportType == 2) {
            if (year >= 20) {
                var pay = 0;
            } else if (1 <= power && power <= 200) {
                var pay = 100 * power;
            } else if (200 < power) {
                var pay = 200 * power;
            }
        } else if (transportType == 3) {
            var koef = 1;
            var pay = 40 * power;
        } else if (transportType == 4) {
            var koef = 1;
            var pay = 150 * power;
        }

        var result = pay * koef + ' AMD';
        if ($('.result').hasClass('d-none')) {
            $('.result').removeClass('d-none');
            $('.result').addClass('d-flex');
        }
        $('#result').html(result);
    } else {
        alert('All fields are required!!!')
    }
}