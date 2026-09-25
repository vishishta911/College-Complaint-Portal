import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
    doc,
    getDoc,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import {
    auth,
    db
} from "./firebase.js";


// =====================================
// AUTH + ADMIN CHECK
// =====================================

let allComplaints = [];


onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href =
            "index.html";

        return;
    }


    try {

        const userRef =
            doc(db, "users", user.uid);

        const userSnapshot =
            await getDoc(userRef);


        if (
            !userSnapshot.exists()
            ||
            userSnapshot.data().role !== "admin"
        ) {

            alert(
                "Access denied. Administrator privileges required."
            );

            window.location.href =
                "dashboard.html";

            return;
        }


        // Display admin information

        document.getElementById(
            "adminName"
        ).textContent =
            user.displayName || "Admin";


        document.getElementById(
            "adminPhoto"
        ).src =
            user.photoURL ||
            "https://ui-avatars.com/api/?name=Admin";


        // Load complaints

        await loadAllComplaints();


    } catch (error) {

        console.error(
            "Admin verification failed:",
            error
        );

        alert(
            "Unable to verify administrator access."
        );

        window.location.href =
            "dashboard.html";

    }

});


// =====================================
// LOAD ALL COMPLAINTS
// =====================================

async function loadAllComplaints() {

    try {

        const complaintsSnapshot =
            await getDocs(
                collection(
                    db,
                    "complaints"
                )
            );


        allComplaints = [];


        complaintsSnapshot.forEach(
            (docSnapshot) => {

                allComplaints.push({

                    id: docSnapshot.id,

                    ...docSnapshot.data()

                });

            }
        );


        updateStatistics();

        displayComplaints(
            allComplaints
        );


    } catch (error) {

        console.error(
            "Error loading complaints:",
            error
        );

    }

}


// =====================================
// STATISTICS
// =====================================

function updateStatistics() {

    const total =
        allComplaints.length;


    const pending =
        allComplaints.filter(
            complaint =>
                complaint.status === "Pending"
        ).length;


    const review =
        allComplaints.filter(
            complaint =>
                complaint.status === "Under Review"
        ).length;


    const resolved =
        allComplaints.filter(
            complaint =>
                complaint.status === "Resolved"
        ).length;


    document.getElementById(
        "adminTotal"
    ).textContent = total;


    document.getElementById(
        "adminPending"
    ).textContent = pending;


    document.getElementById(
        "adminReview"
    ).textContent = review;


    document.getElementById(
        "adminResolved"
    ).textContent = resolved;

}


// =====================================
// DISPLAY COMPLAINTS
// =====================================

function displayComplaints(
    complaints
) {

    const container =
        document.getElementById(
            "adminComplaintsList"
        );


    container.innerHTML = "";


    if (complaints.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    📋
                </div>

                <h3>
                    No complaints found
                </h3>

                <p>
                    There are no complaints matching
                    the selected filters.
                </p>

            </div>

        `;

        return;
    }


    complaints.forEach(
        (complaint) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "admin-complaint-card";


            const complaintId =
                "CMP-" +
                complaint.id
                    .substring(0, 8)
                    .toUpperCase();


            let statusClass =
                "pending";


            if (
                complaint.status ===
                "Under Review"
            ) {

                statusClass =
                    "under-review";

            }


            if (
                complaint.status ===
                "Resolved"
            ) {

                statusClass =
                    "resolved";

            }


            let dateText =
                "Date unavailable";


            if (
                complaint.createdAt
            ) {

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


            card.innerHTML = `

                <div class="admin-complaint-top">

                    <div>

                        <span class="complaint-id">
                            ${complaintId}
                        </span>

                        <h3>
                            ${escapeHtml(
                                complaint.title
                            )}
                        </h3>

                    </div>

                    <span class="status ${statusClass}">
                        ${complaint.status}
                    </span>

                </div>


                <div class="admin-complaint-details">

                    <p>
                        <strong>Student:</strong>
                        ${escapeHtml(
                            complaint.studentName
                        )}
                    </p>

                    <p>
                        <strong>Category:</strong>
                        ${escapeHtml(
                            complaint.category
                        )}
                    </p>

                    <p>
                        <strong>Submitted:</strong>
                        ${dateText}
                    </p>

                </div>


                <button
                    class="secondary-button"
                    onclick="viewComplaint('${complaint.id}')">

                    View & Manage

                </button>

            `;


            container.appendChild(
                card
            );

        }
    );

}


// =====================================
// FILTERS
// =====================================

function applyFilters() {

    const search =
        document.getElementById(
            "searchInput"
        ).value
        .toLowerCase();


    const status =
        document.getElementById(
            "statusFilter"
        ).value;


    const category =
        document.getElementById(
            "categoryFilter"
        ).value;


    const filtered =
        allComplaints.filter(
            complaint => {

                const matchesSearch =
                    !search
                    ||
                    complaint.title
                        .toLowerCase()
                        .includes(search)
                    ||
                    complaint.studentName
                        .toLowerCase()
                        .includes(search)
                    ||
                    complaint.category
                        .toLowerCase()
                        .includes(search);


                const matchesStatus =
                    status === "All"
                    ||
                    complaint.status === status;


                const matchesCategory =
                    category === "All"
                    ||
                    complaint.category === category;


                return (
                    matchesSearch
                    &&
                    matchesStatus
                    &&
                    matchesCategory
                );

            }
        );


    displayComplaints(
        filtered
    );

}


document.getElementById(
    "searchInput"
).addEventListener(
    "input",
    applyFilters
);


document.getElementById(
    "statusFilter"
).addEventListener(
    "change",
    applyFilters
);


document.getElementById(
    "categoryFilter"
).addEventListener(
    "change",
    applyFilters
);


// =====================================
// VIEW COMPLAINT
// =====================================

function viewComplaint(id) {

    window.location.href =
        `admin-complaint.html?id=${id}`;

}


window.viewComplaint =
    viewComplaint;


// =====================================
// LOGOUT
// =====================================

async function logoutAdmin() {

    await signOut(auth);

    window.location.href =
        "index.html";

}


window.logoutAdmin =
    logoutAdmin;


// =====================================
// HTML ESCAPING
// =====================================

function escapeHtml(value) {

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