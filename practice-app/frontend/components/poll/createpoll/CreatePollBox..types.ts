export interface CreatePollBoxProps {
    setPoll:(poll:Poll) => void;
    poll:Poll;
}

export interface Poll{
    question: string;
    answers: string[];
}