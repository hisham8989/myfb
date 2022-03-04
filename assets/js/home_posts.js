{
  // method to submit the form data for new post using AJAX
  let createPost = function () {
    let newPostForm = $('#new-post-form')
    newPostForm.submit(function (e) {
      e.preventDefault()

      $.ajax({
        type: 'post',
        url: '/posts/create',
        data: newPostForm.serialize(),
        success: function (data) {
          let newPost = new newPostDom(data.data.post)
          $('#posts-list-container>ul').prepend(newPost)
          deletePost($(' .delete-post-btn', newPost))
          createComment(data.data.post._id)
          
          notification('success',data.message)          
        },
        error: function (error) {
          console.log(error.responseText)
        },
      })
    })
  }

  // method to create post in DOM
  let newPostDom = function (post) {
    return $(`<li id="post-${post._id}">
    <p>
      <small>
        <a class="delete-post-btn" href="/posts/destroy/${post._id}">Delete <span style="font-size: larger">&#10006;</span></a>
      </small>
      </p>

    <p><small>${post.user.name}</small> <br />${post.content}</p>
  
  <div class="posts-comments">  
    <form id="new-comment-form-${post._id}" action="/comments/create" method="post">
      <input
        type="text"
        name="content"
        placeholder="Type Here to add comments . . ."
        required
      />
      <input type="hidden" name="post" value="${post._id}" />
      <input type="submit" value="Add Comment" />
    </form>
  
    <div class="post-comments-list">
      <ul id="post-comment-${post._id}">
      </ul>
    </div>
  </div>
  </li>
  `)
  }

  // method to detele post from dom

  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault()

      // Ajax Call to get response from server
      $.ajax({
        type: 'get',
        url: $(deleteLink).prop('href'),
        success: function (data) {
          $(`#post-${data.data.post_id}`).remove()
          notification('warning',data.message)
        },
        error: function (error) {
          console.log(error.responseText)
        },
      })
    })
  }
  createPost()


//comments
  let createComment = function (post_id) {
    let newCommentForm = $(`#new-comment-form-${post_id}`)

    newCommentForm.submit(function (e) {
      e.preventDefault()

      $.ajax({
        type: 'post',
        url: '/comments/create',
        data: newCommentForm.serialize(),
        success: function (data) {
          let newComment = new newCommentDom(data.data.comment)

          
          $('.post-comments-list>ul').prepend(newComment)
          console.log($(' .delete-comment-btn', newComment));
          deleteComment($(' .delete-comment-btn', newComment)) 
          notification('info',data.message) 
        },
        error: function (error) {
          console.log(error.responseText)
        },
      })
    })
  }

  // method to create comment in DOM

  let newCommentDom = function (comment) {
    return $(`<li id="comment-${comment._id}">
     <p>
       ${comment.content} <br />
       <small>commented by <sub>${comment.user.name}</sub></small>
       <br />
       <small>
         <a class="delete-comment-btn" href="/comments/destroy/${comment._id}"
           ><span style="font-size: larger">&#9940;</span> delete</a
         >
       </small>
     </p>
   </li>`)
  }

  // Method to destroy comments
  let deleteComment = function (deleteLink) {
    console.log(deleteLink);
    // $(deleteLink).click(function (e) {
    //   console.log('click delete link');
    //   e.preventDefault()

    //   // Ajax Call to get response from server
    //   $.ajax({
    //     type: 'get',
    //     url: $(deleteLink).prop('href'),
    //     success: function (data) {
    //       console.log('success ajax res')
    //       $(`#comment-${data.data.comment_id}`).remove()
    //     },
    //     error: function (error) {
    //       console.log(error.responseText)
    //     },
    //   })
    // })

    $(deleteLink).on('click',(e)=>{
        e.preventDefault()
        console.log('chal gya');
    })


  }

  // createComment()
}



/**
   * 
   *  notification('type','message') 
   * 
   */

 let notification = function (type,text) {
  new Noty({
    theme:'metroui',
    text:text,
    type:type,
    layout:'topRight',
    timeout:1500
  }).show()
 }