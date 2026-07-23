import { useRef, useState } from "react";
import { generateWeddingBook } from "../services/promptEngine";
import PromptCard from "./PromptCard";
import ProgressBar from "./ProgressBar";
import Camera, { type CameraHandle } from "./Camera";
import type { Memory } from "../types/memory";
import MessageScreen from "./MessageScreen";
import { uploadPhoto } from "../services/uploadPhoto";

function WeddingBook() {
  const [book] = useState(generateWeddingBook());

  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [memories, setMemories] = useState<Memory[]>([]);
  console.log(memories);
  const [showMessageScreen, setShowMessageScreen] =
  useState(false);

 const [currentMemory, setCurrentMemory] =
  useState<Memory>({
    prompt: "",
    mainPhoto: null,
    extras: [],
    message: "",
    uploaded: false,
  });
  const cameraRef = useRef<CameraHandle>(null);
   if (showMessageScreen) {
  return (
    <MessageScreen
      message={currentMemory.message}
      onChange={(value) =>
        setCurrentMemory((memory) => ({
          ...memory,
          message: value,
        }))
      }
      onSave={() => setShowMessageScreen(false)}
      onBack={() => setShowMessageScreen(false)}
    />
  );
}
    // PhotoReview removed
  return (
    <main className="welcome">

  <div className="book-header">
    <p className="book-title">Wedding Book</p>
    <h2 className="memory-title">Today's Memory</h2>
  </div>

  <PromptCard
    prompt={book[currentPrompt]}
  />

  <ProgressBar
    current={completed}
    total={book.length}
  />

  <p className="memory-count">
    {completed} of {book.length} Memories
  </p>

  <Camera
  ref={cameraRef}
  onPhotoSelected={async (file) => {
    try {
      const photoUrl = await uploadPhoto(file);

      console.log("Uploaded:", photoUrl);

      setMemories((previous) => [
        ...previous,
        {
          ...currentMemory,
          mainPhoto: file,
          prompt: book[currentPrompt],
          uploaded: true,
        },
      ]);

      setCompleted((value) => value + 1);

      if (currentPrompt < book.length - 1) {
        setCurrentPrompt((value) => value + 1);
      }

      setCurrentMemory({
        prompt: "",
        mainPhoto: null,
        extras: [],
        message: "",
        uploaded: false,
      });

    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    }
  }}
/>

<input
  id="extras"
  type="file"
  multiple
  accept="image/*"
  style={{ display: "none" }}
  onChange={(e) => {
    if (!e.target.files) return;

    setCurrentMemory((memory) => ({
      ...memory,
      extras: Array.from(e.target.files ?? []),
    }));
  }}
/>

  <div className="button-stack">
{currentMemory.extras.length > 0 && (
  <p className="extras-success">
    ✨ {currentMemory.extras.length} extra photo
    {currentMemory.extras.length > 1 ? "s" : ""} added
  </p>
)}
  <button onClick={() => cameraRef.current?.open()}>
    📷 Take Photo
  </button>

  <button
    onClick={() =>
      document.getElementById("extras")?.click()
    }
  >
    🖼 Upload Extras from Gallery
  </button>

  <button
    onClick={() => setShowMessageScreen(true)}
  >
    💌 Leave a Message
  </button>

</div>

</main>
  );
}

export default WeddingBook;
