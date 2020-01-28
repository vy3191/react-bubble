import React, { useState } from "react";
import {axiosWithAuth} from '../auth/axiosWithAuth';



const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const initialColor = { color: "", code: { hex: "" } };
  const [editing, setEditing] = useState(false);
  const [addColorFlag, setAddColorFlag] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(!editing);
    setColorToEdit(color);
  };
  
  const toggleColorFlag = () => {
     setAddColorFlag(!addColorFlag);
     setColorToEdit(initialColor);
  }
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
                      if(response.status === 200) {
                      updateColors([...updatedColors, response.data]);
                      setEditing(!editing);
                      }
                   })
                   .catch(err => {
                     console.log(err);
                   });
                   
  };

  const deleteColor = (id) => {
    // make a delete request to delete this color
    
    axiosWithAuth().delete(`/api/colors/${id}`)
                   .then( response => {                     
                        updateColors(colors.filter( color => color.id != id));                      
                   })
                   .catch( err => {
                      console.log(err);
                   })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(colorToEdit)
     if(!colorToEdit.color || !colorToEdit.code.hex) return;
     axiosWithAuth().post('/api/colors', colorToEdit)
                    .then( response => {
                      console.log(response);
                      updateColors([...response.data]);
                      setColorToEdit(initialColor);
                    })
                    .catch(err => {
                       console.log(err);
                    });
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color.id)
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
      <hr />
      <p style={{cursor:'pointer'}} onClick={toggleColorFlag }>{!addColorFlag ? "Add a New Color" : "Cancle adding a color"}</p>
      <hr/>
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
      {/* stretch - build another form here to add a color */}
      {addColorFlag && (
        <form onSubmit={handleSubmit}>
          <legend>Add New Color</legend>
          <label>
            color name: <input onChange={e => setColorToEdit({ ...colorToEdit, color: e.target.value }) }
                               value={colorToEdit.color}
                        />
          </label>
          <label>
            hex code: <input onChange={e =>  setColorToEdit({ ...colorToEdit,code: { hex: e.target.value } })}
                             value={colorToEdit.code.hex}
                      />
          </label>
          <div className="button-row">
            <button type="submit">Add New Color</button>
            <button onClick={() => toggleColorFlag(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      
    </div>
  );
};

export default ColorList;
