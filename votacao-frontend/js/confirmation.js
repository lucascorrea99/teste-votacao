// confirmation.js
const urlParams = new URLSearchParams(window.location.search);
const participant = urlParams.get('participant');

document.getElementById('participant').src = participant + '.jpg';
document.getElementById('participantImage').alt = participant;

fetch('http://localhost:5000/votePercentages')
    .then(response => response.json())
    .then(data => {
        document.getElementById('confirmationMessage').textContent = 'Você votou em ' + participant + '! Ele agora tem ' + data[participant].toFixed(2) + '% dos votos.';
    });

// Add this code
document.getElementById('vote-again').addEventListener('click', function() {
    window.location.href = 'index.html'; // Changed this line
});