import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import '../styles/room.scss';
export function Room() {
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask"/>
                    <RoomCode code="1213213123213"/>
                </div>
            </header>

            <main>
                <div className="room-tittle">
                    <h1>Sala React</h1>
                    <span>4 questions</span>
                </div>

                <form>
                    <textarea placeholder='What would like to ask?'/>
                    <div className="form-footer">
                        <span><button>Login</button> to make a question.</span>
                        <Button type='submit'>Send question</Button>
                    </div>
                </form>
            </main>
        </div>
    );
}