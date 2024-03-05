// script.js
document.getElementById('vote1').addEventListener('click', function() {
    vote('Participant 1');
});

document.getElementById('vote2').addEventListener('click', function() {
    vote('Participant 2');
});

function vote(participant) {
    fetch('http://localhost:5000/vote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            participant: participant
        })
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('participant', data.participant);
        // Redirect to the confirmation page
        window.location.href = data.redirect;
    });
}