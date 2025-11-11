CREATE TABLE bot_conversations (
    id SERIAL PRIMARY KEY,
    chat_id BIGINT NOT NULL,
    user_name VARCHAR(255),
    user_username VARCHAR(255),
    user_message TEXT NOT NULL,
    bot_response TEXT,
    response_status VARCHAR(50) DEFAULT 'success',
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bot_conversations_chat_id ON bot_conversations(chat_id);
CREATE INDEX idx_bot_conversations_created_at ON bot_conversations(created_at DESC);