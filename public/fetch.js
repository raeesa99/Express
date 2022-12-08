const input = document.getElementById('numberInput');
const btn = document.getElementById('btn');
const display = document.getElementById('display')

const getRandNum = async () => {
    let obj = { max: input.value };

    // console.log(obj);
    // console.log(JSON.stringify(obj));
    
    let response = await fetch('/random-number', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    });

        response = await response.json();
        // console.log(response);
        display.textContent = response.randNum
}

btn.addEventListener('click', getRandNum);