import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import {
    auth,
    db
} from "./firebase.js";


// =====================================
// CHECK LOGIN
// =====================================

let currentUser = null;


onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "index.html";

        return;
    }

    currentUser = user;

});


// =====================================
// SUBMIT COMPLAINT
// =====================================

document
    .getElementById("complaintForm")
    .addEventListener("submit", async (event) => {

        event.preventDefault();


        if (!currentUser) {

            alert("Please sign in first.");

            return;
        }


        const category =
            document.getElementById("category").value;

        const title =
            document.getElementById("title").value.trim();

        const description =
            document
                .getElementById("description")
                .value
                .trim();


        if (!category || !title || !description) {

            alert(
                "Please complete all required fields."
            );

            return;
        }


        const submitButton =
            document.getElementById("submitComplaint");


        try {

            submitButton.disabled = true;

            submitButton.textContent =
                "Submitting...";


            // Create complaint in Firestore
            const complaintRef =
                await addDoc(
                    collection(db, "complaints"),
                    {

                        studentId:
                            currentUser.uid,

                        studentName:
                            currentUser.displayName ||
                            "Student",

                        studentEmail:
                            currentUser.email,

                        category:
                            category,

                        title:
                            title,

                        description:
                            description,

                        status:
                            "Pending",

                        adminResponse:
                            "",

                        createdAt:
                            serverTimestamp(),

                        updatedAt:
                            serverTimestamp()

                    }
                );


            // Show success message
            document
                .getElementById("complaintForm")
                .style.display = "none";


            document
                .getElementById("successMessage")
                .style.display = "block";


            document
                .getElementById("complaintId")
                .textContent =
                    "CMP-" +
                    complaintRef.id
                        .substring(0, 8)
                        .toUpperCase();


        } catch (error) {

            console.error(
                "Complaint submission error:",
                error
            );


            alert(
                "Unable to submit complaint.\n\n" +
                error.message
            );


            submitButton.disabled = false;

            submitButton.textContent =
                "Submit Complaint";

        }

    });


// =====================================
// GO TO DASHBOARD
// =====================================

function goToDashboard() {

    window.location.href =
        "dashboard.html";

}


window.goToDashboard =
    goToDashboard;