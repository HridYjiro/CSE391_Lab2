const quoteText = document.querySelector(".quote"),
    quoteBtn = document.querySelector("button"),
    authorName = document.querySelector(".name"),
    speechBtn = document.querySelector(".speech"),
    copyBtn = document.querySelector(".copy"),
    twitterBtn = document.querySelector(".twitter"),
    synth = speechSynthesis;

init();
var initialWeight, selectedWeight;
function func() {
    initialWeight = Number(document.getElementById('inWeight').value);
    selectedWeight = document.getElementById('wt').value;
    if (selectedWeight == "Grams") {
        document.getElementById('Rgrams').textContent = initialWeight;
        document.getElementById('Rkilograms').textContent = (initialWeight / 1000).toFixed(4);
        document.getElementById('Rpounds').textContent = (initialWeight * 0.0022046).toFixed(4);
        document.getElementById('Rounces').textContent = (initialWeight * 0.035274).toFixed(4);
    }
    if (selectedWeight == "KiloGrams") {
        document.getElementById('Rkilograms').textContent = initialWeight;
        document.getElementById('Rgrams').textContent = (initialWeight * 1000).toFixed(4);
        document.getElementById('Rpounds').textContent = (initialWeight * 2.2046).toFixed(4);
        document.getElementById('Rounces').textContent = (initialWeight * 35.274).toFixed(4);
    }
    if (selectedWeight == "Pounds") {
        document.getElementById('Rpounds').textContent = initialWeight;
        document.getElementById('Rgrams').textContent = (initialWeight / 0.0022046).toFixed(4);
        document.getElementById('Rkilograms').textContent = (initialWeight / 2.2046).toFixed(4);
        document.getElementById('Rounces').textContent = (initialWeight * 16).toFixed(4);
    }
    if (selectedWeight == "Ounces") {
        document.getElementById('Rounces').textContent = (initialWeight).toFixed(4);
        document.getElementById('Rgrams').textContent = (initialWeight / 0.035274).toFixed(4);
        document.getElementById('Rkilograms').textContent = (initialWeight / 35.274).toFixed(4);
        document.getElementById('Rpounds').textContent = (initialWeight * 0.0625).toFixed(4);
    }
}
function init() {
    document.getElementById('Rgrams').textContent = null;
    document.getElementById('Rkilograms').textContent = null;
    document.getElementById('Rpounds').textContent = null;
    document.getElementById('Rounces').textContent = null;
}
function resetValue() {
    document.getElementById('inWeight').value = null;
    document.getElementById('wt').value = null;

    document.getElementById('Rgrams').textContent = null;
    document.getElementById('Rkilograms').textContent = null;
    document.getElementById('Rpounds').textContent = null;
    document.getElementById('Rounces').textContent = null;
}

function calculateSumAverage() {
    // This is the string that contains the numbers separated by a space.
    var inputValue = document.getElementById('numberSeries').value;

    var values = inputValue.split(',')
        .map((val) => parseInt(val))
        .filter((val) => !isNaN(val));

    var sum = values.reduce((currentVal, nextVal) => currentVal + nextVal, 0);

    var maximum = Math.max(...values);

    var minimum = Math.min(...values);
    var rev = [...values].reverse().join(',');

    document.getElementById('calculationSumOutput').innerHTML = `Sum: ${sum}`;
    document.getElementById('calculationMaxOutput').innerHTML = `Max: ${maximum}`;
    document.getElementById('calculationMinOutput').innerHTML = `Min: ${minimum}`;
    document.getElementById('calculationAvgOutput').innerHTML = `Average: ${sum / values.length}`;
    document.getElementById('calculationRevOutput').innerHTML = `Reverse: ${rev}`;
    
}

function randomQuote() {
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";
    fetch("http://api.quotable.io/random").then(response => response.json()).then(result => {
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.classList.remove("loading");
        quoteBtn.innerText = "New Quote";
    });
}

speechBtn.addEventListener("click", () => {
    if (!quoteBtn.classList.contains("loading")) {
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        synth.speak(utterance);
        setInterval(() => {
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
});

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener("click", () => {
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);