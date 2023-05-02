'use strict';

function getTime() {
    var hours = parseInt(document.getElementById('myHours').value);
    var minutes = parseInt(document.getElementById('myMinutes').value);
    var seconds = parseInt(document.getElementById('mySeconds').value);
    return hours * 3600 + minutes * 60 + seconds;
}
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close");
$('.close').click(function(){
    $('#myModal').hide();
})


document.getElementById('update').onclick = function () {
    if (document.getElementById('myHours').value != "" && document.getElementById('myMinutes').value != "" && document.getElementById('mySeconds').value != "") {
        var time_in_seconds = getTime();
        var deadline = new Date(Date.parse(new Date()) + time_in_seconds * 1000);
        function time_remaining(endtime) {
            var t = Date.parse(endtime) - Date.parse(new Date());
            var seconds = Math.floor((t / 1000) % 60);
            var minutes = Math.floor((t / 1000 / 60) % 60);
            var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            var days = Math.floor(t / (1000 * 60 * 60 * 24));
            // time out!!!
            if (seconds == 0 & hours == 0 && minutes == 0) {
                modal.style.display = "block";
            }
            return { 'total': t, 'days': days, 'hours': hours, 'minutes': minutes, 'seconds': seconds };
        }

        var timeinterval;
        function run_clock(id, endtime) {
            var clock = document.getElementById(id);
            function update_clock() {
                var t = time_remaining(endtime);
                clock.innerHTML = t.hours + ' : ' + t.minutes + ' : ' + t.seconds;
                if (t.total <= 0) { clearInterval(timeinterval); }
            }
            update_clock(); // run function once at first to avoid delay
            timeinterval = setInterval(update_clock, 1000);
        }
        run_clock('clockdiv', deadline);


        var paused = false; // is the clock paused?
        var time_left; // time left on the clock when paused

        function pause_clock() {
            if (!paused) {
                paused = true;
                clearInterval(timeinterval); // stop the clock
                time_left = time_remaining(deadline).total; // preserve remaining time
            }
        }

        function resume_clock() {
            if (paused) {
                paused = false;
                // update the deadline to preserve the amount of time remaining
                deadline = new Date(Date.parse(new Date()) + time_left);

                // start the clock
                run_clock('clockdiv', deadline);
            }
        }

        document.getElementById('pause').onclick = pause_clock;
        document.getElementById('resume').onclick = resume_clock;
    }
    else {
        alert("NULL")
    }

}