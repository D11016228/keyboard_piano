// 創建音頻上下文（AudioContext）
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const display = document.getElementById('display');

// 創建音符與音階的對應關係和顏色對應關係
const notes = {
    'a': { note: 'C4', name: 'Do', color: '#80ADD7', text: 'aaa' },
    'b': { note: 'D4', name: 'Re', color: '#0ABDA0', text: 'bbb' },
    'c': { note: 'E4', name: 'Mi', color: '#D3D9D2', text: 'ccc' },
    'd': { note: 'F4', name: 'Fa', color: '#D4DCA9', text: 'ddd' },
    'e': { note: 'G4', name: 'Sol', color: '#BF9D7A', text: 'eee' },
    'f': { note: 'A4', name: 'La', color: '#80ADD7', text: 'fff' },
    'g': { note: 'B4', name: 'Si', color: '#0ABDA0', text: 'ggg' },
    'h': { note: 'C5', name: 'Do', color: '#D3D9D2', text: 'hhh' }

};

// 按下按鍵時的事件處理器
document.addEventListener('keydown', function(event) {
    const key = event.key.toLowerCase(); // 轉換為小寫以匹配 notes 對象

    // 檢查按下的鍵是否在 notes 對象中
    if (key in notes) {
        // 顯示對應的頁面內容和設置顏色
        display.textContent = notes[key].text;
        display.style.backgroundColor = notes[key].color;

        // 使用 createOscillator 方法創建 OscillatorNode（震盪器節點）
        const oscillator = audioContext.createOscillator();

        // 設置震盪器的頻率為對應音符的頻率
        oscillator.frequency.value = noteToFrequency(notes[key].note);

        // 將震盪器連接到音頻輸出（Speakers）
        oscillator.connect(audioContext.destination);

        // 開始播放音符
        oscillator.start();

        // 在 500 毫秒後停止播放音符
        setTimeout(function() {
            oscillator.stop();
        }, 300);
    }
});

// 轉換音符到頻率的輔助函數
function noteToFrequency(note) {
    const notesMap = {
        'C4': 261.63,
        'D4': 293.66,
        'E4': 329.63,
        'F4': 349.23,
        'G4': 392.00,
        'A4': 440.00,
        'B4': 493.88,
        'C5': 523.25

    };
    return notesMap[note];
}
