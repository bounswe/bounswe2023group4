from django.test import TestCase,Client
from django.urls import reverse,resolve
from api.views.location_views import CLEARLocation,GETLocation


from api.models.location_model import IPInfo

class TestUrls(TestCase):

    def setUp(self):

        #Setting up a test user object and a test paper list object

        self.client = Client()
        
        IPInfo.objects.create(
            country_code = "US",
            country_name = "United States"
        )

        IPInfo.objects.create(
            country_code = "TR",
            country_name = "Turkey"
        )

        self.locations = IPInfo.objects.all()

    def test_get_all_locations(self):
        # Testing for the successful case with a valid paper list id and valid credentials
        url = '/api/ipinfo/'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        assert(response.json()[0]['country_code']=="US")
        assert(len(response.json())==2)

    def test_get_country_with_param(self):
        # Test for getting a country from the API with a parameter
        url = '/api/ipinfo/?country_name=United States'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        assert(response.json()[0]['country_name']=="United States")
        assert(len(response.json())==1)

    def test_post_country_with_param(self):
        url = '/api/ipinfo/'
        _data = {
            "country_code":"TR",
            "country_name":"Turkey"
        }
        response = self.client.post(url,data=_data)

        assert(response.json()['country_code']=="TR")
        assert(len(IPInfo.objects.all())==3)
            

    def test_country_view_url_is_resolved3(self):
        # Collect view that collects data from 3rd party APIs
        url = '/api/location_collect/'
        response = self.client.get(url)

        assert(len(IPInfo.objects.all())>3)

    def test_country_view_url_is_resolved2(self):
        # Clearall view that clears all data from countries table
        url = '/api/location_clearall/'
        response = self.client.delete(url)

        assert(len(IPInfo.objects.all())==0)

    