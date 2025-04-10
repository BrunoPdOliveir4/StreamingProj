import { useNavigate } from "react-router-dom"

export const InviteSub = () => { 
    const navigate = useNavigate();
    return (

        <div className="invite-sub">

            <div className="invite-sub__container">
                <div style={{ display: 'flex', flexDirection: 'column', color: 'white' }}>
                    <h1>Você não irá se arrepender de participar de nossa comunidade!</h1>
                    <h2>Registre-se e participe conosco</h2>
                </div>
            </div>  
            <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                <input type="text" name="" id="myEmail" placeholder='Digite seu Email' />
                <button id="invite" onClick={() => navigate('/cadastro')}>
                Vamos lá!
                </button>
            </div>
        </div>
    )
}