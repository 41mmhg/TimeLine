// Code from Django documentaion for csrf
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});


// Code for sending and deleting posts
$(document).ready(function(e) {
    // Submitting a post
    $(".form").on("submit", function(e) {
        $.ajax({
            url: "/post/",
            type: "POST",
            data: $("textarea").serialize(),
            success: function(result) {
                // If no previous posts, insert between designated div
                if ($(".post:first-child")[0] != null)
                    $(result).hide().insertBefore($(".post:first-child")).slideDown(300);
                else
                    $(result).hide().appendTo($("#post-list")).slideDown(300);

                // Reset text field, remove class used for intro animation
                $("textarea").val("");
                $(".post:first-child").removeClass("new-post");
            }
        });
        e.preventDefault();
    });

    // Deleting a post
    $("#post-list").on("click", ".button-delete", function() {
        // Get post id from container div, if in Safari, use alternate method
        var postId = $(":focus").parent().parent().attr("id");
        if (postId === undefined)
            var postId = $(":hover").closest(".post").attr("id");

        $.ajax({
            url: "/delete/" + postId,
            type: "DELETE",
            success: function(result) {
                // Fadeout animation
                var fade = { opacity: 0, transition: "opacity 300ms ease-out" };
                $("div#" + postId).css(fade).slideUp(500, function() { this.remove });
            }
        });
    });
});