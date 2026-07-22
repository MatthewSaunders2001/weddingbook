type PromptCardProps = {
  prompt: string;
  current: number;
  total: number;
};

function PromptCard({
  prompt,
  current,
  total,
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

