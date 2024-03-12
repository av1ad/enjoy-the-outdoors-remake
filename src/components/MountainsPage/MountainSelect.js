import React from 'react';

const MountainSelect = ({ mountainsData, onMountainSelect }) => {
  const handleChange = (e) => {
    const selectedMountain = mountainsData.find(
      (mountain) => mountain.name === e.target.value
    );
    onMountainSelect(selectedMountain);
  };

  return (
    <select
      id="mountain-select"
      className="form-select m-auto"
      onChange={handleChange}
    >
      <option value="select">Select an option</option>
      {mountainsData.map((mountain) => (
        <option key={mountain.name} value={mountain.name}>
          {mountain.name}
        </option>
      ))}
    </select>
  );
};

export default MountainSelect;