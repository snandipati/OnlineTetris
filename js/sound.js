var Sound = {

    SoundBank: {
        rotation: "rotation",
        landing: "landing",

        clearedOneRow: "clearedOneRow",
        clearedTwoRows: "clearedTwoRows",
        clearedThreeRows: "clearedThreeRows",
        clearedFourRows: "clearedFourRows",

        ambientMusic: "ambientMusic"
    },

    loadSounds: function() {
        soundManager.createSound(this.SoundBank.rotation, 'assets/sound/rotation.mp3');
        soundManager.createSound(this.SoundBank.landing, 'assets/sound/landing.mp3');
        soundManager.createSound(this.SoundBank.clearedOneRow, 'assets/sound/clearedOneRow.mp3');
        soundManager.createSound(this.SoundBank.clearedTwoRows, 'assets/sound/clearedTwoRows.mp3');
        soundManager.createSound(this.SoundBank.clearedThreeRows, 'assets/sound/clearedThreeRows.mp3');
        soundManager.createSound(this.SoundBank.clearedFourRows, 'assets/sound/clearedFourRows.mp3');
        soundManager.createSound(this.SoundBank.ambientMusic, 'assets/sound/ambientMusic.mp3');
    },

    playAmbientMusic: function() {
        playLooped(this.SoundBank.ambientMusic);
    },

    playRotationSound: function() {
        soundManager.play(this.SoundBank.rotation);
    },

    playLandingSound: function() {
        soundManager.play(this.SoundBank.landing);
    },

    playLoopedLandingSound: function() {
        playLooped(this.SoundBank.landing);
    },

    playClearedSound: function(level) {
        if (!level || level  1) {
            return;
        }

        switch (level) {
        case 1:
            soundManager.play(this.SoundBank.clearedOneRow);
            break;
        case 2:
            soundManager.play(this.SoundBank.clearedTwoRows);
            break;
        case 3:
            soundManager.play(this.SoundBank.clearedThreeRows);
            break;
        case 4:

            soundManager.play(this.SoundBank.clearedFourRows);
            break;
        }
    },

};

// Looping sound support
playLooped: function playLooped(soundID) {
    window.setTimeout(function() {
        soundManager.play(soundID, {
            onfinish: function() {
                playLooped(soundID);
            }
        });
    },
    1);
};

soundManager.onload = function() {
    Sound.loadSounds();
}