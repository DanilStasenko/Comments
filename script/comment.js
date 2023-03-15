window.addEventListener('load', function() {
    const COMMENTS_LS = 'comments';
    const commentsField = document.querySelector('.comments-container');
    let comments = [];
    
    
    loadComments();

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if ( !hasError() ) {
            createComment();
        }
    })

    function createComment() {
        const commentName = form.querySelector('.input-name');
        const commentText = form.querySelector('.form-textarea');
        const commentDate = form.querySelector('.input-date');
        
        let currentComment = {
            name: commentName.value,
            text: commentText.value,
            time: commentDate.value == '' ? showMessageDateTime(new Date) : showMessageDateTime(commentDate.value),
            id: comments.length + 1,
            like: false,
        }
        
        commentName.value = '';
        commentText.value = '';
        commentDate.value = '';

        comments.push(currentComment);
        saveComment();
        showComments(comments);
    }

    function saveComment() {
        localStorage.setItem(COMMENTS_LS, JSON.stringify(comments));
    }

    function loadComments() {
        let savedComments = localStorage.getItem(COMMENTS_LS);

        if (savedComments) {
            comments = JSON.parse(savedComments);
        }

        showComments(comments);
    } 

    function showComments(comments) {
        let out = '';

        comments.forEach(el => {
            const heartClass = el.like ? 'like' : '';
            out += `
            <div class="comment" id="${el.id}">
                <div class="comment-user">
                    <h2 class="comment-name">${el.name}</h2>
                    <p class="comment-text">${el.text}</p>
                    <p class="comment-date"><em>${el.time}</em></p>
                </div>
                <div class="icon-container">
                    <i class="fa-solid fa-heart ${heartClass}"></i>
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
            `
        })
        
        commentsField.innerHTML = out;
    } 

    commentsField.addEventListener('click', function(event) {
        const currentEl = event.target;
        const currentComment = currentEl.closest('.comment');
      
        if (currentEl.classList.contains('fa-trash')) {
            const cleanComments = comments.filter(comment => comment.id !== parseInt(currentComment.id));
            comments = cleanComments;
            currentComment.remove();
            saveComment();
        }
      
        if (currentEl.classList.contains('fa-heart')) {
            currentEl.classList.toggle('like');

            const currentCommentId = parseInt(currentComment.id);
            const currentLikeState = currentEl.classList.contains('like');
            const commentIndex = comments.findIndex(comment => comment.id === currentCommentId);

            if (commentIndex !== -1) {
                comments[commentIndex].like = currentLikeState;
                saveComment();
            }
        }
      });
})
