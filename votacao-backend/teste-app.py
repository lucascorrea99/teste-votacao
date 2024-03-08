import unittest
import app
import json

class FlaskTest(unittest.TestCase):

    def setUp(self):
        self.app = app.app.test_client()
        self.app.testing = True 

    def test_vote(self):
        response = self.app.post('/vote', data=json.dumps(dict(participant='Participant 1')), content_type='application/json')
        data = json.loads(response.get_data())
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['participant'], 'Participant 1')

    def test_invalid_vote(self):
        response = self.app.post('/vote', data=json.dumps(dict(participant='Invalid')), content_type='application/json')
        data = json.loads(response.get_data())
        self.assertEqual(response.status_code, 400)
        self.assertEqual(data['message'], 'Invalid participant')

if __name__ == "__main__":
    unittest.main()