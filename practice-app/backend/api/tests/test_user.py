from django.test import TestCase,Client
from django.urls import reverse,resolve
from api.views.user_views import ClearUsers, GetData

from api.models.user_model import User

class TestUrls(TestCase):

    def setUp(self):

        self.client = Client()
        
        User.objects.create(
            user_id = 2,
            email = "george.bluth@reqres.in",
            first_name = "George",
            last_name = "Bluth",
            avatar = "https://reqres.in/img/faces/1-image.jpg"
        )

        self.users = User.objects.all()

    def test_get_all_users(self):
        # Testing for the successful case with a valid paper list id and valid credentials
        url = '/api/users/'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)

        assert(response.json()[0]['user_id']==2)
        assert(len(response.json())==1)

    def test_get_user_with_param(self):
        # Test for getting a user from the API with a parameter
        url = '/api/users/?user_id=2'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        assert(response.json()[0]["user_id"]==2)
        assert(len(response.json())==1)         

    def test_post_user_with_param(self):
        # Test for adding a country to the API with post method
        url = '/api/users/'
        _data = {
            'user_id': 0,
            'email': "george.bluth@reqres.in",
            'first_name': "George",
            'last_name': "Bluth",
            'avatar': "https://reqres.in/img/faces/1-image.jpg"
        }
        response = self.client.post(url,data=_data)

        assert(response.json()['last_name']=="Bluth")
        assert(len(User.objects.all())==2)   

    def test_user_view_url_is_resolved3(self):
        # Collect view that collects data from 3rd party APIs
        url = '/api/user-1_collect/'
        response = self.client.get(url)

        assert(len(User.objects.all())>1)

    def test_user_view_url_is_resolved2(self):
        # Clearall view that clears all data from exchange_rates table
        url = '/api/user-1_clearall/'
        response = self.client.delete(url)

        assert(len(User.objects.all())==0)