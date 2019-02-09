var realtime = null;

const loadPage = () => {
    console.log('Page Loaded');
    document.getElementById('SwitchToggle').addEventListener('change', onSwitchChange);

}

function onSwitchChange() {
    if (this.checked) {
        if (realtime !== null) {
            return;
        }
        realtime = setInterval(function () {
            console.log(1);
            buildLastPrice();
            buildSupply();
            buildBlock();
            displayBlueBox();
        }, 2000);
    }
    else {
        clearInterval(realtime);
        realtime = null;
    }
}

function onLastBlockClick() {
    console.log(1);
}

function buildLastPrice() {
    fetch("https://api.etherscan.io/api?module=stats&action=ethprice&apikey=UD6AK73BBJ2GFY9PBFG5XXRXGJ3KDUMQ8X")
        .then(response => response.json())
        .then(data => {
            let priceSpan = document.getElementById('Price'),
                result = data.result || {},
                priceText = `$${result.ethusd} @ ${result.ethbtc}`;

            priceSpan.innerHTML = priceText;
        })
        .catch(error => console.error('OMG', error))
}








window.addEventListener('load', loadPage());

