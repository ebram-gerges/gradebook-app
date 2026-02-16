from django.contrib import admin

from .models import Groups, HomeworkImages, Session, Student

admin.site.register(Groups)
admin.site.register(Student)
admin.site.register(Session)
admin.site.register(HomeworkImages)
