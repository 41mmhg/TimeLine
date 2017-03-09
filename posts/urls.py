from django.conf.urls import url

from posts import views

urlpatterns = [
    url(r'^$', views.postList, name='index'),
    url(r'^post/$', views.postCreate, name='post'),
    url(r'^post/(?P<postId>[0-9]{14}[0-9A-f]{8})/$', views.postView, name='post-deatils'), 
    url(r'^delete/(?P<postId>[0-9]{14}[0-9A-f]{8})/$', views.postDelete, name='delete'), 
]