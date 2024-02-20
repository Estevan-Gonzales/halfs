import Box from './Box';
import React, {useState} from 'react'

function Canvas() {

    function returnRandomColor(argClass, existingColor) {


        const allColors = ['blue', 'green', 'purple', 'pink', 'orange', 'black', 'red'];
        const availableColors = [];

        for (let i = 0; i < allColors.length; i++) {
            if (allColors[i] !== existingColor) {
                availableColors.push(allColors[i]);
            }
        }

        let newColor = availableColors[Math.floor(Math.random() * availableColors.length)];

        return newColor;
    }


    function getRelativePosition(mouseX, mouseY, canvasWidth, canvasHeight) {

        let orientation = (canvasWidth > canvasHeight ? 'landscape' : 'portrait');
        let clickRelative = ''

        if (orientation === 'landscape') {
            clickRelative = (mouseX < (canvasWidth / 2) ? 'left' : 'right');
        } else {
            clickRelative = (mouseY < (canvasHeight / 2) ? 'top' : 'bottom');
        }
        
        return clickRelative;

    }

    function renderBoxes(affectedBox, existingWidth, existingHeight, existingColor, newColor, newPosition) {
        console.log(existingWidth, existingHeight, existingColor, newColor, newPosition);


        if (newPosition === 'left') {
            let leftBox = document.createElement('div');
            leftBox.className = 'left'; //need to remove these in future and replace with apporpriate css
            leftBox.style.backgroundColor = newColor;
            leftBox.innerText = 'l';
            leftBox.onClick = addBox;


            let rightBox = document.createElement('div');
            rightBox.className = 'right';
            rightBox.style.backgroundColor = existingColor;
            rightBox.onClick = addBox;
            rightBox.innerText = 'r'

            affectedBox.append(leftBox);
            affectedBox.append(rightBox);



            return
        }

        if (newPosition === 'right') {
            let leftBox = document.createElement('div');
            leftBox.className = 'left';
            leftBox.style.backgroundColor = existingColor;
            leftBox.innerText = 'l';
            leftBox.onClick = addBox;

            let rightBox = document.createElement('div');
            rightBox.className = 'right';
            rightBox.style.backgroundColor = newColor;
            rightBox.innerText = 'r';
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

            topBox.innerText = 't';
            bottomBox.innerText = 'b'

            affectedBox.append(topBox);
            affectedBox.append(bottomBox);

            console.log('BOXES');
            console.log(topBox);
            console.log(bottomBox);

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
        console.log('TARGET');

        let existingColor = ''

        if (!e.target.style.backgroundColor) {
            existingColor = 'red';
        } else {
            existingColor = e.target.style.backgroundColor;
        }

        let newColor = returnRandomColor(e.target.className, existingColor);

        let boundingData = e.target.getBoundingClientRect();

        let relativePosition = getRelativePosition(e.clientX, e.clientY, boundingData.width, boundingData.height);

        renderBoxes(e.target, boundingData.width, boundingData.height, existingColor, newColor, relativePosition)

    }

    return (
        <div className="first" onClick={addBox}>

        </div>
    )

}

export default Canvas;