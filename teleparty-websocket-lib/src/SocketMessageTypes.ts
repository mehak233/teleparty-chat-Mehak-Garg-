export const SocketMessageTypes = {
    CREATE_SESSION: 'createSession',
    JOIN_SESSION: 'joinSession',
    SEND_MESSAGE: 'sendMessage',
    SET_TYPING_PRESENCE: 'setTypingPresence',
} as const;

export type SocketMessageTypes = (typeof SocketMessageTypes)[keyof typeof SocketMessageTypes];