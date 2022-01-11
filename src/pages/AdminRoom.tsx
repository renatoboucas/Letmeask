import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { parseCommandLine } from 'typescript';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import '../styles/room.scss';

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    // const { user } = useAuth();
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const roomId = params.id;

    const { title, questions} = useRoom(roomId);

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();

        if (newQuestion.trim() == '') {
            return;
        }

        if (!user) {
            throw new Error('You must be logged in');
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
           isHighlighted: false,
           isAnswered: false 
        };

        await database.ref(`rooms/${roomId}/questions`).push(question);
    
        setNewQuestion('');
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask"/>
                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined>Close room</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-tittle">
                    <h1>Room {title}</h1>
                    {questions.length > 0 && <span>{questions.length} question(s)</span> }
                </div>
                <div className="question-list">
                {questions.map(question => {
                    return (
                        <Question
                            key={question.id}
                            content={question.content}
                            author={question.author}
                        />
                        );
                    })}
                </div>
            </main>
        </div>
    );
}