import Box from './Box';
import React, {useState} from 'react'

function Canvas() {

    function returnRandomColor(existingColor) {


        const allColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'brown', 'black', 'white'];
        const availableColors = [];

        for (let i = 0; i < allColors.length; i++) {
            if (allColors[i] !== existingColor) {
                availableColors.push(allColors[i]);
            }
        }

        let newColor = availableColors[Math.floor(Math.random() * availableColors.length)];

        return newColor;
    }


    function getRelativePosition(mouseX, mouseY, canvasWidth, canvasHeight, targetXStart, targetXEnd, targetYStart, targetYEnd) {

        console.log('mouseX', mouseX, 'containerWidth', canvasWidth);

        let orientation = (canvasWidth > canvasHeight ? 'landscape' : 'portrait');
        let clickRelative = ''

        if (orientation === 'landscape') {
            clickRelative = (mouseX < (targetXStart + ((targetXEnd - targetXStart) / 2)) ? 'left' : 'right');
        } else {
            clickRelative = (mouseY < (targetYStart + ((targetYEnd - targetYStart) / 2)) ? 'top' : 'bottom');
        }
        
        return clickRelative;

    }

    function renderBoxes(affectedBox, existingWidth, existingHeight, existingColor, newColor, newPosition) {

        console.log(newPosition);

        if (newPosition === 'left') {
            let leftBox = document.createElement('div');
            leftBox.className = 'left'; //need to remove these in future and replace with apporpriate css
            leftBox.style.backgroundColor = newColor;
            leftBox.onClick = addBox;


            let rightBox = document.createElement('div');
            rightBox.className = 'right';
            rightBox.style.backgroundColor = existingColor;
            rightBox.onClick = addBox;

            affectedBox.append(leftBox);
            affectedBox.append(rightBox);

            return
        }

        if (newPosition === 'right') {
            let leftBox = document.createElement('div');
            leftBox.className = 'left'; //need to remove these in future and replace with apporpriate css
            leftBox.style.backgroundColor = existingColor;
            leftBox.onClick = addBox;


            let rightBox = document.createElement('div');
            rightBox.className = 'right';
            rightBox.style.backgroundColor = newColor;
            rightBox.onClick = addBox;

            affectedBox.append(leftBox);
            affectedBox.append(rightBox);


            return
        }
        
        if (newPosition === 'top') {

            let topBox = document.createElement('div');
            topBox.className = 'top';
            topBox.style.backgroundColor = newColor;
            topBox.onClick = addBox;

            let bottomBox = document.createElement('div');
            bottomBox.className = 'bottom';
            bottomBox.style.backgroundColor = existingColor;
            bottomBox.onClick = addBox;

            affectedBox.append(topBox);
            affectedBox.append(bottomBox);


            return
        }

        if (newPosition === 'bottom') { //bottom
            let topBox = document.createElement('div');
            topBox.className = 'top';
            topBox.style.backgroundColor = existingColor;
            topBox.onClick = addBox;

            let bottomBox = document.createElement('div');
            bottomBox.className = 'bottom';
            bottomBox.style.backgroundColor = newColor;
            bottomBox.onClick = addBox;

            affectedBox.append(topBox);
            affectedBox.append(bottomBox);

            return
        }
    }

    function addBox(e) {

        let existingColor = ''

        if (!e.target.style.backgroundColor) {
            existingColor = 'white';
        } else {
            existingColor = e.target.style.backgroundColor;
        }

        let newColor = returnRandomColor(existingColor);

        let boundingData = e.target.getBoundingClientRect();
        console.log(boundingData);

        let relativePosition = getRelativePosition(e.clientX, e.clientY, boundingData.width, boundingData.height, boundingData.left, boundingData.right, boundingData.top, boundingData.bottom);

        renderBoxes(e.target, boundingData.width, boundingData.height, existingColor, newColor, relativePosition)

    }

    return (
        <div className="outside" onClick={addBox}>

        </div>
    )

}

export default Canvas;