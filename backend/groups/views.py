from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response

from .models import *
from .serializers import (
    GradeBookSerializer,
    GroupSerializer,
    HomeworkSerializer,
    SessionSerializer,
    StudentSerializer,
)

# Create your views here.


class GroupsViewSet(viewsets.ModelViewSet):
    serializer_class = GroupSerializer

    @action(detail=True, methods=["POST"])
    def markComplete(self, request, pk=None):
        group = self.get_object()
        group.group_is_completed = True
        group.save()
        return Response({"status": "done"})

    def get_queryset(self):
        active_groups = Groups.objects.filter(group_is_active=True)
        return active_groups


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer


class GradeBookViewSet(viewsets.ModelViewSet):
    queryset = GradeBook.objects.all()
    serializer_class = GradeBookSerializer


class HomeworkImageViewSet(viewsets.ModelViewSet):
    queryset = HomeworkImages.objects.all()
    serializer_class = HomeworkSerializer
    parser_classes = (MultiPartParser, FormParser)
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["session"]
