function updateVotes() {
    fetch('http://dev.votacao.example/admin/votes')
        .then(response => response.json())
        .then(data => {
            const participantsDiv = document.getElementById('participants');
            participantsDiv.innerHTML = '';  // Limpa os participantes existentes

            let totalVotes = 0;

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

                totalVotes += data[participant];
            }

            // Atualiza o total de votos e os votos por hora
            document.getElementById('total-votes').textContent = totalVotes;
            document.getElementById('votes-per-hour').textContent = totalVotes / 24; // assumindo que os dados representam um dia inteiro
        });
}

// Atualiza os votos imediatamente e depois a cada 5 segundos
updateVotes();
setInterval(updateVotes, 5000);