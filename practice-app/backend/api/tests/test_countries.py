from django.test import TestCase,Client
from django.urls import reverse,resolve
from api.views.country_views import ClearCountries,CollectData


from api.models.country_model import Country

class TestUrls(TestCase):

    def setUp(self):

        #Setting up a test user object and a test paper list object

        self.client = Client()
        
        Country.objects.create(
            id = 1,
            name = "Turkey",
            capital = "Ankara",
            gdp = "800000",
            population = "80000000"
        )

        Country.objects.create(
            id = 2,
            name = "Germany",
            capital = "Berlin",
            gdp = "4200000",
            population = "80000000"
        )

        self.countries = Country.objects.all()

    def test_get_all_countries(self):
        # Testing for the successful case with a valid paper list id and valid credentials
        url = '/api/countries/'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        assert(response.json()[0]['name']=="Turkey")
        assert(len(response.json())==2)

    def test_get_country_with_param(self):
        # Test for getting a country from the API with a parameter
        url = '/api/countries/?name=Turkey'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        assert(response.json()[0]['name']=="Turkey")
        assert(len(response.json())==1)

    def test_post_country_with_param(self):
        # Test for adding a country to the API with post method
        url = '/api/countries/'
        _data = {
            "name":"France",
            "capital":"Paris",
            "population": 67000000,
            "gdp": 3000000
        }
        response = self.client.post(url,data=_data)

        assert(response.json()['name']=="France")
        assert(len(Country.objects.all())==3)
            

    def test_country_view_url_is_resolved3(self):
        # Collect view that collects data from 3rd party APIs
        url = '/api/countries_collect/'
        response = self.client.get(url)

        assert(len(Country.objects.all())>3)

    def test_country_view_url_is_resolved2(self):
        # Clearall view that clears all data from countries table
        url = '/api/countries_clearall/'
        response = self.client.delete(url)

        assert(len(Country.objects.all())==0)

    