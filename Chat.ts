export interface ChatMessage {
    sender: string;
    content: string;
    timeSent: Date;
}

export interface ChatMessageResponse {
    sender: string;
    content: string;
    timeSent: string;
}