// src/api/forumService.js
import { apiGet, apiPost } from './apiClient';

export const forumService = {
  // Auth
  register: (payload) => apiPost('/register', payload),
  login: (payload) => apiPost('/login', payload),

  // Users
  getUsers: () => apiGet('/users'),
  getMyProfile: (token) => apiGet('/users/me', token),

  // Threads
  getThreads: () => apiGet('/threads'),
  getThreadDetail: (threadId) => apiGet(`/threads/${threadId}`),

  createThread: (payload, token) => apiPost('/threads', payload, token),

  // Comments
  createComment: (threadId, payload, token) => apiPost(`/threads/${threadId}/comments`, payload, token),

  // Votes (threads)
  upvoteThread: (threadId, token) => apiPost(`/threads/${threadId}/up-vote`, null, token),
  downvoteThread: (threadId, token) => apiPost(`/threads/${threadId}/down-vote`, null, token),
  neutralizeThreadVote: (threadId, token) => apiPost(`/threads/${threadId}/neutral-vote`, null, token),

  // Votes (comments)
  upvoteComment: (threadId, commentId, token) => apiPost(`/threads/${threadId}/comments/${commentId}/up-vote`, null, token),
  downvoteComment: (threadId, commentId, token) => apiPost(
    `/threads/${threadId}/comments/${commentId}/down-vote`,
    null,
    token,
  ),
  neutralizeCommentVote: (threadId, commentId, token) => apiPost(
    `/threads/${threadId}/comments/${commentId}/neutral-vote`,
    null,
    token,
  ),

  // Leaderboard
  getLeaderboards: () => apiGet('/leaderboards'),
};
