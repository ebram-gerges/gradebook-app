from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register("groups", views.GroupsViewSet, basename="groups")
router.register("students", views.StudentViewSet, basename="students")
router.register("sessions", views.SessionViewSet, basename="sessions")
router.register("gradebook", views.GradeBookViewSet, basename="gradebook")
router.register(
    "homework-materials", views.HomeworkImageViewSet, basename="homework-materials"
)
urlpatterns = [path("", include(router.urls))]
