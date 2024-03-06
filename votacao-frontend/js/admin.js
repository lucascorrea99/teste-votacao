function updateVotes() {
    fetch('http://localhost:30000/admin/votes')
        .then(response => response.json())
        .then(data => {
            const participantsDiv = document.getElementById('participants');
            participantsDiv.innerHTML = '';  // Limpa os participantes existentes
            for (const participant in data) {
                // Cria um novo elemento div para o participante
                const participantDiv = document.createElement('div');
                participantDiv.className = 'participant';  // Adiciona a classe 'participant' ao div

                // Cria e configura o elemento img para a foto do participante
                const img = document.createElement('img');
                const participantName = participant.toLowerCase().replace(' ', '');
                img.src = `images/${participantName}.jpg`;  // Substitua isso pelo caminho para a foto do participante
                img.alt = participant;
                participantDiv.appendChild(img);

                // Cria e configura o elemento p para os votos do participante
                const p = document.createElement('p');
                p.textContent = `Votes: ${data[participant]}`;
                participantDiv.appendChild(p);

                // Adiciona o div do participante ao div dos participantes
                participantsDiv.appendChild(participantDiv);
            }
        });
}

// Atualiza os votos imediatamente e depois a cada 5 segundos
updateVotes();
setInterval(updateVotes, 5000);