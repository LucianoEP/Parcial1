/* Música continua: guarda posición y estado en sessionStorage y la retoma en cada página */
(function(){
  var K_T='odisea_t', K_P='odisea_play', player;
  var tag=document.createElement('script');
  tag.src='https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
  window.onYouTubeIframeAPIReady=function(){
    player=new YT.Player('musica',{events:{
      onReady:function(){
        var t=parseFloat(sessionStorage.getItem(K_T))||0;
        if(t>0){player.seekTo(t,true);}
        if(sessionStorage.getItem(K_P)==='1'){player.playVideo();}
        setInterval(function(){
          try{ if(player.getPlayerState()===1){sessionStorage.setItem(K_T,player.getCurrentTime());} }catch(e){}
        },1000);
      },
      onStateChange:function(e){
        if(e.data===1){sessionStorage.setItem(K_P,'1');}
        if(e.data===2){sessionStorage.setItem(K_P,'0');}
      }
    }});
    /* En la página de las sirenas: si se reproduce el video, se pausa la música de fondo */
    if(document.getElementById('video-sirenas')){
      new YT.Player('video-sirenas',{events:{onStateChange:function(e){
        if(e.data===1){try{player.pauseVideo();sessionStorage.setItem(K_P,'0');}catch(err){}}
      }}});
    }
  };
  window.addEventListener('pagehide',function(){
    try{sessionStorage.setItem(K_T,player.getCurrentTime());}catch(e){}
  });
})();
