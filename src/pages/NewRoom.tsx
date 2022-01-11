import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState} from 'react'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import '../styles/auth.scss' 
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import { userInfo } from 'os'


export function NewRoom() {
    const { user } = useAuth();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            tittle: newRoom,
            authorId: user?.id,
        });

        history.push(`/rooms/${firebaseRoom.key}`);
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustration symbolizing questions and answers" />
                <strong>Create Q&amp;A live rooms</strong>
                <p>Clear your audience's doubts in real-time</p>
            </aside>
            <main>
                
                <div className="main-content">
                    <img src={logoImg} className="logo" alt="Letmeask" />
                    <h2>Create a new room</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Room's name"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                            />
                        <Button type="submit">
                            Create room
                        </Button>
                    </form>
                    <p>Do you want to join an existing room? <Link to="/">Click here</Link></p>
                </div>
            </main>
        </div>
    )
}