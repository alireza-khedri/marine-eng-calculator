// ابزار مشترک: کپی در کلیپ‌بورد + نمایش پیام تأیید (toast)

function ensureToast(){
  let t = document.querySelector('.toast');
  if(!t){
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  return t;
}

function showToast(message){
  const t = ensureToast();
  t.textContent = message;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(()=> t.classList.remove('show'), 1600);
}

function copyToClipboard(text, message){
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(()=>{
      showToast(message || 'کپی شد');
    }).catch(()=> fallbackCopy(text, message));
  } else {
    fallbackCopy(text, message);
  }
}

function fallbackCopy(text, message){
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try{ document.execCommand('copy'); showToast(message || 'کپی شد'); }
  catch(e){ showToast('کپی ناموفق بود'); }
  document.body.removeChild(ta);
}
