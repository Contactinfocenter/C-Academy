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
loadCSV("https://docs.google.com/spreadsheets/d/1Ztj5sYlyK1LAA3Bmz_mkvHyt0Jzsz-bRfLCbSu0A9aI/export?format=csv&gid=678427624", "realip", "questions", "answer");
loadCSV("https://docs.google.com/spreadsheets/d/1Ztj5sYlyK1LAA3Bmz_mkvHyt0Jzsz-bRfLCbSu0A9aI/export?format=csv&gid=1969957514", "packagemigration", "questions", "answer");
loadCSV("https://docs.google.com/spreadsheets/d/1Ztj5sYlyK1LAA3Bmz_mkvHyt0Jzsz-bRfLCbSu0A9aI/export?format=csv&gid=73674277", "ownership", "questions", "answer");
loadCSV("https://docs.google.com/spreadsheets/d/1Ztj5sYlyK1LAA3Bmz_mkvHyt0Jzsz-bRfLCbSu0A9aI/export?format=csv&gid=10727394", "link-shift", "questions", "answer");
loadCSV("https://docs.google.com/spreadsheets/d/1Ztj5sYlyK1LAA3Bmz_mkvHyt0Jzsz-bRfLCbSu0A9aI/export?format=csv&gid=66990491", "lan-support", "questions", "answer");
loadCSV("https://docs.google.com/spreadsheets/d/1Ztj5sYlyK1LAA3Bmz_mkvHyt0Jzsz-bRfLCbSu0A9aI/export?format=csv&gid=1127181162", "refund-process", "questions", "answer");
loadCSV("https://docs.google.com/spreadsheets/d/1Ztj5sYlyK1LAA3Bmz_mkvHyt0Jzsz-bRfLCbSu0A9aI/export?format=csv&gid=1096536005", "payment", "questions", "answer");
loadCSV("https://docs.google.com/spreadsheets/d/1Ztj5sYlyK1LAA3Bmz_mkvHyt0Jzsz-bRfLCbSu0A9aI/export?format=csv&gid=1830565918", "discontinue", "questions", "answer");
loadCSV("https://docs.google.com/spreadsheets/d/11O8HvOKQmr1PxuTwfExElwuEaZvRVK6oKbjuH9t4UsU/export?format=csv", "pro", "questions", "answer");
loadCSV("https://docs.google.com/spreadsheets/d/1WxAPDuYET_K2z8LiPHY1oF_ljQKUxL_REokZFv159sU/export?format=csv", "frequentlyaskquestion", "question", "description");
loadCSV("https://docs.google.com/spreadsheets/d/1mW11Mf_wYB6LqicHGs6hB32g3rAPPIWzIvSiwzhru0w/export?format=csv&gid=1366333059", "invoice", "question", "description");
loadCSV("https://docs.google.com/spreadsheets/d/1Ztj5sYlyK1LAA3Bmz_mkvHyt0Jzsz-bRfLCbSu0A9aI/export?format=csv&gid=682032982", "compensation", "questions", "answer");