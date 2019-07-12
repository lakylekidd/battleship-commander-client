import React, { Component } from 'react';
import Sound from 'react-sound';
import SoundFile from './../../media/game_theme.mp3'

export default class GameAudioComponent extends Component {

    getPlayStatus = () => {
        return Sound.status.PLAYING;
    }

    render() {
        return (
            <div>
                <Sound
                    url={SoundFile}
                    playStatus={Sound.status.PLAYING}
                    onLoading={this.handleSongLoading}
                    onPlaying={this.handleSongPlaying}
                    onFinishedPlaying={this.handleSongFinishedPlaying}
                />
            </div>
        )
    }
}
