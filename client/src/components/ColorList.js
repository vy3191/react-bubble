import React, { useState } from "react";
import {axiosWithAuth} from '../auth/axiosWithAuth';



const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const initialColor = { color: "", code: { hex: "" } };
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(!editing);
    setColorToEdit(color);
  };

  const saveEdit = (e,id) => {
    
    e.preventDefault();
    console.log(id)
    console.log(colorToEdit)
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    const updatedColors = colors.filter( color => color.id != id);
    console.log(updatedColors)
    axiosWithAuth().put(`/api/colors/${id}`, colorToEdit )
                   .then(response => {
                      console.log(response);
                      setColorToEdit(response.data)
                      updateColors([...updatedColors,colorToEdit]);
                   })
                   .catch(err => {
                     console.log(err);
                   })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={(e) => {saveEdit(e, colorToEdit.id)}}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
