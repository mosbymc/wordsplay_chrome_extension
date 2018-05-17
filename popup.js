var metricsDesc = {
    highestScore: 'Highest Score: ',
    averageScore: 'Average Score: ',
    lowestScore: 'Lowest Score: ',
    highestRank: 'Highest Rank: ',
    lowestRank: 'Lowest Rank: ',
    averageRankPercentile: 'Average Rank Percentile: ',
    mostGameWords: 'Most Words In A Game: ',
    averageWordPoints: 'Average Points Per Words: ',
    averageGamePoints: 'Average Points in a Game: ',
    averageGameWords: 'Average Words in a Game: ',
    averageWordLength: 'Average Word Length: ',
    uniqueWords: 'Unique Words: ',
    longestWords: 'Longest Words: ',
    gamesPlayed: 'Games Played: '
};

function getMetrics(cb) {
    chrome.tabs.query({active: true, currentWindow: true}, function _tabs(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'get_metrics' }, function _sentMessageCallback(response) {
            cb(response);
        });
    });
}

getMetrics(function _metricsCallback(metrics) {
    Array.from(document.querySelectorAll('.metrics_div'))
        .forEach(function _addMetricToDOM(div) {
            let divId = div.id;
            if (divId in metrics) {
                if ('longestWords' !== divId && 'uniqueWords' !== divId) {
                    let span = document.createElement('span');
                    span.innerText = metricsDesc[divId] + metrics[divId];
                    div.appendChild(span);
                }
                else {
                    let descSpan = document.createElement('span');
                    descSpan.innerText = metricsDesc[divId];
                    div.appendChild(descSpan);

                    metrics[divId].forEach(function _createWordSpans(word, idx) {
                        let span = document.createElement('span');
                        let comma = idx === metrics[divId].length - 1 ? '' : ', ';
                        span.innerText = word + comma;
                        div.appendChild(span);
                    });

                    /*
                    for (let word in metrics[divId]) {
                        let span = document.createElement('span');
                        span.innerText = word;
                        div.appendChild(span);
                    }*/
                }
            }
        });
});

