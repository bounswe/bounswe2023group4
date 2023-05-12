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

        self.polls = Poll.objects.all()

    def test_get_all_polls(self):
        # Testing for the successful case with a valid paper list id and valid credentials
        url = '/api/polls/'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        assert(response.json()[0]['question']=='Are your happy today?')
        assert(len(response.json())==1)

    def test_get_poll_with_param(self):
        # Test for getting a poll from the API with a parameter
        url = '/api/polls/?firstOption=yes'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        assert(response.json()[0]['question'] == 'Are your happy today?')
        assert(len(response.json())==1)

    def test_post_poll_with_param(self):
        # Test for adding a poll to the API with post method
        ##url = '/api/createpolls/#/?question=a&firstOption=10&secondOption=20&thirdOption=30&fourthOption=Other'
        url = 'polls_createPoll/'
        headers = {'content-type' : 'application/json'}
        _data = {
            'question'    :'A',
            'firstOption' :'AA',
            'secondOption':'AA',
            'thirdOption' :'Aaa',
            'fourthOption':'Aa'
        }
        response = self.client.post(url,data=_data,header = headers)
        print(Poll.objects.all)
        assert(len(Poll.objects.all())==2)
    
    def test_poll_collect_data_from_api(self):
        # Collect view that collects data from 3rd party APIs
        url = '/api/polls_collectPoll/'
        response = self.client.get(url)
        assert(len(Poll.objects.all())==2)

    def test_poll_clear_poll_table_db(self):
        # Clearall view that clears all data from countries table
        url = '/api/polls_clearPoll/'
        response = self.client.delete(url)

        assert(len(Poll.objects.all())==0)