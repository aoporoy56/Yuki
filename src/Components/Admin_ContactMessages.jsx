import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import {
  db,
  archiveContactSubmission,
  deleteContactSubmission,
} from "../firebase";
import { Mail, Archive, Trash2 } from "lucide-react";

const SectionHeader = ({ icon: Icon, title, count }) => (
  <div className="flex items-center space-x-3 mb-6">
    <div className="bg-red-50 p-2 rounded-lg">
      <Icon className="h-6 w-6 text-red-700" />
    </div>
    <div>
      <h2 className="text-2xl font-bold text-red-900">{title}</h2>
      <p className="text-sm text-gray-600">
        {count} message{count !== 1 ? "s" : ""}
      </p>
    </div>
  </div>
);

const ContactSubmissionItem = ({
  submission,
  onArchive,
  onDelete,
  isArchived,
}) => (
  <div className="p-6 hover:bg-red-50 transition-colors duration-200">
    <div className="flex justify-between items-start gap-4">
      <div className="space-y-4 flex-1">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Full Name
            </label>
            <p className="font-semibold text-lg text-red-900">
              {submission.firstName} {submission.lastName}
            </p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Email Address
            </label>
            <p className="text-sm font-medium text-gray-600">
              {submission.email}
            </p>
          </div>
          {submission.phone && (
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Phone Number
              </label>
              <p className="text-sm font-medium text-gray-600">
                {submission.phone}
              </p>
            </div>
          )}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Submitted
            </label>
            <p className="text-sm font-medium text-gray-600">
              {isArchived
                ? `Archived: ${submission.archivedAt.toDate().toLocaleString()}`
                : submission.createdAt.toDate().toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <label className="block text-xs font-medium text-gray-500 mb-2">
            Message Content
          </label>
          <p className="text-base text-gray-800 whitespace-pre-wrap leading-relaxed">
            {submission.message}
          </p>
        </div>

        {submission.subject && (
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Subject
            </label>
            <p className="text-sm font-medium text-gray-700">
              {submission.subject}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        {!isArchived && (
          <button
            onClick={() => onArchive(submission.id)}
            className="flex items-center space-x-2 p-2 text-gray-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all duration-200"
            title="Archive message"
          >
            <Archive className="h-5 w-5" />
            <span className="text-sm">Archive</span>
          </button>
        )}
        <button
          onClick={() => onDelete(submission.id)}
          className="flex items-center space-x-2 p-2 text-gray-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all duration-200"
          title="Delete message"
        >
          <Trash2 className="h-5 w-5" />
          <span className="text-sm">Delete</span>
        </button>
      </div>
    </div>
  </div>
);

const ContactMessages = () => {
  const [contactSubmissions, setContactSubmissions] = useState([]);
  const [archivedSubmissions, setArchivedSubmissions] = useState([]);

  useEffect(() => {
    const unsubscribers = [];

    // Fetch active contact submissions
    const activeSubmissionsQuery = query(
      collection(db, "contact-submissions"),
      where("archived", "==", false),
      orderBy("createdAt", "desc")
    );
    unsubscribers.push(
      onSnapshot(activeSubmissionsQuery, (snapshot) => {
        const submissionsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContactSubmissions(submissionsData);
      })
    );

    // Fetch archived contact submissions
    const archivedSubmissionsQuery = query(
      collection(db, "contact-submissions"),
      where("archived", "==", true),
      orderBy("createdAt", "desc")
    );
    unsubscribers.push(
      onSnapshot(archivedSubmissionsQuery, (snapshot) => {
        const archivedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArchivedSubmissions(archivedData);
      })
    );

    return () => unsubscribers.forEach((unsubscribe) => unsubscribe());
  }, []);

  const handleArchiveSubmission = async (submissionId) => {
    try {
      await archiveContactSubmission(submissionId);
    } catch (error) {
      console.error("Error archiving submission:", error);
    }
  };

  const handleDeleteSubmission = async (submissionId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this message? This action cannot be undone."
      )
    ) {
      try {
        await deleteContactSubmission(submissionId);
      } catch (error) {
        console.error("Error deleting submission:", error);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Active Submissions */}
      <div>
        <SectionHeader
          icon={Mail}
          title="Contact Submissions"
          count={contactSubmissions.length}
        />
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-red-100">
          {contactSubmissions.length === 0 ? (
            <div className="p-8 text-center">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 text-lg">No new messages</p>
            </div>
          ) : (
            <div className="divide-y divide-red-100">
              {contactSubmissions.map((submission) => (
                <ContactSubmissionItem
                  key={submission.id}
                  submission={submission}
                  onArchive={handleArchiveSubmission}
                  onDelete={handleDeleteSubmission}
                  isArchived={false}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Archived Submissions */}
      <div>
        <SectionHeader
          icon={Archive}
          title="Archived Messages"
          count={archivedSubmissions.length}
        />
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          {archivedSubmissions.length === 0 ? (
            <div className="p-8 text-center">
              <Archive className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 text-lg">No archived messages</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {archivedSubmissions.map((submission) => (
                <ContactSubmissionItem
                  key={submission.id}
                  submission={submission}
                  onDelete={handleDeleteSubmission}
                  isArchived={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { ContactMessages };
