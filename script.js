const frequencies = [
    262.63,
    293.66,
    329.63,
    349.23,
    392,
    440,
    493.88,
    523.25
];

const names = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'];

let audioContext = null;
const on = {};
const row = document.getElementById('row');
const buttons = frequencies.map((frequency, i) => {
    const cloud = document.createElement('div');
    cloud.textContent = names[i];
    row.appendChild(cloud);
    return cloud;
});

function start(i) {
    audioContext = audioContext || new AudioContext();
    if (on[i]) return;
        const tone = audioContext.createOscillator();
        const volume = audioContext.createGain();

        tone.frequency.value = frequencies[i];
        volume.gain.value = 0.2;
        tone.connect(volume);
        volume.connect(audioContext.destination);
        tone.start();
        on[i] = tone;
        buttons[i].classList.add('on');
}

function stop(i) {
    if (!on[i]) return;
    on [i].stop();
    on[i] = 0;
    buttons[i].classList.remove('on');
}

buttons.forEach((button, i) => {
    button.onclick = () => {
        if (on[i]) {
            stop(i);
        } else {
            start(i);
        }
    };
});
