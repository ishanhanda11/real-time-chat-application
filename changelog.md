# Changelog

2026-07-11 -- Milestone 1a: Added backend Express skeleton, frontend Vite + React + TypeScript skeleton, Tailwind design tokens, and root repo hygiene.
2026-07-11 -- Milestone 1b: Added MongoDB connection config, Message model, and backend/frontend environment examples.
2026-07-11 -- Milestone 1c: Added paginated message REST endpoints and central Express error handling.
2026-07-11 -- Milestone 1d: Added Socket.io connection handling, message persistence and broadcast flow, and local runtime env files.
2026-07-11 -- Milestone 2a: Added Frontend chat UI including layout, MessageBubble, MessageInput, ChatWindow, and applied Tailwind styling.
2026-07-11 -- Milestone 2b: Added Frontend Socket.io client, `useSocket` hook, and wired live send/receive with optimistic UI to ChatWindow and MessageInput.
2026-07-11 -- Milestone 2c: Added chat history on load by fetching messages on mount and populating the ChatWindow with formatted timestamps.
2026-07-11 -- Milestone 3a: Added dummy username login, protected the ChatPage via UserContext, and wired the real username into the UI.
2026-07-11 -- Milestone 3b: Added typing indicator using `user:typing` and `user:stop_typing` socket events with animated UI.
