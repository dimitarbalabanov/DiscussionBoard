import {
  SET_COMMENTS_SORT,
  SET_COMMENTS_TOP,
  CLEAR_COMMENTS,

  REQUEST_COMMENTS_START,
  REQUEST_COMMENTS_SUCCESS,
  REQUEST_COMMENTS_FAILURE,

  CREATE_COMMENT_START,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,

  UPDATE_COMMENT_START,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILURE,

  DELETE_COMMENT_START,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,

  CREATE_COMMENTVOTE_START,
  CREATE_COMMENTVOTE_SUCCESS,
  CREATE_COMMENTVOTE_FAILURE,

  UPDATE_COMMENTVOTE_START,
  UPDATE_COMMENTVOTE_SUCCESS,
  UPDATE_COMMENTVOTE_FAILURE,

  DELETE_COMMENTVOTE_START,
  DELETE_COMMENTVOTE_SUCCESS,
  DELETE_COMMENTVOTE_FAILURE,
} from '../actions/actionTypes';

const initialCommentsState = {
  comments: [],
  sort: 1,
  top: '',
  cursor: null,
  postId: null,
  commentsLoading: false,
  commentsError: null,
};

const initialCreateCommentState = {
  createCommentLoading: false,
  createCommentError: null,
  createCommentSuccess: false,
  updateCommentId: null
};

const initialUpdateCommentState = {
  updateCommentLoading: false,
  updateCommentError: null,
  updateCommentSuccess: false
};

const initialDeleteCommentState = {
  deleteCommentLoading: false,
  deleteCommentError: null,
  deleteCommentSuccess: false,
  deleteCommentId: null
};

const initialCreateCommentVoteState = {
  createCommentVoteId: null,
  createCommentVoteLoading: false,
  createCommentVoteError: null,
  createCommentVoteCommentScore: null
};

const initialUpdateCommentVoteState = {
  updateCommentVoteId: null,
  updateCommentVoteLoading: false,
  updateCommentVoteError: null,
  updateCommentVoteCommentScore: null
};

const initialDeleteCommentVoteState = {
  deleteCommentVoteId: null,
  deleteCommentVoteLoading: false,
  deleteCommentVoteError: null,
  deleteCommentVoteCommentScore: null
};

const initialState = {
  ...initialCommentsState,
  ...initialCreateCommentState,
  ...initialUpdateCommentState,
  ...initialDeleteCommentState,
  ...initialCreateCommentVoteState,
  ...initialUpdateCommentVoteState,
  ...initialDeleteCommentVoteState
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_COMMENTS_START: 
      return { 
        ...state,
        commentsLoading: true,
        commentsError: null
      };

    case REQUEST_COMMENTS_SUCCESS: 
      return { 
        ...state,
        comments: action.data.data.comments,
        commentsLoading: false,
        commentsError: null
      };

    case REQUEST_COMMENTS_FAILURE:
      return {
        ...state, 
        commentsLoading: false,
        commentsError: action.error
      };

    //   case CLEAR_COMMENTS:
    //     return { 
    //       ...state,
    //       comments: []
    //     };
      
    //   case SET_COMMENTS_SORT:
    //     return {
    //       ...state,
    //       comments: [],
    //       sort: action.sort
    //     };

    // case SET_COMMENTS_TOP:
    //   return {
    //     ...state,
    //     comments: [],
    //     top: action.top
    //   };


    case CREATE_COMMENT_START:
      return { 
        ...state,
        createCommentSuccess: false,
        createCommentLoading: true,
        createCommentError: null
      };

    case CREATE_COMMENT_SUCCESS:
      const comment = {
        creatorUserName : "asdf",
        createdOn : new Date(),
        content : action.content
      };

      return { 
        ...state,
        comments: [comment, ...state.comments],
        createCommentSuccess: true,
        createCommentLoading: false,
        createCommentError: null
      };

    case CREATE_COMMENT_FAILURE:
      return { 
        ...state,
        createCommentSuccess: false,
        createCommentLoading: false,
        createCommentError: action.error
      };

    case UPDATE_COMMENT_START:
      return { 
        ...state,
        updateCommentSuccess: false,
        updateCommentLoading: true,
        updateCommentError: null,
        updateCommentId: action.commentId
      };

    case UPDATE_COMMENT_SUCCESS:
      const commentIndex = state.comments.findIndex(c => c.id === action.commentId);
      const newComment = {
        ...state.comments[commentIndex],
        content: action.content
      }     
      return { 
        ...state,
        comments: [
          ...state.comments.slice(0, commentIndex),
          newComment,
          ...state.comments.slice(commentIndex + 1)
        ],
        updateCommentSuccess: true,
        updateCommentLoading: false,
        updateCommentError: null
      };
      
    case UPDATE_COMMENT_FAILURE:
      return { 
        ...state,
        updateCommentSuccess: false,
        updateCommentLoading: false,
        updateCommentError: action.error
      };

    case DELETE_COMMENT_START:
      return { 
        ...state,
        deleteCommentError: null,
        deleteCommentLoading: true,
        deleteCommentSuccess: false,
        deleteCommentId: action.commentId
      };

    case DELETE_COMMENT_SUCCESS:
      return { 
        ...state,
        comments: state.comments.filter(c => c.id !== action.commentId),
        deleteCommentLoading: false,
        deleteCommentError: null,
        deleteCommentSuccess: true,
        deleteCommentId: null
      };

    case DELETE_COMMENT_FAILURE:
      return { 
        ...state,
        deleteCommentError: action.error,
        deleteCommentLoading: false,
        deleteCommentSuccess: false,
        deleteCommentId: null
      };

    case CREATE_COMMENTVOTE_START:
      return { 
        ...state,
        createCommentVoteError: null,
        createCommentVoteLoading: true 
      };
    
    case CREATE_COMMENTVOTE_SUCCESS:
      return { 
        ...state,
        comments: state.comments.slice()
          .map(comment => {
            if (comment.id === action.commentId) {
              let newScore = action.voteType === 'up' ? comment.votesScore + 1 : comment.votesScore - 1; 
              return {
                ...comment,
                votesScore: newScore,
                currentUserVoteType: action.voteType,
                currentUserVoteId: action.data
              }
            } else {
              return comment
            }
          }),
        createCommentVoteLoading: false,
        createCommentVoteError: null
      };

    case CREATE_COMMENTVOTE_FAILURE:
      return { 
        ...state,
        createCommentVoteError: action.error,
        createCommentVoteLoading: false
      };

    case UPDATE_COMMENTVOTE_START:
      return { 
        ...state,
        updateCommentVoteError: null,
        updateCommentVoteLoading: true 
      };

    case UPDATE_COMMENTVOTE_SUCCESS:
      return { 
        ...state,
        comments: state.comments.slice()
          .map(comment => {
            if (comment.id === action.commentId) {
              let newScore = action.voteType === 'up' ? comment.votesScore + 2 : comment.votesScore - 2; 
              return {
                ...comment,
                votesScore: newScore,
                currentUserVoteType: action.voteType
              }
            } else {
              return comment
            }
          }),
        updateCommentVoteLoading: false,
        updateCommentVoteError: null
      };

    case UPDATE_COMMENTVOTE_FAILURE:
      return { 
        ...state,
        updateCommentVoteError: action.error,
        updateCommentVoteLoading: false
      };

    case DELETE_COMMENTVOTE_START:
      return { 
        ...state,
        deleteCommentVoteError: null,
        deleteCommentVoteLoading: true 
      };

    case DELETE_COMMENTVOTE_SUCCESS:
      return {
        ...state,
        comments: state.comments.slice()
          .map(comment => {
            if (comment.id === action.commentId) {
              let newScore = action.voteType === 'up' ? comment.votesScore - 1 : comment.votesScore + 1; 
              return {
                ...comment,
                votesScore: newScore,
                currentUserVoteType: null,
                currentUserVoteId: null
              }
            } else {
              return comment
            }
          }),
        deleteCommentVoteLoading: false,
        deleteCommentVoteError: null
      };

    case DELETE_COMMENTVOTE_FAILURE:
      return { 
        ...state,
        deleteCommentVoteError: action.error,
        deleteCommentVoteLoading: false
      };

    default:
      return state;
  }
};

export default reducer;

