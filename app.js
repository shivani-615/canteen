// Connect to our backend using Socket.IO
const socket = io('http://localhost:3000');

// Listen for real-time queue updates
socket.on('queueUpdate', (data) => {
    document.getElementById('queueStatus').innerText = `Current queue length: ${data.queueLength}`;
});

// When the form is submitted, send the data to the backend
document.getElementById('joinQueueForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const rollNumber = document.getElementById('rollNumber').value;

    // Create an object with the user data
    const data = { name, rollNumber };

    // Send data to the backend using fetch
    fetch('http://localhost:3000/join-queue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            // Optionally, you can log or display the server's confirmation message
            console.log(result.message);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('queueStatus').innerText = 'Error joining the queue. Please try again.';
        });

    // Clear the form after submission
    this.reset();
});