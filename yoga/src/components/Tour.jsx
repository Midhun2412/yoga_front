import React, { useState, useEffect } from 'react';

function ImageComponent() {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    // Make a GET request to the Django backend endpoint that serves the image
    fetch('/your-django-backend-url/image/')
      .then(response => {
        // Check if the response is successful
        if (response.ok) {
          // Convert the response body to blob (binary data)
          return response.blob();
        }
        throw new Error('Network response was not ok.');
      })
      .then(blob => {
        // Convert the blob to a data URL
        const url = URL.createObjectURL(blob);
        // Set the data URL as the image source
        setImageSrc(url);
      })
      .catch(error => {
        console.error('Error fetching image:', error);
      });

    // Clean up resources when the component unmounts
    return () => {
      if (imageSrc) {
        // Revoke the data URL to release resources
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, []); // Run only once when the component mounts

  return (
    <div>
      {imageSrc ? (
        // Display the image if the image source is available
        <img src={imageSrc} alt="Image" />
      ) : (
        // Display a placeholder or loading indicator while the image is being fetched
        <p>Loading image...</p>
      )}
    </div>
  );
}

export default ImageComponent;
