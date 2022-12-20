function set(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";path=/";
}

function get(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function consent() {
    set('cookies', 'consent');

    document.getElementById('cookieconsent').classList.remove('active');
}

function noConsent() {
    document.getElementById('cookieconsent').classList.remove('active');
}

let result = get('cookies');

if(!result) {
    document.getElementById('cookieconsent').classList.add('active');
}