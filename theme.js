const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

const css = document.getElementById("css");

function switchTheme(e) {
    console.log(e)
    if (e.target.checked) {
        css.setAttribute('href', 'dark.css');
    }
    else {
        css.setAttribute('href', 'styles.css');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);
