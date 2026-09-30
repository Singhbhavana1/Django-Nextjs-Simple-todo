from django.urls import  path
from .views import todo_list, todo_detail

urlpatterns = [
    path('todo/', todo_list),
    path('todo/<int:id>/', todo_detail)
]