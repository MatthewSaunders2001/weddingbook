type ProgressBarProps = {
  current: number;
  total: number;
};

function ProgressBar({
  current,
  total,
}: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="progress-container">
      <div
        className="progress-fill"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;