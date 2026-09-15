function StatusMessage({ message, type }) {
    if (!message) {
        return null;
    }
    return <p>{message}</p>;
}
export default StatusMessage;
