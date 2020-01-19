import React from 'react';
import TodoItem from './empty.js';

export default function CheckBoxes() {
  return (
    <div>
      <TodoItem
        name="Joint Flange"
        imageUrl='https://cdn.hardhatengineer.com/wp-content/uploads/2017/04/Lap-Joint-Flange-e1557199315693.jpg'
        checked={true}
      />
      <TodoItem
        name="Flange Face Types"
        imageUrl='https://cdn.hardhatengineer.com/wp-content/uploads/2017/04/Flange-Face-Types.jpg'
        checked={false}
      />
      <TodoItem
        name="Flange Face"
        imageUrl='https://cdn.hardhatengineer.com/wp-content/uploads/2017/04/Flange-Face.jpg'
      />
      <TodoItem
        name="Flange Inspection"
        imageUrl='https://cdn.hardhatengineer.com/wp-content/uploads/2017/04/Flange-Inspection.jpg'
      />
    </div>
  )
}