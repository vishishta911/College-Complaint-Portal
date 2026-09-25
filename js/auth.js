import {
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import {
    auth,
    googleProvider,
    db
} from "./firebase.js";


// =====================================
// GOOGLE LOGIN
// =====================================

async function loginWithGoogle() {

    const loginButton =
        document.getElementById("googleLogin");


    try {

        loginButton.disabled = true;

        loginButton.innerHTML =
            "Signing in...";


        // Google authentication
        const result =
            await signInWithPopup(
                auth,
                googleProvider
            );


        const user =
            result.user;


        console.log(
            "Authenticated user:",
            user.uid
        );


        // User document
        const userRef =
            doc(
                db,
                "users",
                user.uid
            );


        const userSnapshot =
            await getDoc(userRef);


        // =================================
        // FIRST-TIME USER
        // =================================

        if (!userSnapshot.exists()) {

            await setDoc(
                userRef,
                {

                    name:
                        user.displayName ||
                        "Student",

                    email:
                        user.email,

                    photoURL:
                        user.photoURL ||
                        "",

                    role:
                        "student",

                    createdAt:
                        serverTimestamp()

                }
            );


            // New users are students
            window.location.href =
                "dashboard.html";

            return;
        }


        // =================================
        // EXISTING USER
        // =================================

        const userData =
            userSnapshot.data();


        const role =
            userData.role;


        console.log(
            "User role:",
            role
        );


        // =================================
        // ROLE-BASED REDIRECT
        // =================================

        if (role === "admin") {

            window.location.href =
                "admin.html";

        }

        else {

            window.location.href =
                "dashboard.html";

        }


    } catch (error) {

        console.error(
            "Login error:",
            error
        );


        alert(
            "Login failed.\n\n" +
            "Error code: " +
            error.code +
            "\n\n" +
            "Message: " +
            error.message
        );


        loginButton.disabled = false;

        loginButton.innerHTML =
            "Continue with Google";

    }

}


// =====================================
// LOGOUT
// =====================================

async function logoutUser() {

    try {

        await signOut(auth);

        window.location.href =
            "index.html";

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

    }

}


window.loginWithGoogle =
    loginWithGoogle;


window.logoutUser =
    logoutUser;