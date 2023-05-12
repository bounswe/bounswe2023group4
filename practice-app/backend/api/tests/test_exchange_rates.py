from django.test import TestCase,Client
from django.urls import reverse,resolve
from api.views.exchange_rate_views import ClearExchangeRates,GetExchangeRate

from api.models.exchange_rate_model import ExchangeRate

class TestUrls(TestCase):

    def setUp(self):

        self.client = Client()
        
        ExchangeRate.objects.create(
            from_currency = "USD",
            to_currency = "TRY",
            date = "2023-05-11",
            amount = 1,
            rate = 20
        )

        self.exchange_rates = ExchangeRate.objects.all()




    def test_get_all_exchange_rates(self):
        # Testing for the successful case with a valid paper list id and valid credentials
        url = '/api/exchange_rates/'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        assert(response.json()[0]['from_currency']=="USD")
        assert(len(response.json())==1)

    def test_get_exchange_rate_with_param(self):
        # Test for getting a exchange rate from the API with a parameter
        url = '/api/exchange_rates/?date=2023-05-11'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        assert(response.json()[0]["date"]=="2023-05-11")
        assert(len(response.json())==1)            

    def test_exchange_rate_view_url_is_resolved3(self):
        # Collect view that collects data from 3rd party APIs
        url = '/api/exchange_rate_collect/'
        response = self.client.get(url)

        assert(len(ExchangeRate.objects.all())>2)

    def test_exchange_rate_view_url_is_resolved2(self):
        # Clearall view that clears all data from exchange_rates table
        url = '/api/exchange_rate_clear/'
        response = self.client.delete(url)

        assert(len(ExchangeRate.objects.all())==0)