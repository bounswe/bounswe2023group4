from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

urlpatterns = [
    path('', RedirectView.as_view(url='api/', permanent=False)),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
