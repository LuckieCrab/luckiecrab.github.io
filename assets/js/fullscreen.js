if( window.innerHeight == screen.height) {
    $('#full-i').removeClass('active');
} else $('#full-i').addClass('active');

window.addEventListener('resize', (event) => {
    if( window.innerHeight == screen.height) {
        $('#full-i').removeClass('active');
    } else $('#full-i').addClass('active');
});