from django.test import TestCase,Client
from django.urls import reverse,resolve
from api.models.poll_model import Poll

class TestUrls(TestCase):

    def setUp(self):

        #Setting up a test user object and a test paper list object

        self.client = Client()
        Poll.objects.create (
            id = 1,
            question = 'Are your happy today?',
            firstOption = 'yes',
            secondOption = 'no',
            thirdOption = 'ambivalent',
            fourthOption = 'No Answer'
        )
        Poll.objects.create(
            id = 2,
            question = 'Who would win the 2023 presidential elections?',
            firstOption = 'KK',
            secondOption = 'RTE',
            thirdOption = 'SO'
        )

        self.polls = Poll.objects.all()

    def test_get_all_polls(self):
        # Testing for the successful case with a valid paper list id and valid credentials
        url = '/api/polls/'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        assert(response.json()[0]['question']=='Are your happy today?')
        assert(len(response.json())==2)

    def test_get_poll_with_param(self):
        # Test for getting a poll from the API with a parameter
        url = '/api/polls/?firstOption=KK'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        assert(response.json()[0]['question'] == 'Who would win the 2023 presidential elections?')
        assert(len(response.json())==1)

    def test_post_country_with_param(self):
        # Test for adding a poll to the API with post method
        url = '/api/polls/'
        _data = {
            'question'    :'What is the economic cost incurred due to the earthquake?',
            'firstOption' :'50 billion',
            'secondOption':'70 billion',
            'thirdOption' :'100 billion',
            'fourthOption':'Other'
        }
        response = self.client.post(url,data=_data)

        assert(response.json()['question']=='What is the economic cost incurred due to the earthquake?')
        assert(len(Poll.objects.all())==3)