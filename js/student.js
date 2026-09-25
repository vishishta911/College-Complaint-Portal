import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
    collection,
    query,
    where,
    getDocs,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import {
    auth,
    db
} from "./firebase.js";


// =====================================
// AUTHENTICATION
// =====================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "index.html";

        return;
    }

    displayUser(user);

    await loadComplaints(user.uid);

});


// =====================================
// DISPLAY USER
// =====================================

function displayUser(user) {

    const name =
        user.displayName || "Student";

    const email =
        user.email || "";

    const photo =
        user.photoURL ||
        "https://ui-avatars.com/api/?name=Student";


    document.getElementById("userName")
        .textContent = name;

    document.getElementById("userEmail")
        .textContent = email;

    document.getElementById("welcomeName")
        .textContent =
        name.split(" ")[0];

    document.getElementById("userPhoto")
        .src = photo;

}


// =====================================
// LOAD COMPLAINTS
// =====================================

async function loadComplaints(userId) {

    try {

        const complaintsRef =
            collection(db, "complaints");


        const complaintsQuery =
            query(
                complaintsRef,
                where(
                    "studentId",
                    "==",
                    userId
                )
            );


        const snapshot =
            await getDocs(
                complaintsQuery
            );


        const complaints = [];


        snapshot.forEach((doc) => {

            complaints.push({
                id: doc.id,
                ...doc.data()
            });

        });


        // Sort newest first
        complaints.sort((a, b) => {

            const dateA =
                a.createdAt?.toMillis?.() || 0;

            const dateB =
                b.createdAt?.toMillis?.() || 0;

            return dateB - dateA;

        });


        let total = 0;
        let pending = 0;
        let review = 0;
        let resolved = 0;


        complaints.forEach((complaint) => {

            total++;


            if (
                complaint.status ===
                "Pending"
            ) {

                pending++;

            }


            if (
                complaint.status ===
                "Under Review"
            ) {

                review++;

            }


            if (
                complaint.status ===
                "Resolved"
            ) {

                resolved++;

            }

        });


        document.getElementById(
            "totalComplaints"
        ).textContent = total;


        document.getElementById(
            "pendingComplaints"
        ).textContent = pending;


        document.getElementById(
            "reviewComplaints"
        ).textContent = review;


        document.getElementById(
            "resolvedComplaints"
        ).textContent = resolved;


        if (complaints.length > 0) {

            displayComplaints(
                complaints
            );

        }


    } catch (error) {

        console.error(
            "Error loading complaints:",
            error
        );

        alert(
            "Unable to load complaints. " +
            error.message
        );

    }

}


// =====================================
// DISPLAY COMPLAINTS
// =====================================

function displayComplaints(complaints) {

    const container =
        document.getElementById("complaintsList");

    container.innerHTML = "";


    complaints.forEach((complaint) => {

        const card =
            document.createElement("div");

        card.className = "complaint-card";


        const complaintId =
            "CMP-" +
            complaint.id
                .substring(0, 8)
                .toUpperCase();


        let statusClass = "pending";

        if (complaint.status === "Under Review") {
            statusClass = "under-review";
        }

        if (complaint.status === "Resolved") {
            statusClass = "resolved";
        }


        let dateText = "Date unavailable";

        if (complaint.createdAt) {

            dateText =
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


        const response =
            complaint.adminResponse
                ? `
                    <div class="admin-response">

                        <span>
                            Admin Response
                        </span>

                        <p>
                            ${escapeHtml(
                                complaint.adminResponse
                            )}
                        </p>

                    </div>
                  `
                : `
                    <div class="no-response">
                        No response yet.
                    </div>
                  `;


        card.innerHTML = `

            <div class="complaint-main">

                <div>

                    <span class="complaint-id">
                        ${complaintId}
                    </span>

                    <h3>
                        ${escapeHtml(
                            complaint.title
                        )}
                    </h3>

                    <p>
                        ${escapeHtml(
                            complaint.category
                        )}
                        &nbsp; • &nbsp;
                        Submitted ${dateText}
                    </p>

                </div>


                <span class="status ${statusClass}">
                    ${escapeHtml(
                        complaint.status
                    )}
                </span>

            </div>


            <div class="complaint-card-footer">

                <div>

                    ${
                        complaint.adminResponse

                        ? `
                            <span class="response-indicator">
                                ✓ Admin response available
                            </span>
                        `

                        : `
                            <span class="no-response-small">
                                Awaiting admin response
                            </span>
                        `
                    }

                </div>


                <button
                    class="secondary-button"
                    onclick="viewComplaint('${complaint.id}')">

                    View Details →

                </button>

            </div>

        `;


        container.appendChild(card);

    });
}


// =====================================
// BASIC HTML ESCAPING
// =====================================

function escapeHtml(value) {

    if (!value) {
        return "";
    }


    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


// =====================================
// OPEN COMPLAINT FORM
// =====================================

function openComplaintForm() {

    window.location.href =
        "complaint.html";

}


window.openComplaintForm =
    openComplaintForm;

function viewComplaint(id) {

    window.location.href =
        `student-complaint.html?id=${id}`;

}


window.viewComplaint =
    viewComplaint;