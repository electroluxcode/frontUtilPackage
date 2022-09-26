function doubleHeight(element) {
    var currentHeight = element.clientHeight;
    window.requestAnimationFrame(function () {
        element.style.height = (currentHeight * 2) + 'px';
    });
}

//
document.getElementsByClassName("rs-link_2DE3Q").forEach(doubleHeight);
