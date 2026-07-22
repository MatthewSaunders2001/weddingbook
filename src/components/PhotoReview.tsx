type PhotoReviewProps = {
  photo: string;
  onRetake: () => void;
  onUpload: () => void;
};

function PhotoReview({
  photo,
  onRetake,
  onUpload,
}: PhotoReviewProps) {
  return (
    <main className="photo-review">
      <h2>✨ Beautiful shot!</h2>

      <img
        src={photo}
        alt="Preview"
        className="review-image"
      />

      <p>
        Does this capture the moment?
      </p>

      <button onClick={onRetake}>
        ↺ Retake
      </button>

      <button onClick={onUpload}>
        ☁ Upload
      </button>
    </main>
  );
}

export default PhotoReview;