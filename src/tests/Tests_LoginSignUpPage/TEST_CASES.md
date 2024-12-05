# Test Cases for Sign-Up Component

This document describes the test cases for the `SignUp` component, ensuring its functionality and user interface elements work as intended.

---

## **Test Case 1: Render Sign-Up Form**

### **Objective:**
To verify that the sign-up form renders all necessary elements correctly.

### **Steps:**
1. Render the `SignUp` component.
2. Check for the presence of the following:
   - **Header**: "Sign Up".
   - **Inputs**:
     - `Create Username`.
     - `Create Password`.
   - **Button**: "Create Account".
   - **Link**: "Back to Log In".

### **Expected Result:**
All elements are present and rendered correctly:
- "Sign Up" header is displayed.
- Input fields for username and password are visible.
- A button labeled "Create Account" is present.
- A link labeled "Back to Log In" is displayed.

---

## **Test Case 2: "Back to Log In" Functionality**

### **Objective:**
To ensure that the `Back to Log In` link functions correctly and calls the provided `setShowSignUp` function.

### **Steps:**
1. Render the `SignUp` component with a mock `setShowSignUp` function.
2. Click the `Back to Log In` link.

### **Expected Result:**
- The `setShowSignUp` mock function is called when the `Back to Log In` link is clicked.

---

## **Notes:**
- These tests are written using React Testing Library and Jest.
- Mock functions are used to simulate the behavior of the `setShowSignUp` callback.
