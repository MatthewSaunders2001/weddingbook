type PromptCardProps = {
  prompt: string;
};

function PromptCard({
  prompt,
}: PromptCardProps) {
  return (
    <div className="prompt-card">

      <div className="prompt-icon">
        📸
      </div>

      <p className="prompt-label">
        TODAY'S MEMORY
      </p>

      <h2 className="prompt-text">
        {prompt}
      </h2>

      <p className="prompt-tip">
        Capture the moment naturally. The best memories are never posed.
      </p>

    </div>
  );
}

export default PromptCard;

