import React, { memo, useCallback } from 'react';
import { Mountain } from '../../types';

interface MountainSelectProps {
  mountainsData: Mountain[];
  onMountainSelect: (mountain: Mountain) => void;
  selectedMountain: Mountain | null;
}

const MountainSelect: React.FC<MountainSelectProps> = memo(({
  mountainsData,
  onMountainSelect,
  selectedMountain
}) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    if (selectedName === 'select') return;
    
    const selectedMountain = mountainsData.find(
      (mountain) => mountain.name === selectedName
    );
    
    if (selectedMountain) {
      onMountainSelect(selectedMountain);
    }
  }, [mountainsData, onMountainSelect]);

  return (
    <div className="mountain-select-container">
      <label htmlFor="mountain-select" className="form-label fw-semibold">
        Choose a Mountain:
      </label>
      <select
        id="mountain-select"
        className="form-select form-select-lg"
        onChange={handleChange}
        value={selectedMountain?.name || 'select'}
        aria-label="Select a mountain to view details"
      >
        <option value="select" disabled>
          Select a mountain...
        </option>
        {mountainsData.map((mountain) => (
          <option key={mountain.name} value={mountain.name}>
            {mountain.name} ({mountain.elevation}')
          </option>
        ))}
      </select>
      
      {mountainsData.length > 0 && (
        <small className="form-text text-muted mt-2">
          {mountainsData.length} mountains available
        </small>
      )}
    </div>
  );
});

MountainSelect.displayName = 'MountainSelect';

export default MountainSelect;