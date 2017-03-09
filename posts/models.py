from django.db import models
from django.utils import dateparse, timezone
import datetime
import uuid


# Create your models here.
class Post(models.Model):
    createdTime = models.DateTimeField(default=timezone.now)
    postId = models.CharField(max_length=22)
    text = models.CharField(default="", max_length=140)

    # Write a constructor to use with post
    def __str__(self):
        return self.postId + " " + str(self.createdTime)
