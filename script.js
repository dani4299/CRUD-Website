document.addEventListener('DOMContentLoaded', function() {
    const dataForm = document.getElementById('data-form');
    const dataTableBody = document.querySelector('#data-table tbody');


    const data = JSON.parse(localStorage.getItem('data')) || [];

    function updateTable() {

        dataTableBody.innerHTML = '';


        data.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>
                    <button data-index="${index}" class="delete-btn">Delete</button>
                </td>
            `;

            dataTableBody.appendChild(row);
        });
    }

    updateTable();

    dataForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

     
        if (name.trim() === '' || email.trim() === '') {
            alert('Please fill out all fields.');
            return;
        }

 
        data.push({ name, email });

  
        localStorage.setItem('data', JSON.stringify(data));


        dataForm.reset();

    
        updateTable();
    });

 
    dataTableBody.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.getAttribute('data-index');
            data.splice(index, 1);

        
            localStorage.setItem('data', JSON.stringify(data));

        
            updateTable();
        }
    });
});
