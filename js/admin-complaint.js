import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
    doc,
    getDoc,
    updateDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import {
    auth,
    db
} from "./firebase.js";


// =====================================
// GET COMPLAINT ID FROM URL
// =====================================

const urlParams =
    new URLSearchParams(
        window.location.search
    );


const complaintId =
    urlParams.get("id");


// =====================================
// CHECK ADMIN AUTHENTICATION
// =====================================

let complaintRef = null;


onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href =
            "index.html";

        return;
    }


    try {

        // Check user role

        const userRef =
            doc(
                db,
                "users",
                user.uid
            );


        const userSnapshot =
            await getDoc(userRef);


        if (
            !userSnapshot.exists()
            ||
            userSnapshot.data().role !== "admin"
        ) {

            alert(
                "Administrator access required."
            );

            window.location.href =
                "dashboard.html";

            return;
        }


        // Validate complaint ID

        if (!complaintId) {

            alert(
                "Complaint not found."
            );

            window.location.href =
                "admin.html";

            return;
        }


        complaintRef =
            doc(
                db,
                "complaints",
                complaintId
            );


        await loadComplaint();


    } catch (error) {

        console.error(
            "Admin verification error:",
            error
        );

        alert(
            "Unable to load complaint."
        );

        window.location.href =
            "admin.html";

    }

});


// =====================================
// LOAD COMPLAINT
// =====================================

async function loadComplaint() {

    const snapshot =
        await getDoc(
            complaintRef
        );


    if (!snapshot.exists()) {

        alert(
            "Complaint does not exist."
        );

        window.location.href =
            "admin.html";

        return;
    }


    const complaint =
        snapshot.data();


    // Hide loading

    document.getElementById(
        "loadingState"
    ).style.display =
        "none";


    document.getElementById(
        "complaintDetails"
    ).style.display =
        "block";


    // Complaint ID

    document.getElementById(
        "complaintId"
    ).textContent =
        "CMP-" +
        complaintId
            .substring(0, 8)
            .toUpperCase();


    // Title

    document.getElementById(
        "complaintTitle"
    ).textContent =
        complaint.title;


    // Student

    document.getElementById(
        "studentName"
    ).textContent =
        complaint.studentName;


    document.getElementById(
        "studentEmail"
    ).textContent =
        complaint.studentEmail;


    // Category

    document.getElementById(
        "category"
    ).textContent =
        complaint.category;


    // Description

    document.getElementById(
        "description"
    ).textContent =
        complaint.description;


    // Status

    document.getElementById(
        "status"
    ).value =
        complaint.status;


    updateStatusBadge(
        complaint.status
    );


    // Admin response

    document.getElementById(
        "adminResponse"
    ).value =
        complaint.adminResponse || "";


    // Date

    if (complaint.createdAt) {

        document.getElementById(
            "submittedDate"
        ).textContent =
            complaint.createdAt
                .toDate()
                .toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    }
                );

    }

}


// =====================================
// STATUS BADGE
// =====================================

function updateStatusBadge(
    status
) {

    const badge =
        document.getElementById(
            "currentStatus"
        );


    badge.textContent =
        status;


    badge.className =
        "status";


    if (status === "Pending") {

        badge.classList.add(
            "pending"
        );

    } else if (
        status === "Under Review"
    ) {

        badge.classList.add(
            "under-review"
        );

    } else if (
        status === "Resolved"
    ) {

        badge.classList.add(
            "resolved"
        );

    }

}


// =====================================
// UPDATE COMPLAINT
// =====================================

document
    .getElementById("updateButton")
    .addEventListener(
        "click",
        async () => {

            const status =
                document.getElementById(
                    "status"
                ).value;


            const adminResponse =
                document.getElementById(
                    "adminResponse"
                ).value.trim();


            const button =
                document.getElementById(
                    "updateButton"
                );


            try {

                button.disabled =
                    true;

                button.textContent =
                    "Updating...";


                await updateDoc(
                    complaintRef,
                    {

                        status:
                            status,

                        adminResponse:
                            adminResponse,

                        updatedAt:
                            serverTimestamp()

                    }
                );


                updateStatusBadge(
                    status
                );


                const message =
                    document.getElementById(
                        "updateMessage"
                    );


                message.style.display =
                    "block";


                setTimeout(() => {

                    message.style.display =
                        "none";

                }, 3000);


            } catch (error) {

                console.error(
                    "Update error:",
                    error
                );


                alert(
                    "Unable to update complaint.\n\n" +
                    error.message
                );

            } finally {

                button.disabled =
                    false;

                button.textContent =
                    "Update Complaint";

            }

        }
    );


// =====================================
// BACK TO ADMIN DASHBOARD
// =====================================

function goBackToAdmin() {

    window.location.href =
        "admin.html";

}


window.goBackToAdmin =
    goBackToAdmin;