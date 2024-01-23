const inputFile = document.getElementById('orgFile')
const excelFile = document.getElementById('excelFile')

const upload = async () => {
    const orgFile = inputFile.files[0];
    const linkFile = excelFile.files[0];
    
    try {
        const uri = "http://localhost:8000/upload";
        const formData = new FormData();
        formData.append('inputFile', orgFile);
        formData.append('excelFile', linkFile);
        const res = await fetch(uri, {
            method: 'POST',
            body: formData
        })
        if (res.ok) {
            // Extract the filename from the response headers or use a default name
            const filename = res.headers.get('Content-Disposition') || `${linkFile.name.substr(0,linkFile.name.indexOf('.'))}-modified`;

            // Convert the response to a blob
            const blob = await res.blob();

            // Create a link element to trigger the download
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;

            // Append the link to the document and trigger a click event
            document.body.appendChild(link);
            link.click();

            // Remove the link from the document
            document.body.removeChild(link);
        } else {
            console.error('Request failed with status:', res.status);
        }
    }
    catch (err) {
        console.log("failed to upload");
    }
}