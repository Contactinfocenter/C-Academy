document.addEventListener('DOMContentLoaded', () => {
    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const csvText = await response.text();
            const data = await csv().fromString(csvText);
            console.log("Fetched data:", data);

            data.forEach((row, index) => {
                const idx = index + 1; // Adjust for zero-based index
                const title = document.getElementById(`title_${idx}`);
                const description = document.getElementById(`description_${idx}`);
                const why = document.getElementById(`why_${idx}`);                        
                const features = document.getElementById(`features_${idx}`);
                const device = document.getElementById(`device_${idx}`);
                const infrastructure = document.getElementById(`infrastructure_${idx}`);
                
                if (title) title.innerHTML = row.title || "";
                if (description) description.innerHTML = row.description || "";
                if (why) why.innerHTML = row.why || "";                        
                if (features) features.innerHTML = row.features || "";
                if (device) device.innerHTML = row.device || "";
                if (infrastructure) infrastructure.innerHTML = row.infrastructure || "";
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const url = "https://docs.google.com/spreadsheets/d/1Ztj5sYlyK1LAA3Bmz_mkvHyt0Jzsz-bRfLCbSu0A9aI/export?format=csv&gid=0";
    fetchData(url);


});