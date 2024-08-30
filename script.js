document.addEventListener('DOMContentLoaded', () => {
    const uploadButton = document.getElementById('uploadButton');
    const fileInput = document.getElementById('fileInput');
    const folderNameInput = document.getElementById('folderNameInput');
    const usernameInput = document.getElementById('usernameInput');
    const folderList = document.getElementById('folderList');

    // Load folders and files from local storage on page load
    loadFolders();

    uploadButton.addEventListener('click', () => {
        const file = fileInput.files[0];
        const folderName = folderNameInput.value.trim();
        const username = usernameInput.value.trim();
        if (file && username) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const fileData = {
                    name: file.name,
                    content: event.target.result,
                    username: username,
                    timestamp: new Date().toLocaleString()
                };
                saveFile(fileData, folderName);
                displayFolders();
                fileInput.value = ''; // Clear the file input
                folderNameInput.value = ''; // Clear the folder input
                usernameInput.value = ''; // Clear the username input
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please provide a username and select a file.');
        }
    });

    function saveFile(fileData, folderName) {
        let folders = JSON.parse(localStorage.getItem('folders')) || {};
        if (!folders[folderName]) {
            folders[folderName] = [];
        }
        folders[folderName].push(fileData);
        localStorage.setItem('folders', JSON.stringify(folders));
    }

    function loadFolders() {
        const folders = JSON.parse(localStorage.getItem('folders')) || {};
        for (const [folderName, files] of Object.entries(folders)) {
            displayFolder(folderName, files);
        }
    }

    function displayFolders() {
        folderList.innerHTML = '';
        const folders = JSON.parse(localStorage.getItem('folders')) || {};
        for (const [folderName, files] of Object.entries(folders)) {
            displayFolder(folderName, files);
        }
    }

    function displayFolder(folderName, files) {
        const folderDiv = document.createElement('div');
        folderDiv.classList.add('folder');
        folderDiv.innerHTML = `
            <strong>${folderName}</strong>
            <ul>
                ${files.map(file => `
                    <li class="file">
                        <a href="${file.content}" download="${file.name}">${file.name}</a>
                        <div>
                            <small>Uploaded by: ${file.username}</small>
                            <small>On: ${file.timestamp}</small>
                        </div>
                    </li>
                `).join('')}
            </ul>
        `;
        folderList.appendChild(folderDiv);
    }
});
