// Uses your device's LOCAL timezone.
// Edit WIPE_LOCAL to match the wipe time you want.
//
// If you only know "wipe day" (no hour), keep 00:00.
// Example with time: "2026-01-30T14:00:00" (2:00 PM local)

const WIPE_LOCAL = "2026-01-30T00:00:00"; // Jan 30, 2026 (local time)

const $ = (id) => document.getElementById(id);

function fmt2(n){ return String(n).padStart(2, "0"); }

function update(){
  const target = new Date(WIPE_LOCAL);
  $("targetText").textContent = target.toLocaleString(undefined, {
    year: "numeric", month: "short", day: "2-digit",
    hour: "2-digit", minute: "2-digit"
  });

  const now = new Date();
  let diff = target - now;

  if (diff <= 0){
    $("d").textContent = "00";
    $("h").textContent = "00";
    $("m").textContent = "00";
    $("s").textContent = "00";
    document.title = "FuZion • WIPE LIVE";
    return;
  }

  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const secs = sec % 60;

  $("d").textContent = fmt2(days);
  $("h").textContent = fmt2(hours);
  $("m").textContent = fmt2(mins);
  $("s").textContent = fmt2(secs);

  document.title = `FuZion • ${days}d ${fmt2(hours)}:${fmt2(mins)}:${fmt2(secs)}`;
}

update();
setInterval(update, 250);
