$(function() {
  var Words = [
  {
    title : 'Sample Title',
    description : '基本的に直接お会いして、打ち合わせを行います (メールやチャットなども可能)<br>ホームページの方向性やターゲットを一緒に考えます<br>遠方の方でも問題ありません！アナタの会社の魅力を教えてください！ '
  },
  {
    title : 'Sample Title2',
    description : 'sample description2'
  },
  {
    title : 'Sample Title3',
    description : 'sample description3'
  },
  {
    title : 'Sample Title4',
    description : 'sample description4'
  }
];

// タッチイベントに対応しているかを判定
var isTouch = 'ontouchend' in document;

// carr
var count = 0;
var $carr = $('#carr');
var $carrIcon = $carr.find('.carr-contents-icon');
var $carrTitle = $carr.find('.carr-contents-title');
var $carrDes = $carr.find('.carr-contents-description');
var WordsLen = Words.length;

// ページャー生成用のクラスがあるかを判定
var isPager = $carr.find('div').hasClass('carr-pager');
var $carrPager;

// タッチイベント用
var posArr = [];
var posX,posY,moveX,moveY;
var paddingLeft = $carr.css('padding-left').split('px');
var paddingRight = $carr.css('padding-right').split('px');
// フリック時の判定用。全体の幅＋左右パディング / 判定値。3だと1/3になる
var judge = ($carr.width() + parseInt(paddingLeft[0],10) + parseInt(paddingRight[0],10)) / 3;


var init = function() {
  //タイトルと説明 / 初期値はWord配列の0番目をセット
  $carrTitle.html(Words[0].title);
  $carrDes.html(Words[0].description);

  // タッチイベントに対応してたら開始
  if(isTouch) {
    $carr.on({
      'touchstart' : function(e) {Func.carrStart(e)},
      'touchmove' : function(e) {Func.carrMove(e)},
      'touchend' : function() {Func.carrEnd()}
    });
  }

  // ページャー生成用のクラスがあればページャー生成
  if(isPager) {
    Func.createPager();
  }

  // クリックイベント
  $carr.find('.icon-left').on('click',function(){
    Func.goLeft();
  });
  $carr.find('.icon-right').on('click',function(){
    Func.goRight();
  });
};


var Func = {
  carrStart : function(e) {
    original = e.originalEvent;

    posX = original.changedTouches[0].pageX;
    posY = original.changedTouches[0].pageY;

    posArr.splice(0,posArr.length,posX,posY);
  },

  carrMove : function(e) {
    original = e.originalEvent;
    posX = original.changedTouches[0].pageX;
    posY = original.changedTouches[0].pageY;
    moveX = posArr[0] - posX;
    moveY = posArr[1] - posY;
  },

  carrEnd : function() {
    // touchmoveを経由したかを判定。してなければ動かさない
    if(posArr[0] < posX + 20 && posArr[0] > posX - 20) {
      moveX = 0;
    }

    if(moveX > judge) {
      Func.goRight();
    }else if(moveX < -judge) {
      Func.goLeft();
    }
  },

  goLeft : function() {
    count -= 1;
    if(count < 0){
      count = WordsLen - 1;
    }

    $carrIcon.toggleClass('anime-icon anime-icon-clone');
    $carrTitle.toggleClass('anime-title anime-title-clone');
    $carrDes.toggleClass('anime-description anime-description-clone');

    setTimeout(Anime.carrTitle,500);
    setTimeout(Anime.carrDescription,600);

    // ページャーがあったらページャーも動作
    if(isPager) {
      Func.pagerMove();
    }
  },

  goRight : function() {
    count += 1;
    if(count > WordsLen - 1){
      count = 0;
    }

    $carrIcon.toggleClass('anime-icon anime-icon-clone');
    $carrTitle.toggleClass('anime-title anime-title-clone');
    $carrDes.toggleClass('anime-description anime-description-clone');

    setTimeout(Anime.carrTitle,500);
    setTimeout(Anime.carrDescription,600);

    // ページャーがあったらページャーも動作
    if(isPager) {
      Func.pagerMove();
    }
  },

  createPager : function() {
    $carrPager = $carr.find('.carr-pager');

    $carrPager.append('<ul class="carr-pager-wrap">');
    for(var i = 0; i< Words.length; i++) {
      $('.carr-pager-wrap').append('<li class="carr-pager-item">');
    }
    // 初期値として1番目のページャーをオンにする
    $('.carr-pager-item').first().addClass('_on');
  },

  pagerMove : function() {
    // translate3dの場合は一度幅を戻す。animateだったらmove / 100のみでOK
    $carrPager.find('li')
      .removeClass('_on')
      .eq(count).addClass('_on');
  }
};

var Anime = {
  carrTitle : function(){
    $carrTitle.html(Words[count].title);
  },

  carrDescription : function(){
    $carrDes.html(Words[count].description);
  }
};

init();
});


