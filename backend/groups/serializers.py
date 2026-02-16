from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import GradeBook, Groups, HomeworkImages, Session, Student

# ==============================================================================
#                             1. student serializers
# ==============================================================================


class StudentSerializer(ModelSerializer):
    # Expose the student's group name directly
    group_name = serializers.ReadOnlyField(source="group.group_name")

    class Meta:
        model = Student
        fields = "__all__"


# ==============================================================================
#                             2. homework serilizers
# ==============================================================================


class HomeworkSerializer(ModelSerializer):
    class Meta:
        model = HomeworkImages
        fields = "__all__"


# ==============================================================================
#                             3. session serializers
# ==============================================================================


class SessionSerializer(ModelSerializer):
    homeworkImages = HomeworkSerializer(many=True, read_only=True)
    group_name = serializers.CharField(source="group.group_name", read_only=True)

    class Meta:
        model = Session
        fields = "__all__"


# ==============================================================================
#                             4. group serializers
# ==============================================================================


class GroupSerializer(ModelSerializer):
    students = StudentSerializer(many=True, read_only=True)
    sessions = SessionSerializer(many=True, read_only=True)

    class Meta:
        model = Groups
        fields = "__all__"


# ==============================================================================
#                             5. gradeBook serializers
# ==============================================================================


class GradeBookSerializer(ModelSerializer):
    student_name = serializers.ReadOnlyField(source="student.full_name")
    session_title = serializers.ReadOnlyField(source="session.title")
    session_number = serializers.ReadOnlyField(source="session.session_number")
    group_name = serializers.ReadOnlyField(source="student.group.group_name")

    class Meta:
        model = GradeBook
        fields = "__all__"
