import React, { useState } from 'react';
import jsonFile from '../../assets/workout.json';
import '../styles/Events.css'; // We'll create this CSS file

const Events = () => {
  const { events } = jsonFile;

  // Flatten all events into a single array with category/subcategory info
  const allEvents = [];

  //iterates through the categories to push objects into allEvents
  Object.keys(events).forEach((category) => {
    //iterates through subcategories
    Object.keys(events[category]).forEach((subCategory) => {
      //iterates through each specific event
      events[category][subCategory].forEach((event) => {
        allEvents.push({
          // spread operator, it pushes all properties from each specific event
          ...event,
          // adds category and subcategory to each object
          category,
          subCategory,
          formattedDate: formatDate(event.date),
        });
      });
    });
  });

  // Format date to be more readable
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-UK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <div className='events-container'>
      <div className='events-header'>
        <h1>Upcoming Sporting Events</h1>
        <p className='subtitle'>Find and register for your next challenge</p>
      </div>

      {/* Events Grid */}
      {allEvents.length > 0 ? (
        <div className='events-grid'>
          {allEvents.map((event) => (
            <div
              key={event.eventId}
              className={`event-card ${
                event.registerOpen ? 'registration-open' : 'registration-closed'
              }`}
            >
              <div className='event-card-header'>
                <div className='event-category'>
                  <span className='category-badge'>{event.category}</span>
                  <span className='subcategory-badge'>{event.subCategory}</span>
                </div>
                <div
                  className={`registration-status ${
                    event.registerOpen ? 'open' : 'closed'
                  }`}
                >
                  {event.registerOpen
                    ? 'Registration Open'
                    : 'Registration Closed'}
                </div>
              </div>

              <div className='event-card-body'>
                <h3 className='event-title'>{event.eventName}</h3>
                <div className='event-date'>
                  <span>{event.formattedDate}</span>
                </div>
                <div className='event-id'>
                  <p>Event ID: {event.eventId}</p>
                </div>
              </div>

              <div className='event-card-footer'>
                <button
                  className={`action-button ${
                    event.registerOpen ? 'register-button' : 'details-button'
                  }`}
                  disabled={!event.registerOpen}
                >
                  {event.registerOpen ? 'Register Now' : 'Comming soon'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='no-events'>
          <h3>No events found</h3>
          <p>Try adjusting your filters to see more events.</p>
        </div>
      )}
    </div>
  );
};

export default Events;
