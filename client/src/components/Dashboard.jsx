import { useEffect } from "react";
import {apiRequest} from "../services/api";
import GadgetList  from "./GadgetList";
import StatusMessage from "./StatusMessage";
import GadgetForm from "./GadgetForm";

function Dashboard() {
    const [gadgets, setGadgets] = useState([]);
    const [status, setStatus] = useState('');

    const loadGadgets = async () => {
        try {
            setStatus('Loading gadgets...');
            const data = await apiRequest('/api/gadgets');
            setGadgets(data.data || []);
            setStatus('');
        }
        catch (error) {
            setStatus(error.message);
        }
    };

    useEffect(() => {
        loadGadgets();
    }, []);

    return (
        <section>
            <h1>Dashboard</h1>
            <StatusMessage message={status}  />
            <GadgetForm onCreated={loadGadgets} />
            <GadgetList gadgets={gadgets} />
        </section>
    );
}

export default Dashboard;