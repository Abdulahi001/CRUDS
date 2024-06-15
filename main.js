let small = document.getElementsByTagName('samll');
let price = document.getElementById('price');
let ads = document.getElementById('ads');
let taxes = document.getElementById('taxes');


price.addEventListener('keyup', () => {
    small.innerHTML = price.value + ads.value + taxes.value
})