class PostComments{constructor(e){this.postId=e,this.postContainer=$(`#post-${e}`),this.newCommentForm=$(`#post-${e}-comments-form`),this.createComment(e);let t=this;$(" .delete-comment-btn",this.postContainer).each((function(){t.deleteComment($(this))}))}createComment(e){let t=this;this.newCommentForm.submit((function(n){n.preventDefault();$.ajax({type:"post",url:"/comments/create",data:$(this).serialize(),success:function(n){let o=t.newCommentDom(n.data.comment);$(`#post-comments-${e}`).prepend(o),t.deleteComment($(" .delete-comment-btn",o)),new ToggleLike($(" .toggle-like-button",o)),new Noty({theme:"relax",text:"Comment published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))}newCommentDom(e){return $(`<li id="comment-${e._id}">\n                        <p>\n                        ${e.content} <br />\n                        <small>commented by <sub>${e.user.name}</sub></small>\n                        <br />\n                        <small>\n                        <a class="delete-comment-btn" href="/comments/destroy/${e._id}"\n                          ><span style="font-size: larger">&#9940;</span> delete</a\n                        >\n                      </small>\n                            \n                      <small>\n                      <a\n                        class="toggle-like-button"\n                        data-likes="0"\n                        href="/likes/toggle/?id=${e._id}&type=Post"\n                        >0 👍</a\n                      >\n                    \n                    </small>\n                        </p>    \n                </li>`)}deleteComment(e){$(e).click((function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){$(`#comment-${e.data.comment_id}`).remove(),new Noty({theme:"relax",text:"Comment Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))}}