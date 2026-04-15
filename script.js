function addResto() {
    const name = document.getElementById('restoName').value;
    const location = document.getElementById('restoLocation').value;

    if (name === '') {
        alert("Isi nama restorannya dulu dong!");
        return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
        <div>
            <strong>${name}</strong> — ${location}
        </div>
        <button class="delete-btn" onclick="this.parentElement.remove()">Hapus</button>
    `;

    document.getElementById('wishlist').appendChild(li);

    // Reset input
    document.getElementById('restoName').value = '';
    document.getElementById('restoLocation').value = '';
}
