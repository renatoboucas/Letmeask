import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss' 
import { Button } from '../components/Button'

export function NewRoom() {
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
                    <form>
                        <input type="text" placeholder="Room's name"/>
                        <Button type="submit">
                            Create room
                        </Button>
                    </form>
                    <p>Do you want to join an existing room? <a href="#">Click here</a></p>
                </div>
            </main>
        </div>
    )
}