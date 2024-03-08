from flask import Flask, request, jsonify
from flask_cors import CORS
from opentelemetry.instrumentation.flask import FlaskInstrumentor
from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk.resources import Resource
import requests, os

app = Flask(__name__)
CORS(app)

trace.set_tracer_provider(TracerProvider(resource=Resource.create({"service.name": "votacao-backend"})))

otlp_exporter = OTLPSpanExporter(
    endpoint="10.0.2.15:31734",
    insecure=True,
)

trace.get_tracer_provider().add_span_processor(
    BatchSpanProcessor(otlp_exporter)
)

FlaskInstrumentor().instrument_app(app)

votes = {
    'Participant 1': 0,
    'Participant 2': 0,
}

# Rota para votação. Recebe um POST com o participante e incrementa o voto.
@app.route('/vote', methods=['POST'])
def vote():
    data = request.get_json()
    if not data:
        return jsonify({'message': 'Bad Request'}), 400

    participant = data.get('participant')

    if participant in votes:
        votes[participant] += 1
        return jsonify({'participant': participant, 'redirect': 'http://dev.votacao.example/confirmation.html'})
    else:
        return jsonify({'message': 'Invalid participant'}), 400

# Rota para validar o captcha. Recebe um POST com a resposta do captcha e valida.
@app.route('/validateCaptcha', methods=['POST'])
def validate_captcha():
    data = request.get_json()
    if not data:
        return jsonify({'message': 'Bad Request'}), 400

    captcha_response = data.get('captcha')

    if not is_valid_captcha(captcha_response):
        return jsonify({'message': 'Invalid reCAPTCHA'}), 400
    else:
        return jsonify({'message': 'Valid reCAPTCHA'}), 200

# Rota para obter a porcentagem de votos. Retorna um GET com a porcentagem de votos para cada participante.
@app.route('/votePercentages', methods=['GET'])
def vote_percentages():
    total_votes = sum(votes.values())
    return jsonify({participant: (vote_count / total_votes) * 100 for participant, vote_count in votes.items()})

# Rota para obter a contagem de votos. Retorna um GET com a contagem de votos para cada participante.
@app.route('/admin/votes', methods=['GET'])
def admin_votes():
    return jsonify(votes)

def is_valid_captcha(captcha_response):
    secret_key = os.getenv('RECAPTCHA_SECRET_KEY')
    if not secret_key:
        return False

    data = {
        'secret': secret_key,
        'response': captcha_response
    }
    try:
        response = requests.post('https://www.google.com/recaptcha/api/siteverify', data=data)
    except requests.exceptions.RequestException:
        return False

    return response.json().get('success', False)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)