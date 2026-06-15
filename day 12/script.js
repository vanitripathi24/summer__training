const input =
document.getElementById("seconds");

const button =
document.getElementById("startBtn");

const display =
document.getElementById("display");

function startTimer(seconds){

    return new Promise(
        (resolve,reject) => {

            if(seconds <= 0){

                reject(
                    "Please enter valid seconds"
                );

                return;
            }

            let time = seconds;

            display.textContent = time;

            const interval =
            setInterval(() => {

                time--;

                display.textContent = time;

                if(time === 0){

                    clearInterval(interval);

                    resolve(
                        "Timer Completed"
                    );
                }

            },1000);

        }
    );
}
button.addEventListener(
    "click",
    () => {

        const seconds =
        Number(input.value);

        startTimer(seconds)

        .then(message => {

            alert(message);

        })

        .catch(error => {

            alert(error);

        });

    }
);