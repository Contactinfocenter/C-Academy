const sheetUrl = "https://docs.google.com/spreadsheets/d/1Ztj5sYlyK1LAA3Bmz_mkvHyt0Jzsz-bRfLCbSu0A9aI/gviz/tq?tqx=out:json&gid=567225812&tq=SELECT A, B, C";
  
fetch(sheetUrl)
  .then(response => response.text())
  .then(data => {
    // Remove unwanted characters to parse JSON
    const json = JSON.parse(data.substring(47).slice(0, -2));
    const rows = json.table.rows;
    const table = document.getElementById("officeAddressTable");

    // Populate headers
    const headerRow = document.createElement("tr");
    json.table.cols.forEach(col => {
      const th = document.createElement("th");
      th.textContent = col.label;
      headerRow.appendChild(th);
    });
    table.querySelector("thead").appendChild(headerRow);

    // Populate rows
    rows.forEach(row => {
      const tr = document.createElement("tr");
      row.c.forEach(cell => {
        const td = document.createElement("td");
        td.textContent = cell ? cell.v : ""; // Handle empty cells
        tr.appendChild(td);
      });
      table.querySelector("tbody").appendChild(tr);
    });
  })
  .catch(error => console.error("Error fetching data:", error));




const sheetURL = "https://docs.google.com/spreadsheets/d/19jUGiHWACHBLq8f_myB062iLSh1SU_VL_8oxFJz5_ak/gviz/tq?tqx=out:json";

fetch(sheetURL)
    .then(response => response.text())
    .then(data => {
        const json = JSON.parse(data.substring(47).slice(0, -2));
        const rows = json.table.rows;
        const headers = json.table.cols.map(col => col.label);

        const columnIndices = [0, 1, 2, 3, 4, 5, 6, 7];
        const filteredHeaders = columnIndices.map(index => headers[index]);
        const headerRow = filteredHeaders.map(header => `<th>${header}</th>`).join('');
        $('#package-table thead tr').append(headerRow);

        const bodyRows = rows.map(row =>
            `<tr>${columnIndices.map(index => `<td>${row.c[index] ? row.c[index].v : ''}</td>`).join('')}</tr>`
        ).join('');
        $('#package-table tbody').append(bodyRows);

        $('#package-table').DataTable({
            responsive: true,
            paging: true,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false
        });
    })
    .catch(error => console.error('Error fetching data:', error));

    document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.dataTables_filter input');
    if (searchInput) {
        searchInput.addEventListener('focus', () => {
            searchInput.style.borderColor = '#1976d2';
            searchInput.style.backgroundColor = '#e3f2fd';
        });
        searchInput.addEventListener('blur', () => {
            searchInput.style.borderColor = '#ccc'; // Revert to default
            searchInput.style.backgroundColor = ''; // Revert to default
        });
    }
});