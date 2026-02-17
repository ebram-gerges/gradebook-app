from django.db import models


# ==============================================================================
#                            1. groups
# ==============================================================================
class Groups(models.Model):
    DAYS_CHOICES = (
        (0, "Sunday"),
        (1, "Monday"),
        (2, "Tuesday"),
        (3, "Wednesday"),
        (4, "Thursday"),
        (5, "Friday"),
        (6, "Saturday"),
    )

    group_name = models.CharField(max_length=30, null=False)
    group_day = models.IntegerField(
        choices=DAYS_CHOICES,
    )
    group_time = models.TimeField()
    group_start_date = models.DateField()
    group_session_count = models.IntegerField()
    group_is_active = models.BooleanField(default=True)
    group_is_completed = models.BooleanField(default=False)

    def __str__(self):
        groupDay = self.get_group_day_display()
        status = "active" if self.group_is_active == True else "not active"
        completion = "done" if self.group_is_completed == True else "not done yet"
        return f"{self.group_name}: {groupDay} | {status} | {completion}"


# ==============================================================================
#                             2. student
# ==============================================================================


class Student(models.Model):
    group = models.ForeignKey(Groups, on_delete=models.CASCADE, related_name="students")
    age = models.IntegerField()
    full_name = models.CharField(max_length=30)
    total_grade = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.full_name}: {self.group.group_name} | total grade: {self.total_grade}"


# ==============================================================================
#                             3. session
# ==============================================================================


class Session(models.Model):
    STATUS_CHOICES = (
        ("delayed", "Delayed"),
        ("done", "Done"),
        ("scheduled", "Scheduled"),
        ("canceled", "Canceled"),
        ("active", "Active"),
    )
    group = models.ForeignKey(Groups, on_delete=models.CASCADE, related_name="sessions")
    students = models.ManyToManyField(Student, through="StudentSessionScore")
    session_number = models.IntegerField()
    session_date = models.DateField()
    session_time = models.TimeField()
    status = models.CharField(
        max_length=30, choices=STATUS_CHOICES, default="scheduled"
    )
    title = models.CharField(max_length=100)
    homework_info = models.TextField(blank=True)
    is_reviewed = models.BooleanField(default=False)

    class Meta:
        unique_together = ("group", "session_number")
        ordering = ["session_number"]

    def __str__(self):
        return f"{self.title}: {self.group.group_name} | {self.session_date} | {self.session_number}"


# ==============================================================================
#                             4. homework images
# ==============================================================================


class HomeworkImages(models.Model):
    session = models.ForeignKey(
        Session, on_delete=models.CASCADE, related_name="homeworkImages"
    )
    image = models.ImageField(upload_to="my_homeworks")
    title = models.CharField(max_length=30)
    comment = models.TextField()
    extra_task = models.TextField(blank=True)

    def __str__(self):
        extra = f"\n\textra tasks: {self.extra_task}" if self.extra_task else ""
        return f"{self.title}:\n \tcomment: {self.comment}{extra}"


# ==============================================================================
#                             5. gradeBook
# ==============================================================================


class GradeBook(models.Model):
    student = models.ForeignKey(
        Student, on_delete=models.CASCADE, related_name="grades"
    )
    session = models.ForeignKey(
        Session, on_delete=models.CASCADE, related_name="grades"
    )

    attended = models.BooleanField(default=False)
    is_late = models.BooleanField(default=False)
    lost_connection = models.BooleanField(default=False)
    score = models.IntegerField(default=0)
    homework_done = models.BooleanField(default=False)
    improvment_note = models.CharField(max_length=50, blank=True)
    feedback = models.TextField(blank=True)

    class Meta:
        unique_together = ("session", "student")
        ordering = ["session__session_number"]

    def __str__(self):
        return f"{self.student.full_name} - {self.session.title}: {self.score}"


# ==============================================================================
#                             6. studentSessionScore
# ==============================================================================
class StudentSessionScore(models.Model):
    student = models.ForeignKey(
        Student, on_delete=models.CASCADE, related_name="student_score"
    )
    session = models.ForeignKey(
        Session, on_delete=models.CASCADE, related_name="session_score"
    )
    score = models.IntegerField(default=0)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("student", "session")
