import { useNavigate } from "react-router-dom"

export const InviteSub = () => { 
    const navigate = useNavigate();
    return (

        <div className="invite-sub">

            <div className="invite-sub__container">
                <div style={{ display: 'flex', flexDirection: 'column', color: 'white' }}>
                    <h1>O melhor Streaming de Animes da América Latina!</h1>
                </div>
            </div>  
            <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input type="text" name="" id="myEmail" placeholder='Digite seu Email' />
                <button id="invite" onClick={() => navigate('/cadastro')}>
                Vamos lá!
                </button>
            </div>
        </div>
    )
}