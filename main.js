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


function buildSupply() {
    fetch("https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=UD6AK73BBJ2GFY9PBFG5XXRXGJ3KDUMQ8X")
        .then(response => response.json())
        .then(data => {
            let supplySpan = document.getElementById('supplynum'),
                result = data.result / 1000000000000000000;
            supplySpan.innerHTML = result.toFixed(0);

        })

}

function buildBlock() {
    fetch("https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=VI286PDTRHXSRUIXED7P1GPGNGBPIF9A4E")
        .then(response => response.json())
        .then(data => {
            let blockSpan = document.getElementById('lastblock'),
                lastblockresult = data.result;
            let x = parseInt(lastblockresult, 16)
            blockSpan.innerHTML = x;

        })

}

async function displayBlueBox() {
    let [lastPriceJson, totalSuplyJson] = await Promise.all([
        fetchApi("https://api.etherscan.io/api?module=stats&action=ethprice&apikey=VI286PDTRHXSRUIXED7P1GPGNGBPIF9A4E"),
        fetchApi("https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=VI286PDTRHXSRUIXED7P1GPGNGBPIF9A4E")
    ]);
    let price = lastPriceJson.result.ethusd,
        totalSupply = totalSuplyJson.result / 1000000000000000000000000000;
    let mktcap = price * totalSupply;
    let mktcapSpan = document.getElementById("mktcap");
    mktcapSpan.innerHTML = mktcap.toFixed(3);
}

function fetchApi(url) {
    return fetch(url)
        .then(response => {
            return response.json();
        });
}

displayBlueBox();

const test = document.querySelector("#Ethsupply");

test.addEventListener("mouseover", function( event ) { 
    // highlight the mouseover target
    event.target.style.fontSize = "50px";
  }, false);

test.addEventListener("mouseout", function( event ) { 
    // highlight the mouseout target
    event.target.style.fontSize = "2rem";
}, false);





window.addEventListener('load', loadPage());

