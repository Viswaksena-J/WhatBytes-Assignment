// Select elements
var paragraph = document.getElementById('modifiable-paragraph');
var textInput = document.getElementById('text-input');
var fontSizeInput = document.getElementById('font-size-input');
var redButton = document.getElementById('red-color');

// Update paragraph text based on the input
textInput.addEventListener('input', function() {
    paragraph.textContent = textInput.value;
});

// Update paragraph font size based on font size input
fontSizeInput.addEventListener('input', function() {
    var fontSize = fontSizeInput.value;
    paragraph.style.fontSize = fontSize + 'px';
});

// Change the paragraph text color to red when the red button is clicked
redButton.addEventListener('click', function() {
    paragraph.style.color = 'red';
});
