import React from 'react';

export default function Footer() {
  return (
    <footer className="text-center py-4 bg-gray-100 text-gray-600">
      <p>© {new Date().getFullYear()} RoomBooking Hub</p>
      <p>Made with ❤️ by Your Team</p>
    </footer>
  );
}
