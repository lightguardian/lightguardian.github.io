$('.sumir').click(function () {
    if ($('#some').is(":visible")) {
        $('#some').fadeOut();
    } else {
        $('#some').fadeIn();
    }
});
