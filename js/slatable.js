const drawslaTables = (() => {

  let settings = {};

  // Transforms Google Spreadsheet JSON to array
  const createGsMatrix = (results) => {
      if (!results.feed) {
        return;
      }

      const gs_matrix = [];
      let gs_col, gs_row;

      const orders = {
        setted: {},
        get: (l) => {
          if (!this.setted[l]) {
            const ncols = 26;
            let col = 0;
            for (let i = l.length; i > 0; i--) {
              col += ((l.charCodeAt(i - 1) - 65) + 1) * (Math.pow(ncols, (l.length - i)));
            }
            this.setted[l] = col - 1;
          }
          return this.setted[l];
        },
      };

      // Create gs_matrix
      let gs_max_cols = 0;
      results.feed.entry.forEach(entry => {
        gs_col = orders.get(entry.title.$t.slice(0, 1));
        gs_max_cols = Math.max(gs_max_cols, gs_col);
        gs_row = parseInt(entry.title.$t.slice(1)) - 1;
        gs_matrix[gs_row] = gs_matrix[gs_row] || [];
        gs_matrix[gs_row][gs_col] = entry.content.$t;
      });

      // Fill empty cells
      gs_matrix.forEach(row => {
        for (let k = 0; k <= gs_max_cols; k++) {
          row[k] = row[k] || "";
        }
      });

      return gs_matrix;
  };

  // Basic DOM get one element
  const getElement = (selector) => {
    const element = document.querySelector(selector);
    if (!element) {
      console.info("Element doesn't exist", selector);
      return document.createElement("p");
    }
    return element;
  };

  // Basic DOM get list of elements
  const getElements = (selector) => {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
      console.info("Element doesn't exist", selector);
      return [document.createElement("p")];
    }
    return elements;
  };

  const getScript = (src, callback) => {
    let callbackFN;
    if (src.includes("callback=?")) {
      callbackFN = `mycustomcallback_${Date.now()}`;
      src = src.replace("callback=?", `callback=${callbackFN}`);
      window[callbackFN] = (data) => {
        callback(data);
      };
    }
    const script = document.createElement("script");
    script.onload = (data) => {
      callback(data);
    };
    script.src = src;
    document.head.appendChild(script);
  };

  // Draw desktop table
  const drawTable = (gs_matrix) => {
    if (!settings.desktop_container) {
        return;
    }

    const id = `gs_table_${Date.now()}`;

    const container = getElement(settings.desktop_container);
    container.insertAdjacentHTML('beforeend', `<table id='${id}' class='gs_desktop_table ${settings.desktop_css}'><thead></thead><tbody></tbody></table>`);

    const tableId = `#${id}`;

    gs_matrix.forEach((row, i) => {
      if (row) {
        getElement(`${tableId} ${(i === 0 ? "thead" : "tbody")}`).insertAdjacentHTML('beforeend', "<tr></tr>");
        row.forEach((cell, k) => {
          const nList = getElements(`${tableId} ${(i === 0 ? "thead" : "tbody")} tr`);
          nList[nList.length - 1].insertAdjacentHTML('beforeend', `<${(i === 0 || k === 0 ? "th" : "td")} ${(k === 0 && i > 1 ? "scope='row'" : "")} ${(i === 0 ? "scope='col'" : "")} data-label='${gs_matrix[0][k]}'>${cell}</${(i === 0 || k === 0 ? "th" : "td")}>`);
        });
      }
    });
  };

  // Draw responsive table
  const drawResponsiveTable = (gs_matrix) => {
    if (!settings.responsive_container) {
        return;
    }
    const id = `gs_table_${Date.now()}`;

    const container = getElement(settings.responsive_container);
    container.insertAdjacentHTML('beforeend', `<table id='${id}' class='gs_responsive_table ${settings.responsive_css}'><thead></thead><tbody></tbody></table>`);

    const tableId = `#${id}`;
    const colspan = !(gs_matrix && gs_matrix[0] && gs_matrix[0][0]);

    gs_matrix[0].forEach((header, i) => {
      if (header) {
        getElement(`${tableId} tbody`).insertAdjacentHTML('beforeend', `<tr><th ${(colspan ? "colspan='2'" : "")} class='gs_responsive_th'>${header}</th></tr>`);

        for (let k = 1; k < gs_matrix.length; k++) {
          if (gs_matrix[k][i] && (i > 0 || !colspan)) {
            getElement(`${tableId} tbody`).insertAdjacentHTML('beforeend', `<tr>${(colspan ? `<th>${gs_matrix[k][0]}</th>` : "")}<td>${gs_matrix[k][i]}</td></tr>`);
          }
        }
      }
    });
  };

  // Exposed function
  return (options) => {
    // Default values
    settings = {
      spreadsheet: "",
      desktop_container: "body",
      responsive_container: "body",
      desktop_css: "",
      responsive_css: ""
    };

    Object.assign(settings, options);

    getScript(settings.url, (results) => {
        const gs_matrix = results.values;
        if (!gs_matrix) {
          return;
        }
        drawTable(gs_matrix);
        drawResponsiveTable(gs_matrix);
        if (settings.callback && typeof settings.callback === "function") {
            settings.callback();
        }
    }); 
  };
 
})();

drawslaTables({
  url: "https://script.google.com/macros/s/AKfycbwyysK5_sh_6_kxLpcMA9VYeURvuy7R2-g-23aNK7nwd_wdlZbC/exec?callback=?",
  desktop_container: ".desktop_table",
  responsive_container: null
});



async function fetchSheetData(tableId, sheetUrl) {
  try {
      const response = await fetch(sheetUrl, { cache: "no-store" });
      const text = await response.text();
      const json = JSON.parse(text.substring(47).slice(0, -2));

      const rows = json.table.rows;
      if (!rows.length) return;

      const table = document.getElementById(tableId);
      const thead = table.querySelector("thead");
      const tbody = table.querySelector("tbody");

      // Clear previous content
      thead.innerHTML = "";
      tbody.innerHTML = "";

      // Populate headers from first row
      const headerRow = document.createElement("tr");
      const headers = rows[0].c.map(cell => cell?.v || "").filter(h => h.trim() !== "");
      headerRow.innerHTML = headers.map(h => `<th>${h}</th>`).join("");
      thead.appendChild(headerRow);

      // Populate rows from second row onward
      const fragment = document.createDocumentFragment();
      for (let i = 1; i < rows.length; i++) {
          const rowData = rows[i].c.map(cell => cell?.v || ""); // Convert null to empty string
          if (rowData.every(cell => cell === "")) continue; // Skip completely empty rows

          const tr = document.createElement("tr");
          tr.innerHTML = rowData.map(cell => `<td>${cell}</td>`).join("");
          fragment.appendChild(tr);
      }
      tbody.appendChild(fragment);
  } catch (error) {
      console.error(`Error fetching data for ${tableId}:`, error);
  }
}


      document.addEventListener("DOMContentLoaded", () => {
          fetchSheetData("zone-table-1", "https://docs.google.com/spreadsheets/d/1mW11Mf_wYB6LqicHGs6hB32g3rAPPIWzIvSiwzhru0w/gviz/tq?tqx=out:json&gid=522903942&tq=SELECT A, B, C, D, E");
          fetchSheetData("zone-table-2", "https://docs.google.com/spreadsheets/d/1mW11Mf_wYB6LqicHGs6hB32g3rAPPIWzIvSiwzhru0w/gviz/tq?tqx=out:json&gid=522903942&tq=SELECT G, H, I, J, K");
      });
 
