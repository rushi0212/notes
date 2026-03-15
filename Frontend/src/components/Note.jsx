import React, { useState, useRef } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

function Note({ title, content, id, onDelete, onUpdate }) {

  const [isEditing, setIsEditing] = useState(false);

  const titleRef = useRef(null);
  const contentRef = useRef(null);

  function handleSave() {
    const updatedNote = {
      title: titleRef.current.textContent,
      content: contentRef.current.textContent
    };

    onUpdate(id, updatedNote);
    setIsEditing(false);
  }

  return (
    <div className="note">

      <h1
        ref={titleRef}
        contentEditable={isEditing}
        suppressContentEditableWarning
      >
        {title}
      </h1>

      <p
        ref={contentRef}
        contentEditable={isEditing}
        suppressContentEditableWarning
      >
        {content}
      </p>

      <button onClick={() => onDelete(id)}>
        <DeleteIcon />
      </button>

      {isEditing ? (
        <button onClick={handleSave}>
          <SaveIcon />
        </button>
      ) : (
        <button onClick={() => setIsEditing(true)}>
          <EditIcon />
        </button>
      )}

    </div>
  );
}

export default Note;