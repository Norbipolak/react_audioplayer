import { useEffect, useState } from "react";
/*
Hogy csinálunk egy react-ot 
be kell írni a console-ba vesszőkkel, hogy create-react-app és meg kell adni, hogy mi legyen a neve
pl. most az, hogy audioplayer -> create-react-app audioplayer

ha meg van, betöltött mindent, akkor létrhozunk az src-ben egy mappát aminek általában az a neve, hogy conmponent 
itt fogunk dolgozni, tehát itt csinálunk egy js meg egy css mappát, fontos, hogy react-ben nem kell html!!!!! 

az app-ban ki kell törölni mindent, majd oda kell importálni amit ide csináltunk a js-ben!!!! 

Így kezdünk mindig, hogy kell egy function, amiben van egy return!!!!! 
és abban fogjuk majd visszaadni a html szerkezetet!!!! 

function AudioPlayer() {
    return(
        <></>
    )
};

export default AudioPlayer;

és ezt a function-t majd export default-oljuk és majd be kell hívni az app-ban ilyen formában 
import './App.css';
import AudioPlayer from './component/audio_player';

function App() {
  return (
    <div className="App">
      <AudioPlayer/>
    </div>
  );
}

export default App;

kitölrük mindent ami ott volt, hogy csak az maradjon a return-ben, hogy div azzal a className-vel, hogy "App" 
és oda kell bemásolni a function-t, amit itt elkészítünk, fontos, hogy be legyen importálva, szóval felül ez kell, hogy legyen
-> 
import './App.css';
import AudioPlayer from './component/audio_player';

fontos, hogy az App mindig be legyen importálva és a js-ünkből is a function, amit ott csináltunk!!! 
ezt beimportálja automatikusan, ha le van töltve valami, de ha nem akkor nekünk kell ezt beírni manuálisan!!! 

még egy nagyon fontos dolog!!!!!! 
Hogyha akarunk awesomeIcon-okat használni, akkor nagyon fontos, hogy be legyenek importálva az App.js-ben 
->
import { faCirclePause, faCirclePlay, faCircleStop, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(
    faCirclePlay, faCirclePause, faTrashCan, faCircleStop
);

3 lépésből áll 
1. hogy az ikonok, amiket használni akarunk azok be legyenek importálva 
    import { faCirclePause, faCirclePlay, faCircleStop, faTrashCan } from '@fortawesome/free-regular-svg-icons';
    de itt arra is oda kell figyelni, hogy ezek regulat ikonok és van olyan, ami nem, ha nem regular azt is be kell majd importálni
    csak akkor nem free-regular-svg-icons lesz, hanem valami más!!!! free-logical-svg-icons mondjuk!!! 
2. minden esetben itt be kell importálni egy library-t (fontos, hogy a kisbetűs library, nem a nagy!!!!)
    és ennek a library-nek fogjuk megadni majd az ikonokat, amiker használni fogunk 
    import { library } from '@fortawesome/fontawesome-svg-core';
3. az add() metódussal tudjuk hozáadni a library-hez az ikonokat 
    library.add(
        faCirclePlay, faCirclePause, faTrashCan, faCircleStop
    )

és fontos, hogy itt is a js-file-ban, amiben dolgozunk ott is be legyen ez importálva 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

itt a React-ben nagyon fontos az importálás, hogy minden be legyen importálva, amivel dolgozni szeretnénk pl. useState vagy a useEffect 
*/

function AudioPlayer() {
    /*
    Hogyan tudjuk lejátszani az audio-file-jainkat, amik ide be vannak másolva,
    -> 
    a js-ben van egy beépített függvény a new Audio, aminek vannak tulajdonságai meg metódusai 
    fontosabb metódusai pl. 
    pause() -> ezzel állítjuk meg 
    play() -> ezzel játszuk le 
    currentTime -> ez megmutatja nekünk, hogy hol tartunk!! ezt kell lennulázni, majd ha azt akarjuk, hogy újrakezdje a számot!!! 
    volume -> ezzel lehet beállítani a hangerőt 

    const audio = new Audio();
    console.log(audio);
    ha meg akarjuk nézni, akkor npm start ez olyan, mitha simán js-ben azt mondanánk, a live-server-nek, hogy go live!!! 
    <audio preload="auto"></audio>


    ha meg akarjuk nézni a metódusokat, akkor kell egy useEffect, amit []-re csinálunk ami azt jelenti, hogy ez csak egyszer fog lefutni 
    amikor betöltődik a komponens!!  


        useEffect(()=> {
            const audio = new Audio();
            console.log(audio);

            felsoroljuk az összes property-jét és metódusait 
            const propertiesAndMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(audio));
            console.log(propertiesAndMethods);

            
            [
                "constructor", "canPlayType", "play", "pause", "load", "currentTime", "duration",
                "paused", "playbackRate", "volume", "muted", "src", "currentSrc", "buffered",
                "readyState", "seeking", "seekable", "networkState", "preload", "autoplay",
                "loop", "controls", "volume", "muted", "addEventListener", "removeEventListener",
                "dispatchEvent", ...

                ezeket tudjuk majd felhasználni, úgyhogy audio.play() vagy audio.pause() 
                vagy megnézni, hogy hol tartunk audio.currentTime vagy audio.volume 
            ]

            
        }, []);
        *******
    */

    /*
    Meg az is nagyon fontos, hogy src mert ennek kell majd megadni, hogy mit játszon le 
    ugyanugy, ahogy csináltunk a képeket is, hogy volt egy mappánk, amiben voltak a képek, ilyen nevekkel, hogy car.png stb.
    és csináltunk egy tömböt, amibe megadtuk ezeket és for-ciklus-t rá, ahol minden körben ment, hogy car.png utána cheese.png 
    és minden körben megadtuk az src-nek az alábbit de nagyon fontos, hogy a teljes elérési útvonalat adtuk meg 
    -> 
    const pictures = ["car.png", "cargo-ship.png", "cheese.png"];
    for(const picture of pictures) {
        const img = document.createElement("img");
        img.src = `/kepek/${picture}.png` és itt megadjuk az elérési útvonalat minden képhez -> fontos, hogy mindig az aktuálisat adjuk meg a 
        loop-ban tehát ${picture}
    }
    ez is nagyon hasonlóan fog mükdöni 
    ***************************************************************************************************************************
    */
    const [player, setPlayer] = useState(new Audio());
    /*
    és akkor ennek a player-nek vannak metódusai, amit fel tudunk használni meg set-elni, pl. az src 
    amit ugye csak egyszer adunk meg mert ez nem fog változni, mint a volume vagy a currentTime 
    nagyon fontos, hogy itt mindig kell egy kulcsszó, ami require()!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    */
    useEffect(()=> {
        player.src = require(`../tracks/${trackList[0].name}`); // itt most csak az elsőt adtuk meg neki 
    }, []); 

    const [trackList,setTrackList] = useState({
        name: "Don't fret - Quicais Moreira.mp3",
        duration: "00:02:40"
    });
    /*
    itt létrehoztunk egy trackList-es useState-s (objektum) változót, amiben megadtuk a track-nak a pontos nevét meg a duration-t 
    tehát van egy track mappánk amiben az első szám az a Don't fret - Quicais Moreira.mp3 ezt adtuk meg az src-nek 
    de ez majd változni fog, mert van még sok számunk a ezért majd a set-vel megadunk másikat és akkor azt fogja megkapni az src 
    csak itt ezzek kipróbáltuk, hogy müködik-e az első szám, hogy lejátsza-e stb. 
    **********************************************************************************************************************************
    */
    //kell még egy useState-s változó arra, hogy éppen megy-e a zene 
    const [isPlaying, setIsPlaying] = useState(false) // alapból false lesz, mert ez egy boolean vagy megy vagy nem a szám 
    /*
    és erre csinálunk egy függvényt, ahol meghatározzuk, hogy mikor megy vagy mikor nem 
    ebben a play fügvényben az történik, hogyha az isPlaying azt tagadjuk, akkor a play()-vel lejátszuk 
    else akkor meg megállítjuk!!!! tehát itt azzal játszunk, hogy mi a isPlaying változónak az értéke true vagy false 
    ha tagadjuk az isPlaying-et akkor az true, mert alapból false volt és akkor play()-vel lejátszuk ha meg false az értéke, 
    akkor meg a else-ben pause-oljuk 
    és a set-vel meg mindig megváltoztatjuk az értékét setIsPlaying(ip => !ip), hogy tudjuk, hogy mikor kell play() meg a pause()!!! 
    */
    const play = ()=> {
        if(!isPlaying) {
            player.play();
        } else {
            player.pause();
        }

        setIsPlaying(ip => !ip);//megváltoztatjuk a useState-es változónak az értékét ha false volt akkor true lesz és így fordítva!!
    }
    /*
    <div className="play-pause-stop">
    <FontAwesomeIcon className="pointer" onClick={play}
    icon={"fa-regular" + (!isPlaying ? "fa-circle-play" : "fa-circle-pause")} />

    és ez majd így lesz a return-ben, hogy csináltunk egy olyat, hogy meg fog változni az ikon attól függően, hogy megy-e 
    icon={"fa-regular" + (!isPlaying ? "fa-circle-play" : "fa-circle-pause")}
    tehát, ha nem megy, akkor kell a play-ikon ha megy akkor kell a || ikon, amivel meg tudjuk állítani!!! 
    és persze ami nagyon, fontos, hogy erre az ikon-ra kell egy onClick={play}, tehát ha rákattintunk, akkor le fog futni a play függvény!!! 
    Ahol a play meg a pause-és dolog az egy ikonra lesz megcsinálva!!! 
    nem két külön függvény 
    *************************************************************************************************************************************
    */
    /*
    Ami még fontos, hogyha megnyumjuk ezt a gombot(ikon), akkor a pause()-val megállítjuk de ha újra play() lesz, akkor nem az elejétől 
    fog kezdődni, hanem onnan ahol éppen tart a szám ezért lesz egy olyan gomb(ikon) a html szerkezetben, amire rákattintva megáll a 
    zene és teljesen visszamegy 00:00:00-ra és erre csinálunk egy függvényt -> stop
    */
    const stop = ()=> {
        player.pause;
        player.currentTime = 0;
        setIsPlaying(false);
    }
    /*
    itt három dolog történik ha rányomunk a stop ikon-ra és meghívodik ez a stop függvény, amit csinálunk
    1. player.pause-val megállítjuk a zenét 
    2. currentTime-ot beállítjuk 0-ra tehát az elejére fog visszamenni 
    3.isPlaying az itt biztos, hogy false lesz, ha erre az ikonra kattintunk!!! 
        <FontAwesomeIcon onClick={stop}
            className="pointer"
            icon="fa-regular fa-circle-stop" />
        </div>
    *************************************************************************************************************************************
    */
   const [trackSlider, setTrackSlider] = useState(0);
   /*
   van kettő darab csuszkánk, egyiknél be tudjuk állítani a hangerőt a másiknál, meg azt, hogy hol tartunk a számban 
   ez egy input mező lesz méhozzá a type="range"!!!!!!! 
   kell adni neki egy min meg egy max-ot, fontos, hogy az a volume esetében még jó is, de a szám nem 0-100-ig fog menni, 
   tehát majd ott a függvényben ezt kicsit majd át kell alakítani!!!! 
    <div className="vertical-center">
        <input className="w100" 
        value={trackSlider} onChange={(e)=>adjustTrackSlider(parseFloat(e.target.value))}
        step={0.1} type="range" min={0} max={100} />
    </div>
    ugye most ez a csuszka az 0-100-ig van, hogyan tudjuk megszerezni, ennek az értékét -> e.target.value!!!!!! 
    de ezt ugye onChange-ben, mert ez mindig változik és akkor az onChange az arra reagál, úgy mint egy sima select option-ös dolog 
    ahol vannak value-k és egy eventListener("change", ...) mindig meg tudjuk az aktuális értékét, mert minden változásnál lefut!!! 
    és ha van új value akkor azt mindig set-elni kell és fontos mindig itt is a input-nak a value-ja az meg kell, hogy egyenezen a 
    useState-s változó value-jával -> value={trackSlider} !!!!!!!!!!!!!!
    még ami nagyon fontos, hogy a value az egy string-et fog visszaadni és ha nekünk mondjuk szám kell, akkor parseInt-elni kell!!! 
    hogy ebből, amit visszakapunk "1" -> 1 ez legyen, number

    erre csináltunk egy függvényt, ami vár egy percentage-t, amit majd meg fog kapni onChange={(e)=>adjustTrackSlider(parseFloat(e.target.value))
    mert ez az input 0-100-ig van és van egy step is!!!!!!!, ami meg az, hogy mennyivel tudjuk megváltoztatni az értékét!!!! 
    */
    const adjustTrackSlider = (percentage)=> {
        setTrackSlider(percentage);
        player.currentTime = percentage/100 * player.duration;
    };
    /*
    Tehát ez a függvény az vár egy percentage-t amit megkapjuk meghívásnál -> onChange={(e)=>adjustTrackSlider(parseFloat(e.target.value))
    Tegyük fel, hogy 50 ez percentage és akkor van egy 180ms-es szám meg egy 240ms-es 
    50/100 0.5 * duration és akkor ha a feléhez tekerünk, akkor az első számnál 90ms-nél tartunk a másodiknál meg 120ms 
    ezt tudjuk itt beállítani a currentTime-val, ami azt jelzi, hogy hol tart a zene!!! 
    ******************************************************************************************************************************
    */
    const [volume, setVolume] = useState(75);
    /*
    <input className="w100" 
        value={volume} onChange={(e)=> setVolume(parseFloat(e.target.value/100))}
        type="range" min={0} max={100} />

    itt kicsit egyszerübb dolgunk lesz, mert nem kell a duration-vel foglalkozni!!! 
    csak annyi, hogy itt is lesz egy függvény, ami várni fog nekünk egy vol-t azt megadjuk és azzal majd be tudjuk állítnani a 
    volume-ot, mert a new Audio-nak ami itt ugye player, annak van egy olyan funckciója, hogy volume 
    adjustVolume(parseFloat(e.target.value/100))}
    itt megkapjuk, hogy milyen 0-100, hogy mi az értéke és megadjuk a adjustVolume-nak, ahol majd ezzel az értékkel set-eli 
    a változót és itt is hozzá van kötve a value-hoz a useState-s változó -> {volume} 
    */
    const adjustVolume = (vol)=> {
        setVolume(vol);
        player.volume = vol;
    }
    /*
    nagyon fontos, hogy ez a volume beépített function ez 0-tól 1-ig van, ahol a 0 az a muted a 1.0 az meg a full volume!!!! 
    ezért kell itt osztani 100-val 
    */

    return(
        <div className="audio-player">
        <div className="player-controls">
            <div className="play-pause-stop">
                <FontAwesomeIcon className="pointer" onClick={play}
                    icon={"fa-regular" + (!isPlaying ? "fa-circle-play" : "fa-circle-pause")} />
                
                <FontAwesomeIcon onClick={stop}
                className="pointer"
                    icon="fa-regular fa-circle-stop" />
            </div>
            <div className="vertical-center">
                <input className="w100" 
                value={trackSlider} onChange={(e)=>adjustTrackSlider(parseFloat(e.target.value))}
                step={0.1} type="range" min={0} max={100} />
            </div>
            <div className="vertical-center">
                <input className="w100" 
                value={volume} onChange={(e)=> adjustVolume(parseFloat(e.target.value/100))}
                type="range" min={0} max={100} />
            </div>
        </div>
        <div className="audio-information mb-15">
            <div>
                Mozart-Requiem
            </div>
            <div>
                00:02:32
            </div>
        </div>
        <div className="tracklist">
            <div className="tracklist-element">
                <div>
                    PSY - Gangnam Style
                </div>
                <div>
                    00:04:53
                </div>
            </div>
            <div className="tracklist-element">
                <div>
                    PSY - Gangnam Style
                </div>
                <div>
                    00:04:53
                </div>
            </div>
            <div className="tracklist-element">
                <div>
                    PSY - Gangnam Style
                </div>
                <div>
                    00:04:53
                </div>
            </div>
            <div className="tracklist-element">
                <div>
                    PSY - Gangnam Style
                </div>
                <div>
                    00:04:53
                </div>
            </div>
            <div className="tracklist-element">
                <div>
                    PSY - Gangnam Style
                </div>
                <div>
                    00:04:53
                </div>
            </div>
            <div className="tracklist-element">
                <div>
                    PSY - Gangnam Style
                </div>
                <div>
                    00:04:53
                </div>
            </div>
        </div>
        <div className="tracklist-information">
            <div>
                00:34:55
            </div>
            <div>
                <FontAwesomeIcon className="pointer"
                    icon="fa-regular-fa-trash-can" />
            </div>
        </div>
    </div>

    )
};

export default AudioPlayer;

/*
tudunk a JSX-ben set-elni dolgokat de jobb ha csinálunk egy függvényt átadjuk neki az onChange-s értéket és majd a függvényben set-eljük 
a useState-s változónakat!!!!! 

fontos, hogy value mindig hozzá legyen kötve a jsx-es input-hoz!!!!! 

fontos, hogy van egy ilyen type-ja az input-nak, hogy range, meg min max step 
    hogy tudjuk beállítani az értékeket ={}-vel nem =""-vel!!!! min={0} max={100} step={1} !!!! {} kell nekünk itt!!!!! 
    
  const handleChange = (e) => {
    setValue(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
    </div>
  );

lehet, hogy a függvény vár egy event objektumot de lehet az is, hogy az onChange-nél adjuk meg mint mi is csináltuk!!!! 
onChange={(e)=> adjustVolume(parseFloat(e.target.value/100))}
*********************
Általános 
mikor kell egy useState-s változó!!!! 
amikor változni fog az értéke valaminek pl. egy input mezőbők kiszedett valami 
vagy pl. egy tömb aminek lesz több értéke, változik a tartalma stb. 

ami nem fog változni azt betesszük egy useEffect-es változóba 

ha az kell, hogy csak az elején legyen meg mikor elöször legenerálódik a komponens, akkor azt betesszük egy useEffect-be 
aminek a második paramétere egy [] lesz 
*/