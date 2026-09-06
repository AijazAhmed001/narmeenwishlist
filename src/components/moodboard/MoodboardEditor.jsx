import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useWishlist } from '../../context/WishlistContext';

export function MoodboardEditor({ isOpen, onClose, moodboard = null }) {
  const { createMoodboard, updateMoodboard } = useWishlist();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');

  useEffect(() => {
    if (moodboard) {
      setName(moodboard.name || '');
      setDescription(moodboard.description || '');
      setCoverImage(moodboard.cover_image || '');
    } else {
      setName('');
      setDescription('');
      setCoverImage('');
    }
  }, [moodboard, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (moodboard) {
      updateMoodboard(moodboard.id, {
        name,
        description,
        cover_image: coverImage || moodboard.cover_image
      });
    } else {
      createMoodboard(name, description, coverImage);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={moodboard ? 'Edit Moodboard' : 'Create New Moodboard'}
      subtitle="Gather pieces, inspirations, and aesthetic themes into a private capsule."
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Input
          label="Moodboard Title"
          required
          placeholder="e.g. Quiet Luxury, Summer in Amalfi, Wedding Capsule"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="input-group">
          <label className="input-label">Aesthetic Description</label>
          <textarea
            rows={3}
            className="input-field"
            placeholder="Describe the mood, silhouettes, or occasion..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <Input
          label="Cover Image URL (Optional)"
          placeholder="https://images.unsplash.com/..."
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1rem' }}>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="luxury">
            {moodboard ? 'Save Changes' : 'Create Moodboard'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
