import http from 'k6/http';
import { check } from 'k6';

export let options = {
    vus: 2000,  // number of virtual users
    duration: '5s',  // test duration
};

export default function() {
    let participant = Math.random() < 0.5 ? 'Participant 1' : 'Participant 2';
    let voteResponse = http.post('http://dev.votacao.example/vote', JSON.stringify({ participant: participant }), { headers: { 'Content-Type': 'application/json' } });
    check(voteResponse, {
        'vote status was 200': (r) => r.status === 200,
    });
}