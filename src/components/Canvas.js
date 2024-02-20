import Box from './Box';
import React, {useState} from 'react'

function Canvas() {

    function addBox(e) {

        let colors = ['blue', 'red', 'green', 'purple', 'pink', 'orange', 'black'];
        let selectedColor = colors[Math.floor(Math.random() * colors.length)];

        const box = document.createElement('div');
        box.className = 'second';
        box.style.backgroundColor=selectedColor;
        box.onClick=addBox;
        e.target.append(box);
    }

    return (
        <div className="first" onClick={addBox}>

        </div>
    )

}

export default Canvas;