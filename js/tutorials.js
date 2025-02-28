// Load CSV and display in a specific element
function loadCSV(url, elementId, titleKey, contentKey) {
    fetch(url)
        .then(result => result.text())
        .then(csvtext => {
            return Papa.parse(csvtext, { header: true, skipEmptyLines: true }).data;
        })
        .then(csv => {
            const container = document.getElementById(elementId); // Use getElementById for better performance
            if (!container) {
                console.error("Element not found:", elementId);
                return;
            }
            csv.forEach(row => {
                container.innerHTML += `<h5><strong>${row[titleKey]}</strong></h5>`;
                container.innerHTML += `<p>${row[contentKey]}</p>`;
            });
        })
        .catch(error => console.error("Error loading CSV:", error));
}

// Usage examples:
loadCSV("https://docs.google.com/spreadsheets/d/1mW11Mf_wYB6LqicHGs6hB32g3rAPPIWzIvSiwzhru0w/export?format=csv&gid=440349579", "devices", "status", "know_how");
loadCSV("https://docs.google.com/spreadsheets/d/1mW11Mf_wYB6LqicHGs6hB32g3rAPPIWzIvSiwzhru0w/export?format=csv&gid=0", "no-internet", "step", "process");
loadCSV("https://docs.google.com/spreadsheets/d/1mW11Mf_wYB6LqicHGs6hB32g3rAPPIWzIvSiwzhru0w/export?format=csv&gid=1605887753", "slow-speed", "step", "process");
loadCSV("https://docs.google.com/spreadsheets/d/1mW11Mf_wYB6LqicHGs6hB32g3rAPPIWzIvSiwzhru0w/export?format=csv&gid=496493166", "wifi-hut", "step", "process");


