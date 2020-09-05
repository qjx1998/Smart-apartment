(function setRem(document) {
    function setRemUnit() {
        const HTML = document.documentElement;
        const CLIENT_WIDTH = HTML.clientWidth / 100;
        HTML.style.fontSize = CLIENT_WIDTH + 'px';
    }

    setRemUnit();
    window.addEventListener('resize', setRemUnit);
})(document);
