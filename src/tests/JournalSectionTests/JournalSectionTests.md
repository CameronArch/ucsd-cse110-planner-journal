# Journal Section Component Test Document
The Journal Section Component should have an plus button in the Journal page interface that will bring up a create section menu when clicked. The create section menu should have a textbox for the section title and an option to select the section color using a grid. The submit button on the menu will create a journal section that once clicked will allow the user to type in the section textbox.


## Unit Tests

## Test Suite 1
### Test 1:Section Form Submission
- Gets "+" button from journal interface and clicks it
- Finds the placeholder title "Section Name" and changes it to "Test Title Section" 
- Finds "Select Color" color palette and clicks it, sets color to #ffffff
- Clicks submit button
- Checks if section title is "Test Title Section"
- Clicks section title
- Finds journal textbox with placeholder "Write your Test Title Section entry here..." and changes it to "Test Journaling"
- Checks if "Test Journaling" is in textbox

### Test 2: "Section Change When Clicked on"
Creating Section 1
- Gets "+" button from journal interface and clicks it
- Fills form out with title "Section 1" and color, submits form
- Checks if section title is "Section 1"
- Clicks Section 1 and adds "Journaling Section 1" into journal textbox
- Checks if "Journaling Section 1" is in Section 1's textbox

Creating Section 2
- Gets "+" button from journal interface and clicks it
- Fills form out with title "Section 2" and color, submits form
- Checks if section title is "Section 2"
- Clicks Section 2 and adds "Journaling Section 2" into journal textbox
- Checks if "Journaling Section 2" is in Section 2's textbox

- Refinds Section 1, clicks it, and checks if "Journaling Section 1" is in Section 1's textbox

### Test 3: Error Message When Section Name is Empty
- Finds submit button
- Clicks submit button
- Check that section is not created (notification error)

