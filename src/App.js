import { useState } from "react";
import { useWebcamCapture } from "./useWebcamCapture";
import './App.scss';
import slap from "./assets/stickers/slap.png";
import cocktail from "./assets/stickers/cocktail.png";
import moustache from "./assets/stickers/moustache.png";
import glasses from "./assets/stickers/glasses.png";
import smiley from "./assets/stickers/smily.png";
import zap from "./assets/stickers/zap.png";

import iconHome from "./assets/icons/icon-home.png";
import iconInfo from "./assets/icons/icon-info.jpeg";

import {Link, Switch, Route, Redirect} from "react-router-dom";

const stickersArr = [slap, cocktail, moustache, glasses, smiley, zap];
const stickers = stickersArr.map((url) => {
    const img = document.createElement("img");
    img.src = url;
    return {img, url};
});

function App(props) {

    const [sticker, setSticker] = useState();
    // title for the picture that will be captured
    const [title, setTitle] = useState("");
    // webcam behavior hook
    const [
        handleVideoRef, // callback function to set ref for invisible video element
        handleCanvasRef, // callback function to set ref for main canvas element
        handleCapture, // callback function to trigger taking the picture
        picture, // latest captured picture data object
        pictures // List of all the pictures
    ] = useWebcamCapture(sticker?.img, title);

    function Pictures(props) {
        const listItems = pictures.map((picture, index) =>
            <div key={index} className="picture">
                <img src={picture.dataUri} alt="selfie"/>
                <h3>{picture.title}</h3>
                <a
                    href={picture.dataUri}
                    download="selfie.png"
                    className="downloadBtn"
                >
                    Download!
                </a>
            </div>
        );
        return (
            <div>{listItems}</div>
        );
    }

    return (

        <div className="app">
            <nav className="nav">
                <div>
                    <ul>
                        <li>
                            <Link to="/readme">
                                <img src={iconInfo} className="icons" style={{width: "25px"}} alt="info"/>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <img src={iconHome} className="icons" alt="home"/>
                            </Link>
                        </li>

                    </ul>
                </div>
            </nav>
            <header className="header">
                <h1>SlapSticker</h1>
            </header>
            <Switch>
                /** * Main app route */
                <Route path="/" exact>
                    <main>
                        <section className="container">
                            <div className="container__topCards">
                                <h1 className="title">
                                    Have you ever said something so dumb, you just wanted to slap
                                    yourself? Well now you can!
                                </h1>
                            </div>
                            <div className="container__topCards">
                                <div className="gallery">
                                    <label className="title">
                                        Step 1:
                                        <br></br>
                                        Give it a name
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(ev) => setTitle(ev.target.value)}
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="container">
                            <div className="container__middleCards">
                                <h1 className="title">
                                    Step 2:
                                    <br></br>
                                    Select your sticker...
                                </h1>
                            </div>
                            <div className="container__middleCards stickers" style={{width: "100%"}}>
                                <button onClick={() => setSticker(stickers[0])}>
                                    <img src={stickers[0].url} alt="hand"/>
                                </button>
                                <button onClick={() => setSticker(stickers[1])}>
                                    <img src={stickers[1].url} alt="cocktail"/>
                                </button>
                                <button onClick={() => setSticker(stickers[2])}>
                                    <img src={stickers[2].url} alt="moustache"/>
                                </button>
                                <button onClick={() => setSticker(stickers[3])}>
                                    <img src={stickers[3].url} alt="glasses"/>
                                </button>
                                <button onClick={() => setSticker(stickers[4])}>
                                    <img src={stickers[4].url} alt="smiley"/>
                                </button>
                                <button onClick={() => setSticker(stickers[5])}>
                                    <img src={stickers[5].url} alt="zap"/>
                                </button>
                            </div>
                        </section>

                        <section className="bottomCards">
                            <h2>
                                Step 3: Slap yourself!
                            </h2>
                            <video ref={handleVideoRef}/>
                            <canvas
                                ref={handleCanvasRef}
                                width={2}
                                height={2}
                                onClick={handleCapture}
                                id="canvas"
                            />
                        </section>
                        <section className="bottomCards">
                            <article>
                                <h1 className="step4">
                                    Step 4:
                                    <br></br>
                                    Cherish this moment forever
                                </h1>
                                <div className="gallery">
                                    {picture && (
                                        <Pictures></Pictures>
                                    )}
                                </div>

                            </article>
                        </section>
                    </main>
                </Route>
                /** * Readme route */
                <Route path="/readme">
                    <main>
                        <h2>Devtest Readme</h2>
                        <p>
                            Hello candidate, Welcome to our little dev test. The goal of this
                            exercise, is to asses your general skill level, and give us
                            something to talk about at our next appointment.
                        </p>
                        <section>
                            <h3>What this app should do</h3>
                            <p>
                                SlapSticker is an app that lets users to slap stickers on their
                                face, using their webcam. Functionality wise the app works, but
                                the ui needs some love. We'd like for you to extend this
                                prototype to make it look and feel it bit better.
                            </p>
                            <p>These are the basic requirements:</p>
                            <ul>
                                <li>User can pick a sticker</li>
                                <li>User can give the captured image a title</li>
                                <li>User can place the sticker over the webcam image</li>
                                <li>User can capture the webcam image with sticker</li>
                            </ul>
                        </section>
                        <section>
                            <h3>What we want you to do</h3>
                            <p>
                                Off course we didn't expect you to build a full fledged app in
                                such a short time frame. That's why the basic requirements are
                                already implemented.
                            </p>
                            <p>
                                However, we would like for you to show off your strengths as a
                                developer by improving the app.
                            </p>
                            <p>Some ideas (no need to do all):</p>
                            <ul>
                                <li>Make it look really nice</li>
                                <li>Let users pick from multiple (custom) stickers</li>
                                <li>Improve the workflow and ux</li>
                                <li>Show multiple captured images in a gallery</li>
                                <li>Let users download or share the captured pics</li>
                                <li>Add super cool effects to webcam feed</li>
                                <li>Organize, document and test the code</li>
                                <li>Integrate with zoom, teams, meet...</li>
                            </ul>
                        </section>
                        <section>
                            <h3> quickstart</h3>
                            <ul>
                                <li>You can clone this repo to get started</li>
                                <li>run `$ npm install` to install deps</li>
                                <li>run `$ npm run start` to start dev environment</li>
                                <li>push it to github or gitlab to share it with us.</li>
                            </ul>
                        </section>
                        <section>
                            <p>
                                P.s. We've already added some libraries to make your life easier
                                (Create React App, Jss, React Router), but feel free to add
                                more.
                            </p>
                        </section>
                    </main>
                </Route>
                <Redirect to="/"/>
            </Switch>
        </div>
    );
}

export default App;