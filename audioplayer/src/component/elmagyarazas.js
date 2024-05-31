/*
sima javaScript példa és React példa, hogy szedjük ki az értéket egy input-ból 

1. JavaScript lementünk egy elemet pl. input mezőt vagy select-et és abból vesszük azt lementjük és DOM elemre pedig készítünk egy eventListener-t

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event Listener Example</title>
</head>
<body>
  <input type="text" id="myInput">

  <script>
    const inputElement = document.getElementById('myInput');

    inputElement.addEventListener('change', () => {
      const value = inputElement.value;
      console.log(value);
    });
  </script>
</body>
</html>
*/

import React, { useState } from 'react';

const InputComponent = () => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
    </div>
  );
};

export default InputComponent;

/*
itt pedig az OnChange-vel az e.target.value-val, fontos, hogy itt mindig kell, hogy legyen függvény!!! 
és a legfontosabb dolog, hogy ennek a value-ját mindig hozzá kell adni a useState-s változóhoz!!!! 

és ha ott változás van akkor az onChange-vel azt érzékeljük, majd ezt set-elni kell a useState-es változónak, hogy mindig annak az értéke 
az aktuális érték legyen!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/

import React, { useState } from 'react';

const AudioPlayer = ({ player }) => {
  const [volume, setVolume] = useState(75);

  const adjustVolume = (vol) => {
    setVolume(vol);
    player.volume = vol; // player.volume expects a value between 0.0 and 1.0
  };

  return (
    <div>
      <input
        className="w100"
        value={volume}
        onChange={(e) => adjustVolume(parseFloat(e.target.value / 100))}
        type="range"
        min={0}
        max={100}
      />
    </div>
  );
};

export default AudioPlayer;

/*
tehát az onChange-be meg tudunk szerezni egy értéket!!! de azt egy függvénynek kell az az érték, hogy tudjon vele valamit csinálni és ugye 
azt is várja paraméterben!!!!  
->
ezért a függvényt azt meghívjuk az onChange-ben (fontos a színtaktika onChange={(e)=> függvény(e.target.value)})
és akkor így már a föggvény megkapta 
const [volume, setVolume] = useState(10);
const függvény(value) {
    és akkor itt azt csinálunk a value-val amit akarunk 
    pl. set-eljük vele a useState-s változónkat 
    setVolume(value);
    fontos, hogy a set-elés is egy metódus ezért így kell átadni neki az értéket, hogy setValami() egy ()-ben!!!!!!! 
}
*/

import React, { useState, useEffect } from 'react';

const VolumeAdjuster = ({ initialVolume, player }) => {
  const [volume, setVolume] = useState(initialVolume);

  useEffect(() => {
    // Update the player's volume whenever the volume state changes
    player.volume = volume / 100;
  }, [volume, player]);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div>
      <input
        className="w100"
        value={volume}
        onChange={handleVolumeChange}
        type="range"
        min={0}
        max={100}
      />
      <p>Current Volume: {volume}</p>
    </div>
  );
};

export default VolumeAdjuster;
