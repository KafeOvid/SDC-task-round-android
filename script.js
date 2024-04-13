document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('spendingForm').addEventListener('submit', function(event) {
        event.preventDefault();
        let titleInput = document.getElementById('title');
        let timeInput = document.getElementById('time');

        if (titleInput && timeInput) {
            let title = titleInput.value;
            let time = parseInt(timeInput.value); 
            if (title && !isNaN(time) && time > 0) {
                addList(title, time);
                titleInput.value = '';
                timeInput.value = '';
            } else {
                alert('Please enter a valid title and time (positive integer)');
            }
        } else {
            alert('Form elements not found');
        }
    });

    listItem();
    spendingChart(); 
});

function addList(title, time) {
    let timestamp = new Date().toISOString();
    let entry = { title, time, timestamp };
    let data = JSON.parse(localStorage.getItem('getdata')) || [];
    data.push(entry);
    localStorage.setItem('getdata', JSON.stringify(data));
    listItem(); 
    spendingChart(); 
}

function listItem() {
    let data = JSON.parse(localStorage.getItem('getdata')) || [];
    let listElement = document.getElementById('list');
    listElement.innerHTML = '';

    data.forEach(element => {
        let createItem = document.createElement('li');
        let formattedDate = new Date(element.timestamp).toLocaleString();
        createItem.textContent = `${element.title} : ${element.time} minutes : ${formattedDate}`;
        listElement.appendChild(createItem);
    });
}

function spendingChart() {
    let entries = JSON.parse(localStorage.getItem('getdata')) || [];

    // Extract labels (titles) and data (times) from entries
    const labels = entries.map(entry => entry.title);
    const times = entries.map(entry => entry.time);

    // Get the canvas element where the chart will be rendered
    let ctx = document.getElementById('mycanvas').getContext('2d');

    // Initialize a new Chart.js instance
    new Chart(ctx, {
        type: 'bar', 
        data: {
            labels: labels,
            datasets: [{
                label: 'Time Spent (minutes)',
                data: times,
                backgroundColor: 'rgba(182, 181, 181, 0.2)', // Background color of bars
                borderColor: 'rgba(75, 192, 85, 1)', // Border color of bars
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true // Start y-axis from zero
                }
            }
        }
    });
}
