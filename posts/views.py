from django.http import HttpResponse
from django.shortcuts import render
from .models import Post
import datetime
import uuid


# Create your views here.
def postCreate(request):
    if request.method == "POST":
        text = request.POST.get("text")
        post = Post(
            text=text,
            postId=datetime.datetime.now().strftime("%Y%m%d%H%M%S") +
            str(uuid.uuid4())[0:8])
        post.save()

        # return requested post from POST from post list using identifier
        return render(request, "posts/new.html", {'post': post})


def postDelete(request, postId):
    if request.method == "DELETE":
        try:
            post = Post.objects.get(postId=postId)
            post.delete()
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=500)


def postView(request, postId):
    post = Post.objects.get(postId=postId)
    # return requested post from POST from post list using identifier
    return render(request, "posts/post.html", {"post": post})


def postList(request):
    # for post in XX
    # add to post_list
    postList = Post.objects.order_by("-createdTime")
    return render(request, "posts/postList.html", {"postList": postList})
