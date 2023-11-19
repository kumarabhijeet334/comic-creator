// App.js

import React, { useState, useEffect } from "react";
import "./App.css";

const API_URL =
  "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud";

const App = () => {
  const [comicTexts, setComicTexts] = useState(Array(10).fill(""));
  const [comicImages, setComicImages] = useState([]);

  const handleTextChange = (index, value) => {
    const newComicTexts = [...comicTexts];
    newComicTexts[index] = value;
    setComicTexts(newComicTexts);
  };

  const generateComic = async () => {
  
    try {
      const images = await Promise.all(
        comicTexts.map(async (text) => {
          const response = await fetch(API_URL, {
            method: "POST",
            headers: {
              Accept: "image/png",
              "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs: text }),
          });
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        })
      );
      setComicImages(images);
      console.log(comicImages);
    } catch (error) {
      console.error("Error generating comic:", error);
      // Handle error (show a message to the user, etc.)
    }
  };

  useEffect(() => {
    generateComic();
  }, [comicTexts]);

  return (
    <div className="App">
      <h1>Comic Creator</h1>
      <div className="comic-form">
        {comicTexts.map((text, index) => (
          <textarea
            key={index}
            placeholder={`Panel ${index + 1}`}
            value={text}
            onChange={(e) => handleTextChange(index, e.target.value)}
          />
        ))}
      </div>
      <button onClick={generateComic}>Generate Comic</button>
      <div className="comic-display">
        {comicImages.map((image, index) => 
        {
          console.log(image);
          if(image.length){
            return  <img key={index} src={image} alt={`Panel ${index + 1}`} />;
          }
          else{
            console.log('hi');
            return (<div style={{ width: '100px', height: '100px',backgroundColor:'black', border: '5px solid black' }}>Loading</div>);
          }
        })}
      </div>
    </div>
  );
};

export default App;
