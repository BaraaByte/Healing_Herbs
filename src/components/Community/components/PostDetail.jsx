import React, { useState } from 'react';

function PostDetail({ post, onBack, onAddComment, onLikePost }) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(post.id, newComment);
      setNewComment('');
    }
  };

  if (!post) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-md text-center" dir="rtl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-indigo-600 mb-6 transition duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
        العودة إلى القائمة
      </button>

      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{post.title}</h2>
        <p className="text-gray-600 mb-6 leading-relaxed break-all">{post.content}</p>

        <div className="flex items-center justify-between">
          <button
            onClick={() => onLikePost(post.id)}
            className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={post.liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="font-medium">{post.likes || 0}</span>
            <span>إعجاب</span>
          </button>

          <div className="flex items-center space-x-1 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>
              {post.comments?.length || 0}{" "}
              {post.comments?.length === 1 ? "تعليق" : "تعليقات"}
            </span>
          </div>
        </div>
      </div>

      {/* قسم التعليقات */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">التعليقات</h3>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex">
            <input
              type="text"
              dir="rtl"
              placeholder="أضف تعليقًا..."
              className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-r-lg hover:bg-indigo-700 transition duration-200"
            >
              إرسال
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="flex items-start space-x-3">
                  <div className="bg-indigo-100 text-indigo-800 rounded-full h-10 w-10 flex items-center justify-center font-semibold">
                    {comment.author ? comment.author.charAt(0) : "م"}
                  </div>
                  <div>
                    <p className="text-gray-700">{comment.content}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {comment.author || "مستخدم"} • {comment.timestamp || "منذ قليل"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">لا توجد تعليقات بعد. كن أول من يعلق!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
