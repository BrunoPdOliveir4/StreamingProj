import AnimesGrid from "../components/AnimesGrid";
import ComponentCarrossel from "../components/ComponentCarrossel";
import MHeader from "../components/MHeader";

export const MainPage = () => {
    return (
        <div style={{ backgroundColor: '#1f1f1f', height: '100vh' }}>
            <MHeader/>
            <div style={{background: 'rgba(0,0,0,0.7)', padding: '1em'}}>
                <ComponentCarrossel />
            </div>
            <AnimesGrid />
        </div>
    );
    }