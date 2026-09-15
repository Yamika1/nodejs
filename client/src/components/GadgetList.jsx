function GadgetList({ gadgets }) {
    if (!gadgets.length) {
        return <p>No gadgets available.</p>;
    }
    return (
        <section>
            <h2>Gadget List</h2>
            <ul>
                {gadgets.map((gadget) => (
                    <li key={gadget.id}>
                        <strong>{gadget.name}</strong> - {gadget.category} ({gadget.condition})
                    </li>
                ))}
            </ul>
        </section>
    );
    }

    export default GadgetList;