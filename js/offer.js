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
loadCSV("https://docs.google.com/spreadsheets/d/1pLAeOC5eDLSGD1mvcQynU0Hh3qVFLkRHG2K2gaGgTGs/export?format=csv&gid=1575615671", "churn", "questions", "answer");
loadCSV("https://docs.google.com/spreadsheets/d/1pLAeOC5eDLSGD1mvcQynU0Hh3qVFLkRHG2K2gaGgTGs/export?format=csv&gid=1826475109", "referral", "questions", "answer");
loadCSV("https://docs.google.com/spreadsheets/d/1pLAeOC5eDLSGD1mvcQynU0Hh3qVFLkRHG2K2gaGgTGs/export?format=csv&gid=566104666", "cashback", "questions", "answer");
loadCSV("https://docs.google.com/spreadsheets/d/1pLAeOC5eDLSGD1mvcQynU0Hh3qVFLkRHG2K2gaGgTGs/export?format=csv&gid=315968778", "supper-saver", "questions", "answer");
loadCSV("https://docs.google.com/spreadsheets/d/1mW11Mf_wYB6LqicHGs6hB32g3rAPPIWzIvSiwzhru0w/export?format=csv&gid=1069717694", "ip-phone", "questions", "answer");

(function(){
  let settings = {};

  // Convert Google Sheets JSON to matrix
  const createGsMatrix = (results) => {
      if (!results.feed) return;

      let gs_matrix = [], orders = {};
      
      orders.get = (l) => {
          if (!orders[l]) {
              let col = 0, ncols = 26;
              for (let i = l.length; i > 0; i--) {
                  col += ((l.charCodeAt(i - 1) - 65) + 1) * (Math.pow(ncols, (l.length - i)));
              }
              orders[l] = col - 1;
          }
          return orders[l];
      };

      let max_cols = 0;
      results.feed.entry.forEach(entry => {
          let col = orders.get(entry.title.$t.slice(0, 1));
          max_cols = Math.max(max_cols, col);
          let row = parseInt(entry.title.$t.slice(1)) - 1;
          gs_matrix[row] = gs_matrix[row] || [];
          gs_matrix[row][col] = entry.content.$t;
      });

      // Fill empty cells
      gs_matrix.forEach(row => {
          for (let k = 0; k <= max_cols; k++) {
              row[k] = row[k] || "";
          }
      });
      return gs_matrix;
  };

  const getElement = (selector) => document.querySelector(selector) || document.createElement("p");
  const getElements = (selector) => document.querySelectorAll(selector) || [document.createElement("p")];

  const getScript = (src, callback) => {
      let callbackFN;
      if (src.includes("callback=?")) {
          callbackFN = "callback_" + Date.now();
          src = src.replace("callback=?", "callback=" + callbackFN);
          window[callbackFN] = callback;
      }
      let script = document.createElement("script");
      script.src = src;
      script.onload = callback;
      document.head.appendChild(script);
  };

  // Draw Table
  const drawTable = (matrix) => {
      if (!settings.desktop_container) return;

      let container = getElement(settings.desktop_container);
      let id = "gs_table_" + Date.now();
      container.insertAdjacentHTML('beforeend', `<table id='${id}' class='gs_router_table ${settings.desktop_css}'><thead></thead><tbody></tbody></table>`);

      let table = getElement("#" + id);
      matrix.forEach((row, i) => {
          let section = i === 0 ? "thead" : "tbody";
          let tr = document.createElement("tr");
          row.forEach((cell, k) => {
              let tag = (i === 0 || k === 0) ? "th" : "td";
              let thScope = i === 0 ? "col" : "row";
              let cellEl = `<${tag} scope='${thScope}'>${cell}</${tag}>`;
              tr.insertAdjacentHTML('beforeend', cellEl);
          });
          table.querySelector(section).appendChild(tr);
      });
  };

  // Responsive Table
  const drawResponsiveTable = (matrix) => {
      if (!settings.responsive_container) return;

      let container = getElement(settings.responsive_container);
      let id = "gs_table_" + Date.now();
      container.insertAdjacentHTML('beforeend', `<table id='${id}' class='gs_responsive_table ${settings.responsive_css}'><thead></thead><tbody></tbody></table>`);

      let table = getElement("#" + id);
      let colspan = !matrix[0][0];

      matrix[0].forEach((header, i) => {
          if (header) {
              let tbody = table.querySelector("tbody");
              tbody.insertAdjacentHTML('beforeend', `<tr><th ${colspan ? "colspan='2'" : ""} class='gs_responsive_th'>${header}</th></tr>`);
              
              for (let k = 1; k < matrix.length; k++) {
                  if (matrix[k][i] && (i > 0 || !colspan)) {
                      tbody.insertAdjacentHTML('beforeend', `<tr>${colspan ? `<th>${matrix[k][0]}</th>` : ""}<td>${matrix[k][i]}</td></tr>`);
                  }
              }
          }
      });
  };

  window.drawTableslaChurn = (options) => {
      settings = {
          spreadsheet: "",
          desktop_container: "body",
          responsive_container: "body",
          desktop_css: "",
          responsive_css: "",
          ...options
      };

      getScript(settings.url, (results) => {
          let matrix = results.values || createGsMatrix(results);
          if (!matrix) return;
          drawTable(matrix);
          drawResponsiveTable(matrix);
          if (settings.callback) settings.callback();
      });
  };
})();

// Call the function
drawTableslaChurn({
  url: "https://script.google.com/macros/s/AKfycbzHDzT4osYSeNgyZxcd6ehvTubukd91aIWOF7t9OUA1RO8c0mG9Bgyv52l9PQaMZMyPeg/exec?callback=?",
  desktop_container: ".churn_table",
  responsive_container: null
});