import { useHistory } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss' 
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'
import { exists } from 'fs'


export function Home() {
    const history = useHistory();
    const {user, signInWithGoogle} = useAuth();
    const [roomCode, setRoomCode] = useState(''); 

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();  
        }
        history.push('/rooms/new');    
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Room does not exists.');
            return;

        }
        history.push('/rooms/${roomCode}');
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
                    <button onClick={handleCreateRoom} className='create-room'>
                        <img src={googleIconImg} alt="Google Logo" />
                        Create your room with Google
                    </button>
                    <div className='separator'>or enter in a room</div>
                    <form onSubmit={ handleJoinRoom }>
                        <input 
                        type="text" 
                        placeholder="Insert the room's code"
                        onChange={event => setRoomCode(event.target.value)}
                        value={roomCode}
                        />
                        <Button type="submit">
                            Enter the room
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}