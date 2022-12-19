from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from api.views import TaskViewSet, ManageUserView, UserViewSet


routers = routers.DefaultRouter
routers.register('tasks', TaskViewSet)
routers.register('users', UserViewSet)


urlpatterns = [
    path("myself/", ManageUserView.as_view(), name='myself'),
    path("", include(routers.urls)),
]