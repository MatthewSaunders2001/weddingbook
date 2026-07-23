import { useRef, useState } from "react";
import { generateWeddingBook } from "../services/promptEngine";
import PromptCard from "./PromptCard";
import ProgressBar from "./ProgressBar";
import Camera, { type CameraHandle } from "./Camera";
import type { Memory } from "../types/memory";
import MessageScreen from "./MessageScreen";
import { uploadPhoto } from "../services/uploadPhoto";
import { saveMemory } from "../services/saveMemory";
import { saveMessage } from "../services/saveMessage";

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
      onSave={async () => {
        if (!currentMemory.message.trim()) {
  alert("Please write a message first.");
  return;
}

        try {
          await saveMessage(currentMemory.message);

          alert("❤️ Message sent!");

          setCurrentMemory((memory) => ({
            ...memory,
            message: "",
          }));

          setShowMessageScreen(false);

        } catch (error) {
          console.error(error);
          alert("Couldn't send message.");
        }
      }}
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
  // Capture values immediately so they don't change later
  const prompt = book[currentPrompt];
  const message = currentMemory.message;

  // Update the UI immediately
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

  try {
    // Upload in the background
    const photoUrl = await uploadPhoto(file);

    await saveMemory(
      prompt,
      photoUrl,
      message
    );

    setMemories((previous) => [
      ...previous,
      {
        prompt,
        mainPhoto: file,
        extras: [],
        message,
        uploaded: true,
      },
    ]);

    console.log("Uploaded:", photoUrl);

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
  onChange={async (e) => {
  console.log("1. Gallery opened");

  if (!e.target.files) return;

  const files = Array.from(e.target.files);

  console.log("2. Files:", files);

  try {
    for (const file of files) {
      console.log("3. Uploading:", file.name);

      const photoUrl = await uploadPhoto(file);

      console.log("4. Uploaded:", photoUrl);

      await saveMemory(
        book[currentPrompt],
        photoUrl,
        currentMemory.message
      );
    }

    alert("Gallery photos uploaded!");

  } catch (error) {
    console.error("ERROR:", error);
    alert("Upload failed.");
  }
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
