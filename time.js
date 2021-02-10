var session_time = document.getElementById("session_time");
var break_time = document.getElementById("break_time");
var minutes,hours,seconds,id=null,sessionTime,breakTime;
function resetTime()
{
    enableButtons();
    sessionTime=0;
    breakTime=0;
    display_setting();
    if(id!=null)
        clearInterval(id);
    setTime();
    minutes=0;
    hours=0;
    seconds=0;
    document.getElementById("show").innerHTML=showTime();
    //startTime();
    document.getElementById("timer").style.borderColor ="cyan";
    count_session=1;
    timer = 0;
    document.getElementById("session").innerHTML="Session  "+count_session;
}
function setTime()
{
    session_time.innerHTML=sessionTime + " min";
    break_time.innerHTML=breakTime +" min";
}
function incrementSession()
{
    sessionTime++;
    setTime();
}
function decrementSession()
{
    if(sessionTime>0)
        sessionTime--;
    setTime();
}
function incrementBreak()
{
    breakTime++;
    setTime();
}
function decrementBreak()
{
    if(breakTime>0)
        breakTime--;
    setTime();
}
function showTime()
{
    return ("00" + hours.toString()).slice(-2)+" : "+("00" + minutes.toString()).slice(-2) +" : "+("00" + seconds.toString()).slice(-2) ;
}

var time,timer,count_session;
var session_flag=true; // true means session running false means break
var initial=true; // when start is clicked 1st time
function startTime()
{
    if(sessionTime==0)
        return;
    if(initial)
    {
        initial=false;
        time = sessionTime;
    }
    document.getElementById("start").style.display="none";
    document.getElementById("pause").style.display="inline-block";
    disable_buttons();
    
    id = setInterval(function(){
        console.log(timer +"time"+ time+ "session"+sessionTime);
        if(timer==(time*60))
        {
            
            if(session_flag && breakTime!=0)
            {
                document.getElementById("session").style.display="none";
                document.getElementById("break").style.display="inline-block";
                document.getElementById("timer").style.borderColor ="orange";
                time = breakTime;
            }
            else
            {
                document.getElementById("session").style.display="inline-block";
                document.getElementById("break").style.display="none";
                document.getElementById("timer").style.borderColor ="cyan";
                ++count_session;
                document.getElementById("session").innerHTML="Session  "+count_session;
                time=sessionTime;
            }
            session_flag = !session_flag;
            timer = 0;
        }
        timer++;
        seconds++;
        minutes += parseInt(seconds/60);
        seconds = seconds%60;
        hours += parseInt(minutes /60);
        minutes = minutes%60;
        if(seconds==59 && minutes==59 && hours==24)
        {
            reset();
        }
        console.log(hours +" "+minutes+" "+seconds+" "+id);
        document.getElementById("show").innerHTML = showTime();
    },1000);
}
function disable_buttons()
{
    var nodes = document.getElementsByClassName("setting_btn");
    console.log(nodes);
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].setAttribute('onclick', "");
        nodes[i].style.cursor = "not-allowed";
        console.log(nodes[i].style.cursor.toString());
    }
}

function enableButtons()
{
    var btn_functions=[
        "decrementSession()","incrementSession()","decrementBreak()","incrementBreak()"
    ];
    var nodes = document.getElementsByClassName("setting_btn");
    //console.log(nodes);
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].setAttribute('onclick', btn_functions[i]);
        nodes[i].style.cursor = "pointer";
        
    }
}
function display_setting()
{
    document.getElementById("start").style.display="inline-block";
    document.getElementById("pause").style.display="none";
}
function pauseTime()
{
    //enableButtons();
    clearInterval(id);
    id=null;
    display_setting();
}