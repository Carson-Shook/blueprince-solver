'use client'
import styles from "./page.module.css";
import { useState } from 'react'

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];


export default function Page() {
    const [coreWord, setCoreWord] = useState('');
    const [coreNum1, setCoreNum1] = useState('');
    const [coreNum2, setCoreNum2] = useState('');
    const [coreNum3, setCoreNum3] = useState('');
    const [coreNum4, setCoreNum4] = useState('');
    const [numericCore, setNumericCore] = useState([]);
    const alphabeticCore = getStringFromCoreHistory(numericCore);

    function calculateNumericCore() {
        let core1 = 0;
        let core2 = 0;
        let core3 = 0;
        let core4 = 0;
        if (coreWord != '' && coreWord.length === 4) {
            // convert each character to is alphabetical value
            const lowerCoreWord = coreWord.toLowerCase();
            core1 = alphabet.indexOf(lowerCoreWord[0]) + 1;
            core2 = alphabet.indexOf(lowerCoreWord[1]) + 1;
            core3 = alphabet.indexOf(lowerCoreWord[2]) + 1;
            core4 = alphabet.indexOf(lowerCoreWord[3]) + 1;
            setCoreNum1(core1);
            setCoreNum2(core2);
            setCoreNum3(core3);
            setCoreNum4(core4);
        } else if (coreWord != '') {
            console.log('Error: Core Word must be exactly 4 characters long.')
        }
        else {
            core1 = coreNum1;
            core2 = coreNum2;
            core3 = coreNum3;
            core4 = coreNum4;
        }

        console.log(core1, core2, core3, core4);
        console.log(numericCore);

        const coredValue = getNumericCoreFromNumbers(core1, core2, core3, core4);
        console.log(coredValue);
        setNumericCore([
            ...numericCore,
            coredValue
        ]);
    }

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <form>
                    <div>
                        <input name='coreword' type='text' placeholder="4-Letter Word" value={coreWord} onChange={e => setCoreWord(e.target.value)} />
                    </div>
                    <div>
                        <input name='corenum1' type='number' placeholder="1st Number" value={coreNum1} onChange={e => setCoreNum1(e.target.value)} />
                        <input name='corenum2' type='number' placeholder="2nd Number" value={coreNum2} onChange={e => setCoreNum2(e.target.value)} />
                        <input name='corenum3' type='number' placeholder="3rd Number" value={coreNum3} onChange={e => setCoreNum3(e.target.value)} />
                        <input name='corenum4' type='number' placeholder="4th Number" value={coreNum4} onChange={e => setCoreNum4(e.target.value)} />
                    </div>
                    <div>
                        <button onClick={calculateNumericCore} name='calculate' type='button'>Calculate</button>
                    </div>
                </form>
                <label>Numeric Core History:</label>
                <input name='numericcorenumber' value={numericCore} readOnly />
                <label>Numeric Core Alphabetical Representation:</label>
                <input name='alphabeticcore' value={alphabeticCore} readOnly />
            </main>
        </div>
    );
}

function getNumericCoreFromNumbers(num1, num2, num3, num4) {
    const possibleResults = [];

    for (let i = 0; i < 6; i++) {
        let result = parseFloat(1.1);

        if (i === 0) {
            // ((a - b) * c) / d
            result = (parseFloat((num1 - num2) * num3) / parseFloat(num4));
        }
        else if (i === 1) {
            // ((a * b) - c) / d
            result = (parseFloat((num1 * num2) - num3) / parseFloat(num4));
        }
        else if (i === 2) {
            // ((a * b) / c) - d
            result = ((parseFloat(num1 * num2) / parseFloat(num3)) - parseFloat(num4));
        }
        else if (i === 3) {
            // ((a - b) / c) * d
            result = ((parseFloat(num1 - num2) / parseFloat(num3)) * parseFloat(num4));
        }
        else if (i === 4) {
            // ((a / b) - c) * d
            result = (((parseFloat(num1) / parseFloat(num2)) - parseFloat(num3)) * parseFloat(num4));
        }
        else if (i === 5) {
            // ((a / b) * c) - d
            result = (((parseFloat(num1) / parseFloat(num2)) * parseFloat(num3)) - parseFloat(num4));
        }
        else {
            console.log('What the heckie');
        }
        console.log(result);
        if (result % 1 === 0 && result > 0) {
            possibleResults.push(Math.round(result));
        }
    }

    console.log(possibleResults);
    return Math.min(...possibleResults);
}

function getStringFromCoreHistory(coreHistory) {
    const stringValue = [];
    for (let i = 0; i < coreHistory.length; i++) {
        const coreNumber = coreHistory[i];
        if (coreNumber < 1 || coreNumber > 26) {
            stringValue[i] = "-";
        } else if (coreNumber >= 1 && coreNumber <= 26) {
            stringValue[i] = alphabet[coreNumber - 1].toUpperCase();
        }
    }

    return stringValue.join("");
}