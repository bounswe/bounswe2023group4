from django.test import TestCase,Client
from django.urls import reverse,resolve
from api.models.sport_suggestion_model import SportSuggestion

class SportSuggestionsTest(TestCase):

    def setUp(self):

        #Setting up a test user object and a test paper list object

        self.client = Client()
        
        SportSuggestion.objects.create(
            id = 1,
            suggestion = "You can play football"
        )

        SportSuggestion.objects.create(
            id = 2,
            suggestion = "Please include NHL in your sports list"
        )

        self.sportSuggestions = SportSuggestion.objects.all()

    def test_get_all_suggestions(self):
        url = '/api/sport_suggestions/'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        assert(response.json()[0]['suggestion']=="You can play football")
        assert(response.json()[1]['suggestion']=="Please include NHL in your sports list")
        assert(len(response.json())==2)

    def test_post_country_with_param(self):
        url = '/api/sport_suggestions/'
        _data = {
            "id": 3,
            "suggestion":"New suggestion"
        }
        response = self.client.post(url,data=_data)

        assert(response.json()['suggestion']=="New suggestion")
        assert(len(SportSuggestion.objects.all())==3)
    