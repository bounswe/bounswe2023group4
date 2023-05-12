from django.test import TestCase,Client
from django.urls import reverse,resolve
from api.views.sport_views import CollectData


from api.models.sport_model import League_Season,Standing

class TestUrls(TestCase):

    def setUp(self):

        #Setting up a test user object and a test paper list object

        self.client = Client()
        
        golden_cup = League_Season.objects.create(
            id = 1,
            name = "Golden_Cup",
            country = "France",
            season = 2022,
        )

        Standing.objects.create(
            id = 1,
            league_id = golden_cup,
            rank = 1,
            team = "Blue Eagles",
            points = 5
        )

        Standing.objects.create(
            id = 2,
            league_id = golden_cup,
            rank = 2,
            team = "Red Lions",
            points = 4
        )

        self.league_seasons = League_Season.objects.all()
        self.standings = Standing.objects.all()

    def test_get_all_league_season(self):
        # Testing for the successful case with a valid paper list id and valid credentials
        url = '/api/league_seasons/'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        assert(response.json()[0]['name']=="Golden_Cup")
        assert(len(response.json())==1)

    def test_get_league_season_with_param(self):
        # Test for getting a league_season from the API with a parameter
        url = '/api/league_seasons/?name=Golden_Cup'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        assert(response.json()[0]['name']=="Golden_Cup")
        assert(len(response.json())==1)

    def test_post_league_season_with_param(self):
        # Test for adding a league_season to the API with post method
        url = '/api/league_seasons/'
        _data = {
            "id" : 1,
            "name" : "Best_Cup",
            "country" : "England",
            "season" : 2022,
        }
        response = self.client.post(url,data=_data)

        assert(response.json()['name']=="Best_Cup")
        assert(len(League_Season.objects.all())==2)
            

    def test_league_season_collect_data_from_api(self):
        # Collect view that collects data from 3rd party APIs
        url = '/api/league_seasons_collect/'
        response = self.client.get(url)

        assert(len(League_Season.objects.all())>2)

    def test_league_season_clear_league_season_table_db(self):
        # Clearall view that clears all data from countries table
        url = '/api/league_seasons_clearall/'
        response = self.client.delete(url)

        assert(len(League_Season.objects.all())==0)

    