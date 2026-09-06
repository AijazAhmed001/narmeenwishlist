import React, { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { MoodboardGrid } from '../components/moodboard/MoodboardGrid';
import { MoodboardEditor } from '../components/moodboard/MoodboardEditor';
import { Button } from '../components/ui/Button';
import { Plus } from 'lucide-react';

export function Moodboards() {
  const { moodboards } = useWishlist();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingBoard, setEditingBoard] = useState(null);

  const handleOpenNew = () => {
    setEditingBoard(null);
    setIsEditorOpen(true);
  };

  const handleEditBoard = (board) => {
    setEditingBoard(board);
    setIsEditorOpen(true);
  };

  return (
    <div className="section" style={{ paddingTop: '2.5rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
          <div>
            <span className="editorial-tag">Visual Inspiration Capsules</span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
              My Moodboards
            </h1>
            <p style={{ color: 'var(--color-muted-text)', fontSize: '0.95rem', margin: 0 }}>
              Group pieces into themed visual edits — from wedding guest capsules to quiet luxury aesthetics.
            </p>
          </div>

          <Button variant="luxury" onClick={handleOpenNew}>
            <Plus size={16} /> Create New Moodboard
          </Button>
        </div>

        {/* Grid */}
        <MoodboardGrid
          moodboards={moodboards}
          onAddNew={handleOpenNew}
          onEdit={handleEditBoard}
        />
      </div>

      <MoodboardEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        moodboard={editingBoard}
      />
    </div>
  );
}


