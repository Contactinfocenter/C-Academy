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
loadCSV("https://docs.google.com/spreadsheets/d/1KOOSkwsX5aLnzKlyIt4oVXCJHFwvewZXKxGeo4Py1og/export?format=csv&gid=1725157277", "121-SMS", "stext", "sbody");
loadCSV("https://docs.google.com/spreadsheets/d/1KOOSkwsX5aLnzKlyIt4oVXCJHFwvewZXKxGeo4Py1og/export?format=csv&gid=0", "Common-SMS", "stext", "sbody");
loadCSV("https://docs.google.com/spreadsheets/d/1KOOSkwsX5aLnzKlyIt4oVXCJHFwvewZXKxGeo4Py1og/export?format=csv&gid=721123582", "mail", "subject", "mailbody");
