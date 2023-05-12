from django.test import TestCase,Client
from django.urls import reverse,resolve
from api.models.movie_model import Movie

class TestUrls(TestCase):

    def setUp(self):

        #Setting up a test user object and a test paper list object

        self.client = Client()
        
        Movie.objects.create(
            id = 1,
            Title = "Northman",
            Year = "2022",
            imdbID = "NT20232",
            Type = "Movie"
        )

        Movie.objects.create(
            id = 2,
            Title = "Joker",
            Year = "2022",
            imdbID = "JK213213",
            Type = "Movie"
        )

        self.countries = Movie.objects.all()

    def test_get_all_movies(self):
        # Testing for the successful case with a valid paper list id and valid credentials
        url = '/api/movie/'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        assert(response.json()[0]['imdbID']=="NT20232")
        assert(len(response.json())==2)

    def test_get_movie_with_param(self):
        # Test for getting a movie from the API with a parameter
        url = '/api/movie/?Title=Joker'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        assert(response.json()[0]['Title']=="Joker")
        assert(len(response.json())==1)

    def test_post_movie_with_param(self):
        # Test for adding a movie t o t he API with post method
        url = '/api/movie/'
        _data = {
            "Title"  :"Maginot",
            "Year"   :"1945",
            "imdbID" : "Mg1231421",
            "Type"   : "Movie"
        }
        response = self.client.post(url,data=_data)

        assert(response.json()['Title']=="Maginot")
        assert(len(Movie.objects.all())==3)


        
            
