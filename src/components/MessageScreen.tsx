type MessageScreenProps = {
  message: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onBack: () => void;
};

function MessageScreen({
  message,
  onChange,
  onSave,
  onBack,
}: MessageScreenProps) {
  return (
    <main className="message-screen">

      <h2>Leave a Message 💌</h2>

      <p className="message-subtitle">
        Share a blessing, a memory, advice,
        or simply wish Matthew & Corban well.
      </p>

      <textarea
  className="message-box"
  placeholder="Write something beautiful..."
  value={message}
  onChange={(e) => onChange(e.target.value)}
/>

      <button onClick={onSave}>
  💌 Save Message
</button>

      <button
        className="secondary-button"
        onClick={onBack}
      >
        ← Back
      </button>

    </main>
  );
}

export default MessageScreen;