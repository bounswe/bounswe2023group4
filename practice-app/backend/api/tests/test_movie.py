from django.test import TestCase,Client
from django.urls import reverse,resolve
from api.views.movie_views  import searchMovie


from api.models.movie_model import Movie

class TestUrls(TestCase):

    def setUp(self):

        #Setting up a test user object and a test paper list object

        self.client = Client()


    def test_get_film_with_param(self):
        # Test for getting a country from the API with a parameter
        url = '/api/movie_fetch//?name=Turkey'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        assert(response.json()[0]['name']=="Turkey")
        assert(len(response.json())==1)
