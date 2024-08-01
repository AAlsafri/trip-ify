import React, { useState, useEffect } from "react";
import "./UserJourney.css";
import { getDestinationsByUserId } from "../services/destinationService";
import {
  addJournalEntry,
  getJournalEntriesByUserId,
} from "../services/journalServices";

export const UserJourney = ({ currentUser }) => {
  const [destinations, setDestinations] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    date: "",
    title: "",
    body: "",
    user_id: currentUser.id, // Ensure the new entry has the user_id
  });

  useEffect(() => {
    if (currentUser) {
      // Fetch the user's destinations
      getDestinationsByUserId(currentUser.id).then(setDestinations);

      // Fetch the user's journal entries
      getJournalEntriesByUserId(currentUser.id).then(setJournalEntries);
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prevEntry) => ({
      ...prevEntry,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add the new journal entry to the database
    const savedEntry = await addJournalEntry(newEntry);
    setJournalEntries((prevEntries) => [...prevEntries, savedEntry]);
    setNewEntry({
      date: "",
      title: "",
      body: "",
      user_id: currentUser.id,
    });
  };

  return (
    <div className="user-journey-container">
      <div className="user-info">
        <h2>Hello, {currentUser.name}</h2>
        <h3>Your Destinations</h3>
        <ul className="destinations-list">
          {destinations.map((destination) => (
            <li key={destination.id}>
              {destination.name} ({destination.country})
            </li>
          ))}
        </ul>
      </div>
      <div className="journal-entry-form">
        <h3>Log Your Journey</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={newEntry.date}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={newEntry.title}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Note:
            <textarea
              name="body"
              value={newEntry.body}
              onChange={handleInputChange}
              rows="5"
              required
            />
          </label>
          <button type="submit">Add Note</button>
        </form>
        <div className="journal-entries">
          <h3>Your Journal Entries</h3>
          <ul>
            {journalEntries.map((entry, index) => (
              <li key={index}>
                <h4>{entry.title}</h4>
                <p>{entry.body}</p>
                <small>{entry.date}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
