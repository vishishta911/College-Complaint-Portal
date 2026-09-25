import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import {
    auth,
    db
} from "./firebase.js";


// =====================================
// GET COMPLAINT ID
// =====================================

const params =
    new URLSearchParams(
        window.location.search
    );


const complaintId =
    params.get("id");


// =====================================
// AUTHENTICATION
// =====================================

onAuthStateChanged(
    auth,
    async (user) => {

        if (!user) {

            window.location.href =
                "index.html";

            return;
        }


        if (!complaintId) {

            alert(
                "Complaint not found."
            );

            window.location.href =
                "dashboard.html";

            return;
        }


        await loadComplaint(
            user.uid
        );

    }
);


// =====================================
// LOAD COMPLAINT
// =====================================

async function loadComplaint(
    userId
) {

    try {

        const complaintRef =
            doc(
                db,
                "complaints",
                complaintId
            );


        const snapshot =
            await getDoc(
                complaintRef
            );


        if (!snapshot.exists()) {

            alert(
                "Complaint does not exist."
            );

            window.location.href =
                "dashboard.html";

            return;
        }


        const complaint =
            snapshot.data();


        // Security check in UI
        // Firestore rules also enforce this.

        if (
            complaint.studentId !==
            userId
        ) {

            alert(
                "You are not authorized to view this complaint."
            );

            window.location.href =
                "dashboard.html";

            return;
        }


        document.getElementById(
            "loadingState"
        ).style.display =
            "none";


        document.getElementById(
            "complaintDetails"
        ).style.display =
            "block";


        // ID

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

        updateStatusBadge(
            complaint.status
        );


        // Dates

        if (complaint.createdAt) {

            document.getElementById(
                "submittedDate"
            ).textContent =
                formatDate(
                    complaint.createdAt
                );

        }


        if (complaint.updatedAt) {

            document.getElementById(
                "updatedDate"
            ).textContent =
                formatDate(
                    complaint.updatedAt
                );

        }


        // Admin response

        displayResponse(
            complaint.adminResponse
        );


    } catch (error) {

        console.error(
            "Error loading complaint:",
            error
        );

        alert(
            "Unable to load complaint."
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


    if (
        status === "Pending"
    ) {

        badge.classList.add(
            "pending"
        );

    }


    if (
        status === "Under Review"
    ) {

        badge.classList.add(
            "under-review"
        );

    }


    if (
        status === "Resolved"
    ) {

        badge.classList.add(
            "resolved"
        );

    }

}


// =====================================
// ADMIN RESPONSE
// =====================================

function displayResponse(
    response
) {

    const container =
        document.getElementById(
            "responseContent"
        );


    if (!response) {

        return;
    }


    container.innerHTML = `

        <div class="admin-response">

            <span>
                Administration Response
            </span>

            <p>
                ${escapeHtml(response)}
            </p>

        </div>

    `;

}


// =====================================
// FORMAT DATE
// =====================================

function formatDate(
    timestamp
) {

    return timestamp
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


// =====================================
// ESCAPE HTML
// =====================================

function escapeHtml(
    value
) {

    if (!value) {
        return "";
    }


    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


// =====================================
// BACK TO DASHBOARD
// =====================================

function goBackToDashboard() {

    window.location.href =
        "dashboard.html";

}


window.goBackToDashboard =
    goBackToDashboard;