from django.test import TestCase,Client
from django.urls import reverse,resolve
from api.views.weather_views import CLEARWeather,GETWeather


from api.models.weather_model import Weather


class TestUrls(TestCase):

    def setUp(self):

        #Setting up a test user object and a test paper list object

        self.client = Client()

        Weather.objects.create(
            id = 1,
            country = "TR",
            name = "Istanbul",
            description = "parçalı bulutlu",
            main = "Clouds",
            temp = 286.55, 
            windspeed = 69.2
        )

        self.weather = Weather.objects.all()

    def test_get_all_weathers(self):
        
        url = '/api/weathers/'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        assert(response.json()[0]['name']=="Istanbul")
        assert(len(response.json())==1)

    def test_get_weather_with_param(self):
        
        url = '/api/weathers/?name=Istanbul'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        assert(response.json()[0]['name']=="Istanbul")
        assert(len(response.json())==1)

    def test_post_weather_with_param(self):
        
        url = '/api/weathers/'
        _data = {
            'country' : "TR",
            'name' : "Ankara",
            'description' : "parçalı bulutlu",
            'main' : "Clouds",
            'temp' : 250.55, 
            'windspeed' : 6.2
        }
        response = self.client.post(url,data=_data)

        assert(response.json()['name']=="Ankara")
        assert(len(Weather.objects.all())==2)


    def test_weather_view_url_is_resolved3(self):
        # Collect view that collects data from 3rd party APIs
        url = '/api/weather_collect/'
        response = self.client.get(url)

        assert(len(Weather.objects.all())>=2)

    def test_weather_view_url_is_resolved2(self):
        # Clearall view that clears all data from weathers table
        url = '/api/weather_clearall/'
        response = self.client.delete(url)

        assert(len(Weather.objects.all())==0)