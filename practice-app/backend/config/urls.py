from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView # Added this line

urlpatterns = [
    path('', RedirectView.as_view(url='api/', permanent=False)), # Added this line

    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
